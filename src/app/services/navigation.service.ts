import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export type SidebarMode = 'hidden' | 'floating' | 'pinned';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  children?: NavTreeGroup[];
}

export interface NavTreeItem {
  id: string;
  label: string;
  route?: string;
  badge?: string;
  badgeDot?: boolean;
  badgeCount?: number;
  isExpanded?: boolean;
  children?: NavTreeItem[];
}

export interface NavTreeGroup {
  groupName: string;
  items: NavTreeItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Sidebar states: 'hidden' | 'floating' | 'pinned'
  sidebarMode = signal<SidebarMode>('pinned');
  isMobileScreen = signal<boolean>(false);
  activeItemId = signal<string>('catalogo');
  hoveredItemId = signal<string | null>(null);
  selectedTreeItemId = signal<string>('');
  clickedFlyoutItemId = signal<string | null>(null);

  // Quick action '+' button and modal configuration
  showQuickAction = signal<boolean>(false);
  isQuickActionOpen = signal<boolean>(false);

  setShowQuickAction(show: boolean): void {
    this.showQuickAction.set(show);
  }

  // Navigation Items: Módulos OEFA + Sistema de Diseño + Ejemplo Jerárquico Demo
  navItems: NavItem[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: 'home',
      route: '/inicio'
    },
    {
      id: 'catalogo',
      label: 'Catálogo',
      icon: 'grid',
      route: '/catalogo'
    },
    {
      id: 'configuraciones',
      label: 'Configuraciones',
      icon: 'settings',
      children: [
        {
          groupName: 'Configuraciones',
          items: [
            {
              id: 'tableros',
              label: 'Tableros',
              route: '/configuraciones/tableros'
            }
          ]
        }
      ]
    }
  ];

  private router = inject(Router);

  constructor() {
    this.checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.checkScreenSize());
    }

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.syncActiveItemWithUrl(event.urlAfterRedirects || event.url);
    });
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      this.isMobileScreen.set(isMobile);
      if (isMobile && this.sidebarMode() === 'pinned') {
        this.sidebarMode.set('hidden');
      }
    }
  }

  togglePinned() {
    if (this.isMobileScreen()) {
      if (this.sidebarMode() === 'hidden') {
        this.sidebarMode.set('floating');
      } else {
        this.sidebarMode.set('hidden');
      }
    } else {
      if (this.sidebarMode() === 'pinned') {
        this.sidebarMode.set('hidden');
      } else {
        this.sidebarMode.set('pinned');
      }
    }
  }

  setActiveItem(id: string) {
    this.activeItemId.set(id);
    if (this.sidebarMode() === 'hidden') {
      this.sidebarMode.set('floating');
    }
  }

  private hoverTimeout: any = null;

  setHoveredItem(id: string | null, delayMs = 120) {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    if (id) {
      this.hoveredItemId.set(id);
    } else {
      this.hoverTimeout = setTimeout(() => {
        this.hoveredItemId.set(null);
      }, delayMs);
    }
  }

  cancelHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  closeFloating() {
    this.setHoveredItem(null, 0);
    if (this.sidebarMode() === 'floating') {
      this.sidebarMode.set('hidden');
    }
  }

  setActiveParentForTreeItem(id: string) {
    for (const nav of this.navItems) {
      if (nav.children) {
        let found = false;
        for (const group of nav.children) {
          const checkItems = (items: NavTreeItem[]): boolean => {
            for (const item of items) {
              if (item.id === id) return true;
              if (item.children && checkItems(item.children)) return true;
            }
            return false;
          };
          if (checkItems(group.items)) {
            found = true;
            break;
          }
        }
        if (found) {
          this.activeItemId.set(nav.id);
          break;
        }
      }
    }
  }

  selectTreeItem(id: string) {
    this.selectedTreeItemId.set(id);
    this.setActiveParentForTreeItem(id);

    // Limpiar previsualizaciones flotantes
    this.setHoveredItem(null, 0);

    if (this.isMobileScreen() || this.sidebarMode() === 'floating') {
      this.sidebarMode.set('hidden');
    }
  }

  private syncActiveItemWithUrl(url: string) {
    this.clickedFlyoutItemId.set(null);
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Caso 1: Sub-flujos de órdenes (nueva orden, detalle)
    if (cleanUrl.startsWith('/nueva-orden') || cleanUrl.startsWith('/ordenes/')) {
      if (cleanUrl.startsWith('/ordenes/oc-')) {
        this.activeItemId.set('ordenes_compra');
      } else {
        this.activeItemId.set('ordenes_servicio');
      }
      this.selectedTreeItemId.set('');
      return;
    }

    // Caso 2: Verificar si el sub-ítem seleccionado en el árbol corresponde a esta URL
    const matchingTreeItem = this.findTreeItemByRoute(cleanUrl);
    if (matchingTreeItem) {
      this.selectedTreeItemId.set(matchingTreeItem.id);
      this.setActiveParentForTreeItem(matchingTreeItem.id);
      return;
    }

    // Caso 3: Coincidencia con ítem principal del menú
    const mainNav = this.navItems.find(item => item.route === cleanUrl);
    if (mainNav) {
      this.activeItemId.set(mainNav.id);
      this.selectedTreeItemId.set('');
    }
  }

  private findTreeItemByRoute(route: string): NavTreeItem | null {
    for (const nav of this.navItems) {
      if (nav.children) {
        for (const group of nav.children) {
          const search = (items: NavTreeItem[]): NavTreeItem | null => {
            for (const item of items) {
              if (item.route === route) return item;
              if (item.children) {
                const childResult = search(item.children);
                if (childResult) return childResult;
              }
            }
            return null;
          };
          const res = search(group.items);
          if (res) return res;
        }
      }
    }
    return null;
  }

  private findTreeItemById(id: string): NavTreeItem | null {
    for (const nav of this.navItems) {
      if (nav.children) {
        for (const group of nav.children) {
          const search = (items: NavTreeItem[]): NavTreeItem | null => {
            for (const item of items) {
              if (item.id === id) return item;
              if (item.children) {
                const childResult = search(item.children);
                if (childResult) return childResult;
              }
            }
            return null;
          };
          const res = search(group.items);
          if (res) return res;
        }
      }
    }
    return null;
  }

  openQuickAction() {
    this.isQuickActionOpen.set(false);
    this.router.navigate(['/nueva-orden']);
  }

  closeQuickAction() {
    this.isQuickActionOpen.set(false);
  }
}
