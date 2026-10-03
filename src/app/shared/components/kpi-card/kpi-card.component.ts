import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

export type KpiFootType = 'positive' | 'urgent' | 'neutral';

/**
 * Tarjeta de KPI Institucional OEFA.
 * Para barras de resumen métrico rápido, contadores y paneles de control.
 *
 * @example
 * <oefa-kpi-card
 *   title="Componentes UI"
 *   value="30+"
 *   foot="Listos para usar"
 *   footType="positive"
 *   icon="check" />
 *
 * @example
 * <oefa-kpi-card
 *   title="Modo Plantilla"
 *   value="Activo"
 *   foot="Sin dependencias de BD"
 *   [urgent]="true"
 *   icon="alert" />
 */
@Component({
  selector: 'oefa-kpi-card',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class OefaKpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() foot?: string;
  @Input() footType: KpiFootType = 'neutral';
  @Input() urgent = false;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Output() clicked = new EventEmitter<void>();
  @Output() cardClick = this.clicked;

  get hasClickListener(): boolean {
    return this.clicked.observed;
  }

  handleClick(): void {
    if (this.hasClickListener) {
      this.clicked.emit();
    }
  }
}
