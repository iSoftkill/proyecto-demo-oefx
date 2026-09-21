import { Component, inject } from '@angular/core';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ThemeService } from './services/theme.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkspaceComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Inicialización global del servicio de tema
  themeService = inject(ThemeService);
}
