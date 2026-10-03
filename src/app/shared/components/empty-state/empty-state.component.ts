import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaButtonComponent } from '../button/button.component';

@Component({
  selector: 'oefa-empty-state',
  standalone: true,
  imports: [CommonModule, OefaButtonComponent],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class OefaEmptyStateComponent {
  @Input() icon: 'search' | 'inbox' | 'folder' | 'alert' = 'search';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() actionText?: string;
  @Input() compact: boolean = false;

  @Output() actionClick = new EventEmitter<void>();
}
