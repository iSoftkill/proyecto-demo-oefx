import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaSkeletonComponent } from '../skeleton/skeleton.component';
import { OefaEmptyStateComponent } from '../empty-state/empty-state.component';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'oefa-table',
  standalone: true,
  imports: [CommonModule, OefaSkeletonComponent, OefaEmptyStateComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() emptyTitle: string = 'Sin registros disponibles';
  @Input() emptyDescription: string = 'No se encontraron elementos para mostrar.';
  @Input() rowClickable: boolean = false;
  @Input() skeletonRows: number = 4;

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
