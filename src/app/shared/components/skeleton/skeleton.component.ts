import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

@Component({
  selector: 'oefa-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class OefaSkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '16px';
  @Input() count: number = 1;

  get items(): number[] {
    return Array.from({ length: Math.max(1, this.count) }, (_, i) => i);
  }
}
