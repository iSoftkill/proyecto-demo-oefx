import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragScrollDirective } from '../../directives/drag-scroll.directive';
import { OrgStoreService } from '../../services/org-store.service';
import { ProyectoStoreService, ProyectoData, ProyectoTipo } from '../../services/proyecto-store.service';
import { ToastService } from '../../shared/components/toast/toast.service';

// ─────────────────────────────────────────────────────────────
//  INTERFACES
// ─────────────────────────────────────────────────────────────

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

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMINISTRADOR' | 'OPERADOR' | 'VISUALIZADOR';
  ssoCode: string;
  nodeAccess: string[];   // array de OrgNode.id
  isActive: boolean;
  lastLogin: string;
}

export interface DeliverableStateConfig {
  id: string;
  code: string;
  label: string;
  badgeClass: string;
  colorHex: string;
  isActive: boolean;
  displayOrder: number;
  description: string;
}

export interface AlertRule {
  id: string;
  offsetDays: number;
  channel: 'EMAIL' | 'INTERNO' | 'AMBOS';
  targetNodeId: string | null;
  targetPersonEmail: string;
  inheritsChildren: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, DragScrollDirective],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent implements OnInit {
  // ─── LocalStorage Cache Keys ──────────────────────────────
  private readonly ORG_TREE_CACHE_KEY = 'seosc_org_tree_cache_v2';
  private readonly USERS_CACHE_KEY = 'seosc_users_v2';

  // ─── State ────────────────────────────────────────────────
  activeTab = signal<'org-tree' | 'users' | 'states' | 'params' | 'proyectos'>('org-tree');
  toastMessage = signal<string>('');
  orgSearch = '';
  proyectoSearch = '';
  userRoleFilter = '';
  startDayRule: 'NEXT_DAY' | 'SAME_DAY' = 'NEXT_DAY';

  // ─── Modal State: Node (Oficina / Área) ───────────────────
  showNodeModal = signal<boolean>(false);
  isEditingNode = signal<boolean>(false);
  nodeForm = {
    id: '',
    label: '',
    code: '',
    level: 'subdireccion' as 'direccion' | 'subdireccion' | 'area',
    parentId: null as string | null,
    isActive: true
  };

  // ─── Modal State: User (SSO) ──────────────────────────────
  showUserModal = signal<boolean>(false);
  isEditingUser = signal<boolean>(false);
  userForm = {
    id: '',
    ssoCode: '',
    name: '',
    email: '',
    role: 'OPERADOR' as 'ADMINISTRADOR' | 'OPERADOR' | 'VISUALIZADOR',
    nodeAccess: [] as string[]
  };

  orgStoreService = inject(OrgStoreService);
  proyectoStoreService = inject(ProyectoStoreService);

  // ─── Modal State: Proyecto / Mantenimiento ─────────────────
  showProyectoModal = signal<boolean>(false);
  isEditingProyecto = signal<boolean>(false);
  proyectoForm: Partial<ProyectoData> & { tipo: ProyectoTipo } = {
    id: '',
    codigo: '',
    nombre: '',
    tipo: 'PROYECTO',
    fechaInicio: '',
    fechaFin: '',
    activo: true,
    origen: 'INTERNO'
  };

  get orgTree() {
    return this.orgStoreService.orgTree;
  }

  ngOnInit() {
    try {
      localStorage.removeItem('seosc_users_cache_v1');
    } catch (e) {}
    this.loadCachedData();
  }

  private loadCachedData() {
    try {
      const cachedUsers = localStorage.getItem(this.USERS_CACHE_KEY);
      if (cachedUsers) {
        this.users.set(JSON.parse(cachedUsers));
      } else {
        this.saveUsersCache();
      }
    } catch (e) {
      console.warn('No se pudo cargar el caché de localStorage:', e);
    }
  }

  private saveOrgTreeCache() {
    this.orgStoreService.saveToStorage();
  }

  private saveUsersCache() {
    try {
      localStorage.setItem(this.USERS_CACHE_KEY, JSON.stringify(this.users()));
    } catch (e) {
      console.warn('Error al guardar caché de Usuarios:', e);
    }
  }

  filteredOrgTree = computed(() => {
    const tree = this.orgTree();
    if (!this.orgSearch.trim()) return tree;
    const q = this.orgSearch.toLowerCase();
    return tree.filter(n =>
      n.label.toLowerCase().includes(q) ||
      n.code.toLowerCase().includes(q) ||
      n.children?.some(c => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
    );
  });

  filteredProyectos = computed(() => {
    const all = this.proyectoStoreService.proyectos();
    if (!this.proyectoSearch.trim()) return all;
    const q = this.proyectoSearch.toLowerCase();
    return all.filter(p =>
      p.codigo.toLowerCase().includes(q) ||
      p.nombre.toLowerCase().includes(q)
    );
  });

  flatOrgNodes = computed(() => {
    const result: OrgNode[] = [];
    const traverse = (nodes: OrgNode[]) => {
      nodes.forEach(n => {
        result.push(n);
        if (n.children) traverse(n.children);
      });
    };
    traverse(this.orgTree());
    return result;
  });

  toggleNode(node: OrgNode) {
    node.isExpanded = !node.isExpanded;
    this.orgTree.set([...this.orgTree()]);
  }

  // ─── Flow: Proyecto / Mantenimiento ──────────────────────
  openAddProyectoModal() {
    this.isEditingProyecto.set(false);
    this.proyectoForm = {
      id: '',
      codigo: '',
      nombre: '',
      tipo: 'PROYECTO',
      nodoCodigo: '',
      fechaInicio: '',
      fechaFin: '',
      activo: true,
      origen: 'INTERNO'
    };
    this.showProyectoModal.set(true);
  }

  editProyecto(p: ProyectoData) {
    if (p.origen === 'EXTERNO') return; // solo lectura
    this.isEditingProyecto.set(true);
    this.proyectoForm = { ...p };
    this.showProyectoModal.set(true);
  }

  saveProyecto() {
    const f = this.proyectoForm;
    if (!f.codigo?.trim() || !f.nombre?.trim()) return;

    if (this.isEditingProyecto() && f.id) {
      this.proyectoStoreService.update(f.id, {
        codigo: f.codigo,
        nombre: f.nombre,
        tipo: f.tipo,
        nodoCodigo: f.nodoCodigo || undefined,
        fechaInicio: f.fechaInicio || undefined,
        fechaFin: f.fechaFin || undefined,
        activo: f.activo ?? true
      });
      this.showToast('Proyecto / Mantenimiento actualizado con éxito.');
    } else {
      this.proyectoStoreService.add({
        codigo: f.codigo!,
        nombre: f.nombre!,
        tipo: f.tipo,
        nodoCodigo: f.nodoCodigo || undefined,
        fechaInicio: f.fechaInicio || undefined,
        fechaFin: f.fechaFin || undefined,
        activo: true,
        origen: 'INTERNO'
      });
      this.showToast('Nuevo Proyecto / Mantenimiento registrado con éxito.');
    }
    this.showProyectoModal.set(false);
  }

  closeProyectoModal() {
    this.showProyectoModal.set(false);
  }

  // ─── Flow: Node Creation / Edit ──────────────────────────
  openAddNodeModal() {
    this.isEditingNode.set(false);
    const tree = this.orgTree();
    this.nodeForm = {
      id: '',
      label: '',
      code: '',
      level: 'subdireccion',
      parentId: tree.length > 0 ? tree[0].id : null,
      isActive: true
    };
    this.showNodeModal.set(true);
  }

  editNode(node: OrgNode) {
    this.isEditingNode.set(true);
    this.nodeForm = {
      id: node.id,
      label: node.label,
      code: node.code,
      level: node.level,
      parentId: node.parentId,
      isActive: node.isActive
    };
    this.showNodeModal.set(true);
  }

  onNodeLevelChange(level: 'direccion' | 'subdireccion' | 'area') {
    this.nodeForm.level = level;
    const all = this.flatOrgNodes();
    if (level === 'direccion') {
      this.nodeForm.parentId = null;
    } else if (level === 'subdireccion') {
      const firstDir = all.find(n => n.level === 'direccion');
      this.nodeForm.parentId = firstDir ? firstDir.id : null;
    } else if (level === 'area') {
      const firstSub = all.find(n => n.level === 'subdireccion');
      this.nodeForm.parentId = firstSub ? firstSub.id : (all.length > 0 ? all[0].id : null);
    }
  }

  closeNodeModal() {
    this.showNodeModal.set(false);
  }

  saveNodeSubmit() {
    if (!this.nodeForm.label.trim() || !this.nodeForm.code.trim()) return;
    const currentTree = [...this.orgTree()];
    const allNodes = this.flatOrgNodes();

    if (this.isEditingNode()) {
      const node = allNodes.find(n => n.id === this.nodeForm.id);
      if (node) {
        node.label = this.nodeForm.label.trim();
        node.code = this.nodeForm.code.trim().toUpperCase();
        node.isActive = this.nodeForm.isActive;
        this.showToast(`✅ Nodo "${node.code}" actualizado correctamente.`);
      }
    } else {
      const newId = `node-${Date.now()}`;
      const newNode: OrgNode = {
        id: newId,
        label: this.nodeForm.label.trim(),
        code: this.nodeForm.code.trim().toUpperCase(),
        level: this.nodeForm.level,
        parentId: this.nodeForm.parentId,
        isActive: this.nodeForm.isActive,
        isExpanded: false,
        inUse: false,
        children: this.nodeForm.level !== 'area' ? [] : undefined
      };

      if (newNode.level === 'direccion') {
        currentTree.push(newNode);
      } else if (newNode.parentId) {
        const parent = allNodes.find(n => n.id === newNode.parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(newNode);
          parent.isExpanded = true;

          let currParentId = parent.parentId;
          while (currParentId) {
            const ancestor = allNodes.find(n => n.id === currParentId);
            if (ancestor) {
              ancestor.isExpanded = true;
              currParentId = ancestor.parentId;
            } else {
              break;
            }
          }
        }
      }

      this.showToast(`✅ Oficina / Área "${newNode.code}" agregada correctamente al Árbol Organizacional.`);
    }

    this.orgTree.set([...currentTree]);
    this.saveOrgTreeCache();
    this.closeNodeModal();
  }

  deleteNode(node: OrgNode) {
    if (node.inUse) {
      this.showToast(`⚠️ No se puede eliminar "${node.label}" porque está en uso en órdenes o usuarios.`);
      return;
    }

    if (confirm(`¿Está seguro de eliminar el nodo "${node.label} (${node.code})"?`)) {
      const currentTree = [...this.orgTree()];
      if (node.parentId) {
        const parent = this.flatOrgNodes().find(n => n.id === node.parentId);
        if (parent && parent.children) {
          parent.children = parent.children.filter(c => c.id !== node.id);
        }
      } else {
        const updated = currentTree.filter(n => n.id !== node.id);
        this.orgTree.set(updated);
        this.saveOrgTreeCache();
        this.showToast(`🗑️ Nodo "${node.code}" eliminado.`);
        return;
      }
      this.orgTree.set([...currentTree]);
      this.saveOrgTreeCache();
      this.showToast(`🗑️ Nodo "${node.code}" eliminado.`);
    }
  }

  // ─── Users Data (Signal) ─────────────────────────────────
  users = signal<SystemUser[]>([
    { id: 'u1', name: 'Jerson Brayan', email: 'jbrayan@oefa.gob.pe', role: 'ADMINISTRADOR', ssoCode: 'SSO-001', nodeAccess: [], isActive: true, lastLogin: '21/08/2026' }
  ]);

  filteredUsers = computed(() => {
    const list = this.users();
    if (!this.userRoleFilter) return list;
    return list.filter(u => u.role === this.userRoleFilter);
  });

  getRoleClass(role: string): string {
    if (role === 'ADMINISTRADOR') return 'admin';
    if (role === 'OPERADOR') return 'op';
    return 'viewer';
  }

  getNodeLabel(id: string): string {
    return this.flatOrgNodes().find(n => n.id === id)?.code ?? id;
  }

  // ─── Flow: User Creation / Edit (SSO) ────────────────────
  openAddUserModal() {
    this.isEditingUser.set(false);
    const tree = this.orgTree();
    this.userForm = {
      id: '',
      ssoCode: `SSO-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      email: '',
      role: 'OPERADOR',
      nodeAccess: tree.length > 0 ? [tree[0].id] : []
    };
    this.showUserModal.set(true);
  }

  editUser(user: SystemUser) {
    this.isEditingUser.set(true);
    this.userForm = {
      id: user.id,
      ssoCode: user.ssoCode,
      name: user.name,
      email: user.email,
      role: user.role,
      nodeAccess: [...user.nodeAccess]
    };
    this.showUserModal.set(true);
  }

  closeUserModal() {
    this.showUserModal.set(false);
  }

  lookupSsoMock() {
    const code = this.userForm.ssoCode.trim() || '45892011';
    this.userForm.ssoCode = code.startsWith('SSO-') ? code : `SSO-${code}`;
    this.userForm.name = 'Roberto Carlos Mendoza Solís';
    this.userForm.email = 'rmendoza_sso@oefa.gob.pe';
    this.showToast('🔍 Datos autocompletados desde el SSO Institucional OEFA.');
  }

  isNodeSelectedInUserForm(nodeId: string): boolean {
    return this.userForm.nodeAccess.includes(nodeId);
  }

  toggleUserNodeSelection(nodeId: string) {
    const idx = this.userForm.nodeAccess.indexOf(nodeId);
    if (idx >= 0) {
      this.userForm.nodeAccess.splice(idx, 1);
    } else {
      this.userForm.nodeAccess.push(nodeId);
    }
  }

  toggleAllNodeAccess() {
    const allIds = this.flatOrgNodes().map(n => n.id);
    if (this.userForm.nodeAccess.length === allIds.length) {
      this.userForm.nodeAccess = [];
    } else {
      this.userForm.nodeAccess = [...allIds];
    }
  }

  saveUserSubmit() {
    if (!this.userForm.name.trim() || !this.userForm.email.trim() || this.userForm.nodeAccess.length === 0) return;

    if (this.isEditingUser()) {
      const u = this.users().find(x => x.id === this.userForm.id);
      if (u) {
        u.ssoCode = this.userForm.ssoCode;
        u.name = this.userForm.name.trim();
        u.email = this.userForm.email.trim();
        u.role = this.userForm.role;
        u.nodeAccess = [...this.userForm.nodeAccess];
        this.showToast(`✅ Permisos y datos del usuario "${u.name}" actualizados.`);
      }
      this.users.set([...this.users()]);
    } else {
      const newUser: SystemUser = {
        id: `u-${Date.now()}`,
        ssoCode: this.userForm.ssoCode.trim() || `SSO-${Math.floor(100 + Math.random() * 900)}`,
        name: this.userForm.name.trim(),
        email: this.userForm.email.trim(),
        role: this.userForm.role,
        nodeAccess: [...this.userForm.nodeAccess],
        isActive: true,
        lastLogin: 'Nunca'
      };
      this.users.update(list => [newUser, ...list]);
      this.showToast(`✅ Usuario "${newUser.name}" registrado exitosamente con rol ${newUser.role}.`);
    }

    this.saveUsersCache();
    this.closeUserModal();
  }

  toggleUserActive(user: SystemUser) {
    user.isActive = !user.isActive;
    this.users.set([...this.users()]);
    this.saveUsersCache();
    this.showToast(`${user.name} → ${user.isActive ? 'Activado' : 'Desactivado'}`);
  }

  // ─── States Data ──────────────────────────────────────────
  states: DeliverableStateConfig[] = [
    { id: 's1', code: 'PENDIENTE',         label: 'Pendiente',             badgeClass: 'pendiente',       colorHex: '#94A3B8', isActive: true, displayOrder: 1, description: 'Estado inicial tras la notificación de la orden.' },
    { id: 's2', code: 'EN_REVISION',       label: 'En Revisión',           badgeClass: 'en-revision',     colorHex: '#144AA7', isActive: true, displayOrder: 2, description: 'Expediente SIGED registrado, en evaluación técnica.' },
    { id: 's3', code: 'OBSERVADO',         label: 'Observado',             badgeClass: 'observado',       colorHex: '#E51A2F', isActive: true, displayOrder: 3, description: 'Evaluación técnica encontró deficiencias en el entregable.' },
    { id: 's4', code: 'ATENDIDO_OBSERVADO',label: 'Atendido (Observado)',  badgeClass: 'atendido-obs',    colorHex: '#FFB500', isActive: true, displayOrder: 4, description: 'La observación fue derivada al contratista para subsanación.' },
    { id: 's5', code: 'NOTIFICADO',        label: 'Notificado',            badgeClass: 'notificado',      colorHex: '#44BFB5', isActive: true, displayOrder: 5, description: 'Contratista notificado formalmente de la observación.' },
    { id: 's6', code: 'PENDIENTE_FIRMA',   label: 'Pendiente de Firma',    badgeClass: 'pendiente-firma', colorHex: '#8CCD3A', isActive: true, displayOrder: 6, description: 'Conformidad técnica aprobada, esperando firma digital.' },
    { id: 's7', code: 'ATENDIDO',          label: 'Atendido',              badgeClass: 'atendido',        colorHex: '#578221', isActive: true, displayOrder: 7, description: 'Conformidad firmada digitalmente. Fin del ciclo de vida.' },
    { id: 's8', code: 'REBAJADO',          label: 'Rebajado',              badgeClass: 'rebajado',        colorHex: '#AA1223', isActive: true, displayOrder: 8, description: 'Entregable penalizado con rebaja en el monto correspondiente.' },
    { id: 's9', code: 'PREVISION',         label: 'Previsión',             badgeClass: 'prevision',       colorHex: '#1651B6', isActive: true, displayOrder: 9, description: 'Entregable diferido al siguiente ejercicio presupuestal.' }
  ];

  actionBadges = [
    { label: 'Expediente SIGED Registrado',           cssClass: 'info',    trigger: 'Acción SIGED / SUBSANAR_CONTRATISTA' },
    { label: 'Conformidad Técnica Aprobada',          cssClass: 'success', trigger: 'Acción APROBAR_CONFORMIDAD' },
    { label: 'Observación Técnica Registrada',        cssClass: 'warning', trigger: 'Acción OBSERVAR' },
    { label: 'Derivado a Área Notificadora',          cssClass: 'warning', trigger: 'Acción DERIVAR_OBSERVACION' },
    { label: 'Contratista Notificado Formalmente',    cssClass: 'info',    trigger: 'Acción NOTIFICAR_CONTRATISTA' },
    { label: 'Firma Digital Aplicada y Atendido',     cssClass: 'success', trigger: 'Acción FIRMAR_ATENDER' },
    { label: 'Documento SIGED Desestimado',           cssClass: 'default', trigger: 'Acción DESESTIMAR_SIGED' },
    { label: 'Previsión Fiscal Programada',           cssClass: 'info',    trigger: 'Acción PREVISION' }
  ];

  // ─── Params / SIGED ──────────────────────────────────────
  alertRules: AlertRule[] = [
    { id: 'a7', offsetDays: 7, channel: 'AMBOS',    targetNodeId: null, targetPersonEmail: '', inheritsChildren: true,  isActive: true },
    { id: 'a4', offsetDays: 4, channel: 'EMAIL',    targetNodeId: null, targetPersonEmail: '', inheritsChildren: true,  isActive: true },
    { id: 'a0', offsetDays: 0, channel: 'AMBOS',    targetNodeId: null, targetPersonEmail: '', inheritsChildren: false, isActive: true }
  ];

  getOffsetClass(days: number): string {
    if (days === 0) return 'urgent';
    if (days <= 4) return 'warning';
    return 'notice';
  }

  sigedConfig = {
    apiUrl: 'https://siged.oefa.gob.pe/api/v1/',
    apiKey: '',
    timeoutSec: 30,
    validateOnEntry: true,
    isConnected: false
  };

  testSigedConnection() {
    setTimeout(() => {
      this.sigedConfig.isConnected = true;
      this.showToast('✅ Conexión SIGED verificada correctamente');
    }, 800);
  }
  saveParams() { this.showToast('✅ Parámetros del sistema guardados correctamente'); }
  resetParams() { this.startDayRule = 'NEXT_DAY'; this.showToast('Parámetros restablecidos a valores por defecto'); }

  // ─── Toast Helper ─────────────────────────────────────────
  private toastService = inject(ToastService);
  private showToast(msg: string) {
    if (msg.includes('⚠️')) {
      this.toastService.warning(msg);
    } else if (msg.includes('🗑️') || msg.includes('Error')) {
      this.toastService.error(msg);
    } else {
      this.toastService.success(msg);
    }
  }
}
