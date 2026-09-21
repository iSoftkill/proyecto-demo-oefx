import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'excel' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Componente reutilizable de botón con variantes del design system OEFA.
 *
 * @example
 * <oefa-button variant="primary" (clicked)="save()">Guardar</oefa-button>
 *
 * @example
 * <oefa-button variant="secondary" [disabled]="isLoading">Cancelar</oefa-button>
 *
 * @example
 * <oefa-button variant="primary" [loading]="isSaving">
 *   <svg ...></svg>
 *   Exportar Excel
 * </oefa-button>
 */
@Component({
  selector: 'oefa-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      class="btn"
      [ngClass]="[variantClass, sizeClass]"
      [disabled]="disabled || loading"
      [title]="title"
      (click)="handleClick($event)">
      @if (loading) {
        <span class="spinner-small"></span>
      }
      <ng-content />
    </button>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    /* Los estilos de .btn, .btn-primary, etc. están en styles.scss */
    button { width: 100%; }
  `]
})
export class OefaButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() title = '';
  @Output() clicked = new EventEmitter<void>();
  @Output() btnClick = this.clicked;

  get variantClass(): string {
    const map: Record<ButtonVariant, string> = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      excel: 'btn-excel',
      danger: 'btn-danger',
    };
    return map[this.variant];
  }

  get sizeClass(): string {
    const map: Record<ButtonSize, string> = {
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    };
    return map[this.size];
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
