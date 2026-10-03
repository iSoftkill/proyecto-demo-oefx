import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Tarjeta Institucional OEFA (<oefa-card>)
 * Cumple WCAG 2.1 / 2.2 AA (Focus appearance, contraste y touch targets).
 */
@Component({
  selector: 'oefa-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class OefaCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() interactive: boolean = false;
  @Input() ariaLabel?: string;

  @Output() cardClick = new EventEmitter<void>();

  onClick(): void {
    if (this.interactive) {
      this.cardClick.emit();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
