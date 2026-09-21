import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OefaTabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'oefa-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oefa-tabs-wrapper">
      <div class="tabs-header" role="tablist">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            role="tab"
            class="tab-btn"
            [class.active]="activeTab === tab.id"
            [attr.aria-selected]="activeTab === tab.id"
            [attr.aria-controls]="'panel-' + tab.id"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)"
          >
            @if (tab.icon) {
              <span class="tab-icon" aria-hidden="true">{{ tab.icon }}</span>
            }
            <span class="tab-label">{{ tab.label }}</span>
            @if (tab.badge !== undefined && tab.badge !== null) {
              <span class="tab-badge">{{ tab.badge }}</span>
            }
          </button>
        }
        <ng-content select="[custom-tabs]"></ng-content>
      </div>

      <div class="tabs-content" role="tabpanel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .oefa-tabs-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .tabs-header {
      display: flex;
      gap: 4px;
      border-bottom: 2px solid var(--oefa-border-color, #e2e8f0);
      padding-bottom: 0;
      overflow-x: auto;
    }

    .tab-btn {
      padding: 10px 16px;
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-secondary, #475569);
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  border-color var(--oefa-duration-short-4, 200ms) var(--oefa-ease-standard, ease),
                  background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      white-space: nowrap;

      &:hover:not(:disabled) {
        color: var(--oefa-primary-root);
        background-color: var(--oefa-surface-subtle, #f8fafc);
      }

      &.active {
        color: var(--oefa-primary-root);
        border-bottom-color: var(--oefa-primary-root);
        background-color: var(--oefa-surface-card, #ffffff);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .tab-btn {
        transition: none !important;
      }
    }

    .tab-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 100px;
      background-color: var(--oefa-primary-container, #e6f3f0);
      color: var(--oefa-primary-on-container, #004034);
    }

    .tabs-content {
      margin-top: 16px;
      width: 100%;
    }
  `]
})
export class OefaTabsComponent {
  @Input() tabs: OefaTabItem[] = [];
  @Input() activeTab: string = '';

  @Output() activeTabChange = new EventEmitter<string>();
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string): void {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.activeTabChange.emit(tabId);
      this.tabChange.emit(tabId);
    }
  }
}
