export interface OefaDateRange {
  start: string; // ISO format 'YYYY-MM-DD'
  end: string;   // ISO format 'YYYY-MM-DD'
}

export interface CalendarDay {
  date: Date;
  dateString: string; // 'YYYY-MM-DD'
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  ariaLabel: string;
}
