import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SegmentedOption<T = any> {
  value: T;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

/**
 * Componente conmutador segmentado (Segmented Switch / Button Group)
 * Basado en los tokens institucionales OEFA (.segmented-switch & .switch-btn).
 *
 * @example
 * <oefa-segmented-switch
 *   [options]="[
 *     { value: 'orders', label: 'Vista por Órdenes' },
 *     { value: 'deliverables', label: 'Matriz Excel' }
 *   ]"
 *   [(selected)]="currentView" />
 */
@Component({
  selector: 'oefa-segmented-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="segmented-switch" 
      [class.full-width]="fullWidth"
      role="group" 
      [attr.aria-label]="ariaLabel">
      
      @for (opt of options; track opt.value) {
        <button
          type="button"
          class="switch-btn"
          [class.active]="opt.value === selected"
          [disabled]="opt.disabled"
          (click)="selectOption(opt)"
          [attr.aria-pressed]="opt.value === selected">
          
          @if (opt.icon) {
            <span class="switch-icon" [innerHTML]="opt.icon"></span>
          }

          <span class="switch-mode-text">{{ opt.label }}</span>

          @if (opt.badge !== undefined) {
            <span class="switch-badge">{{ opt.badge }}</span>
          }
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    :host(.block) {
      display: block;
      width: 100%;
    }
    .switch-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .switch-badge {
      font-size: 0.6875rem;
      padding: 1px 6px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.25);
      font-weight: 700;
    }
  `]
})
export class OefaSegmentedSwitchComponent<T = any> {
  @Input() options: SegmentedOption<T>[] = [];
  @Input() selected!: T;
  @Input() fullWidth = false;
  @Input() ariaLabel = 'Conmutador de opciones';

  @Output() selectedChange = new EventEmitter<T>();

  selectOption(opt: SegmentedOption<T>): void {
    if (!opt.disabled && opt.value !== this.selected) {
      this.selected = opt.value;
      this.selectedChange.emit(this.selected);
    }
  }
}
