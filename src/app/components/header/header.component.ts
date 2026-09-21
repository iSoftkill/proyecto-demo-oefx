import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService, AppTheme } from '../../services/theme.service';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';
import { OefaAppLauncherComponent } from '../../shared/components/app-launcher/app-launcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserMenuComponent, OefaAppLauncherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navService = inject(NavigationService);
  themeService = inject(ThemeService);

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

  onLogout() {
    console.log('Cerrar sesión accionado desde oefa-user-menu');
  }
}
