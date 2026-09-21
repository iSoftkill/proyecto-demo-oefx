import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  signal,
  ElementRef,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface OefaDateRange {
  start: string; // ISO format 'YYYY-MM-DD'
  end: string;   // ISO format 'YYYY-MM-DD'
}

interface CalendarDay {
  date: Date;
  dateString: string; // 'YYYY-MM-DD'
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  ariaLabel: string;
}

@Component({
  selector: 'oefa-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oefa-date-range-wrapper" [class.has-error]="!!error" [class.is-disabled]="disabled">
      <!-- Etiqueta Accesible -->
      @if (label) {
        <label [for]="inputId" class="date-range-label">
          {{ label }}
          @if (required) {
            <span class="required-star" aria-hidden="true">*</span>
          }
        </label>
      }

      <!-- Disparador / Input de Rango -->
      <div class="range-input-box" [class.active]="isOpen()" (click)="togglePicker()">
        <input
          type="text"
          [id]="inputId"
          class="range-display-input"
          readonly
          [placeholder]="placeholder"
          [value]="formattedRange"
          [disabled]="disabled"
          [required]="required"
          aria-haspopup="dialog"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-invalid]="!!error"
          [attr.aria-describedby]="error ? inputId + '-error' : null"
        />

        <div class="input-actions">
          @if (hasRange && !disabled) {
            <button
              type="button"
              class="clear-range-btn"
              (click)="clearRange($event)"
              title="Limpiar rango de fechas"
              aria-label="Limpiar rango de fechas"
            >
              ✕
            </button>
          }
          <span class="calendar-icon-indicator" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Mensaje de Error Accesible -->
      @if (error) {
        <span [id]="inputId + '-error'" class="date-range-error" role="alert">
          {{ error }}
        </span>
      }

      <!-- Popover del Calendario de Rango -->
      @if (isOpen()) {
        <div
          class="date-range-popover"
          role="dialog"
          aria-modal="false"
          aria-label="Selector de rango de fechas"
          (keydown)="onKeydown($event)"
        >
          <!-- Presets Rápidos -->
          <div class="range-presets">
            <button type="button" class="preset-chip" (click)="applyPreset('today')">Hoy</button>
            <button type="button" class="preset-chip" (click)="applyPreset('last7')">Últimos 7 días</button>
            <button type="button" class="preset-chip" (click)="applyPreset('last30')">Últimos 30 días</button>
            <button type="button" class="preset-chip" (click)="applyPreset('thisMonth')">Este mes</button>
          </div>

          <!-- Cabecera de Navegación de Mes -->
          <div class="calendar-nav-header">
            <button
              type="button"
              class="nav-btn prev-btn"
              (click)="prevMonth()"
              aria-label="Mes anterior"
              title="Mes anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <span class="month-year-title" aria-live="polite">
              {{ currentMonthName }} {{ currentYear }}
            </span>

            <button
              type="button"
              class="nav-btn next-btn"
              (click)="nextMonth()"
              aria-label="Mes siguiente"
              title="Mes siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <!-- Cuadrícula Semántica (WAI-ARIA Datepicker Grid) -->
          <table class="calendar-grid" role="grid" [attr.aria-label]="currentMonthName + ' ' + currentYear">
            <thead>
              <tr role="row">
                <th scope="col" role="columnheader" aria-label="Lunes">Lu</th>
                <th scope="col" role="columnheader" aria-label="Martes">Ma</th>
                <th scope="col" role="columnheader" aria-label="Miércoles">Mi</th>
                <th scope="col" role="columnheader" aria-label="Jueves">Ju</th>
                <th scope="col" role="columnheader" aria-label="Viernes">Vi</th>
                <th scope="col" role="columnheader" aria-label="Sábado">Sá</th>
                <th scope="col" role="columnheader" aria-label="Domingo">Do</th>
              </tr>
            </thead>
            <tbody>
              @for (week of weeks(); track $index) {
                <tr role="row">
                  @for (day of week; track day.dateString) {
                    <td
                      class="day-cell"
                      [class.not-current-month]="!day.isCurrentMonth"
                      [class.is-today]="day.isToday"
                      [class.is-disabled]="day.isDisabled"
                      [class.range-start]="isRangeStart(day.dateString)"
                      [class.range-end]="isRangeEnd(day.dateString)"
                      [class.in-range]="isInRange(day.dateString)"
                      [class.in-preview]="isInPreview(day.dateString)"
                    >
                      <button
                        type="button"
                        class="day-btn"
                        [disabled]="day.isDisabled"
                        [attr.aria-label]="day.ariaLabel"
                        [attr.aria-selected]="isRangeStart(day.dateString) || isRangeEnd(day.dateString)"
                        [attr.aria-current]="day.isToday ? 'date' : null"
                        (click)="onDaySelect(day)"
                        (mouseenter)="onDayHover(day)"
                      >
                        {{ day.dayNumber }}
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>

          <!-- Región para Lectores de Pantalla (WCAG 2.2) -->
          <div class="sr-only" aria-live="polite" aria-atomic="true">
            {{ screenReaderAnnouncement() }}
          </div>

          <!-- Barra Inferior de Información y Cierre -->
          <div class="calendar-footer">
            <div class="range-info">
              @if (rangeStart() && !rangeEnd()) {
                <span class="info-text">Selecciona la fecha de fin</span>
              } @else if (hasRange) {
                <span class="info-text duration-text">{{ totalDays }} días seleccionados</span>
              } @else {
                <span class="info-text">Selecciona la fecha de inicio</span>
              }
            </div>
            <button type="button" class="close-popover-btn" (click)="closePicker()">Cerrar</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .oefa-date-range-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      width: 100%;
    }

    .date-range-label {
      font-size: 0.813rem;
      font-weight: 600;
      color: var(--oefa-text-primary, #0f172a);
    }

    .required-star {
      color: var(--oefa-error-ui-safe, #dc2626);
      margin-left: 2px;
    }

    /* Caja de Input */
    .range-input-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 38px;
      padding: 0 10px 0 12px;
      background-color: var(--oefa-surface-input, #ffffff);
      border: 1px solid var(--oefa-border-color, #cbd5e1);
      border-radius: var(--oefa-radius-md, 8px);
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover:not(.is-disabled) {
        border-color: var(--oefa-primary-root, #144aa7);
      }

      &.active {
        border-color: var(--oefa-primary-root, #144aa7);
        box-shadow: 0 0 0 3px var(--oefa-focus-glow, rgba(20, 74, 167, 0.15));
      }
    }

    .range-display-input {
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 0.875rem;
      color: var(--oefa-text-primary, #0f172a);
      width: 100%;
      cursor: pointer;

      &::placeholder {
        color: var(--oefa-text-muted, #94a3b8);
      }
    }

    .input-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .clear-range-btn {
      background: var(--oefa-surface-submenu, #f1f5f9);
      border: none;
      color: var(--oefa-text-secondary, #64748b);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.688rem;
      cursor: pointer;
      transition: background 0.15s ease;

      &:hover {
        background: var(--oefa-border-color, #cbd5e1);
        color: var(--oefa-text-primary, #0f172a);
      }
    }

    .calendar-icon-indicator {
      color: var(--oefa-primary-root, #144aa7);
      display: flex;
      align-items: center;
    }

    /* Popover Calendario */
    .date-range-popover {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      width: 320px;
      background-color: var(--oefa-surface-card, #ffffff);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-lg, 12px);
      box-shadow: var(--oefa-shadow-flyout, 0 12px 32px rgba(0, 0, 0, 0.12));
      padding: 12px 14px;
      z-index: 1000;
      animation: dropdownFadeIn 0.15s ease-out forwards;
    }

    @keyframes dropdownFadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Presets Rápidos */
    .range-presets {
      display: flex;
      gap: 5px;
      margin-bottom: 10px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 2px;
    }

    .preset-chip {
      background: var(--oefa-surface-submenu, #f8fafc);
      border: 1px solid var(--oefa-border-color, #e2e8f0);
      border-radius: var(--oefa-radius-full, 9999px);
      padding: 3px 8px;
      font-size: 0.688rem;
      font-weight: 500;
      color: var(--oefa-text-secondary, #475569);
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144aa7);
        border-color: var(--oefa-primary-root, #144aa7);
      }
    }

    /* Cabecera del Mes */
    .calendar-nav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .month-year-title {
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--oefa-text-primary, #0f172a);
      text-transform: capitalize;
    }

    .nav-btn {
      background: transparent;
      border: none;
      color: var(--oefa-text-secondary, #64748b);
      width: 28px;
      height: 28px;
      border-radius: var(--oefa-radius-sm, 6px);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: var(--oefa-surface-submenu, #f1f5f9);
        color: var(--oefa-primary-root, #144aa7);
      }
    }

    /* Cuadrícula de Calendario */
    .calendar-grid {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      th {
        font-size: 0.688rem;
        font-weight: 600;
        color: var(--oefa-text-muted, #94a3b8);
        padding: 4px 0;
        text-align: center;
      }
    }

    .day-cell {
      padding: 2px 0;
      text-align: center;
      position: relative;

      &.not-current-month .day-btn {
        color: var(--oefa-text-muted, #cbd5e1);
        opacity: 0.5;
      }

      /* Franja de Rango Seleccionado */
      &.in-range {
        background-color: var(--oefa-primary-container, #eef4ff);

        .day-btn {
          color: var(--oefa-primary-on-container, #002463);
          font-weight: 600;
        }
      }

      /* Vista previa al mover el mouse */
      &.in-preview {
        background-color: rgba(20, 74, 167, 0.08);

        .day-btn {
          color: var(--oefa-primary-root, #144aa7);
        }
      }

      /* Inicio de Rango */
      &.range-start {
        background: linear-gradient(to right, transparent 50%, var(--oefa-primary-container, #eef4ff) 50%);

        .day-btn {
          background-color: var(--oefa-primary-root, #144aa7);
          color: #ffffff;
          font-weight: 700;
          border-radius: 50%;
        }
      }

      /* Fin de Rango */
      &.range-end {
        background: linear-gradient(to left, transparent 50%, var(--oefa-primary-container, #eef4ff) 50%);

        .day-btn {
          background-color: var(--oefa-primary-root, #144aa7);
          color: #ffffff;
          font-weight: 700;
          border-radius: 50%;
        }
      }

      /* Si es el mismo día inicio y fin */
      &.range-start.range-end {
        background: transparent;
      }
    }

    .day-btn {
      width: 32px;
      height: 32px;
      margin: 0 auto;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 0.813rem;
      color: var(--oefa-text-primary, #0f172a);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.12s ease;

      &:hover:not(:disabled) {
        background-color: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144aa7);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring, #144aa7);
        outline-offset: 1px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }

    .is-today .day-btn:not(.range-start):not(.range-end) {
      border: 1px solid var(--oefa-primary-root, #144aa7);
      font-weight: 700;
    }

    /* Pie del Popover */
    .calendar-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--oefa-border-color, #e2e8f0);
    }

    .info-text {
      font-size: 0.688rem;
      color: var(--oefa-text-muted, #64748b);

      &.duration-text {
        color: var(--oefa-primary-root, #144aa7);
        font-weight: 700;
      }
    }

    .close-popover-btn {
      background: transparent;
      border: none;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--oefa-primary-root, #144aa7);
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;

      &:hover {
        background: var(--oefa-surface-submenu, #f1f5f9);
      }
    }

    /* Accesibilidad Lector */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Errores y Deshabilitado */
    .has-error .range-input-box {
      border-color: var(--oefa-error-ui-safe, #dc2626);

      &.active {
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
      }
    }

    .date-range-error {
      font-size: 0.75rem;
      color: var(--oefa-error-ui-safe, #dc2626);
      font-weight: 500;
    }

    .is-disabled .range-input-box {
      background-color: var(--oefa-surface-muted, #f1f5f9);
      border-color: var(--oefa-border-color-subtle, #e2e8f0);
      cursor: not-allowed;

      .range-display-input {
        cursor: not-allowed;
        color: var(--oefa-text-muted, #94a3b8);
      }
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OefaDateRangePickerComponent),
      multi: true
    }
  ]
})
export class OefaDateRangePickerComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  @Input() label?: string;
  @Input() inputId: string = `oefa-range-${Math.random().toString(36).substring(2, 7)}`;
  @Input() placeholder: string = 'DD/MM/AAAA — DD/MM/AAAA';
  @Input() min?: string;
  @Input() max?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error?: string;

  @Output() rangeChange = new EventEmitter<OefaDateRange>();

  isOpen = signal<boolean>(false);
  rangeStart = signal<string | null>(null);
  rangeEnd = signal<string | null>(null);
  hoverDate = signal<string | null>(null);
  screenReaderAnnouncement = signal<string>('Selector de rango de fechas listo.');

  currentViewDate = signal<Date>(new Date());

  private onChange: (val: OefaDateRange) => void = () => {};
  private onTouched: () => void = () => {};

  get hasRange(): boolean {
    return !!(this.rangeStart() && this.rangeEnd());
  }

  get formattedRange(): string {
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (!start && !end) return '';
    if (start && !end) return `${this.formatDateReadable(start)} — `;
    if (start && end) return `${this.formatDateReadable(start)} — ${this.formatDateReadable(end)}`;
    return '';
  }

  get totalDays(): number {
    const s = this.rangeStart();
    const e = this.rangeEnd();
    if (!s || !e) return 0;
    const d1 = new Date(s);
    const d2 = new Date(e);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    return Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
  }

  get currentYear(): number {
    return this.currentViewDate().getFullYear();
  }

  get currentMonthName(): string {
    return this.currentViewDate().toLocaleDateString('es-PE', { month: 'long' });
  }

  weeks = signal<CalendarDay[][]>([]);

  constructor() {
    this.rebuildCalendar();
  }

  writeValue(val: OefaDateRange | null): void {
    if (val && val.start) {
      this.rangeStart.set(val.start);
      this.rangeEnd.set(val.end || null);
      this.currentViewDate.set(new Date(val.start + 'T00:00:00'));
    } else {
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
    }
    this.rebuildCalendar();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePicker(): void {
    if (this.disabled) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.rebuildCalendar();
    }
  }

  closePicker(): void {
    this.isOpen.set(false);
    this.hoverDate.set(null);
    this.onTouched();
  }

  prevMonth(): void {
    const cur = new Date(this.currentViewDate());
    cur.setMonth(cur.getMonth() - 1);
    this.currentViewDate.set(cur);
    this.rebuildCalendar();
  }

  nextMonth(): void {
    const cur = new Date(this.currentViewDate());
    cur.setMonth(cur.getMonth() + 1);
    this.currentViewDate.set(cur);
    this.rebuildCalendar();
  }

  onDaySelect(day: CalendarDay): void {
    if (day.isDisabled) return;

    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (!start || (start && end)) {
      // Inicia nuevo rango
      this.rangeStart.set(day.dateString);
      this.rangeEnd.set(null);
      this.hoverDate.set(null);
      this.screenReaderAnnouncement.set(`Fecha inicio: ${day.ariaLabel}. Seleccione fecha final.`);
    } else {
      // Cierra el rango
      const startDate = new Date(start);
      const clickedDate = new Date(day.dateString);

      if (clickedDate < startDate) {
        // Si hizo clic antes del inicio, invierte
        this.rangeStart.set(day.dateString);
        this.rangeEnd.set(start);
      } else {
        this.rangeEnd.set(day.dateString);
      }

      this.hoverDate.set(null);
      const newRange: OefaDateRange = {
        start: this.rangeStart()!,
        end: this.rangeEnd()!
      };
      this.onChange(newRange);
      this.rangeChange.emit(newRange);
      this.screenReaderAnnouncement.set(`Rango seleccionado: del ${this.rangeStart()} al ${this.rangeEnd()}`);
      this.closePicker();
    }
  }

  onDayHover(day: CalendarDay): void {
    if (this.rangeStart() && !this.rangeEnd() && !day.isDisabled) {
      this.hoverDate.set(day.dateString);
    }
  }

  clearRange(event: Event): void {
    event.stopPropagation();
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
    this.hoverDate.set(null);
    const emptyRange = { start: '', end: '' };
    this.onChange(emptyRange);
    this.rangeChange.emit(emptyRange);
    this.screenReaderAnnouncement.set('Rango de fechas borrado.');
  }

  applyPreset(preset: 'today' | 'last7' | 'last30' | 'thisMonth'): void {
    const today = new Date();
    let s = new Date(today);
    let e = new Date(today);

    if (preset === 'today') {
      // hoy
    } else if (preset === 'last7') {
      s.setDate(today.getDate() - 6);
    } else if (preset === 'last30') {
      s.setDate(today.getDate() - 29);
    } else if (preset === 'thisMonth') {
      s = new Date(today.getFullYear(), today.getMonth(), 1);
      e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    const startStr = this.formatDateISO(s);
    const endStr = this.formatDateISO(e);

    this.rangeStart.set(startStr);
    this.rangeEnd.set(endStr);
    this.currentViewDate.set(s);
    this.rebuildCalendar();

    const range: OefaDateRange = { start: startStr, end: endStr };
    this.onChange(range);
    this.rangeChange.emit(range);
    this.closePicker();
  }

  isRangeStart(dateStr: string): boolean {
    return this.rangeStart() === dateStr;
  }

  isRangeEnd(dateStr: string): boolean {
    return this.rangeEnd() === dateStr;
  }

  isInRange(dateStr: string): boolean {
    const s = this.rangeStart();
    const e = this.rangeEnd();
    if (!s || !e) return false;
    return dateStr > s && dateStr < e;
  }

  isInPreview(dateStr: string): boolean {
    const s = this.rangeStart();
    const e = this.rangeEnd();
    const h = this.hoverDate();
    if (!s || e || !h) return false;

    const min = s < h ? s : h;
    const max = s < h ? h : s;
    return dateStr >= min && dateStr <= max;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closePicker();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closePicker();
    }
  }

  private rebuildCalendar(): void {
    const viewDate = this.currentViewDate();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    // getDay(): 0 = Domingo, 1 = Lunes, ...
    let startingDayOfWeek = firstDayOfMonth.getDay();
    // Ajuste a Lunes = 0, ..., Domingo = 6
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startingDayOfWeek);

    const todayStr = this.formatDateISO(new Date());
    const generatedWeeks: CalendarDay[][] = [];

    let currentCursor = new Date(startDate);

    for (let w = 0; w < 6; w++) {
      const week: CalendarDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = this.formatDateISO(currentCursor);
        const isCurrentMonth = currentCursor.getMonth() === month;
        const isToday = dateStr === todayStr;

        let isDisabled = false;
        if (this.min && dateStr < this.min) isDisabled = true;
        if (this.max && dateStr > this.max) isDisabled = true;

        const ariaLabel = currentCursor.toLocaleDateString('es-PE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        week.push({
          date: new Date(currentCursor),
          dateString: dateStr,
          dayNumber: currentCursor.getDate(),
          isCurrentMonth,
          isToday,
          isDisabled,
          ariaLabel
        });

        currentCursor.setDate(currentCursor.getDate() + 1);
      }
      generatedWeeks.push(week);
    }

    this.weeks.set(generatedWeeks);
  }

  private formatDateISO(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDateReadable(iso: string): string {
    if (!iso) return '';
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
}
