import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarRailComponent } from '../sidebar-rail/sidebar-rail.component';
import { SubmenuPanelComponent } from '../submenu-panel/submenu-panel.component';
import { MobileNavDrawerComponent } from '../mobile-nav-drawer/mobile-nav-drawer.component';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarRailComponent, SubmenuPanelComponent, MobileNavDrawerComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  navService = inject(NavigationService);
  private router = inject(Router);

  isLoginRoute(): boolean {
    return this.router.url.includes('/login');
  }

  onWorkspaceClick() {
    this.navService.closeFloating();
  }

  navigateTo(path: string) {
    window.location.hash = path;
  }
}

