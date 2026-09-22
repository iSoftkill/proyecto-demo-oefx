import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oefa-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="oefa-spinner-container" 
      [class.fullscreen]="fullscreen" 
      role="status" 
      [attr.aria-label]="message || 'Cargando contenido'"
    >
      <div 
        class="spinner-circle" 
        [ngClass]="'spinner-' + size"
      ></div>
      @if (message) {
        <span class="spinner-message">{{ message }}</span>
      }
      <span class="sr-only">Cargando...</span>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .oefa-spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      box-sizing: border-box;
    }

    .oefa-spinner-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--oefa-surface-backdrop, rgba(255, 255, 255, 0.85));
      backdrop-filter: blur(3px);
      z-index: 9999;
    }

    .spinner-circle {
      border-radius: 50%;
      border-style: solid;
      border-color: var(--oefa-border-color, #e2e8f0);
      border-top-color: var(--oefa-primary-root, #144AA7);
      animation: oefa-spin 0.8s linear infinite;
    }

    .spinner-sm {
      width: 20px;
      height: 20px;
      border-width: 2.5px;
    }

    .spinner-md {
      width: 36px;
      height: 36px;
      border-width: 3.5px;
    }

    .spinner-lg {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    .spinner-message {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--oefa-text-secondary, #475569);
      font-family: var(--oefa-font-body, inherit);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    @keyframes oefa-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class OefaSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() message: string = '';
  @Input() fullscreen: boolean = false;
}
