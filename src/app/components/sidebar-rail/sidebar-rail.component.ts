import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService, NavItem } from '../../services/navigation.service';

@Component({
  selector: 'app-sidebar-rail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-rail.component.html',
  styleUrl: './sidebar-rail.component.css'
})
export class SidebarRailComponent {
  navService = inject(NavigationService);
  router = inject(Router);

  onItemClick(item: NavItem) {
    this.navService.setActiveItem(item.id);
    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  onItemMouseEnter(item: NavItem) {
    if (item.children && item.children.length > 0) {
      this.navService.setHoveredItem(item.id, 0);
    }
  }

  onItemMouseLeave(item: NavItem) {
    if (item.children && item.children.length > 0) {
      this.navService.setHoveredItem(null, 200);
      if (this.navService.sidebarMode() === 'floating') {
        setTimeout(() => {
          if (!this.navService.hoveredItemId()) {
            this.navService.sidebarMode.set('hidden');
          }
        }, 200);
      }
    }
  }
}
