import { Component, inject, Input } from '@angular/core';
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

  @Input() showQuickAction: boolean | null = null;

  get shouldShowQuickAction(): boolean {
    return this.showQuickAction !== null ? this.showQuickAction : this.navService.showQuickAction();
  }

  onItemClick(item: NavItem) {
    if (item.route) {
      this.navService.clickedFlyoutItemId.set(null);
      this.navService.setActiveItem(item.id);
      this.router.navigateByUrl(item.route);
    } else if (item.children && item.children.length > 0) {
      // Si el ítem no tiene ruta propia, no empuja el layout en modo pinned.
      // Se abre como flyout flotante persistente al clic.
      const current = this.navService.clickedFlyoutItemId();
      this.navService.clickedFlyoutItemId.set(current === item.id ? null : item.id);
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
      if (this.navService.sidebarMode() === 'floating' && !this.navService.clickedFlyoutItemId()) {
        setTimeout(() => {
          if (!this.navService.hoveredItemId() && !this.navService.clickedFlyoutItemId()) {
            this.navService.sidebarMode.set('hidden');
          }
        }, 200);
      }
    }
  }
}
