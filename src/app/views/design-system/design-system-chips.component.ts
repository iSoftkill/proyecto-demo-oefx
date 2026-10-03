import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent } from '../../shared/components/chip/chip.component';

@Component({
  selector: 'app-design-system-chips',
  standalone: true,
  imports: [CommonModule, OefaChipComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🏷️ Chips y Etiquetas de Negocio (Átomos)</h2>
          <p class="subtitle">Componente reutilizable &lt;oefa-chip&gt; para proyectos de inversión, expedientes SIGED, áreas usuarias y numeración de entregables.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Tarjeta 1: Variantes de Negocio OEFA -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Variantes de Chip OEFA (&lt;oefa-chip&gt;)</h3>
          <span class="text-muted">Componente tipado para clasificar información contextual sin confundirse con badges de estado transaccional.</span>
        </div>
        <div class="card-body">
          <div class="chip-spec-list">
            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="project" label="PRY-2026-001" />
                <oefa-chip variant="maintenance" label="MNT-2026-001" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="project | maintenance"&gt;</strong>
                <p>Identificadores visuales para proyectos de inversión pública e intervenciones de mantenimiento continuo.</p>
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
                <p>Etiqueta para indicar la unidad orgánica o dirección requirente del requerimiento.</p>
              </div>
            </div>

            <div class="chip-row">
              <div class="chip-demo">
                <oefa-chip variant="deliverable" label="ENTREGABLE N° 1" />
              </div>
              <div class="chip-info">
                <strong>&lt;oefa-chip variant="deliverable"&gt;</strong>
                <p>Chips compactos para la numeración y secuencia de hitos o entregables contractuales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación de Uso y API</h3>
          <span class="text-muted">Consumo simple y tipado mediante <code>variant</code> y <code>label</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Chip de proyecto --&gt;
&lt;oefa-chip variant="project" label="PRY-2026-001" /&gt;

&lt;!-- Expediente SIGED --&gt;
&lt;oefa-chip variant="siged" label="2025-E01-013000" /&gt;

&lt;!-- Área usuaria --&gt;
&lt;oefa-chip variant="area" label="Subdirección de Fiscalización" /&gt;

&lt;!-- Entregable contractual --&gt;
&lt;oefa-chip variant="deliverable" label="ENTREGABLE N° 1" /&gt;</pre>
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

    .chip-spec-list { display: flex; flex-direction: column; gap: 16px; }
    .chip-row { display: grid; grid-template-columns: 240px 1fr; gap: 24px; padding: 16px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); align-items: center; }
    @media (max-width: 768px) { .chip-row { grid-template-columns: 1fr; gap: 12px; } }
    .chip-demo { display: flex; gap: 8px; align-items: center; justify-content: flex-start; flex-wrap: wrap; }
    .chip-info { display: flex; flex-direction: column; gap: 4px; }
    .chip-info strong { font-size: 0.875rem; color: var(--oefa-text-primary); font-family: var(--oefa-font-mono, monospace); }
    .chip-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; }

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
export class DesignSystemChipsComponent {}
