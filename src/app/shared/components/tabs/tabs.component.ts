import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaInfoTooltipComponent } from '../info-tooltip/info-tooltip.component';
import { OefaDotBadgeComponent, OefaDotBadgeColor } from '../dot-badge/dot-badge.component';

export interface OefaTabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  badgeDot?: boolean;
  badgeDotColor?: OefaDotBadgeColor;
  infoTooltip?: string;
  disabled?: boolean;
}

@Component({
  selector: 'oefa-tabs',
  standalone: true,
  imports: [CommonModule, OefaInfoTooltipComponent, OefaDotBadgeComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
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
