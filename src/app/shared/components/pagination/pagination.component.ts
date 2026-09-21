import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente reutilizable de paginación para tablas y listas de datos OEFA.
 * Estandariza la barra de paginación, selector de tamaño por página y controles numéricos
 * con límite dinámico de botones.
 *
 * @example
 * <oefa-pagination
 *   [currentPage]="currentPage()"
 *   [pageSize]="pageSize()"
 *   [totalItems]="totalOrders()"
 *   [pageSizeOptions]="[10, 25, 50, 100]"
 *   itemLabel="órdenes"
 *   (pageChange)="onPageChange($event)"
 *   (pageSizeChange)="onPageSizeChange($event)" />
 */
@Component({
  selector: 'oefa-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (totalItems > 0) {
      <div class="pagination-bar">
        <!-- Información de registros y selector de página -->
        <div class="pagination-info">
          <span class="pagination-text">
            Mostrando {{ startRecord }} - {{ endRecord }} de {{ totalItems }} {{ itemLabel }}
          </span>

          @if (showPageSizeSelector && pageSizeOptions.length > 0) {
            <div class="page-size-selector">
              <label [for]="selectId">Mostrar:</label>
              <select
                [id]="selectId"
                [ngModel]="pageSize"
                (ngModelChange)="handlePageSizeChange($event)"
                class="page-size-select">
                @for (opt of pageSizeOptions; track opt) {
                  <option [value]="opt" [selected]="opt === pageSize">{{ opt }}</option>
                }
              </select>
            </div>
          }
        </div>

        <!-- Controles de navegación de páginas -->
        <div class="pagination-controls">
          <button
            type="button"
            class="btn-page-nav"
            (click)="goToPage(1)"
            [disabled]="currentPage === 1"
            title="Primera página"
            aria-label="Primera página">
            «
          </button>
          
          <button
            type="button"
            class="btn-page-nav"
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage === 1"
            title="Página anterior"
            aria-label="Página anterior">
            ‹
          </button>

          @for (p of visiblePages; track p) {
            <button
              type="button"
              class="btn-page"
              [class.active]="p === currentPage"
              (click)="goToPage(p)"
              [attr.aria-current]="p === currentPage ? 'page' : null">
              {{ p }}
            </button>
          }

          <button
            type="button"
            class="btn-page-nav"
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage === totalPages"
            title="Página siguiente"
            aria-label="Página siguiente">
            ›
          </button>

          <button
            type="button"
            class="btn-page-nav"
            (click)="goToPage(totalPages)"
            [disabled]="currentPage === totalPages"
            title="Última página"
            aria-label="Última página">
            »
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    /* Los estilos de .pagination-bar, .btn-page, .btn-page-nav están en styles.scss */
  `]
})
export class OefaPaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() itemLabel = 'registros';
  @Input() showPageSizeSelector = true;
  @Input() maxButtons = 5;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  selectId = `pagination-select-${Math.random().toString(36).substring(2, 9)}`;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get startRecord(): number {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    let start = Math.max(1, this.currentPage - Math.floor(this.maxButtons / 2));
    let end = Math.min(this.totalPages, start + this.maxButtons - 1);

    if (end - start + 1 < this.maxButtons) {
      start = Math.max(1, end - this.maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize']) {
      if (this.currentPage > this.totalPages) {
        this.goToPage(this.totalPages);
      }
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  handlePageSizeChange(val: any): void {
    const size = Number(val);
    if (!isNaN(size) && size > 0 && size !== this.pageSize) {
      this.pageSizeChange.emit(size);
    }
  }
}
