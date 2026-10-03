import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaInfoTooltipComponent } from '../info-tooltip/info-tooltip.component';

export interface SegmentedOption<T = any> {
  value: T;
  label: string;
  icon?: string;
  badge?: string | number;
  dotBadge?: boolean;
  dotColor?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

/**
 * Componente conmutador segmentado (Segmented Switch / Button Group)
 * Basado en los tokens institucionales OEFA (.segmented-switch & .switch-btn).
 *
 * @example
 * <oefa-segmented-switch
 *   [options]="[
 *     { value: 'orders', label: 'Vista por Órdenes', badge: 12 },
 *     { value: 'deliverables', label: 'Matriz Excel', dotBadge: true, tooltip: 'Ver detalle matricial' }
 *   ]"
 *   [(selected)]="currentView" />
 */
@Component({
  selector: 'oefa-segmented-switch',
  standalone: true,
  imports: [CommonModule, OefaInfoTooltipComponent],
  templateUrl: './segmented-switch.component.html',
  styleUrls: ['./segmented-switch.component.scss']
})
export class OefaSegmentedSwitchComponent<T = any> {
  @Input() options: SegmentedOption<T>[] = [];
  @Input() selected!: T;
  @Input() fullWidth = false;
  @Input() ariaLabel = 'Conmutador de opciones';

  @Output() selectedChange = new EventEmitter<T>();

  selectOption(opt: SegmentedOption<T>): void {
    if (!opt.disabled && opt.value !== this.selected) {
      this.selected = opt.value;
      this.selectedChange.emit(this.selected);
    }
  }
}
