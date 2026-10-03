import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../button/button.component';
import { OefaIconButtonComponent } from '../icon-button/icon-button.component';

export type ModalVariant = 'default' | 'danger' | 'info' | 'success' | 'warning';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'oefa-modal',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent, OefaIconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class OefaModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() variant: ModalVariant = 'default';
  @Input() size: ModalSize = 'md';
  @Input() confirmText?: string;
  @Input() cancelText?: string;
  @Input() confirmVariant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'excel';
  @Input() showCloseButton: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() loading: boolean = false;
  @Input() closeOnBackdrop: boolean = true;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  get computedConfirmVariant(): 'primary' | 'secondary' | 'danger' | 'ghost' | 'excel' {
    if (this.confirmVariant) return this.confirmVariant;
    if (this.variant === 'danger') return 'danger';
    return 'primary';
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen && this.showCloseButton) {
      this.onClose();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && this.showCloseButton) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
