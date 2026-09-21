import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'project' | 'maintenance' | 'siged' | 'area' | 'deliverable' | 'default';

@Component({
  selector: 'oefa-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (variant) {
      @case ('project') {
        <span class="project-badge badge-proyecto">
          [PRY] {{ label }}
        </span>
      }
      @case ('maintenance') {
        <span class="project-badge badge-mantenimiento">
          [MNT] {{ label }}
        </span>
      }
      @case ('siged') {
        <span class="siged-chip">
          {{ label }}
        </span>
      }
      @case ('area') {
        <span class="area-chip" [title]="title || label">
          {{ label }}
        </span>
      }
      @case ('deliverable') {
        <span class="del-num-badge">
          {{ label }}
        </span>
      }
      @default {
        <span class="filter-chip" [class.active]="active">
          {{ label }}
        </span>
      }
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
  `]
})
export class OefaChipComponent {
  @Input() variant: ChipVariant = 'default';
  @Input() label: string = '';
  @Input() title?: string;
  @Input() active: boolean = false;
}
