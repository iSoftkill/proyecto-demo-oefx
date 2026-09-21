import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-system-responsive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📱 Layout, Responsividad y Breakpoints (Organismos)</h2>
          <p class="subtitle">Especificación de tokens de pantalla, grillas fluidas y reglas de adaptación táctil para teléfonos, tablets y desktops.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 1: Breakpoint Tokens -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Tokens de Pantalla y Puntos de Corte (Breakpoints)</h3>
          <span class="text-muted">Variables CSS estandarizadas para controlar media queries en cualquier proyecto institucional.</span>
        </div>
        <div class="card-body">
          <div class="bp-grid">
            <div class="bp-card">
              <span class="bp-badge">SM — Celular</span>
              <strong class="bp-val">640px</strong>
              <span class="token-code">--oefa-breakpoint-sm</span>
              <p>Formularios en 1 columna, botones al 100% de ancho, títulos escalados a 1.5rem.</p>
            </div>

            <div class="bp-card">
              <span class="bp-badge">MD — Tablet</span>
              <strong class="bp-val">768px</strong>
              <span class="token-code">--oefa-breakpoint-md</span>
              <p>Menú lateral flotante/hamburguesa, tablas con scroll horizontal táctil protegido.</p>
            </div>

            <div class="bp-card">
              <span class="bp-badge">LG — Laptop</span>
              <strong class="bp-val">1024px</strong>
              <span class="token-code">--oefa-breakpoint-lg</span>
              <p>Barra lateral fijada (pinned), grillas de 2 a 3 columnas, drawers de 480px.</p>
            </div>

            <div class="bp-card">
              <span class="bp-badge">XL — Desktop</span>
              <strong class="bp-val">1280px+</strong>
              <span class="token-code">--oefa-breakpoint-xl</span>
              <p>Matriz de entregables desplegada 100% sin necesidad de scroll horizontal.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Reglas de Adaptación por Componente -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Reglas de Adaptación Responsiva de Componentes Clave</h3>
        </div>
        <div class="card-body">
          <div class="resp-rules-list">
            <div class="resp-rule-row">
              <span class="resp-icon">📑</span>
              <div class="resp-info">
                <strong>Tablas y Grids de Datos (.excel-data-table)</strong>
                <p>Las tablas nunca rompen el ancho de la pantalla. Se encierran en un contenedor <code>.table-wrapper</code> con <code>overflow-x: auto</code> y desplazamiento suave táctil.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">🖼️</span>
              <div class="resp-info">
                <strong>Modales y Side Canvas Drawers (.modal-dialog / .drawer-panel)</strong>
                <p>En escritorio ocupan anchos fijos (540px / 480px). En pantallas pequeñas menores a 640px se escalan automáticamente al 94% - 100% de la pantalla para facilitar la interacción táctil.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">🪜</span>
              <div class="resp-info">
                <strong>Steppers y Wizards (.step-wizard)</strong>
                <p>En escritorio se presentan de forma horizontal con líneas conectoras. En móviles se transforman en una lista vertical sin líneas rotas.</p>
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

    .bp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .bp-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: #F8FAFC; display: flex; flex-direction: column; gap: 6px; }
    .bp-badge { font-size: 0.75rem; font-weight: 700; color: var(--oefa-primary-root); }
    .bp-val { font-family: monospace; font-size: 1.5rem; color: var(--oefa-text-primary); }
    .bp-card p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; }

    .resp-rules-list { display: flex; flex-direction: column; gap: 16px; }
    .resp-rule-row { display: flex; gap: 16px; padding: 16px; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: #F8FAFC; align-items: flex-start; }
    .resp-icon { font-size: 1.5rem; }
    .resp-info { display: flex; flex-direction: column; gap: 4px; }
    .resp-info strong { font-size: 0.9375rem; color: var(--oefa-text-primary); }
    .resp-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.4; }
  `]
})
export class DesignSystemResponsiveComponent {}
