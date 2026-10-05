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
  OefaDropdownComponent,
  OefaModalComponent,
  OefaStepperComponent,
  OefaChipComponent,
  type OefaStepItem
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
    OefaChipComponent,
    OefaPaginationComponent,
    OefaEmptyStateComponent,
    OefaDropdownComponent,
    OefaModalComponent,
    OefaStepperComponent
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

  // Estado del Modal y Stepper de Nuevo Tablero
  isModalNuevoOpen = signal<boolean>(false);
  pasoActual = signal<number>(1);

  pasosNuevoTablero: OefaStepItem[] = [
    { title: 'Datos Generales', description: 'Información y acceso' },
    { title: 'Clasificación', description: 'Proceso, sección y temas' },
    { title: 'Ficha Técnica', description: 'Metadatos y documentación' }
  ];

  // ── Formulario: Paso 1 (Datos Generales) ──
  nuevoTitulo = signal<string>('');
  nuevaDescripcion = signal<string>('');
  nuevoDestacado = signal<boolean>(false);

  // Clasificación
  nuevoProceso = signal<string>('Procesos Misionales');
  nuevaSeccion = signal<string>('SUPERVISIÓN');
  nuevoTipoTablero = signal<string>('Reporte ejecutivo');
  nuevaCategoria = signal<string>('Ambiental');
  nuevaHerramientaBI = signal<string>('looker');
  nuevoIcono = signal<string>('factory');
  filtroIcono = signal<string>('');

  // Selector de Temas (1 a 1)
  temasCatalogo = [
    'Minería',
    'Electricidad',
    'Hidrocarburos',
    'Pesquería',
    'Industria',
    'Residuos Sólidos',
    'Fauna Silvestre',
    'Supervisión Ambiental',
    'Fiscalización'
  ];
  nuevoTema = signal<string>('Minería');

  // Opciones paramétricas de Clasificación
  procesosOpciones = [
    'Procesos Estratégicos',
    'Procesos Misionales',
    'Procesos de Apoyo'
  ];

  seccionesOpciones = [
    'PLANEFA',
    'SUPERVISIÓN',
    'SANCIONES',
    'EVALUACIÓN',
    'VIGILANCIA AMBIENTAL'
  ];

  tiposTableroOpciones = [
    'Consulta general',
    'Reporte ejecutivo',
    'Tablero operativo',
    'Tablero estratégico',
    'Tablero analítico'
  ];

  categoriasOpciones = [
    'Ambiental',
    'Fiscalización',
    'Supervisión',
    'Administrativo',
    'Normativa y Legal'
  ];

  herramientasBIOpciones = [
    { id: 'looker', label: 'Google Looker Studio' },
    { id: 'powerbi', label: 'Microsoft Power BI' },
    { id: 'tableau', label: 'Tableau' },
    { id: 'qlik', label: 'Qlik Sense' }
  ];

  isIconDropdownOpen = signal<boolean>(false);

  iconosCatalogo = [
    { id: 'factory', label: 'Fábrica / Industria' },
    { id: 'droplets', label: 'Agua / Efluentes' },
    { id: 'leaf', label: 'Ambiente / Flora' },
    { id: 'scale', label: 'Normativa / Legal' },
    { id: 'pickaxe', label: 'Minería' },
    { id: 'waves', label: 'Marino / Pesquería' },
    { id: 'clipboard-check', label: 'Fiscalización' },
    { id: 'globe', label: 'Portal / Web' },
    { id: 'table', label: 'Tablas / Datos' },
    { id: 'grid', label: 'Catálogo / Grilla' },
    { id: 'layers', label: 'Capas / GIS' },
    { id: 'layout', label: 'Estructura / Dashboard' },
    { id: 'chart', label: 'Estadísticas / KPI' },
    { id: 'sliders', label: 'Parámetros / Filtros' },
    { id: 'building', label: 'Sede / Institucional' },
    { id: 'users', label: 'Ciudadanía / Personal' },
    { id: 'shield', label: 'Control / Seguridad' },
    { id: 'document', label: 'Expediente / Ficha' },
    { id: 'code', label: 'Integración / API' },
    { id: 'tag', label: 'Categorías / Tags' },
    { id: 'zap', label: 'Energía / Electricidad' },
    { id: 'bell', label: 'Alertas / Notificaciones' }
  ];

  iconosFiltrados = computed(() => {
    const term = this.filtroIcono().toLowerCase().trim();
    if (!term) return this.iconosCatalogo;
    return this.iconosCatalogo.filter(i =>
      i.id.toLowerCase().includes(term) || i.label.toLowerCase().includes(term)
    );
  });

  // ── Formulario: Paso 2 (Publicación y Ficha Técnica) ──
  nuevaUrlDashboard = signal<string>('');
  nuevoResponsable = signal<string>('');
  nuevaFichaDescripcion = signal<string>('');
  nuevaFuenteDatos = signal<string>('');
  nuevaPeriodicidad = signal<string>('Mensual');
  nuevaObservaciones = signal<string>('');
  nuevoDocumentoUrl = signal<string>('');

  periodicidadOpciones = [
    'En tiempo real',
    'Diaria',
    'Semanal',
    'Quincenal',
    'Mensual',
    'Trimestral',
    'Semestral',
    'Anual'
  ];

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
      id: 'TAB-0004',
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
      id: 'TAB-0005',
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
      id: 'TAB-0006',
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
      id: 'TAB-0007',
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
      id: 'TAB-0008',
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
      id: 'TAB-0009',
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
      id: 'TAB-0010',
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
      id: 'TAB-0011',
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
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.currentPage.set(1);
  }

  setFilter(filtro: string): void {
    this.selectedFiltro.set(filtro);
    this.currentPage.set(1);
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedFiltro.set(select.value);
    this.currentPage.set(1);
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
    this.pasoActual.set(1);
    this.isModalNuevoOpen.set(true);
  }

  cerrarModalNuevo(): void {
    this.isModalNuevoOpen.set(false);
  }

  onStepChange(step: number): void {
    this.pasoActual.set(step);
  }

  siguientePaso(): void {
    if (this.pasoActual() < this.pasosNuevoTablero.length) {
      this.pasoActual.update(p => p + 1);
    }
  }

  anteriorPaso(): void {
    if (this.pasoActual() > 1) {
      this.pasoActual.update(p => p - 1);
    }
  }



  onFiltroIconoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filtroIcono.set(input.value);
  }

  getIconoLabel(id: string): string {
    const ico = this.iconosCatalogo.find(i => i.id === id);
    return ico ? ico.label : id;
  }

  seleccionarIcono(id: string): void {
    this.nuevoIcono.set(id);
    this.isIconDropdownOpen.set(false);
    this.filtroIcono.set('');
  }

  guardarTablero(): void {
    if (!this.nuevoTitulo().trim()) {
      this.pasoActual.set(1);
      return;
    }
    const nuevoId = `TAB-${String(this.tableros().length + 1).padStart(4, '0')}`;
    const nuevoItem: TableroItem = {
      id: nuevoId,
      titulo: this.nuevoTitulo().trim(),
      proceso: this.nuevoProceso(),
      seccion: this.nuevaSeccion(),
      tipoTablero: this.nuevoTipoTablero(),
      tipo: this.nuevaHerramientaBI(),
      ultimaModificacion: new Date().toLocaleString('es-PE'),
      activo: true,
      destacado: this.nuevoDestacado()
    };
    this.tableros.update(list => [nuevoItem, ...list]);
    this.cerrarModalNuevo();
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
  };

  paginadorTableros = computed(() => {
    const list = this.filteredTableros();
    const page = this.currentPage();
    const pageSize = this.pageSize();
    const offset = (page - 1) * pageSize;

    return list.slice(offset, offset + pageSize);
  });
}