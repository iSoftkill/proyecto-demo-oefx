import { Component, Input, Output, EventEmitter, HostListener, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconButtonComponent } from '../icon-button/icon-button.component';

export type DrawerPosition = 'right' | 'left' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

let drawerUniqueId = 0;

/**
 * Componente reutilizable de panel lateral (Side Canvas Drawer / Modal Drawer).
 * Soporta cierre con ESC, backdrop click, título personalizable, acciones en cabecera
 * y pie de página proyectable con tokens institucionales OEFA.
 *
 * @example
 * <oefa-drawer
 *   [isOpen]="isFilterOpen()"
 *   title="Filtros Avanzados"
 *   size="md"
 *   (closed)="isFilterOpen.set(false)">
 *   
 *   <div class="filter-form">
 *     <!-- contenido del drawer -->
 *   </div>
 *
 *   <div footer style="display: flex; gap: 8px; justify-content: flex-end;">
 *     <oefa-button variant="secondary" (clicked)="isFilterOpen.set(false)">Cerrar</oefa-button>
 *     <oefa-button variant="primary" (clicked)="applyFilters()">Aplicar</oefa-button>
 *   </div>
 * </oefa-drawer>
 */
@Component({
  selector: 'oefa-drawer',
  standalone: true,
  imports: [CommonModule, OefaIconButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class OefaDrawerComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() position: DrawerPosition = 'right';
  @Input() size: DrawerSize = 'md';
  @Input() closeOnBackdrop = true;
  @Input() closeOnEsc = true;

  @Output() closed = new EventEmitter<void>();

  readonly titleId = `oefa-drawer-title-${++drawerUniqueId}`;

  get positionClass(): string {
    return `position-${this.position}`;
  }

  get sizeClass(): string {
    return `size-${this.size}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (this.isOpen && this.closeOnEsc) {
      event.preventDefault();
      this.close();
    }
  }

  handleBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
