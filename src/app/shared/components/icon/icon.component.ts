import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OefaIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export const OEFA_ICON_SIZES: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

/**
 * Componente Institucional de Iconografía OEFA.
 * Estándar para renderizar iconos SVG vectoriales con sizing semántico y accesibilidad integrada.
 *
 * @example
 * <oefa-icon name="factory" size="lg" />
 * <oefa-icon name="close" size="sm" color="var(--oefa-primary-root)" />
 * <oefa-icon [size]="28"><svg>...</svg></oefa-icon>
 */
@Component({
  selector: 'oefa-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class OefaIconComponent {
  @Input() name: string = '';
  @Input() size: OefaIconSize = 'md';
  @Input() strokeWidth: number = 2;
  @Input() color?: string;
  @Input() ariaLabel?: string;
  @Input() ariaHidden: boolean = true;

  pixelSize = computed(() => {
    if (typeof this.size === 'number') {
      return this.size;
    }
    return OEFA_ICON_SIZES[this.size] || OEFA_ICON_SIZES.md;
  });
}
