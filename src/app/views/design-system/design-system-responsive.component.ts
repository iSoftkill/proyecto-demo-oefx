import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-design-system-responsive',
  standalone: true,
  imports: [CommonModule, OefaAlertComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📱 Layout, Responsividad y Breakpoints (Organismos)</h2>
          <p class="subtitle">Especificación de tokens de pantalla, grillas fluidas y reglas de adaptación táctil para teléfonos, tablets y desktops.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Inspector en Vivo del Viewport con Componente Oficial OEFA -->
      <oefa-alert type="info" [bordered]="true" title="Inspector del Viewport en Tiempo Real">
        <div class="viewport-info">
          <span class="vp-label">ANCHO DEL VIEWPORT:</span>
          <span class="vp-number">{{ currentWidth() }}px</span>
          <span class="vp-badge" [ngClass]="currentBreakpointClass()">
            {{ currentBreakpointLabel() }}
          </span>
        </div>
        <p class="vp-hint">Redimensiona tu ventana para ver cómo conmuta automáticamente la clasificación de pantalla según las directrices OEFA.</p>
      </oefa-alert>

      <!-- Sección 1: Breakpoint Tokens -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>1. Tokens de Pantalla y Puntos de Corte (Breakpoints)</h3>
            <span class="text-muted">Variables CSS estandarizadas para controlar media queries en cualquier proyecto institucional.</span>
          </div>
        </div>
        <div class="card-body">
          <div class="bp-grid">
            <div class="bp-card" [class.active-card]="currentWidth() < 768">
              <div class="bp-header">
                <span class="bp-badge">SM — Móvil / Celular</span>
                <span class="status-indicator" *ngIf="currentWidth() < 768">ACTIVO</span>
              </div>
              <strong class="bp-val">640px</strong>
              <span class="token-code">--oefa-breakpoint-sm</span>
              <p>Formularios en 1 columna, botones al 100% de ancho, modales al 95vw, touch targets de 44px mínimo.</p>
            </div>

            <div class="bp-card" [class.active-card]="currentWidth() >= 768 && currentWidth() < 1024">
              <div class="bp-header">
                <span class="bp-badge">MD — Tablet Vertical</span>
                <span class="status-indicator" *ngIf="currentWidth() >= 768 && currentWidth() < 1024">ACTIVO</span>
              </div>
              <strong class="bp-val">768px</strong>
              <span class="token-code">--oefa-breakpoint-md</span>
              <p>Side Rail colapsa a Drawer/Offcanvas móvil, tablas con scroll horizontal táctil protegido.</p>
            </div>

            <div class="bp-card" [class.active-card]="currentWidth() >= 1024 && currentWidth() < 1280">
              <div class="bp-header">
                <span class="bp-badge">LG — Laptop / Tablet Horiz.</span>
                <span class="status-indicator" *ngIf="currentWidth() >= 1024 && currentWidth() < 1280">ACTIVO</span>
              </div>
              <strong class="bp-val">1024px</strong>
              <span class="token-code">--oefa-breakpoint-lg</span>
              <p>Header colapsa buscador a modal/ícono, barra lateral visible, grillas institucionales a 2-3 columnas.</p>
            </div>

            <div class="bp-card" [class.active-card]="currentWidth() >= 1280">
              <div class="bp-header">
                <span class="bp-badge">XL — Monitor Desktop</span>
                <span class="status-indicator" *ngIf="currentWidth() >= 1280">ACTIVO</span>
              </div>
              <strong class="bp-val">1280px+</strong>
              <span class="token-code">--oefa-breakpoint-xl</span>
              <p>Matriz de entregables desplegada 100% con side rail y paneles laterales simultáneos.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Reglas de Adaptación por Componente -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>2. Reglas de Adaptación Responsiva de Componentes Clave</h3>
            <span class="text-muted">Directrices obligatorias de transformación para garantizar continuidad de experiencia.</span>
          </div>
        </div>
        <div class="card-body">
          <div class="resp-rules-list">
            <div class="resp-rule-row">
              <span class="resp-icon">📑</span>
              <div class="resp-info">
                <strong>Tablas y Grids de Datos (.excel-data-table)</strong>
                <p>Las tablas nunca rompen el ancho de pantalla ni producen overflow general en <code>body</code>. Se encierran en un contenedor <code>.table-wrapper</code> con <code>overflow-x: auto</code> y desplazamiento suave táctil.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">🖼️</span>
              <div class="resp-info">
                <strong>Modales y Side Canvas Drawers (.modal-dialog / .drawer-panel)</strong>
                <p>En escritorio ocupan anchos fijos ergonómicos (540px / 480px). En pantallas &lt; 640px se escalan automáticamente al 95vw con cabecera fija y footer con botones apilados al 100% de ancho.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">🪜</span>
              <div class="resp-info">
                <strong>Steppers y Wizards (.step-wizard / .ds-stepper)</strong>
                <p>En pantallas de escritorio se presentan en distribución horizontal continua con línea conectora. En móviles (&lt; 768px) se transforman automáticamente a distribución vertical o modo compacto paso a paso.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">🧭</span>
              <div class="resp-info">
                <strong>Cabeceras y Side Rail (.oefa-header / .side-rail)</strong>
                <p>A partir de &lt; 1024px el buscador expandido del header se transforma en botón de activación. A &lt; 768px el Side Rail pasa a Drawer móvil accesible mediante botón hamburguesa táctil.</p>
              </div>
            </div>

            <div class="resp-rule-row">
              <span class="resp-icon">👆</span>
              <div class="resp-info">
                <strong>Accesibilidad Táctil (WCAG 2.2 AA SC 2.5.8 — Target Size)</strong>
                <p>Todo elemento accionable en pantalla táctil (botones, enlaces, checks, hamburguesa) debe mantener un área de impacto mínima de <code>44x44px</code> (token <code>--oefa-touch-target: 44px</code>).</p>
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

    /* Estilos del contenido interno del Alert */
    .viewport-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .vp-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: inherit;
      opacity: 0.85;
    }
    .vp-number {
      font-family: monospace;
      font-size: 1.35rem;
      font-weight: 800;
      color: inherit;
    }
    .vp-badge {
      font-size: 0.8125rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.08);
      color: inherit;
    }
    .vp-badge.bp-sm { background: #fee2e2; color: #991b1b; }
    .vp-badge.bp-md { background: #fef3c7; color: #92400e; }
    .vp-badge.bp-lg { background: #e0e7ff; color: #3730a3; }
    .vp-badge.bp-xl { background: #dcfce7; color: #166534; }
    .vp-hint {
      margin: 4px 0 0 0;
      font-size: 0.8125rem;
      color: inherit;
      opacity: 0.9;
    }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .bp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .bp-card { 
      border: 1px solid var(--oefa-border-color); 
      border-radius: var(--oefa-radius-md); 
      padding: 18px; 
      background: var(--oefa-surface-subtle); 
      display: flex; 
      flex-direction: column; 
      gap: 8px;
      transition: all 0.2s ease;
    }
    .bp-card.active-card {
      border-color: var(--oefa-primary-root);
      box-shadow: 0 0 0 2px var(--oefa-primary-root);
      background: var(--oefa-surface-card);
    }
    .bp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-indicator {
      font-size: 0.6875rem;
      font-weight: 800;
      color: #166534;
      background: #dcfce7;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .bp-badge { font-size: 0.75rem; font-weight: 700; color: var(--oefa-primary-root); }
    .bp-val { font-family: monospace; font-size: 1.5rem; color: var(--oefa-text-primary); }
    .bp-card p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.4; }

    .resp-rules-list { display: flex; flex-direction: column; gap: 16px; }
    .resp-rule-row { 
      display: flex; 
      gap: 16px; 
      padding: 16px; 
      border: 1px solid var(--oefa-border-color); 
      border-radius: var(--oefa-radius-md); 
      background: var(--oefa-surface-subtle); 
      align-items: flex-start; 
    }
    .resp-icon { font-size: 1.5rem; line-height: 1; }
    .resp-info { display: flex; flex-direction: column; gap: 4px; }
    .resp-info strong { font-size: 0.9375rem; color: var(--oefa-text-primary); }
    .resp-info p { font-size: 0.8125rem; color: var(--oefa-text-secondary); margin: 0; line-height: 1.4; }
  `]
})
export class DesignSystemResponsiveComponent implements OnInit {
  currentWidth = signal<number>(1280);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.currentWidth.set(window.innerWidth);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.currentWidth.set(window.innerWidth);
    }
  }

  currentBreakpointLabel(): string {
    const w = this.currentWidth();
    if (w < 640) return 'XS (Móvil Compacto < 640px)';
    if (w < 768) return 'SM (Móvil Estándar 640px - 767px)';
    if (w < 1024) return 'MD (Tablet Vertical 768px - 1023px)';
    if (w < 1280) return 'LG (Laptop / Tablet Horiz. 1024px - 1279px)';
    return 'XL (Monitor Desktop >= 1280px)';
  }

  currentBreakpointClass(): string {
    const w = this.currentWidth();
    if (w < 768) return 'bp-sm';
    if (w < 1024) return 'bp-md';
    if (w < 1280) return 'bp-lg';
    return 'bp-xl';
  }
}
