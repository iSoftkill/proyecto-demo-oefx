import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../button/button.component';

@Component({
  selector: 'oefa-empty-state',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent],
  template: `
    <div class="oefa-empty-state" [class.compact]="compact" role="region" [attr.aria-label]="title || 'Estado vacío'">
      <div class="empty-icon-wrapper" aria-hidden="true">
        <ng-content select="[icon]">
          @switch (icon) {
            @case ('folder') {
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            }
            @case ('inbox') {
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
            }
            @case ('alert') {
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            }
            @default {
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            }
          }
        </ng-content>
      </div>

      <div class="empty-content">
        @if (title) {
          <h4 class="empty-title">{{ title }}</h4>
        }
        @if (description) {
          <p class="empty-desc">{{ description }}</p>
        }
        <ng-content></ng-content>
      </div>

      @if (actionText) {
        <div class="empty-actions">
          <oefa-button variant="primary" size="sm" (btnClick)="actionClick.emit()">
            {{ actionText }}
          </oefa-button>
        </div>
      }
      <ng-content select="[actions]"></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .oefa-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px 24px;
      border-radius: var(--oefa-radius-lg, 12px);
      background-color: transparent;
      box-sizing: border-box;
      gap: 16px;
    }

    .oefa-empty-state.compact {
      padding: 24px 16px;
      gap: 12px;
    }

    .empty-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-color: var(--oefa-surface-subtle);
      color: var(--oefa-primary-root);
      border: 1px solid var(--oefa-border-color);
      transition: all var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
    }

    .compact .empty-icon-wrapper {
      width: 52px;
      height: 52px;
    }

    .compact .empty-icon-wrapper svg {
      width: 28px;
      height: 28px;
    }

    .empty-content {
      max-width: 440px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .empty-title {
      margin: 0;
      font-family: var(--oefa-font-display, inherit);
      font-size: 1rem;
      font-weight: 700;
      color: var(--oefa-text-primary);
    }

    .empty-desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--oefa-text-secondary);
      line-height: 1.5;
    }

    .empty-actions {
      margin-top: 4px;
    }
  `]
})
export class OefaEmptyStateComponent {
  @Input() icon: 'search' | 'inbox' | 'folder' | 'alert' = 'search';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() actionText?: string;
  @Input() compact: boolean = false;

  @Output() actionClick = new EventEmitter<void>();
}
