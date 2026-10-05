import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DescriptionListColumns, DescriptionListDensity, DescriptionListLayout } from './description-list.models';

/**
 * Componente contenedor de lista de descripción institucional OEFA.
 * Agrupa pares clave-valor organizados en cuadrículas responsivas
 * con títulos de sección y tokens institucionales.
 */
@Component({
  selector: 'oefa-description-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss']
})
export class OefaDescriptionListComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() columns: DescriptionListColumns = 2;
  @Input() density: DescriptionListDensity = 'comfortable';
  @Input() layout: DescriptionListLayout = 'vertical';
  @Input() bordered = true;
}
