import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaSpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-design-system-feedback',
  standalone: true,
  imports: [
    CommonModule,
    OefaSpinnerComponent,
    OefaButtonComponent,
    OefaSkeletonComponent
  ],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>⏳ Indicadores de Carga: Skeleton vs Spinner (Átomos)</h2>
          <p class="subtitle">Componentes elementales de feedback de carga bajo norma WCAG 2.2.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Tarjeta 0: Cuadro comparativo de uso (Skeleton vs Spinner) -->
      <div class="card ds-card rule-card">
        <div class="card-header">
          <h3>⚖️ Regla de Decisión Oficial: Skeleton vs. Spinner</h3>
          <span class="text-muted">Criterio estandarizado según directrices WCAG 2.2 AA.</span>
        </div>
        <div class="card-body">
          <div class="rule-grid">
            <div class="rule-column skeleton-rule">
              <div class="rule-badge">SKELETON LOADING</div>
              <h4>¿Cuándo usarlo?</h4>
              <ul>
                <li><strong>Cargas iniciales de vista:</strong> Tablas de datos, vistas de detalle, cards y formularios.</li>
                <li><strong>Estructura conocida:</strong> Cuando el layout y las dimensiones son predecibles.</li>
                <li><strong>WCAG 2.2 (CLS):</strong> Evita saltos de maquetación (Cumulative Layout Shift).</li>
              </ul>
              <div class="rule-code">
                <code>&lt;div aria-busy="true"&gt;<br>&nbsp;&nbsp;&lt;oefa-skeleton ... /&gt;<br>&lt;/div&gt;</code>
              </div>
            </div>

            <div class="rule-column spinner-rule">
              <div class="rule-badge">SPINNER DE ESPERA</div>
              <h4>¿Cuándo usarlo?</h4>
              <ul>
                <li><strong>Acciones de usuario:</strong> Guardar, enviar formulario, sincronizar o exportar.</li>
                <li><strong>Procesos indeterminados:</strong> Duración incierta sin reserva de espacio fijo.</li>
                <li><strong>Micro-interacciones:</strong> Dentro de botones de acción o modales de guardado.</li>
              </ul>
              <div class="rule-code">
                <code>&lt;oefa-spinner role="status" size="md" ... /&gt;</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 1: Skeleton Loading Component Showcase -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Skeleton Loading (&lt;oefa-skeleton&gt;)</h3>
          <span class="text-muted">Efecto Shimmer animado con variantes <code>text</code>, <code>rect</code> y <code>circle</code>.</span>
        </div>
        <div class="card-body">
          <div class="skeleton-showcase-grid">
            <!-- Demo 1: Bloque de Texto & Avatar -->
            <div class="skeleton-demo-card">
              <span class="demo-card-title">Perfil / Card Usuario</span>
              <div class="skeleton-user-mock">
                <oefa-skeleton variant="circle" width="48px" height="48px"></oefa-skeleton>
                <div class="skeleton-user-info">
                  <oefa-skeleton variant="text" width="140px" height="18px"></oefa-skeleton>
                  <oefa-skeleton variant="text" width="90px" height="14px"></oefa-skeleton>
                </div>
              </div>
            </div>

            <!-- Demo 2: Fila de Tabla -->
            <div class="skeleton-demo-card">
              <span class="demo-card-title">Fila de Tabla (Simulada)</span>
              <div class="skeleton-table-row">
                <oefa-skeleton variant="text" width="40px" height="16px"></oefa-skeleton>
                <oefa-skeleton variant="text" width="90px" height="16px"></oefa-skeleton>
                <oefa-skeleton variant="rect" width="100px" height="24px"></oefa-skeleton>
                <oefa-skeleton variant="text" width="60px" height="16px"></oefa-skeleton>
              </div>
            </div>

            <!-- Demo 3: Bloque Rectangular / Gráfico -->
            <div class="skeleton-demo-card">
              <span class="demo-card-title">Contenedor / Tarjeta Métrica</span>
              <oefa-skeleton variant="rect" width="100%" height="70px"></oefa-skeleton>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Tamaños de Spinner -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Variantes de Spinner (&lt;oefa-spinner size="sm|md|lg"&gt;)</h3>
          <span class="text-muted">Animación suave continua con color primario institucional <code>var(--oefa-primary-root)</code>.</span>
        </div>
        <div class="card-body">
          <div class="spinner-demo-grid">
            <div class="demo-box">
              <oefa-spinner size="sm"></oefa-spinner>
              <span class="demo-label">Pequeño (<code>size="sm"</code> - 20px)</span>
              <p class="demo-hint">Para botones y celdas compactas.</p>
            </div>
            <div class="demo-box">
              <oefa-spinner size="md"></oefa-spinner>
              <span class="demo-label">Mediano (<code>size="md"</code> - 36px)</span>
              <p class="demo-hint">Tamaño por defecto en tarjetas y paneles.</p>
            </div>
            <div class="demo-box">
              <oefa-spinner size="lg"></oefa-spinner>
              <span class="demo-label">Grande (<code>size="lg"</code> - 48px)</span>
              <p class="demo-hint">Para carga inicial de página completa.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Con Mensaje Semántico y Accesibilidad -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Con Mensaje Informativo (Accesibilidad WCAG)</h3>
          <span class="text-muted">Incorpora <code>role="status"</code> y texto oculto para lectores de pantalla.</span>
        </div>
        <div class="card-body">
          <div class="message-demo-box">
            <oefa-spinner size="md" message="Cargando información de órdenes y contratos..."></oefa-spinner>
          </div>
        </div>
      </div>

      <!-- Tarjeta 4: Modo Overlay Pantalla Completa -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Modo Overlay Pantalla Completa</h3>
          <span class="text-muted">Cubre la pantalla con backdrop blur para bloqueos de procesamiento crítico.</span>
        </div>
        <div class="card-body">
          <oefa-button variant="primary" (clicked)="triggerFullscreenDemo()">
            Probar Spinner Pantalla Completa (3 seg)
          </oefa-button>

          @if (showFullscreen()) {
            <oefa-spinner [fullscreen]="true" size="lg" message="Sincronizando registros con SIGED..."></oefa-spinner>
          }
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
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    /* Rule Grid */
    .rule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .rule-grid { grid-template-columns: 1fr; } }
    .rule-column { padding: 20px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 12px; }
    .skeleton-rule { background-color: var(--oefa-surface-subtle); }
    .spinner-rule { background-color: var(--oefa-primary-container); }
    .rule-badge { align-self: flex-start; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: var(--oefa-radius-sm); }
    .skeleton-rule .rule-badge { background: var(--oefa-surface-card); color: var(--oefa-text-primary); border: 1px solid var(--oefa-border-color); }
    .spinner-rule .rule-badge { background: var(--oefa-primary-root); color: var(--oefa-primary-on); }
    .rule-column h4 { margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--oefa-text-primary); }
    .rule-column ul { margin: 0; padding-left: 18px; font-size: 0.85rem; color: var(--oefa-text-secondary); display: flex; flex-direction: column; gap: 6px; }
    .rule-code code { font-size: 0.8rem; background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); color: var(--oefa-text-primary); padding: 6px 10px; border-radius: var(--oefa-radius-sm); display: block; font-family: var(--oefa-font-mono); }

    /* Skeleton Showcase */
    .skeleton-showcase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
    .skeleton-demo-card { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 18px; background: var(--oefa-surface-card); display: flex; flex-direction: column; gap: 14px; }
    .demo-card-title { font-size: 0.8125rem; font-weight: 600; color: var(--oefa-text-secondary); }
    .skeleton-user-mock { display: flex; align-items: center; gap: 14px; }
    .skeleton-user-info { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .skeleton-table-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-sm); }

    /* Spinner Showcase */
    .spinner-demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
    .demo-box { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; background: var(--oefa-surface-subtle); }
    .demo-label { font-weight: 700; font-size: 0.875rem; color: var(--oefa-text-primary); }
    .demo-hint { margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); }

    .message-demo-box { border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 32px; background: var(--oefa-surface-card); }
  `]
})
export class DesignSystemFeedbackComponent {
  showFullscreen = signal<boolean>(false);

  triggerFullscreenDemo(): void {
    this.showFullscreen.set(true);
    setTimeout(() => {
      this.showFullscreen.set(false);
    }, 3000);
  }
}

