import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent, ChipVariant } from '../chip/chip.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export type BentoChartType = 'donut' | 'gauge' | 'bars' | 'sparkline' | 'none';

export interface BentoChipConfig {
  variant: ChipVariant;
  label: string;
}

@Component({
  selector: 'oefa-bento-kpi-tile',
  standalone: true,
  imports: [CommonModule, OefaChipComponent, OefaStatusBadgeComponent],
  template: `
    <div
      class="bento-kpi-card"
      [style.background]="bgTint || 'var(--oefa-surface-card)'"
      (click)="onTileClick()"
      role="article"
      [attr.aria-label]="title + ': ' + value + ' ' + metricLabel"
      tabindex="0"
      (keydown.enter)="onTileClick()"
      (keydown.space)="onTileClick()"
    >
      <!-- Fila 1: Top bar con icono y status badge / trend -->
      <div class="bkc-top">
        <div class="bkc-icon-box" [style.color]="iconColor || accentColor">
          @switch (icon) {
            @case ('factory') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
            }
            @case ('droplets') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            }
            @case ('scale') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            }
            @case ('leaf') {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            }
            @default {
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            }
          }
        </div>

        <div class="bkc-status-wrap">
          @if (status) {
            <oefa-status-badge [status]="status" size="sm" [dot]="true" />
          } @else if (trendLabel) {
            <span class="bkc-trend-pill" [style.color]="accentColor">
              {{ trendLabel }}
            </span>
          }
        </div>
      </div>

      <!-- Fila 2: Título y metadatos -->
      <div class="bkc-headline">
        <div class="bkc-top-meta">
          @if (sector) {
            <span class="bkc-sector">{{ sector }}</span>
          }
          @if (chip) {
            <oefa-chip [variant]="chip.variant" [label]="chip.label" />
          }
        </div>
        <h4 class="bkc-title">{{ title }}</h4>
      </div>

      <!-- Fila 3: Valor y micro-gráfico -->
      <div class="bkc-body">
        <div>
          <div class="bkc-metric-num">{{ value }}</div>
          @if (metricLabel) {
            <p class="bkc-metric-desc">
              <span class="bkc-dot" [style.background]="accentColor"></span>
              {{ metricLabel }}
            </p>
          }
        </div>

        <!-- Micro-gráficos SVG contextuales -->
        @if (chartType && chartType !== 'none') {
          <div class="bkc-chart-wrap" aria-hidden="true">
            <!-- Donut -->
            @if (chartType === 'donut') {
              <div class="donut-chart-box">
                <svg class="donut-svg" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18.5" stroke="rgba(20, 74, 167, 0.12)" stroke-width="4.5" fill="none"></circle>
                  <circle
                    cx="24"
                    cy="24"
                    r="18.5"
                    [attr.stroke]="accentColor"
                    stroke-width="4.5"
                    fill="none"
                    stroke-dasharray="116.2"
                    [attr.stroke-dashoffset]="116.2 - (116.2 * (percentage || 0) / 100)"
                    stroke-linecap="round"
                  ></circle>
                </svg>
                <div class="donut-center">
                  <span class="donut-pct">{{ percentage }}%</span>
                  <span class="donut-lbl">meta</span>
                </div>
              </div>
            }

            <!-- Gauge -->
            @if (chartType === 'gauge') {
              <div class="donut-chart-box">
                <svg class="donut-svg" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18.5" stroke="rgba(68, 191, 181, 0.2)" stroke-width="4.5" fill="none"></circle>
                  <circle
                    cx="24"
                    cy="24"
                    r="18.5"
                    [attr.stroke]="accentColor"
                    stroke-width="4.5"
                    fill="none"
                    stroke-dasharray="116.2"
                    [attr.stroke-dashoffset]="116.2 - (116.2 * (percentage || 0) / 100)"
                    stroke-linecap="round"
                  ></circle>
                </svg>
                <div class="donut-center">
                  <span class="donut-pct">{{ percentage }}%</span>
                  <span class="donut-lbl">avance</span>
                </div>
              </div>
            }

            <!-- Micro-bars -->
            @if (chartType === 'bars') {
              <div class="micro-bars-box">
                <div class="mbar" [style.background]="accentColor + '55'" style="height: 45%"></div>
                <div class="mbar" [style.background]="accentColor + '77'" style="height: 65%"></div>
                <div class="mbar" [style.background]="accentColor + '99'" style="height: 40%"></div>
                <div class="mbar" [style.background]="accentColor" style="height: 85%"></div>
                <div class="mbar" [style.background]="accentColor" style="height: 70%"></div>
              </div>
            }

            <!-- Sparkline -->
            @if (chartType === 'sparkline') {
              <div class="micro-spark-box">
                <svg class="spark-svg" viewBox="0 0 64 32">
                  <defs>
                    <linearGradient id="bkcSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" [attr.stop-color]="accentColor" stop-opacity="0.35"></stop>
                      <stop offset="100%" [attr.stop-color]="accentColor" stop-opacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M 2,24 Q 14,28 26,16 T 50,10 T 62,4 L 62,30 L 2,30 Z" fill="url(#bkcSparkGrad)"></path>
                  <path d="M 2,24 Q 14,28 26,16 T 50,10 T 62,4" fill="none" [attr.stroke]="accentColor" stroke-width="2.2" stroke-linecap="round"></path>
                  <circle cx="62" cy="4" r="2.5" [attr.fill]="accentColor" stroke="var(--oefa-surface-card)" stroke-width="1.5"></circle>
                </svg>
              </div>
            }
          </div>
        }
      </div>

      <!-- Fila 4: Footer con periodo y enlace de acción -->
      <div class="bkc-footer">
        <span class="bkc-period">{{ periodLabel || 'Actualizado recientemente' }}</span>
        <a
          href="javascript:void(0)"
          class="bkc-link"
          [style.color]="accentColor"
          (click)="onLinkClick($event)"
        >
          {{ linkText }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    .bento-kpi-card {
      border-radius: var(--oefa-radius-xl, 20px);
      padding: 20px;
      border: 1px solid var(--oefa-border-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      box-shadow: var(--oefa-shadow-sm);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      cursor: pointer;
      outline: none;

      &:focus-visible {
        box-shadow: 0 0 0 3px var(--oefa-focus-glow), var(--oefa-shadow-sm);
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--oefa-shadow-md);

        .bkc-icon-box {
          transform: rotate(8deg) scale(1.12);
        }
      }

      &:active {
        transform: translateY(-1px) scale(0.995);
        transition-duration: var(--oefa-duration-short);
      }
    }

    .bkc-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .bkc-status-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .bkc-headline {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bkc-top-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .bkc-icon-box {
      width: 40px;
      height: 40px;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--oefa-shadow-sm);
      flex-shrink: 0;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
    }

    .bkc-sector {
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 700;
      color: var(--oefa-text-muted);
    }

    .bkc-title {
      margin: 0;
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      font-size: 1rem;
      font-weight: 700;
      color: var(--oefa-text-primary);
      line-height: 1.35;
    }

    .bkc-trend-pill {
      font-size: 0.6875rem;
      font-weight: 700;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      padding: 2px 8px;
      border-radius: var(--oefa-radius-full);
      box-shadow: var(--oefa-shadow-sm);
    }

    .bkc-body {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      margin-top: 4px;
    }

    .bkc-metric-num {
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      font-size: 2rem;
      font-weight: 800;
      color: var(--oefa-text-primary);
      line-height: 1;
    }

    .bkc-metric-desc {
      margin: 6px 0 0 0;
      font-size: 0.75rem;
      color: var(--oefa-text-secondary);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bkc-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .bkc-chart-wrap {
      flex-shrink: 0;
    }

    .donut-chart-box {
      position: relative;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .donut-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .donut-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .donut-pct {
      font-size: 0.6875rem;
      font-weight: 800;
      color: var(--oefa-text-primary);
      line-height: 1;
    }

    .donut-lbl {
      font-size: 0.5rem;
      color: var(--oefa-text-muted);
      text-transform: uppercase;
    }

    .micro-bars-box {
      width: 58px;
      height: 48px;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md, 10px);
      padding: 4px 6px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 3px;
    }

    .mbar {
      flex: 1;
      border-radius: 3px;
    }

    .micro-spark-box {
      width: 64px;
      height: 38px;
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md, 10px);
      padding: 3px;
    }

    .spark-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .bkc-footer {
      padding-top: 10px;
      border-top: 1px solid var(--oefa-border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.6875rem;
    }

    .bkc-period {
      color: var(--oefa-text-muted);
      font-weight: 500;
    }

    .bkc-link {
      font-weight: 700;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    @media (prefers-reduced-motion: reduce) {
      .bento-kpi-card {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class OefaBentoKpiTileComponent {
  @Input() sector: string = '';
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() metricLabel: string = '';
  @Input() trendLabel?: string;
  @Input() periodLabel?: string;
  @Input() icon: string = 'chart';
  @Input() iconColor?: string;
  @Input() bgTint: string = 'var(--oefa-surface-subtle)';
  @Input() accentColor: string = 'var(--oefa-primary-root)';
  @Input() chip?: BentoChipConfig;
  @Input() status?: string;
  @Input() chartType: BentoChartType = 'donut';
  @Input() percentage?: number;
  @Input() linkText: string = 'Ver detalle →';

  @Output() tileClick = new EventEmitter<void>();
  @Output() linkClick = new EventEmitter<Event>();

  onTileClick(): void {
    this.tileClick.emit();
  }

  onLinkClick(event: Event): void {
    event.stopPropagation();
    this.linkClick.emit(event);
  }
}
