import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/**
 * Componente reutilizable de barra de progreso del design system OEFA.
 * Cumple con WCAG 2.2 (role="progressbar", aria-valuenow).
 *
 * @example
 * <oefa-progress-bar [value]="75" variant="primary" size="sm" />
 *
 * @example
 * <oefa-progress-bar [value]="45" label="Avance Físico" subtext="3/5 entregables" variant="success" [showValueText]="true" />
 */
@Component({
  selector: 'oefa-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class OefaProgressBarComponent {
  @Input() value: number = 0;
  @Input() variant: ProgressBarVariant = 'primary';
  @Input() size: ProgressBarSize = 'md';
  @Input() label?: string;
  @Input() subtext?: string;
  @Input() showValueText: boolean = false;
  @Input() ariaLabel?: string;

  get clampedValue(): number {
    if (isNaN(this.value) || this.value < 0) return 0;
    if (this.value > 100) return 100;
    return Math.round(this.value * 10) / 10;
  }

  get ariaLabelText(): string {
    if (this.ariaLabel) return this.ariaLabel;
    if (this.label) return `${this.label}: ${this.clampedValue}%`;
    return `Progreso: ${this.clampedValue}%`;
  }
}
