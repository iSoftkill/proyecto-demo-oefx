import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-design-system-pagination',
  standalone: true,
  imports: [CommonModule, OefaPaginationComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔢 Paginación y Selector de Filas (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-pagination&gt; estandarizado para tablas, grids y catálogos de datos con selector de filas y accesibilidad de teclado.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Paginador Interactivo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Demostración Interactiva con 148 Registros</h3>
          <span class="text-muted">Calcula páginas totales, ventana de números visibles (con elipsis ...), deshabilitación de extremos y selector de tamaño.</span>
        </div>
        <div class="card-body">
          <div class="status-summary">
            <span>Página Actual: <strong>{{ currentPage() }}</strong></span>
            <span>Filas por Página: <strong>{{ pageSize() }}</strong></span>
            <span>Total Ítems: <strong>148</strong></span>
          </div>

          <div class="pagination-wrapper">
            <oefa-pagination
              [currentPage]="currentPage()"
              [pageSize]="pageSize()"
              [totalItems]="148"
              [pageSizeOptions]="[10, 25, 50, 100]"
              itemLabel="órdenes encontradas"
              (pageChange)="currentPage.set($event)"
              (pageSizeChange)="pageSize.set($event)" />
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Conjunto Pequeño de Datos -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Conjunto Pequeño (15 Ítems)</h3>
          <span class="text-muted">Cuando el total de ítems no supera el tamaño de página, se deshabilitan o simplifican las acciones.</span>
        </div>
        <div class="card-body">
          <div class="pagination-wrapper">
            <oefa-pagination
              [currentPage]="smallPage()"
              [pageSize]="10"
              [totalItems]="15"
              [pageSizeOptions]="[10, 20]"
              itemLabel="entregables"
              (pageChange)="smallPage.set($event)" />
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: API y Código de Ejemplo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Especificación de Inputs y Outputs</h3>
          <span class="text-muted">Fácil de conectar a cualquier señal o servicio de datos backend.</span>
        </div>
        <div class="card-body">
          <pre class="code-block"><code>&lt;oefa-pagination
  [currentPage]="currentPage()"
  [pageSize]="pageSize()"
  [totalItems]="totalRecords()"
  [pageSizeOptions]="[10, 25, 50, 100]"
  itemLabel="órdenes registradas"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); border-radius: calc(var(--oefa-radius-lg) - 1px) calc(var(--oefa-radius-lg) - 1px) 0 0; display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

    .status-summary { display: flex; gap: 24px; font-size: 0.875rem; color: var(--oefa-text-secondary); background: var(--oefa-surface-subtle); padding: 12px 16px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color); }
    .status-summary strong { color: var(--oefa-primary-root); font-weight: 700; }

    .pagination-wrapper { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-card); overflow: hidden; }

    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono);
      line-height: 1.5;
    }
  `]
})
export class DesignSystemPaginationComponent {
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  smallPage = signal<number>(1);
}
