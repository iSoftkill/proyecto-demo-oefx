import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaInfoTooltipComponent } from '../../shared/components/info-tooltip/info-tooltip.component';

@Component({
  selector: 'app-design-system-tooltips',
  standalone: true,
  imports: [CommonModule, OefaInfoTooltipComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>💡 Tooltips de Información (Átomos)</h2>
          <p class="subtitle">Microcomponente institucional independiente &lt;oefa-info-tooltip&gt; para ayuda contextual flotante con posicionamiento dinámico y anti-recorte.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Tarjeta 1: Posicionamiento y Auto-flip -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Posiciones y Auto-flip Dinámico (&lt;oefa-info-tooltip&gt;)</h3>
          <span class="text-muted">Soporta ubicaciones cardinales (<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>) e invierte automáticamente su dirección si el espacio en pantalla es reducido.</span>
        </div>
        <div class="card-body">
          <div class="tooltip-demo-grid">
            <div class="tooltip-sample-item">
              <span class="sample-label">Posición Arriba (Default):</span>
              <div class="sample-target">
                <span>Plazo LPAG</span>
                <oefa-info-tooltip text="Plazo legal máximo de 30 días hábiles para pronunciamiento." position="top"></oefa-info-tooltip>
              </div>
            </div>

            <div class="tooltip-sample-item">
              <span class="sample-label">Posición Abajo:</span>
              <div class="sample-target">
                <span>Retención 10%</span>
                <oefa-info-tooltip text="Garantía de fiel cumplimiento para contrataciones de servicios." position="bottom"></oefa-info-tooltip>
              </div>
            </div>

            <div class="tooltip-sample-item">
              <span class="sample-label">Posición Derecha:</span>
              <div class="sample-target">
                <span>Devengado SIAF</span>
                <oefa-info-tooltip text="Fase de pago con registro SIAF confirmado." position="right"></oefa-info-tooltip>
              </div>
            </div>

            <div class="tooltip-sample-item">
              <span class="sample-label">Posición Izquierda:</span>
              <div class="sample-target">
                <span>Certificación</span>
                <oefa-info-tooltip text="Reserva presupuestal garantizada para la contratación." position="left"></oefa-info-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Escala y Tamaños -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Tamaños y Escala Visual (<code>size="sm|md"</code>)</h3>
          <span class="text-muted">Tamaño estándar compacto (14px) para formularios/tablas y tamaño medio (16px) para cabeceras y títulos.</span>
        </div>
        <div class="card-body">
          <div class="size-demo-row">
            <div class="size-box">
              <span class="size-label">Tamaño Compacto (<code>size="sm"</code> - por defecto)</span>
              <div class="sample-target">
                <span>N° Registro SIGED</span>
                <oefa-info-tooltip text="Código único correlativo del expediente institucional." position="top" size="sm"></oefa-info-tooltip>
              </div>
              <span class="class-code">Ícono 14x14px — Ideal para celdas de tabla y labels de formulario</span>
            </div>

            <div class="size-box">
              <span class="size-label">Tamaño Mediano (<code>size="md"</code>)</span>
              <div class="sample-target">
                <strong>Estado de Penalidades Contractuales</strong>
                <oefa-info-tooltip text="Monto calculado por mora según directiva interna de contrataciones." position="top" size="md"></oefa-info-tooltip>
              </div>
              <span class="class-code">Ícono 16x16px — Ideal para cabeceras, títulos y tarjetas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Render Flotante Anti-recorte (Portal al Body) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Comportamiento Anti-recorte (Portal al Body)</h3>
          <span class="text-muted">El tooltip se monta en el <code>document.body</code>, evitando quedar atrapado o cortado dentro de contenedores con <code>overflow: hidden</code>, <code>overflow: auto</code> o tablas con scroll.</span>
        </div>
        <div class="card-body">
          <div class="overflow-simulation-container">
            <div class="overflow-box">
              <p class="text-muted mb-2">Contenedor con <code>overflow: hidden</code> y dimensiones fijas reducidas:</p>
              <div class="sample-target">
                <span class="badge-test">Elemento encerrado</span>
                <oefa-info-tooltip text="¡Este tooltip flota sobre el body y jamás se corta por contenedores con scroll o overflow!" position="top"></oefa-info-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 4: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación de Uso y API</h3>
          <span class="text-muted">Soporte completo WAI-ARIA, navegación por teclado (<code>Focus</code>, <code>Enter</code>, <code>Escape</code>) y retardo de activación anti-parpadeo (120ms).</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Consumo básico --&gt;
&lt;oefa-info-tooltip text="Mensaje de ayuda contextual"&gt;&lt;/oefa-info-tooltip&gt;

&lt;!-- Con posición y tamaño explícito --&gt;
&lt;oefa-info-tooltip
  text="Código de expediente del sistema SIGED"
  position="right"
  size="md"
  ariaLabel="Ayuda sobre expediente"&gt;
&lt;/oefa-info-tooltip&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); overflow: hidden; }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

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
    }

    .size-demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .size-demo-row { grid-template-columns: 1fr; } }
    .size-box { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; gap: 12px; }
    .size-label { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); }
    .class-code { font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; color: var(--oefa-text-secondary); }

    .overflow-simulation-container {
      background: var(--oefa-surface-subtle);
      padding: 20px;
      border-radius: var(--oefa-radius-md);
      border: 1px dashed var(--oefa-border-color);
    }

    .overflow-box {
      max-width: 320px;
      padding: 14px;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-sm);
      overflow: hidden;
    }

    .badge-test {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--oefa-primary-root);
      background: var(--oefa-primary-container);
      padding: 3px 8px;
      border-radius: 4px;
    }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 14px 18px;
      font-family: var(--oefa-font-mono, monospace);
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
    }
  `]
})
export class DesignSystemTooltipsComponent {}
