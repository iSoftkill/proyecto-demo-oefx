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
  template: `
    <div
      class="oefa-progress-bar"
      [ngClass]="['variant-' + variant, 'size-' + size]"
      role="progressbar"
      [attr.aria-valuenow]="clampedValue"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="ariaLabelText">
      @if (label || subtext || showValueText) {
        <div class="progress-bar-header">
          @if (label) {
            <span class="progress-bar-label">{{ label }}</span>
          }
          <div class="progress-bar-right-info">
            @if (showValueText) {
              <span class="progress-bar-value-text">{{ clampedValue }}%</span>
            }
            @if (subtext) {
              <span class="progress-bar-subtext">{{ subtext }}</span>
            }
          </div>
        </div>
      }

      <div class="progress-bar-track">
        <div class="progress-bar-fill" [style.width.%]="clampedValue"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .progress-bar-right-info {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
    }
    .progress-bar-value-text {
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      font-size: 0.8125rem;
    }
  `]
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
