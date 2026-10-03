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

      <!-- Tarjeta 3: Conmutador con Notificaciones, Badges y Tooltips -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Indicadores de Alerta, Badges e Información Contextual (Tooltip)</h3>
          <span class="text-muted">Integra 'dotBadge: true', 'badge' numérico y 'tooltip' reutilizando &lt;oefa-info-tooltip&gt; con popover al hover.</span>
        </div>
        <div class="card-body">
          <div class="demo-switch-row">
            <oefa-segmented-switch
              [options]="badgeOptions"
              [(selected)]="selectedNotificationTab" />
          </div>
          <div class="result-box">
            <span>Pestaña activa: <strong>{{ selectedNotificationTab() }}</strong> (Pasa el cursor por el ícono (ℹ) para ver el mensaje contextual)</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 4: Código y Especificación de Uso -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación Técnica de Uso</h3>
          <span class="text-muted">Parámetros de configuración del componente &lt;oefa-segmented-switch&gt; y la interfaz SegmentedOption.</span>
        </div>
        <div class="card-body">
          <pre class="code-block"><code>// Interfaz TypeScript:
export interface SegmentedOption&lt;T = any&gt; &#123;
  value: T;                                      // Identificador único
  label: string;                                 // Texto de la opción
  icon?: string;                                 // Ícono SVG inline opcional
  badge?: string | number;                       // Contador numérico o etiqueta (ej. 12, 'Nuevo')
  dotBadge?: boolean;                            // Punto indicador de atención/novedad (Rojo institucional)
  dotColor?: string;                             // Color opcional para el dot (defecto: var(--oefa-danger))
  tooltip?: string;                              // Texto descriptivo para el ícono de información (ℹ)
  tooltipPosition?: 'top'|'bottom'|'left'|'right'; // Posición del tooltip emergente (defecto: 'top')
  disabled?: boolean;                            // Deshabilitar opción
&#125;

// Uso en Plantilla HTML:
&lt;oefa-segmented-switch
  [options]="[
    &#123; value: 'todos', label: 'Todos' &#125;,
    &#123; value: 'pendientes', label: 'Pendientes', dotBadge: true, tooltip: '3 órdenes requieren su firma digital' &#125;,
    &#123; value: 'observados', label: 'Observaciones', badge: 3, tooltip: 'Órdenes con subsanación técnica' &#125;
  ]"
  [(selected)]="currentTab" /&gt;</code></pre>
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
  selectedNotificationTab = signal<string>('pendientes');

  viewOptions: SegmentedOption[] = [
    {
      value: 'orders',
      label: 'Vista por Órdenes',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      badge: 24,
      tooltip: 'Listado consolidado de expedientes de órdenes de servicio'
    },
    {
      value: 'matrix',
      label: 'Matriz de Entregables',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
      tooltip: 'Vista en cuadrícula tipo hoja de cálculo para entregables'
    }
  ];

  typeOptions: SegmentedOption[] = [
    { value: 'mensual', label: 'Mensual' },
    { value: 'hito', label: 'Por Hitos', badge: 'Nuevo', tooltip: 'Pago asociado a la conformidad de hitos definidos' },
    { value: 'unico', label: 'Pago Único' }
  ];

  badgeOptions: SegmentedOption[] = [
    { value: 'todos', label: 'Todos los Trámites' },
    { 
      value: 'pendientes', 
      label: 'Requiere Acción', 
      dotBadge: true,
      tooltip: 'Existen 3 órdenes que requieren su firma o validación inmediata' 
    },
    { 
      value: 'observados', 
      label: 'Observaciones', 
      badge: 3,
      tooltip: 'Entregables observados con plazo de subsanación vigente' 
    }
  ];
}
