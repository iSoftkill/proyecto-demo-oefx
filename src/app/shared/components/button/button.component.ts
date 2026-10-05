import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OefaIconComponent, OefaIconSize } from '../icon/icon.component';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'excel' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

/**
 * Componente reutilizable de botón con variantes del design system OEFA.
 *
 * @example
 * <oefa-button variant="primary" icon="plus" (clicked)="crear()">Nuevo Registro</oefa-button>
 *
 * @example
 * <oefa-button variant="primary" icon="search" routerLink="/catalogo">Explorar</oefa-button>
 */
@Component({
  selector: 'oefa-button',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class OefaButtonComponent {
  private router = inject(Router, { optional: true });

  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() title = '';
  @Input() icon?: string;
  @Input() iconPosition: ButtonIconPosition = 'left';
  @Input() routerLink?: string | any[];
  @Input() queryParams?: Record<string, any>;
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

  get iconSize(): OefaIconSize {
    switch (this.size) {
      case 'sm':
        return 'xs';
      case 'lg':
        return 'md';
      case 'md':
      default:
        return 'sm';
    }
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      if (this.routerLink && this.router) {
        this.router.navigate(
          Array.isArray(this.routerLink) ? this.routerLink : [this.routerLink],
          { queryParams: this.queryParams }
        );
      }
      this.clicked.emit();
    }
  }
}
