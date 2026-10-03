import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OefaPageLayoutComponent,
  OefaButtonComponent,
  OefaIconButtonComponent,
  OefaIconComponent,
  OefaStatusBadgeComponent,
  OefaPaginationComponent,
  OefaEmptyStateComponent,
  OefaDropdownComponent
} from '../../../shared';

export interface TableroItem {
  id: string;
  titulo: string;
  proceso: string;
  seccion: string;
  tipoTablero: string;
  tipo: string;
  ultimaModificacion: string;
  activo: boolean;
  destacado: boolean;
}

@Component({
  selector: 'app-tableros',
  standalone: true,
  imports: [
    CommonModule,
    OefaPageLayoutComponent,
    OefaButtonComponent,
    OefaIconButtonComponent,
    OefaIconComponent,
    OefaStatusBadgeComponent,
    OefaPaginationComponent,
    OefaEmptyStateComponent,
    OefaDropdownComponent
  ],
  templateUrl: './tableros.component.html',
  styleUrl: './tableros.component.scss'
})
export class TablerosComponent {
  searchTerm = signal<string>('');
  selectedFiltro = signal<string>('todos');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  activeDropdownId = signal<string | null>(null);

  tableros = signal<TableroItem[]>([
    {
      id: 'TAB-0001',
      titulo: 'DEAM Seguimiento metas Planefa',
      proceso: 'Procesos Misionales',
      seccion: 'PLANEFA',
      tipoTablero: 'Consulta general',
      tipo: 'looker',
      ultimaModificacion: '17/9/2026, 8:03:03 p. m.',
      activo: true,
      destacado: true
    },
    {
      id: 'TAB-0002',
      titulo: 'SMER Supervisión Directa Minería y Energía',
      proceso: 'Procesos Estratégicos',
      seccion: 'SUPERVISIÓN',
      tipoTablero: 'Reporte ejecutivo',
      tipo: 'powerbi',
      ultimaModificacion: '18/9/2026, 10:15:20 a. m.',
      activo: true,
      destacado: false
    },
    {
      id: 'TAB-0003',
      titulo: 'DFAI Fiscalización y Sanción Ambiental',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0003',
      titulo: 'DFAI Fiscalización y Sanción Ambiental',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0003',
      titulo: 'DFAI Fiscalización y Sanción Ambiental',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0003',
      titulo: 'DFAI Fiscalización y Sanción Ambiental',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0003',
      titulo: 'DFAI Fiscalización y Sanción Ambiental',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0004',
      titulo: 'DFAI Fiscalización y Sanción Ambiental - Fase 2',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'looker',
      ultimaModificacion: '19/9/2026, 12:45:10 p. m.',
      activo: false,
      destacado: false
    },
    {
      id: 'TAB-0005',
      titulo: 'DFAI Seguimiento y Cumplimiento de Medidas',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero operativo',
      tipo: 'powerbi',
      ultimaModificacion: '20/9/2026, 09:15:30 a. m.',
      activo: true,
      destacado: true
    },
    {
      id: 'TAB-0006',
      titulo: 'DFAI Registro de Infractores Ambientales',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero estratégico',
      tipo: 'looker',
      ultimaModificacion: '21/9/2026, 03:20:45 p. m.',
      activo: true,
      destacado: false
    },
    {
      id: 'TAB-0007',
      titulo: 'DFAI Histórico de Resoluciones Directorales',
      proceso: 'Procesos Misionales',
      seccion: 'SANCIONES',
      tipoTablero: 'Tablero analítico',
      tipo: 'powerbi',
      ultimaModificacion: '22/9/2026, 11:10:00 a. m.',
      activo: false,
      destacado: false
    }
  ]);

  filteredTableros = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filtro = this.selectedFiltro();

    return this.tableros().filter(item => {
      const matchesSearch = !term || 
        item.titulo.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term) ||
        item.proceso.toLowerCase().includes(term) ||
        item.seccion.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      if (filtro === 'activos') return item.activo;
      if (filtro === 'inactivos') return !item.activo;
      if (filtro === 'destacados') return item.destacado;
      return true;
    });
  });

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedFiltro.set(select.value);
  }

  toggleDropdown(id: string): void {
    this.activeDropdownId.update(current => current === id ? null : id);
  }

  onDropdownChange(id: string, isOpen: boolean): void {
    if (!isOpen && this.activeDropdownId() === id) {
      this.activeDropdownId.set(null);
    }
  }

  onNuevoTablero(): void {
    console.log('Crear nuevo tablero');
  }

  onVer(item: TableroItem): void {
    console.log('Ver enlace:', item);
  }

  onEditar(item: TableroItem): void {
    console.log('Editar:', item);
  }

  onDuplicar(item: TableroItem): void {
    console.log('Duplicar:', item);
  }

  onToggleEstado(item: TableroItem): void {
    this.tableros.update(list => 
      list.map(t => t.id === item.id ? { ...t, activo: !t.activo } : t)
    );
  }

  onEliminar(item: TableroItem): void {
    this.tableros.update(list => list.filter(t => t.id !== item.id));
  }
}