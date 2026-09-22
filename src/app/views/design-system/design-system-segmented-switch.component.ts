import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';

@Component({
  selector: 'app-design-system-segmented-switch',
  standalone: true,
  imports: [CommonModule, OefaSegmentedSwitchComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔀 Conmutador Segmentado (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-segmented-switch&gt; para alternar vistas, modos o filtros mutuamente excluyentes con accesibilidad WAI-ARIA.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Conmutador 2 Opciones (Órdenes vs Matriz) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Alternador de Vistas Principales (2 Opciones)</h3>
          <span class="text-muted">Utilizado en la cabecera de la bandeja de órdenes para alternar entre "Vista Órdenes" y "Matriz Excel".</span>
        </div>
        <div class="card-body">
          <div class="demo-switch-row">
            <oefa-segmented-switch
              [options]="viewOptions"
              [(selected)]="selectedView" />
          </div>
          <div class="result-box">
            <span>Valor actual seleccionado: <strong>{{ selectedView() }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Conmutador 3 Opciones (Frecuencia de Pago) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Conmutador de 3 o más Opciones</h3>
          <span class="text-muted">Adaptable automáticamente a cualquier cantidad de opciones y responsivo.</span>
        </div>
        <div class="card-body">
          <div class="demo-switch-row">
            <oefa-segmented-switch
              [options]="typeOptions"
              [(selected)]="selectedType" />
          </div>
          <div class="result-box">
            <span>Modalidad de contratación activa: <strong>{{ selectedType() }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Código de Integración -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Especificación de Uso</h3>
          <span class="text-muted">Importación y vinculación bidireccional vía signal o ngModel.</span>
        </div>
        <div class="card-body">
          <pre class="code-block"><code>&lt;oefa-segmented-switch
  [options]="[
    &#123; value: 'orders', label: 'Vista Órdenes' &#125;,
    &#123; value: 'matrix', label: 'Matriz Excel' &#125;
  ]"
  [(selected)]="currentView" /&gt;</code></pre>
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
    .card-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

    .demo-switch-row { display: flex; align-items: center; }
    .result-box { padding: 12px 16px; border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); font-size: 0.875rem; color: var(--oefa-text-primary); }
    .result-box strong { color: var(--oefa-primary-root); font-weight: 700; }

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
export class DesignSystemSegmentedSwitchComponent {
  selectedView = signal<string>('orders');
  selectedType = signal<string>('mensual');

  viewOptions: SegmentedOption[] = [
    {
      value: 'orders',
      label: 'Vista por Órdenes',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      badge: 24
    },
    {
      value: 'matrix',
      label: 'Matriz de Entregables',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'
    }
  ];

  typeOptions: SegmentedOption[] = [
    { value: 'mensual', label: 'Mensual' },
    { value: 'hito', label: 'Por Hitos', badge: 'Nuevo' },
    { value: 'unico', label: 'Pago Único' }
  ];
}
