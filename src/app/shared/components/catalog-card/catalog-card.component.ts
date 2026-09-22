import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent, ChipVariant } from '../chip/chip.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export type CatalogActivityType = 'sparkline' | 'bar' | 'pulse' | 'none';

export interface CatalogChipConfig {
  variant: ChipVariant;
  label: string;
}

@Component({
  selector: 'oefa-catalog-card',
  standalone: true,
  imports: [CommonModule, OefaChipComponent, OefaStatusBadgeComponent],
  template: `
    <div
      class="bento-catalog-card"
      (click)="onCardClick()"
      role="article"
      [attr.aria-label]="title"
      tabindex="0"
      (keydown.enter)="onCardClick()"
      (keydown.space)="onCardClick()"
    >
      <!-- Cabecera de la Card -->
      <div class="bcc-top">
        <div class="bcc-icon-box" [style.color]="iconColor || color">
          @switch (icon) {
            @case ('pickaxe') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 10-8.5 8.5a2.12 2.12 0 1 1-3-3L11 7"/><path d="m15 4 5 5"/><path d="m18 7 3-3"/><path d="m9 12-4-4"/><path d="m20 9-4 4"/></svg>
            }
            @case ('waves') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
            }
            @case ('scale') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            }
            @case ('clipboard-check') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
            }
            @default {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            }
          }
        </div>
        <div class="bcc-top-actions">
          @if (status) {
            <oefa-status-badge [status]="status" size="sm" [dot]="true" />
          }
          @if (type) {
            <span class="bcc-badge" [style.background]="bgTint || 'var(--oefa-surface-muted)'" [style.color]="typeColor || color">
              {{ type }}
            </span>
          }
        </div>
      </div>

      <!-- Cuerpo: Título, descripción y tags -->
      <div class="bcc-body">
        <h3 class="bcc-title">{{ title }}</h3>
        <p class="bcc-description">{{ description }}</p>

        <div class="bcc-tags">
          @if (chips && chips.length > 0) {
            @for (chip of chips; track chip.label) {
              <oefa-chip [variant]="chip.variant" [label]="chip.label" />
            }
          }
          @if (tags && tags.length > 0) {
            @for (tag of tags; track tag) {
              <span class="bcc-tag">{{ tag }}</span>
            }
          }
        </div>
      </div>

      <!-- Footer: Micro-indicador de actividad y acción -->
      <div class="bcc-footer">
        <div class="bcc-activity" aria-hidden="true">
          @if (activityType === 'sparkline') {
            <div class="mini-spark-wrap">
              <span class="mini-stat-label">{{ activityLabel || 'Uso semanal' }}</span>
              <svg class="mini-spark" viewBox="0 0 50 16">
                <path d="M 0,14 Q 10,2 20,10 T 35,4 T 50,2" fill="none" [attr.stroke]="color" stroke-width="2" stroke-linecap="round"></path>
              </svg>
            </div>
          } @else if (activityType === 'bar') {
            <div class="mini-bar-wrap">
              <span class="mini-stat-label">{{ activityLabel || 'Actividad 98%' }}</span>
              <div class="mini-bar-track">
                <div class="mini-bar-fill" [style.background]="color" style="width: 98%"></div>
              </div>
            </div>
          } @else if (activityType === 'pulse') {
            <div class="mini-pulse-wrap">
              <span class="pulse-dot"></span>
              <span class="mini-stat-label">{{ activityLabel || 'En línea' }}</span>
            </div>
          }
          @if (updatedAt) {
            <span class="bcc-time">{{ updatedAt }}</span>
          }
        </div>

        <button
          class="bcc-btn"
          [style.color]="color"
          [style.background]="bgTint || 'var(--oefa-surface-muted)'"
          (click)="onActionClick($event)"
        >
          {{ actionText }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .bento-catalog-card {
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg, 16px);
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      box-shadow: var(--oefa-shadow-sm);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  border-color var(--oefa-duration-short) var(--oefa-ease-standard);
      cursor: pointer;
      outline: none;

      &:focus-visible {
        box-shadow: 0 0 0 3px var(--oefa-focus-glow), var(--oefa-shadow-sm);
        border-color: var(--oefa-primary-root);
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--oefa-shadow-md);
        border-color: var(--oefa-border-color-strong, #cbd5e1);

        .bcc-icon-box {
          transform: rotate(8deg) scale(1.12);
        }
      }

      &:active {
        transform: translateY(-1px) scale(0.995);
        transition-duration: var(--oefa-duration-short);
      }
    }

    .bcc-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .bcc-top-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .bcc-icon-box {
      width: 44px;
      height: 44px;
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--oefa-shadow-sm);
      flex-shrink: 0;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
    }

    .bcc-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--oefa-radius-full);
      letter-spacing: 0.02em;
    }

    .bcc-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .bcc-title {
      margin: 0;
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      font-size: 1rem;
      font-weight: 700;
      color: var(--oefa-text-primary);
      line-height: 1.35;
    }

    .bcc-description {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bcc-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding-top: 4px;
    }

    .bcc-tag {
      font-size: 0.6875rem;
      font-weight: 500;
      background: var(--oefa-surface-muted);
      color: var(--oefa-text-secondary);
      padding: 2px 8px;
      border-radius: var(--oefa-radius-sm, 6px);
      border: 1px solid var(--oefa-border-color);
    }

    .bcc-footer {
      padding-top: 14px;
      border-top: 1px solid var(--oefa-border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .bcc-activity {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mini-spark-wrap, .mini-bar-wrap, .mini-pulse-wrap {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .mini-stat-label {
      font-size: 0.625rem;
      color: var(--oefa-text-muted);
      font-weight: 600;
      text-transform: uppercase;
    }

    .mini-spark {
      width: 54px;
      height: 14px;
    }

    .mini-bar-track {
      width: 54px;
      height: 5px;
      background: var(--oefa-surface-muted);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-full);
      overflow: hidden;
    }

    .mini-bar-fill {
      height: 100%;
      border-radius: var(--oefa-radius-full);
    }

    .mini-pulse-wrap {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--oefa-success-ui-safe);
      border-radius: 50%;
      box-shadow: 0 0 0 3px var(--oefa-focus-glow);
    }

    .bcc-time {
      font-size: 0.6875rem;
      color: var(--oefa-text-muted);
    }

    .bcc-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8125rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: var(--oefa-radius-md, 10px);
      transition: transform var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  filter var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &:hover {
        transform: translateX(2px);
        filter: brightness(0.95);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .bento-catalog-card, .bcc-btn {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class OefaCatalogCardComponent {
  @Input() icon: string = 'folder';
  @Input() iconColor?: string;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tags: string[] = [];
  @Input() chips?: CatalogChipConfig[];
  @Input() status?: string;
  @Input() type?: string;
  @Input() typeColor?: string;
  @Input() color: string = 'var(--oefa-primary-root)';
  @Input() bgTint?: string;
  @Input() borderTint?: string;
  @Input() activityType: CatalogActivityType = 'none';
  @Input() activityLabel?: string;
  @Input() updatedAt?: string;
  @Input() actionText: string = 'Abrir';

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<Event>();

  onCardClick(): void {
    this.cardClick.emit();
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}
