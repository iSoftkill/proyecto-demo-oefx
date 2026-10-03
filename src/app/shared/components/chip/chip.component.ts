import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'project' | 'maintenance' | 'siged' | 'area' | 'deliverable' | 'default';

@Component({
  selector: 'oefa-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class OefaChipComponent {
  @Input() variant: ChipVariant = 'default';
  @Input() label: string = '';
  @Input() title?: string;
  @Input() active: boolean = false;
}
