import { Injectable, signal, computed } from '@angular/core';

export interface OrgNode {
  id: string;
  label: string;
  code: string;
  level: 'direccion' | 'subdireccion' | 'area';
  parentId: string | null;
  isActive: boolean;
  isExpanded: boolean;
  inUse: boolean;
  children?: OrgNode[];
}

export interface AreaOption {
  code: string;
  label: string;
  fullLabel: string;
}

const ORG_STORAGE_KEY = 'oefa_org_tree_v2';

const INITIAL_ORG_SEED: OrgNode[] = [];

@Injectable({
  providedIn: 'root'
})
export class OrgStoreService {
  orgTree = signal<OrgNode[]>([]);

  constructor() {
    try {
      localStorage.removeItem('oefa_org_tree_v1');
      localStorage.removeItem('seosc_org_tree_cache_v1');
    } catch (e) {}
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(ORG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.orgTree.set(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Error al leer el árbol organizacional de localStorage', e);
    }
    this.orgTree.set(INITIAL_ORG_SEED);
    this.saveToStorage();
  }

  saveToStorage() {
    try {
      localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(this.orgTree()));
    } catch (e) {
      console.warn('Error al guardar el árbol organizacional en localStorage', e);
    }
  }

  updateTree(newTree: OrgNode[]) {
    this.orgTree.set(newTree);
    this.saveToStorage();
  }

  /**
   * Retorna una lista aplanada de todas las unidades operativas activas (Direcciones, Subdirecciones, Áreas)
   * para su uso en listas desplegables (Selects).
   */
  flatActiveAreas = computed<AreaOption[]>(() => {
    const options: AreaOption[] = [];

    const traverse = (nodes: OrgNode[]) => {
      for (const node of nodes) {
        if (node.isActive) {
          options.push({
            code: node.code,
            label: node.code,
            fullLabel: `${node.code} - ${node.label}`
          });
        }
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };

    traverse(this.orgTree());
    return options;
  });
}
