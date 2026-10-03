import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SelectionCardType = 'radio' | 'checkbox';
export type SelectionCardBadgeVariant = 'primary' | 'success' | 'tertiary' | 'neutral';

@Component({
  selector: 'oefa-selection-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selection-card.component.html',
  styleUrls: ['./selection-card.component.scss']
})
export class OefaSelectionCardComponent {
  @Input() name = '';
  @Input() value: any = null;
  @Input() selected = false;
  @Input() title = '';
  @Input() description = '';
  @Input() priceBadge = '';
  @Input() badgeVariant: SelectionCardBadgeVariant = 'primary';
  @Input() type: SelectionCardType = 'radio';
  @Input() disabled = false;
  @Input() ariaLabel = '';

  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<any>();

  toggleSelection(): void {
    if (this.disabled) return;

    if (this.type === 'radio') {
      if (!this.selected) {
        this.selected = true;
        this.selectedChange.emit(true);
        this.selectionChange.emit(this.value);
      }
    } else {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
      this.selectionChange.emit({ value: this.value, selected: this.selected });
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleSelection();
    }
  }
}
