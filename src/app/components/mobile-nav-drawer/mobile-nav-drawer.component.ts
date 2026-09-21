import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService, NavItem, NavTreeItem } from '../../services/navigation.service';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';

export interface MobileNavLevel {
  title: string;
  items: (NavItem | NavTreeItem)[];
}

@Component({
  selector: 'app-mobile-nav-drawer',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaIconButtonComponent],
  template: `
    <div 
      class="mobile-nav-drawer" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Menú principal de navegación"
    >
      <!-- Cabecera del Drawer con botón principal de Nueva Orden y soporte Drill-Down -->
      <div class="drawer-header">
        @if (navStack().length > 1) {
          <oefa-button 
            variant="ghost" 
            size="sm" 
            class="btn-back-action"
            (clicked)="goBack()" 
            [title]="'Volver a ' + getPreviousLevelTitle()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Volver</span>
          </oefa-button>
        } @else {
          <oefa-button 
            variant="primary" 
            size="md" 
            class="btn-quick-order"
            title="Nueva Orden / Registro Rápido"
            (clicked)="onQuickAdd()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Nueva Orden</span>
          </oefa-button>
        }

        <!-- Botón cerrar Drawer con componente institucional -->
        <oefa-icon-button 
          variant="close" 
          title="Cerrar menú de navegación"
          (clicked)="closeMenu()" 
        />
      </div>

      <!-- Título de la sección o nivel actual en Drill-Down -->
      @if (navStack().length > 1) {
        <div class="current-section-bar">
          <span class="section-label">{{ currentLevel().title }}</span>
        </div>
      }

      <!-- Contenedor con transición horizontal de niveles (Drill-Down Panels) -->
      <div class="drawer-viewport">
        <div class="drawer-list" role="list">
          @for (item of currentLevel().items; track getItemId(item)) {
            <div 
              class="drawer-item-row"
              [class.active]="isItemActive(item)"
              role="listitem"
              tabindex="0"
              (click)="onItemClick(item)"
              (keydown.enter)="onItemClick(item)"
              (keydown.space)="$event.preventDefault(); onItemClick(item)"
            >
              <!-- Ícono dinámico según item.icon -->
              @if (hasIcon(item)) {
                <div class="item-icon-box">
                  @switch (getItemIcon(item)) {
                    @case ('grid') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    }
                    @case ('file-text') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                        <path d="M10 9H8"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                      </svg>
                    }
                    @case ('shopping-cart') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="8" cy="21" r="1"/>
                        <circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                      </svg>
                    }
                    @case ('folder') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3A2 2 0 0 0 6.9 2.5H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/>
                      </svg>
                    }
                    @case ('inbox') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                      </svg>
                    }
                    @case ('layers') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                      </svg>
                    }
                    @case ('palette') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.18-.85-.46-1.16-.27-.3-.44-.71-.44-1.16 0-.92.75-1.67 1.67-1.67H17c2.76 0 5-2.24 5-5 0-4.69-4.5-8.38-10-8.38z"/>
                      </svg>
                    }
                    @case ('settings') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                      </svg>
                    }
                    @case ('sliders') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="4" y1="21" x2="4" y2="14"/>
                        <line x1="4" y1="10" x2="4" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12" y2="3"/>
                        <line x1="20" y1="21" x2="20" y2="16"/>
                        <line x1="20" y1="12" x2="20" y2="3"/>
                        <line x1="1" y1="14" x2="7" y2="14"/>
                        <line x1="9" y1="8" x2="15" y2="8"/>
                        <line x1="17" y1="16" x2="23" y2="16"/>
                      </svg>
                    }
                  }
                </div>
              }

                <!-- Texto y badges -->
                <div class="item-label-container">
                  <span class="item-label-text">{{ item.label }}</span>
                  @if (getBadgeDot(item)) {
                    <span class="badge-dot" aria-label="Notificación pendiente"></span>
                  }
                  @if (getBadgeCount(item)) {
                    <span class="badge-count">{{ getBadgeCount(item) }}</span>
                  }
                </div>

              <!-- Indicador si tiene hijos (Flecha hacia adelante >) -->
              @if (hasChildren(item)) {
                <div class="drill-arrow" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mobile-nav-drawer {
      display: flex;
      flex-direction: column;
      width: 310px;
      max-width: 85vw;
      height: 100%;
      background: var(--oefa-surface-card, #ffffff);
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
      border-right: 1px solid var(--oefa-border-color, #e2e8f0);
      overflow: hidden;
      animation: drawerSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes drawerSlideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--oefa-border-color, #e2e8f0);
      background: var(--oefa-surface-subtle, #f8fafc);
      min-height: 56px;
      box-sizing: border-box;
    }

    .btn-quick-order {
      flex: 1;

      ::ng-deep .btn {
        width: 100%;
        justify-content: center;
        gap: 8px;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(20, 74, 167, 0.25);
      }
    }

    .btn-back-action {
      ::ng-deep .btn {
        gap: 6px;
        font-weight: 700;
        color: var(--oefa-primary-root, #144AA7);
      }
    }

    .current-section-bar {
      padding: 10px 18px;
      background: var(--oefa-primary-container, #eef4ff);
      border-bottom: 1px solid #c7dbfb;
    }

    .section-label {
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--oefa-primary-root, #144AA7);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .drawer-viewport {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;
    }

    .drawer-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 0 10px;
    }

    .drawer-item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-radius: var(--oefa-radius-md, 8px);
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
      user-select: none;
      outline: none;

      &:hover {
        background-color: var(--oefa-surface-subtle, #f8fafc);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-primary-root, #144AA7);
        outline-offset: 1px;
      }

      &.active {
        background-color: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144AA7);
        font-weight: 700;

        .drill-arrow {
          color: var(--oefa-primary-root, #144AA7);
        }
      }
    }

    .item-icon-box {
      display: flex;
      align-items: center;
      margin-right: 12px;
      color: var(--oefa-text-secondary, #64748b);
    }

    .item-label-container {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .item-label-text {
      font-size: 0.875rem;
      color: inherit;
      white-space: normal;
      line-height: 1.3;
      word-break: break-word;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--oefa-error-root, #e51a2f);
      flex-shrink: 0;
    }

    .badge-count {
      background-color: var(--oefa-primary-root, #144aa7);
      color: white;
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 100px;
      flex-shrink: 0;
    }

    .drill-arrow {
      display: flex;
      align-items: center;
      color: var(--oefa-text-muted, #94a3b8);
      margin-left: 8px;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }

    .drawer-item-row:hover .drill-arrow {
      transform: translateX(2px);
      color: var(--oefa-primary-root, #144AA7);
    }
  `]
})
export class MobileNavDrawerComponent {
  navService = inject(NavigationService);
  router = inject(Router);

  // Pila de navegación (Stack) para el efecto Drill-Down
  navStack = signal<MobileNavLevel[]>([
    {
      title: 'Menú Principal',
      items: this.navService.navItems
    }
  ]);

  currentLevel() {
    const stack = this.navStack();
    return stack[stack.length - 1];
  }

  getPreviousLevelTitle(): string {
    const stack = this.navStack();
    return stack.length > 1 ? stack[stack.length - 2].title : 'Menú Principal';
  }

  onItemClick(item: any): void {
    // Si tiene hijos (grupos de nivel 1 o subchildren)
    if (item.children && item.children.length > 0) {
      let nextItems: any[] = [];
      // Si los hijos son grupos (NavTreeGroup) los aplanamos para listarlos directamente
      if (item.children[0]?.groupName && item.children[0]?.items) {
        nextItems = item.children.flatMap((g: any) => g.items);
      } else {
        nextItems = item.children;
      }

      this.navStack.update(stack => [
        ...stack,
        {
          title: item.label,
          items: nextItems
        }
      ]);
    } else if (item.route) {
      // Es un ítem final con ruta: navegar y cerrar drawer
      this.navService.selectTreeItem(item.id);
      this.router.navigateByUrl(item.route);
      this.closeMenu();
    }
  }

  goBack(): void {
    if (this.navStack().length > 1) {
      this.navStack.update(stack => stack.slice(0, -1));
    }
  }

  closeMenu(): void {
    this.navService.sidebarMode.set('hidden');
    // Reiniciar stack al nivel raíz al cerrar
    this.navStack.set([
      {
        title: 'Menú Principal',
        items: this.navService.navItems
      }
    ]);
  }

  onQuickAdd(): void {
    this.closeMenu();
    this.navService.openQuickAction();
  }

  getItemId(item: any): string {
    return item.id || item.label;
  }

  hasIcon(item: any): boolean {
    return !!item?.icon;
  }

  getItemIcon(item: any): string {
    return item?.icon || '';
  }

  hasChildren(item: any): boolean {
    return !!(item.children && item.children.length > 0);
  }

  getBadgeDot(item: any): boolean {
    return !!item?.badgeDot;
  }

  getBadgeCount(item: any): number | null {
    return item?.badgeCount || null;
  }

  isItemActive(item: any): boolean {
    if (item.id === this.navService.activeItemId()) return true;
    if (item.id === this.navService.selectedTreeItemId()) return true;
    return false;
  }
}
