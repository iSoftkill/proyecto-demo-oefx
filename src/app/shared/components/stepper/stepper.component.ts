import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaStepItem, StepperOrientation } from './stepper.models';

export type { OefaStepItem, StepperOrientation } from './stepper.models';

@Component({
  selector: 'oefa-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
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
    const index = Math.max(0, Math.min(this.currentStep - 1, this.steps.length - 1));
    const percentage = (index / (this.steps.length - 1)) * 100;

    if (index === 0) {
      return '18px';
    }
    if (index === this.steps.length - 1) {
      return 'calc(100% - 18px)';
    }
    return `calc(${percentage}%)`;
  }
}
