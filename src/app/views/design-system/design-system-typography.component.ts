import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaChipComponent } from '../../shared/components/chip/chip.component';

@Component({
  selector: 'app-design-system-typography',
  standalone: true,
  imports: [CommonModule, OefaStatusBadgeComponent, OefaChipComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔤 Tipografía e Identidad Escrita</h2>
          <p class="subtitle">Fuentes corporativas autorizadas, jerarquía de escala WCAG 2.2 y casos de uso en componentes OEFA.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 1: Familias Tipográficas -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Familias Tipográficas Autorizadas</h3>
        </div>
        <div class="card-body">
          <div class="font-family-grid">
            <div class="font-family-card">
              <div class="family-badge font-display-badge">Poppins · Display</div>
              <h4 class="font-poppins-title">Poppins (Google Fonts)</h4>
              <p class="family-token"><code>var(--oefa-font-display)</code></p>
              <p class="family-usage"><strong>Uso principal:</strong> H1–H4, títulos de páginas, cabeceras de tarjetas, títulos de modales y banners principales.</p>
              <div class="family-sample font-poppins-sample">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
              </div>
            </div>

            <div class="font-family-card">
              <div class="family-badge font-body-badge">Inter · Body & UI</div>
              <h4 class="font-inter-title">Inter (Google Fonts)</h4>
              <p class="family-token"><code>var(--oefa-font-body)</code></p>
              <p class="family-usage"><strong>Uso principal:</strong> Cuerpo de texto, celdas de tabla, botones, formularios, etiquetas, inputs e instrucciones de interfaz.</p>
              <div class="family-sample font-inter-sample">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
              </div>
            </div>

            <div class="font-family-card">
              <div class="family-badge font-mono-badge">JetBrains / Monospace · Tabular</div>
              <h4 class="font-mono-title">JetBrains Mono (Monospace)</h4>
              <p class="family-token"><code>var(--oefa-font-mono)</code></p>
              <p class="family-usage"><strong>Uso principal:</strong> Códigos de Orden (<code>OS-00019-2026</code>), expedientes SIGED, RUCs, montos en S/ y fechas tabulares.</p>
              <div class="family-sample font-mono-sample">
                OS-00019-2026 | RUC: 20543210981 | S/ 150,500.00 | SIGED: 2025-E01-09823
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Escala Jerárquica de Títulos (Headings) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Escala Jerárquica de Títulos (Headings)</h3>
        </div>
        <div class="card-body">
          <div class="type-scale-list">
            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">H1 — Título Principal de Página / Hero</span>
                <span class="scale-spec">Poppins SemiBold / Bold · 36px (2.25rem) · Line Height 40px (2.5rem) · 600 / 700</span>
              </div>
              <h1 class="sample-h1">Seguimiento y Control de Órdenes OS/OC</h1>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">H2 — Título de Sección / Vista Operativa</span>
                <span class="scale-spec">Poppins SemiBold · 30px (1.875rem) · Line Height 36px (2.25rem) · 600</span>
              </div>
              <h2 class="sample-h2">Dashboard de Control y Monitoreo General</h2>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">H3 — Título de Módulo / Sección Secundaria</span>
                <span class="scale-spec">Poppins SemiBold · 24px (1.5rem) · Line Height 32px (2rem) · 600</span>
              </div>
              <h3 class="sample-h3">Portafolio Consolidado de Proyectos y Mantenimientos</h3>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">H4 — Título de Tarjeta (Card) / Modal</span>
                <span class="scale-spec">Poppins SemiBold · 20px (1.25rem) · Line Height 28px (1.75rem) · 600</span>
              </div>
              <h4 class="sample-h4">Top 5 Clasificadores con Mayor Monto Programado</h4>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">H5 / Label — Subtítulo / Encabezado Menor</span>
                <span class="scale-spec">Inter Medium · 16px (1rem) · Line Height 22px (1.375rem) · 500</span>
              </div>
              <div class="sample-h5">Criterios de Evaluación y Conformidad Presupuestal</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 3: Tipografía de UI, Componentes y Texto de Cuerpo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Escala de UI, Componentes y Texto de Cuerpo (Inter)</h3>
        </div>
        <div class="card-body">
          <div class="type-scale-list">
            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">Paragraph Regular / Body Main</span>
                <span class="scale-spec">Inter Regular · 16px (1rem) · Line Height 24px (1.5rem) · 400</span>
              </div>
              <p class="sample-body-regular">El sistema permite la trazabilidad completa desde la notificación de la orden de compra o servicio hasta la emisión de la conformidad de cada entregable institucional.</p>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">Paragraph SemiBold / Énfasis</span>
                <span class="scale-spec">Inter SemiBold · 16px (1rem) · Line Height 24px (1.5rem) · 600</span>
              </div>
              <p class="sample-body-semibold">Nota obligatoria: Toda solicitud de modificación de plazo contractual requiere aprobación previa de la Subdirección requirente.</p>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">UI Small / Texto de Tablas y Form Controls</span>
                <span class="scale-spec">Inter Regular / Medium · 14px (0.875rem) · Line Height 20px (1.25rem) · 400 / 500</span>
              </div>
              <p class="sample-ui-sm">Contenido de celdas de tabla de entregables, placeholders de formulario y textos descriptivos de segundo nivel.</p>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">Caption / Badges & Chips (Componentes Reutilizables)</span>
                <span class="scale-spec">Inter Medium · 12px (0.75rem) · Line Height 16px (1rem) · 500</span>
              </div>
              <div class="sample-badge-row">
                <oefa-status-badge status="EN_PROCESO" size="sm" />
                <oefa-status-badge status="CONFORME" label="ATENDIDO" size="sm" />
                <oefa-status-badge status="OBSERVADO" size="sm" />
                <oefa-chip variant="area" label="DFAI" />
                <span class="caption-text">Texto de metadato auxiliar de fecha o estado complementario.</span>
              </div>
            </div>

            <div class="scale-item">
              <div class="scale-meta">
                <span class="scale-tag">Eyebrow / Etiquetas en Mayúsculas (Tracking +0.04em)</span>
                <span class="scale-spec">Inter Bold · 11px (0.6875rem) · letter-spacing: +0.04em · 700</span>
              </div>
              <div class="sample-eyebrow">DIRECCIÓN DE FISCALIZACIÓN Y APLICACIÓN DE INCENTIVOS</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 4: Casos de Uso Reales: Alineación Numérica Tabular y Contexto -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Cifras Numéricas Tabulares (Monospace) y Caso de Uso Real</h3>
        </div>
        <div class="card-body">
          <div class="tabular-demo-grid">
            <!-- Columna 1: Comparativa Proporcional vs Tabular -->
            <div class="demo-box">
              <h4 class="demo-box-title">Alineación Numérica Tabular (<code>tabular-nums</code>)</h4>
              <p class="demo-box-desc">Con <code>--oefa-font-mono</code> y <code>font-variant-numeric: tabular-nums</code>, los dígitos comparten el mismo ancho exacto facilitando la lectura vertical de montos en columnas.</p>

              <div class="table-preview">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Código SIGED</th>
                      <th style="text-align: right;">Monto Contratado</th>
                      <th style="text-align: right;">Monto Pagado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-mono">2026-E01-000119</td>
                      <td class="font-mono" style="text-align: right;">S/ 1,850,230.00</td>
                      <td class="font-mono" style="text-align: right;">S/ 1,850,230.00</td>
                    </tr>
                    <tr>
                      <td class="font-mono">2026-E01-000042</td>
                      <td class="font-mono" style="text-align: right;">S/ &nbsp;&nbsp;78,900.50</td>
                      <td class="font-mono" style="text-align: right;">S/ &nbsp;&nbsp;39,450.25</td>
                    </tr>
                    <tr>
                      <td class="font-mono">2026-E01-001589</td>
                      <td class="font-mono" style="text-align: right;">S/ &nbsp;&nbsp;&nbsp;9,450.00</td>
                      <td class="font-mono" style="text-align: right;">S/ &nbsp;&nbsp;&nbsp;9,450.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Columna 2: Tarjeta Contextual con Toda la Jerarquía Convivendo -->
            <div class="demo-box">
              <h4 class="demo-box-title">Jerarquía Completa en Tarjeta Operativa</h4>
              <p class="demo-box-desc">Ejemplo de convivencia visual de todos los niveles tipográficos en una tarjeta de orden.</p>

              <div class="contextual-card-sample">
                <div class="card-sample-header">
                  <span class="sample-eyebrow">SUBDIRECCIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN</span>
                  <oefa-status-badge status="EN_PROCESO" label="EN EJECUCIÓN" size="sm" [dot]="true" />
                </div>
                <h4 class="sample-h4 card-sample-title">Servicio de Mantenimiento y Soporte de Infraestructura Cloud</h4>
                <div class="card-sample-meta font-mono">
                  <span>OS-2026-00048</span>
                  <span class="bullet">•</span>
                  <span>SIGED: 2026-E01-004521</span>
                  <span class="bullet">•</span>
                  <span>RUC: 20512345678</span>
                </div>
                <p class="sample-ui-sm card-sample-desc">
                  Servicio especializado para la gestión continua, optimización de recursos y monitoreo 24/7 de cargas de trabajo institucionales.
                </p>
                <div class="card-sample-footer">
                  <div class="amount-block">
                    <span class="amount-label">MONTO ADJUDICADO</span>
                    <span class="amount-value font-mono">S/ 480,000.00</span>
                  </div>
                  <div class="amount-block">
                    <span class="amount-label">PLAZO RESTANTE</span>
                    <span class="amount-value font-mono">145 días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 5: Reglas de Uso — Cuándo Usar y Cuándo NO Usar Monospace -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>5. Guía de Aplicación: Cuándo usar y Cuándo NO usar <code>--oefa-font-mono</code></h3>
          <span class="text-muted">Criterio estandarizado para evitar el uso indiscriminado de tipografía monoespaciada en la interfaz.</span>
        </div>
        <div class="card-body">
          <div class="guidelines-grid">
            <!-- Cuándo SÍ usar -->
            <div class="guideline-card guideline-do">
              <div class="guideline-header">
                <span class="guideline-icon">✓</span>
                <h4>Cuándo SÍ usar (Recomendado)</h4>
              </div>
              <ul class="guideline-list">
                <li>
                  <strong>Montos e importes monetarios:</strong>
                  <span>En celdas de tablas, totales y tarjetas financieras donde se requiere alineación vertical precisa de decimales (<code>tabular-nums</code>).</span>
                </li>
                <li>
                  <strong>Fechas y horas estructuradas:</strong>
                  <span>Formatos numéricos o de registro técnico (ej: <code>2026-03-15</code>, <code>08/01/2026 14:30</code>) en tablas y metadatos.</span>
                </li>
                <li>
                  <strong>Códigos e identificadores oficiales:</strong>
                  <span>Expedientes SIGED, órdenes (<code>OS-00019-2026</code>), RUC, DNI o códigos de archivo.</span>
                </li>
                <li>
                  <strong>Parámetros de sistema y tokens:</strong>
                  <span>Nombres de archivo, rutas, logs técnicos y snippets de código.</span>
                </li>
              </ul>
            </div>

            <!-- Cuándo NO usar -->
            <div class="guideline-card guideline-dont">
              <div class="guideline-header">
                <span class="guideline-icon">✕</span>
                <h4>Cuándo NO usar (Evitar)</h4>
              </div>
              <ul class="guideline-list">
                <li>
                  <strong>Fechas narrativas o en prosa:</strong>
                  <span>En redacción continua (ej: <em>"Aprobado el 15 de marzo de 2026"</em>). Usar tipografía de cuerpo normal (<code>--oefa-font-body</code>).</span>
                </li>
                <li>
                  <strong>Cantidades y números en párrafos:</strong>
                  <span>Números descriptivos dentro de oraciones (ej: <em>"Se encontraron 5 observaciones"</em>).</span>
                </li>
                <li>
                  <strong>Títulos, encabezados y modales:</strong>
                  <span>Títulos principales, subtítulos de modales o textos de botones principales de acción.</span>
                </li>
                <li>
                  <strong>Listas descriptivas o campos de formulario:</strong>
                  <span>Labels, mensajes de error o ayuda; salvo que el input capture específicamente un código o monto.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .guidelines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
    }

    .guideline-card {
      border-radius: var(--oefa-radius-md);
      padding: 20px;
      border: 1px solid var(--oefa-border-color);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .guideline-do {
      background: var(--oefa-success-container);
      border-color: var(--oefa-success-ui-safe);
    }

    .guideline-dont {
      background: var(--oefa-error-container);
      border-color: var(--oefa-error-root);
    }

    .guideline-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .guideline-header h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
    }

    .guideline-do .guideline-header h4 {
      color: var(--oefa-success-ui-safe);
    }

    .guideline-dont .guideline-header h4 {
      color: var(--oefa-error-on-container);
    }

    .guideline-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-weight: 700;
      font-size: 0.875rem;
    }

    .guideline-do .guideline-icon {
      background: var(--oefa-success-root);
      color: var(--oefa-primary-on);
    }

    .guideline-dont .guideline-icon {
      background: var(--oefa-error-root);
      color: #FFFFFF;
    }

    .guideline-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .guideline-list li {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      line-height: 1.4;
    }

    .guideline-list li strong {
      font-size: 0.875rem;
      color: var(--oefa-text-primary);
    }

    .guideline-list li span {
      color: var(--oefa-text-secondary);
    }

    .ds-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
    }

    .subtitle {
      font-size: 0.875rem;
      color: var(--oefa-text-secondary);
      margin-top: 4px;
    }

    .ds-badge {
      background-color: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--oefa-radius-full);
      letter-spacing: 0.02em;
    }

    .ds-card {
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg);
      overflow: hidden;
      box-shadow: var(--oefa-shadow-sm);
    }

    .card-header {
      padding: 18px 24px;
      background: var(--oefa-surface-subtle);
      border-bottom: 1px solid var(--oefa-border-color);
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      font-family: var(--oefa-font-display);
      color: var(--oefa-text-primary);
    }

    .card-body {
      padding: 24px;
    }

    /* Familias Tipográficas */
    .font-family-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .font-family-card {
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 20px;
      background: var(--oefa-surface-subtle);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .family-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--oefa-radius-sm);
      width: fit-content;
    }

    .font-display-badge {
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
    }

    .font-body-badge {
      background: var(--oefa-secondary-container);
      color: var(--oefa-secondary-ui-safe);
    }

    .font-mono-badge {
      background: var(--oefa-surface-card);
      color: var(--oefa-text-primary);
      border: 1px solid var(--oefa-border-color);
    }

    .font-poppins-title {
      font-family: var(--oefa-font-display);
      margin: 0;
      font-size: 1.125rem;
      color: var(--oefa-text-primary);
    }

    .font-inter-title {
      font-family: var(--oefa-font-body);
      margin: 0;
      font-size: 1.125rem;
      color: var(--oefa-text-primary);
      font-weight: 600;
    }

    .font-mono-title {
      font-family: var(--oefa-font-mono);
      margin: 0;
      font-size: 1rem;
      color: var(--oefa-text-primary);
    }

    .family-token {
      margin: 0;
      font-size: 0.75rem;
    }

    .family-token code {
      background: var(--oefa-surface-card);
      padding: 2px 6px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-sm);
      font-family: var(--oefa-font-mono);
      color: var(--oefa-primary-root);
    }

    .family-usage {
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      margin: 0;
      line-height: 1.45;
    }

    .family-sample {
      background: var(--oefa-surface-card);
      padding: 12px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-sm);
      font-size: 0.875rem;
      color: var(--oefa-text-primary);
      word-break: break-all;
    }

    .font-poppins-sample { font-family: var(--oefa-font-display); }
    .font-inter-sample { font-family: var(--oefa-font-body); }
    .font-mono-sample { font-family: var(--oefa-font-mono); }

    /* Escalas de Títulos y UI */
    .type-scale-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .scale-item {
      border-bottom: 1px solid var(--oefa-border-color);
      padding-bottom: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .scale-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .scale-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .scale-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--oefa-primary-root);
      text-transform: uppercase;
      letter-spacing: var(--oefa-letter-spacing-uppercase, 0.04em);
    }

    .scale-spec {
      font-family: var(--oefa-font-mono);
      font-size: 0.75rem;
      color: var(--oefa-text-muted);
    }

    .sample-h1 {
      font-family: var(--oefa-font-display);
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-weight: 700;
      color: var(--oefa-primary-root);
      margin: 0;
    }

    .sample-h2 {
      font-family: var(--oefa-font-display);
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .sample-h3 {
      font-family: var(--oefa-font-display);
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .sample-h4 {
      font-family: var(--oefa-font-display);
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .sample-h5 {
      font-family: var(--oefa-font-body);
      font-size: 1rem;
      line-height: 1.375rem;
      font-weight: 500;
      color: var(--oefa-text-primary);
    }

    .sample-body-regular {
      font-family: var(--oefa-font-body);
      font-size: 1rem;
      line-height: 1.5rem;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .sample-body-semibold {
      font-family: var(--oefa-font-body);
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .sample-ui-sm {
      font-family: var(--oefa-font-body);
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: var(--oefa-text-secondary);
      margin: 0;
    }

    .sample-badge-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .caption-text {
      font-size: 0.75rem;
      color: var(--oefa-text-muted);
    }

    .sample-eyebrow {
      font-family: var(--oefa-font-body);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: var(--oefa-letter-spacing-uppercase, 0.04em);
      color: var(--oefa-text-muted);
      text-transform: uppercase;
    }

    /* Tabular & Casos Contextuales */
    .tabular-demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 24px;
    }

    .demo-box {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .demo-box-title {
      font-family: var(--oefa-font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--oefa-text-primary);
      margin: 0;
    }

    .demo-box-desc {
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      margin: 0;
      line-height: 1.45;
    }

    .table-preview {
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      overflow: hidden;
      background: var(--oefa-surface-card);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8125rem;
    }

    .data-table th {
      background: var(--oefa-surface-subtle);
      padding: 10px 14px;
      font-weight: 600;
      color: var(--oefa-text-secondary);
      border-bottom: 1px solid var(--oefa-border-color);
      text-align: left;
    }

    .data-table td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--oefa-border-color);
      color: var(--oefa-text-primary);
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    /* Tarjeta Contextual Simulada */
    .contextual-card-sample {
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 18px;
      background: var(--oefa-surface-card);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .card-sample-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .card-sample-title {
      margin: 0;
      font-size: 1.125rem;
      color: var(--oefa-text-primary);
    }

    .card-sample-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--oefa-text-muted);
      flex-wrap: wrap;
    }

    .bullet {
      color: var(--oefa-text-muted);
    }

    .card-sample-desc {
      color: var(--oefa-text-secondary);
    }

    .card-sample-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--oefa-border-color);
    }

    .amount-block {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .amount-label {
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--oefa-text-muted);
      letter-spacing: var(--oefa-letter-spacing-uppercase, 0.04em);
    }

    .amount-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--oefa-primary-root);
    }
  `]
})
export class DesignSystemTypographyComponent {}
