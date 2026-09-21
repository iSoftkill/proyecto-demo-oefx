import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DropdownAlign = 'left' | 'right';

/**
 * Componente reutilizable de menú desplegable (Dropdown / Flyout Menu).
 * Provee apertura/cierre controlado, detección de click-outside automático,
 * tecla ESC y posicionamiento alineado a la izquierda o derecha.
 *
 * @example
 * <oefa-dropdown [(isOpen)]="showMenu">
 *   <!-- Elemento gatillador con la directiva o selector [trigger] -->
 *   <div trigger>
 *     <oefa-button variant="primary" (clicked)="showMenu = !showMenu">
 *       Opciones ▾
 *     </oefa-button>
 *   </div>
 *
 *   <!-- Items del menú dentro de [menu] -->
 *   <div menu class="oefa-dropdown-items">
 *     <button class="dropdown-item" (click)="onAction1()">Acción 1</button>
 *     <button class="dropdown-item" (click)="onAction2()">Acción 2</button>
 *     <div class="dropdown-divider"></div>
 *     <button class="dropdown-item text-danger" (click)="onDelete()">Eliminar</button>
 *   </div>
 * </oefa-dropdown>
 */
@Component({
  selector: 'oefa-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown-container">
      <div class="dropdown-trigger" (click)="toggle()">
        <ng-content select="[trigger]" />
      </div>

      @if (isOpen) {
        <div 
          class="dropdown-menu"
          [ngClass]="'align-' + align"
          (click)="handleMenuClick($event)">
          <ng-content select="[menu]" />
        </div>
      }
    </div>
  `,
  styleUrls: ['./dropdown.component.scss']
})
export class OefaDropdownComponent {
  @Input() isOpen = false;
  @Input() align: DropdownAlign = 'right';
  @Input() closeOnItemClick = true;

  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }
  }

  handleMenuClick(event: MouseEvent): void {
    if (this.closeOnItemClick) {
      const target = event.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.classList.contains('dropdown-item')) {
        this.close();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.close();
  }
}
