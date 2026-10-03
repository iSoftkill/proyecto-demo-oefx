import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente contenedor de campo de formulario con etiqueta institucional,
 * indicador de obligatoriedad, mensaje de ayuda y mensaje de error reactivo.
 *
 * @example
 * <oefa-form-field label="Número de Orden" [required]="true" help="Ej: OS-00019-2026">
 *   <input type="text" class="form-input font-mono" placeholder="OS-00000-2026" />
 * </oefa-form-field>
 *
 * @example
 * <oefa-form-field label="Correo Institucional" [error]="emailErrorMsg">
 *   <input type="email" class="form-input" />
 * </oefa-form-field>
 */
@Component({
  selector: 'oefa-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class OefaFormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() requiredMode: 'asterisk' | 'text' = 'asterisk';
  @Input() help = '';
  @Input() error = '';
}
