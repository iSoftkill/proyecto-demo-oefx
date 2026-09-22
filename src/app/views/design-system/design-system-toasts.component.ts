import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { ToastService, ToastType } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-design-system-toasts',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔔 Notificaciones Toast Flotantes (Moléculas)</h2>
          <p class="subtitle">Servicio y componente &lt;oefa-toast&gt; para avisos transitorios reactivos bajo WCAG 2.2 aria-live.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Disparadores Interactivos de Notificación</h3>
          <span class="text-muted">Notificaciones efímeras automáticas con auto-cierre a los 3.2 segundos o descarte manual.</span>
        </div>
        <div class="card-body">
          <div class="button-group">
            <oefa-button variant="primary" (clicked)="showToast('success')">Disparar Éxito</oefa-button>
            <oefa-button variant="secondary" (clicked)="showToast('info')">Disparar Info</oefa-button>
            <oefa-button variant="excel" (clicked)="showToast('warning')">Disparar Advertencia</oefa-button>
            <oefa-button variant="danger" (clicked)="showToast('error')">Disparar Error</oefa-button>
          </div>

          <div class="info-note">
            <strong>Regla Arquitectural de Notificaciones (WCAG 2.2):</strong>
            <p class="note-desc">
              Los toasts son exclusivamente para <strong>eventos transitorios</strong> de confirmación o alerta no bloqueante.
              Para errores de validación de formulario o fallos de autenticación, use siempre <code>&lt;oefa-alert&gt;</code> o <code>.oefa-alert-banner</code> inline.
            </p>
          </div>
        </div>
      </div>

      <!-- Sección 2: Muestra Visual de Variantes -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Muestra Estática de Variantes Semánticas</h3>
          <span class="text-muted">Apariencia en reposo con marco perimetral uniforme de alto contraste y sombra flotante institucional.</span>
        </div>
        <div class="card-body">
          <div class="toast-preview-stack">
            <div class="oefa-toast-item toast-success preview-item">
              <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <span class="toast-message">Operación completada exitosamente en el sistema SIGED.</span>
            </div>

            <div class="oefa-toast-item toast-info preview-item">
              <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <span class="toast-message">El entregable N° 3 fue sincronizado con el cronograma previsto.</span>
            </div>

            <div class="oefa-toast-item toast-warning preview-item">
              <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <span class="toast-message">Atención: Quedan 3 días para el vencimiento del plazo de subsanación.</span>
            </div>

            <div class="oefa-toast-item toast-error preview-item">
              <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <span class="toast-message">No se pudo conectar con el servicio web de interoperabilidad PIDE.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 3: Código de Consumo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Código de Integración con ToastService</h3>
          <span class="text-muted">Inyección de servicio reactivo disponible globalmente en la aplicación.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">// Inyección de dependencias en componentes Angular standalone
private toastService = inject(ToastService);

// Métodos directos disponibles:
this.toastService.success('Operación completada exitosamente.');
this.toastService.info('Registro actualizado.');
this.toastService.warning('Advertencia de plazo.');
this.toastService.error('Ocurrió un error en el servidor.');</pre>
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

    .button-group { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
    .info-note { background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); padding: 16px 20px; border-radius: var(--oefa-radius-md); font-size: 0.875rem; color: var(--oefa-text-primary); }
    .note-desc { margin: 6px 0 0 0; color: var(--oefa-text-secondary); line-height: 1.45; }
    .info-note code { font-family: var(--oefa-font-mono); background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); color: var(--oefa-primary-root); padding: 2px 6px; border-radius: var(--oefa-radius-sm); }

    .toast-preview-stack { display: flex; flex-direction: column; gap: 12px; max-width: 500px; }
    .preview-item {
      padding: 12px 16px;
      border-radius: var(--oefa-radius-md);
      box-shadow: var(--oefa-shadow-sm);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid transparent;
    }
    .preview-item.toast-success { background-color: var(--oefa-success-container); color: var(--oefa-success-on-container); border-color: var(--oefa-success-container-hc); }
    .preview-item.toast-info { background-color: var(--oefa-primary-container); color: var(--oefa-primary-on-container); border-color: var(--oefa-primary-container-hc); }
    .preview-item.toast-warning { background-color: var(--oefa-tertiary-container); color: var(--oefa-tertiary-on-container); border-color: var(--oefa-tertiary-container-hc); }
    .preview-item.toast-error { background-color: var(--oefa-error-container); color: var(--oefa-error-on-container); border-color: var(--oefa-error-container-hc); }

    .toast-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .toast-message { flex: 1; line-height: 1.4; }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono);
      line-height: 1.5;
    }
  `]
})
export class DesignSystemToastsComponent {
  private toastService = inject(ToastService);

  showToast(type: ToastType): void {
    const messages: Record<ToastType, string> = {
      success: 'Operación completada exitosamente en el sistema SIGED.',
      info: 'El entregable fue actualizado según el cronograma previsto.',
      warning: 'Atención: Quedan 3 días para el vencimiento del plazo.',
      error: 'Error: No se pudo conectar con el servicio SIGED institucional.'
    };
    this.toastService.show(messages[type], type);
  }
}
