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
          <p class="subtitle">Componente &lt;oefa-tabs&gt; con soporte de iconos, badges numéricos, puntito rojo de alerta, tooltips contextuales y accesibilidad WAI-ARIA.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Pestañas con Icono, Badges Numéricos y Puntito Rojo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Pestañas con Iconos, Badges y Puntito de Alerta (Variante 'underline')</h3>
          <span class="text-muted">Integra glifos/iconos vectoriales, contadores numéricos (<code>badge: 3</code>), puntito rojo de atención (<code>badgeDot: true</code>) y tooltips institucionales (<code>infoTooltip: '...'</code>).</span>
        </div>
        <div class="card-body">
          <oefa-tabs
            [tabs]="iconTabs"
            [(activeTab)]="currentIconTab">
            <div class="tab-content-box">
              @switch (currentIconTab()) {
                @case ('general') {
                  <div class="tab-pane">
                    <strong>Información General:</strong> Ficha técnica de la orden de servicio, proveedor, RUC, certificaciones presupuestales y montos SIAF.
                  </div>
                }
                @case ('deliverables') {
                  <div class="tab-pane">
                    <strong>Entregables y Pagos (3 Registrados):</strong> Matriz plana de hitos con semáforo de plazos según Ley de Procedimiento Administrativo General (LPAG).
                  </div>
                }
                @case ('alerts') {
                  <div class="tab-pane">
                    <strong class="text-danger">Alertas y Observaciones Críticas (Puntito Rojo Activo):</strong> Existen 2 observaciones pendientes de subsanación por parte del contratista.
                  </div>
                }
                @case ('history') {
                  <div class="tab-pane">
                    <strong>Historial de Trazabilidad:</strong> Bitácora inmutable de eventos, derivaciones de expediente SIGED y firmas digitales.
                  </div>
                }
              }
            </div>
          </oefa-tabs>
        </div>
      </div>

      <!-- Tarjeta 2: Pestañas Sin Icono (Formato Texto Puro) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Pestañas Sin Icono (Tipografía Limpia Minimalista)</h3>
          <span class="text-muted">Cuando la vista requiere máxima sobriedad o alta densidad sin sobrecarga visual, omitiendo el parámetro <code>icon</code>.</span>
        </div>
        <div class="card-body">
          <oefa-tabs
            [tabs]="textOnlyTabs"
            [(activeTab)]="currentTextTab">
            <div class="tab-content-box">
              @switch (currentTextTab()) {
                @case ('resumen') {
                  <div class="tab-pane">
                    <strong>Resumen Ejecutivo:</strong> Cuadro comparativo de avances físicos y financieros consolidados de la coordinación.
                  </div>
                }
                @case ('adendas') {
                  <div class="tab-pane">
                    <strong>Adendas y Prórrogas (1 Aprobada):</strong> Registro de modificaciones contractuales y suspensiones de plazo.
                  </div>
                }
                @case ('penalidades') {
                  <div class="tab-pane">
                    <strong>Penalidades y Deducciones (Puntito de Advertencia):</strong> Cálculo automático de mora por días de retraso en entrega.
                  </div>
                }
              }
            </div>
          </oefa-tabs>
        </div>
      </div>

      <!-- Tarjeta 3: Variante Cápsula (variant="pill") -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Variante Cápsula (&lt;oefa-tabs variant="pill"&gt;)</h3>
          <span class="text-muted">Diseño con fondo encapsulado <code>var(--oefa-surface-subtle)</code> y pestaña activa con relieve, ideal para tableros y paneles internos.</span>
        </div>
        <div class="card-body">
          <oefa-tabs
            variant="pill"
            [tabs]="pillTabs"
            [(activeTab)]="currentPillTab">
            <div class="tab-content-box">
              @switch (currentPillTab()) {
                @case ('semana') {
                  <div class="tab-pane"><strong>Vista Semanal:</strong> Gráfico de entregables programados para la semana actual.</div>
                }
                @case ('mes') {
                  <div class="tab-pane"><strong>Vista Mensual:</strong> Calendario de vencimientos acumulados del presente mes.</div>
                }
                @case ('anio') {
                  <div class="tab-pane"><strong>Vista Anual:</strong> Consolidado presupuestal de la programación multianual.</div>
                }
              }
            </div>
          </oefa-tabs>
        </div>
      </div>

      <!-- Tarjeta 4: Especificación de Uso y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación de Uso y API</h3>
          <span class="text-muted">Consumo directo mediante array de configuración tipado <code>OefaTabItem[]</code> con soporte integrado de iconos, badges y tooltips.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Pestañas con Icono, Badges y Tooltips --&gt;
&lt;oefa-tabs
  [tabs]="[
    &#123; id: 'info', label: 'Información', icon: '📋', infoTooltip: 'Datos de la cabecera' &#125;,
    &#123; id: 'entregables', label: 'Entregables', icon: '📦', badge: 3 &#125;,
    &#123; id: 'alertas', label: 'Alertas', icon: '🔔', badgeDot: true, badgeDotColor: 'danger' &#125;
  ]"
  [(activeTab)]="selectedTab"&gt;
  &lt;!-- Vistas asociadas por &#64;switch(selectedTab) --&gt;
&lt;/oefa-tabs&gt;

&lt;!-- Pestañas Sin Icono (Formato Texto Puro) --&gt;
&lt;oefa-tabs
  [tabs]="[
    &#123; id: 'resumen', label: 'Resumen General' &#125;,
    &#123; id: 'adendas', label: 'Adendas', badge: 1 &#125;
  ]"
  [(activeTab)]="selectedTab"&gt;
&lt;/oefa-tabs&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); border-radius: calc(var(--oefa-radius-lg) - 1px) calc(var(--oefa-radius-lg) - 1px) 0 0; display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .tab-content-box { padding: 20px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); margin-top: 16px; }
    .tab-pane { font-size: 0.875rem; color: var(--oefa-text-primary); line-height: 1.5; }
    .text-danger { color: var(--oefa-danger-500, #ef4444); }

    .tooltip-demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .tooltip-sample-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      background: var(--oefa-surface-subtle);
    }

    .sample-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--oefa-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sample-target {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
    }

    .overflow-test-box {
      overflow: hidden;
      max-height: 80px;
    }

    .badge-test {
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-on-container);
      padding: 2px 8px;
      border-radius: var(--oefa-radius-sm);
      font-size: 0.75rem;
    }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono);
      line-height: 1.5;
    }
  `]
})
export class DesignSystemTabsComponent {
  currentIconTab = signal<string>('deliverables');
  currentTextTab = signal<string>('resumen');
  currentPillTab = signal<string>('mes');

  // 1. Pestañas con icono, badge con número, puntito rojo y tooltip
  iconTabs: OefaTabItem[] = [
    {
      id: 'general',
      label: 'Información General',
      icon: '📋',
      infoTooltip: 'Datos del contrato, proveedor y montos'
    },
    {
      id: 'deliverables',
      label: 'Entregables y Pagos',
      icon: '📦',
      badge: 3
    },
    {
      id: 'alerts',
      label: 'Alertas',
      icon: '🔔',
      badgeDot: true,
      badgeDotColor: 'danger',
      infoTooltip: 'Observaciones pendientes de subsanar'
    },
    {
      id: 'history',
      label: 'Historial',
      icon: '📜'
    }
  ];

  // 2. Pestañas sin icono (texto puro)
  textOnlyTabs: OefaTabItem[] = [
    {
      id: 'resumen',
      label: 'Resumen Ejecutivo',
      infoTooltip: 'Cuadro comparativo consolidado'
    },
    {
      id: 'adendas',
      label: 'Adendas y Prórrogas',
      badge: 1
    },
    {
      id: 'penalidades',
      label: 'Penalidades',
      badgeDot: true,
      badgeDotColor: 'warning',
      infoTooltip: 'Cálculo de mora por atraso'
    }
  ];

  // 3. Pestañas variante pill
  pillTabs: OefaTabItem[] = [
    { id: 'semana', label: 'Esta Semana' },
    { id: 'mes', label: 'Este Mes', badge: 5 },
    { id: 'anio', label: 'Todo el Año' }
  ];
}
