import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';
import { OefaChipComponent, ChipVariant } from '../../shared/components/chip/chip.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';
import { OefaCatalogCardComponent } from '../../shared/components/catalog-card/catalog-card.component';
import { OefaFilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';

export interface SandboxStep {
  title: string;
  description: string;
}

type SandboxTab = 'category-tile' | 'catalog-card' | 'motion' | 'filter-sidebar' | 'search-hero' | 'stepper';

interface BentoKpiTile {
  sector: string;
  title: string;
  value: string;
  metricLabel: string;
  trendLabel: string;
  periodLabel: string;
  badgeIcon: string;
  icon: string;
  iconColor?: string;
  bgTint: string;
  borderTint: string;
  accentColor: string;
  chip?: { variant: ChipVariant; label: string };
  status?: string;
  chartType: 'donut' | 'gauge' | 'bars' | 'sparkline';
  percentage?: number;
}

interface CatalogCard {
  icon: string;
  iconColor?: string;
  title: string;
  description: string;
  tags: string[];
  chips?: { variant: ChipVariant; label: string }[];
  status?: string;
  type: string;
  typeColor: string;
  color: string;
  bgTint?: string;
  borderTint?: string;
  activityType: 'sparkline' | 'bar' | 'pulse';
  activityLabel: string;
  updatedAt: string;
}

interface FilterGroup {
  label: string;
  open: boolean;
  options: { label: string; count: number; checked: boolean }[];
}

interface CategoryTile {
  icon: string;
  label: string;
  count: number;
  color: string;
  iconColor?: string;
  bgTint: string;
}

@Component({
  selector: 'app-sandbox-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaButtonComponent,
    OefaSegmentedSwitchComponent,
    OefaStatusBadgeComponent,
    OefaBentoKpiTileComponent,
    OefaCatalogCardComponent,
    OefaFilterSidebarComponent
  ],
  template: `
    <div class="sandbox-container">

      <!-- HEADER -->
      <div class="sandbox-header">
        <div>
          <h2>🧪 Sandbox — Portal DAT (Prototipos Bento & Fills Suaves)</h2>
          <p class="subtitle">Evolución de componentes inspirados en el diseño Bento de Stitch: sin bordes laterales duros, esquinas redondeadas 18-20px, tonos pastel tintados y micro-gráficos contextuales.</p>
        </div>
        <div class="sandbox-badge">MODO LAB v2.1</div>
      </div>

      <!-- TABS DE NAVEGACIÓN ENTRE PROTOTIPOS -->
      <div class="sandbox-tabs" role="tablist">
        @for (tab of tabs; track tab.id) {
          <button
            class="sandbox-tab"
            [class.active]="activeTab() === tab.id"
            (click)="activeTab.set(tab.id)"
            role="tab"
            [attr.aria-selected]="activeTab() === tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
            @if (tab.isNew) {
              <span class="tab-new-badge">BENTO</span>
            }
          </button>
        }
      </div>

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA 1: STEPPER RESPONSIVE
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'stepper') {
        <div class="sandbox-controls card">
          <div class="control-group">
            <label class="control-label">Simulador:</label>
            <oefa-segmented-switch [options]="viewportOptions" [(selected)]="currentViewport"></oefa-segmented-switch>
          </div>
          <div class="control-group">
            <label class="control-label">Pasos:</label>
            <div class="step-counter-btns">
              <oefa-button variant="secondary" size="sm" (clicked)="removeStep()" [disabled]="steps().length <= 2">- Paso</oefa-button>
              <span class="step-count-badge">{{ steps().length }} pasos</span>
              <oefa-button variant="secondary" size="sm" (clicked)="addStep()" [disabled]="steps().length >= 6">+ Paso</oefa-button>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">Navegar:</label>
            <div class="step-nav-btns">
              <oefa-button variant="secondary" size="sm" (clicked)="prev()" [disabled]="currentStep() <= 1">Anterior</oefa-button>
              <oefa-button variant="primary" size="sm" (clicked)="next()" [disabled]="currentStep() >= steps().length">Siguiente</oefa-button>
            </div>
          </div>
        </div>

        <div class="preview-stage" [class.mobile-view]="currentViewport() === 'mobile'" [class.tablet-view]="currentViewport() === 'tablet'">
          <div class="device-frame-header" *ngIf="currentViewport() !== 'desktop'">
            <span class="device-dot"></span>
            <span class="device-title">{{ currentViewport() === 'mobile' ? 'Vista Móvil (375px)' : 'Vista Tablet (640px)' }}</span>
            <span class="device-time">10:00</span>
          </div>
          <div class="device-screen-content">
            <div class="stepper-sandbox-wrapper" [class.is-mobile]="currentViewport() === 'mobile'" [class.is-tablet]="currentViewport() === 'tablet'" [class.is-desktop]="currentViewport() === 'desktop'">
              <div class="responsive-stepper-bar">
                @for (step of steps(); track $index; let i = $index; let last = $last) {
                  <div class="step-wrapper" [class.last]="last">
                    <div class="step-item" [class.active]="currentStep() === i + 1" [class.completed]="currentStep() > i + 1" (click)="goToStep(i + 1)">
                      <div class="step-circle">
                        @if (currentStep() > i + 1) {
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        } @else {
                          <span>{{ i + 1 }}</span>
                        }
                      </div>
                      <div class="step-inline-info">
                        <span class="step-inline-title">{{ step.title }}</span>
                        @if (step.description) {
                          <span class="step-inline-desc">{{ step.description }}</span>
                        }
                      </div>
                    </div>
                    @if (!last) {
                      <div class="step-connector" [class.completed]="currentStep() > i + 1"></div>
                    }
                  </div>
                }
              </div>
              <div class="mobile-active-banner">
                <span class="mobile-badge">PASO {{ currentStep() }} DE {{ steps().length }}</span>
                <h3 class="mobile-title">{{ steps()[currentStep() - 1].title }}</h3>
                @if (steps()[currentStep() - 1].description) {
                  <p class="mobile-desc">{{ steps()[currentStep() - 1].description }}</p>
                }
              </div>
            </div>
            <div class="dummy-step-card">
              <h4>Contenido del formulario (Paso {{ currentStep() }})</h4>
              <p>Aquí se cargan los inputs y campos correspondientes a este hito.</p>
              <div class="dummy-form-placeholder">
                <div class="placeholder-line w-75"></div>
                <div class="placeholder-line w-50"></div>
                <div class="placeholder-line w-100"></div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA 2: oefa-catalog-card (MODERNA BENTO CON FILLS)
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'catalog-card') {
        <div class="proto-info-bar">
          <span class="proto-tag">Molécula Bento</span>
          <span class="proto-dest">→ <code>shared/components/catalog-card/</code></span>
          <span class="proto-status pending">✨ Fills Suaves & Micro-Gráficos</span>
        </div>

        <div class="proto-section">
          <p class="proto-desc">
            <strong>Nueva tendencia Stitch aplicada:</strong> Tarjetas con esquinas redondeadas amigables (18px), sin bordes duros laterales. Cada card integra badges translúcidos en cápsula, micro-indicador de actividad en vivo y botón <code>Abrir →</code> adaptativo.
          </p>

          <h4 class="proto-variant-title">Cuadrícula Bento de Catálogo con Tags & Badges OEFA</h4>
          <div class="bento-catalog-grid">
            @for (card of catalogCards; track card.title) {
              <oefa-catalog-card
                [icon]="card.icon"
                [iconColor]="card.iconColor"
                [title]="card.title"
                [description]="card.description"
                [tags]="card.tags"
                [chips]="card.chips"
                [status]="card.status"
                [type]="card.type"
                [typeColor]="card.typeColor"
                [color]="card.color"
                [bgTint]="card.bgTint"
                [borderTint]="card.borderTint"
                [activityType]="card.activityType"
                [activityLabel]="card.activityLabel"
                [updatedAt]="card.updatedAt"
              />
            }
          </div>

          <!-- Variante Alternativa 1: Formato Horizontal Bento (para Tableros Directivos) -->
          <h4 class="proto-variant-title" style="margin-top: 24px">Variante Alternativa: Formato Horizontal Bento (Centro de Mando Directivo)</h4>
          <div class="bento-horizontal-card">
            <div class="bhc-left">
              <div class="bhc-icon-badge">
                <div class="bhc-icon">📊</div>
                <div>
                  <span class="bhc-pill">Dashboard Estratégico Ejecutivo</span>
                  <h3 class="bhc-title">Centro de Mando de Fiscalización Ambiental Nacional</h3>
                </div>
              </div>
              <p class="bhc-desc">Consolidado general de expedientes, estados de alerta temprana y monitoreo continuo en los 24 departamentos.</p>
              <div class="bhc-stats-row">
                <div class="bhc-stat">
                  <span class="bhc-stat-val">24</span>
                  <span class="bhc-stat-lbl">Regiones activas</span>
                </div>
                <div class="bhc-stat">
                  <span class="bhc-stat-val">99.4%</span>
                  <span class="bhc-stat-lbl">Disponibilidad</span>
                </div>
                <div class="bhc-stat">
                  <span class="bhc-stat-val">12</span>
                  <span class="bhc-stat-lbl">Fuentes de datos</span>
                </div>
              </div>
            </div>

            <div class="bhc-right">
              <div class="bhc-spark-box">
                <span class="mini-stat-label">Tendencia de actividad 30 días</span>
                <svg class="bhc-spark-svg" viewBox="0 0 120 40">
                  <defs>
                    <linearGradient id="bhcGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#144AA7" stop-opacity="0.3"></stop>
                      <stop offset="100%" stop-color="#144AA7" stop-opacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M 0,32 Q 25,38 45,18 T 85,12 T 120,4 L 120,40 L 0,40 Z" fill="url(#bhcGrad)"></path>
                  <path d="M 0,32 Q 25,38 45,18 T 85,12 T 120,4" fill="none" stroke="#144AA7" stroke-width="2.5" stroke-linecap="round"></path>
                  <circle cx="120" cy="4" r="3" fill="#144AA7"></circle>
                </svg>
              </div>
              <button class="bhc-action-btn">
                Acceder al Centro de Mando
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA: MOTION M3 LAB (EASING, HOVERS & MICRO-INTERACCIONES)
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'motion') {
        <div class="proto-info-bar">
          <span class="proto-tag">M3 Expressive Motion</span>
          <span class="proto-dest">→ <code>styles.scss</code> (Tokens de Movimiento & Curvas Easing)</span>
          <span class="proto-status pending">⚡ Físicas de Animación Fluida</span>
        </div>

        <div class="proto-section">
          <p class="proto-desc">
            <strong>Laboratorio de Animación y Curvas M3 Expressive:</strong> Experimenta la diferencia entre la transición lineal genérica (<code>ease</code> estándar) y las curvas de aceleración y amortiguación física de <strong>Material 3 Expressive</strong> (<code>--oefa-ease-emphasized</code> y <code>--oefa-ease-standard</code>).
          </p>

          <!-- 1. Comparativa Interactiva de Curvas -->
          <h4 class="proto-variant-title">1. Comparador en Vivo: Easing Clásico vs. M3 Expressive</h4>
          <div class="motion-compare-grid">
            <div class="motion-card-demo legacy">
              <div class="mcd-header">
                <span class="mcd-badge generic">CSS Clásico</span>
                <h5>ease / linear (200ms)</h5>
              </div>
              <p class="mcd-desc">Movimiento mecánico uniforme, sin aceleración natural de resorte.</p>
              <div class="mcd-interactive-box classic-box">
                <span>Pasa el cursor / Toca aquí</span>
              </div>
              <div class="mcd-code-pill"><code>transition: all 0.2s ease;</code></div>
            </div>

            <div class="motion-card-demo expressive">
              <div class="mcd-header">
                <span class="mcd-badge m3">M3 Expressive</span>
                <h5>Emphasized Spring (300ms)</h5>
              </div>
              <p class="mcd-desc">Desaceleración fluida con física elástica (curva cúbica 0.2, 0, 0, 1).</p>
              <div class="mcd-interactive-box m3-box">
                <span>Pasa el cursor / Toca aquí ✨</span>
              </div>
              <div class="mcd-code-pill highlight"><code>transition: all 300ms var(--oefa-ease-emphasized);</code></div>
            </div>
          </div>

          <!-- 2. Micro-Interacciones Táctiles en Componentes Reales -->
          <h4 class="proto-variant-title" style="margin-top: 28px">2. Efecto de Elevación y State Layers en Tarjetas y Botones</h4>
          <div class="motion-interactive-row">
            <!-- Botón Primario con Hover Expressive -->
            <div class="motion-test-item">
              <span class="mti-label">Botón con Pulsación Táctil</span>
              <button class="oefa-btn-expressive">
                <span>Acción Institucional</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            <!-- Botón Turquesa con Glow Fluido -->
            <div class="motion-test-item">
              <span class="mti-label">Acento Turquesa Glow</span>
              <button class="oefa-btn-expressive aqua">
                <span>Descargar Reporte</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>

            <!-- Bento Card con Morphing Suave -->
            <div class="motion-test-item" style="flex: 2">
              <span class="mti-label">Tarjeta Bento con Expansión Dinámica</span>
              <div class="bento-card-expressive">
                <div class="bce-icon">⚡</div>
                <div class="bce-content">
                  <h5>Micro-elevación con sombra ambiental</h5>
                  <p>Observa cómo la sombra se expande de manera hiper-suave sin tirones.</p>
                </div>
                <span class="bce-chip">300ms Easing</span>
              </div>
            </div>
          </div>

          <!-- 3. Especificación de Tokens M3 que se agregarán a styles.scss -->
          <div class="motion-tokens-table-card">
            <h4>📐 Tokens M3 Expressive Propuestos para el Design System OEFA</h4>
            <div class="mtt-grid">
              <div class="mtt-item">
                <span class="mtt-name">--oefa-ease-emphasized</span>
                <span class="mtt-val">cubic-bezier(0.2, 0.0, 0.0, 1.0)</span>
                <span class="mtt-use">Para elevaciones, aperturas, cards y modales</span>
              </div>
              <div class="mtt-item">
                <span class="mtt-name">--oefa-ease-emphasized-decel</span>
                <span class="mtt-val">cubic-bezier(0.05, 0.7, 0.1, 1.0)</span>
                <span class="mtt-use">Para elementos que entran a pantalla</span>
              </div>
              <div class="mtt-item">
                <span class="mtt-name">--oefa-ease-standard</span>
                <span class="mtt-val">cubic-bezier(0.2, 0.0, 0.0, 1.0)</span>
                <span class="mtt-use">Para hover de botones, checkboxes y chips</span>
              </div>
              <div class="mtt-item">
                <span class="mtt-name">--oefa-duration-standard</span>
                <span class="mtt-val">250ms a 300ms</span>
                <span class="mtt-use">Velocidad óptima percepción humana</span>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA 3: oefa-filter-sidebar (FILTROS AVANZADOS Y RESPONSIVE)
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'filter-sidebar') {
        <div class="proto-info-bar">
          <span class="proto-tag">Filtros Avanzados</span>
          <span class="proto-dest">→ <code>shared/components/filter-sidebar/</code></span>
          <span class="proto-status pending">✨ Sidebar & Mobile Drawer</span>
        </div>

        <div class="proto-section">
          <p class="proto-desc">
            <strong>Sistema de Filtrado Responsive:</strong> Sidebar lateral estructurado en grupos colapsables, inputs de rango numérico (con unidad personalizable, ej. UIT), selectores de fecha, switch toggles y cajón deslizante (drawer) optimizado para dispositivos móviles con sticky footer de acciones.
          </p>

          <div class="filter-sidebar-layout" [class.mobile-simulated]="simulateMobileViewport()">
            <!-- COMPONENTE REUTILIZABLE FILTER SIDEBAR -->
            <oefa-filter-sidebar
              [title]="'Refinar Búsqueda'"
              [activeCount]="activeFiltersCount()"
              [statusOptions]="statusFilterOptions"
              [selectedStatus]="filterStatus()"
              [dateFrom]="filterDateFrom()"
              [dateTo]="filterDateTo()"
              [amountMin]="filterAmountMin()"
              [amountMax]="filterAmountMax()"
              amountUnit="UIT"
              [filterGroups]="filterGroups()"
              [searchQuery]="filterSearchQuery()"
              [flagMedidas]="filterFlagMedidas()"
              [flagAlertas]="filterFlagAlertas()"
              [isOpenMobile]="isMobileFilterOpen()"
              (statusChange)="filterStatus.set($event)"
              (dateFromChange)="filterDateFrom.set($event)"
              (dateToChange)="filterDateTo.set($event)"
              (amountMinChange)="filterAmountMin.set($event)"
              (amountMaxChange)="filterAmountMax.set($event)"
              (groupToggle)="toggleFilterGroup($event)"
              (optionToggle)="toggleFilterOption($event)"
              (searchQueryChange)="filterSearchQuery.set($event)"
              (flagMedidasChange)="filterFlagMedidas.set($event)"
              (flagAlertasChange)="filterFlagAlertas.set($event)"
              (clear)="clearFilters()"
              (apply)="applyFiltersMobile()"
              (closeMobile)="closeMobileFilter()"
            />

            <!-- RESULTS AREA -->
            <div class="filter-results-area">
              <!-- Barra disparadora Mobile Sticky -->
              <div class="fs-mobile-trigger-bar">
                <button type="button" class="fs-mobile-trigger-btn" (click)="isMobileFilterOpen.set(true)">
                  <div class="fs-mtb-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    <span>Filtrar y Refinar Resultados</span>
                  </div>
                  @if (activeFiltersCount() > 0) {
                    <span class="fs-mtb-badge">{{ activeFiltersCount() }}</span>
                  }
                </button>
              </div>

              <div class="fr-header">
                <div class="fr-count-wrap">
                  <span class="fr-count"><strong>{{ activeFiltersCount() }}</strong> filtros activos</span>
                  <span class="fr-total-badge">142 expedientes encontrados</span>
                </div>
                @if (activeFiltersCount() > 0) {
                  <div class="fr-active-chips">
                    @for (chip of activeFilterChips(); track chip) {
                      <span class="fr-chip">
                        {{ chip }}
                        <button type="button" class="fr-chip-remove" (click)="removeChipFilter(chip)">×</button>
                      </span>
                    }
                  </div>
                }
              </div>

              <!-- Lista de resultados con tarjetas Bento limpias -->
              <div class="fr-results-grid">
                <div class="fr-result-card">
                  <div class="frc-top">
                    <div class="frc-meta">
                      <span class="frc-code">EXP-2024-00142-DSUP</span>
                      <oefa-status-badge status="EN_PROCESO" size="sm" [dot]="true" />
                    </div>
                    <span class="frc-date">12 Set 2024</span>
                  </div>
                  <h4 class="frc-title">Supervisión Regular a Unidad Minera Acumulación Cuajone</h4>
                  <p class="frc-desc">Evaluación integral de componentes ambientales, diques de relaves y manejo de aguas de escorrentía en cuenca Moquegua.</p>
                  <div class="frc-footer">
                    <span class="frc-unit-tag">Sanción potencial: <strong>120 UIT</strong></span>
                    <span class="frc-region">Moquegua • Mariscal Nieto</span>
                  </div>
                </div>

                <div class="fr-result-card">
                  <div class="frc-top">
                    <div class="frc-meta">
                      <span class="frc-code">EXP-2024-00891-DEAM</span>
                      <oefa-status-badge status="OBSERVADO" size="sm" [dot]="true" />
                    </div>
                    <span class="frc-date">08 Set 2024</span>
                  </div>
                  <h4 class="frc-title">Monitoreo de Calidad de Agua en Estaciones Automáticas Cuenca Mantaro</h4>
                  <p class="frc-desc">Detección de superación de Estándares de Calidad Ambiental (ECA) para Agua en punto intermedio de afluente.</p>
                  <div class="frc-footer">
                    <span class="frc-unit-tag">Medida preventiva: <strong>Activa</strong></span>
                    <span class="frc-region">Junín • Huancayo</span>
                  </div>
                </div>

                <div class="fr-result-card">
                  <div class="frc-top">
                    <div class="frc-meta">
                      <span class="frc-code">EXP-2024-00432-DFAI</span>
                      <oefa-status-badge status="FINALIZADO" size="sm" [dot]="true" />
                    </div>
                    <span class="frc-date">29 Ago 2024</span>
                  </div>
                  <h4 class="frc-title">Resolución Directoral N° 0451-2024-OEFA/DFAI</h4>
                  <p class="frc-desc">Sanción administrativa consentida con medida correctiva de remediación de suelo y revegetación en área degradada.</p>
                  <div class="frc-footer">
                    <span class="frc-unit-tag">Multa cobrada: <strong>45.5 UIT</strong></span>
                    <span class="frc-region">Cusco • Espinar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA 4: oefa-category-tile & BENTO KPI TILES (NUEVO ENFOQUE)
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'category-tile') {
        <div class="proto-info-bar">
          <span class="proto-tag">Bento Tiles</span>
          <span class="proto-dest">→ <code>shared/components/category-tile/</code></span>
          <span class="proto-status pending">✨ Bento Pasteles & Micro-Gráficos</span>
        </div>

        <div class="proto-section">
          <p class="proto-desc">
            <strong>Inspirado en la propuesta Bento Stitch:</strong> Superficies suaves al 4–8% de opacidad, esquinas de 20px, sin bordes laterales duros y micro-gráficos contextuales (donut de meta, radial gauge, barras verticales y sparklines).
          </p>

          <!-- 1. Bento KPI & Category Tiles (Fills Suaves) -->
          <h4 class="proto-variant-title">1. Tiles Bento con Relleno Pastel Suave y Micro-Gráficos</h4>
          <div class="bento-kpi-grid">
            @for (kpi of bentoKpis; track kpi.title) {
              <oefa-bento-kpi-tile
                [sector]="kpi.sector"
                [title]="kpi.title"
                [value]="kpi.value"
                [metricLabel]="kpi.metricLabel"
                [trendLabel]="kpi.trendLabel"
                [periodLabel]="kpi.periodLabel"
                [icon]="kpi.icon"
                [iconColor]="kpi.iconColor"
                [bgTint]="kpi.bgTint"
                [accentColor]="kpi.accentColor"
                [chip]="kpi.chip"
                [status]="kpi.status"
                [chartType]="kpi.chartType"
                [percentage]="kpi.percentage"
              />
            }
          </div>

          <!-- 2. Variante: Category Pills Rápidos con Fills Suaves -->
          <h4 class="proto-variant-title" style="margin-top: 28px">2. Mosaicos de Categoría (Fills Suaves sin borde lateral duro)</h4>
          <div class="soft-category-tiles-grid">
            @for (tile of categoryTiles; track tile.label) {
              <button class="soft-cat-tile" [style.background]="tile.bgTint">
                <span class="sct-icon" [style.color]="tile.iconColor || tile.color">
                  @switch (tile.icon) {
                    @case ('factory') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
                    }
                    @case ('leaf') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
                    }
                    @case ('clipboard-list') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/></svg>
                    }
                    @case ('scale') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                    }
                    @case ('droplets') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                    }
                    @case ('users') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    }
                    @case ('layout-dashboard') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    }
                    @case ('map-pin') {
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    }
                  }
                </span>
                <div class="sct-info">
                  <span class="sct-label">{{ tile.label }}</span>
                  <span class="sct-count">{{ tile.count }} tableros</span>
                </div>
                <span class="sct-arrow" [style.color]="tile.color">→</span>
              </button>
            }
          </div>

          <!-- 3. Laboratorio Demostrativo de Micro-Gráficos Reutilizables (0 KB extras) -->
          <h4 class="proto-variant-title" style="margin-top: 32px">3. 🔬 Laboratorio de Micro-Gráficos Reutilizables (100% SVG/CSS, 0 KB extras)</h4>
          <p class="proto-desc">
            Prueba cómo estos micro-gráficos son <strong>100% independientes, reactivos y reutilizables</strong> en cualquier componente institucional (tableros, tablas, modales o cards). Cambia el valor dinámico y el color institucional abajo:
          </p>

          <div class="microchart-lab-card">
            <!-- Controles del lab -->
            <div class="mcl-controls">
              <div class="mcl-control-item">
                <label class="mcl-label">Valor interactivo: <strong>{{ labPercentage() }}%</strong></label>
                <input type="range" class="mcl-slider" min="0" max="100" [ngModel]="labPercentage()" (ngModelChange)="labPercentage.set($event)" />
              </div>
              <div class="mcl-control-item">
                <label class="mcl-label">Color institucional derivado:</label>
                <div class="mcl-palette-btns">
                  <button type="button" class="mcl-palette-btn" [class.active]="labColorVariant() === 'primary'" (click)="labColorVariant.set('primary')">🔵 Primario OEFA</button>
                  <button type="button" class="mcl-palette-btn" [class.active]="labColorVariant() === 'secondary'" (click)="labColorVariant.set('secondary')">🟢 Turquesa</button>
                  <button type="button" class="mcl-palette-btn" [class.active]="labColorVariant() === 'tertiary'" (click)="labColorVariant.set('tertiary')">🟠 Ámbar PAS</button>
                  <button type="button" class="mcl-palette-btn" [class.active]="labColorVariant() === 'success'" (click)="labColorVariant.set('success')">🌱 Éxito Metas</button>
                </div>
              </div>
            </div>

            <!-- Grilla con los 4 micro-gráficos reutilizables -->
            <div class="mcl-preview-grid">
              <!-- A. Donut Progress Ring -->
              <div class="mcl-item" [style.background]="labBgTint">
                <span class="mcl-item-title">Donut Progress Ring</span>
                <div class="donut-chart-box" style="width: 54px; height: 54px;">
                  <svg class="donut-svg" viewBox="0 0 48 48" style="width: 54px; height: 54px;">
                    <circle cx="24" cy="24" r="18.5" stroke="rgba(0,0,0,0.08)" stroke-width="4.5" fill="none"></circle>
                    <circle cx="24" cy="24" r="18.5" [attr.stroke]="labColor" stroke-width="4.5" fill="none" stroke-dasharray="116.2" [attr.stroke-dashoffset]="labStrokeDashoffset" stroke-linecap="round"></circle>
                  </svg>
                  <div class="donut-center">
                    <span class="donut-pct">{{ labPercentage() }}%</span>
                  </div>
                </div>
                <span class="mcl-item-sub">Avance de entregables / metas</span>
              </div>

              <!-- B. Radial Semi-Gauge -->
              <div class="mcl-item" [style.background]="labBgTint">
                <span class="mcl-item-title">Radial Gauge</span>
                <div class="donut-chart-box" style="width: 54px; height: 54px;">
                  <svg class="donut-svg" viewBox="0 0 48 48" style="width: 54px; height: 54px; transform: rotate(-90deg);">
                    <circle cx="24" cy="24" r="18.5" stroke="rgba(0,0,0,0.08)" stroke-width="4.5" fill="none"></circle>
                    <circle cx="24" cy="24" r="18.5" [attr.stroke]="labColor" stroke-width="4.5" fill="none" stroke-dasharray="116.2" [attr.stroke-dashoffset]="labStrokeDashoffset" stroke-linecap="round"></circle>
                  </svg>
                  <div class="donut-center">
                    <span class="donut-pct">{{ labPercentage() }}</span>
                    <span class="donut-lbl">pts</span>
                  </div>
                </div>
                <span class="mcl-item-sub">Score / Semáforo de riesgo</span>
              </div>

              <!-- C. Micro Bar Equalizer -->
              <div class="mcl-item" [style.background]="labBgTint">
                <span class="mcl-item-title">Micro Bar Equalizer</span>
                <div class="micro-bars-box" style="height: 38px;">
                  <div class="mbar" [style.background]="labColor + '55'" style="height: 30%"></div>
                  <div class="mbar" [style.background]="labColor + '88'" style="height: 55%"></div>
                  <div class="mbar" [style.background]="labColor" [style.height.%]="labPercentage()"></div>
                  <div class="mbar" [style.background]="labColor + 'bb'" style="height: 45%"></div>
                </div>
                <span class="mcl-item-sub">Frecuencia / Actividad mensual</span>
              </div>

              <!-- D. Vector Sparkline -->
              <div class="mcl-item" [style.background]="labBgTint">
                <span class="mcl-item-title">Vector Sparkline</span>
                <div class="micro-spark-box" style="width: 78px; height: 38px;">
                  <svg class="spark-svg" viewBox="0 0 64 32" style="width: 78px; height: 38px;">
                    <path d="M 2,24 Q 14,28 26,16 T 50,10 T 62,4" fill="none" [attr.stroke]="labColor" stroke-width="2.5" stroke-linecap="round"></path>
                    <circle cx="62" cy="4" r="3" [attr.fill]="labColor" stroke="#FFFFFF" stroke-width="1.5"></circle>
                  </svg>
                </div>
                <span class="mcl-item-sub">Tendencia histórica (6 meses)</span>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════
           PESTAÑA 5: oefa-search-hero
      ══════════════════════════════════════════════════════ -->
      @if (activeTab() === 'search-hero') {
        <div class="proto-info-bar">
          <span class="proto-tag">Molécula Global</span>
          <span class="proto-dest">→ <code>shared/components/search-hero/</code></span>
          <span class="proto-status pending">⏳ En maquetación</span>
        </div>

        <div class="proto-section">
          <p class="proto-desc">Buscador prominente de cabecera con banner institucional, campo de búsqueda integrado, botón de acción y sugerencias rápidas. Diseñado para portales <code>POR-*</code> y <code>DAT-*</code>.</p>

          <div class="search-hero-proto">
            <div class="sh-banner">
              <div class="sh-banner-bg"></div>
              <div class="sh-content">
                <div class="sh-badge">Portal de Inteligencia de Negocios · OEFA</div>
                <h2 class="sh-title">Datos hoy,<br>decisiones acertadas.</h2>
                <p class="sh-subtitle">Explora los tableros de fiscalización, monitoreo ambiental y metas institucionales.</p>

                <div class="sh-search-bar">
                  <div class="sh-search-input-wrap">
                    <svg class="sh-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                      type="text"
                      class="sh-input"
                      placeholder="Busca tableros, informes, indicadores..."
                      [(ngModel)]="searchQuery"
                      (keyup.enter)="runSearch()"
                      aria-label="Buscador de tableros"
                    />
                    @if (searchQuery) {
                      <button class="sh-clear-btn" (click)="searchQuery = ''" aria-label="Limpiar búsqueda">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    }
                  </div>
                  <button class="sh-btn" (click)="runSearch()">Buscar</button>
                </div>

                <div class="sh-suggestions">
                  <span class="sh-suggestions-label">Ejemplos:</span>
                  @for (sug of searchSuggestions; track sug) {
                    <button class="sh-suggestion-chip" (click)="searchQuery = sug">{{ sug }}</button>
                  }
                </div>
              </div>
            </div>

            @if (searchQuery) {
              <div class="sh-results-preview">
                <span class="sh-results-label">Mostrando resultados para: <strong>"{{ searchQuery }}"</strong></span>
                <div class="fr-dummy-list">
                  @for (i of [1,2,3]; track i) {
                    <div class="fr-dummy-item">
                      <div class="placeholder-line w-75"></div>
                      <div class="placeholder-line w-50"></div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    /* ──────────────── SANDBOX BASE & M3 EXPRESSIVE TOKENS ──────────────── */
    :host {
      --oefa-ease-emphasized: cubic-bezier(0.2, 0.0, 0.0, 1.0);
      --oefa-ease-emphasized-decel: cubic-bezier(0.05, 0.7, 0.1, 1.0);
      --oefa-ease-emphasized-accel: cubic-bezier(0.3, 0.0, 0.8, 0.15);
      --oefa-ease-standard: cubic-bezier(0.2, 0.0, 0.0, 1.0);
      --oefa-duration-short: 150ms;
      --oefa-duration-medium: 300ms;
      --oefa-duration-long: 500ms;
    }

    .sandbox-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .sandbox-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .sandbox-header h2 { margin: 0 0 4px 0; font-size: 1.25rem; font-family: 'Poppins', sans-serif; font-weight: 700; color: #0f172a; }

    .subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin: 4px 0 0 0;
      max-width: 860px;
      line-height: 1.5;
    }

    .sandbox-badge {
      background: #fef3c7;
      color: #92400e;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid #fde68a;
      white-space: nowrap;
    }

    /* ──────────────── TABS ──────────────── */
    .sandbox-tabs {
      display: flex;
      gap: 4px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0;
      flex-wrap: wrap;
    }

    .sandbox-tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #64748b;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      border-radius: 6px 6px 0 0;
      transition: all 0.15s ease;
      white-space: nowrap;

      &:hover {
        color: #144aa7;
        background: #eef4ff;
      }

      &.active {
        color: #144aa7;
        font-weight: 700;
        border-bottom-color: #144aa7;
        background: #eef4ff;
      }
    }

    .tab-icon { font-size: 0.9rem; }
    .tab-label { font-size: 0.8125rem; }

    .tab-new-badge {
      font-size: 0.625rem;
      font-weight: 800;
      background: #44bfb5;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.03em;
    }

    /* ──────────────── PROTO HEADER BAR ──────────────── */
    .proto-info-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.8125rem;
    }

    .proto-tag {
      background: #dbeafe;
      color: #1d4ed8;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .proto-dest { color: #475569; }
    .proto-dest code { background: #f1f5f9; padding: 1px 5px; border-radius: 3px; font-size: 0.75rem; }

    .proto-status.pending {
      margin-left: auto;
      color: #0369a1;
      background: #e0f2fe;
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .proto-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .proto-desc {
      font-size: 0.875rem;
      color: #475569;
      margin: 0;
      padding: 12px 16px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      line-height: 1.5;
    }

    .proto-variant-title {
      font-size: 0.9375rem;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    /* ═══════════════════════════════════════════════════
       NUEVAS CATALOG CARDS BENTO (PESTAÑA 2)
    ══════════════════════════════════════════════════════ */
    .bento-catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .bento-catalog-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      box-shadow: 0 8px 24px -6px rgba(15, 23, 42, 0.04);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  border-color var(--oefa-duration-short) var(--oefa-ease-standard);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 36px -8px rgba(20, 74, 167, 0.12);
        border-color: #cbd5e1;
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
      background: white;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }

    .bcc-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
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
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.35;
    }

    .bcc-description {
      margin: 0;
      font-size: 0.8125rem;
      color: #64748b;
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
      background: #f1f5f9;
      color: #475569;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .bcc-footer {
      padding-top: 14px;
      border-top: 1px solid #f1f5f9;
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
      color: #94a3b8;
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
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
    }

    .mini-bar-fill {
      height: 100%;
      border-radius: 999px;
    }

    .mini-pulse-wrap {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    .bcc-time {
      font-size: 0.6875rem;
      color: #94a3b8;
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
      border-radius: 10px;
      transition: all 0.15s ease;

      &:hover {
        transform: translateX(2px);
        filter: brightness(0.95);
      }
    }

    /* Formato Horizontal Bento */
    .bento-horizontal-card {
      background: #f8faff;
      border: 1px solid #dbeafe;
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      justify-content: space-between;
      box-shadow: 0 8px 24px rgba(20, 74, 167, 0.03);

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .bhc-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bhc-icon-badge {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bhc-icon {
      width: 44px;
      height: 44px;
      background: #144aa7;
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .bhc-pill {
      font-size: 0.6875rem;
      font-weight: 700;
      background: #dbeafe;
      color: #1e40af;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .bhc-title {
      margin: 4px 0 0 0;
      font-family: 'Poppins', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
    }

    .bhc-desc {
      margin: 0;
      font-size: 0.8125rem;
      color: #64748b;
      line-height: 1.5;
    }

    .bhc-stats-row {
      display: flex;
      gap: 20px;
      margin-top: 4px;
    }

    .bhc-stat {
      display: flex;
      flex-direction: column;
    }

    .bhc-stat-val {
      font-family: 'Poppins', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #0f172a;
    }

    .bhc-stat-lbl {
      font-size: 0.6875rem;
      color: #64748b;
    }

    .bhc-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      min-width: 220px;
    }

    .bhc-spark-box {
      width: 100%;
      background: white;
      padding: 10px 14px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bhc-spark-svg {
      width: 100%;
      height: 38px;
    }

    .bhc-action-btn {
      background: #144aa7;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.8125rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s ease;

      &:hover { background: #0f3984; }
    }

    /* ═══════════════════════════════════════════════════
       NUEVOS BENTO KPI & CATEGORY TILES (PESTAÑA 4)
    ═══════════════════════════════════════════════════ */
    .bento-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }

    .bento-kpi-card {
      border-radius: 20px;
      padding: 20px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.1);
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
      background: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      flex-shrink: 0;
    }

    .bkc-sector {
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 700;
      color: #64748b;
    }

    .bkc-title {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.35;
    }

    .bkc-trend-pill {
      font-size: 0.6875rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 8px;
      border-radius: 999px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .bkc-body {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      margin-top: 4px;
    }

    .bkc-metric-num {
      font-family: 'Poppins', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1;
    }

    .bkc-metric-desc {
      margin: 6px 0 0 0;
      font-size: 0.75rem;
      color: #475569;
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

    /* Micro Charts */
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
      color: #0f172a;
      line-height: 1;
    }

    .donut-lbl {
      font-size: 0.5rem;
      color: #64748b;
      text-transform: uppercase;
    }

    .micro-bars-box {
      width: 58px;
      height: 48px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
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
      background: rgba(255, 255, 255, 0.75);
      border-radius: 10px;
      padding: 3px;
    }

    .spark-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .bkc-footer {
      padding-top: 10px;
      border-top: 1px solid rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.6875rem;
    }

    .bkc-period {
      color: #64748b;
      font-weight: 500;
    }

    .bkc-link {
      font-weight: 700;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    /* Soft Category Tiles (Sin borde lateral duro) */
    .soft-category-tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
    }

    .soft-cat-tile {
      border: none;
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -6px rgba(15, 23, 42, 0.08);
      }
    }

    .sct-icon {
      font-size: 1.4rem;
      width: 38px;
      height: 38px;
      background: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .sct-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sct-label {
      font-family: 'Poppins', sans-serif;
      font-size: 0.8125rem;
      font-weight: 700;
      color: #0f172a;
    }

    .sct-count {
      font-size: 0.6875rem;
      color: #64748b;
    }

    .sct-arrow {
      font-weight: 700;
      font-size: 0.875rem;
    }

    /* ═══════════════════════════════════════════════════
       ESTILOS DEL LABORATORIO DE MOTION M3 EXPRESSIVE
    ═══════════════════════════════════════════════════════ */
    .motion-compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .motion-card-demo {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);

      &.expressive {
        border-color: #bfdbfe;
        background: #fbfdff;
      }
    }

    .mcd-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h5 {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9375rem;
        font-weight: 700;
        color: #0f172a;
      }
    }

    .mcd-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;

      &.generic {
        background: #f1f5f9;
        color: #64748b;
      }
      &.m3 {
        background: #dbeafe;
        color: #1e40af;
      }
    }

    .mcd-desc {
      margin: 0;
      font-size: 0.8125rem;
      color: #64748b;
      line-height: 1.4;
    }

    .mcd-interactive-box {
      height: 90px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.875rem;
      user-select: none;
      border: 1px dashed #cbd5e1;

      &.classic-box {
        background: #f8fafc;
        color: #475569;
        transition: all 0.2s ease;

        &:hover {
          background: #e2e8f0;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
      }

      &.m3-box {
        background: #eef4ff;
        color: #144aa7;
        border-color: #93c5fd;
        transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);

        &:hover {
          background: #dbeafe;
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 32px -8px rgba(20, 74, 167, 0.2);
        }

        &:active {
          transform: translateY(-2px) scale(0.98);
          transition-duration: var(--oefa-duration-short);
        }
      }
    }

    .mcd-code-pill {
      font-size: 0.6875rem;
      color: #64748b;
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;

      &.highlight {
        background: #eff6ff;
        color: #1d4ed8;
        border-color: #bfdbfe;
      }
    }

    /* Micro-interacciones interactivas */
    .motion-interactive-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: stretch;
    }

    .motion-test-item {
      flex: 1;
      min-width: 220px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mti-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .oefa-btn-expressive {
      width: 100%;
      height: 48px;
      border-radius: 12px;
      background: #144aa7;
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(20, 74, 167, 0.2);
      transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);

      &:hover {
        background: #0d3b8c;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(20, 74, 167, 0.3);
      }

      &:active {
        transform: translateY(0) scale(0.98);
        transition-duration: var(--oefa-duration-short);
      }

      &.aqua {
        background: #44bfb5;
        color: #064e4a;
        box-shadow: 0 4px 12px rgba(68, 191, 181, 0.25);

        &:hover {
          background: #38a89f;
          box-shadow: 0 8px 20px rgba(68, 191, 181, 0.35);
        }
      }
    }

    .bento-card-expressive {
      height: 100%;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      box-shadow: 0 6px 18px -4px rgba(15, 23, 42, 0.03);
      transition: all var(--oefa-duration-medium) var(--oefa-ease-emphasized);

      &:hover {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 16px 32px -8px rgba(20, 74, 167, 0.1);
        border-color: #93c5fd;

        .bce-icon {
          transform: rotate(8deg) scale(1.12);
        }
      }

      &:active {
        transform: scale(0.99);
      }
    }

    .bce-icon {
      font-size: 1.75rem;
      width: 44px;
      height: 44px;
      background: #fef3c7;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized);
      flex-shrink: 0;
    }

    .bce-content {
      flex: 1;

      h5 {
        margin: 0 0 4px 0;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9375rem;
        font-weight: 700;
        color: #0f172a;
      }

      p {
        margin: 0;
        font-size: 0.8125rem;
        color: #64748b;
        line-height: 1.4;
      }
    }

    .bce-chip {
      font-size: 0.6875rem;
      font-weight: 700;
      background: #eff6ff;
      color: #1d4ed8;
      padding: 4px 8px;
      border-radius: 6px;
      flex-shrink: 0;
    }

    /* Tabla de tokens explicativa */
    .motion-tokens-table-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px 24px;
      margin-top: 12px;

      h4 {
        margin: 0 0 14px 0;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9375rem;
        font-weight: 700;
        color: #0f172a;
      }
    }

    .mtt-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .mtt-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .mtt-name {
      font-family: monospace;
      font-size: 0.75rem;
      font-weight: 700;
      color: #144aa7;
    }

    .mtt-val {
      font-family: monospace;
      font-size: 0.6875rem;
      color: #64748b;
    }

    .mtt-use {
      font-size: 0.6875rem;
      color: #334155;
      margin-top: 4px;
      font-weight: 500;
    }

    /* ──────────────── STEPPER (TAB 1) ──────────────── */
    .sandbox-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: center;
      background: white;
      padding: 16px 20px;
      border-radius: 8px;
      border: 1px solid var(--oefa-border-color, #e2e8f0);
    }

    .control-group { display: flex; align-items: center; gap: 12px; }
    .control-label { font-size: 0.8125rem; font-weight: 600; color: #0f172a; }
    .step-counter-btns, .step-nav-btns { display: flex; align-items: center; gap: 8px; }

    .step-count-badge {
      font-size: 0.8125rem; font-weight: 700;
      color: var(--oefa-primary-root, #144aa7);
      background: var(--oefa-primary-container, #eef4ff);
      padding: 4px 10px; border-radius: 6px;
    }

    .preview-stage {
      margin: 0 auto; width: 100%;
      background: #f1f5f9; border: 1px solid #cbd5e1;
      border-radius: 16px; padding: 24px;
      display: flex; flex-direction: column; align-items: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .preview-stage.tablet-view { max-width: 640px; }
    .preview-stage.mobile-view { max-width: 390px; padding: 16px; }

    .device-frame-header {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      font-size: 0.75rem; font-weight: 600; color: #64748b; margin-bottom: 12px; padding: 0 4px;
    }

    .device-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }

    .device-screen-content {
      width: 100%; background: white; border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06); padding: 20px;
      display: flex; flex-direction: column; gap: 20px;
    }

    .stepper-sandbox-wrapper { display: flex; flex-direction: column; gap: 16px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
    .responsive-stepper-bar { display: flex; align-items: center; justify-content: space-between; width: 100%; }
    .step-wrapper { display: flex; align-items: center; flex: 1; &.last { flex: 0 0 auto; } }
    .step-item { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }

    .step-circle {
      width: 36px; height: 36px; border-radius: 50%;
      background: #f8fafc; border: 2px solid #cbd5e1; color: #64748b;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.875rem; font-weight: 700; flex-shrink: 0; transition: all 0.2s ease;
    }

    .step-item:hover .step-circle { border-color: #144aa7; color: #144aa7; }
    .step-item.active .step-circle { background: #144aa7; border-color: #144aa7; color: white; box-shadow: 0 0 0 4px #eef4ff; }
    .step-item.completed .step-circle { background: #144aa7; border-color: #144aa7; color: white; }

    .step-connector {
      flex: 1; height: 3px; background: #e2e8f0; margin: 0 12px; border-radius: 2px;
      transition: background 0.3s ease; &.completed { background: #144aa7; }
    }

    .step-inline-info { display: flex; flex-direction: column; gap: 2px; }
    .step-inline-title { font-size: 0.875rem; font-weight: 600; color: #475569; white-space: nowrap; transition: color 0.2s ease; }
    .step-item.active .step-inline-title { color: #144aa7; font-weight: 700; }
    .step-item.completed .step-inline-title { color: #0f172a; }
    .step-inline-desc { font-size: 0.75rem; color: #94a3b8; line-height: 1.2; max-width: 180px; }

    .stepper-sandbox-wrapper.is-mobile {
      .step-inline-info { display: none; }
      .step-connector { margin: 0 6px; }
      .mobile-active-banner { display: flex; }
    }

    .stepper-sandbox-wrapper.is-tablet {
      .responsive-stepper-bar { align-items: flex-start; }
      .step-wrapper { position: relative; flex: 1 1 0; min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; &.last { flex: 1 1 0; } }
      .step-item { width: 100%; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
      .step-inline-info { width: 100%; display: flex; flex-direction: column; align-items: center; }
      .step-inline-title { width: 100%; font-size: 0.75rem; line-height: 1.25; white-space: normal; text-align: center; padding: 0 4px; box-sizing: border-box; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.5em; }
      .step-inline-desc { display: none; }
      .step-connector { position: absolute; top: 18px; left: 50%; width: 100%; margin: 0; z-index: 1; }
      .step-circle { position: relative; z-index: 2; }
      .mobile-active-banner { display: none; }
    }

    .stepper-sandbox-wrapper.is-desktop {
      .step-inline-info { display: flex; }
      .step-inline-desc { display: block; }
      .mobile-active-banner { display: none; }
    }

    .mobile-active-banner {
      display: none; flex-direction: column; align-items: center; text-align: center;
      gap: 4px; padding: 10px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;
    }

    .mobile-badge { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.05em; color: #144aa7; }
    .mobile-title { margin: 0; font-size: 0.9375rem; font-weight: 700; color: #0f172a; }
    .mobile-desc { margin: 0; font-size: 0.8125rem; color: #64748b; }

    .dummy-step-card { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 16px; }
    .dummy-step-card h4 { margin: 0 0 6px 0; color: #334155; font-size: 0.9375rem; }
    .dummy-step-card p { margin: 0 0 12px 0; color: #64748b; font-size: 0.8125rem; }
    .dummy-form-placeholder { display: flex; flex-direction: column; gap: 8px; }
    .placeholder-line { height: 12px; background: #e2e8f0; border-radius: 4px; &.w-50 { width: 50%; } &.w-75 { width: 75%; } &.w-100 { width: 100%; } }

    /* ──────────────── FILTER SIDEBAR (TAB 3 - AVANZADO E INSTITUCIONAL & RESPONSIVE) ──────────────── */
    .fs-sim-toggle-btn {
      margin-left: auto;
      padding: 4px 10px;
      font-size: 0.6875rem;
      font-weight: 700;
      border-radius: 6px;
      border: 1px solid var(--oefa-primary-root, #144aa7);
      background: white;
      color: var(--oefa-primary-root, #144aa7);
      cursor: pointer;
      transition: all 0.15s;
      &:hover {
        background: var(--oefa-primary-root, #144aa7);
        color: white;
      }
    }

    .fs-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(11, 40, 91, 0.45);
      backdrop-filter: blur(3px);
      z-index: 1040;
      animation: fadeInBackdrop 0.22s cubic-bezier(0.2, 0, 0, 1);
    }

    @keyframes fadeInBackdrop {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .filter-sidebar-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 20px;
      align-items: start;
    }

    .filter-sidebar-proto {
      background: var(--oefa-surface, #ffffff);
      border: 1px solid var(--oefa-border-subtle, #e2e8f0);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(11, 40, 91, 0.04);
      position: sticky;
      top: 16px;
    }

    .fs-sheet-handle-bar {
      display: none;
      width: 100%;
      padding: 10px 0 4px;
      justify-content: center;
      cursor: grab;
      background: var(--oefa-surface-subtle, #f8fafc);
    }

    .fs-sheet-handle {
      width: 44px;
      height: 4px;
      border-radius: 999px;
      background: #cbd5e1;
    }

    .fs-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      border-bottom: 1px solid var(--oefa-border-subtle, #f1f5f9);
      background: var(--oefa-surface-subtle, #f8fafc);
    }

    .fs-title-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .fs-title {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      letter-spacing: -0.01em;
    }

    .fs-subtitle {
      font-size: 0.75rem;
      color: var(--oefa-text-tertiary, #64748b);
    }

    .fs-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .fs-clear-btn {
      font-size: 0.75rem;
      color: var(--oefa-primary-root, #144aa7);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.15s;
      &:hover { background: rgba(20, 74, 167, 0.08); text-decoration: none; }
    }

    .fs-close-sheet-btn {
      display: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: #e2e8f0;
      color: #475569;
      font-size: 0.8125rem;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
      &:hover { background: #cbd5e1; }
    }

    .fs-scrollable-body {
      max-height: calc(100vh - 250px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar { width: 5px; }
      &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    }

    .fs-group {
      padding: 14px 16px;
      border-bottom: 1px solid var(--oefa-border-subtle, #f1f5f9);
      &:last-child { border-bottom: none; }
    }

    .fs-section-title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .fs-group-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--oefa-text-secondary, #334155);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .fs-range-tag {
      font-size: 0.6875rem;
      font-weight: 700;
      background: var(--oefa-surface-variant, #e2e8f0);
      color: var(--oefa-text-secondary, #475569);
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Chips interactivos de estado */
    .fs-chips-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .fs-filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 8px;
      border: 1px solid var(--oefa-border-subtle, #e2e8f0);
      background: #ffffff;
      color: var(--oefa-text-secondary, #475569);
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.2, 0, 0, 1);

      &:hover {
        border-color: var(--oefa-primary-container-hc, #bfdbfe);
        background: var(--oefa-surface-subtle, #f8fafc);
      }

      &.active {
        background: var(--oefa-primary-container, #dbeafe);
        border-color: var(--oefa-primary-root, #144aa7);
        color: var(--oefa-primary-on-container, #0b285b);
        font-weight: 700;
        box-shadow: 0 1px 3px rgba(20, 74, 167, 0.12);
      }
    }

    .fs-chip-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      display: inline-block;
      &.dot-EN_PROCESO { background: var(--oefa-primary-root, #144aa7); }
      &.dot-OBSERVADO { background: var(--oefa-tertiary-ui-safe, #d97706); }
      &.dot-FINALIZADO { background: var(--oefa-success-ui-safe, #16a34a); }
    }

    /* Rango de Fechas */
    .fs-date-range-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .fs-date-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .fs-mini-lbl {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--oefa-text-tertiary, #64748b);
    }

    .fs-input-with-icon {
      position: relative;
      display: flex;
      align-items: center;

      .fs-field-icon {
        position: absolute;
        left: 8px;
        color: #94a3b8;
        pointer-events: none;
      }

      .fs-date-input {
        width: 100%;
        font-size: 0.75rem;
        color: #1e293b;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 5px 6px 5px 26px;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
        &:focus {
          border-color: #144aa7;
          box-shadow: 0 0 0 2px rgba(20, 74, 167, 0.15);
        }
      }
    }

    /* Rango Numérico (UIT) */
    .fs-range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .fs-range-col {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 4px 8px;
      flex: 1;
      gap: 4px;

      &:focus-within {
        border-color: #144aa7;
        box-shadow: 0 0 0 2px rgba(20, 74, 167, 0.15);
      }

      .fs-unit-prefix {
        font-size: 0.6875rem;
        font-weight: 600;
        color: #94a3b8;
      }

      .fs-num-input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.75rem;
        font-weight: 600;
        color: #1e293b;
        background: transparent;
        &::-webkit-inner-spin-button { appearance: none; }
      }
    }

    .fs-range-sep {
      color: #94a3b8;
      font-size: 0.75rem;
    }

    .fs-slider-wrap {
      padding: 4px 2px 0;
      .fs-dual-slider {
        width: 100%;
        accent-color: #144aa7;
        height: 4px;
        cursor: pointer;
      }
    }

    /* Grupos de Acordeón y Búsqueda interna */
    .fs-group-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 0 6px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      transition: opacity 0.15s;
      &:hover { opacity: 0.8; }
    }

    .fs-chevron {
      flex-shrink: 0;
      transition: transform 0.2s ease;
      color: #94a3b8;
      &.open { transform: rotate(180deg); }
    }

    .fs-search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 8px;
      background: var(--oefa-surface-subtle, #f8fafc);
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 8px;
      svg { color: #94a3b8; flex-shrink: 0; }
      .fs-search-input {
        border: none;
        background: transparent;
        outline: none;
        font-size: 0.75rem;
        color: #1e293b;
        width: 100%;
        &::placeholder { color: #94a3b8; }
      }
    }

    .fs-group-options {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 160px;
      overflow-y: auto;
      padding-right: 4px;
      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    }

    .fs-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 6px;
      border-radius: 6px;
      cursor: pointer;
      color: #475569;
      transition: background 0.1s;
      &:hover { background: #f8fafc; }
    }

    .fs-checkbox {
      width: 15px;
      height: 15px;
      accent-color: #144aa7;
      cursor: pointer;
      flex-shrink: 0;
      border-radius: 4px;
    }

    .fs-option-label {
      flex: 1;
      font-size: 0.78125rem;
    }

    .fs-option-count {
      font-size: 0.6875rem;
      font-weight: 600;
      color: #94a3b8;
      font-variant-numeric: tabular-nums;
    }

    /* Switches booleanos */
    .fs-toggles-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .fs-toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 3px 0;
      .fs-toggle-text {
        font-size: 0.78125rem;
        font-weight: 500;
        color: #334155;
      }
    }

    .oefa-switch-wrap {
      position: relative;
      width: 36px;
      height: 20px;
      display: inline-block;

      .oefa-switch-input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .oefa-switch-slider {
        position: absolute;
        inset: 0;
        cursor: pointer;
        background: #cbd5e1;
        border-radius: 999px;
        transition: background 0.2s cubic-bezier(0.2, 0, 0, 1);

        &:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
      }

      .oefa-switch-input:checked + .oefa-switch-slider {
        background: #144aa7;
        &:before { transform: translateX(16px); }
      }
    }

    /* Footer fijo */
    .fs-sticky-footer {
      padding: 12px 16px;
      border-top: 1px solid var(--oefa-border-subtle, #f1f5f9);
      background: var(--oefa-surface, #ffffff);
      display: flex;
      gap: 8px;
    }

    /* Mobile Trigger Bar & Results Area */
    .fs-mobile-trigger-bar {
      display: none;
    }

    .fs-mobile-trigger-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      box-shadow: 0 2px 6px rgba(11, 40, 91, 0.05);
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        border-color: #144aa7;
      }

      &:active {
        transform: scale(0.99);
      }
    }

    .fs-mtb-left {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--oefa-primary-root, #144aa7);
    }

    .fs-mtb-badge {
      font-size: 0.75rem;
      font-weight: 700;
      background: var(--oefa-primary-root, #144aa7);
      color: white;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .filter-results-area {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .fr-header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: white;
      padding: 14px 18px;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
    }

    .fr-count-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8125rem;
      color: #475569;
    }

    .fr-total-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: #144aa7;
      background: #eff6ff;
      padding: 3px 10px;
      border-radius: 6px;
    }

    .fr-active-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .fr-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      background: #f1f5f9;
      color: #334155;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    .fr-chip-remove {
      background: none;
      border: none;
      font-size: 0.875rem;
      line-height: 1;
      cursor: pointer;
      color: #94a3b8;
      padding: 0;
      display: flex;
      align-items: center;
      &:hover { color: #ef4444; }
    }

    .fr-results-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .fr-result-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(11, 40, 91, 0.06);
        border-color: #cbd5e1;
      }
    }

    .frc-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .frc-meta {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .frc-code {
      font-size: 0.75rem;
      font-weight: 700;
      font-family: monospace;
      color: #144aa7;
      letter-spacing: 0.02em;
    }

    .frc-date {
      font-size: 0.6875rem;
      color: #94a3b8;
    }

    .frc-title {
      font-size: 0.9375rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
      line-height: 1.35;
    }

    .frc-desc {
      font-size: 0.8125rem;
      color: #475569;
      margin: 0;
      line-height: 1.45;
    }

    .frc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid #f8fafc;
      font-size: 0.75rem;
      color: #64748b;
    }

    .frc-unit-tag {
      color: #334155;
      strong { color: #0f172a; font-weight: 700; }
    }

    .frc-region {
      font-size: 0.6875rem;
      color: #94a3b8;
    }

    /* ── REGLAS MOBILE (REAL Y SIMULACIÓN) ── */
    @media (max-width: 900px) {
      .filter-sidebar-layout {
        grid-template-columns: 1fr;
      }

      .fs-mobile-trigger-bar {
        display: block;
      }

      .filter-sidebar-proto {
        position: fixed;
        inset: auto 0 0 0;
        z-index: 1050;
        border-radius: 20px 20px 0 0;
        max-height: 88vh;
        box-shadow: 0 -8px 32px rgba(11, 40, 91, 0.22);
        transform: translateY(105%);
        transition: transform 0.32s cubic-bezier(0.2, 0, 0, 1);

        &.mobile-open {
          transform: translateY(0);
        }

        .fs-sheet-handle-bar {
          display: flex;
        }

        .fs-close-sheet-btn {
          display: inline-flex;
        }

        .fs-scrollable-body {
          max-height: calc(88vh - 140px);
        }
      }
    }

    /* Simulación interactiva dentro del sandbox */
    .filter-sidebar-layout.mobile-simulated {
      grid-template-columns: 1fr;
      max-width: 440px;
      margin: 0 auto;
      border: 2px dashed #94a3b8;
      border-radius: 20px;
      padding: 16px;
      background: #f8fafc;

      .fs-mobile-trigger-bar {
        display: block;
      }

      .filter-sidebar-proto {
        position: fixed;
        inset: auto 0 0 0;
        z-index: 1050;
        border-radius: 20px 20px 0 0;
        max-height: 88vh;
        box-shadow: 0 -8px 32px rgba(11, 40, 91, 0.22);
        transform: translateY(105%);
        transition: transform 0.32s cubic-bezier(0.2, 0, 0, 1);

        &.mobile-open {
          transform: translateY(0);
        }

        .fs-sheet-handle-bar {
          display: flex;
        }

        .fs-close-sheet-btn {
          display: inline-flex;
        }

        .fs-scrollable-body {
          max-height: calc(88vh - 140px);
        }
      }
    }

    /* ──────────────── SEARCH HERO (TAB 5) ──────────────── */
    .search-hero-proto {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .sh-banner {
      position: relative;
      padding: 40px 32px 36px;
      background: linear-gradient(135deg, #0B285B 0%, #144AA7 50%, #1B65E4 100%);
      overflow: hidden;
    }

    .sh-banner-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 80% 20%, rgba(68, 191, 181, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%);
      pointer-events: none;
    }

    .sh-content {
      position: relative;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sh-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .sh-title {
      margin: 0;
      font-size: 2rem;
      font-weight: 800;
      color: white;
      line-height: 1.2;
    }

    .sh-subtitle {
      margin: 0;
      font-size: 0.9375rem;
      color: rgba(255,255,255,0.75);
      line-height: 1.5;
    }

    .sh-search-bar { display: flex; gap: 0; margin-top: 4px; }

    .sh-search-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      background: white;
      border-radius: 10px 0 0 10px;
      padding: 0 12px;
      gap: 10px;
    }

    .sh-search-icon { color: #94a3b8; flex-shrink: 0; }

    .sh-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.9375rem;
      color: #0f172a;
      background: transparent;
      padding: 14px 0;
      &::placeholder { color: #94a3b8; }
    }

    .sh-clear-btn {
      background: none; border: none; cursor: pointer;
      color: #94a3b8; padding: 4px;
      &:hover { color: #475569; }
    }

    .sh-btn {
      padding: 14px 24px;
      background: #44bfb5;
      color: white;
      font-size: 0.9375rem;
      font-weight: 700;
      border: none;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s;
      &:hover { background: #2ea89f; }
    }

    .sh-suggestions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .sh-suggestions-label { font-size: 0.8125rem; color: rgba(255,255,255,0.6); }

    .sh-suggestion-chip {
      font-size: 0.8125rem;
      color: rgba(255,255,255,0.85);
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.15s;
      &:hover { background: rgba(255,255,255,0.22); color: white; }
    }

    .sh-results-preview {
      padding: 20px 24px;
      background: white;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sh-results-label { font-size: 0.875rem; color: #475569; }

    /* ═══════════════════════════════════════════════════
       LABORATORIO DE MICRO-GRÁFICOS REUTILIZABLES
    ═══════════════════════════════════════════════════ */
    .microchart-lab-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .mcl-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
    }

    .mcl-control-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mcl-label {
      font-size: 0.8125rem;
      color: #475569;
      font-weight: 500;
    }

    .mcl-slider {
      width: 220px;
      accent-color: var(--oefa-primary-root);
      cursor: pointer;
    }

    .mcl-palette-btns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .mcl-palette-btn {
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      background: white;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s var(--oefa-ease-standard);

      &.active {
        border-color: var(--oefa-primary-root);
        background: var(--oefa-primary-container);
        color: var(--oefa-primary-on-container);
        box-shadow: 0 2px 8px rgba(20, 74, 167, 0.12);
      }

      &:hover:not(.active) {
        background: #f8fafc;
        border-color: #cbd5e1;
      }
    }

    .mcl-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .mcl-item {
      border: 0px solid rgba(0, 0, 0, 0.06);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      text-align: center;
      transition: transform var(--oefa-duration-medium) var(--oefa-ease-emphasized),
                  box-shadow var(--oefa-duration-medium) var(--oefa-ease-emphasized);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
      }
    }

    .mcl-item-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: #334155;
      letter-spacing: 0.02em;
    }

    .mcl-item-sub {
      font-size: 0.6875rem;
      color: #64748b;
    }
  `]
})
export class SandboxViewComponent {

  activeTab = signal<SandboxTab>('category-tile');

  tabs: { id: SandboxTab; icon: string; label: string; isNew?: boolean }[] = [
    { id: 'category-tile', icon: '✨', label: 'Bento KPI Tiles', isNew: true },
    { id: 'catalog-card', icon: '🗂️', label: 'Catalog Cards Bento', isNew: true },
    { id: 'motion', icon: '⚡', label: 'Motion M3 Lab', isNew: true },
    { id: 'filter-sidebar', icon: '🔽', label: 'Filter Sidebar' },
    { id: 'search-hero', icon: '🔍', label: 'Search Hero' },
    { id: 'stepper', icon: '📶', label: 'Stepper Responsive' },
  ];

  /* ── STEPPER ── */
  currentViewport = signal<string>('mobile');
  currentStep = signal<number>(2);

  viewportOptions: SegmentedOption[] = [
    { value: 'desktop', label: '🖥️ Desktop' },
    { value: 'tablet', label: '📱 Tablet' },
    { value: 'mobile', label: '📱 Móvil' }
  ];

  steps = signal<SandboxStep[]>([
    { title: 'Datos Principales', description: 'Información general de la solicitud' },
    { title: 'Detalle de Ítems', description: 'Lista de entregables, montos y especificaciones' },
    { title: 'Documentación', description: 'Adjuntar archivos y sustentos técnicos' },
    { title: 'Confirmación', description: 'Revisión final y firma electrónica' }
  ]);

  next(): void { if (this.currentStep() < this.steps().length) this.currentStep.update(s => s + 1); }
  prev(): void { if (this.currentStep() > 1) this.currentStep.update(s => s - 1); }
  goToStep(step: number): void { this.currentStep.set(step); }

  addStep(): void {
    const idx = this.steps().length + 1;
    this.steps.update(steps => [...steps, { title: `Paso ${idx}`, description: `Descripción de prueba para el paso ${idx}` }]);
  }

  removeStep(): void {
    if (this.steps().length > 2) {
      this.steps.update(steps => steps.slice(0, -1));
      if (this.currentStep() > this.steps().length) this.currentStep.set(this.steps().length);
    }
  }

  /* ── MICRO-CHART LAB CONTROLS (DEMO REUTILIZABLE) ── */
  labPercentage = signal<number>(72);
  labColorVariant = signal<'primary' | 'secondary' | 'tertiary' | 'success'>('primary');

  get labColor(): string {
    switch (this.labColorVariant()) {
      case 'primary': return 'var(--oefa-primary-root)';
      case 'secondary': return 'var(--oefa-secondary-ui-safe)';
      case 'tertiary': return 'var(--oefa-tertiary-ui-safe)';
      case 'success': return 'var(--oefa-success-ui-safe)';
    }
  }

  get labBgTint(): string {
    switch (this.labColorVariant()) {
      case 'primary': return 'var(--oefa-primary-container)';
      case 'secondary': return 'var(--oefa-secondary-container)';
      case 'tertiary': return 'color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)';
      case 'success': return 'var(--oefa-success-container)';
    }
  }

  get labStrokeDashoffset(): number {
    const circumference = 116.24; // 2 * pi * 18.5
    return circumference - (circumference * this.labPercentage() / 100);
  }

  /* ── BENTO KPI TILES (DERIVADOS ESTRICTOS DE TOKENS OEFA) ── */
  bentoKpis: BentoKpiTile[] = [
    {
      sector: 'Sector Supervisión',
      title: 'Fiscalización Directa',
      value: '1,248',
      metricLabel: 'Actas en campo',
      trendLabel: '+8.4% este mes',
      periodLabel: 'Periodo anual 2024',
      badgeIcon: 'trending_up',
      icon: 'factory',
      iconColor: 'var(--oefa-primary-on-container)',
      bgTint: 'var(--oefa-primary-container)',
      borderTint: 'var(--oefa-primary-container-hc)',
      accentColor: 'var(--oefa-primary-root)',
      chip: { variant: 'project', label: 'PRY-2024' },
      status: 'EN_PROCESO',
      chartType: 'donut',
      percentage: 75
    },
    {
      sector: 'Evaluación Ambiental',
      title: 'Monitoreo de Agua',
      value: '3,842',
      metricLabel: 'Muestras en cuencas',
      trendLabel: 'Óptimo',
      periodLabel: '24 Regiones evaluadas',
      badgeIcon: 'check_circle',
      icon: 'droplets',
      iconColor: 'var(--oefa-secondary-on-container)',
      bgTint: 'var(--oefa-secondary-container)',
      borderTint: 'var(--oefa-secondary-container-hc)',
      accentColor: 'var(--oefa-secondary-ui-safe)',
      chip: { variant: 'area', label: 'DEAM' },
      status: 'FINALIZADO',
      chartType: 'gauge',
      percentage: 85
    },
    {
      sector: 'DFAI / Sancionador',
      title: 'Procedimientos PAS',
      value: '456',
      metricLabel: 'Expedientes activos',
      trendLabel: 'En curso',
      periodLabel: '92% resueltos a tiempo',
      badgeIcon: 'update',
      icon: 'scale',
      iconColor: 'var(--oefa-tertiary-on-container)',
      bgTint: 'color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)',
      borderTint: 'var(--oefa-tertiary-container-hc)',
      accentColor: 'var(--oefa-tertiary-ui-safe)',
      chip: { variant: 'siged', label: 'EXP-0491' },
      status: 'OBSERVADO',
      chartType: 'bars'
    },
    {
      sector: 'Gestión Institucional',
      title: 'Metas POI / PLANEFA',
      value: '94.2%',
      metricLabel: 'Cumplimiento anual',
      trendLabel: 'Alto nivel',
      periodLabel: '1,840 EFA fiscalizadas',
      badgeIcon: 'auto_graph',
      icon: 'leaf',
      iconColor: 'var(--oefa-success-on-container)',
      bgTint: 'var(--oefa-success-container)',
      borderTint: 'var(--oefa-success-container-hc)',
      accentColor: 'var(--oefa-success-ui-safe)',
      chip: { variant: 'deliverable', label: 'ENT-Q3' },
      status: 'POR_INICIAR',
      chartType: 'sparkline'
    }
  ];

  /* ── CATALOG CARDS BENTO MODERNAS CON CHIPS Y TOKENS OEFA ── */
  catalogCards: CatalogCard[] = [
    {
      icon: 'pickaxe',
      iconColor: 'var(--oefa-primary-on-container)',
      title: 'Supervisión a Gran y Mediana Minería',
      description: 'Monitoreo en tiempo real de compromisos socioambientales, infracciones y actas directas de fiscalización.',
      tags: ['Supervisión 2024', 'Mediana Minería', 'Nacional'],
      chips: [
        { variant: 'project', label: 'PRY-2024' },
        { variant: 'area', label: 'DSUP' }
      ],
      status: 'EN_PROCESO',
      type: 'Misional • Minería',
      typeColor: 'var(--oefa-primary-root)',
      color: 'var(--oefa-primary-root)',
      bgTint: 'var(--oefa-primary-container)',
      borderTint: 'var(--oefa-primary-container-hc)',
      activityType: 'sparkline',
      activityLabel: 'Uso semanal',
      updatedAt: 'Hace 2d'
    },
    {
      icon: 'waves',
      iconColor: 'var(--oefa-secondary-on-container)',
      title: 'Vigilancia de Calidad de Recursos Hídricos',
      description: 'Parámetros fisicoquímicos, metales pesados y estaciones automáticas de monitoreo en cuencas priorizadas.',
      tags: ['Sensores IoT', 'Laboratorio', 'Ríos y Lagos'],
      chips: [
        { variant: 'maintenance', label: 'MNT-CUENCA' },
        { variant: 'area', label: 'DEAM' }
      ],
      status: 'FINALIZADO',
      type: 'Estratégico • Cuencas',
      typeColor: 'var(--oefa-secondary-ui-safe)',
      color: 'var(--oefa-secondary-ui-safe)',
      bgTint: 'var(--oefa-secondary-container)',
      borderTint: 'var(--oefa-secondary-container-hc)',
      activityType: 'bar',
      activityLabel: 'Transmisión 98%',
      updatedAt: 'En vivo'
    },
    {
      icon: 'scale',
      iconColor: 'var(--oefa-tertiary-on-container)',
      title: 'Procedimientos Sancionadores (PAS) y Multas',
      description: 'Seguimiento del estado de expedientes, resoluciones de sanción, medidas cautelares y efectividad de cobranza.',
      tags: ['Sancionador', 'Tribunal TFA', 'Cobranza'],
      chips: [
        { variant: 'siged', label: 'EXP-0491-2024' },
        { variant: 'area', label: 'DFAI' }
      ],
      status: 'OBSERVADO',
      type: 'Misional • Jurídico',
      typeColor: 'var(--oefa-tertiary-ui-safe)',
      color: 'var(--oefa-tertiary-ui-safe)',
      bgTint: 'color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)',
      borderTint: 'var(--oefa-tertiary-container-hc)',
      activityType: 'sparkline',
      activityLabel: 'Resolución',
      updatedAt: 'Hoy'
    },
    {
      icon: 'clipboard-check',
      iconColor: 'var(--oefa-success-on-container)',
      title: 'Cumplimiento de Metas Físicas PLANEFA',
      description: 'Evaluación del desempeño de las Entidades de Fiscalización Ambiental (EFA) según lineamientos nacionales.',
      tags: ['EFA', 'PLANEFA', 'Gestión POI'],
      chips: [
        { variant: 'deliverable', label: 'ENT-Q3' },
        { variant: 'area', label: 'OPE' }
      ],
      status: 'POR_INICIAR',
      type: 'Apoyo • Gestión',
      typeColor: 'var(--oefa-success-ui-safe)',
      color: 'var(--oefa-success-ui-safe)',
      bgTint: 'var(--oefa-success-container)',
      borderTint: 'var(--oefa-success-container-hc)',
      activityType: 'pulse',
      activityLabel: 'En línea',
      updatedAt: 'Hace 1h'
    }
  ];

  /* ── CATEGORY TILES (FILLS SUAVES DERIVADOS DE TOKENS OEFA) ── */
  categoryTiles: CategoryTile[] = [
    { icon: 'factory', label: 'Fiscalización', count: 12, color: 'var(--oefa-primary-root)', iconColor: 'var(--oefa-primary-on-container)', bgTint: 'var(--oefa-primary-container)' },
    { icon: 'leaf', label: 'Medio Ambiente', count: 8, color: 'var(--oefa-success-ui-safe)', iconColor: 'var(--oefa-success-on-container)', bgTint: 'var(--oefa-success-container)' },
    { icon: 'clipboard-list', label: 'Planificación POI', count: 6, color: 'var(--oefa-secondary-ui-safe)', iconColor: 'var(--oefa-secondary-on-container)', bgTint: 'var(--oefa-secondary-container)' },
    { icon: 'scale', label: 'Sancionatorio PAS', count: 5, color: 'var(--oefa-tertiary-ui-safe)', iconColor: 'var(--oefa-tertiary-on-container)', bgTint: 'color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)' },
    { icon: 'droplets', label: 'Agua y Cuencas', count: 4, color: 'var(--oefa-secondary-ui-safe)', iconColor: 'var(--oefa-secondary-on-container)', bgTint: 'var(--oefa-secondary-container)' },
    { icon: 'users', label: 'Atención Ciudadana', count: 3, color: 'var(--oefa-primary-root)', iconColor: 'var(--oefa-primary-on-container)', bgTint: 'var(--oefa-primary-container)' },
    { icon: 'layout-dashboard', label: 'Centro de Mando', count: 7, color: 'var(--oefa-error-root)', iconColor: 'var(--oefa-error-on-container)', bgTint: 'var(--oefa-error-container)' },
    { icon: 'map-pin', label: 'Geoespacial GIS', count: 4, color: 'var(--oefa-primary-root)', iconColor: 'var(--oefa-primary-on-container)', bgTint: 'var(--oefa-surface-subtle)' },
  ];

  /* ── FILTER SIDEBAR (AVANZADO E INSTITUCIONAL) ── */
  isMobileFilterOpen = signal<boolean>(false);
  simulateMobileViewport = signal<boolean>(false);
  filterSearchQuery = signal<string>('');
  filterDateFrom = signal<string>('2024-01-01');
  filterDateTo = signal<string>('2024-12-31');
  filterAmountMin = signal<number | null>(25);
  filterAmountMax = signal<number | null>(450);
  filterStatus = signal<string>('TODOS');
  filterFlagMedidas = signal<boolean>(false);
  filterFlagAlertas = signal<boolean>(true);

  closeMobileFilter(): void {
    this.isMobileFilterOpen.set(false);
  }

  applyFiltersMobile(): void {
    this.isMobileFilterOpen.set(false);
  }

  statusFilterOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'EN_PROCESO', label: 'En Proceso' },
    { value: 'OBSERVADO', label: 'Observado' },
    { value: 'FINALIZADO', label: 'Finalizado' },
  ];

  filterGroups = signal<FilterGroup[]>([
    {
      label: 'Tema / Sector Fiscalizado',
      open: true,
      options: [
        { label: 'Fiscalización Minera', count: 14, checked: true },
        { label: 'Energía e Hidrocarburos', count: 9, checked: false },
        { label: 'Pesquería e Industria', count: 11, checked: false },
        { label: 'Residuos Sólidos', count: 7, checked: false },
        { label: 'Agricultura y Bosques', count: 5, checked: false },
      ]
    },
    {
      label: 'Tipo de Tablero',
      open: true,
      options: [
        { label: 'Misional', count: 18, checked: false },
        { label: 'Estratégico', count: 7, checked: false },
        { label: 'Apoyo', count: 6, checked: false },
      ]
    },
    {
      label: 'Frecuencia de Actualización',
      open: false,
      options: [
        { label: 'En tiempo real (IoT)', count: 4, checked: false },
        { label: 'Diario', count: 8, checked: false },
        { label: 'Semanal / Mensual', count: 12, checked: false },
      ]
    }
  ]);

  get filteredThemes(): { label: string; count: number; checked: boolean }[] {
    const q = this.filterSearchQuery().toLowerCase().trim();
    const group = this.filterGroups()[0];
    if (!group) return [];
    if (!q) return group.options;
    return group.options.filter(opt => opt.label.toLowerCase().includes(q));
  }

  toggleFilterGroup(index: number): void {
    this.filterGroups.update(groups =>
      groups.map((g, i) => i === index ? { ...g, open: !g.open } : g)
    );
  }

  toggleFilterOption(event: { groupIndex: number; optionIndex: number; checked: boolean }): void {
    this.filterGroups.update(groups =>
      groups.map((g, gi) => {
        if (gi !== event.groupIndex) return g;
        const newOpts = g.options.map((opt, oi) =>
          oi === event.optionIndex ? { ...opt, checked: event.checked } : opt
        );
        return { ...g, options: newOpts };
      })
    );
  }

  clearFilters(): void {
    this.filterGroups.update(groups =>
      groups.map(g => ({
        ...g,
        options: g.options.map(o => ({ ...o, checked: false }))
      }))
    );
    this.filterSearchQuery.set('');
    this.filterStatus.set('TODOS');
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.filterAmountMin.set(null);
    this.filterAmountMax.set(null);
    this.filterFlagMedidas.set(false);
    this.filterFlagAlertas.set(false);
  }

  removeChipFilter(chipText: string): void {
    this.filterGroups.update(groups =>
      groups.map(g => ({
        ...g,
        options: g.options.map(o => o.label === chipText ? { ...o, checked: false } : o)
      }))
    );
    if (chipText.startsWith('Estado:')) this.filterStatus.set('TODOS');
    if (chipText.startsWith('Desde:')) this.filterDateFrom.set('');
    if (chipText.startsWith('Hasta:')) this.filterDateTo.set('');
    if (chipText.startsWith('Rango:')) {
      this.filterAmountMin.set(null);
      this.filterAmountMax.set(null);
    }
    if (chipText === 'Medidas cautelares') this.filterFlagMedidas.set(false);
    if (chipText === 'Alertas críticas') this.filterFlagAlertas.set(false);
  }

  activeFiltersCount(): number {
    let count = this.filterGroups().flatMap(g => g.options).filter(o => o.checked).length;
    if (this.filterStatus() !== 'TODOS') count++;
    if (this.filterDateFrom()) count++;
    if (this.filterDateTo()) count++;
    if (this.filterAmountMin() !== null || this.filterAmountMax() !== null) count++;
    if (this.filterFlagMedidas()) count++;
    if (this.filterFlagAlertas()) count++;
    return count;
  }

  activeFilterChips(): string[] {
    const chips = this.filterGroups().flatMap(g => g.options.filter(o => o.checked).map(o => o.label));
    if (this.filterStatus() !== 'TODOS') chips.push(`Estado: ${this.filterStatus()}`);
    if (this.filterDateFrom()) chips.push(`Desde: ${this.filterDateFrom()}`);
    if (this.filterDateTo()) chips.push(`Hasta: ${this.filterDateTo()}`);
    if (this.filterAmountMin() !== null || this.filterAmountMax() !== null) {
      chips.push(`Rango: ${this.filterAmountMin() || 0} - ${this.filterAmountMax() || 'Max'} UIT`);
    }
    if (this.filterFlagMedidas()) chips.push('Medidas cautelares');
    if (this.filterFlagAlertas()) chips.push('Alertas críticas');
    return chips;
  }

  /* ── SEARCH HERO ── */
  searchQuery = '';
  searchSuggestions = ['fiscalización', 'calidad de agua', 'POI', 'PLANEFA', 'supervisión'];

  runSearch(): void {
    // query reactivo
  }
}
