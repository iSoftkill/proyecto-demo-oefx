import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

@Component({
  selector: 'oefa-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class OefaAlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;
  @Input() showIcon = true;
  @Input() bordered = true;

  @Output() dismissed = new EventEmitter<void>();

  isDismissed = false;

  get computedRole(): string {
    if (this.type === 'error' || this.type === 'warning') return 'alert';
    if (this.type === 'info' || this.type === 'success') return 'status';
    return 'region';
  }

  get computedAriaLive(): string {
    if (this.type === 'error' || this.type === 'warning') return 'assertive';
    return 'polite';
  }

  dismiss(): void {
    this.isDismissed = true;
    this.dismissed.emit();
  }
}
