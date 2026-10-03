import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent, ChipVariant } from '../chip/chip.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';
import { OefaIconComponent } from '../icon/icon.component';

export type CatalogActivityType = 'sparkline' | 'bar' | 'pulse' | 'none';

export interface CatalogChipConfig {
  variant: ChipVariant;
  label: string;
}

@Component({
  selector: 'oefa-catalog-card',
  standalone: true,
  imports: [CommonModule, OefaChipComponent, OefaStatusBadgeComponent, OefaIconComponent],
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class OefaCatalogCardComponent {
  @Input() icon: string = 'folder';
  @Input() iconColor?: string;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tags: string[] = [];
  @Input() chips?: CatalogChipConfig[];
  @Input() status?: string;
  @Input() statusLabel?: string;
  @Input() type?: string;
  @Input() typeColor?: string;
  @Input() color: string = 'var(--oefa-primary-root)';
  @Input() bgTint?: string;
  @Input() borderTint?: string;
  @Input() activityType: CatalogActivityType = 'none';
  @Input() activityLabel?: string;
  @Input() updatedAt?: string;
  @Input() actionText: string = 'Abrir';

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<Event>();

  onCardClick(): void {
    this.cardClick.emit();
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}
