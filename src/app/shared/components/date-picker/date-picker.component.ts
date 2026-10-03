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
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
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

