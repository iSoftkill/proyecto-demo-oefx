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
  activeItemId = signal<string>('dashboard');
  hoveredItemId = signal<string | null>(null);
  selectedTreeItemId = signal<string>('');

  // Quick action '+' modal trigger
  isQuickActionOpen = signal<boolean>(false);

  // Navigation Items: Módulos OEFA + Sistema de Diseño + Ejemplo Jerárquico Demo
  navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'grid',
      route: '/dashboard'
    },
    {
      id: 'ordenes_servicio',
      label: 'Órdenes de Servicio',
      icon: 'file-text',
      route: '/ordenes-servicio'
    },
    {
      id: 'ordenes_compra',
      label: 'Órdenes de Compra',
      icon: 'shopping-cart',
      route: '/ordenes-compra'
    },
    {
      id: 'saip_solicitud',
      label: 'Solicitud SAIP',
      icon: 'inbox',
      route: '/saip/solicitud'
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: 'settings',
      route: '/configuracion'
    },
    {
      id: 'sistema_diseno',
      label: 'Sistema Diseño',
      icon: 'palette',
      route: '/design-system/colores',
      children: [
        {
          groupName: '1. ÁTOMOS (ATOMS)',
          items: [
            {
              id: 'ds_colores',
              label: 'Colores y Tokens',
              route: '/design-system/colores'
            },
            {
              id: 'ds_tipografia',
              label: 'Tipografía',
              route: '/design-system/tipografia'
            },
            {
              id: 'ds_motion',
              label: 'Motion M3 Expressive',
              route: '/design-system/motion'
            },
            {
              id: 'ds_iconos',
              label: 'Iconos y Reglas',
              route: '/design-system/iconos'
            },
            {
              id: 'ds_botones',
              label: 'Botones (<oefa-button>)',
              route: '/design-system/botones'
            },
            {
              id: 'ds_badges',
              label: 'Badges y Chips (<oefa-status-badge>)',
              route: '/design-system/badges'
            },
            {
              id: 'ds_feedback',
              label: 'Carga: Skeleton vs Spinner',
              route: '/design-system/feedback'
            },
            {
              id: 'ds_inputs',
              label: 'Inputs y Controles Básicos',
              route: '/design-system/inputs'
            }
          ]
        },
        {
          groupName: '2. MOLÉCULAS (MOLECULES)',
          items: [
            {
              id: 'ds_bento_kpi',
              label: 'Bento KPI Tiles (<oefa-bento-kpi-tile>)',
              route: '/design-system/bento-kpi'
            },
            {
              id: 'ds_catalog_cards',
              label: 'Catalog Cards (<oefa-catalog-card>)',
              route: '/design-system/catalog-cards'
            },
            {
              id: 'ds_alertas',
              label: 'Alertas en Bloque (<oefa-alert>)',
              route: '/design-system/alertas'
            },
            {
              id: 'ds_toasts',
              label: 'Notificaciones Toast (<oefa-toast>)',
              route: '/design-system/toasts'
            },
            {
              id: 'ds_selection_cards',
              label: 'Tarjetas de Selección (<oefa-selection-card>)',
              route: '/design-system/selection-cards'
            },
            {
              id: 'ds_date_picker',
              label: 'Selector de Fecha (<oefa-date-picker>)',
              route: '/design-system/date-picker'
            },
            {
              id: 'ds_file_uploader',
              label: 'Cargador de Archivos (<oefa-file-uploader>)',
              route: '/design-system/file-uploader'
            },
            {
              id: 'ds_switch',
              label: 'Switch (<oefa-segmented-switch>)',
              route: '/design-system/segmented-switch'
            },
            {
              id: 'ds_paginacion',
              label: 'Paginador (<oefa-pagination>)',
              route: '/design-system/paginacion'
            },
            {
              id: 'ds_dropdowns',
              label: 'Dropdowns (<oefa-dropdown>)',
              route: '/design-system/dropdowns'
            },
            {
              id: 'ds_empty_states',
              label: 'Estados Vacíos (<oefa-empty-state>)',
              route: '/design-system/empty-states'
            },
            {
              id: 'ds_tabs',
              label: 'Pestañas (Tabs)',
              route: '/design-system/tabs'
            },
            {
              id: 'ds_steps',
              label: 'Stepper (Wizard)',
              route: '/design-system/steps'
            }
          ]
        },
        {
          groupName: '3. ORGANISMOS (ORGANISMS)',
          items: [
            {
              id: 'ds_filter_sidebar',
              label: 'Filter Sidebar (<oefa-filter-sidebar>)',
              route: '/design-system/filter-sidebar'
            },
            {
              id: 'ds_modales',
              label: 'Modales (<oefa-modal>)',
              route: '/design-system/modales'
            },
            {
              id: 'ds_drawers',
              label: 'Drawers (<oefa-drawer>)',
              route: '/design-system/drawers'
            },
            {
              id: 'ds_page_header',
              label: 'Encabezado (<oefa-page-header>)',
              route: '/design-system/page-header'
            },
            {
              id: 'ds_tablas',
              label: 'Tablas y Matrices',
              route: '/design-system/tablas'
            }
          ]
        },
        {
          groupName: '4. PLANTILLAS Y LAYOUT (TEMPLATES)',
          items: [
            {
              id: 'ds_navegacion',
              label: 'Cabecera y Sidebar Rail',
              route: '/design-system/navegacion'
            },
            {
              id: 'ds_responsividad',
              label: 'Responsividad y Breakpoints',
              route: '/design-system/responsividad'
            }
          ]
        }
      ]
    },
    {
      id: 'ejemplo_jerarquico',
      label: 'Ejemplo Demo',
      icon: 'layers',
      route: '/demo/ejemplo-jerarquico',
      children: [
        {
          groupName: 'DEMO TRES NIVELES asdas asd asd ad asd asd as asdA DAS ASD AS',
          items: [
            {
              id: 'ejemplo_modulo_a',
              label: 'Módulo Ejemplo A',
              route: '/demo/modulo-ejemplo-a',
              isExpanded: true,
              children: [
                {
                  id: 'ejemplo_subopcion_a1',
                  label: 'Subopción A.1',
                  route: '/demo/subopcion-a1'
                },
                {
                  id: 'ejemplo_subopcion_a2',
                  label: 'Subopción A.2',
                  route: '/demo/subopcion-a2'
                }
              ]
            },
            {
              id: 'ejemplo_modulo_b',
              label: 'Módulo Ejemplo B',
              route: '/demo/modulo-ejemplo-b'
            }
          ]
        }
      ]
    },
    {
      id: 'sandbox_lab',
      label: '🧪 Sandbox Lab de Componentes',
      icon: 'sliders',
      route: '/sandbox'
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
