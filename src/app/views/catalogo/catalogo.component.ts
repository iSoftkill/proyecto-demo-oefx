import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import {
  OefaButtonComponent,
  OefaEmptyStateComponent,
  OefaFilterSidebarComponent,
  OefaPageLayoutComponent,
  OefaCatalogCardComponent,
  OefaIconComponent,
  BreadcrumbItem,
  FilterOption,
  FilterGroupItem,
  FilterStatusOption,
  CatalogChipConfig
} from '../../shared';

export interface TableroItem {
  id: string;
  title: string;
  description: string;
  category: string;
  process: 'Estratégico' | 'Misional' | 'Apoyo';
  tags: string[];
  icon: string;
  featured?: boolean;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OefaButtonComponent,
    OefaEmptyStateComponent,
    OefaFilterSidebarComponent,
    OefaPageLayoutComponent,
    OefaCatalogCardComponent,
    OefaIconComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {
  // Breadcrumbs institucionales
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/inicio' },
    { label: 'Catálogo de Tableros' }
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Búsqueda y Filtros
  searchQuery = signal<string>('');
  selectedProcessFilter = signal<string>(this.route.snapshot.queryParamMap.get('proceso') || 'todos');
  selectedCategoryFilter = signal<string>('todas');

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const proc = params.get('proceso');
      if (proc) {
        this.selectedProcessFilter.set(proc);
      }
    });
  }

  // Drawer de filtros en móvil
  isMobileFilterOpen = signal<boolean>(false);

  // Filtros especiales
  onlyFeatured = signal<boolean>(false);
  onlyPlanefa = signal<boolean>(false);

  // Opciones de procesos para el Filter Sidebar
  processOptions: FilterStatusOption[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'Estratégico', label: 'Estratégico' },
    { value: 'Misional', label: 'Misional' },
    { value: 'Apoyo', label: 'Apoyo' }
  ];

  // Grupos facetados de filtros para el Filter Sidebar
  filterGroups = signal<FilterGroupItem[]>([
    {
      label: 'Sección',
      open: true,
      options: [
        { label: 'EVALUACIÓN', count: 1, checked: false },
        { label: 'SUPERVISIÓN', count: 2, checked: false },
        { label: 'FISCALIZACIÓN', count: 1, checked: false },
        { label: 'PLANEFA', count: 1, checked: false },
        { label: 'SMER', count: 1, checked: false },
        { label: 'TRANSVERSAL', count: 1, checked: false },
        { label: 'PCD', count: 1, checked: false }
      ]
    },
    {
      label: 'Categoría',
      open: true,
      options: [
        { label: 'Consulta general', count: 4, checked: false },
        { label: 'Supervisión', count: 2, checked: false },
        { label: 'Evaluación', count: 1, checked: false },
        { label: 'Fiscalización', count: 1, checked: false },
        { label: 'PLANEFA', count: 2, checked: false },
        { label: 'Sancionador', count: 1, checked: false },
        { label: 'Compromisos', count: 1, checked: false }
      ]
    },
    {
      label: 'Tipo',
      open: true,
      options: [
        { label: 'Consulta general', count: 4, checked: false },
        { label: 'Supervisión', count: 2, checked: false },
        { label: 'Evaluación', count: 1, checked: false },
        { label: 'Fiscalización', count: 1, checked: false },
        { label: 'PLANEFA', count: 2, checked: false },
        { label: 'Sancionador', count: 1, checked: false },
        { label: 'Compromisos', count: 1, checked: false }
      ]
    }
  ]);

  // Conteo de filtros activos
  activeFilterCount = computed(() => {
    let count = 0;
    if (this.selectedProcessFilter() !== 'todos') count++;
    if (this.selectedCategoryFilter() !== 'todas') count++;
    if (this.onlyFeatured()) count++;
    if (this.onlyPlanefa()) count++;
    this.filterGroups().forEach((g: FilterGroupItem) => {
      count += g.options.filter((o: FilterOption) => o.checked).length;
    });
    return count;
  });

  // Base de datos de Tableros Institucionales
  tableros: TableroItem[] = [
    {
      id: 'deam-planefa',
      title: 'DEAM Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de los informes y reportes de la Dirección de Evaluación Ambiental.',
      category: 'EVALUACIÓN',
      process: 'Misional',
      tags: ['Evaluación', 'Consulta general'],
      icon: 'document',
      featured: true
    },
    {
      id: 'ds-odes-planefa',
      title: 'DS/ODES Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de las estrategias de promoción de cumplimiento de supervisiones.',
      category: 'SUPERVISIÓN',
      process: 'Misional',
      tags: ['Supervisión', 'Consulta general'],
      icon: 'clipboard-check',
      featured: false
    },
    {
      id: 'smer-planefa',
      title: 'SMER Seguimiento metas Planefa',
      description: 'Dashboard del detalle de la ejecución de las mejoras regulatorias publicadas por la Subdirección SMER.',
      category: 'SMER',
      process: 'Misional',
      tags: ['SMER', 'Consulta general'],
      icon: 'chart',
      featured: true
    },
    {
      id: 'reporte-ejecucion-planefa',
      title: 'Reporte: Ejecución de metas Planefa',
      description: 'Dashboard de la ejecución mensual de las metas Planefa de todas las direcciones y oficinas descentralizadas.',
      category: 'TRANSVERSAL',
      process: 'Estratégico',
      tags: ['Transversal', 'Consulta general'],
      icon: 'layers',
      featured: true
    },
    {
      id: 'fiscalizacion-sector',
      title: 'Fiscalización por sector económico',
      description: 'Indicadores agregados de fiscalización ambiental por actividad: minería, energía, pesquería e industria.',
      category: 'FISCALIZACIÓN',
      process: 'Misional',
      tags: ['Fiscalización', 'SEFA'],
      icon: 'chart',
      featured: false
    },
    {
      id: 'supervision-ambiental',
      title: 'Supervisión ambiental y compromisos',
      description: 'Resultados de acciones de supervisión directa y estado de cumplimiento de compromisos ambientales.',
      category: 'SUPERVISIÓN',
      process: 'Misional',
      tags: ['Supervisión', 'Compromisos'],
      icon: 'check-circle',
      featured: false
    },
    {
      id: 'expedientes-concluidos',
      title: 'Expedientes concluidos y resoluciones',
      description: 'Seguimiento de expedientes sancionadores, recursos impugnatorios y estado final de resoluciones.',
      category: 'PCD',
      process: 'Apoyo',
      tags: ['Legal', 'Sancionador'],
      icon: 'folder',
      featured: false
    },
    {
      id: 'planefa-nacional',
      title: 'PLANEFA Nacional Consolidado',
      description: 'Seguimiento del plan anual de evaluación y fiscalización ambiental a nivel de todas las EFA del país.',
      category: 'PLANEFA',
      process: 'Estratégico',
      tags: ['PLANEFA', 'EFA'],
      icon: 'globe',
      featured: false
    }
  ];

  filterByProcess(proc: string): void {
    this.selectedProcessFilter.set(proc);
  }

  toggleFilterGroup(index: number): void {
    this.filterGroups.update(groups =>
      groups.map((g, i) => i === index ? { ...g, open: !g.open } : g)
    );
  }

  toggleFilterOption(event: { groupIndex: number; optionIndex: number; checked: boolean }): void {
    this.filterGroups.update((groups: FilterGroupItem[]) =>
      groups.map((g: FilterGroupItem, gi: number) => {
        if (gi !== event.groupIndex) return g;
        const newOpts = g.options.map((opt: FilterOption, oi: number) =>
          oi === event.optionIndex ? { ...opt, checked: event.checked } : opt
        );
        return { ...g, options: newOpts };
      })
    );
  }

  clearAllFilters(): void {
    this.selectedProcessFilter.set('todos');
    this.selectedCategoryFilter.set('todas');
    this.searchQuery.set('');
    this.onlyFeatured.set(false);
    this.onlyPlanefa.set(false);
    this.filterGroups.update((groups: FilterGroupItem[]) =>
      groups.map((g: FilterGroupItem) => ({
        ...g,
        options: g.options.map((o: FilterOption) => ({ ...o, checked: false }))
      }))
    );
  }

  getChipsForItem(item: TableroItem): CatalogChipConfig[] {
    return [
      { label: item.category, variant: 'area' }
    ];
  }

  onAbrirTablero(item: TableroItem): void {
    this.router.navigate(['/catalogo', item.id]);
    // Abrir tablero o navegar según corresponda en el sistema interno
    console.log('Abriendo tablero:', item.id);
  }

  get filteredTableros(): TableroItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategoryFilter();
    const proc = this.selectedProcessFilter();
    const featuredOnly = this.onlyFeatured();
    const planefaOnly = this.onlyPlanefa();

    const groups = this.filterGroups();
    const selectedCats = groups[0]?.options.filter((o: FilterOption) => o.checked).map((o: FilterOption) => o.label.toLowerCase()) || [];
    const selectedTags = groups[1]?.options.filter((o: FilterOption) => o.checked).map((o: FilterOption) => o.label.toLowerCase()) || [];

    return this.tableros.filter(t => {
      const matchQuery = !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));

      const matchCatPill = cat === 'todas' || t.category === cat;
      const matchProc = proc === 'todos' || t.process === proc;
      const matchFeatured = !featuredOnly || !!t.featured;
      const matchPlanefa = !planefaOnly || t.title.toLowerCase().includes('planefa') || t.tags.some(tag => tag.toLowerCase().includes('planefa'));

      const matchCatCheck = selectedCats.length === 0 || selectedCats.includes(t.category.toLowerCase());
      const matchTagCheck = selectedTags.length === 0 || t.tags.some(tag => selectedTags.includes(tag.toLowerCase()));

      return matchQuery && matchCatPill && matchProc && matchFeatured && matchPlanefa && matchCatCheck && matchTagCheck;
    });
  }

  irAConfiguraciones(): void {
    this.router.navigate(['/configuraciones/tableros']);
  }
}
