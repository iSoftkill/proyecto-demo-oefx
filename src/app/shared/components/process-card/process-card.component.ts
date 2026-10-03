import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

export type ProcessCardVariant = 'estrategico' | 'misional' | 'apoyo' | 'custom';

@Component({
  selector: 'oefa-process-card',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './process-card.component.html',
  styleUrls: ['./process-card.component.scss']
})
export class OefaProcessCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() actionText: string = 'Explorar';
  @Input() variant: ProcessCardVariant = 'estrategico';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() bgImage: string = '';
  @Input() icon: string = '';
  @Input() iconBg: string = '';
  @Input() customGradient: string = '';

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  get defaultGradient(): string {
    if (this.theme === 'light') {
      if (this.bgImage) {
        switch (this.variant) {
          case 'estrategico':
            return 'linear-gradient(90deg, #EEF4FF 0%, #EEF4FF 36%, rgba(238, 244, 255, 0.95) 55%, rgba(238, 244, 255, 0.70) 74%, rgba(238, 244, 255, 0.20) 90%, transparent 100%)';
          case 'misional':
            return 'linear-gradient(90deg, #F0FDF4 0%, #F0FDF4 36%, rgba(240, 253, 244, 0.95) 55%, rgba(240, 253, 244, 0.70) 74%, rgba(240, 253, 244, 0.20) 90%, transparent 100%)';
          case 'apoyo':
            return 'linear-gradient(90deg, #FFF7ED 0%, #FFF7ED 36%, rgba(255, 247, 237, 0.95) 55%, rgba(255, 247, 237, 0.70) 74%, rgba(255, 247, 237, 0.20) 90%, transparent 100%)';
          default:
            return 'linear-gradient(90deg, #EEF4FF 0%, rgba(238, 244, 255, 0.95) 60%, transparent 100%)';
        }
      } else {
        switch (this.variant) {
          case 'estrategico':
            return 'linear-gradient(135deg, #EEF4FF 0%, #E0ECFF 60%, #D1E0FA 100%)';
          case 'misional':
            return 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 60%, #BBF7D0 100%)';
          case 'apoyo':
            return 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 60%, #FED7AA 100%)';
          default:
            return 'linear-gradient(135deg, #F8FAFC 0%, #EEF4FF 100%)';
        }
      }
    }

    if (this.bgImage) {
      switch (this.variant) {
        case 'estrategico':
          return 'linear-gradient(90deg, #09479E 0%, #0A4FA8 38%, rgba(10, 79, 168, 0.85) 60%, rgba(10, 79, 168, 0.35) 80%, rgba(10, 79, 168, 0.05) 95%, transparent 100%)';
        case 'misional':
          return 'linear-gradient(90deg, #133910 0%, #1A4D16 38%, rgba(26, 77, 22, 0.88) 60%, rgba(26, 77, 22, 0.35) 80%, rgba(26, 77, 22, 0.05) 95%, transparent 100%)';
        case 'apoyo':
          return 'linear-gradient(90deg, #422000 0%, #5E2F00 38%, rgba(94, 47, 0, 0.88) 60%, rgba(94, 47, 0, 0.35) 80%, rgba(94, 47, 0, 0.05) 95%, transparent 100%)';
        default:
          return 'linear-gradient(90deg, #0A4FA8 0%, rgba(10, 79, 168, 0.85) 60%, transparent 100%)';
      }
    } else {
      switch (this.variant) {
        case 'estrategico':
          return 'linear-gradient(135deg, #083D87 0%, #0A4FA8 45%, #1565C0 85%, #0284C7 100%)';
        case 'misional':
          return 'linear-gradient(135deg, #10300D 0%, #1A4D16 45%, #2D7A27 85%, #52A849 100%)';
        case 'apoyo':
          return 'linear-gradient(135deg, #3A1C00 0%, #5E2F00 45%, #8C4700 85%, #B45309 100%)';
        default:
          return 'linear-gradient(135deg, #083D87 0%, #0A4FA8 100%)';
      }
    }
  }

  get defaultIconBg(): string {
    if (this.theme === 'light') {
      switch (this.variant) {
        case 'estrategico':
          return '#144AA7';
        case 'misional':
          return '#15803D';
        case 'apoyo':
          return '#EA580C';
        default:
          return '#144AA7';
      }
    }

    switch (this.variant) {
      case 'estrategico':
        return '#0088FF';
      case 'misional':
        return '#16A34A';
      case 'apoyo':
        return '#EA580C';
      default:
        return '#0088FF';
    }
  }

  onClick(): void {
    this.cardClick.emit();
    this.actionClick.emit();
  }
}
