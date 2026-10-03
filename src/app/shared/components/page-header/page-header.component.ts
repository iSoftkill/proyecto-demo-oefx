import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

/**
 * Componente Organismo para Encabezados de Página Institucionales del OEFA.
 * Centraliza el único <h1> de la vista, ruta de navegación breadcrumb accesible,
 * badges semánticos, botón de retorno opcional y barras de acción contextualmente adaptativas.
 */
@Component({
  selector: 'oefa-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule, OefaStatusBadgeComponent],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class OefaPageHeaderComponent {
  private router = inject(Router);

  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() badgeText?: string;
  @Input() badgeStatus?: string;
  @Input() breadcrumbs?: BreadcrumbItem[];
  @Input() showBack: boolean = false;
  @Input() backUrl?: string;

  @Output() back = new EventEmitter<void>();

  onBackClick(): void {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    }
    this.back.emit();
  }
}
