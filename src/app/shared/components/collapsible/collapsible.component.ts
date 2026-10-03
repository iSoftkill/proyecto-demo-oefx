import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CollapsibleVariant = 'dashed' | 'bordered' | 'card';
export type CollapsibleBadgeVariant = 'neutral' | 'info' | 'primary' | 'success' | 'warning';

let nextUniqueId = 0;

/**
 * Componente reutilizable de Divulgación Progresiva (Progressive Disclosure / Collapsible)
 *
 * @example
 * <oefa-collapsible
 *   title="Información de Contacto y Datos Opcionales"
 *   badge="OPCIONAL"
 *   variant="dashed"
 *   [(isOpen)]="isContactOpen">
 *   <div class="form-grid-2">...</div>
 * </oefa-collapsible>
 */
@Component({
  selector: 'oefa-collapsible',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class OefaCollapsibleComponent {
  private readonly uniqueId = `oefa-collapsible-${nextUniqueId++}`;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() badgeVariant: CollapsibleBadgeVariant = 'neutral';
  @Input() isOpen = false;
  @Input() variant: CollapsibleVariant = 'dashed';
  @Input() disabled = false;
  @Input() ariaLabel = '';

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() toggled = new EventEmitter<boolean>();

  get triggerId(): string {
    return `${this.uniqueId}-trigger`;
  }

  get contentId(): string {
    return `${this.uniqueId}-content`;
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
    this.toggled.emit(this.isOpen);
  }
}
