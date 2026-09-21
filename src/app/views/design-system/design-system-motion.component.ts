import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';

@Component({
  selector: 'app-design-system-motion',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaBentoKpiTileComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>⚡ Motion & Micro-interacciones (Átomos / Fundación)</h2>
          <p class="subtitle">Físicas de animación fluida, desaceleración natural y curvas cúbicas Material 3 Expressive para interfaces OEFA.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- SECCIÓN 1: Comparador en Vivo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Comparador de Físicas: CSS Estándar vs. M3 Expressive</h3>
          <span class="text-muted">Pasa el cursor sobre cada caja para comparar la respuesta física de la transición.</span>
        </div>
        <div class="card-body">
          <div class="motion-compare-grid">
            <div class="motion-card-demo legacy">
              <div class="mcd-header">
                <span class="mcd-badge generic">CSS Clásico</span>
                <h5>ease (200ms)</h5>
              </div>
              <p class="mcd-desc">Movimiento mecánico uniforme, sin aceleración natural de resorte.</p>
              <div class="mcd-interactive-box classic-box">
                <span>Pasa el cursor / Toca aquí</span>
              </div>
              <div class="mcd-code-pill"><code>transition: all 0.2s ease;</code></div>
            </div>

            <div class="motion-card-demo expressive">
              <div class="mcd-header">
                <span class="mcd-badge m3">M3 Expressive</span>
                <h5>Emphasized Spring (300ms)</h5>
              </div>
              <p class="mcd-desc">Desaceleración fluida con física elástica (curva 0.2, 0.0, 0.0, 1.0).</p>
              <div class="mcd-interactive-box m3-box">
                <span>Pasa el cursor / Toca aquí ✨</span>
              </div>
              <div class="mcd-code-pill highlight"><code>transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);</code></div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: Micro-interacciones y State Layers -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Micro-interacciones de Superficie y State Layers</h3>
          <span class="text-muted">Elevaciones táctiles, micro-rotaciones (Icon Tilt) y amortiguación reactiva gobernadas por componentes reutilizables.</span>
        </div>
        <div class="card-body">
          <div class="motion-interactive-row">
            <div class="motion-test-item">
              <span class="mti-label">Botón Primario (&lt;oefa-button&gt;)</span>
              <oefa-button variant="primary">
                <span>Acción Institucional</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </oefa-button>
            </div>

            <div class="motion-test-item">
              <span class="mti-label">Botón Excel (&lt;oefa-button&gt;)</span>
              <oefa-button variant="excel">
                <span>Exportar Excel</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </oefa-button>
            </div>

            <div class="motion-test-item" style="flex: 2">
              <span class="mti-label">Bento KPI Reutilizable (&lt;oefa-bento-kpi-tile&gt; con Icon Tilt)</span>
              <oefa-bento-kpi-tile
                sector="SUPERVISIÓN AMBIENTAL"
                title="Monitoreo de Emisiones Atmosféricas"
                value="94.8%"
                metricLabel="Cumplimiento normativo"
                trendLabel="+3.2% anual"
                periodLabel="Periodo 2024"
                icon="factory"
                bgTint="#F0FDF4"
                accentColor="#16A34A"
                status="conforme"
                chartType="gauge"
                [percentage]="94.8"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: Utilidades de Entrada (Keyframes) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Clases Utilitarias Globales de Animación</h3>
          <span class="text-muted">Disponibles transversalmente en todo el proyecto vía <code>styles.scss</code>.</span>
        </div>
        <div class="card-body">
          <div class="replay-trigger">
            <button class="replay-btn" (click)="triggerReplay()">🔄 Re-ejecutar animaciones</button>
          </div>
          @if (replayKey()) {
            <div class="utilities-grid">
              <div class="utility-box oefa-motion-fade-in">
                <code>.oefa-motion-fade-in</code>
                <span>Fundido de opacidad suave (300ms)</span>
              </div>
              <div class="utility-box oefa-motion-scale-in">
                <code>.oefa-motion-scale-in</code>
                <span>Escala inicial de 0.95 a 1.0 (300ms)</span>
              </div>
              <div class="utility-box oefa-motion-slide-up">
                <code>.oefa-motion-slide-up</code>
                <span>Desplazamiento vertical +12px a 0 (300ms)</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- SECCIÓN 4: Catálogo de Tokens en styles.scss y design-tokens.json -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación Técnica de Tokens M3</h3>
          <span class="text-muted">Tokens estandarizados accesibles mediante variables CSS.</span>
        </div>
        <div class="card-body">
          <div class="tokens-table-wrapper">
            <table class="ds-tokens-table">
              <thead>
                <tr>
                  <th>Token CSS</th>
                  <th>Valor / Fórmula</th>
                  <th>Uso Institucional</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>--oefa-ease-standard</code></td>
                  <td><code>cubic-bezier(0.2, 0, 0, 1)</code></td>
                  <td>Hover de botones, checkboxes, inputs y chips.</td>
                </tr>
                <tr>
                  <td><code>--oefa-ease-emphasized</code></td>
                  <td><code>cubic-bezier(0.2, 0, 0, 1)</code></td>
                  <td>Elevaciones fluidas, tarjetas bento y morphing.</td>
                </tr>
                <tr>
                  <td><code>--oefa-ease-emphasized-decel</code></td>
                  <td><code>cubic-bezier(0.05, 0.7, 0.1, 1)</code></td>
                  <td>Entrada de modales, drawers y elementos al viewport.</td>
                </tr>
                <tr>
                  <td><code>--oefa-ease-emphasized-accel</code></td>
                  <td><code>cubic-bezier(0.3, 0, 0.8, 0.15)</code></td>
                  <td>Salida rápida de elementos fuera de pantalla.</td>
                </tr>
                <tr>
                  <td><code>--oefa-duration-short</code></td>
                  <td><code>150ms</code></td>
                  <td>Feedback táctil inmediato, active states, micro-checkmarks.</td>
                </tr>
                <tr>
                  <td><code>--oefa-duration-medium</code></td>
                  <td><code>300ms</code></td>
                  <td>Transiciones de hover, expansión de cards, morphing y toasts.</td>
                </tr>
                <tr>
                  <td><code>--oefa-duration-long</code></td>
                  <td><code>450ms</code></td>
                  <td>Entrada y salida de modales completos y drawers laterales.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 5: Accesibilidad WCAG -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>5. Accesibilidad: Reducción de Movimiento (WCAG 2.2 SC 2.3.3)</h3>
          <span class="text-muted">Cumplimiento mandatorio para usuarios con sensibilidad vestibular.</span>
        </div>
        <div class="card-body">
          <p style="font-size: 0.875rem; color: #475569; margin: 0 0 12px 0;">
            El archivo <code>styles.scss</code> incluye la consulta de medios <code>&#64;media (prefers-reduced-motion: reduce)</code> que desactiva de manera transparente todas las animaciones y transiciones largas en el navegador si el usuario lo configuró en su sistema operativo.
          </p>
          <pre style="background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 0.75rem; border: 1px solid #e2e8f0; margin: 0;">&#64;media (prefers-reduced-motion: reduce) &#123;
  *, ::before, ::after &#123;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  &#125;
&#125;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      h2 { margin: 0 0 6px 0; font-family: var(--oefa-font-display); font-size: 1.5rem; color: #0f172a; }
      .subtitle { margin: 0; color: #64748b; font-size: 0.875rem; }
    }
    .ds-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      letter-spacing: 0.04em;
    }
    .ds-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }
    .card-header {
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      h3 { margin: 0 0 4px 0; font-size: 1rem; font-family: var(--oefa-font-display); color: #0f172a; }
      .text-muted { font-size: 0.8125rem; color: #64748b; }
    }
    .card-body {
      padding: 20px;
    }
    .motion-compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .motion-card-demo {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      &.expressive {
        border-color: #bfdbfe;
        background: #fbfdff;
      }
    }
    .mcd-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h5 { margin: 0; font-family: var(--oefa-font-display); font-size: 0.9375rem; font-weight: 700; }
    }
    .mcd-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      &.generic { background: #f1f5f9; color: #64748b; }
      &.m3 { background: #dbeafe; color: #1e40af; }
    }
    .mcd-desc { margin: 0; font-size: 0.8125rem; color: #64748b; }
    .mcd-interactive-box {
      height: 80px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.875rem;
      user-select: none;
      border: 1px dashed #cbd5e1;
      &.classic-box {
        background: #f8fafc;
        color: #475569;
        transition: all 0.2s ease;
        &:hover {
          background: #e2e8f0;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 6px 12px rgba(0,0,0,0.08);
        }
      }
      &.m3-box {
        background: #eef4ff;
        color: #144aa7;
        border-color: #93c5fd;
        transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);
        &:hover {
          background: #dbeafe;
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 32px -8px rgba(20, 74, 167, 0.2);
        }
        &:active {
          transform: translateY(-2px) scale(0.98);
          transition-duration: var(--oefa-duration-short);
        }
      }
    }
    .mcd-code-pill {
      font-size: 0.6875rem;
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      &.highlight { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
    }
    .motion-interactive-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: stretch;
    }
    .motion-test-item {
      flex: 1;
      min-width: 220px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mti-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .oefa-btn-expressive {
      width: 100%;
      height: 44px;
      border-radius: 12px;
      background: var(--oefa-primary-root);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(20, 74, 167, 0.2);
      transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      &:hover {
        background: #0d3b8c;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(20, 74, 167, 0.3);
      }
      &:active {
        transform: translateY(0) scale(0.98);
        transition-duration: var(--oefa-duration-short);
      }
      &.aqua {
        background: var(--oefa-secondary-root);
        color: #064e4a;
        box-shadow: 0 4px 12px rgba(68, 191, 181, 0.25);
        &:hover {
          background: #38a89f;
          box-shadow: 0 8px 20px rgba(68, 191, 181, 0.35);
        }
      }
    }
    .bento-card-expressive {
      height: 100%;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
      &:hover .bce-icon {
        transform: rotate(8deg) scale(1.12);
      }
    }
    .bce-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      background: #fef3c7;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      flex-shrink: 0;
    }
    .bce-content {
      flex: 1;
      h5 { margin: 0 0 2px 0; font-family: var(--oefa-font-display); font-size: 0.875rem; font-weight: 700; color: #0f172a; }
      p { margin: 0; font-size: 0.75rem; color: #64748b; line-height: 1.3; }
    }
    .bce-chip {
      font-size: 0.6875rem;
      font-weight: 700;
      background: #eff6ff;
      color: #1d4ed8;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .replay-trigger {
      margin-bottom: 16px;
    }
    .replay-btn {
      padding: 8px 14px;
      border-radius: 8px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
      &:hover { background: #e2e8f0; }
    }
    .utilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .utility-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      code { font-size: 0.8125rem; font-weight: 700; color: var(--oefa-primary-root); }
      span { font-size: 0.75rem; color: #64748b; }
    }
    .tokens-table-wrapper {
      overflow-x: auto;
    }
    .ds-tokens-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8125rem;
      th, td {
        padding: 10px 14px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      th {
        background: #f8fafc;
        font-weight: 700;
        color: #334155;
      }
      code {
        color: var(--oefa-primary-root);
        font-size: 0.75rem;
      }
    }
  `]
})
export class DesignSystemMotionComponent {
  replayKey = signal<boolean>(true);

  triggerReplay(): void {
    this.replayKey.set(false);
    setTimeout(() => this.replayKey.set(true), 20);
  }
}
