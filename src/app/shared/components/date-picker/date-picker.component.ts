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

interface CalendarDay {
  date: Date;
  dateString: string; // 'YYYY-MM-DD'
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  ariaLabel: string;
}

@Component({
  selector: 'oefa-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oefa-date-picker-wrapper" [class.has-error]="!!error" [class.is-disabled]="disabled">
      @if (label) {
        <label [for]="inputId" class="date-picker-label">
          {{ label }}
          @if (required) {
            <span class="required-star" aria-hidden="true">*</span>
          }
        </label>
      }

      <div class="date-input-container" [class.active]="isOpen()" (click)="togglePicker()">
        <input
          type="text"
          [id]="inputId"
          class="date-display-input"
          readonly
          [placeholder]="placeholder"
          [value]="formattedDate"
          [disabled]="disabled"
          [required]="required"
          aria-haspopup="dialog"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-invalid]="!!error"
          [attr.aria-describedby]="error ? inputId + '-error' : null"
        />

        <div class="input-actions">
          @if (value() && !disabled) {
            <button
              type="button"
              class="clear-date-btn"
              (click)="clearDate($event)"
              title="Limpiar fecha"
              aria-label="Limpiar fecha"
            >
              ✕
            </button>
          }
          <span class="calendar-icon-indicator" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
        </div>
      </div>

      @if (error) {
        <span [id]="inputId + '-error'" class="date-picker-error" role="alert">
          {{ error }}
        </span>
      }

      <!-- Popover Calendario Institucional Flotante -->
      @if (isOpen()) {
        <div
          class="date-picker-popover"
          role="dialog"
          aria-modal="false"
          aria-label="Selector de fecha"
          (keydown)="onKeydown($event)"
        >
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
                      [class.is-selected]="day.isSelected"
                      [class.is-disabled]="day.isDisabled"
                    >
                      <button
                        type="button"
                        class="day-btn"
                        [disabled]="day.isDisabled"
                        [attr.aria-label]="day.ariaLabel"
                        [attr.aria-selected]="day.isSelected"
                        [attr.aria-current]="day.isToday ? 'date' : null"
                        (click)="onDaySelect(day)"
                      >
                        {{ day.dayNumber }}
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>

          <!-- Acceso Rápido "Hoy" y Cierre -->
          <div class="calendar-footer">
            <button type="button" class="today-btn" (click)="selectToday()">Hoy</button>
            <button type="button" class="close-popover-btn" (click)="closePicker()">Cerrar</button>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './date-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  @Input() label?: string;
  @Input() inputId: string = `oefa-date-${Math.random().toString(36).substring(2, 7)}`;
  @Input() placeholder: string = 'DD/MM/AAAA';
  @Input() min?: string;
  @Input() max?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error?: string;

  @Output() dateChange = new EventEmitter<string>();

  value = signal<string>('');
  isOpen = signal<boolean>(false);
  currentViewDate = signal<Date>(new Date());
  weeks = signal<CalendarDay[][]>([]);

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  get formattedDate(): string {
    const val = this.value();
    if (!val) return '';
    const parts = val.split('-');
    if (parts.length !== 3) return val;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  get currentYear(): number {
    return this.currentViewDate().getFullYear();
  }

  get currentMonthName(): string {
    return this.currentViewDate().toLocaleDateString('es-PE', { month: 'long' });
  }

  constructor() {
    this.rebuildCalendar();
  }

  writeValue(val: string): void {
    this.value.set(val || '');
    if (val && val.includes('-')) {
      const parsed = new Date(val + 'T00:00:00');
      if (!isNaN(parsed.getTime())) {
        this.currentViewDate.set(parsed);
      }
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
      if (this.value()) {
        const parsed = new Date(this.value() + 'T00:00:00');
        if (!isNaN(parsed.getTime())) {
          this.currentViewDate.set(parsed);
        }
      }
      this.rebuildCalendar();
    }
  }

  closePicker(): void {
    this.isOpen.set(false);
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
    this.value.set(day.dateString);
    this.onChange(day.dateString);
    this.dateChange.emit(day.dateString);
    this.closePicker();
  }

  selectToday(): void {
    const today = new Date();
    const todayStr = this.formatDateISO(today);
    this.value.set(todayStr);
    this.currentViewDate.set(today);
    this.onChange(todayStr);
    this.dateChange.emit(todayStr);
    this.closePicker();
  }

  clearDate(event: Event): void {
    event.stopPropagation();
    this.value.set('');
    this.onChange('');
    this.dateChange.emit('');
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
    let startingDayOfWeek = firstDayOfMonth.getDay();
    // Lunes = 0, ..., Domingo = 6
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startingDayOfWeek);

    const selectedVal = this.value();
    const todayStr = this.formatDateISO(new Date());
    const generatedWeeks: CalendarDay[][] = [];

    let currentCursor = new Date(startDate);

    for (let w = 0; w < 6; w++) {
      const week: CalendarDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = this.formatDateISO(currentCursor);
        const isCurrentMonth = currentCursor.getMonth() === month;
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === selectedVal;

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
          isSelected,
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
}

export { DatePickerComponent as OefaDatePickerComponent };

