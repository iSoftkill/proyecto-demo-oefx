import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getStatusBadgeClass, type StatusBadgeClass } from '../../utils/status.utils';

/**
 * Componente reutilizable para mostrar el estado de una orden o entregable.
 *
 * @example
 * <!-- Con estado del modelo (mapea automáticamente) -->
 * <oefa-status-badge [status]="order.status" />
 *
 * @example
 * <!-- Con clase fija explícita -->
 * <oefa-status-badge status="OBSERVADO" />
 *
 * @example
 * <!-- Con label personalizado -->
 * <oefa-status-badge status="OBSERVADO" label="Obs x 2" />
 */
@Component({
  selector: 'oefa-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge-status" [ngClass]="[resolvedClass, 'badge-' + size]">
      @if (dot) {
        <span class="badge-dot" aria-hidden="true"></span>
      }
      {{ resolvedLabel }}
    </span>
  `,
  styles: [`
    /* Los estilos base de .badge-status y sus variantes están en styles.scss
       Este archivo no redefine nada, para mantener el design token como única fuente de verdad. */
    :host {
      display: inline-flex;
    }
  `]
})
export class OefaStatusBadgeComponent {
  /** Valor del estado (EN_PROCESO, FINALIZADO, OBSERVADO, etc.) */
  @Input() status: string = '';

  /**
   * Label de display. Si no se provee, se usa el valor de status tal cual
   * (compatible con el comportamiento actual de las vistas).
   */
  @Input() label?: string;

  /**
   * Clase CSS explícita. Si se provee, sobreescribe el mapeo automático.
   */
  @Input() badgeClass?: StatusBadgeClass;

  /** Tamaño del badge: 'sm' (compacto tablas) | 'md' (estándar) */
  @Input() size: 'sm' | 'md' = 'md';

  /** Indicador visual tipo punto (WCAG 2.2 SC 1.4.1) */
  @Input() dot: boolean = false;

  get resolvedClass(): string {
    return this.badgeClass ?? getStatusBadgeClass(this.status);
  }

  get resolvedLabel(): string {
    return this.label ?? this.status;
  }
}

