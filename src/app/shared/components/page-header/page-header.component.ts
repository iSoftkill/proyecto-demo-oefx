import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

/**
 * Componente Organismo para Encabezados de Página Institucionales del OEFA.
 * Centraliza el único <h1> de la vista, ruta de navegación breadcrumb accesible,
 * badges semánticos, botón de retorno opcional y barras de acción contextualmente adaptativas.
 */
@Component({
  selector: 'oefa-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule, OefaStatusBadgeComponent],
  template: `
    <header class="oefa-page-header" role="banner">
      @if (breadcrumbs && breadcrumbs.length > 0) {
        <nav class="breadcrumb-nav" aria-label="Ruta de navegación">
          <ol class="breadcrumb-list">
            @for (item of breadcrumbs; track item.label; let last = $last) {
              <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
                @if (!last) {
                  @if (item.url) {
                    <a [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
                  } @else {
                    <span class="breadcrumb-static">{{ item.label }}</span>
                  }
                  <span class="breadcrumb-separator" aria-hidden="true">/</span>
                } @else {
                  <span class="breadcrumb-current">{{ item.label }}</span>
                }
              </li>
            }
          </ol>
        </nav>
      }

      <div class="header-main-row">
        <div class="title-section">
          <div class="title-with-badge">
            @if (showBack) {
              <button 
                type="button" 
                class="btn-page-back" 
                title="Regresar a la página anterior"
                aria-label="Regresar a la página anterior"
                (click)="onBackClick()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
            }
            <h1 class="page-title">{{ title }}</h1>
            @if (badgeText) {
              <oefa-status-badge [status]="badgeStatus || 'info'" [label]="badgeText" />
            }
          </div>
          @if (subtitle) {
            <p class="page-subtitle">{{ subtitle }}</p>
          }
        </div>

        <div class="header-actions">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>

      <div class="header-extra">
        <ng-content select="[extra]"></ng-content>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .oefa-page-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .breadcrumb-nav {
      font-size: 0.8125rem;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 6px;
      flex-wrap: wrap;
    }

    .breadcrumb-item {
      color: var(--oefa-text-secondary, #475569);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .breadcrumb-item.active,
    .breadcrumb-current {
      color: var(--oefa-text-primary, #0f172a);
      font-weight: 600;
    }

    .breadcrumb-static {
      color: var(--oefa-text-secondary, #475569);
    }

    .breadcrumb-link {
      color: var(--oefa-primary-root, #144AA7);
      text-decoration: none;
      transition: color var(--oefa-duration-short, 150ms) ease;

      &:hover {
        text-decoration: underline;
        color: var(--oefa-primary-hover, #0e3478);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring);
        outline-offset: 2px;
        border-radius: 2px;
      }
    }

    .breadcrumb-separator {
      color: var(--oefa-text-disabled, #94a3b8);
      user-select: none;
    }

    .header-main-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .title-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 260px;
    }

    .title-with-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-page-back {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--oefa-radius-sm, 6px);
      border: 1px solid var(--oefa-border-color);
      background: var(--oefa-surface-card);
      color: var(--oefa-text-primary);
      cursor: pointer;
      transition: background-color var(--oefa-duration-short, 150ms) ease, border-color var(--oefa-duration-short, 150ms) ease, color var(--oefa-duration-short, 150ms) ease;
      padding: 0;
      flex-shrink: 0;

      &:hover {
        background: var(--oefa-surface-subtle);
        border-color: var(--oefa-primary-root);
        color: var(--oefa-primary-root);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring);
        outline-offset: 2px;
      }
    }

    .page-title {
      margin: 0;
      font-family: var(--oefa-font-family, inherit);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      letter-spacing: -0.01em;
      line-height: 1.25;
    }

    .page-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--oefa-text-secondary, #475569);
      line-height: 1.4;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .header-extra {
      empty-cells: hide;
    }

    @media (max-width: 768px) {
      .header-main-row {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }

      .header-actions {
        width: 100%;
        justify-content: flex-start;
      }

      .page-title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class OefaPageHeaderComponent {
  private router = inject(Router);

  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() badgeText?: string;
  @Input() badgeStatus?: string;
  @Input() breadcrumbs?: BreadcrumbItem[];
  @Input() showBack: boolean = false;
  @Input() backUrl?: string;

  @Output() back = new EventEmitter<void>();

  onBackClick(): void {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    }
    this.back.emit();
  }
}
