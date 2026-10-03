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
import { OefaDateRange, CalendarDay } from './date-range-picker.models';

export type { OefaDateRange } from './date-range-picker.models';

@Component({
  selector: 'oefa-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
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
      this.rangeStart.set(day.dateString);
      this.rangeEnd.set(null);
      this.hoverDate.set(null);
      this.screenReaderAnnouncement.set(`Fecha inicio: ${day.ariaLabel}. Seleccione fecha final.`);
    } else {
      const startDate = new Date(start);
      const clickedDate = new Date(day.dateString);

      if (clickedDate < startDate) {
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
    let startingDayOfWeek = firstDayOfMonth.getDay();
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
