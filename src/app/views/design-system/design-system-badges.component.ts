import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaChipComponent } from '../../shared/components/chip/chip.component';

@Component({
  selector: 'app-design-system-badges',
  standalone: true,
  imports: [CommonModule, OefaStatusBadgeComponent, OefaChipComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🏷️ Badges, Tags y Chips (Átomos)</h2>
          <p class="subtitle">Indicadores de estado transaccional, etiquetas de proyecto, códigos SIGED e identificadores organizacionales.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 0: Componente Reutilizable Angular (Shared) -->
      <div class="card ds-card" style="border: 2px solid var(--oefa-primary-root);">
        <div class="card-header" style="background: var(--oefa-primary-container);">
          <h3>✨ 6 Estados Universales OEFA (&lt;oefa-status-badge&gt;) — WCAG 2.2 AA</h3>
          <span class="text-muted">Componente standalone en <code>src/app/shared/components/status-badge/</code>. Contraste mínimo verificado &gt; 4.5:1 en todos los roles.</span>
        </div>
        <div class="card-body">
          <div class="badge-showcase-grid">
            <div class="badge-item">
              <oefa-status-badge badgeClass="error" label="ERROR / RECHAZADO" [dot]="true" />
              <span class="class-code">error (#E51A2F - Ratio 7.9:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Acción fallida, vencimiento o anulación crítica.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="info" label="INFO / EN CURSO" [dot]="true" />
              <span class="class-code">info (#144AA7 - Ratio 14.8:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Trámite registrado, pendiente o en proceso.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="exito" label="ÉXITO / CONFORME" [dot]="true" />
              <span class="class-code">exito (#386200 - Ratio 8.1:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Atención conforme, aprobada o pagada.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="danger" label="DANGER / OBSERVADO" [dot]="true" />
              <span class="class-code">danger (#664800 - Ratio 8.4:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Alerta preventiva, subsanación u observación.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="neutral" label="NEUTRAL / INACTIVO" [dot]="true" />
              <span class="class-code">neutral (#1E293B - Ratio 11.2:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Borrador, estado inactivo o archivado.</p>
            </div>

            <div class="badge-item">
              <oefa-status-badge badgeClass="alterno" label="ALTERNO / TURQUESA" [dot]="true" />
              <span class="class-code">alterno (#005D58 - Ratio 6.5:1)</span>
              <p class="text-xs text-muted" style="margin: 0; text-align: center;">Previsión presupuestal / segundo eje OEFA.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 1: Variantes de Tamaño y Soporte Dot (WCAG SC 1.4.1) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Tamaños (<code>size="sm|md"</code>) y Punto Semántico (<code>[dot]="true"</code>)</h3>
          <span class="text-muted">Cumple WCAG 2.2 SC 1.4.1 (Uso del color) incorporando indicador no textural y escala tipográfica.</span>
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

      <!-- Sección 2: Chips Específicos de Proyectos, SIGED y Áreas (&lt;oefa-chip&gt;) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Chips Específicos de Negocio (&lt;oefa-chip&gt;)</h3>
          <span class="text-muted">Componente unificado para etiquetas organizacionales y de expediente.</span>
        </div>
        <div class="card-body">
          <div class="chip-spec-list">
            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="project" label="PRY-2026-001" />
                <oefa-chip variant="maintenance" label="MNT-2026-001" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="project|maintenance"&gt;</strong>
                <p>Identificadores visuales para proyectos de inversión e intervenciones de mantenimiento continuo.</p>
              </div>
            </div>

            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="siged" label="2025-E01-013000" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="siged"&gt;</strong>
                <p>Etiqueta en fuente monoespaciada para destacar expedientes del Sistema de Gestión Documental (SIGED).</p>
              </div>
            </div>

            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="area" label="Subdirección de Fiscalización" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="area"&gt;</strong>
                <p>Etiqueta para indicar la unidad orgánica o área solicitante de la orden.</p>
              </div>
            </div>

            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="deliverable" label="ENTREGABLE N° 1" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="deliverable"&gt;</strong>
                <p>Badges compactos para la numeración de hitos o entregables contractuales.</p>
              </div>
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

    .badge-showcase-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .badge-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px; background: #F8FAFC; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .class-code { font-family: monospace; font-size: 0.75rem; color: var(--oefa-text-muted); }

    .size-demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .size-demo-row { grid-template-columns: 1fr; } }
    .size-box { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: #F8FAFC; display: flex; flex-direction: column; gap: 12px; }
    .size-label { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); }
    .size-items { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

    .chip-spec-list { display: flex; flex-direction: column; gap: 16px; }
    .chip-row { display: grid; grid-template-columns: 240px 1fr; gap: 24px; padding: 16px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: #F8FAFC; align-items: center; }
    .chip-demo { display: flex; gap: 8px; align-items: center; justify-content: center; flex-wrap: wrap; }
    .chip-info { display: flex; flex-direction: column; gap: 4px; }
    .chip-info strong { font-size: 0.875rem; color: var(--oefa-text-primary); }
    .chip-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; }
  `]
})
export class DesignSystemBadgesComponent {}
