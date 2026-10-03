import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent, OefaIconSize } from '../icon/icon.component';

export type IconButtonVariant = 'default' | 'close' | 'kebab' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Botón de icono del design system OEFA.
 * Para botones que contienen solo un icono (cerrar, kebab, acciones inline).
 *
 * @example
 * <oefa-icon-button variant="close" size="sm" title="Cerrar panel" (clicked)="close()" />
 *
 * @example
 * <oefa-icon-button variant="kebab" size="md" title="Opciones" />
 *
 * @example
 * <oefa-icon-button variant="ghost" title="Copiar" (clicked)="copy()">
 *   <oefa-icon name="check" size="md" />
 * </oefa-icon-button>
 */
@Component({
  selector: 'oefa-icon-button',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class OefaIconButtonComponent {
  @Input() variant: IconButtonVariant = 'default';
  @Input() size: IconButtonSize = 'md';
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

  get sizeClass(): string {
    return `btn-size-${this.size}`;
  }

  get iconSize(): OefaIconSize {
    return this.size;
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
