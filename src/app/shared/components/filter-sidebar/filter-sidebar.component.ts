import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaButtonComponent } from '../button/button.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

export interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

export interface FilterGroupItem {
  label: string;
  open: boolean;
  options: FilterOption[];
}

export interface FilterStatusOption {
  value: string;
  label: string;
}

@Component({
  selector: 'oefa-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, OefaButtonComponent, DatePickerComponent],
  template: `
    <!-- Backdrop para Mobile Bottom Sheet -->
    @if (isOpenMobile) {
      <div class="fs-backdrop" (click)="onCloseMobile()" aria-hidden="true"></div>
    }

    <aside
      class="filter-sidebar"
      [class.mobile-open]="isOpenMobile"
      role="region"
      [attr.aria-label]="title"
    >
      <!-- Barra de arrastre exclusiva de Mobile Bottom Sheet -->
      <div class="fs-sheet-handle-bar" (click)="onCloseMobile()" aria-hidden="true">
        <span class="fs-sheet-handle"></span>
      </div>

      <!-- Header del Sidebar -->
      <div class="fs-header">
        <div class="fs-title-col">
          <span class="fs-title">{{ title }}</span>
          <span class="fs-subtitle">{{ activeCount }} criterios activos</span>
        </div>
        <div class="fs-header-actions">
          <button type="button" class="fs-clear-btn" (click)="onClear()">Limpiar todo</button>
          <button
            type="button"
            class="fs-close-sheet-btn"
            (click)="onCloseMobile()"
            aria-label="Cerrar filtros"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Cuerpo Scrolleable con Secciones de Filtro -->
      <div class="fs-scrollable-body">
        <!-- 1. Filtro Rápido por Estado -->
        @if (statusOptions && statusOptions.length > 0) {
          <div class="fs-group">
            <div class="fs-section-title-wrap">
              <span class="fs-group-label">Estado del Expediente</span>
            </div>
            <div class="fs-chips-group" role="group" aria-label="Filtrar por estado">
              @for (st of statusOptions; track st.value) {
                <button
                  type="button"
                  class="fs-filter-chip"
                  [class.active]="selectedStatus === st.value"
                  (click)="onStatusSelect(st.value)"
                  [attr.aria-pressed]="selectedStatus === st.value"
                >
                  @if (st.value !== 'TODOS') {
                    <span class="fs-chip-dot" [class]="'dot-' + st.value"></span>
                  }
                  {{ st.label }}
                </button>
              }
            </div>
          </div>
        }

        <!-- 2. Rango de Fechas -->
        @if (showDateRange) {
          <div class="fs-group">
            <div class="fs-section-title-wrap">
              <span class="fs-group-label">Periodo / Rango de Fechas</span>
            </div>
            <div class="fs-date-range-stack">
              <oefa-date-picker
                label="Desde"
                placeholder="DD/MM/AAAA"
                [ngModel]="dateFrom"
                (ngModelChange)="dateFromChange.emit($event)"
              />
              <oefa-date-picker
                label="Hasta"
                placeholder="DD/MM/AAAA"
                [ngModel]="dateTo"
                (ngModelChange)="dateToChange.emit($event)"
              />
            </div>
          </div>
        }

        <!-- 3. Rango Numérico (Monto / UIT) -->
        @if (showAmountRange) {
          <div class="fs-group">
            <div class="fs-section-title-wrap">
              <span class="fs-group-label">Monto de Sanción / Multa</span>
              <span class="fs-range-tag">{{ amountUnit }}</span>
            </div>
            <div class="fs-range-inputs">
              <div class="fs-range-col">
                <span class="fs-unit-prefix">Min</span>
                <input
                  type="number"
                  class="fs-num-input"
                  placeholder="0"
                  [ngModel]="amountMin"
                  (ngModelChange)="amountMinChange.emit($event)"
                />
              </div>
              <span class="fs-range-sep">—</span>
              <div class="fs-range-col">
                <span class="fs-unit-prefix">Max</span>
                <input
                  type="number"
                  class="fs-num-input"
                  placeholder="5000"
                  [ngModel]="amountMax"
                  (ngModelChange)="amountMaxChange.emit($event)"
                />
              </div>
            </div>
            <div class="fs-slider-wrap">
              <input
                type="range"
                class="fs-dual-slider"
                min="0"
                max="1000"
                [ngModel]="amountMax || 1000"
                (ngModelChange)="amountMaxChange.emit($event)"
              />
            </div>
          </div>
        }

        <!-- 4. Grupos Facetados Desplegables -->
        @for (group of filterGroups; track group.label; let gi = $index) {
          <div class="fs-group">
            <button
              type="button"
              class="fs-group-header"
              (click)="onToggleGroup(gi)"
              [attr.aria-expanded]="group.open"
            >
              <span class="fs-group-label">{{ group.label }}</span>
              <svg
                class="fs-chevron"
                [class.open]="group.open"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            @if (group.open) {
              @if (gi === 0 && showFacetSearch) {
                <div class="fs-search-box">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input
                    type="text"
                    class="fs-search-input"
                    [placeholder]="searchPlaceholder"
                    [ngModel]="searchQuery"
                    (ngModelChange)="onSearchChange($event)"
                  />
                </div>
              }

              <div class="fs-group-options">
                @for (opt of getFilteredOptions(group, gi); track opt.label; let oi = $index) {
                  <label class="fs-option">
                    <input
                      type="checkbox"
                      [checked]="opt.checked"
                      (change)="onOptionToggle(gi, oi, $event)"
                      class="fs-checkbox"
                    />
                    <span class="fs-option-label">{{ opt.label }}</span>
                    <span class="fs-option-count">{{ opt.count }}</span>
                  </label>
                }
              </div>
            }
          </div>
        }

        <!-- 5. Toggles Booleanos / Condiciones Especiales -->
        @if (showSpecialConditions) {
          <div class="fs-group">
            <div class="fs-section-title-wrap">
              <span class="fs-group-label">Condiciones Especiales</span>
            </div>
            <div class="fs-toggles-list">
              <label class="fs-toggle-row">
                <span class="fs-toggle-text">Solo medidas cautelares</span>
                <div class="oefa-switch-wrap">
                  <input
                    type="checkbox"
                    class="oefa-switch-input"
                    [ngModel]="flagMedidas"
                    (ngModelChange)="flagMedidasChange.emit($event)"
                  />
                  <span class="oefa-switch-slider"></span>
                </div>
              </label>
              <label class="fs-toggle-row">
                <span class="fs-toggle-text">Solo alertas críticas</span>
                <div class="oefa-switch-wrap">
                  <input
                    type="checkbox"
                    class="oefa-switch-input"
                    [ngModel]="flagAlertas"
                    (ngModelChange)="flagAlertasChange.emit($event)"
                  />
                  <span class="oefa-switch-slider"></span>
                </div>
              </label>
            </div>
          </div>
        }
      </div>

      <!-- Footer Sticky de Acciones -->
      <div class="fs-sticky-footer">
        <oefa-button variant="primary" size="sm" style="flex: 1;" (clicked)="onApply()">
          Aplicar ({{ activeCount }})
        </oefa-button>
        <oefa-button variant="secondary" size="sm" (clicked)="onClear()">
          Limpiar
        </oefa-button>
      </div>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    .fs-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(3px);
      z-index: 1040;
      animation: oefaFadeIn var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease) forwards;
    }

    .filter-sidebar {
      background: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--oefa-shadow-sm, 0 2px 8px rgba(11, 40, 91, 0.04));
      position: sticky;
      top: 16px;
      width: 100%;
      box-sizing: border-box;
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
      background: var(--oefa-border-color, #cbd5e1);
    }

    .fs-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      border-bottom: 1px solid var(--oefa-border-color, #f1f5f9);
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
      font-family: var(--oefa-font-display, 'Poppins', sans-serif);
      color: var(--oefa-text-primary, #0f172a);
      letter-spacing: -0.01em;
    }

    .fs-subtitle {
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #64748b);
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
      transition: background var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      &:hover { background: var(--oefa-primary-container, #eef4ff); }
    }

    .fs-close-sheet-btn {
      display: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: var(--oefa-surface-muted, #e2e8f0);
      color: var(--oefa-text-secondary, #475569);
      font-size: 0.8125rem;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      &:hover { background: var(--oefa-border-color, #cbd5e1); }
    }

    .fs-scrollable-body {
      max-height: calc(100vh - 250px);
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      &::-webkit-scrollbar { width: 5px; }
      &::-webkit-scrollbar-thumb { background: var(--oefa-border-color, #cbd5e1); border-radius: 4px; }
    }

    .fs-group {
      padding: 14px 16px;
      border-bottom: 1px solid var(--oefa-border-color, #f1f5f9);
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
      background: var(--oefa-surface-muted, #f1f5f9);
      color: var(--oefa-text-secondary, #475569);
      padding: 2px 6px;
      border-radius: 4px;
    }

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
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      background: var(--oefa-surface-card, #ffffff);
      color: var(--oefa-text-secondary, #475569);
      cursor: pointer;
      transition: all var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &:hover {
        border-color: var(--oefa-primary-root);
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

    .fs-date-range-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;

      ::ng-deep .oefa-date-picker-wrapper {
        width: 100%;
      }

      ::ng-deep .date-picker-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--oefa-text-muted, #64748b);
      }

      ::ng-deep .date-input-container {
        height: 36px;
      }
    }

    .fs-range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .fs-range-col {
      display: flex;
      align-items: center;
      background: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #cbd5e1);
      border-radius: 6px;
      padding: 4px 8px;
      flex: 1;
      gap: 4px;

      &:focus-within {
        border-color: var(--oefa-primary-root, #144aa7);
        box-shadow: 0 0 0 2px var(--oefa-focus-glow, rgba(20, 74, 167, 0.15));
      }

      .fs-unit-prefix {
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--oefa-text-muted, #94a3b8);
      }

      .fs-num-input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--oefa-text-primary, #1e293b);
        background: transparent;
      }
    }

    .fs-range-sep {
      color: var(--oefa-text-muted, #94a3b8);
      font-size: 0.8125rem;
    }

    .fs-slider-wrap {
      padding: 2px 2px 6px;
    }

    .fs-dual-slider {
      width: 100%;
      accent-color: var(--oefa-primary-root, #144aa7);
      cursor: pointer;
      height: 4px;
    }

    .fs-group-header {
      width: 100%;
      background: none;
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      cursor: pointer;
      text-align: left;
    }

    .fs-chevron {
      color: #64748b;
      transition: transform var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      &.open { transform: rotate(180deg); }
    }

    .fs-search-box {
      margin: 10px 0 8px;
      position: relative;
      display: flex;
      align-items: center;

      svg {
        position: absolute;
        left: 8px;
        color: var(--oefa-text-muted, #94a3b8);
        pointer-events: none;
      }

      .fs-search-input {
        width: 100%;
        font-size: 0.75rem;
        padding: 5px 8px 5px 26px;
        border: 1px solid var(--oefa-border-color, #cbd5e1);
        border-radius: 6px;
        outline: none;
        background: var(--oefa-surface-subtle, #f8fafc);
        color: var(--oefa-text-primary);
        &:focus {
          background: var(--oefa-surface-card, #ffffff);
          border-color: var(--oefa-primary-root, #144aa7);
        }
      }
    }

    .fs-group-options {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-height: 180px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .fs-option {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 3px 0;
      font-size: 0.8125rem;
      user-select: none;

      .fs-checkbox {
        accent-color: var(--oefa-primary-root, #144aa7);
        width: 15px;
        height: 15px;
        cursor: pointer;
      }

      .fs-option-label {
        flex: 1;
        color: var(--oefa-text-primary, #1e293b);
        font-size: 0.75rem;
      }

      .fs-option-count {
        font-size: 0.6875rem;
        color: #94a3b8;
        background: var(--oefa-surface-muted, #f1f5f9);
        padding: 1px 6px;
        border-radius: 999px;
      }
    }

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
      padding: 2px 0;
    }

    .fs-toggle-text {
      font-size: 0.75rem;
      color: var(--oefa-text-primary, #1e293b);
    }

    .oefa-switch-wrap {
      position: relative;
      display: inline-block;
      width: 34px;
      height: 18px;

      .oefa-switch-input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .oefa-switch-slider {
          background-color: var(--oefa-primary-root, #144aa7);
          &::before {
            transform: translateX(16px);
          }
        }
      }

      .oefa-switch-slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: var(--oefa-surface-muted, #cbd5e1);
        transition: var(--oefa-duration-short-4, 200ms) var(--oefa-ease-standard, cubic-bezier(0.2, 0, 0, 1));
        border-radius: 999px;

        &::before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 2px;
          bottom: 2px;
          background-color: var(--oefa-surface-card, #ffffff);
          transition: var(--oefa-duration-short-4, 200ms) var(--oefa-ease-standard, cubic-bezier(0.2, 0, 0, 1));
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      }
    }

    .fs-sticky-footer {
      padding: 12px 16px;
      background: var(--oefa-surface-subtle, #f8fafc);
      border-top: 1px solid var(--oefa-border-color, #f1f5f9);
      display: flex;
      gap: 8px;
    }

    /* Media query responsivo automático */
    @media (max-width: 768px) {
      .filter-sidebar {
        position: fixed;
        inset: auto 0 0 0;
        z-index: 1050;
        border-radius: 20px 20px 0 0;
        max-height: 88vh;
        box-shadow: 0 -8px 32px rgba(11, 40, 91, 0.22);
        transform: translateY(105%);
        transition: transform var(--oefa-duration-long-1, 350ms) var(--oefa-ease-emphasized-decel, cubic-bezier(0.05, 0.7, 0.1, 1));

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

    @media (prefers-reduced-motion: reduce) {
      .oefa-filter-sidebar, .fs-clear-icon, .fs-toggle-switch .fs-slider {
        transition: none !important;
        transform: none !important;
      }
    }
  `]
})
export class OefaFilterSidebarComponent {
  @Input() title: string = 'Refinar Búsqueda';
  @Input() activeCount: number = 0;
  @Input() statusOptions?: FilterStatusOption[];
  @Input() selectedStatus: string = 'TODOS';
  @Input() showDateRange: boolean = true;
  @Input() dateFrom: string = '';
  @Input() dateTo: string = '';
  @Input() showAmountRange: boolean = true;
  @Input() amountMin: number | null = null;
  @Input() amountMax: number | null = null;
  @Input() amountUnit: string = 'UIT';
  @Input() filterGroups: FilterGroupItem[] = [];
  @Input() showFacetSearch: boolean = true;
  @Input() searchPlaceholder: string = 'Buscar sector...';
  @Input() searchQuery: string = '';
  @Input() showSpecialConditions: boolean = true;
  @Input() flagMedidas: boolean = false;
  @Input() flagAlertas: boolean = false;
  @Input() isOpenMobile: boolean = false;

  @Output() statusChange = new EventEmitter<string>();
  @Output() dateFromChange = new EventEmitter<string>();
  @Output() dateToChange = new EventEmitter<string>();
  @Output() amountMinChange = new EventEmitter<number | null>();
  @Output() amountMaxChange = new EventEmitter<number | null>();
  @Output() flagMedidasChange = new EventEmitter<boolean>();
  @Output() flagAlertasChange = new EventEmitter<boolean>();
  @Output() groupToggle = new EventEmitter<number>();
  @Output() optionToggle = new EventEmitter<{ groupIndex: number; optionIndex: number; checked: boolean }>();
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() apply = new EventEmitter<void>();
  @Output() closeMobile = new EventEmitter<void>();

  onStatusSelect(value: string): void {
    this.statusChange.emit(value);
  }

  onToggleGroup(index: number): void {
    this.groupToggle.emit(index);
  }

  onOptionToggle(groupIndex: number, optionIndex: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.optionToggle.emit({ groupIndex, optionIndex, checked: target.checked });
  }

  onSearchChange(query: string): void {
    this.searchQueryChange.emit(query);
  }

  onClear(): void {
    this.clear.emit();
  }

  onApply(): void {
    this.apply.emit();
  }

  onCloseMobile(): void {
    this.closeMobile.emit();
  }

  getFilteredOptions(group: FilterGroupItem, groupIndex: number): FilterOption[] {
    if (groupIndex === 0 && this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      return group.options.filter(opt => opt.label.toLowerCase().includes(q));
    }
    return group.options;
  }
}
