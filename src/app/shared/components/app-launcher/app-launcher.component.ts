import { Component, signal, inject, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface OefaAppItem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'operativo' | 'gestion' | 'apoyo';
  iconBg: string;
  iconGradient: string;
  iconColor: string;
  iconType: 'checklist' | 'document' | 'folder' | 'shield' | 'environment' | 'inbox' | 'workflow' | 'analytics';
  hasAccess: boolean;
  isCurrentApp?: boolean;
  url?: string;
  badge?: string;
}

@Component({
  selector: 'oefa-app-launcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-launcher-wrapper">
      <!-- Botón Disparador (Waffle 3x3) -->
      <button
        type="button"
        class="icon-btn header-action apps-btn"
        [class.active]="isOpen()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="dialog"
        (click)="toggleMenu()"
        title="Selector de Aplicaciones Institucionales OEFA"
        aria-label="Abrir selector de aplicaciones institucionales"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="waffle-icon">
          <rect width="5.5" height="5.5" x="3" y="3" rx="1.5" />
          <rect width="5.5" height="5.5" x="15.5" y="3" rx="1.5" />
          <rect width="5.5" height="5.5" x="15.5" y="15.5" rx="1.5" />
          <rect width="5.5" height="5.5" x="3" y="15.5" rx="1.5" />
        </svg>
      </button>

      <!-- Panel Desplegable (Flyout alineado con user-menu) -->
      @if (isOpen()) {
        <div class="launcher-popover" role="dialog" aria-modal="true" aria-label="Aplicaciones Institucionales OEFA">
          <!-- Cabecera con Buscador y Filtros -->
          <div class="launcher-header">
            <div class="launcher-title-row">
              <div class="title-group">
                <h3 class="launcher-title">{{ title }}</h3>
              </div>

              <div class="header-right-actions">
                <!-- Selector de Vista: 3x3 1:1 vs Lista 2-Col -->
                <div class="view-mode-toggle" role="group" aria-label="Modo de vista">
                  <button
                    type="button"
                    class="view-toggle-btn"
                    [class.active]="viewMode === 'grid3x3'"
                    (click)="viewMode = 'grid3x3'"
                    title="Vista Cuadrícula 1:1 (3 columnas)"
                    aria-label="Vista Cuadrícula 3x3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="5" height="5" x="3" y="3" rx="1" />
                      <rect width="5" height="5" x="10" y="3" rx="1" />
                      <rect width="5" height="5" x="17" y="3" rx="1" />
                      <rect width="5" height="5" x="3" y="10" rx="1" />
                      <rect width="5" height="5" x="10" y="10" rx="1" />
                      <rect width="5" height="5" x="17" y="10" rx="1" />
                      <rect width="5" height="5" x="3" y="17" rx="1" />
                      <rect width="5" height="5" x="10" y="17" rx="1" />
                      <rect width="5" height="5" x="17" y="17" rx="1" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="view-toggle-btn"
                    [class.active]="viewMode === 'list2col'"
                    (click)="viewMode = 'list2col'"
                    title="Vista Detallada (2 columnas)"
                    aria-label="Vista Detallada 2 columnas"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <span class="apps-count-pill">{{ accessibleCount }}/{{ effectiveApps.length }}</span>
              </div>
            </div>

            <!-- Buscador Rápido con estilo Glass -->
            <div class="launcher-search-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                class="search-input"
                [(ngModel)]="searchQuery"
                placeholder="Buscar aplicativo, sigla o trámite..."
                aria-label="Filtrar aplicativos"
              />
              @if (searchQuery) {
                <button type="button" class="clear-btn" (click)="searchQuery = ''" aria-label="Limpiar búsqueda">✕</button>
              }
            </div>

            <!-- Chips de Categoría Modernos -->
            <div class="category-chips">
              <button
                type="button"
                class="chip-btn"
                [class.active]="selectedCategory === 'all'"
                (click)="selectedCategory = 'all'"
              >
                Todas
              </button>
              <button
                type="button"
                class="chip-btn"
                [class.active]="selectedCategory === 'operativo'"
                (click)="selectedCategory = 'operativo'"
              >
                Supervisión y Fiscalización
              </button>
              <button
                type="button"
                class="chip-btn"
                [class.active]="selectedCategory === 'gestion'"
                (click)="selectedCategory = 'gestion'"
              >
                Gestión y Trámites
              </button>
            </div>
          </div>

          <!-- Cuadrícula / Lista de Aplicativos -->
          <div class="launcher-body">
            @if (filteredApps.length === 0) {
              <div class="empty-results">
                <div class="empty-icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <p>No se encontraron aplicativos para "<strong>{{ searchQuery }}</strong>"</p>
              </div>
            } @else if (viewMode === 'grid3x3') {
              <!-- VISTA 1:1 CUADRICULA 3 COLUMNAS (ESTILO MODERNO 1:1 SQUIRCLE) -->
              <div class="apps-grid-3x3">
                @for (app of filteredApps; track app.id) {
                  <a
                    [href]="app.url || 'javascript:void(0)'"
                    class="app-card-1x1"
                    [class.disabled]="!app.hasAccess"
                    [class.current-app]="app.isCurrentApp"
                    [attr.aria-disabled]="!app.hasAccess"
                    [title]="app.hasAccess ? app.name + ': ' + app.description : app.name + ' (Sin permiso asignado)'"
                    (click)="onAppClick(app, $event)"
                  >
                    <!-- Badge Actual Flotante con Pulso -->
                    @if (app.isCurrentApp) {
                      <div class="grid-current-indicator" title="Aplicación en uso">
                        <span class="status-dot"></span>
                        <span>ACTUAL</span>
                      </div>
                    }

                    <!-- Icono Vectorial con Squircle y Gradiente -->
                    <div class="grid-icon-squircle" [style.background]="app.iconGradient" [style.color]="app.iconColor">
                      <!-- Icono SVG Dinámico -->
                      <ng-container *ngTemplateOutlet="appIconSvg; context: { $implicit: app }"></ng-container>

                      <!-- Candado de bloqueo moderno -->
                      @if (!app.hasAccess) {
                        <div class="lock-pill" title="Requiere solicitar acceso">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      }
                    </div>

                    <!-- Nombre y Sigla -->
                    <div class="grid-meta">
                      <span class="grid-app-name">{{ app.name }}</span>
                      <span class="grid-app-desc">{{ app.hasAccess ? app.description : 'Sin acceso' }}</span>
                    </div>
                  </a>
                }
              </div>
            } @else {
              <!-- VISTA 2 COLUMNAS DETALLADA -->
              <div class="apps-grid-2col">
                @for (app of filteredApps; track app.id) {
                  <a
                    [href]="app.url || 'javascript:void(0)'"
                    class="app-card-detailed"
                    [class.disabled]="!app.hasAccess"
                    [class.current-app]="app.isCurrentApp"
                    [attr.aria-disabled]="!app.hasAccess"
                    [title]="app.hasAccess ? app.name : app.name + ' (Requiere solicitar acceso)'"
                    (click)="onAppClick(app, $event)"
                  >
                    <!-- Icono con Gradiente -->
                    <div class="detailed-icon-wrapper" [style.background]="app.iconGradient" [style.color]="app.iconColor">
                      <ng-container *ngTemplateOutlet="appIconSvg; context: { $implicit: app }"></ng-container>
                      @if (!app.hasAccess) {
                        <div class="lock-pill" title="Sin acceso">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      }
                    </div>

                    <!-- Metadatos de la App -->
                    <div class="app-meta">
                      <div class="app-name-row">
                        <span class="app-name">{{ app.name }}</span>
                        @if (app.isCurrentApp) {
                          <span class="current-badge-chip">ACTUAL</span>
                        }
                      </div>
                      <span class="app-desc">{{ app.description }}</span>
                    </div>
                  </a>
                }
              </div>
            }
          </div>

          <!-- Pie del Popover (Autoservicio Mesa OTI) -->
          <div class="launcher-footer">
            <div class="footer-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="help-circle-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>¿Necesitas otro aplicativo?</span>
            </div>
            <a href="javascript:void(0)" (click)="onRequestAccess($event)" class="request-access-link" title="Solicitar asignación de permisos a Mesa de Ayuda OTI">
              Mesa de Ayuda OTI
              <span class="arrow-glyph">→</span>
            </a>
          </div>
        </div>
      }
    </div>

    <!-- Template Reutilizable de Iconos SVG -->
    <ng-template #appIconSvg let-app>
      <span class="icon-svg-box">
        @switch (app.iconType) {
          @case ('checklist') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          }
          @case ('document') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          }
          @case ('folder') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          }
          @case ('shield') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          }
          @case ('environment') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          }
          @case ('inbox') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
          }
          @case ('workflow') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          }
          @case ('analytics') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          }
          @default {
            <span class="icon-initials">{{ app.shortName }}</span>
          }
        }
      </span>
    </ng-template>
  `,
  styles: [`
    :host {
      display: inline-block;
      position: relative;
    }

    .app-launcher-wrapper {
      position: relative;
    }

    .apps-btn {
      background: transparent;
      border: none;
      color: var(--oefa-text-secondary, #475569);
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover, &.active {
        background-color: var(--oefa-surface-subtle, #f1f5f9);
        color: var(--oefa-primary-root, #144aa7);
        transform: scale(1.04);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring, #144aa7);
        outline-offset: 2px;
      }

      .waffle-icon {
        transition: transform 0.25s ease;
      }

      &.active .waffle-icon {
        transform: rotate(90deg);
      }
    }

    /* Popover Flotante homologado con user-dropdown-menu */
    .launcher-popover {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 420px;
      max-width: calc(100vw - 24px);
      background-color: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg);
      box-shadow: var(--oefa-shadow-flyout);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: dropdownFadeIn 0.15s ease-out forwards;
    }

    @keyframes dropdownFadeIn {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Cabecera */
    .launcher-header {
      padding: 12px 16px 10px 16px;
      border-bottom: 1px solid var(--oefa-border-color);
      background: var(--oefa-surface-submenu);
    }

    .launcher-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.625rem;
      font-weight: 700;
      color: var(--oefa-primary-root, #144aa7);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #059669;
      box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2);
    }

    .launcher-title {
      margin: 0;
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.938rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
    }

    .header-right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .view-mode-toggle {
      display: flex;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-sm);
      padding: 2px;
      gap: 2px;
    }

    .view-toggle-btn {
      background: transparent;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: var(--oefa-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--oefa-text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        color: var(--oefa-text-primary);
      }

      &.active {
        background: var(--oefa-surface-submenu);
        color: var(--oefa-primary-root);
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      }
    }

    .apps-count-pill {
      font-size: 0.688rem;
      font-weight: 700;
      padding: 2px 7px;
      background: var(--oefa-primary-container, #eef4ff);
      color: var(--oefa-primary-root, #144aa7);
      border-radius: var(--oefa-radius-full, 9999px);
      border: 1px solid var(--oefa-border-color);
    }

    /* Buscador */
    .launcher-search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 6px 10px;
      margin-bottom: 8px;
      transition: all 0.15s ease;

      &:focus-within {
        border-color: var(--oefa-primary-root);
        box-shadow: 0 0 0 2px var(--oefa-primary-container);
      }
    }

    .search-icon {
      color: var(--oefa-text-muted, #94a3b8);
      flex-shrink: 0;
    }

    .search-input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.813rem;
      color: var(--oefa-text-primary, #0f172a);
      width: 100%;
      font-family: inherit;

      &::placeholder {
        color: var(--oefa-text-muted, #94a3b8);
      }
    }

    .clear-btn {
      background: var(--oefa-surface-submenu);
      border: none;
      color: var(--oefa-text-secondary, #475569);
      cursor: pointer;
      font-size: 0.688rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;

      &:hover {
        background: var(--oefa-border-color);
      }
    }

    /* Chips de Categorías */
    .category-chips {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 2px;
    }

    .chip-btn {
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-full, 9999px);
      font-size: 0.688rem;
      font-weight: 500;
      color: var(--oefa-text-secondary);
      padding: 3px 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;

      &:hover {
        background: var(--oefa-surface-submenu);
        color: var(--oefa-primary-root);
      }

      &.active {
        background: var(--oefa-primary-root);
        color: var(--oefa-primary-on, #ffffff);
        border-color: var(--oefa-primary-root);
        font-weight: 600;
      }
    }

    /* Cuerpo Scrollable */
    .launcher-body {
      padding: 12px;
      max-height: 380px;
      overflow-y: auto;
      background: var(--oefa-surface-card);
    }

    .empty-results {
      text-align: center;
      padding: 32px 16px;
      color: var(--oefa-text-secondary, #475569);
      font-size: 0.813rem;

      .empty-icon-circle {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--oefa-surface-submenu);
        border: 1px solid var(--oefa-border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px auto;
        color: var(--oefa-text-muted, #94a3b8);
      }
    }

    /* ========================================================= */
    /* VISTA 1:1 CUADRÍCULA 3 COLUMNAS */
    /* ========================================================= */
    .apps-grid-3x3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .app-card-1x1 {
      aspect-ratio: 1 / 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 6px;
      background: var(--oefa-surface-submenu);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      text-decoration: none;
      position: relative;
      transition: border-color var(--oefa-duration-short) var(--oefa-ease-standard),
                  background var(--oefa-duration-short) var(--oefa-ease-standard),
                  transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      cursor: pointer;
      overflow: hidden;

      &:hover:not(.disabled) {
        border-color: var(--oefa-primary-root);
        background: var(--oefa-surface-card);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(20, 74, 167, 0.12);

        .grid-icon-squircle {
          transform: rotate(8deg) scale(1.12);
        }

        .grid-app-name {
          color: var(--oefa-primary-root);
        }
      }

      &.current-app {
        border-color: var(--oefa-primary-root);
        background: var(--oefa-primary-container);
        box-shadow: 0 0 0 1px var(--oefa-primary-root);
      }

      &.disabled {
        opacity: 0.55;
        cursor: not-allowed;
        filter: grayscale(0.25);
      }
    }

    .grid-current-indicator {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.5rem;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: var(--oefa-radius-full, 9999px);
      background: var(--oefa-primary-root);
      color: #ffffff;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 3px;

      .status-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #34d399;
      }
    }

    .grid-icon-squircle {
      width: 42px;
      height: 42px;
      border-radius: var(--oefa-radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 6px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
    }

    .lock-pill {
      position: absolute;
      bottom: -3px;
      right: -3px;
      width: 16px;
      height: 16px;
      background: var(--oefa-text-secondary, #475569);
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--oefa-surface-card, #ffffff);
    }

    .grid-meta {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }

    .grid-app-name {
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      line-height: 1.2;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: color 0.15s ease;
    }

    .grid-app-desc {
      font-size: 0.563rem;
      color: var(--oefa-text-muted, #94a3b8);
      margin-top: 1px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    /* ========================================================= */
    /* VISTA 2 COLUMNAS DETALLADA */
    /* ========================================================= */
    .apps-grid-2col {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      @media (max-width: 440px) {
        grid-template-columns: 1fr;
      }
    }

    .app-card-detailed {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      background: var(--oefa-surface-submenu);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      text-decoration: none;
      transition: border-color var(--oefa-duration-short) var(--oefa-ease-standard),
                  background var(--oefa-duration-short) var(--oefa-ease-standard),
                  transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      position: relative;

      &:hover:not(.disabled) {
        border-color: var(--oefa-primary-root);
        background: var(--oefa-surface-card);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(20, 74, 167, 0.12);

        .detailed-icon-wrapper {
          transform: rotate(8deg) scale(1.1);
        }
      }

      &.current-app {
        border-color: var(--oefa-primary-root);
        background: var(--oefa-primary-container);
        box-shadow: 0 0 0 1px var(--oefa-primary-root);
      }

      &.disabled {
        opacity: 0.55;
        cursor: not-allowed;
        filter: grayscale(0.25);
      }
    }

    .detailed-icon-wrapper {
      width: 38px;
      height: 38px;
      border-radius: var(--oefa-radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
    }

    .app-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }

    .app-name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .app-name {
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.813rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .current-badge-chip {
      font-size: 0.563rem;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: var(--oefa-radius-full, 9999px);
      background: var(--oefa-primary-root, #144aa7);
      color: #ffffff;
      letter-spacing: 0.03em;
    }

    .app-desc {
      font-size: 0.688rem;
      color: var(--oefa-text-muted, #94a3b8);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      margin-top: 1px;
    }

    /* Template de iconos SVG */
    .icon-svg-box {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .icon-initials {
      font-weight: 800;
      font-size: 0.813rem;
      letter-spacing: 0.02em;
    }

    /* Pie de Soporte */
    .launcher-footer {
      padding: 10px 16px;
      background: var(--oefa-surface-submenu);
      border-top: 1px solid var(--oefa-border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--oefa-text-secondary, #64748b);
      font-weight: 600;
    }

    .help-circle-icon {
      color: var(--oefa-primary-root, #144aa7);
      flex-shrink: 0;
    }

    .request-access-link {
      color: var(--oefa-primary-root, #144aa7);
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: gap 0.2s ease;

      .arrow-glyph {
        transition: transform 0.2s ease;
      }

      &:hover {
        text-decoration: underline;

        .arrow-glyph {
          transform: translateX(3px);
        }
      }
    }
  `]
})
export class OefaAppLauncherComponent {
  private elementRef = inject(ElementRef);

  /** Lista parametrizable de aplicativos y permisos otorgados al usuario (SSO / IAM) */
  @Input() apps: OefaAppItem[] = [];

  /** Identificador de la aplicación en la cual se encuentra el usuario */
  @Input() currentAppId: string = 'seosc';

  /** Título del panel institucional */
  @Input() title: string = 'Aplicativos y Servicios';

  /** URL externa para la solicitud de permisos en Mesa de Ayuda */
  @Input() helpdeskUrl: string = 'https://mesadeayuda.oefa.gob.pe';

  /** Modo de visualización inicial ('grid3x3' | 'list2col') */
  @Input() viewMode: 'grid3x3' | 'list2col' = 'grid3x3';

  /** Evento emitido al seleccionar un aplicativo con permisos */
  @Output() appSelect = new EventEmitter<OefaAppItem>();

  /** Evento emitido al hacer clic en solicitar nuevo acceso */
  @Output() requestAccess = new EventEmitter<void>();

  isOpen = signal(false);
  searchQuery = '';
  selectedCategory: 'all' | 'operativo' | 'gestion' = 'all';

  private defaultApps: OefaAppItem[] = [
    {
      id: 'seosc',
      name: 'SEOSC',
      shortName: 'OS',
      description: 'Órdenes y Entregables',
      category: 'operativo',
      iconBg: '#1D4ED8',
      iconGradient: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
      iconColor: '#FFFFFF',
      iconType: 'checklist',
      hasAccess: true,
      url: '/dashboard'
    },
    {
      id: 'saip',
      name: 'Portal SAIP',
      shortName: 'SA',
      description: 'Acceso a la Información',
      category: 'gestion',
      iconBg: '#059669',
      iconGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      iconColor: '#FFFFFF',
      iconType: 'document',
      hasAccess: true,
      url: '/saip/solicitud'
    },
    {
      id: 'siged',
      name: 'SIGED',
      shortName: 'GD',
      description: 'Gestión Documental',
      category: 'gestion',
      iconBg: '#4F46E5',
      iconGradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      iconColor: '#FFFFFF',
      iconType: 'folder',
      hasAccess: true
    },
    {
      id: 'sinada',
      name: 'SINADA',
      shortName: 'SN',
      description: 'Denuncias Ambientales',
      category: 'operativo',
      iconBg: '#EA580C',
      iconGradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
      iconColor: '#FFFFFF',
      iconType: 'shield',
      hasAccess: true
    },
    {
      id: 'sispa',
      name: 'SISPA',
      shortName: 'SP',
      description: 'Pasivos Ambientales',
      category: 'operativo',
      iconBg: '#7C3AED',
      iconGradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      iconColor: '#FFFFFF',
      iconType: 'environment',
      hasAccess: true
    },
    {
      id: 'mpv',
      name: 'Mesa de Partes',
      shortName: 'MP',
      description: 'Trámite Digital',
      category: 'gestion',
      iconBg: '#0891B2',
      iconGradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      iconColor: '#FFFFFF',
      iconType: 'inbox',
      hasAccess: true
    },
    {
      id: 'sitra',
      name: 'SITRA OEFA',
      shortName: 'TR',
      description: 'Trámite Interno',
      category: 'gestion',
      iconBg: '#475569',
      iconGradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
      iconColor: '#FFFFFF',
      iconType: 'workflow',
      hasAccess: false
    },
    {
      id: 'bi_oefa',
      name: 'Tableros BI',
      shortName: 'BI',
      description: 'Analítica y Métricas',
      category: 'operativo',
      iconBg: '#E11D48',
      iconGradient: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
      iconColor: '#FFFFFF',
      iconType: 'analytics',
      hasAccess: false
    }
  ];

  /** Lista efectiva calculando dinámicamente isCurrentApp según currentAppId */
  get effectiveApps(): OefaAppItem[] {
    const list = this.apps && this.apps.length > 0 ? this.apps : this.defaultApps;
    return list.map(app => ({
      ...app,
      isCurrentApp: app.id === this.currentAppId || !!app.isCurrentApp
    }));
  }

  get accessibleCount(): number {
    return this.effectiveApps.filter(a => a.hasAccess).length;
  }

  get filteredApps(): OefaAppItem[] {
    return this.effectiveApps.filter(app => {
      const matchSearch =
        !this.searchQuery ||
        app.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.shortName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchCategory =
        this.selectedCategory === 'all' || app.category === this.selectedCategory;

      return matchSearch && matchCategory;
    });
  }

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onAppClick(app: OefaAppItem, event: Event): void {
    if (!app.hasAccess) {
      event.preventDefault();
      return;
    }
    this.appSelect.emit(app);
    if (!app.url || app.url.startsWith('javascript:')) {
      event.preventDefault();
    }
    this.closeMenu();
  }

  onRequestAccess(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    if (this.requestAccess.observed) {
      this.requestAccess.emit();
    } else if (this.helpdeskUrl) {
      window.open(this.helpdeskUrl, '_blank', 'noopener,noreferrer');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeMenu();
    }
  }
}
