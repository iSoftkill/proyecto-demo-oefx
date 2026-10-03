import { Component, Input, Output, EventEmitter, ElementRef, HostListener, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DropdownAlign = 'left' | 'right';

/**
 * Componente reutilizable de menú desplegable (Dropdown / Flyout Menu).
 * Provee apertura/cierre controlado, detección de click-outside automático,
 * tecla ESC y posicionamiento alineado a la izquierda o derecha.
 * Soporta [fixedPosition]="true" para evitar cortes en contenedores con overflow (tablas, modales).
 */
@Component({
  selector: 'oefa-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class OefaDropdownComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() align: DropdownAlign = 'right';
  @Input() closeOnItemClick = true;
  @Input() fixedPosition = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  menuStyles = signal<Record<string, string>>({});

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && this.fixedPosition) {
      setTimeout(() => this.updatePosition(), 0);
    }
  }

  updatePosition(): void {
    const triggerEl = this.elementRef.nativeElement.querySelector('.dropdown-trigger');
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 220;

    this.menuStyles.set({
      position: 'fixed',
      top: openUp ? 'auto' : `${rect.bottom + 6}px`,
      bottom: openUp ? `${window.innerHeight - rect.top + 6}px` : 'auto',
      left: this.align === 'left' ? `${rect.left}px` : 'auto',
      right: this.align === 'right' ? `${window.innerWidth - rect.right}px` : 'auto',
      zIndex: '1050'
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.fixedPosition) {
      setTimeout(() => this.updatePosition(), 0);
    }
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

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange(): void {
    if (this.isOpen && this.fixedPosition) {
      this.updatePosition();
    }
  }
}
