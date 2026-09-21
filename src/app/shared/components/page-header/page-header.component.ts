import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

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
                @if (!last && item.url) {
                  <a [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
                  <span class="breadcrumb-separator" aria-hidden="true">/</span>
                } @else {
                  <span>{{ item.label }}</span>
                }
              </li>
            }
          </ol>
        </nav>
      }

      <div class="header-main-row">
        <div class="title-section">
          <div class="title-with-badge">
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
    }

    .breadcrumb-item {
      color: var(--oefa-text-secondary, #475569);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .breadcrumb-item.active {
      color: var(--oefa-text-primary, #0f172a);
      font-weight: 600;
    }

    .breadcrumb-link {
      color: var(--oefa-primary-root, #006654);
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .breadcrumb-link:hover {
      text-decoration: underline;
      color: var(--oefa-primary-hover, #004d3f);
    }

    .breadcrumb-separator {
      color: var(--oefa-text-disabled, #94a3b8);
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
    }

    .title-with-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .page-title {
      margin: 0;
      font-family: var(--oefa-font-display, inherit);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      letter-spacing: -0.01em;
    }

    .page-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--oefa-text-secondary, #475569);
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
  `]
})
export class OefaPageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() badgeText?: string;
  @Input() badgeStatus?: string;
  @Input() breadcrumbs?: BreadcrumbItem[];
}
