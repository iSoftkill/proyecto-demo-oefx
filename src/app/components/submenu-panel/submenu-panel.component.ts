import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-submenu-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submenu-panel.component.html',
  styleUrl: './submenu-panel.component.css'
})
export class SubmenuPanelComponent {
  navService = inject(NavigationService);
  router = inject(Router);

  activeNavItem = computed(() => {
    const activeId = this.navService.activeItemId();
    return this.navService.navItems.find(i => i.id === activeId);
  });

  showFloatingOverlay = computed(() => {
    const hoveredId = this.navService.hoveredItemId();
    const isPinned = this.navService.sidebarMode() === 'pinned';

    if (hoveredId) {
      const hoveredNav = this.navService.navItems.find(i => i.id === hoveredId);
      if (hoveredNav && hoveredNav.children && hoveredNav.children.length > 0) {
        if (isPinned && hoveredId === this.navService.activeItemId()) {
          return null;
        }
        return hoveredNav;
      }
    }

    if (!isPinned && this.navService.sidebarMode() === 'floating') {
      const activeNav = this.activeNavItem();
      if (activeNav && activeNav.children && activeNav.children.length > 0) {
        return activeNav;
      }
    }

    return null;
  });

  onItemRowClick(item: any, event: MouseEvent) {
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item, event);
    } else {
      this.selectItem(item);
    }
  }

  toggleExpand(item: any, event: MouseEvent) {
    event.stopPropagation();
    item.isExpanded = !(item.isExpanded !== false);
  }

  selectItem(item: any) {
    this.navService.selectTreeItem(item.id);
    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  onPanelMouseEnter() {
    this.navService.cancelHoverTimeout();
  }

  onPanelMouseLeave() {
    this.navService.setHoveredItem(null, 150);
    if (this.navService.sidebarMode() === 'floating') {
      setTimeout(() => {
        if (!this.navService.hoveredItemId()) {
          this.navService.sidebarMode.set('hidden');
        }
      }, 150);
    }
  }
}
