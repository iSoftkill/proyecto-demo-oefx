import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPageHeaderComponent, BreadcrumbItem } from '../page-header/page-header.component';

export type PageLayoutVariant = 'standard' | 'compact' | 'fluid';

/**
 * Componente Wrapper Institucional de Maquetación de Página.
 * Combina en un solo llamado el padding adaptativo de vista (.oefa-page),
 * la cabecera institucional estándar (<oefa-page-header>) y la proyección de contenido.
 */
@Component({
  selector: 'oefa-page-layout',
  standalone: true,
  imports: [CommonModule, OefaPageHeaderComponent],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class OefaPageLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() badgeText?: string;
  @Input() badgeStatus?: string;
  @Input() breadcrumbs?: BreadcrumbItem[];
  @Input() showBack: boolean = false;
  @Input() backUrl?: string;
  @Input() variant: PageLayoutVariant = 'standard';
  @Input() fit: boolean = false;

  @Output() back = new EventEmitter<void>();

  get containerClass(): string {
    switch (this.variant) {
      case 'compact':
        return 'oefa-page-compact';
      case 'fluid':
        return 'oefa-page-fluid';
      case 'standard':
      default:
        return 'oefa-page';
    }
  }

  onBack(): void {
    this.back.emit();
  }
}
