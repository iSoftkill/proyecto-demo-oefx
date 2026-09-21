import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SelectionCardType = 'radio' | 'checkbox';
export type SelectionCardBadgeVariant = 'primary' | 'success' | 'tertiary' | 'neutral';

@Component({
  selector: 'oefa-selection-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="selection-card-inner"
      [class.selected]="selected"
      [class.disabled]="disabled"
      [attr.role]="type === 'checkbox' ? 'checkbox' : 'radio'"
      [attr.aria-checked]="selected"
      [attr.aria-disabled]="disabled"
      [attr.aria-label]="ariaLabel || title"
      [attr.tabindex]="disabled ? -1 : 0"
      (click)="toggleSelection()"
      (keydown)="onKeyDown($event)"
    >
      <!-- Indicador visual (Radio / Checkbox) -->
      <div class="indicator-box" [class.type-radio]="type === 'radio'" [class.type-checkbox]="type === 'checkbox'">
        @if (type === 'radio') {
          <div class="radio-dot" [class.visible]="selected"></div>
        } @else {
          <svg
            *ngIf="selected"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="check-icon"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        }
      </div>

      <!-- Icono opcional proyectado -->
      <div class="card-icon-slot">
        <ng-content select="[card-icon]"></ng-content>
      </div>

      <!-- Textos y contenido principal -->
      <div class="card-content">
        <div class="card-header-row">
          <span class="card-title">{{ title }}</span>
          @if (priceBadge) {
            <span class="card-badge" [ngClass]="'badge-' + badgeVariant">
              {{ priceBadge }}
            </span>
          }
        </div>

        @if (description) {
          <p class="card-desc">{{ description }}</p>
        }

        <!-- Slot para contenido adicional si se requiere -->
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .selection-card-inner {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 16px;
      min-height: 52px;
      background-color: var(--oefa-surface-card, #ffffff);
      border: 1.5px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-md, 8px);
      cursor: pointer;
      user-select: none;
      transition: border-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  box-shadow var(--oefa-duration-medium, 300ms) var(--oefa-ease-emphasized, ease),
                  transform var(--oefa-duration-medium, 300ms) var(--oefa-ease-emphasized, ease);
      box-sizing: border-box;

      &:active:not(.disabled) {
        transform: scale(0.99);
        transition-duration: var(--oefa-duration-short);
      }

      &:hover:not(.disabled) {
        border-color: var(--oefa-primary-root, #144aa7);
        background-color: var(--oefa-surface-subtle, #f8fafc);
        transform: translateY(-2px);
        box-shadow: var(--oefa-shadow-md);

        .card-icon-slot {
          transform: rotate(8deg) scale(1.1);
        }
      }

      &.selected {
        border-color: var(--oefa-primary-root, #144aa7);
        background-color: var(--oefa-primary-container, #eef4ff);

        .radio-dot {
          background-color: var(--oefa-primary-root, #144aa7);
        }

        .indicator-box {
          border-color: var(--oefa-primary-root, #144aa7);
          &.type-checkbox {
            background-color: var(--oefa-primary-root, #144aa7);
            color: #ffffff;
          }
        }

        .card-title {
          color: var(--oefa-primary-root, #144aa7);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring, #144aa7);
        outline-offset: 2px;
      }

      &.disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    }

    /* Indicador (Radio o Checkbox) */
    .indicator-box {
      width: 20px;
      height: 20px;
      border: 2px solid var(--oefa-border-color, #cbd5e1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
      box-sizing: border-box;
      transition: background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  border-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &.type-radio {
        border-radius: 50%;
      }

      &.type-checkbox {
        border-radius: 4px;
      }
    }

    .radio-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: transparent;
      transform: scale(0);
      transition: transform 0.15s ease;

      &.visible {
        transform: scale(1);
      }
    }

    .check-icon {
      display: block;
    }

    .card-icon-slot {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-top: 2px;
      transition: transform var(--oefa-duration-medium, 300ms) var(--oefa-ease-emphasized, ease);
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .card-title {
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--oefa-text-primary, #0f172a);
      line-height: 1.3;
    }

    .card-desc {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary, #475569);
      line-height: 1.4;
    }

    /* Badges de Tarifas / Estados */
    .card-badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 8px;
      border-radius: var(--oefa-radius-full, 9999px);
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;

      &.badge-primary {
        background-color: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144aa7);
        border: 1px solid var(--oefa-primary-container-hc, #a4c1f4);
      }

      &.badge-success {
        background-color: var(--oefa-success-container, #f7ffee);
        color: var(--oefa-success-ui-safe, #578221);
        border: 1px solid var(--oefa-success-container-hc, #d0eaae);
      }

      &.badge-tertiary {
        background-color: var(--oefa-tertiary-container, #fff0cc);
        color: var(--oefa-tertiary-ui-safe, #996d00);
        border: 1px solid var(--oefa-tertiary-container-hc, #ffe199);
      }

      &.badge-neutral {
        background-color: var(--oefa-surface-subtle, #f1f5f9);
        color: var(--oefa-text-secondary, #475569);
        border: 1px solid var(--oefa-border-color, #e2e8f0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .selection-card-inner, .indicator-box {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class OefaSelectionCardComponent {
  @Input() name = '';
  @Input() value: any = null;
  @Input() selected = false;
  @Input() title = '';
  @Input() description = '';
  @Input() priceBadge = '';
  @Input() badgeVariant: SelectionCardBadgeVariant = 'primary';
  @Input() type: SelectionCardType = 'radio';
  @Input() disabled = false;
  @Input() ariaLabel = '';

  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<any>();

  toggleSelection(): void {
    if (this.disabled) return;

    if (this.type === 'radio') {
      if (!this.selected) {
        this.selected = true;
        this.selectedChange.emit(true);
        this.selectionChange.emit(this.value);
      }
    } else {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
      this.selectionChange.emit({ value: this.value, selected: this.selected });
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleSelection();
    }
  }
}
