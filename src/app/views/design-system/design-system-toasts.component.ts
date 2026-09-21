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
          <h3>1. Disparadores de Notificación</h3>
          <span class="text-muted">Notificaciones efímeras automáticas con autocierre a los 4 segundos o cierre manual.</span>
        </div>
        <div class="card-body">
          <div class="button-group">
            <oefa-button variant="primary" (clicked)="showToast('success')">Toast Éxito</oefa-button>
            <oefa-button variant="secondary" (clicked)="showToast('info')">Toast Info</oefa-button>
            <oefa-button variant="excel" (clicked)="showToast('warning')">Toast Advertencia</oefa-button>
            <oefa-button variant="danger" (clicked)="showToast('error')">Toast Error</oefa-button>
          </div>

          <div class="info-note">
            <strong>Uso programático:</strong>
            <code>this.toastService.show('Mensaje a mostrar', 'success');</code>
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

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .button-group { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
    .info-note { background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); padding: 14px 18px; border-radius: var(--oefa-radius-md); font-size: 0.875rem; }
    .info-note code { font-family: monospace; background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 4px; display: block; margin-top: 6px; }
  `]
})
export class DesignSystemToastsComponent {
  private toastService = inject(ToastService);

  showToast(type: ToastType): void {
    const messages: Record<ToastType, string> = {
      success: 'Operación completada exitosamente en el sistema.',
      info: 'El entregable fue actualizado según el cronograma previsto.',
      warning: 'Atención: Quedan 3 días para el vencimiento del plazo.',
      error: 'Error: No se pudo conectar con el servicio SIGED institucional.'
    };
    this.toastService.show(messages[type], type);
  }
}
