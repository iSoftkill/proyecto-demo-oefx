import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaCardComponent } from '../../shared/components/card/card.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaAccordionComponent } from '../../shared/components/accordion/accordion.component';
import { OefaCollapsibleComponent } from '../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-design-system-dev-guide',
  standalone: true,
  imports: [
    CommonModule,
    OefaCardComponent,
    OefaButtonComponent,
    OefaStatusBadgeComponent,
    OefaAccordionComponent,
    OefaCollapsibleComponent
  ],
  template: `
    <div class="ds-container">
      <!-- Encabezado de la Guía -->
      <div class="ds-header">
        <div>
          <h2>💻 Guía Didáctica para Desarrolladores (Zero CSS)</h2>
          <p class="subtitle">
            Cómo maquetar pantallas institucionales completas usando solo HTML y componentes OEFA, sin escribir CSS local.
          </p>
        </div>
        <span class="ds-badge">DEV TOOLKIT</span>
      </div>

      <!-- 1. Matriz de Equivalencias (Cheat Sheet) -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>1. Matriz de Equivalencias (PrimeNG / Bootstrap ➔ OEFA)</h3>
            <span class="text-muted">Si estás acostumbrado a librerías de terceros, aquí tienes la traducción directa.</span>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="ds-equiv-table">
              <thead>
                <tr>
                  <th>Antes (PrimeNG / Bootstrap)</th>
                  <th>Ahora en OEFA</th>
                  <th>Tipo</th>
                  <th>Ventaja</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.modulo-container {{ '{' }} padding: 24px; {{ '}' }}</code></td>
                  <td><code class="tag-highlight">&lt;div class="oefa-page"&gt;</code></td>
                  <td>Clase Global</td>
                  <td>Cero CSS; padding adaptativo automático</td>
                </tr>
                <tr>
                  <td><code>&lt;div class="p-grid"&gt;</code> o <code>.row</code></td>
                  <td><code class="tag-highlight">&lt;div class="oefa-grid-auto"&gt;</code></td>
                  <td>Clase Global</td>
                  <td>Auto-colapsa en móvil (WCAG 1.4.10)</td>
                </tr>
                <tr>
                  <td><code>&lt;div class="col-12 col-md-6"&gt;</code></td>
                  <td><code class="tag-highlight">&lt;div class="oefa-col-12 oefa-col-md-6"&gt;</code></td>
                  <td>Clase Global</td>
                  <td>12 columnas estándar sin frameworks</td>
                </tr>
                <tr>
                  <td><code>&lt;p-card&gt;</code> o CSS manual de tarjetas</td>
                  <td><code class="tag-highlight">&lt;oefa-card title="..."&gt;</code></td>
                  <td>Componente</td>
                  <td>Bordes, sombras, slots y foco accesible</td>
                </tr>
                <tr>
                  <td><code>&lt;p-button label="Guardar"&gt;</code></td>
                  <td><code class="tag-highlight">&lt;oefa-button variant="primary"&gt;</code></td>
                  <td>Componente</td>
                  <td>Colores y contrastes validados WCAG AAA</td>
                </tr>
                <tr>
                  <td><code>&lt;p-tag value="Activo"&gt;</code></td>
                  <td><code class="tag-highlight">&lt;oefa-status-badge status="success"&gt;</code></td>
                  <td>Componente</td>
                  <td>6 estados semánticos del OEFA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 2. Ficha: Contenedor de Página -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>2. Estructura de Página (.oefa-page)</h3>
            <span class="text-muted">Paso 1: Fricción | Paso 2: Solución | Paso 3: Código | Paso 4: Ficha</span>
          </div>
        </div>
        <div class="card-body">
          <div class="didactic-step step-problem">
            <strong>❌ El problema:</strong> Escribir clases manuales como <code>.modulo-container</code> con padding fijo que rompe la pantalla en celulares.
          </div>
          <div class="didactic-step step-solution">
            <strong>✅ La solución OEFA:</strong> Envolver la vista en <code>&lt;div class="oefa-page"&gt;</code>. Gestiona 24px en escritorio y 16px en móvil automáticamente.
          </div>

          <div class="code-box">
            <div class="code-box-header">
              <span>HTML del Componente</span>
              <button class="btn-copy" (click)="copyCode(snippetPage)">Copiar</button>
            </div>
            <pre><code>{{ snippetPage }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 3. Ficha: Rejilla Responsiva y Tarjetas en Acción -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>3. Rejillas (.oefa-grid-auto) y Tarjetas (&lt;oefa-card&gt;)</h3>
            <span class="text-muted">Demostración en vivo y snippet copiable</span>
          </div>
        </div>
        <div class="card-body">
          <div class="didactic-step step-problem">
            <strong>❌ El problema:</strong> Escribir reglas complejas de CSS Grid o cargar librerías de 300KB para tener tarjetas responsivas.
          </div>
          <div class="didactic-step step-solution">
            <strong>✅ La solución OEFA:</strong> Usar <code>.oefa-grid-auto</code> y colocar tarjetas <code>&lt;oefa-card&gt;</code> adentro.
          </div>

          <!-- Preview en vivo -->
          <div class="live-preview-box">
            <span class="preview-label">PREVIEW EN VIVO:</span>
            <div class="oefa-grid-auto">
              <oefa-card title="Supervisión Ambiental" subtitle="Sector Minería">
                <p>Inspección técnica programada con toma de muestras en cuenca.</p>
                <div card-footer>
                  <oefa-button variant="secondary" size="sm">Ver Detalle</oefa-button>
                  <oefa-button variant="primary" size="sm">Gestionar</oefa-button>
                </div>
              </oefa-card>

              <oefa-card title="Fiscalización Directa" subtitle="Sector Hidrocarburos" [interactive]="true">
                <p>Tarjeta interactiva: Haz clic o navega con teclado (Tab + Enter).</p>
                <div card-footer>
                  <oefa-status-badge status="info">EN TRÁMITE</oefa-status-badge>
                </div>
              </oefa-card>
            </div>
          </div>

          <!-- Snippet -->
          <div class="code-box">
            <div class="code-box-header">
              <span>Plantilla HTML Lista para Usar</span>
              <button class="btn-copy" (click)="copyCode(snippetGrid)">Copiar</button>
            </div>
            <pre><code>{{ snippetGrid }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 4. Ficha: Sistema de 12 Columnas (.oefa-row / .oefa-col-*) -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>4. Sistema de 12 Columnas Clásico (.oefa-row / .oefa-col-*)</h3>
            <span class="text-muted">Distribución exacta tipo Bootstrap / PrimeFlex sin dependencias externas</span>
          </div>
        </div>
        <div class="card-body">
          <div class="didactic-step step-solution">
            <strong>✅ Rejilla institucional:</strong> Combina <code>.oefa-row</code> con clases responsivas como <code>.oefa-col-12 .oefa-col-md-6 .oefa-col-lg-4</code>.
          </div>

          <div class="live-preview-box">
            <span class="preview-label">DEMO EN VIVO (12 Columnas):</span>
            <div class="oefa-row">
              <div class="oefa-col-12 oefa-col-md-6 oefa-col-lg-4">
                <div class="demo-col-box">col-12 col-md-6 col-lg-4</div>
              </div>
              <div class="oefa-col-12 oefa-col-md-6 oefa-col-lg-4">
                <div class="demo-col-box">col-12 col-md-6 col-lg-4</div>
              </div>
              <div class="oefa-col-12 oefa-col-md-12 oefa-col-lg-4">
                <div class="demo-col-box">col-12 col-md-12 col-lg-4</div>
              </div>
            </div>
          </div>

          <div class="code-box">
            <div class="code-box-header">
              <span>Snippet 12 Columnas</span>
              <button class="btn-copy" (click)="copyCode(snippetColumns)">Copiar</button>
            </div>
            <pre><code>{{ snippetColumns }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 5. Ficha: Divisores Visuales y Helpers de Texto -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>5. Divisores (.oefa-divider) y Helpers de Texto</h3>
            <span class="text-muted">Separadores institucionales y formateo rápido de tipografía</span>
          </div>
        </div>
        <div class="card-body">
          <div class="live-preview-box">
            <span class="preview-label">DEMO EN VIVO (Divisores y Textos):</span>
            <p class="oefa-text-muted">Línea horizontal completa:</p>
            <hr class="oefa-divider" />

            <div class="oefa-divider-text">O CONTINUAR CON</div>

            <div class="oefa-flex-row oefa-align-center oefa-mt-md">
              <span>Opción A</span>
              <span class="oefa-divider-vertical"></span>
              <span>Opción B</span>
              <span class="oefa-divider-vertical"></span>
              <span class="oefa-text-danger">Opción Riesgosa</span>
              <span class="oefa-divider-vertical"></span>
              <span class="oefa-text-success">Opción Conforme</span>
            </div>

            <p class="oefa-text-truncate oefa-mt-md" style="max-width: 320px; border: 1px dashed var(--oefa-border-color); padding: 4px 8px;">
              Texto muy extenso recortado con elipsis: OEFA fiscaliza el cumplimiento de obligaciones ambientales en minería, energía y pesca.
            </p>
          </div>

          <div class="code-box">
            <div class="code-box-header">
              <span>Snippet Divisores y Helpers</span>
              <button class="btn-copy" (click)="copyCode(snippetDividers)">Copiar</button>
            </div>
            <pre><code>{{ snippetDividers }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 6. Ficha: Acordeón Institucional (<oefa-accordion>) -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>6. Acordeón Institucional (&lt;oefa-accordion&gt;)</h3>
            <span class="text-muted">Agrupación sincronizada de paneles plegables con opción de colapsar otros</span>
          </div>
        </div>
        <div class="card-body">
          <div class="live-preview-box">
            <span class="preview-label">DEMO EN VIVO (Modo Exclusivo):</span>
            <oefa-accordion [multiple]="false">
              <oefa-collapsible title="1. Datos Generales del Expediente" [isOpen]="true" variant="card">
                <p>Número de expediente: EXP-2026-MIN-0042. Administrado: Minera del Centro S.A.</p>
              </oefa-collapsible>
              <oefa-collapsible title="2. Documentación Adjunta y Resoluciones" variant="card">
                <p>Resolución Directoral N° 0128-2026-OEFA/DFAI y actas de fiscalización técnica.</p>
              </oefa-collapsible>
              <oefa-collapsible title="3. Historial de Notificaciones" variant="card">
                <p>Notificado electrónicamente mediante casilla SINASU el 01/10/2026.</p>
              </oefa-collapsible>
            </oefa-accordion>
          </div>

          <div class="code-box">
            <div class="code-box-header">
              <span>Snippet Acordeón</span>
              <button class="btn-copy" (click)="copyCode(snippetAccordion)">Copiar</button>
            </div>
            <pre><code>{{ snippetAccordion }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .didactic-step {
      padding: 12px 16px;
      border-radius: var(--oefa-radius-md);
      font-size: 0.875rem;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .step-problem { background: #fff1f2; border: 1px solid #fecdd3; color: #9f1239; }
    .step-solution { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }

    .table-responsive { overflow-x: auto; }
    .ds-equiv-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }
    .ds-equiv-table th {
      background: var(--oefa-surface-subtle, #f8fafc);
      padding: 12px 16px;
      border-bottom: 2px solid var(--oefa-border-color);
      color: var(--oefa-text-secondary);
      font-weight: 600;
    }
    .ds-equiv-table td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--oefa-border-color);
      color: var(--oefa-text-primary);
    }
    .tag-highlight {
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-on-container);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    .demo-col-box {
      background: var(--oefa-primary-container, #eef4ff);
      color: var(--oefa-primary-root, #144aa7);
      padding: 12px;
      border-radius: var(--oefa-radius-md, 8px);
      text-align: center;
      font-weight: 600;
      font-size: 0.8125rem;
      border: 1px dashed var(--oefa-primary-container-hc, #a4c1f4);
    }

    .code-box {
      background: #0f172a;
      border-radius: var(--oefa-radius-md);
      overflow: hidden;
      margin-top: 16px;
    }
    .code-box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 8px 16px;
      color: #94a3b8;
      font-size: 0.75rem;
      font-family: monospace;
    }
    .btn-copy {
      background: #334155;
      color: #f8fafc;
      border: none;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: #475569; }
    }
    .code-box pre {
      margin: 0;
      padding: 16px;
      color: #e2e8f0;
      font-family: monospace;
      font-size: 0.8125rem;
      overflow-x: auto;
      line-height: 1.5;
    }

    .live-preview-box {
      border: 1px dashed var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      margin: 16px 0;
      background: var(--oefa-surface-app, #f8fafc);
    }
    .preview-label {
      display: block;
      font-size: 0.6875rem;
      font-weight: 800;
      color: var(--oefa-text-muted);
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
  `]
})
export class DesignSystemDevGuideComponent {
  snippetPage = `<div class="oefa-page">
  <oefa-page-header 
    title="Título del Módulo" 
    subtitle="Descripción institucional del flujo" />
    
  <!-- Contenido de la vista aquí -->
</div>`;

  snippetGrid = `<div class="oefa-page">
  <div class="oefa-grid-auto">
    <oefa-card title="Expediente N° 2026-001" subtitle="En Evaluación">
      <p>Detalle de la inspección técnica ambiental...</p>
      <div card-footer>
        <oefa-button variant="primary" size="small">Ver Detalle</oefa-button>
      </div>
    </oefa-card>
  </div>
</div>`;

  snippetColumns = `<div class="oefa-row">
  <div class="oefa-col-12 oefa-col-md-6 oefa-col-lg-4">
    <!-- Contenido columna 1 -->
  </div>
  <div class="oefa-col-12 oefa-col-md-6 oefa-col-lg-4">
    <!-- Contenido columna 2 -->
  </div>
  <div class="oefa-col-12 oefa-col-md-12 oefa-col-lg-4">
    <!-- Contenido columna 3 -->
  </div>
</div>`;

  snippetDividers = `<!-- Divisor horizontal simple -->
<hr class="oefa-divider" />

<!-- Divisor horizontal con texto centrado tipo PrimeNG -->
<div class="oefa-divider-text">O CONTINUAR CON</div>

<!-- Divisor vertical en barras y listas -->
<div class="oefa-flex-row oefa-align-center">
  <span>Elemento A</span>
  <span class="oefa-divider-vertical"></span>
  <span class="oefa-text-danger">Alerta Crítica</span>
  <span class="oefa-divider-vertical"></span>
  <span class="oefa-text-muted">Texto atenuado</span>
</div>`;

  snippetAccordion = `<oefa-accordion [multiple]="false">
  <oefa-collapsible title="1. Datos Generales" [isOpen]="true" variant="card">
    <p>Información del expediente...</p>
  </oefa-collapsible>
  <oefa-collapsible title="2. Resoluciones Emitidas" variant="card">
    <p>Documentos y archivos adjuntos...</p>
  </oefa-collapsible>
</oefa-accordion>`;

  copyCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
  }
}

