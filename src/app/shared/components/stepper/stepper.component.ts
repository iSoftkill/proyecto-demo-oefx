import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OefaStepItem {
  title: string;
  description?: string;
  disabled?: boolean;
}

export type StepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'oefa-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="step-wizard" 
      [class.stepper-vertical]="orientation === 'vertical'"
      [class.stepper-horizontal]="orientation === 'horizontal'"
      role="navigation" 
      aria-label="Progreso del asistente"
    >
      <!-- Contenedor principal de pasos -->
      <ol class="steps-track" role="list">
        @for (step of steps; track $index; let i = $index; let last = $last) {
          <li class="step-wrapper" [class.last-step]="last">
            <!-- Botón o Fila del Paso con soporte de accesibilidad por teclado -->
            <div 
              class="step-item" 
              [class.active]="currentStep === i + 1"
              [class.completed]="currentStep > i + 1"
              [class.clickable]="clickable && !step.disabled"
              [attr.tabindex]="clickable && !step.disabled ? 0 : null"
              [attr.role]="clickable ? 'button' : null"
              [attr.aria-disabled]="step.disabled ? true : null"
              [attr.aria-label]="'Paso ' + (i + 1) + ': ' + step.title + (currentStep === i + 1 ? ' (Paso actual)' : currentStep > i + 1 ? ' (Completado)' : '')"
              (click)="onStepClick(i + 1, step.disabled)"
              (keydown.enter)="onStepClick(i + 1, step.disabled)"
              (keydown.space)="$event.preventDefault(); onStepClick(i + 1, step.disabled)"
            >
              <div class="step-circle" [attr.aria-current]="currentStep === i + 1 ? 'step' : null">
                @if (currentStep > i + 1) {
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span class="sr-only">Completado</span>
                } @else {
                  <span aria-hidden="true">{{ i + 1 }}</span>
                }
              </div>
              <div class="step-info" aria-hidden="true">
                <span class="step-title">{{ step.title }}</span>
                @if (step.description) {
                  <span class="step-desc">{{ step.description }}</span>
                }
              </div>
            </div>

            <!-- Línea conectora entre pasos -->
            @if (!last) {
              <div 
                class="step-line" 
                [class.completed]="currentStep > i + 1"
                aria-hidden="true"
              ></div>
            }
          </li>
        }
      </ol>

      <!-- En Móvil (<=640px) y Horizontal: Cuadro de diálogo/burbuja con flecha dinámica -->
      @if (orientation === 'horizontal' && steps.length > 0 && currentStep >= 1 && currentStep <= steps.length) {
        <div 
          class="mobile-speech-bubble"
          role="status"
          aria-live="polite"
        >
          <!-- Flecha indicadora dinámica alineada con el paso activo -->
          <div 
            class="bubble-arrow" 
            [style.left]="getArrowPositionPercentage()"
            aria-hidden="true"
          ></div>

          <div class="bubble-content">
            <span class="bubble-badge">PASO {{ currentStep }} DE {{ steps.length }}</span>
            <h4 class="bubble-title">{{ steps[currentStep - 1].title }}</h4>
            @if (steps[currentStep - 1].description) {
              <p class="bubble-desc">{{ steps[currentStep - 1].description }}</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .step-wizard {
      width: 100%;
      position: relative;
    }

    .steps-track {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* ── MODO HORIZONTAL (DESKTOP: > 992px) ── */
    .step-wizard.stepper-horizontal {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .steps-track {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .step-wrapper {
        display: flex;
        align-items: center;
        flex: 1;

        &.last-step {
          flex: 0 0 auto;
        }
      }

      .step-line {
        flex: 1;
        height: 2px;
        background-color: var(--oefa-border-color, #e2e8f0);
        margin: 0 16px;
        transition: background-color 0.2s ease;

        &.completed {
          background-color: var(--oefa-primary-root, #144AA7);
        }
      }

      .mobile-speech-bubble {
        display: none;
      }
    }

    /* ── MODO VERTICAL (LATERALES, DRAWERS) ── */
    .step-wizard.stepper-vertical {
      .steps-track {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }

      .step-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        position: relative;
      }

      .step-item {
        margin-bottom: 4px;
      }

      .step-line {
        width: 2px;
        height: 32px;
        background-color: var(--oefa-border-color, #e2e8f0);
        margin-left: 17px;
        margin-top: 2px;
        margin-bottom: 6px;
        transition: background-color 0.2s ease;

        &.completed {
          background-color: var(--oefa-primary-root, #144AA7);
        }
      }

      .mobile-speech-bubble {
        display: none;
      }
    }

    /* ── ELEMENTO DE PASO BASE ── */
    .step-item {
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 2;
      background: transparent;
      user-select: none;
      border-radius: var(--oefa-radius-md, 8px);
      padding: 4px;

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring);
        outline-offset: 2px;
      }

      &.clickable {
        cursor: pointer;

        &:hover .step-title {
          color: var(--oefa-primary-root, #144AA7);
        }

        &:hover .step-circle {
          border-color: var(--oefa-primary-root, #144AA7);
        }
      }
    }

    .step-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--oefa-surface-subtle, #f8fafc);
      color: var(--oefa-text-secondary, #475569);
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.9375rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--oefa-border-color, #cbd5e1);
      transition: all 0.2s ease;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .step-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .step-title {
      font-family: var(--oefa-font-display, inherit);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-secondary, #475569);
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .step-desc {
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #94a3b8);
      line-height: 1.2;
    }

    .step-item.active {
      .step-circle {
        background-color: var(--oefa-primary-root, #144AA7);
        border-color: var(--oefa-primary-root, #144AA7);
        color: var(--oefa-primary-on, #ffffff);
        box-shadow: 0 0 0 4px var(--oefa-primary-container, #eef4ff);
      }

      .step-title {
        color: var(--oefa-primary-root, #144AA7);
        font-weight: 700;
      }
    }

    .step-item.completed {
      .step-circle {
        background-color: var(--oefa-primary-root, #144AA7);
        border-color: var(--oefa-primary-root, #144AA7);
        color: var(--oefa-primary-on, #ffffff);
      }

      .step-title {
        color: var(--oefa-text-primary, #0f172a);
      }
    }

    /* ── ADAPTABILIDAD RESPONSIVA PROGRESIVA ── */

    /* 1. TABLET (641px a 992px): Número arriba, Título debajo centrado con reparto equitativo */
    @media (max-width: 992px) and (min-width: 641px) {
      .step-wizard.stepper-horizontal {
        .steps-track {
          align-items: flex-start;
        }

        .step-wrapper {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          &.last-step {
            flex: 1 1 0;
          }
        }

        .step-item {
          width: 100%;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        .step-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-title {
          width: 100%;
          font-size: 0.75rem;
          line-height: 1.25;
          white-space: normal;
          text-align: center;
          padding: 0 4px;
          box-sizing: border-box;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 2.5em;
        }

        .step-desc {
          display: none;
        }

        .step-line {
          position: absolute;
          top: 18px;
          left: 50%;
          width: 100%;
          margin: 0;
          z-index: 1;
        }

        .step-circle {
          position: relative;
          z-index: 2;
        }
      }
    }

    /* 2. MÓVIL (≤ 640px): Círculos conectados + Burbuja de Diálogo Integrada */
    @media (max-width: 640px) {
      .step-wizard.stepper-horizontal {
        gap: 16px;

        .steps-track {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 6px 0;
        }

        .step-wrapper {
          display: flex;
          align-items: center;
          flex: 1;

          &.last-step {
            flex: 0 0 auto;
          }
        }

        .step-item {
          gap: 0;
          padding: 0;
          flex-shrink: 0;
        }

        .step-info {
          display: none;
        }

        .step-line {
          display: block;
          flex: 1;
          height: 3px;
          min-width: 14px;
          margin: 0 8px;
          border-radius: 2px;
          background-color: var(--oefa-border-color, #cbd5e1);
          transition: background-color 0.25s ease;

          &.completed {
            background-color: var(--oefa-primary-root, #144AA7);
          }
        }

        .step-circle {
          width: 36px;
          height: 36px;
          font-size: 0.875rem;
          border-width: 2px;
        }

        /* Burbuja de diálogo conectada al paso activo */
        .mobile-speech-bubble {
          display: block;
          position: relative;
          width: 100%;
          background-color: var(--oefa-primary-container, #eef4ff);
          border: 1.5px solid var(--oefa-border-color, #c7dbfb);
          border-radius: var(--oefa-radius-lg, 12px);
          padding: 14px 16px;
          box-shadow: var(--oefa-shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08));
          box-sizing: border-box;
          animation: bubbleFadeIn 0.2s ease-out;
        }

        /* Flechita dinámica superior apuntando al círculo */
        .bubble-arrow {
          position: absolute;
          top: -9px;
          width: 16px;
          height: 16px;
          background-color: var(--oefa-primary-container, #eef4ff);
          border-top: 1.5px solid var(--oefa-border-color, #c7dbfb);
          border-left: 1.5px solid var(--oefa-border-color, #c7dbfb);
          transform: translateX(-50%) rotate(45deg);
          border-top-left-radius: 3px;
          transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bubble-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bubble-badge {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--oefa-primary-root, #144AA7);
        }

        .bubble-title {
          margin: 0;
          font-family: var(--oefa-font-display, inherit);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--oefa-text-primary, #0f172a);
          line-height: 1.3;
        }

        .bubble-desc {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--oefa-text-secondary, #475569);
          line-height: 1.4;
        }
      }
    }

    @keyframes bubbleFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Clase de accesibilidad para lectores de pantalla */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class OefaStepperComponent {
  @Input() steps: OefaStepItem[] = [];
  @Input() currentStep: number = 1;
  @Input() clickable: boolean = false;
  @Input() orientation: StepperOrientation = 'horizontal';

  @Output() currentStepChange = new EventEmitter<number>();
  @Output() stepChange = new EventEmitter<number>();

  onStepClick(stepNumber: number, disabled?: boolean): void {
    if (this.clickable && !disabled && stepNumber !== this.currentStep) {
      this.currentStep = stepNumber;
      this.currentStepChange.emit(stepNumber);
      this.stepChange.emit(stepNumber);
    }
  }

  /**
   * Calcula el porcentaje horizontal exacto donde debe colocarse la flecha del globo de diálogo
   * para apuntar al centro del círculo del paso actual.
   */
  getArrowPositionPercentage(): string {
    if (!this.steps || this.steps.length <= 1) {
      return '50%';
    }
    // Paso 1 al 0%, último paso al 100% (con márgenes de resguardo de 24px para evitar desborde en esquinas)
    const index = Math.max(0, Math.min(this.currentStep - 1, this.steps.length - 1));
    const percentage = (index / (this.steps.length - 1)) * 100;
    
    // Si es el primer paso o el último, aplicamos un pequeño clamp para centrar con el círculo
    if (index === 0) {
      return '18px';
    }
    if (index === this.steps.length - 1) {
      return 'calc(100% - 18px)';
    }
    return `calc(${percentage}%)`;
  }
}
