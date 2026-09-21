import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaDrawerComponent } from '../../shared/components/drawer/drawer.component';
import { OefaDropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { OefaModalComponent } from '../../shared/components/modal/modal.component';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';

@Component({
  selector: 'app-design-system-navigation',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaDrawerComponent, OefaDropdownComponent, OefaModalComponent, OefaPageHeaderComponent, UserMenuComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🧭 Cabecera Institucional, Navegación y Paneles (Organismos)</h2>
          <p class="subtitle">Especificación del Top Header corporativo OEFA, Rail Lateral de 80px, Dropdowns y Drawers modales reutilizables.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 0: Paneles y Menús Reutilizables Angular (Shared) -->
      <div class="card ds-card" style="border: 2px solid var(--oefa-primary-root);">
        <div class="card-header" style="background: var(--oefa-primary-container);">
          <h3>✨ Componentes de Paneles y Menús (&lt;oefa-drawer&gt; &amp; &lt;oefa-dropdown&gt;)</h3>
          <span class="text-muted">Componentes standalone en <code>src/app/shared/components/</code> con control de estado, backdrop y accesibilidad.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <!-- Demo Dropdown -->
            <oefa-dropdown [(isOpen)]="isDropdownDemoOpen">
              <div trigger>
                <oefa-button variant="primary">
                  <span>Probar Menú Dropdown ▾</span>
                </oefa-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">📄 Ver Detalle de Orden</button>
                <button type="button" class="dropdown-item">📊 Exportar a Excel</button>
                <button type="button" class="dropdown-item">✏️ Editar Registros</button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item text-danger">🗑️ Eliminar / Desestimar</button>
              </div>
            </oefa-dropdown>

            <!-- Demo Drawer Right -->
            <oefa-button variant="secondary" (clicked)="isDrawerDemoOpen.set(true)">
              📑 Abrir Drawer de Demostración
            </oefa-button>

            <!-- Demo Modal -->
            <oefa-button variant="danger" (clicked)="isModalDemoOpen.set(true)">
              ⚠️ Abrir Modal de Confirmación
            </oefa-button>
          </div>

          <!-- Demo User Menu (Sección 8.3) -->
          <div style="margin-top: 24px; padding: 20px; border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-card); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h4 style="margin: 0 0 4px; font-size: 0.875rem; color: var(--oefa-text-primary);">Menú de Perfil de Usuario (&lt;oefa-user-menu&gt; - Sección 8.3):</h4>
              <p style="margin: 0; font-size: 0.75rem; color: var(--oefa-text-secondary);">Encapsula cabecera de perfil, gestión de sesión, enlaces a Centro de Ayuda y selector de temas.</p>
            </div>
            <oefa-user-menu></oefa-user-menu>
          </div>

          <!-- Modal interactivo de prueba -->
          <oefa-modal
            [isOpen]="isModalDemoOpen()"
            title="Confirmar Eliminación de Registro"
            subtitle="Esta acción no se puede deshacer y desestimará la orden."
            variant="danger"
            size="sm"
            confirmText="Sí, Eliminar"
            cancelText="Cancelar"
            (confirm)="isModalDemoOpen.set(false)"
            (close)="isModalDemoOpen.set(false)">
            <p style="margin: 0;">¿Está seguro de que desea eliminar la orden <strong>OS-00019-2026</strong>? Se notificará al área de abastecimiento.</p>
          </oefa-modal>

          <!-- Demo Page Header -->
          <div style="margin-top: 24px; padding: 20px; border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: #ffffff;">
            <h4 style="margin: 0 0 16px; font-size: 0.875rem; color: var(--oefa-text-secondary);">Muestra de &lt;oefa-page-header&gt;:</h4>
            <oefa-page-header
              title="Bandeja de Órdenes de Servicio"
              subtitle="Gestión y control de trazabilidad contractual OSOC 2026"
              badgeText="Vigente"
              badgeStatus="FINALIZADO"
              [breadcrumbs]="[
                { label: 'Inicio', url: '/' },
                { label: 'Contrataciones' },
                { label: 'Órdenes de Servicio' }
              ]">
              <div actions>
                <oefa-button variant="secondary" size="sm">Exportar</oefa-button>
                <oefa-button variant="primary" size="sm">+ Nueva Orden</oefa-button>
              </div>
            </oefa-page-header>
          </div>

          <!-- Drawer interactivo de prueba -->
          <oefa-drawer
            [isOpen]="isDrawerDemoOpen()"
            title="Detalle del Componente Drawer"
            subtitle="Side Canvas reutilizable para edición y detalles"
            badge="DEMO v1.0"
            size="md"
            (closed)="isDrawerDemoOpen.set(false)">
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <p style="font-size: 0.875rem; color: var(--oefa-text-secondary); margin: 0;">
                Este panel lateral se cierra automáticamente al pulsar la tecla <strong>Esc</strong>, haciendo clic en el backdrop oscurecido o en el botón de cerrar ✕.
              </p>
              
              <div style="padding: 12px; background: #F8FAFC; border: 1px solid var(--oefa-border-color); border-radius: 8px;">
                <strong style="font-size: 0.8125rem; color: var(--oefa-primary-root);">Propiedades disponibles:</strong>
                <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary);">
                  <li><code>[isOpen]="boolean"</code></li>
                  <li><code>[title]="string"</code></li>
                  <li><code>[subtitle]="string"</code></li>
                  <li><code>[badge]="string"</code></li>
                  <li><code>[size]="'sm' | 'md' | 'lg' | 'xl' | 'full'"</code></li>
                  <li><code>(closed)="onClose()"</code></li>
                </ul>
              </div>
            </div>

            <div footer style="display: flex; justify-content: flex-end; gap: 8px;">
              <oefa-button variant="secondary" (clicked)="isDrawerDemoOpen.set(false)">Cerrar</oefa-button>
              <oefa-button variant="primary" (clicked)="isDrawerDemoOpen.set(false)">Confirmar</oefa-button>
            </div>
          </oefa-drawer>
        </div>
      </div>

      <!-- Sección 1: Top Header Institucional -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Cabecera Institucional Superior (Top Header - .oefa-header)</h3>
          <span class="text-muted">Altura 64px, fondo blanco <code>#FFFFFF</code>, identificadores oficiales de entidad y sistema SEOSC, notificaciones y perfil.</span>
        </div>
        <div class="card-body">
          <div class="header-demo-box">
            <div class="header-left">
              <button class="icon-btn menu-toggle active" title="Menú Fijo">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>

              <div class="brand-group">
                <div class="oefa-brand-logo">
                  <span class="oefa-text-oefa">Oefa</span>
                  <span class="oefa-subtitle">Organismo de Evaluación<br>y Fiscalización Ambiental</span>
                </div>
                <div class="brand-divider"></div>
                <div class="system-brand">
                  <span class="plusd-title">SEOSC</span>
                  <span class="plusd-sub">Seguimiento de Ordenes <br>de Servicios y Compras</span>
                </div>
              </div>
            </div>

            <div class="header-right">
              <div class="header-action-demo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                <span class="notification-badge">3</span>
              </div>

              <div class="user-profile-demo">
                <div class="avatar-circle">JA</div>
                <span class="user-name">J. Alvarez</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Sidebar Rail y Panel Submenú -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Estructura de Navegación Lateral (Rail + Submenú 3 Niveles)</h3>
        </div>
        <div class="card-body">
          <div class="nav-states-grid">
            <div class="nav-state-card">
              <span class="state-tag">ESTADO 1: PINNED (FIJO)</span>
              <strong>Submenú Fijo Visible (240px)</strong>
              <p>El submenú se mantiene anclado permanentemente junto al espacio de trabajo. Ideal para usuarios intensivos en pantallas grandes (<code>&gt; 1024px</code>).</p>
            </div>

            <div class="nav-state-card">
              <span class="state-tag">ESTADO 2: FLOATING (FLOTANTE)</span>
              <strong>Popover al Pasar el Cursor</strong>
              <p>El submenú se despliega únicamente al pasar el cursor sobre un ítem del Rail, liberando el 100% del espacio de trabajo.</p>
            </div>

            <div class="nav-state-card">
              <span class="state-tag">ESTADO 3: HIDDEN / MOBILE (OCULTO)</span>
              <strong>Oculto con Botón Hamburguesa</strong>
              <p>En teléfonos y tablets (<code>&lt; 768px</code>), la barra lateral se repliega completamente y se abre como overlay flotante.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: white; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .header-demo-box { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: #FFFFFF; }
    .header-left, .header-right { display: flex; align-items: center; gap: 16px; }
    .brand-group { display: flex; align-items: center; gap: 14px; }
    .oefa-brand-logo { display: flex; align-items: center; gap: 8px; }
    .oefa-text-oefa { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1.5rem; color: #0F4C81; }
    .oefa-subtitle { font-size: 0.625rem; color: #64748B; line-height: 1.2; }
    .brand-divider { height: 24px; width: 1px; background-color: #E2E8F0; }
    .plusd-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1.125rem; color: #2C817A; }
    .plusd-sub { font-size: 0.625rem; color: #64748B; }

    .header-action-demo { position: relative; width: 36px; height: 36px; border-radius: 8px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; color: var(--oefa-text-secondary); }
    .notification-badge { position: absolute; top: 2px; right: 2px; background: var(--oefa-error-root); color: white; font-size: 0.625rem; font-weight: 700; width: 15px; height: 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .user-profile-demo { display: flex; align-items: center; gap: 8px; padding: 4px 10px; border-radius: 20px; background: #F1F5F9; }
    .avatar-circle { width: 28px; height: 28px; border-radius: 50%; background: var(--oefa-primary-root); color: white; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .user-name { font-size: 0.875rem; font-weight: 600; color: var(--oefa-text-primary); }

    .nav-states-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .nav-state-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 20px; background: #F8FAFC; display: flex; flex-direction: column; gap: 8px; }
    .state-tag { font-size: 0.75rem; font-weight: 700; color: var(--oefa-primary-root); }
    .nav-state-card strong { font-size: 0.9375rem; color: var(--oefa-text-primary); }
    .nav-state-card p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.4; }
  `]
})
export class DesignSystemNavigationComponent {
  isDrawerDemoOpen = signal<boolean>(false);
  isModalDemoOpen = signal<boolean>(false);
  isDropdownDemoOpen = false;
}
