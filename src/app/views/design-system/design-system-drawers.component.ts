import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaDrawerComponent } from '../../shared/components/drawer/drawer.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-design-system-drawers',
  standalone: true,
  imports: [CommonModule, OefaDrawerComponent, OefaButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📑 Paneles Laterales y Side Canvas (Organismos)</h2>
          <p class="subtitle">Componente &lt;oefa-drawer&gt; para fichas de detalle, filtros avanzados y paneles laterales deslizantes sin salir del contexto de la pantalla.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tarjeta 1: Disparadores de Demostración -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Demostración Interactiva de Drawer</h3>
          <span class="text-muted">Desliza desde la derecha con overlay y soporte para cerrar con Escape.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <oefa-button variant="primary" (clicked)="isDrawerOpen.set(true)">
              📑 Abrir Panel Lateral de Detalle (Drawer)
            </oefa-button>
          </div>
        </div>
      </div>

      <!-- Drawer de Ejemplo -->
      <oefa-drawer
        [isOpen]="isDrawerOpen()"
        title="Detalle del Entregable N° 1"
        subtitle="Informe Técnico de Diagnóstico Situacional"
        badge="CONFORME"
        size="md"
        (closed)="isDrawerOpen.set(false)">
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.875rem;">
          <div style="padding: 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
            <span style="font-size: 0.75rem; color: var(--oefa-text-secondary); text-transform: uppercase; font-weight: 700;">Orden Asociada</span>
            <div style="font-family: var(--oefa-font-mono); font-weight: 700; color: var(--oefa-primary-root); font-size: 1.125rem;">OS-00019-2026</div>
          </div>

          <div>
            <h4 style="margin: 0 0 6px; font-size: 0.875rem;">Plazos y Cronograma:</h4>
            <p style="margin: 0; color: var(--oefa-text-secondary);">Plazo otorgado: <strong>20 Días Calendario</strong></p>
            <p style="margin: 0; color: var(--oefa-text-secondary);">Fecha de Vencimiento: <strong>27/01/2026</strong></p>
          </div>

          <div>
            <h4 style="margin: 0 0 6px; font-size: 0.875rem;">Trazabilidad SIGED:</h4>
            <div style="padding: 10px; background: #ffffff; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-sm); font-family: var(--oefa-font-mono);">
              Expediente: 2026-E01-013000
            </div>
          </div>
        </div>
      </oefa-drawer>
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
  `]
})
export class DesignSystemDrawersComponent {
  isDrawerOpen = signal<boolean>(false);
}
