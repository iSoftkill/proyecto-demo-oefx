import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

export type OefaStatSize = 'sm' | 'md' | 'lg';
export type OefaStatLayout = 'inline' | 'stacked';

/**
 * Componente Institucional de Métrica / Cifra Clave OEFA (<oefa-stat>).
 * Centraliza la presentación de indicadores numéricos y KPIs en 3 tamaños jerárquicos:
 * - sm: Micro-métrica inline para tablas, modales y drawers.
 * - md: Métrica estándar inline para dashboards y tarjetas de sección.
 * - lg: Métrica de alto impacto visual stacked para portales y hero banners.
 */
@Component({
  selector: 'oefa-stat',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class OefaStatComponent {
  @Input() number: string | number = '';
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() size: OefaStatSize = 'md';
  @Input() layout?: OefaStatLayout;
  @Input() showDivider: boolean = false;
  @Input() valueColor?: string;
  @Input() iconColor?: string;
  @Input() iconBg?: string;

  resolvedLayout = computed(() => {
    if (this.layout) return this.layout;
    return this.size === 'lg' ? 'stacked' : 'inline';
  });

  iconSize = computed(() => {
    switch (this.size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      case 'md':
      default:
        return 18;
    }
  });
}
