import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaFormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { OefaDatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { OefaCollapsibleComponent } from '../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-design-system-inputs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaFormFieldComponent,
    OefaDatePickerComponent,
    OefaCollapsibleComponent
  ],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📝 Campos de Formulario e Inputs (Átomos)</h2>
          <p class="subtitle">Componentes y campos elementales para formularios institucionales bajo estándar WCAG 2.2.</p>
        </div>
        <span class="ds-badge">ÁTOMO</span>
      </div>

      <!-- Sección 1: Componente Reutilizable oefa-form-field y oefa-date-picker -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Insumos con &lt;oefa-form-field&gt; y &lt;oefa-date-picker&gt;</h3>
          <span class="text-muted">Encapsula la estructura accesible de formularios: label, asterisco de requerido, proyección de control y selector de fecha propio OEFA.</span>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <oefa-form-field label="Número de Orden Institucional" [required]="true" help="Formato oficial SIGED / SEOSC (ej: OS-00019-2026)">
              <input type="text" class="form-input font-mono" placeholder="Ej: OS-00019-2026" />
            </oefa-form-field>

            <oefa-form-field label="Área Solicitante" [required]="true" help="Unidad ejecutora que emite la certificación">
              <select class="form-select">
                <option value="">Seleccione área solicitante...</option>
                <option value="1">Subdirección de Fiscalización Ambiental</option>
                <option value="2">Oficina de Tecnologías de la Información</option>
              </select>
            </oefa-form-field>

            <oefa-date-picker
              label="Fecha de Notificación"
              [required]="true"
              [(ngModel)]="fechaNotificacion"
              placeholder="DD/MM/AAAA" />

            <oefa-form-field label="Monto Contractual (Con Error)" [required]="true" error="El monto total no puede ser inferior al cálculo de entregables (S/ 0.00)">
              <input type="text" class="form-input font-mono" value="0.00" />
            </oefa-form-field>

            <oefa-date-picker
              label="Fecha Límite (Solo Lectura)"
              [disabled]="true"
              [(ngModel)]="fechaLimite"
              placeholder="DD/MM/AAAA" />

            <oefa-form-field label="Filtro Rápido en Tabla" help="Variante compacta para toolbars">
              <select class="form-select-sm">
                <option value="ALL">Todos los estados</option>
                <option value="PEN">Pendientes</option>
                <option value="APR">Aprobados</option>
              </select>
            </oefa-form-field>
          </div>
        </div>
      </div>

      <!-- Sección 2: Áreas de Texto y Selección -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Áreas de Texto y Selección Básica</h3>
          <span class="text-muted">Campos multilínea con &lt;oefa-form-field&gt; y controles nativos con acento OEFA.</span>
        </div>
        <div class="card-body">
          <oefa-form-field label="Descripción del Servicio / Observaciones de Entregable" help="Permite hasta 500 caracteres con auto-ajuste de altura">
            <textarea class="form-textarea" rows="3" placeholder="Detalle los términos de referencia u observaciones registradas..."></textarea>
          </oefa-form-field>

          <div style="margin-top: 20px;">
            <label class="form-label" style="display: block; margin-bottom: 8px;">Controles de Selección (Checkbox &amp; Radio):</label>
            <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
              <label style="display: flex; gap: 8px; align-items: center; cursor: pointer; font-size: 0.875rem;">
                <input type="checkbox" checked /> Notificación automática por correo
              </label>
              <label style="display: flex; gap: 8px; align-items: center; cursor: pointer; font-size: 0.875rem;">
                <input type="radio" name="ds-radio" checked /> Orden de Servicio
              </label>
              <label style="display: flex; gap: 8px; align-items: center; cursor: pointer; font-size: 0.875rem;">
                <input type="radio" name="ds-radio" /> Orden de Compra
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 3: Divulgación Progresiva (<oefa-collapsible>) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Divulgación Progresiva (&lt;oefa-collapsible&gt; - Molécula)</h3>
          <span class="text-muted">Despliega datos complementarios, variables de inclusión o filtros secundarios sin saturar la pantalla inicial.</span>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Ejemplo 1: Variante Dashed con Badge Opcional -->
          <oefa-collapsible
            title="Información de Contacto y Datos Opcionales de Enfoque Diferencial"
            badge="OPCIONAL"
            badgeVariant="neutral"
            variant="dashed">
            <div class="form-grid" style="margin-top: 4px;">
              <oefa-form-field label="Teléfono Celular" help="Para alertas SMS">
                <input type="tel" class="form-input" placeholder="Ej: 987654321" />
              </oefa-form-field>
              <oefa-form-field label="Correo Electrónico Alternativo">
                <input type="email" class="form-input" placeholder="contacto@ejemplo.com" />
              </oefa-form-field>
            </div>
          </oefa-collapsible>

          <!-- Ejemplo 2: Variante Bordered con Badge de Estado -->
          <oefa-collapsible
            title="Parámetros Avanzados de Auditoría y Fiscalización"
            badge="AVANZADO"
            badgeVariant="info"
            variant="bordered">
            <div class="form-grid" style="margin-top: 4px;">
              <oefa-form-field label="Código de Expediente SIGED">
                <input type="text" class="form-input font-mono" placeholder="EXP-2026-00341" />
              </oefa-form-field>
              <oefa-form-field label="Nivel de Prioridad de Inspección">
                <select class="form-select">
                  <option>Estándar (Nivel 1)</option>
                  <option>Urgente (Nivel 2)</option>
                  <option>Crítico Ambiental (Nivel 3)</option>
                </select>
              </oefa-form-field>
            </div>
          </oefa-collapsible>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
  `]
})
export class DesignSystemInputsComponent {
  fechaNotificacion = '2026-01-08';
  fechaLimite = '2026-03-15';
}


