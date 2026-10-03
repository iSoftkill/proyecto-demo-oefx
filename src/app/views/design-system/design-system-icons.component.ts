import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../../shared/components/icon/icon.component';

interface CatalogIcon {
  name: string;
  label: string;
  category: string;
}

@Component({
  selector: 'app-design-system-icons',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>✨ Catálogo de Iconos y Componente Global &lt;oefa-icon&gt;</h2>
          <p class="subtitle">Componente angular reutilizable, escala de tamaños semánticos y catálogo SVG vectorial con accesibilidad integrada.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 1: Componente Global <oefa-icon> y Modos de Uso -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Componente Global: &lt;oefa-icon&gt;</h3>
          <span class="text-muted">Estándar institucional desacoplado y universalmente compatible con todos los componentes del sistema.</span>
        </div>
        <div class="card-body">
          <div class="component-showcase-grid">
            <!-- Escala de Tamaños -->
            <div class="showcase-card">
              <h4>Escala de Tamaños Semánticos (T-Shirt & Píxeles)</h4>
              <p class="section-desc">Dimensiones estandarizadas según la regla óptica de <code>lineHeight</code>:</p>
              
              <div class="sizes-row">
                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" size="xs" />
                  </div>
                  <span class="size-label">xs (14px)</span>
                  <span class="size-sub">Badges / Micro</span>
                </div>

                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" size="sm" />
                  </div>
                  <span class="size-label">sm (16px)</span>
                  <span class="size-sub">Botones / Chips</span>
                </div>

                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" size="md" />
                  </div>
                  <span class="size-label">md (20px)</span>
                  <span class="size-sub">Default / Inputs</span>
                </div>

                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" size="lg" />
                  </div>
                  <span class="size-label">lg (24px)</span>
                  <span class="size-sub">Bento / Headers</span>
                </div>

                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" size="xl" />
                  </div>
                  <span class="size-label">xl (32px)</span>
                  <span class="size-sub">Modales / Hero</span>
                </div>

                <div class="size-item">
                  <div class="icon-bubble">
                    <oefa-icon name="factory" [size]="40" />
                  </div>
                  <span class="size-label">40px</span>
                  <span class="size-sub">Número libre</span>
                </div>
              </div>
            </div>

            <!-- Variaciones de Color con Tokens -->
            <div class="showcase-card">
              <h4>Herencia de Color y Tokens Semánticos</h4>
              <p class="section-desc">Por defecto hereda <code>currentColor</code> o acepta cualquier token semántico <code>--oefa-*</code>:</p>
              
              <div class="colors-row">
                <div class="color-item">
                  <div class="icon-bubble" style="color: var(--oefa-primary-root);">
                    <oefa-icon name="scale" size="lg" />
                  </div>
                  <span>Primary</span>
                </div>

                <div class="color-item">
                  <div class="icon-bubble" style="color: var(--oefa-success-ui-safe);">
                    <oefa-icon name="check" size="lg" />
                  </div>
                  <span>Success</span>
                </div>

                <div class="color-item">
                  <div class="icon-bubble" style="color: var(--oefa-warning-ui-safe);">
                    <oefa-icon name="alert" size="lg" />
                  </div>
                  <span>Warning</span>
                </div>

                <div class="color-item">
                  <div class="icon-bubble" style="color: var(--oefa-error-ui-safe);">
                    <oefa-icon name="close" size="lg" />
                  </div>
                  <span>Error</span>
                </div>

                <div class="color-item">
                  <div class="icon-bubble" style="color: var(--oefa-text-secondary);">
                    <oefa-icon name="leaf" size="lg" />
                  </div>
                  <span>Secondary</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modos de Uso y Sintaxis -->
          <div class="usage-box">
            <h4>Modos de Implementación</h4>
            <div class="code-examples-grid">
              <div class="code-col">
                <strong>1. Por Nombre del Catálogo (Recomendado)</strong>
                <pre class="code-block">&lt;!-- Sizing semántico automático --&gt;
&lt;oefa-icon name="factory" size="lg" /&gt;

&lt;!-- Con token de color y tamaño sm --&gt;
&lt;oefa-icon name="close" size="sm" color="var(--oefa-error-ui-safe)" /&gt;</pre>
              </div>

              <div class="code-col">
                <strong>2. Proyección de SVG Personalizado</strong>
                <pre class="code-block">&lt;!-- Proyecta SVG externo manteniendo tamaño y tokens --&gt;
&lt;oefa-icon size="md" color="var(--oefa-primary-root)"&gt;
  &lt;svg viewBox="0 0 24 24" fill="none" stroke="currentColor"&gt;
    &lt;circle cx="12" cy="12" r="10" /&gt;
  &lt;/svg&gt;
&lt;/oefa-icon&gt;</pre>
              </div>

              <div class="code-col">
                <strong>3. Accesibilidad WCAG 2.2</strong>
                <pre class="code-block">&lt;!-- Decorativo (default: aria-hidden="true") --&gt;
&lt;oefa-icon name="leaf" size="md" /&gt;

&lt;!-- Informativo o interactivo con label accesible --&gt;
&lt;oefa-icon name="close" size="sm" ariaLabel="Cerrar modal" /&gt;</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Catálogo de Iconos Nativos Soportados -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Catálogo Interactivo de Iconos Disponibles</h3>
          <span class="text-muted">Iconos vectoriales listos para consumir con la propiedad <code>name="..."</code> en &lt;oefa-icon&gt;.</span>
        </div>
        <div class="card-body">
          <div class="icon-catalog-grid">
            @for (icon of catalogIcons; track icon.name) {
              <div class="icon-item" [title]="'Copiar: ' + icon.name">
                <div class="icon-preview">
                  <oefa-icon [name]="icon.name" size="lg" />
                </div>
                <span class="icon-name">{{ icon.name }}</span>
                <span class="icon-desc">{{ icon.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Sección 3: Reglas de Trazo y Dimensiones Institucionales -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Reglas Técnicas de Trazo y Dimensiones</h3>
          <span class="text-muted">Alineación óptica y directrices corporativas para preservar coherencia entre vistas.</span>
        </div>
        <div class="card-body">
          <div class="rules-grid">
            <div class="rule-card">
              <div class="rule-icon-box">
                <oefa-icon name="check" size="sm" />
              </div>
              <div class="rule-info">
                <strong>16px (sm) — Botones / Chips / Acciones</strong>
                <span class="token-code">stroke-width="2"</span>
                <p>Dentro de botones (<code>.btn</code>), chips semánticos, celdas de tabla y micro-acciones.</p>
              </div>
            </div>

            <div class="rule-card">
              <div class="rule-icon-box">
                <oefa-icon name="calendar" size="md" />
              </div>
              <div class="rule-info">
                <strong>20px (md) — Controles / Formularios / Cards</strong>
                <span class="token-code">stroke-width="2"</span>
                <p>Tamaño base predeterminado para inputs, dropdowns, listas e ítems navegables.</p>
              </div>
            </div>

            <div class="rule-card">
              <div class="rule-icon-box">
                <oefa-icon name="factory" size="lg" />
              </div>
              <div class="rule-info">
                <strong>24px (lg) — Bento Tiles / Cabeceras</strong>
                <span class="token-code">stroke-width="2"</span>
                <p>Métricas clave, Bento KPI Tiles y cabeceras principales de módulos institucionales.</p>
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
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-on-container); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; display: flex; flex-direction: column; gap: 24px; }

    .component-showcase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
    .showcase-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 20px; background: var(--oefa-surface-subtle); }
    .showcase-card h4 { margin: 0 0 6px 0; font-size: 0.9375rem; font-weight: 700; color: var(--oefa-text-primary); }
    .section-desc { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0 0 16px 0; line-height: 1.4; }

    .sizes-row, .colors-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; }
    .size-item, .color-item { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
    .icon-bubble { width: 52px; height: 52px; border-radius: var(--oefa-radius-md, 12px); background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); display: flex; align-items: center; justify-content: center; box-shadow: var(--oefa-shadow-sm); }
    .size-label { font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-primary); }
    .size-sub { font-size: 0.6875rem; color: var(--oefa-text-secondary); }
    .color-item span { font-size: 0.75rem; font-weight: 600; color: var(--oefa-text-secondary); }

    .usage-box { background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 20px; }
    .usage-box h4 { margin: 0 0 14px 0; font-size: 0.9375rem; font-weight: 700; color: var(--oefa-primary-root); }
    .code-examples-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .code-col strong { display: block; font-size: 0.8125rem; margin-bottom: 6px; color: var(--oefa-text-primary); }
    .code-block { background: var(--oefa-surface-app); color: var(--oefa-text-primary); border: 1px solid var(--oefa-border-color); padding: 12px 14px; border-radius: 8px; font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; line-height: 1.45; overflow-x: auto; margin: 0; }

    .icon-catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px; }
    .icon-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px 12px; background: var(--oefa-surface-card); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--oefa-primary-root); transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease; cursor: pointer; }
    .icon-item:hover { transform: translateY(-2px); border-color: var(--oefa-primary-root); background: var(--oefa-primary-container); color: var(--oefa-primary-on-container); box-shadow: var(--oefa-shadow-sm); }
    .icon-preview { display: flex; align-items: center; justify-content: center; height: 32px; }
    .icon-name { font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-primary); }
    .icon-item:hover .icon-name { color: var(--oefa-primary-on-container); }
    .icon-desc { font-size: 0.6875rem; color: var(--oefa-text-secondary); text-align: center; }
    .icon-item:hover .icon-desc { color: var(--oefa-primary-on-container); }

    .rules-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .rule-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: var(--oefa-surface-subtle); display: flex; gap: 14px; align-items: flex-start; }
    .rule-icon-box { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); padding: 12px; border-radius: 8px; color: var(--oefa-primary-root); display: flex; align-items: center; justify-content: center; }
    .rule-info { display: flex; flex-direction: column; gap: 4px; }
    .rule-info strong { font-size: 0.875rem; color: var(--oefa-text-primary); }
    .token-code { font-family: var(--oefa-font-mono, monospace); font-size: 0.75rem; color: var(--oefa-primary-root); font-weight: 700; }
    .rule-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.35; }
  `]
})
export class DesignSystemIconsComponent {
  catalogIcons: CatalogIcon[] = [
    { name: 'factory', label: 'Fiscalización / Industria', category: 'Supervisión' },
    { name: 'droplets', label: 'Efluentes / Agua', category: 'Supervisión' },
    { name: 'scale', label: 'Legal / Sancionador', category: 'Legal' },
    { name: 'leaf', label: 'Medio Ambiente / Flora', category: 'Ambiental' },
    { name: 'chart', label: 'Métricas / Reportes', category: 'General' },
    { name: 'close', label: 'Cerrar / Cancelar', category: 'Acciones' },
    { name: 'check', label: 'Confirmar / Éxito', category: 'Acciones' },
    { name: 'search', label: 'Buscador General', category: 'Navegación' },
    { name: 'alert', label: 'Alerta / Advertencia', category: 'Feedback' },
    { name: 'info', label: 'Información / Ayuda', category: 'Feedback' },
    { name: 'calendar', label: 'Fechas / Plazos', category: 'General' },
    { name: 'plus', label: 'Nuevo / Agregar', category: 'Acciones' },
    { name: 'filter', label: 'Filtros Facetados', category: 'Acciones' },
    { name: 'user', label: 'Usuario / Administrador', category: 'Sistema' },
    { name: 'folder', label: 'Expediente / Carpeta', category: 'Archivos' },
    { name: 'document', label: 'Acta / Documento', category: 'Archivos' },
    { name: 'kebab', label: 'Menú contextual', category: 'Acciones' },
    { name: 'chevron-down', label: 'Desplegar', category: 'Navegación' },
    { name: 'chevron-right', label: 'Siguiente / Detalle', category: 'Navegación' },
    { name: 'chevron-left', label: 'Retroceder', category: 'Navegación' },
    { name: 'chevron-up', label: 'Colapsar', category: 'Navegación' }
  ];
}
