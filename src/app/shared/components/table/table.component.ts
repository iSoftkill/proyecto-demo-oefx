import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaSkeletonComponent } from '../skeleton/skeleton.component';
import { OefaEmptyStateComponent } from '../empty-state/empty-state.component';
import { OefaStatusBadgeComponent } from '../status-badge/status-badge.component';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  type?: 'text' | 'badge' | 'mono' | 'currency' | 'date';
  formatter?: (value: any, row: T) => string;
}

export type SortDirection = 'asc' | 'desc' | null;
export type TableDensity = 'default' | 'compact' | 'comfortable';

/**
 * Componente Organismo para Tablas de Datos Institucionales del OEFA.
 * Soporta ordenamiento por columnas, loading skeleton, estados vacíos,
 * densidades adaptables (incluyendo modo matriz compacto), rayado (striped)
 * y bordes de cuadrícula (bordered).
 */
@Component({
  selector: 'oefa-table',
  standalone: true,
  imports: [CommonModule, OefaSkeletonComponent, OefaEmptyStateComponent, OefaStatusBadgeComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class OefaTableComponent {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() emptyTitle: string = 'Sin registros disponibles';
  @Input() emptyDescription: string = 'No se encontraron elementos para mostrar.';
  @Input() rowClickable: boolean = false;
  @Input() skeletonRows: number = 4;
  @Input() density: TableDensity = 'default';
  @Input() striped: boolean = false;
  @Input() bordered: boolean = false;
  @Input() stickyHeader: boolean = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();

  sortColumn = signal<string | null>(null);
  sortDirection = signal<SortDirection>(null);

  onHeaderClick(col: TableColumn) {
    if (!col.sortable) return;

    let newDir: 'asc' | 'desc' = 'asc';
    if (this.sortColumn() === col.key) {
      newDir = this.sortDirection() === 'asc' ? 'desc' : 'asc';
    }

    this.sortColumn.set(col.key);
    this.sortDirection.set(newDir);
    this.sortChange.emit({ key: col.key, direction: newDir });
  }

  onRowClick(row: any) {
    if (this.rowClickable) {
      this.rowClick.emit(row);
    }
  }

  get dummySkeletonRows(): number[] {
    return Array.from({ length: this.skeletonRows });
  }
}

// Alias de retrocompatibilidad
export { OefaTableComponent as TableComponent };
