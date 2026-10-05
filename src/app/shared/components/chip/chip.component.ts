import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';

export type ChipVariant =
  | 'project'
  | 'maintenance'
  | 'siged'
  | 'area'
  | 'deliverable'
  | 'filter'
  | 'default';

/**
 * Componente Institucional de Chips y Etiquetas OEFA.
 * Admite variantes institucionales de negocio ([PRY], [SIGED], área),
 * chips interactivos de filtro rápido con estado activo, iconos/logos,
 * y opción de eliminación/limpieza (removable).
 */
@Component({
  selector: 'oefa-chip',
  standalone: true,
  imports: [CommonModule, OefaIconComponent],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class OefaChipComponent {
  @Input() variant: ChipVariant = 'default';
  @Input() label: string = '';
  @Input() title?: string;
  @Input() icon?: string;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() active: boolean = false;
  @Input() clickable: boolean = false;
  @Input() removable: boolean = false;
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() removed = new EventEmitter<MouseEvent>();

  get isInteractive(): boolean {
    return (
      !this.disabled &&
      (this.clickable ||
        this.variant === 'filter' ||
        this.clicked.observed ||
        this.activeChange.observed)
    );
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) return;
    if (this.isInteractive) {
      this.clicked.emit(event);
      this.activeChange.emit(!this.active);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (this.isInteractive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onClick(event as unknown as MouseEvent);
    }
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.removed.emit(event);
    }
  }
}
