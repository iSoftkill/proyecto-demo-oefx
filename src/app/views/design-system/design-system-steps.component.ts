import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaStepperComponent, OefaStepItem, StepperOrientation } from '../../shared/components/stepper/stepper.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';

@Component({
  selector: 'app-design-system-steps',
  standalone: true,
  imports: [CommonModule, OefaStepperComponent, OefaButtonComponent, OefaSegmentedSwitchComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🪜 Stepper y Wizard Progresivo (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-stepper&gt; responsivo para flujos secuenciales horizontales y verticales.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Sección 1: Demostración Interactiva con Conmutador de Orientación -->
      <div class="card ds-card">
        <div class="card-header">
          <div class="header-with-switch">
            <div>
              <h3>1. Stepper Interactivo (&lt;oefa-stepper&gt;)</h3>
              <span class="text-muted">Alterna entre disposición horizontal (asistentes de pantalla completa) y vertical (drawers o paneles laterales).</span>
            </div>
            <oefa-segmented-switch
              [options]="orientationOptions"
              [(selected)]="selectedOrientation"
            ></oefa-segmented-switch>
          </div>
        </div>
        <div class="card-body">
          <div class="stepper-demo-container" [class.is-vertical]="selectedOrientation() === 'vertical'">
            <oefa-stepper
              [steps]="wizardSteps"
              [(currentStep)]="stepNumber"
              [orientation]="selectedOrientation()"
              [clickable]="true">
            </oefa-stepper>

            <div class="step-preview-box">
              <h4 style="margin: 0 0 6px; color: var(--oefa-primary-root);">
                Paso {{ stepNumber() }}: {{ wizardSteps[stepNumber() - 1].title }}
              </h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--oefa-text-secondary);">
                {{ wizardSteps[stepNumber() - 1].description }}
              </p>
            </div>
          </div>

          <!-- Controles de simulación de pasos -->
          <div class="wizard-actions">
            <oefa-button 
              variant="secondary" 
              [disabled]="stepNumber() <= 1"
              (clicked)="prevStep()">
              ← Paso Anterior
            </oefa-button>

            <oefa-button 
              variant="primary" 
              [disabled]="stepNumber() >= wizardSteps.length"
              (clicked)="nextStep()">
              Siguiente Paso →
            </oefa-button>
          </div>
        </div>
      </div>

      <!-- Sección 2: Especificación y API -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación de Uso y Adaptabilidad Móvil</h3>
          <span class="text-muted">En Desktop (> 992px) muestra título y descripción; en Tablet (641px - 992px) muestra título centrado bajo el número con reparto equitativo; en Móvil (≤ 640px) muestra barra continua y banner activo.</span>
        </div>
        <div class="card-body">
          <pre class="code-block"><code>&lt;!-- Modo Horizontal (por defecto, auto-colapsable en móvil) --&gt;
&lt;oefa-stepper
  [steps]="wizardSteps"
  [(currentStep)]="currentStep"
  orientation="horizontal"
  [clickable]="true" /&gt;

&lt;!-- Modo Vertical (paneles laterales, drawers o auditoría) --&gt;
&lt;oefa-stepper
  [steps]="wizardSteps"
  [(currentStep)]="currentStep"
  orientation="vertical"
  [clickable]="true" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: white; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .header-with-switch { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
    .card-body { padding: 32px 24px; display: flex; flex-direction: column; gap: 28px; }

    .stepper-demo-container { display: flex; flex-direction: column; gap: 24px; }
    .stepper-demo-container.is-vertical {
      display: grid;
      grid-template-columns: 280px 1fr;
      align-items: start;
      gap: 32px;
    }
    @media (max-width: 640px) {
      .stepper-demo-container.is-vertical { grid-template-columns: 1fr; gap: 20px; }
    }

    .step-preview-box { padding: 18px; border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); }
    .wizard-actions { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--oefa-border-color); padding-top: 20px; }

    .code-block { margin: 0; padding: 14px; background: #0f172a; color: #f8fafc; border-radius: var(--oefa-radius-md); font-family: var(--oefa-font-mono, monospace); font-size: 0.8125rem; overflow-x: auto; }
  `]
})
export class DesignSystemStepsComponent {
  stepNumber = signal<number>(2);
  selectedOrientation = signal<StepperOrientation>('horizontal');

  orientationOptions: SegmentedOption[] = [
    { value: 'horizontal', label: '↔️ Horizontal' },
    { value: 'vertical', label: '↕️ Vertical' }
  ];

  wizardSteps: OefaStepItem[] = [
    { title: 'Paso 1: Cabecera', description: 'Datos generales de la orden y proveedor' },
    { title: 'Paso 2: Entregables', description: 'Configuración de plazos e hitos' },
    { title: 'Paso 3: Confirmación', description: 'Resumen y guardar orden' }
  ];

  nextStep(): void {
    if (this.stepNumber() < this.wizardSteps.length) {
      this.stepNumber.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.stepNumber() > 1) {
      this.stepNumber.update(s => s - 1);
    }
  }
}
