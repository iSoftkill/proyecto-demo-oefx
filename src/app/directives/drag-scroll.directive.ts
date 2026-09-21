import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';

/**
 * DragScrollDirective — OEFA Design System Standard (Material Style)
 * 1. Permite arrastrar con mouse sobre CUALQUIER zona (incluyendo los botones de pestañas)
 *    distinguiendo entre click (seleccionar pestaña) y drag (desplazar).
 * 2. Inyecta flechas navegables estilo Material UI a la izquierda y derecha que se muestran
 *    al hacer hover cuando hay desbordamiento.
 */
@Directive({
  selector: '[dragScroll]',
  standalone: true
})
export class DragScrollDirective implements OnInit, OnDestroy {
  private isMouseDown = false;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private dragThreshold = 6; // px antes de considerar arrastre
  private mouseMoved = 0;

  private btnLeft!: HTMLButtonElement;
  private btnRight!: HTMLButtonElement;
  private resizeObserver?: ResizeObserver;

  private readonly el: HTMLElement;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound   = this.onMouseUp.bind(this);
  private onScrollBound    = this.updateArrowVisibility.bind(this);
  private onClickCaptureBound = this.onClickCapture.bind(this);

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.createNavArrows();
    this.el.addEventListener('scroll', this.onScrollBound, { passive: true });
    this.el.addEventListener('click', this.onClickCaptureBound, true);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateArrowVisibility());
      this.resizeObserver.observe(this.el);
    }

    setTimeout(() => this.updateArrowVisibility(), 150);
  }

  private createNavArrows(): void {
    const container = this.el.parentElement;
    if (!container) return;

    if (getComputedStyle(container).position === 'static') {
      this.renderer.setStyle(container, 'position', 'relative');
    }

    // Botón Izquierdo
    this.btnLeft = this.renderer.createElement('button') as HTMLButtonElement;
    this.btnLeft.type = 'button';
    this.btnLeft.className = 'tab-scroll-arrow tab-scroll-arrow-left';
    this.btnLeft.setAttribute('aria-label', 'Desplazar a la izquierda');
    this.btnLeft.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    `;
    this.renderer.listen(this.btnLeft, 'click', (e: Event) => {
      e.stopPropagation();
      this.el.scrollBy({ left: -220, behavior: 'smooth' });
    });

    // Botón Derecho
    this.btnRight = this.renderer.createElement('button') as HTMLButtonElement;
    this.btnRight.type = 'button';
    this.btnRight.className = 'tab-scroll-arrow tab-scroll-arrow-right';
    this.btnRight.setAttribute('aria-label', 'Desplazar a la derecha');
    this.btnRight.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `;
    this.renderer.listen(this.btnRight, 'click', (e: Event) => {
      e.stopPropagation();
      this.el.scrollBy({ left: 220, behavior: 'smooth' });
    });

    this.renderer.appendChild(container, this.btnLeft);
    this.renderer.appendChild(container, this.btnRight);
  }

  private updateArrowVisibility(): void {
    if (!this.btnLeft || !this.btnRight) return;

    const hasOverflow = this.el.scrollWidth > this.el.clientWidth + 2;
    const canScrollLeft = this.el.scrollLeft > 5;
    const canScrollRight = this.el.scrollLeft < (this.el.scrollWidth - this.el.clientWidth - 5);

    if (hasOverflow && canScrollLeft) {
      this.renderer.addClass(this.btnLeft, 'visible');
    } else {
      this.renderer.removeClass(this.btnLeft, 'visible');
    }

    if (hasOverflow && canScrollRight) {
      this.renderer.addClass(this.btnRight, 'visible');
    } else {
      this.renderer.removeClass(this.btnRight, 'visible');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent): void {
    // Si se hizo click en los botones de flechas, ignorar drag
    if ((e.target as HTMLElement).closest('.tab-scroll-arrow')) return;

    this.isMouseDown = true;
    this.isDragging = false;
    this.mouseMoved = 0;
    this.startX = e.pageX - this.el.getBoundingClientRect().left;
    this.scrollLeft = this.el.scrollLeft;

    document.addEventListener('mousemove', this.onMouseMoveBound);
    document.addEventListener('mouseup', this.onMouseUpBound);
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isMouseDown) return;

    const x = e.pageX - this.el.getBoundingClientRect().left;
    const delta = x - this.startX;
    this.mouseMoved = Math.abs(delta);

    if (!this.isDragging && this.mouseMoved > this.dragThreshold) {
      this.isDragging = true;
      this.renderer.setStyle(this.el, 'cursor', 'grabbing');
      this.renderer.setStyle(this.el, 'user-select', 'none');
    }

    if (this.isDragging) {
      e.preventDefault();
      this.el.scrollLeft = this.scrollLeft - delta;
    }
  }

  private onMouseUp(): void {
    this.isMouseDown = false;
    this.renderer.removeStyle(this.el, 'cursor');
    this.renderer.removeStyle(this.el, 'user-select');

    document.removeEventListener('mousemove', this.onMouseMoveBound);
    document.removeEventListener('mouseup', this.onMouseUpBound);

    setTimeout(() => {
      this.isDragging = false;
    }, 50);
  }

  private onClickCapture(e: MouseEvent): void {
    // Si fue un arrastre con movimiento, prevenir que se active la pestaña
    if (this.mouseMoved > this.dragThreshold) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.el.removeEventListener('scroll', this.onScrollBound);
    this.el.removeEventListener('click', this.onClickCaptureBound, true);
    document.removeEventListener('mousemove', this.onMouseMoveBound);
    document.removeEventListener('mouseup', this.onMouseUpBound);

    if (this.btnLeft && this.btnLeft.parentNode) {
      this.btnLeft.parentNode.removeChild(this.btnLeft);
    }
    if (this.btnRight && this.btnRight.parentNode) {
      this.btnRight.parentNode.removeChild(this.btnRight);
    }
  }
}
