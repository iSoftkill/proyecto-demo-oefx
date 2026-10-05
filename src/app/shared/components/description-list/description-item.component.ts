import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Elemento individual de atributo/propiedad dentro de un <oefa-description-list>.
 * Renderiza la etiqueta estilizada y el valor o slot libre para chips, badges o tablas.
 */
@Component({
  selector: 'oefa-description-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-item.component.html',
  styleUrls: ['./description-item.component.scss']
})
export class OefaDescriptionItemComponent {
  @Input() label = '';
  @Input() value?: string | number | null = '';
  @Input() fullWidth = false;
  @Input() colSpan?: number;
}
