import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaChipComponent, ChipVariant } from '../chip/chip.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';
import { OefaIconComponent } from '../icon/icon.component';
import { BentoChartType, BentoChipConfig } from './bento-kpi-tile.models';

export type { BentoChartType, BentoChipConfig } from './bento-kpi-tile.models';

@Component({
  selector: 'oefa-bento-kpi-tile',
  standalone: true,
  imports: [CommonModule, OefaChipComponent, OefaStatusBadgeComponent, OefaIconComponent],
  templateUrl: './bento-kpi-tile.component.html',
  styleUrls: ['./bento-kpi-tile.component.scss']
})
export class OefaBentoKpiTileComponent {
  @Input() sector: string = '';
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() metricLabel: string = '';
  @Input() trendLabel?: string;
  @Input() periodLabel?: string;
  @Input() icon: string = 'chart';
  @Input() iconColor?: string;
  @Input() bgTint: string = 'var(--oefa-surface-subtle)';
  @Input() accentColor: string = 'var(--oefa-primary-root)';
  @Input() chip?: BentoChipConfig;
  @Input() status?: string;
  @Input() chartType: BentoChartType = 'donut';
  @Input() percentage?: number;
  @Input() linkText: string = 'Ver detalle →';

  @Output() tileClick = new EventEmitter<void>();
  @Output() linkClick = new EventEmitter<Event>();

  onTileClick(): void {
    this.tileClick.emit();
  }

  onLinkClick(event: Event): void {
    event.stopPropagation();
    this.linkClick.emit(event);
  }
}
