import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

@Component({
  selector: 'oefa-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!isDismissed) {
      <div
        class="oefa-alert"
        [ngClass]="'alert-' + type"
        [class.bordered]="bordered"
        [attr.role]="computedRole"
        [attr.aria-live]="computedAriaLive"
      >
        <!-- Icono según tipo -->
        @if (showIcon) {
          <div class="alert-icon" aria-hidden="true">
            @switch (type) {
              @case ('success') {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              }
              @case ('warning') {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              }
              @case ('error') {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              }
              @case ('neutral') {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              }
              @default {
                <!-- info -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              }
            }
          </div>
        }

        <!-- Cuerpo de contenido -->
        <div class="alert-body">
          @if (title) {
            <span class="alert-title">{{ title }}</span>
          }
          @if (message) {
            <p class="alert-message">{{ message }}</p>
          }
          <ng-content></ng-content>
        </div>

        <!-- Botón descartable opcional -->
        @if (dismissible) {
          <button
            type="button"
            class="alert-close-btn"
            aria-label="Cerrar alerta"
            (click)="dismiss()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        }
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class OefaAlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;
  @Input() showIcon = true;
  @Input() bordered = true;

  @Output() dismissed = new EventEmitter<void>();

  isDismissed = false;

  get computedRole(): string {
    if (this.type === 'error' || this.type === 'warning') return 'alert';
    if (this.type === 'info' || this.type === 'success') return 'status';
    return 'region';
  }

  get computedAriaLive(): string {
    if (this.type === 'error' || this.type === 'warning') return 'assertive';
    return 'polite';
  }

  dismiss(): void {
    this.isDismissed = true;
    this.dismissed.emit();
  }
}
