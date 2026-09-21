import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconButtonComponent } from '../icon-button/icon-button.component';

export type DrawerPosition = 'right' | 'left' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Componente reutilizable de panel lateral (Side Canvas Drawer / Modal Drawer).
 * Soporta cierre con ESC, backdrop click, título personalizable, acciones en cabecera
 * y pie de página proyectable.
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
  template: `
    @if (isOpen) {
      <div 
        class="drawer-overlay" 
        (click)="handleBackdropClick($event)"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-label]="title">
        
        <div 
          class="drawer-panel"
          [ngClass]="[positionClass, sizeClass]"
          (click)="$event.stopPropagation()">
          
          <!-- Header -->
          <div class="drawer-header">
            <div class="drawer-title-group">
              @if (badge) {
                <span class="drawer-badge-num">{{ badge }}</span>
              }
              <div class="title-with-actions">
                <h3 class="drawer-title">{{ title }}</h3>
                <ng-content select="[header-actions]" />
              </div>
              @if (subtitle) {
                <p class="drawer-subtitle">{{ subtitle }}</p>
              }
            </div>
            <oefa-icon-button 
              variant="close" 
              title="Cerrar panel (Esc)" 
              (clicked)="close()" />
          </div>

          <!-- Body -->
          <div class="drawer-body">
            <ng-content />
          </div>

          <!-- Footer (opcional) -->
          <div class="drawer-footer">
            <ng-content select="[footer]" />
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./drawer.component.scss']
})
export class OefaDrawerComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() position: DrawerPosition = 'right';
  @Input() size: DrawerSize = 'md';
  @Input() closeOnBackdrop = true;
  @Input() closeOnEsc = true;

  @Output() closed = new EventEmitter<void>();

  get positionClass(): string {
    return `position-${this.position}`;
  }

  get sizeClass(): string {
    return `size-${this.size}`;
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
