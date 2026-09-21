import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-system-icons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>✨ Catálogo de Iconos y Reglas de Uso</h2>
          <p class="subtitle">Iconografía SVG nativa vectorial, estándares de dimensión, trazos y guías de alineación.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Sección 1: Reglas de Tamaño y Trazo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Reglas Técnicas de Trazo y Dimensiones</h3>
          <span class="text-muted">Todos los iconos utilizan trazo limpio SVG (<code>stroke="currentColor"</code>) adaptándose al color del texto o botón contenedor.</span>
        </div>
        <div class="card-body">
          <div class="rules-grid">
            <div class="rule-card">
              <div class="rule-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="rule-info">
                <strong>16px — Botones / Chips / Acciones</strong>
                <span class="token-code">stroke-width="2"</span>
                <p>Usado dentro de botones (<code>.btn</code>), celdas de tabla e indicadores micro-accionables.</p>
              </div>
            </div>

            <div class="rule-card">
              <div class="rule-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              </div>
              <div class="rule-info">
                <strong>18px — Tabs / Submenú Lateral</strong>
                <span class="token-code">stroke-width="2"</span>
                <p>Usado en pestañas navegables de configuración, formularios e ítems del submenú desplegable.</p>
              </div>
            </div>

            <div class="rule-card">
              <div class="rule-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <div class="rule-info">
                <strong>22px — Rail Principal / Header</strong>
                <span class="token-code">stroke-width="2" a "2.5"</span>
                <p>Usado en el Rail lateral izquierdo (<code>.sidebar-rail</code>) y en el botón flotante <code>+</code> de alta rápida.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección: Dónde previsualizar e incorporar iconos -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. ¿Dónde previsualizar e incorporar nuevos iconos?</h3>
          <span class="text-muted">Fuentes oficiales y estándar para copiar e integrar iconos al proyecto.</span>
        </div>
        <div class="card-body">
          <div class="rules-grid">
            <div class="rule-card">
              <div class="rule-info">
                <strong>Previsualización Externa</strong>
                <p>Buscar y previsualizar en las librerías oficiales de trazo vectorial:</p>
                <p>• <a href="https://feathericons.com" target="_blank" class="token-code">feathericons.com</a></p>
                <p>• <a href="https://lucide.dev/icons" target="_blank" class="token-code">lucide.dev/icons</a></p>
              </div>
            </div>
            <div class="rule-card">
              <div class="rule-info">
                <strong>Estándar de Integración</strong>
                <p>Copiar el SVG e incluirlo como SVG inline nativo configurando:</p>
                <p>• <code>stroke="currentColor"</code> (hereda color del texto/botón)</p>
                <p>• <code>width</code> y <code>height</code> según la regla (16px, 18px o 22px)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 3: Muestrario de Iconos por Categoría -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Catálogo de Iconos Vectoriales Nativos</h3>
        </div>
        <div class="card-body">
          <div class="icon-catalog-grid">
            <!-- Módulos y Navegación -->
            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span class="icon-name">grid</span>
              <span class="icon-desc">Dashboard</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              <span class="icon-name">file-text</span>
              <span class="icon-desc">Orden Servicio</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span class="icon-name">shopping-cart</span>
              <span class="icon-desc">Orden Compra</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              <span class="icon-name">layers</span>
              <span class="icon-desc">Jerarquía</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span class="icon-name">settings</span>
              <span class="icon-desc">Configuración</span>
            </div>

            <!-- Acciones y Filtros -->
            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span class="icon-name">search</span>
              <span class="icon-desc">Buscador</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <span class="icon-name">filter</span>
              <span class="icon-desc">Filtros</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span class="icon-name">eye</span>
              <span class="icon-desc">Ver Detalle</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              <span class="icon-name">refresh</span>
              <span class="icon-desc">Actualizar</span>
            </div>

            <div class="icon-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span class="icon-name">close</span>
              <span class="icon-desc">Cerrar / Cancelar</span>
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

    .rules-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .rule-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: #F8FAFC; display: flex; gap: 14px; align-items: flex-start; }
    .rule-icon-box { background: white; border: 1px solid var(--oefa-border-color); padding: 12px; border-radius: 8px; color: var(--oefa-primary-root); display: flex; align-items: center; justify-content: center; }
    .rule-info { display: flex; flex-direction: column; gap: 4px; }
    .rule-info strong { font-size: 0.875rem; color: var(--oefa-text-primary); }
    .token-code { font-family: monospace; font-size: 0.75rem; color: var(--oefa-primary-root); font-weight: 700; }
    .rule-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.35; }

    .icon-catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px; }
    .icon-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px; background: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--oefa-primary-root); transition: transform 0.15s ease, border-color 0.15s ease; }
    .icon-item:hover { transform: translateY(-2px); border-color: var(--oefa-primary-root); background: #EEF4FF; }
    .icon-name { font-family: monospace; font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-primary); }
    .icon-desc { font-size: 0.6875rem; color: var(--oefa-text-secondary); }
  `]
})
export class DesignSystemIconsComponent {}
