import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { OefaDateRangePickerComponent, OefaDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-design-system-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, OefaDateRangePickerComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📅 Selector de Fecha Institucional (Moléculas)</h2>
          <p class="subtitle">Componentes &lt;oefa-date-picker&gt; y &lt;oefa-date-range-picker&gt; accesibles con soporte ControlValueAccessor y WCAG 2.2.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- 1. Selector de Fecha Simple -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Selector Simple de Fecha con Ícono Nítido</h3>
          <span class="text-muted">Integra ícono SVG institucional con contraste, indicador de obligatoriedad, validación reactiva y apertura interactiva.</span>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <oefa-date-picker
              label="Fecha de Notificación Oficial"
              [required]="true"
              [(ngModel)]="dateStart"
            ></oefa-date-picker>

            <oefa-date-picker
              label="Fecha Límite Contractual (Con Error)"
              [required]="true"
              error="La fecha no puede ser anterior al inicio"
              [(ngModel)]="dateEnd"
            ></oefa-date-picker>

            <oefa-date-picker
              label="Fecha Bloqueada (Disabled)"
              [disabled]="true"
              [(ngModel)]="dateDisabled"
            ></oefa-date-picker>
          </div>

          <div class="value-preview">
            Valor seleccionado actual: <strong>{{ dateStart }}</strong>
          </div>
        </div>
      </div>

      <!-- 2. Selector de Rango de Fechas -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Selector de Rango de Fechas (&lt;oefa-date-range-picker&gt;)</h3>
          <span class="text-muted">Sombreado dinámico en hover y selección de intervalo, presets rápidos de período, navegación por teclado WAI-ARIA y anuncio en vivo (WCAG 2.2).</span>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <oefa-date-range-picker
              label="Período de Ejecución del Servicio"
              [required]="true"
              [(ngModel)]="serviceRange"
              (rangeChange)="onRangeChange($event)"
            ></oefa-date-range-picker>

            <oefa-date-range-picker
              label="Rango de Supervisión (Con Error de Plazo)"
              [required]="true"
              error="El período excede los 90 días hábiles permitidos"
              [(ngModel)]="errorRange"
            ></oefa-date-range-picker>
          </div>

          <div class="value-preview">
            Rango seleccionado: Inicio = <strong>{{ serviceRange.start || '—' }}</strong> | Fin = <strong>{{ serviceRange.end || '—' }}</strong>
          </div>
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

    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .value-preview { margin-top: 16px; font-size: 0.875rem; font-family: monospace; color: var(--oefa-text-secondary); }
  `]
})
export class DesignSystemDatePickerComponent {
  dateStart = '2026-09-14';
  dateEnd = '2026-09-01';
  dateDisabled = '2026-08-15';

  serviceRange: OefaDateRange = {
    start: '2026-09-10',
    end: '2026-09-25'
  };

  errorRange: OefaDateRange = {
    start: '2026-01-01',
    end: '2026-06-30'
  };

  onRangeChange(range: OefaDateRange) {
    console.log('Rango actualizado:', range);
  }
}
