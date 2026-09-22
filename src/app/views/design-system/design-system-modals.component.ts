import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaModalComponent } from '../../shared/components/modal/modal.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-design-system-modals',
  standalone: true,
  imports: [CommonModule, OefaModalComponent, OefaButtonComponent, OefaProgressBarComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🪟 Diálogos Modales y Confirmaciones (Organismos)</h2>
          <p class="subtitle">Componente &lt;oefa-modal&gt; accesible con backdrop blur, iconos de variante semántica, trampeo de foco, tecla Escape y variantes temáticas.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tarjeta 1: Modales Interactivos de Prueba -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Disparadores de Demostración</h3>
          <span class="text-muted">Prueba en vivo las distintas variantes semánticas, tamaños y comportamientos de &lt;oefa-modal&gt;.</span>
        </div>
        <div class="card-body">
          <div class="trigger-buttons-row">
            <oefa-button variant="primary" (clicked)="isConfirmOpen.set(true)">
              💬 Informativo (variant="info", size="md")
            </oefa-button>

            <oefa-button variant="primary" (clicked)="isSuccessOpen.set(true)">
              ✅ Éxito Operativo (variant="success", size="sm")
            </oefa-button>

            <oefa-button variant="secondary" (clicked)="isWarningOpen.set(true)">
              ⚠️ Advertencia / Plazo (variant="warning", size="sm")
            </oefa-button>

            <oefa-button variant="danger" (clicked)="isDangerOpen.set(true)">
              ⛔ Destructivo / Anular (variant="danger", size="sm")
            </oefa-button>

            <oefa-button variant="secondary" (clicked)="isLargeOpen.set(true)">
              📑 Detalle Extenso (size="lg")
            </oefa-button>

            <oefa-button variant="secondary" (clicked)="isFullOpen.set(true)">
              🖥️ Pantalla Completa (size="full")
            </oefa-button>

            <oefa-button variant="ghost" (clicked)="simularCarga()">
              ⏳ Modal de Proceso Bloqueante
            </oefa-button>
          </div>
        </div>
      </div>

      <!-- Modal 1: Informativo -->
      <oefa-modal
        [isOpen]="isConfirmOpen()"
        title="Importación de Plan Anual (POI)"
        subtitle="Sincronización de requerimientos con el Sistema Integrado"
        variant="info"
        size="md"
        confirmText="Aceptar y Continuar"
        cancelText="Cerrar"
        (confirm)="isConfirmOpen.set(false)"
        (close)="isConfirmOpen.set(false)">
        <p>Se han procesado <strong>24 ítems</strong> del archivo Excel cargado. Todos los registros cumplen con las validaciones presupuestales del ejercicio fiscal 2026.</p>
        <div style="background: var(--oefa-surface-subtle); padding: 12px; border-radius: var(--oefa-radius-md); font-size: 0.8125rem;">
          📌 <em>Recuerde que las modificaciones afectarán el cálculo de penalidades automáticas.</em>
        </div>
      </oefa-modal>

      <!-- Modal 2: Éxito -->
      <oefa-modal
        [isOpen]="isSuccessOpen()"
        title="Orden de Servicio Generada"
        subtitle="Expediente registrado exitosamente en SIGED"
        variant="success"
        size="sm"
        confirmText="Ir a la Orden"
        cancelText="Aceptar"
        (confirm)="isSuccessOpen.set(false)"
        (close)="isSuccessOpen.set(false)">
        <p style="margin: 0;">Se ha registrado la orden <strong>OS-00024-2026</strong> con 3 entregables programados. La notificación digital se envió al área requirente.</p>
      </oefa-modal>

      <!-- Modal 3: Advertencia -->
      <oefa-modal
        [isOpen]="isWarningOpen()"
        title="Entregables Próximos a Vencer"
        subtitle="Faltan menos de 5 días hábiles para el plazo fatal"
        variant="warning"
        size="sm"
        confirmText="Entendido"
        cancelText="Ver Plazos"
        (confirm)="isWarningOpen.set(false)"
        (close)="isWarningOpen.set(false)">
        <p style="margin: 0;">El entregable N° 2 de la orden <strong>OS-00019-2026</strong> vence el <strong>2026-03-20</strong>. Se recomienda enviar un recordatorio formal al contratista.</p>
      </oefa-modal>

      <!-- Modal 4: Peligro / Destructivo -->
      <oefa-modal
        [isOpen]="isDangerOpen()"
        title="¿Desestimar Orden de Servicio?"
        subtitle="Esta operación cambiará el estado de la orden a DESESTIMADO"
        variant="danger"
        size="sm"
        confirmText="Sí, Desestimar"
        cancelText="Cancelar"
        (confirm)="isDangerOpen.set(false)"
        (close)="isDangerOpen.set(false)">
        <p style="margin: 0;">¿Está seguro de anular la orden <strong>OS-00019-2026</strong>? Esta acción notificará al área usuaria y detendrá los plazos de entrega.</p>
      </oefa-modal>

      <!-- Modal 5: Grande -->
      <oefa-modal
        [isOpen]="isLargeOpen()"
        title="Ficha Técnica y Trazabilidad Completa"
        subtitle="Expediente Contractual SIGED N° 2026-E01-002341"
        size="lg"
        confirmText="Guardar Ficha"
        cancelText="Volver"
        (confirm)="isLargeOpen.set(false)"
        (close)="isLargeOpen.set(false)">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <h4>Resumen de Contratación:</h4>
          <p>Servicio de consultoría para el desarrollo y mantenimiento evolutivo del módulo OSOC de fiscalización ambiental.</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.875rem;">
            <div><strong>Proveedor:</strong> CONSORCIO AMBIENTAL DEL SUR</div>
            <div><strong>Monto Total:</strong> <span class="font-mono">S/ 78,000.00</span></div>
            <div><strong>Plazo de Ejecución:</strong> <span class="font-mono">90 Días Calendario</span></div>
            <div><strong>Entregables:</strong> 4 Entregables programados</div>
          </div>
        </div>
      </oefa-modal>

      <!-- Modal 6: Pantalla Completa -->
      <oefa-modal
        [isOpen]="isFullOpen()"
        title="Visor Institucional de Expedientes Digitales"
        subtitle="Vista completa sin scroll horizontal forzado (size='full')"
        size="full"
        confirmText="Descargar Todo"
        cancelText="Cerrar Visor"
        (confirm)="isFullOpen.set(false)"
        (close)="isFullOpen.set(false)">
        <div style="height: 100%; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: var(--oefa-surface-subtle); padding: 16px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
            <strong>Expediente Completo:</strong> SIGED-2026-EXP-004812 — Fiscalización Ambiental Sector Minería y Energía
          </div>
          <div style="flex: 1; border: 2px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); display: flex; align-items: center; justify-content: center; color: var(--oefa-text-secondary);">
            Visor de previsualización de documentos / PDFs integrados o tablas maestras de alta densidad.
          </div>
        </div>
      </oefa-modal>

      <!-- Modal 7: Proceso / Carga Bloqueante -->
      <oefa-modal
        [isOpen]="isLoadingOpen()"
        title="Sincronizando con SIGED..."
        subtitle="Por favor espere mientras se valida la firma digital del contrato"
        variant="info"
        size="sm"
        [showCloseButton]="false"
        [showFooter]="false"
        [closeOnBackdrop]="false">
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 12px 0;">
          <oefa-progress-bar [value]="progresoSimulado()" variant="primary" [showValueText]="true" />
          <p style="margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); text-align: center;">
            Validando certificado y sellado de tiempo de interoperabilidad...
          </p>
        </div>
      </oefa-modal>
      <!-- Tarjeta 2: Especificación y Regla de Borde Perimetral -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación de Uso y Borde Perimetral</h3>
          <span class="text-muted">Diseño institucional sin franja superior coloreada (<code>border-top: none</code>), con contorno perimetral sutil e iconos contextuales accesibles.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- Modal Semántico con Contorno Perimetral Limpio --&gt;
&lt;oefa-modal
  [isOpen]="isOpen"
  title="Confirmación de Operación"
  subtitle="Expediente SIGED-2026"
  variant="danger"
  size="sm"
  confirmText="Anular Registro"
  cancelText="Cancelar"
  (confirm)="onAnular()"
  (close)="isOpen = false"&gt;
  &lt;p&gt;¿Está seguro de anular el entregable? Esta acción no se puede deshacer.&lt;/p&gt;
&lt;/oefa-modal&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); border-radius: calc(var(--oefa-radius-lg) - 1px) calc(var(--oefa-radius-lg) - 1px) 0 0; display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .trigger-buttons-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono, monospace);
    }
  `]
})
export class DesignSystemModalsComponent {
  isConfirmOpen = signal<boolean>(false);
  isSuccessOpen = signal<boolean>(false);
  isWarningOpen = signal<boolean>(false);
  isDangerOpen = signal<boolean>(false);
  isLargeOpen = signal<boolean>(false);
  isFullOpen = signal<boolean>(false);
  isLoadingOpen = signal<boolean>(false);
  progresoSimulado = signal<number>(20);

  simularCarga(): void {
    this.progresoSimulado.set(15);
    this.isLoadingOpen.set(true);
    const interval = setInterval(() => {
      this.progresoSimulado.update(v => {
        if (v >= 100) {
          clearInterval(interval);
          setTimeout(() => this.isLoadingOpen.set(false), 500);
          return 100;
        }
        return v + 25;
      });
    }, 400);
  }
}

