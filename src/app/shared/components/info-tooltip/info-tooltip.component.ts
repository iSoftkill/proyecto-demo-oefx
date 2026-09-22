import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oefa-info-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      #trigger
      class="oefa-info-tooltip"
      [class.size-sm]="size === 'sm'"
      [class.size-md]="size === 'md'"
      tabindex="0"
      role="button"
      [attr.aria-label]="ariaLabel ? ariaLabel + ': ' + text : text"
      (mouseenter)="showTooltip()"
      (mouseleave)="hideTooltip()"
      (focus)="showTooltip()"
      (blur)="hideTooltip()"
      (click)="$event.stopPropagation()"
      (keydown.enter)="$event.stopPropagation()"
      (keydown.space)="$event.stopPropagation()"
      (keydown.escape)="hideTooltip()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="info-svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      line-height: 1;
    }

    .oefa-info-tooltip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: help;
      color: var(--oefa-text-muted, #94a3b8);
      border-radius: 50%;
      outline: none;
      transition: color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
      box-sizing: border-box;

      &:hover,
      &:focus-visible {
        color: var(--oefa-primary-root);
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring);
        outline-offset: 2px;
      }
    }

    .size-sm .info-svg {
      width: 14px;
      height: 14px;
    }

    .size-md .info-svg {
      width: 16px;
      height: 16px;
    }
  `]
})
export class OefaInfoTooltipComponent implements OnDestroy {
  @Input() text: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() size: 'sm' | 'md' = 'sm';
  @Input() ariaLabel: string = 'Más información';

  @ViewChild('trigger', { static: true }) triggerEl!: ElementRef<HTMLElement>;

  private tooltipEl: HTMLElement | null = null;
  private showTimeoutId: any = null;
  private boundScrollHandler: any = null;

  showTooltip(): void {
    if (!this.text || typeof document === 'undefined') return;

    this.clearTimeout();
    this.showTimeoutId = setTimeout(() => {
      this.createAndPositionTooltip();
    }, 120);
  }

  hideTooltip(): void {
    this.clearTimeout();
    this.removeTooltipElement();
  }

  private createAndPositionTooltip(): void {
    if (!this.text || typeof document === 'undefined') return;

    this.removeTooltipElement();

    const tooltip = document.createElement('div');
    tooltip.className = 'oefa-floating-tooltip';

    const textSpan = document.createElement('span');
    textSpan.className = 'floating-tooltip-text';
    textSpan.textContent = this.text;
    tooltip.appendChild(textSpan);

    const arrow = document.createElement('span');
    arrow.className = 'floating-tooltip-arrow';
    tooltip.appendChild(arrow);

    document.body.appendChild(tooltip);
    this.tooltipEl = tooltip;

    this.updatePosition();

    requestAnimationFrame(() => {
      if (this.tooltipEl) {
        this.tooltipEl.classList.add('visible');
      }
    });

    this.boundScrollHandler = () => this.hideTooltip();
    window.addEventListener('scroll', this.boundScrollHandler, { capture: true, passive: true });
    window.addEventListener('resize', this.boundScrollHandler, { passive: true });
  }

  private updatePosition(): void {
    if (!this.tooltipEl || !this.triggerEl) return;

    const triggerRect = this.triggerEl.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    const vWidth = window.innerWidth;
    const vHeight = window.innerHeight;
    const gap = 8;
    const padding = 8;

    let placement = this.position;

    const spaceTop = triggerRect.top;
    const spaceBottom = vHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = vWidth - triggerRect.right;

    // Auto-flip logic
    if (placement === 'top' && spaceTop < tooltipRect.height + gap + padding && spaceBottom >= tooltipRect.height + gap + padding) {
      placement = 'bottom';
    } else if (placement === 'bottom' && spaceBottom < tooltipRect.height + gap + padding && spaceTop >= tooltipRect.height + gap + padding) {
      placement = 'top';
    } else if (placement === 'left' && spaceLeft < tooltipRect.width + gap + padding && spaceRight >= tooltipRect.width + gap + padding) {
      placement = 'right';
    } else if (placement === 'right' && spaceRight < tooltipRect.width + gap + padding && spaceLeft >= tooltipRect.width + gap + padding) {
      placement = 'left';
    }

    let top = 0;
    let left = 0;
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;

    const arrowEl = this.tooltipEl.querySelector('.floating-tooltip-arrow') as HTMLElement;

    if (placement === 'top') {
      top = triggerRect.top - tooltipRect.height - gap;
      left = triggerCenterX - tooltipRect.width / 2;
    } else if (placement === 'bottom') {
      top = triggerRect.bottom + gap;
      left = triggerCenterX - tooltipRect.width / 2;
    } else if (placement === 'left') {
      left = triggerRect.left - tooltipRect.width - gap;
      top = triggerCenterY - tooltipRect.height / 2;
    } else if (placement === 'right') {
      left = triggerRect.right + gap;
      top = triggerCenterY - tooltipRect.height / 2;
    }

    // Viewport clamping & arrow alignment
    if (placement === 'top' || placement === 'bottom') {
      const minLeft = padding;
      const maxLeft = vWidth - tooltipRect.width - padding;
      const clampedLeft = Math.max(minLeft, Math.min(left, maxLeft));

      let arrowLeft = triggerCenterX - clampedLeft;
      arrowLeft = Math.max(10, Math.min(arrowLeft, tooltipRect.width - 10));

      if (arrowEl) {
        arrowEl.style.left = `${arrowLeft}px`;
        arrowEl.style.top = '';
      }
      left = clampedLeft;
    } else {
      const minTop = padding;
      const maxTop = vHeight - tooltipRect.height - padding;
      const clampedTop = Math.max(minTop, Math.min(top, maxTop));

      let arrowTop = triggerCenterY - clampedTop;
      arrowTop = Math.max(10, Math.min(arrowTop, tooltipRect.height - 10));

      if (arrowEl) {
        arrowEl.style.top = `${arrowTop}px`;
        arrowEl.style.left = '';
      }
      top = clampedTop;
    }

    this.tooltipEl.setAttribute('data-placement', placement);
    this.tooltipEl.style.top = `${Math.round(top)}px`;
    this.tooltipEl.style.left = `${Math.round(left)}px`;
  }

  private clearTimeout(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  private removeTooltipElement(): void {
    if (this.boundScrollHandler && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.boundScrollHandler, { capture: true } as any);
      window.removeEventListener('resize', this.boundScrollHandler);
      this.boundScrollHandler = null;
    }

    if (this.tooltipEl && this.tooltipEl.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
    this.removeTooltipElement();
  }
}
