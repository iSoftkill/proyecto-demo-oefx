import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaTabsComponent, OefaTabItem } from '../../shared/components/tabs/tabs.component';

@Component({
  selector: 'app-design-system-tabs',
  standalone: true,
  imports: [CommonModule, OefaTabsComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📑 Pestañas y Navegación (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-tabs&gt; para navegación horizontal por secciones con badges y accesibilidad WAI-ARIA (role="tablist").</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Sección 1: Demostración Interactiva de Tabs -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Pestañas Horizontales Reutilizables (&lt;oefa-tabs&gt;)</h3>
          <span class="text-muted">Utilizadas en el módulo Configuración (Árbol, Proyectos, Usuarios) y en la Ficha de Detalle de Orden.</span>
        </div>
        <div class="card-body">
          <oefa-tabs
            [tabs]="navTabs"
            [(activeTab)]="currentTab">
            <!-- Contenido dinámico según tab seleccionada -->
            <div class="tab-content-box">
              @switch (currentTab()) {
                @case ('general') {
                  <div class="tab-pane">
                    <strong>Contenido de Información General:</strong> Muestra los datos de la cabecera de la orden, proveedor, RUC y montos.
                  </div>
                }
                @case ('deliverables') {
                  <div class="tab-pane">
                    <strong>Contenido de Entregables y Pagos:</strong> Muestra la matriz plana de 3 entregables registrados con sus respectivas fechas LPAG.
                  </div>
                }
                @case ('history') {
                  <div class="tab-pane">
                    <strong>Contenido de Historial:</strong> Bitácora temporal de cambios de estado y expediente SIGED.
                  </div>
                }
              }
            </div>
          </oefa-tabs>
        </div>
      </div>

      <!-- Sección 2: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación de Uso</h3>
          <span class="text-muted">Vinculación bidireccional simple con array de tabs tipado <code>OefaTabItem[]</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block"><code>&lt;oefa-tabs
  [tabs]="[
    &#123; id: 'info', label: 'Información General', icon: '📋' &#125;,
    &#123; id: 'entregables', label: 'Entregables', icon: '📦', badge: 3 &#125;
  ]"
  [(activeTab)]="selectedTab"&gt;
  &lt;!-- Tu contenido de vistas aquí --&gt;
&lt;/oefa-tabs&gt;</code></pre>
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

    .tab-content-box { padding: 20px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); }
    .tab-pane { font-size: 0.875rem; color: var(--oefa-text-primary); }

    .code-block { margin: 0; padding: 14px; background: #0f172a; color: #f8fafc; border-radius: var(--oefa-radius-md); font-family: var(--oefa-font-mono, monospace); font-size: 0.8125rem; overflow-x: auto; }
  `]
})
export class DesignSystemTabsComponent {
  currentTab = signal<string>('deliverables');

  navTabs: OefaTabItem[] = [
    { id: 'general', label: 'Información General', icon: '📋' },
    { id: 'deliverables', label: 'Entregables y Pagos', icon: '📦', badge: 3 },
    { id: 'history', label: 'Historial de Trazabilidad', icon: '📜' }
  ];
}
