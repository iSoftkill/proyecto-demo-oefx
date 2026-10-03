import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaDotBadgeComponent } from '../../shared/components/dot-badge/dot-badge.component';

@Component({
  selector: 'app-design-system-dot-badge',
  standalone: true,
  imports: [CommonModule, OefaDotBadgeComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔴 Puntos Indicadores y Alertas (Átomos)</h2>
          <p class="subtitle">Componente independiente &lt;oefa-dot-badge&gt; para estados en vivo, avisos contextuales, avatares, menús y pestañas.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Tarjeta 1: Paleta Cromática y Estados -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Paleta Semántica de Puntos Indicadores</h3>
          <span class="text-muted">Gama completa de colores institucionales con halo de contraste perimetral sobre fondos claros u oscuros.</span>
        </div>
        <div class="card-body">
          <div class="dots-grid">
            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="danger" size="md" />
                <span class="dot-name">danger</span>
              </div>
              <span class="class-code">color="danger"</span>
              <p class="dot-desc">Rojo institucional para alertas críticas, observaciones y penalidades.</p>
            </div>

            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="warning" size="md" />
                <span class="dot-name">warning</span>
              </div>
              <span class="class-code">color="warning"</span>
              <p class="dot-desc">Ámbar para plazos por vencer, atención preventiva y revisiones pendientes.</p>
            </div>

            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="primary" size="md" />
                <span class="dot-name">primary</span>
              </div>
              <span class="class-code">color="primary"</span>
              <p class="dot-desc">Azul institucional OEFA para novedades, elementos seleccionados o activos.</p>
            </div>

            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="success" size="md" />
                <span class="dot-name">success</span>
              </div>
              <span class="class-code">color="success"</span>
              <p class="dot-desc">Verde para servicios operativos, entregables aprobados y estado en línea.</p>
            </div>

            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="info" size="md" />
                <span class="dot-name">info</span>
              </div>
              <span class="class-code">color="info"</span>
              <p class="dot-desc">Celeste informativo para expedientes en curso y derivaciones SIGED.</p>
            </div>

            <div class="dot-item">
              <div class="dot-preview">
                <oefa-dot-badge color="neutral" size="md" />
                <span class="dot-name">neutral</span>
              </div>
              <span class="class-code">color="neutral"</span>
              <p class="dot-desc">Gris atenuado para elementos inactivos, borradores o lectura secundaria.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Escalas de Tamaño y Animación Ping -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Escalas de Tamaño y Modo Pulso en Vivo (<code>[ping]="true"</code>)</h3>
          <span class="text-muted">Dimensiones estandarizadas (6px, 8px y 10px) y animación de onda expansiva para notificaciones urgentes.</span>
        </div>
        <div class="card-body">
          <div class="sizes-ping-row">
            <div class="demo-box">
              <span class="box-title">Escala de Tamaños</span>
              <div class="size-variants">
                <div class="size-chip">
                  <oefa-dot-badge color="danger" size="sm" />
                  <span>sm (6px) · Tablas densas</span>
                </div>
                <div class="size-chip">
                  <oefa-dot-badge color="danger" size="md" />
                  <span>md (8px) · Pestañas y menús (default)</span>
                </div>
                <div class="size-chip">
                  <oefa-dot-badge color="danger" size="lg" />
                  <span>lg (10px) · Avatares y cabeceras</span>
                </div>
              </div>
            </div>

            <div class="demo-box">
              <span class="box-title">Efecto Pulso en Tiempo Real (Ping)</span>
              <div class="size-variants">
                <div class="size-chip">
                  <oefa-dot-badge color="danger" size="md" [ping]="true" />
                  <span>Alerta crítica activa</span>
                </div>
                <div class="size-chip">
                  <oefa-dot-badge color="primary" size="md" [ping]="true" />
                  <span>Sincronización en curso</span>
                </div>
                <div class="size-chip">
                  <oefa-dot-badge color="success" size="md" [ping]="true" />
                  <span>Servidor en línea</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Contextos Reales de Uso -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Integración en Elementos de Interfaz</h3>
          <span class="text-muted">Ejemplos de cómo se incrusta el átomo junto a texto, avatares o botones.</span>
        </div>
        <div class="card-body">
          <div class="contexts-grid">
            <div class="context-item">
              <span class="context-label">En Pestañas / Menús:</span>
              <div class="menu-sample">
                <span>Alertas y Observaciones</span>
                <oefa-dot-badge color="danger" size="md" />
              </div>
            </div>

            <div class="context-item">
              <span class="context-label">En Avatares de Usuario:</span>
              <div class="avatar-sample">
                <div class="avatar-circle">JA</div>
                <oefa-dot-badge color="success" size="md" class="avatar-dot" />
              </div>
            </div>

            <div class="context-item">
              <span class="context-label">En Celdas de Tabla:</span>
              <div class="table-sample">
                <oefa-dot-badge color="warning" size="sm" />
                <span>Revisión LPAG en curso</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 4: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación de Uso y API</h3>
          <span class="text-muted">Invocación simple y tipada mediante <code>&lt;oefa-dot-badge&gt;</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Punto básico rojo (default) --&gt;
&lt;oefa-dot-badge /&gt;

&lt;!-- Colores semánticos --&gt;
&lt;oefa-dot-badge color="danger" /&gt;
&lt;oefa-dot-badge color="warning" /&gt;
&lt;oefa-dot-badge color="primary" /&gt;
&lt;oefa-dot-badge color="success" /&gt;
&lt;oefa-dot-badge color="info" /&gt;
&lt;oefa-dot-badge color="neutral" /&gt;

&lt;!-- Con tamaño y pulso animado --&gt;
&lt;oefa-dot-badge color="danger" size="lg" [ping]="true" /&gt;</pre>
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

    .dots-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .dot-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .dot-preview { display: flex; align-items: center; gap: 10px; }
    .dot-name { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); }
    .class-code { font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; color: var(--oefa-primary-root); font-weight: 600; }
    .dot-desc { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; text-align: center; }

    .sizes-ping-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .sizes-ping-row { grid-template-columns: 1fr; } }
    .demo-box { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; gap: 12px; }
    .box-title { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); }
    .size-variants { display: flex; flex-direction: column; gap: 10px; }
    .size-chip { display: flex; align-items: center; gap: 12px; font-size: 0.875rem; color: var(--oefa-text-primary); }

    .contexts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    .context-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; gap: 10px; }
    .context-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--oefa-text-secondary); }
    .menu-sample { display: inline-flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 600; padding: 8px 12px; background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-sm); }
    .avatar-sample { position: relative; width: 40px; height: 40px; }
    .avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: var(--oefa-primary-root); color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; }
    .avatar-dot { position: absolute; bottom: 0; right: 0; }
    .table-sample { display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--oefa-text-primary); }

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
export class DesignSystemDotBadgeComponent {}
