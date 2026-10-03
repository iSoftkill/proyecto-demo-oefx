import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaButtonComponent } from '../button/button.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FilterOption, FilterGroupItem, FilterStatusOption } from './filter-sidebar.models';

export type { FilterOption, FilterGroupItem, FilterStatusOption } from './filter-sidebar.models';

@Component({
  selector: 'oefa-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, OefaButtonComponent, DatePickerComponent],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class OefaFilterSidebarComponent {
  @Input() title: string = 'Refinar Búsqueda';
  @Input() activeCount: number = 0;
  @Input() statusOptions?: FilterStatusOption[];
  @Input() statusTitle: string = 'Estado del Expediente';
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
  @Input() specialConditionsTitle: string = 'Condiciones Especiales';
  @Input() flagMedidasLabel: string = 'Solo medidas cautelares';
  @Input() flagAlertasLabel: string = 'Solo alertas críticas';
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
