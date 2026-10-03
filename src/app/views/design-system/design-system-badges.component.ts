import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-design-system-badges',
  standalone: true,
  imports: [CommonModule, OefaStatusBadgeComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🏷️ Tags de Estado Transaccional (Átomos)</h2>
          <p class="subtitle">Etiquetas de texto con color semántico para los 6 estados universales OEFA. Accesibilidad WCAG 2.2 AA verificada.</p>
          <p class="taxonomy-note">
            <strong>Nota terminológica:</strong> En sistemas de diseño modernos, un <em>Tag</em> (o Label) es una etiqueta con texto visible que describe el estado de una entidad.
            Un <em>Badge</em> suele ser un contador numérico (ej: "3 notificaciones"). El componente <code>&lt;oefa-status-badge&gt;</code>
            es funcionalmente un <strong>Tag de Estado</strong>. El selector se mantiene por retrocompatibilidad.
            Para puntos indicadores sin texto, ver <a routerLink="/design-system/dot-badge">Puntos Indicadores</a>.
          </p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Tarjeta 1: 6 Estados Universales -->
      <div class="card ds-card">
        <div class="card-header">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
            <h3>1. 6 Estados Universales OEFA (&lt;oefa-status-badge&gt;) — WCAG 2.2 AA</h3>
            <span class="ds-badge">COMPONENTE COMPARTIDO</span>
          </div>
          <span class="text-muted">Componente standalone en <code>src/app/shared/components/status-badge/</code>. Contraste mínimo verificado &gt; 4.5:1 en todos los roles.</span>
        </div>
        <div class="card-body">
          <div class="badge-showcase-grid">
            <div class="badge-item">
              <oefa-status-badge badgeClass="error" label="ERROR / RECHAZADO" [dot]="true" />
              <span class="class-code">error (Ratio 7.9:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Acción fallida, vencimiento o anulación crítica.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="info" label="INFO / EN CURSO" [dot]="true" />
              <span class="class-code">info (Ratio 14.8:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Trámite registrado, pendiente o en proceso.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="exito" label="ÉXITO / CONFORME" [dot]="true" />
              <span class="class-code">exito (Ratio 8.1:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Atención conforme, aprobada o pagada.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="danger" label="DANGER / OBSERVADO" [dot]="true" />
              <span class="class-code">danger (Ratio 8.4:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Alerta preventiva, subsanación u observación.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="neutral" label="NEUTRAL / INACTIVO" [dot]="true" />
              <span class="class-code">neutral (Ratio 11.2:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Borrador, estado inactivo o archivado.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="alterno" label="ALTERNO / TURQUESA" [dot]="true" />
              <span class="class-code">alterno (Ratio 6.5:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Previsión presupuestal / segundo eje OEFA.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Variantes de Tamaño -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Tamaños (<code>size="sm|md"</code>) y Punto Semántico (<code>[dot]="true"</code>)</h3>
          <span class="text-muted">Cumple WCAG 2.2 SC 1.4.1 (Uso del color) incorporando indicador no textual y escala tipográfica.</span>
        </div>
        <div class="card-body">
          <div class="size-demo-row">
            <div class="size-box">
              <span class="size-label">Tamaño Estándar (<code>size="md"</code> - default)</span>
              <div class="size-items">
                <oefa-status-badge status="CONFORME" [dot]="true" size="md" />
                <oefa-status-badge status="OBSERVADO" [dot]="true" size="md" />
                <oefa-status-badge status="EN_PROCESO" [dot]="true" size="md" />
              </div>
            </div>

            <div class="size-box">
              <span class="size-label">Tamaño Compacto para Tablas (<code>size="sm"</code>)</span>
              <div class="size-items">
                <oefa-status-badge status="CONFORME" [dot]="true" size="sm" />
                <oefa-status-badge status="OBSERVADO" [dot]="true" size="sm" />
                <oefa-status-badge status="EN_PROCESO" [dot]="true" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Especificación de Uso y API</h3>
          <span class="text-muted">Mapeo automático de estados del backend, clase explícita o label personalizado.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Mapeo automático desde el modelo --&gt;
&lt;oefa-status-badge [status]="order.status" /&gt;

&lt;!-- Con punto semántico WCAG (recomendado) --&gt;
&lt;oefa-status-badge [status]="order.status" [dot]="true" /&gt;

&lt;!-- Clase explícita (sin mapeo) --&gt;
&lt;oefa-status-badge badgeClass="error" label="RECHAZADO" /&gt;

&lt;!-- Compacto para tablas densas --&gt;
&lt;oefa-status-badge [status]="item.status" size="sm" [dot]="true" /&gt;

&lt;!-- Para puntos indicadores sin texto, usar: --&gt;
&lt;!-- &lt;oefa-dot-badge color="danger" /&gt; → ver módulo Puntos Indicadores --&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .taxonomy-note {
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      margin-top: 10px;
      padding: 10px 14px;
      background: var(--oefa-surface-subtle);
      border-left: 3px solid var(--oefa-primary-root);
      border-radius: var(--oefa-radius-sm);
      line-height: 1.5;
    }
    .taxonomy-note a { color: var(--oefa-primary-root); font-weight: 600; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); white-space: nowrap; }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); overflow: hidden; }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .badge-showcase-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .badge-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .class-code { font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; color: var(--oefa-primary-root); font-weight: 600; }

    .size-demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .size-demo-row { grid-template-columns: 1fr; } }
    .size-box { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: var(--oefa-surface-subtle); display: flex; flex-direction: column; gap: 12px; }
    .size-label { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); }
    .size-items { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

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
export class DesignSystemBadgesComponent {}
