import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconButtonVariant = 'default' | 'close' | 'kebab' | 'ghost';

/**
 * Botón de icono del design system OEFA.
 * Para botones que contienen solo un icono (cerrar, kebab, acciones inline).
 *
 * @example
 * <oefa-icon-button variant="close" title="Cerrar panel" (clicked)="close()" />
 *
 * @example
 * <oefa-icon-button variant="ghost" title="Copiar" (clicked)="copy()">
 *   <svg>...</svg>
 * </oefa-icon-button>
 */
@Component({
  selector: 'oefa-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [ngClass]="variantClass"
      [disabled]="disabled"
      [title]="title"
      [attr.aria-label]="ariaLabel || title || null"
      (click)="handleClick($event)">
      <ng-content>
        <!-- Contenido por defecto para variant=close y kebab -->
        @if (variant === 'close') { ✕ }
        @if (variant === 'kebab') {
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="12" cy="5" r="1.5"></circle>
            <circle cx="12" cy="19" r="1.5"></circle>
          </svg>
        }
      </ng-content>
    </button>
  `,
  styleUrls: ['./icon-button.component.scss']
})
export class OefaIconButtonComponent {
  @Input() variant: IconButtonVariant = 'default';
  @Input() disabled = false;
  @Input() title = '';
  @Input() ariaLabel = '';
  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() btnClick = this.clicked;

  get variantClass(): string {
    const map: Record<IconButtonVariant, string> = {
      default: 'btn-icon',
      close: 'btn-drawer-close',
      kebab: 'btn-kebab',
      ghost: 'btn-icon btn-ghost',
    };
    return map[this.variant];
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
