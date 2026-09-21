import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-design-system-page-header',
  standalone: true,
  imports: [CommonModule, OefaPageHeaderComponent, OefaButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🧭 Encabezado de Página Institucional (Organismos)</h2>
          <p class="subtitle">Componente &lt;oefa-page-header&gt; unificado para títulos de módulo, navegación breadcrumb, badges de estado y barra de acciones.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tarjeta 1: Cabecera Estándar de Bandeja -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Cabecera de Bandeja con Acciones y Breadcrumb</h3>
          <span class="text-muted">Estructura canónica de cabecera de pantalla.</span>
        </div>
        <div class="card-body">
          <div class="header-preview-box">
            <oefa-page-header
              title="Bandeja de Órdenes de Servicio"
              subtitle="Control presupuestal y seguimiento de entregables 2026"
              badgeText="Vigente"
              badgeStatus="FINALIZADO"
              [breadcrumbs]="[
                { label: 'Inicio', url: '/' },
                { label: 'Contrataciones' },
                { label: 'Órdenes de Servicio' }
              ]">
              <div actions>
                <oefa-button variant="secondary" size="sm">📊 Exportar Excel</oefa-button>
                <oefa-button variant="primary" size="sm">+ Nueva Orden OS</oefa-button>
              </div>
            </oefa-page-header>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Cabecera de Detalle con Badge Crítico -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Cabecera de Ficha de Detalle</h3>
          <span class="text-muted">Para vistas interiores con estado de alerta o trámite.</span>
        </div>
        <div class="card-body">
          <div class="header-preview-box">
            <oefa-page-header
              title="Orden de Servicio OS-00019-2026"
              subtitle="Proveedor: FERNANDEZ JACOBO ISABEL MERCEDES — RUC: 10452319801"
              badgeText="Observado"
              badgeStatus="OBSERVADO"
              [breadcrumbs]="[
                { label: 'Órdenes', url: '/ordenes-servicio' },
                { label: 'OS-00019-2026' }
              ]">
              <div actions>
                <oefa-button variant="secondary" size="sm">Volver a Bandeja</oefa-button>
                <oefa-button variant="primary" size="sm">⚡ Registrar Evento</oefa-button>
              </div>
            </oefa-page-header>
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
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .header-preview-box { border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 20px; background: #ffffff; }
  `]
})
export class DesignSystemPageHeaderComponent {}
