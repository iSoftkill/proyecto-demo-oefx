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
  template: `
    @if (isOpen) {
      <div 
        class="oefa-modal-backdrop" 
        (click)="onBackdropClick($event)"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="title ? 'oefa-modal-title' : null"
      >
        <div 
          class="oefa-modal-card" 
          [ngClass]="['size-' + size, variant ? 'variant-' + variant : '']"
          (click)="$event.stopPropagation()"
        >
          <!-- Encabezado -->
          <div class="modal-header">
            <div class="modal-title-container">
              @if (variant !== 'default') {
                <div class="modal-variant-icon" [ngClass]="'icon-' + variant" aria-hidden="true">
                  @switch (variant) {
                    @case ('success') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    }
                    @case ('warning') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    }
                    @case ('danger') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    }
                    @default {
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    }
                  }
                </div>
              }
              <div class="modal-title-group">
                @if (title) {
                  <h3 id="oefa-modal-title" class="modal-title">{{ title }}</h3>
                }
                @if (subtitle) {
                  <p class="modal-subtitle">{{ subtitle }}</p>
                }
              </div>
            </div>
            @if (showCloseButton) {
              <oefa-icon-button 
                variant="close" 
                ariaLabel="Cerrar modal"
                (btnClick)="onClose()"
              ></oefa-icon-button>
            }
          </div>

          <!-- Cuerpo -->
          <div class="modal-body">
            <ng-content></ng-content>
          </div>

          <!-- Pie / Acciones -->
          @if (showFooter) {
            <div class="modal-footer">
              <ng-content select="[footer]">
                @if (cancelText) {
                  <oefa-button 
                    variant="secondary" 
                    (btnClick)="onCancel()"
                  >
                    {{ cancelText }}
                  </oefa-button>
                }
                @if (confirmText) {
                  <oefa-button 
                    [variant]="computedConfirmVariant" 
                    [loading]="loading"
                    (btnClick)="onConfirm()"
                  >
                    {{ confirmText }}
                  </oefa-button>
                }
              </ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    .oefa-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--oefa-surface-overlay, rgba(15, 23, 42, 0.5));
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      box-sizing: border-box;
      animation: modalBackdropFadeIn var(--oefa-duration-short-4, 200ms) var(--oefa-ease-standard, ease);
    }

    .oefa-modal-card {
      background-color: var(--oefa-surface-card, #ffffff);
      border-radius: var(--oefa-radius-lg, 12px);
      box-shadow: var(--oefa-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
      animation: modalEnter var(--oefa-duration-long-1, 350ms) var(--oefa-ease-emphasized-decel, cubic-bezier(0.05, 0.7, 0.1, 1));
    }

    .size-sm { max-width: 420px; }
    .size-md { max-width: 560px; }
    .size-lg { max-width: 760px; }
    .size-xl { max-width: 980px; }
    .size-full {
      max-width: calc(100vw - 32px);
      height: calc(100vh - 32px);
      max-height: calc(100vh - 32px);
    }

    .variant-danger {
      border-top: 4px solid var(--oefa-error-root, #E51A2F);
    }

    .variant-info {
      border-top: 4px solid var(--oefa-primary-root, #144AA7);
    }

    .variant-success {
      border-top: 4px solid var(--oefa-success-ui-safe, #578221);
    }

    .variant-warning {
      border-top: 4px solid var(--oefa-tertiary-ui-safe, #996D00);
    }

    .modal-header {
      padding: 20px 24px 16px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid var(--oefa-border-color, #e2e8f0);
    }

    .modal-title-container {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      flex: 1;
    }

    .modal-variant-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--oefa-radius-md, 8px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .icon-info {
      background-color: var(--oefa-primary-container, #EEF4FF);
      color: var(--oefa-primary-root, #144AA7);
    }

    .icon-success {
      background-color: var(--oefa-success-container, #F7FFEE);
      color: var(--oefa-success-ui-safe, #578221);
    }

    .icon-warning {
      background-color: var(--oefa-tertiary-container, #FFF0CC);
      color: var(--oefa-tertiary-on-container, #664800);
    }

    .icon-danger {
      background-color: var(--oefa-error-container, #FFEFF1);
      color: var(--oefa-error-on-container, #AA1223);
    }

    .modal-title-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .modal-title {
      margin: 0;
      font-family: var(--oefa-font-display, inherit);
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
    }

    .modal-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--oefa-text-secondary, #475569);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      font-size: 0.875rem;
      color: var(--oefa-text-primary, #0f172a);
      line-height: 1.5;
    }

    .modal-footer {
      padding: 16px 24px;
      background-color: var(--oefa-surface-subtle, #f8fafc);
      border-top: 1px solid var(--oefa-border-color, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    @keyframes modalBackdropFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalEnter {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .oefa-modal-backdrop, .oefa-modal-card {
        animation: none !important;
      }
    }
  `]
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

