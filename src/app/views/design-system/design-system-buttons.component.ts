import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-design-system-buttons',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaIconButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔘 Botones y Acciones de Interfaz (Átomos)</h2>
          <p class="subtitle">Componentes &lt;oefa-button&gt; y &lt;oefa-icon-button&gt; basados estrictamente en tokens de diseño OEFA y accesibilidad WCAG 2.2 AA.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Sección 1: Variantes de Botón -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Variantes de Acción (&lt;oefa-button variant="..."&gt;)</h3>
          <span class="text-muted">Cinco variantes semánticas según la jerarquía visual de la acción en la interfaz.</span>
        </div>
        <div class="card-body">
          <div class="button-spec-table">
            <div class="spec-row">
              <div class="demo-col">
                <oefa-button variant="primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Guardar Cambios
                </oefa-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-button variant="primary"&gt;</span>
                <strong>Botón Primario Institucional</strong>
                <p>Acción principal de mayor jerarquía (Guardar, Registrar, Confirmar). Token: <code>var(--oefa-primary-root)</code>.</p>
              </div>
            </div>

            <div class="spec-row">
              <div class="demo-col">
                <oefa-button variant="secondary">
                  Cancelar Operación
                </oefa-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-button variant="secondary"&gt;</span>
                <strong>Botón Secundario / Neutro</strong>
                <p>Acciones secundarias o de retorno con borde sutil. Token: <code>var(--oefa-border-color)</code> y <code>var(--oefa-surface-card)</code>.</p>
              </div>
            </div>

            <div class="spec-row">
              <div class="demo-col">
                <oefa-button variant="excel">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  Exportar a Excel
                </oefa-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-button variant="excel"&gt;</span>
                <strong>Botón Especial Excel</strong>
                <p>Estilo verde especializado para descargas de reportes y matrices tabulares (.xlsx / .csv).</p>
              </div>
            </div>

            <div class="spec-row">
              <div class="demo-col">
                <oefa-button variant="danger">
                  Eliminar Orden
                </oefa-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-button variant="danger"&gt;</span>
                <strong>Botón Peligro / Destructivo</strong>
                <p>Para operaciones críticas e irreversibles (anular, eliminar, desestimar). Token: <code>var(--oefa-danger-root)</code>.</p>
              </div>
            </div>

            <div class="spec-row">
              <div class="demo-col">
                <oefa-button variant="ghost">
                  Volver al Listado
                </oefa-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-button variant="ghost"&gt;</span>
                <strong>Botón Ghost / Sin Borde</strong>
                <p>Botón plano de baja densidad visual para enlaces de navegación secundaria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Tamaños -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Escala de Tamaños (&lt;oefa-button size="sm|md|lg"&gt;)</h3>
          <span class="text-muted">Alineado a alturas táctiles mínimas WCAG (>= 44px en móviles).</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <oefa-button variant="primary" size="sm">Pequeño (sm - 32px)</oefa-button>
            <oefa-button variant="primary" size="md">Mediano (md - 40px, default)</oefa-button>
            <oefa-button variant="primary" size="lg">Grande (lg - 48px)</oefa-button>
          </div>
        </div>
      </div>

      <!-- Sección 3: Estados Interactivos -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Estados Interactivos (Loading y Disabled)</h3>
          <span class="text-muted">Retroalimentación visual automática mientras se procesan llamadas asíncronas.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <oefa-button variant="primary" [loading]="true">Guardando...</oefa-button>
            <oefa-button variant="secondary" [disabled]="true">Acción Deshabilitada</oefa-button>
            <oefa-button variant="danger" [disabled]="true">Eliminar Bloqueado</oefa-button>
          </div>
        </div>
      </div>

      <!-- Sección 4: Botones de Ícono Puro -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Botones de Ícono Puro (&lt;oefa-icon-button variant="..."&gt;)</h3>
          <span class="text-muted">Botones cuadrados accesibles para micro-acciones, menús contextuales y cierre de modales.</span>
        </div>
        <div class="card-body">
          <div class="button-spec-table">
            <div class="spec-row">
              <div class="demo-col" style="gap: 16px;">
                <oefa-icon-button variant="close" title="Cerrar modal" ariaLabel="Cerrar"></oefa-icon-button>
                <oefa-icon-button variant="kebab" title="Más opciones" ariaLabel="Opciones"></oefa-icon-button>
                <oefa-icon-button variant="default" title="Buscar" ariaLabel="Buscar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </oefa-icon-button>
                <oefa-icon-button variant="ghost" title="Copiar" ariaLabel="Copiar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </oefa-icon-button>
              </div>
              <div class="info-col">
                <span class="class-code">&lt;oefa-icon-button variant="close|kebab|default|ghost"&gt;</span>
                <strong>Botones de Ícono Accesibles</strong>
                <p>Incorporan <code>ariaLabel</code> obligatorio para lectores de pantalla y soporte de eventos de click.</p>
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
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .button-spec-table { display: flex; flex-direction: column; gap: 16px; }
    .spec-row { display: flex; align-items: center; gap: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--oefa-border-color); }
    .spec-row:last-child { border-bottom: none; padding-bottom: 0; }
    .demo-col { min-width: 200px; display: flex; align-items: center; }
    .info-col { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .class-code { font-family: var(--oefa-font-mono, monospace); font-size: 0.8125rem; color: var(--oefa-primary-root); font-weight: 700; }
    .info-col strong { font-size: 0.9375rem; color: var(--oefa-text-primary); }
    .info-col p { margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); line-height: 1.4; }
  `]
})
export class DesignSystemButtonsComponent {}
