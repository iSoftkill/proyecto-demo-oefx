import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaInfoTooltipComponent } from '../info-tooltip/info-tooltip.component';

export interface OefaTabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  badgeDot?: boolean;
  badgeDotColor?: 'danger' | 'warning' | 'primary' | 'success';
  infoTooltip?: string;
  disabled?: boolean;
}

@Component({
  selector: 'oefa-tabs',
  standalone: true,
  imports: [CommonModule, OefaInfoTooltipComponent],
  template: `
    <div class="oefa-tabs-wrapper">
      <div
        class="tabs-header"
        [class.variant-underline]="variant === 'underline'"
        [class.variant-pill]="variant === 'pill'"
        role="tablist"
      >
        @for (tab of tabs; track tab.id; let idx = $index) {
          <button
            type="button"
            role="tab"
            class="tab-btn"
            [id]="'tab-' + tab.id"
            [class.active]="activeTab === tab.id"
            [attr.aria-selected]="activeTab === tab.id"
            [attr.aria-controls]="'panel-' + tab.id"
            [attr.tabindex]="activeTab === tab.id ? 0 : -1"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)"
            (keydown)="handleKeydown($event, idx)"
          >
            @if (tab.icon) {
              <span class="tab-icon" aria-hidden="true">{{ tab.icon }}</span>
            }
            <span class="tab-label">{{ tab.label }}</span>
            
            @if (tab.badgeDot) {
              <span
                class="tab-dot"
                [class]="'tab-dot-' + (tab.badgeDotColor || 'danger')"
                aria-label="Alerta pendiente"
              ></span>
            }

            @if (tab.badge !== undefined && tab.badge !== null) {
              <span class="tab-badge">{{ tab.badge }}</span>
            }

            @if (tab.infoTooltip) {
              <oefa-info-tooltip
                [text]="tab.infoTooltip"
                position="top"
                size="sm"
                ariaLabel="Ayuda de la pestaña"
              ></oefa-info-tooltip>
            }
          </button>
        }
        <ng-content select="[custom-tabs]"></ng-content>
      </div>

      <div class="tabs-content" role="tabpanel" [id]="'panel-' + activeTab" [attr.aria-labelledby]="'tab-' + activeTab">
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
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    /* Variante Underline (Default) */
    .tabs-header.variant-underline {
      border-bottom: 2px solid var(--oefa-border-color, #e2e8f0);
      padding-bottom: 0;

      .tab-btn {
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;

        &:hover:not(:disabled) {
          color: var(--oefa-primary-root);
          background-color: var(--oefa-surface-subtle, #f8fafc);
        }

        &.active {
          color: var(--oefa-primary-root);
          border-bottom-color: var(--oefa-primary-root);
          background-color: transparent;
        }
      }
    }

    /* Variante Pill / Cápsula */
    .tabs-header.variant-pill {
      background-color: var(--oefa-surface-subtle, #f8fafc);
      padding: 4px;
      border-radius: var(--oefa-radius-md, 8px);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      gap: 4px;

      .tab-btn {
        border-radius: var(--oefa-radius-sm, 4px);
        border: none;
        padding: 8px 14px;
        margin-bottom: 0;

        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.04);
          color: var(--oefa-primary-root);
        }

        &.active {
          background-color: var(--oefa-surface-card, #ffffff);
          color: var(--oefa-primary-root);
          box-shadow: var(--oefa-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
        }
      }
    }

    .tab-btn {
      padding: 10px 16px;
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-secondary, #475569);
      background: transparent;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      transition: color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  border-color var(--oefa-duration-short-4, 200ms) var(--oefa-ease-standard, ease),
                  background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      white-space: nowrap;
      outline: none;

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring);
        outline-offset: -2px;
        z-index: 1;
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

    .tab-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      line-height: 1;
    }

    .tab-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 100px;
      background-color: var(--oefa-primary-container, #e6f3f0);
      color: var(--oefa-primary-on-container, #004034);
      line-height: 1.2;
    }

    .tab-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      flex-shrink: 0;
      box-shadow: 0 0 0 2px var(--oefa-surface-card, #ffffff);

      &.tab-dot-danger {
        background-color: var(--oefa-danger-500, #ef4444);
      }
      &.tab-dot-warning {
        background-color: var(--oefa-warning-500, #f59e0b);
      }
      &.tab-dot-primary {
        background-color: var(--oefa-primary-root, #144aa7);
      }
      &.tab-dot-success {
        background-color: var(--oefa-success-500, #10b981);
      }
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
  @Input() variant: 'underline' | 'pill' = 'underline';

  @Output() activeTabChange = new EventEmitter<string>();
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string): void {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.activeTabChange.emit(tabId);
      this.tabChange.emit(tabId);
    }
  }

  handleKeydown(event: KeyboardEvent, currentIndex: number): void {
    const enabledTabs = this.tabs.filter(t => !t.disabled);
    if (!enabledTabs.length) return;

    let targetTabId: string | null = null;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const currentEnabledIdx = enabledTabs.findIndex(t => t.id === this.activeTab);
      const nextIdx = (currentEnabledIdx + 1) % enabledTabs.length;
      targetTabId = enabledTabs[nextIdx].id;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const currentEnabledIdx = enabledTabs.findIndex(t => t.id === this.activeTab);
      const prevIdx = (currentEnabledIdx - 1 + enabledTabs.length) % enabledTabs.length;
      targetTabId = enabledTabs[prevIdx].id;
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetTabId = enabledTabs[0].id;
    } else if (event.key === 'End') {
      event.preventDefault();
      targetTabId = enabledTabs[enabledTabs.length - 1].id;
    }

    if (targetTabId) {
      this.selectTab(targetTabId);
      const el = document.getElementById('tab-' + targetTabId);
      el?.focus();
    }
  }
}
