import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaAppLauncherComponent } from '../../shared/components/app-launcher/app-launcher.component';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';

export type SidebarSimMode = 'pinned' | 'floating' | 'hidden';

@Component({
  selector: 'app-design-system-navigation',
  standalone: true,
  imports: [
    CommonModule, 
    OefaButtonComponent, 
    OefaAppLauncherComponent, 
    UserMenuComponent
  ],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🧭 Cabecera Institucional y Side Rail (Organismos Shell)</h2>
          <p class="subtitle">Especificación del Top Header corporativo OEFA (64px), Rail lateral de 80px, Submenú flyout de 260px y adaptación por breakpoints oficiales.</p>
        </div>
        <span class="ds-badge">ORGANISMO SHELL</span>
      </div>

      <!-- Tarjeta 1: Top Header Institucional Completo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Cabecera Institucional Superior (Top Header — .oefa-header)</h3>
          <span class="text-muted">Altura estándar 64px, fondo <code>var(--oefa-surface-header)</code>, selector de aplicativos, conmutador de tema y menú de usuario.</span>
        </div>
        <div class="card-body">
          <div class="header-preview-container">
            <header class="demo-oefa-header">
              <!-- Izquierda: Toggle, Logo y Marca SEOSC -->
              <div class="header-left">
                <button 
                  type="button"
                  class="icon-btn menu-toggle" 
                  [class.active]="simMode() === 'pinned'"
                  (click)="toggleSimPinned()"
                  title="Alternar Sidebar Fijo / Flotante"
                  aria-label="Alternar menú lateral">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>

                <div class="oefa-brand-logo">
                  <img src="images/logo_oefa_primary.svg" alt="OEFA" class="oefa-header-logo-img" />
                </div>

                <div class="brand-divider"></div>

                <div class="system-brand">
                  <span class="plusd-title">SEOSC</span>
                  <span class="plusd-sub">Seguimiento de Ordenes <br>de Servicios y Compras</span>
                </div>
              </div>

              <!-- Derecha: Conmutador Tema, Notificaciones, App Launcher y User Menu -->
              <div class="header-right">
                <!-- Theme Toggle -->
                <button 
                  type="button"
                  class="icon-btn header-action theme-toggle-btn"
                  (click)="themeService.toggleTheme()"
                  [title]="themeService.isDarkMode() ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'"
                  [attr.aria-label]="themeService.isDarkMode() ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'">
                  @if (themeService.isDarkMode()) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  }
                </button>

                <!-- Notificaciones -->
                <div class="header-action-wrapper" style="position: relative;">
                  <button type="button" class="icon-btn header-action" title="Notificaciones del sistema" aria-label="3 Notificaciones pendientes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                    </svg>
                    <span class="notification-badge">3</span>
                  </button>
                </div>

                <!-- Selector de Aplicativos Oficial (Waffle 3x3) -->
                <oefa-app-launcher></oefa-app-launcher>

                <!-- Menú de Usuario OEFA -->
                <oefa-user-menu></oefa-user-menu>
              </div>
            </header>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Side Rail (80px) y Submenú Flyout (260px) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Navegación Lateral: Rail (80px) y Submenú Desplegable (260px)</h3>
          <span class="text-muted">Simulador interactivo del patrón Waffle M3 con elevación al pasar el cursor y modos Pinned / Floating / Mobile.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 10px; margin-bottom: 20px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--oefa-text-secondary); text-transform: uppercase;">Modo de Barra Lateral:</span>
            <oefa-button 
              [variant]="simMode() === 'pinned' ? 'primary' : 'secondary'" 
              size="sm" 
              (clicked)="simMode.set('pinned')">
              📌 Pinned (Fijo 340px)
            </oefa-button>
            <oefa-button 
              [variant]="simMode() === 'floating' ? 'primary' : 'secondary'" 
              size="sm" 
              (clicked)="simMode.set('floating')">
              ☁️ Floating (Flotante 80px)
            </oefa-button>
            <oefa-button 
              [variant]="simMode() === 'hidden' ? 'primary' : 'secondary'" 
              size="sm" 
              (clicked)="simMode.set('hidden')">
              📱 Móvil / Oculto
            </oefa-button>
          </div>

          <!-- Shell Simulador -->
          <div class="rail-simulator-box">
            <!-- 1. Rail 80px -->
            @if (simMode() !== 'hidden') {
              <aside class="sim-rail">
                <!-- Botón Acción Rápida '+' -->
                <div class="sim-quick-action">
                  <button type="button" class="sim-btn-add" title="Nueva Orden de Servicio" aria-label="Nueva Orden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>

                <!-- Items del Rail con Patrón Waffle M3 -->
                <nav class="sim-rail-nav">
                  <div class="sim-rail-item-wrapper">
                    <button 
                      type="button" 
                      class="sim-rail-item" 
                      [class.active]="activeModule() === 'dashboard'"
                      (click)="activeModule.set('dashboard')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                      </svg>
                      <span class="sim-item-label">Dashboard</span>
                    </button>
                  </div>

                  <div class="sim-rail-item-wrapper">
                    <button 
                      type="button" 
                      class="sim-rail-item" 
                      [class.active]="activeModule() === 'ordenes'"
                      (click)="activeModule.set('ordenes')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                      </svg>
                      <span class="sim-item-label">Órdenes de Servicio</span>
                    </button>
                  </div>

                  <div class="sim-rail-item-wrapper">
                    <button 
                      type="button" 
                      class="sim-rail-item" 
                      [class.active]="activeModule() === 'compras'"
                      (click)="activeModule.set('compras')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                      </svg>
                      <span class="sim-item-label">Órdenes de Compra</span>
                    </button>
                  </div>
                </nav>
              </aside>

              <!-- 2. Submenú Panel 260px (Visible si pinned o floating) -->
              @if (simMode() === 'pinned' || simMode() === 'floating') {
                <div class="sim-submenu" [class.is-floating]="simMode() === 'floating'">
                  <div class="sim-submenu-header">
                    <h4>{{ activeModule() === 'dashboard' ? 'Panel de Control' : (activeModule() === 'ordenes' ? 'Órdenes de Servicio' : 'Órdenes de Compra') }}</h4>
                    <span class="sim-badge-count">3 vistas</span>
                  </div>

                  <div class="sim-submenu-body">
                    <div class="sim-sub-item active">
                      <span>📄 Bandeja General de Órdenes</span>
                    </div>
                    <div class="sim-sub-item">
                      <span>📊 Matriz de Entregables LPAG</span>
                    </div>
                    <div class="sim-sub-item">
                      <span>⚡ Reporte de Liquidaciones</span>
                    </div>
                  </div>
                </div>
              }
            } @else {
              <div class="sim-mobile-view">
                <p style="margin: 0; color: var(--oefa-text-secondary); font-size: 0.875rem;">
                  📱 En modo móvil (≤ 768px), el Rail se oculta. El usuario accede mediante el botón de hamburguesa en el Top Header, desplegando el Drawer de navegación con patrón Drill-Down.
                </p>
              </div>
            }

            <!-- Canvas de Trabajo Simulado -->
            <div class="sim-canvas">
              <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--oefa-text-secondary);">
                Lienzo de Trabajo (Workspace)
              </span>
              <p style="margin: 6px 0 0; font-size: 0.875rem; color: var(--oefa-text-primary);">
                Módulo Activo: <strong>{{ activeModule() }}</strong> — Modo Sidebar: <strong>{{ simMode() }}</strong>
              </p>
              <div style="margin-top: 12px; height: 120px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px dashed var(--oefa-border-color); display: flex; align-items: center; justify-content: center; font-size: 0.8125rem; color: var(--oefa-text-secondary);">
                Área de contenido dinámico (Data Tables, Bentos, Fichas)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Especificación Técnica y Tokens del Shell -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Especificación Técnica y Tokens del Shell</h3>
          <span class="text-muted">Dimensiones estandarizadas, reglas de colapso por breakpoints oficiales y directrices WCAG 2.2.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--oefa-border-color); text-align: left;">
                    <th style="padding: 10px;">Token CSS / Parámetro</th>
                    <th style="padding: 10px;">Valor Oficial</th>
                    <th style="padding: 10px;">Comportamiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">--oefa-header-height</td>
                    <td style="padding: 10px;"><code>64px</code></td>
                    <td style="padding: 10px;">Altura constante del Top Header en todas las pantallas.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">--oefa-rail-width</td>
                    <td style="padding: 10px;"><code>80px</code></td>
                    <td style="padding: 10px;">Ancho del rail lateral con botones centrados de 72px.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">--oefa-submenu-width</td>
                    <td style="padding: 10px;"><code>260px</code></td>
                    <td style="padding: 10px;">Ancho estándar del panel flyout para hasta 3 niveles de opciones.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">Breakpoints: lg (1024px)</td>
                    <td style="padding: 10px;"><code>Tablet Horizontal</code></td>
                    <td style="padding: 10px;">Oculta subtítulo del sistema (.plusd-sub); preserva acrónimo SEOSC.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">Breakpoints: md (768px)</td>
                    <td style="padding: 10px;"><code>Tablet Vertical</code></td>
                    <td style="padding: 10px;">Oculta nombre de usuario en header; compacta logo a 30px y rail pasa a Drawer.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">Breakpoints: sm (640px)</td>
                    <td style="padding: 10px;"><code>Móvil</code></td>
                    <td style="padding: 10px;">Oculta marca del sistema; mantiene logo OEFA y acceso directo de apps.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-lg) var(--oefa-radius-lg) 0 0; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    /* Top Header Demo */
    .header-preview-container {
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      overflow: visible;
      box-shadow: var(--oefa-shadow-sm);
      position: relative;
      z-index: 50;
    }

    .demo-oefa-header {
      height: 64px;
      background-color: var(--oefa-surface-header, var(--oefa-surface-card));
      border-bottom: 1px solid var(--oefa-border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--oefa-radius-sm, 6px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--oefa-text-secondary);
      cursor: pointer;
      transition: background-color var(--oefa-duration-short, 150ms) ease, color var(--oefa-duration-short, 150ms) ease;
      padding: 0;

      &:hover {
        background-color: var(--oefa-surface-subtle);
        color: var(--oefa-primary-root);
      }

      &.active {
        background-color: var(--oefa-primary-container);
        color: var(--oefa-primary-root);
      }
    }

    .oefa-header-logo-img {
      height: 34px;
      width: auto;
      display: block;
    }

    .brand-divider {
      height: 24px;
      width: 1px;
      background-color: var(--oefa-border-color);
    }

    .system-brand {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .plusd-title {
      font-family: var(--oefa-font-family, inherit);
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--oefa-secondary-ui-safe);
      line-height: 1.1;
    }

    .plusd-sub {
      font-size: 0.625rem;
      color: var(--oefa-text-secondary);
      line-height: 1.1;
    }

    .notification-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background-color: var(--oefa-error-root);
      color: #FFFFFF;
      font-size: 0.625rem;
      font-weight: 700;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Rail Simulator Box */
    .rail-simulator-box {
      display: flex;
      height: 320px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      overflow: hidden;
      background: var(--oefa-surface-card);
      position: relative;
    }

    .sim-rail {
      width: 80px;
      background-color: var(--oefa-surface-rail, var(--oefa-surface-card));
      border-right: 1px solid var(--oefa-border-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      gap: 10px;
      flex-shrink: 0;
      z-index: 10;
    }

    .sim-quick-action {
      margin-bottom: 4px;
    }

    .sim-btn-add {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background-color: var(--oefa-primary-root);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--oefa-shadow-sm);
      transition: transform var(--oefa-duration-short, 150ms) ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .sim-rail-nav {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      align-items: center;
    }

    .sim-rail-item-wrapper {
      width: 72px;
      height: 64px;
      position: relative;
    }

    .sim-rail-item {
      width: 72px;
      min-height: 64px;
      border-radius: var(--oefa-radius-md, 8px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--oefa-text-secondary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 4px;
      cursor: pointer;
      box-sizing: border-box;
      transition: background-color var(--oefa-duration-short, 150ms) ease, color var(--oefa-duration-short, 150ms) ease;

      &:hover {
        background-color: var(--oefa-surface-subtle);
        color: var(--oefa-primary-root);
      }

      &.active {
        background-color: var(--oefa-primary-container);
        color: var(--oefa-primary-root);
        font-weight: 600;
      }
    }

    .sim-item-label {
      font-size: 0.6875rem;
      text-align: center;
      line-height: 1.15;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Submenu 260px */
    .sim-submenu {
      width: 240px;
      background-color: var(--oefa-surface-card);
      border-right: 1px solid var(--oefa-border-color);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 9;

      &.is-floating {
        position: absolute;
        left: 80px;
        top: 0;
        bottom: 0;
        box-shadow: var(--oefa-shadow-flyout);
      }
    }

    .sim-submenu-header {
      padding: 16px;
      border-bottom: 1px solid var(--oefa-border-color);
      background-color: var(--oefa-surface-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 700;
        color: var(--oefa-text-primary);
      }
    }

    .sim-badge-count {
      font-size: 0.6875rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
    }

    .sim-submenu-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sim-sub-item {
      padding: 8px 12px;
      border-radius: var(--oefa-radius-sm, 6px);
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color var(--oefa-duration-short, 150ms) ease, color var(--oefa-duration-short, 150ms) ease;

      &:hover {
        background-color: var(--oefa-surface-muted, #F1F5F9);
        color: var(--oefa-primary-root);
      }

      &.active {
        background-color: var(--oefa-primary-container);
        color: var(--oefa-primary-root);
        border: 1px solid var(--oefa-primary-container-hc);
        font-weight: 600;
      }
    }

    .sim-mobile-view {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: var(--oefa-surface-subtle);
      width: 200px;
      border-right: 1px solid var(--oefa-border-color);
    }

    .sim-canvas {
      flex: 1;
      padding: 24px;
      background-color: var(--oefa-surface-card);
      overflow-y: auto;
    }
  `]
})
export class DesignSystemNavigationComponent {
  themeService = inject(ThemeService);
  simMode = signal<SidebarSimMode>('pinned');
  activeModule = signal<string>('ordenes');

  toggleSimPinned(): void {
    this.simMode.update(mode => mode === 'pinned' ? 'floating' : 'pinned');
  }
}
