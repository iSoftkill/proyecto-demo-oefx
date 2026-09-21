import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OefaFilterSidebarComponent,
  FilterGroupItem,
  FilterStatusOption
} from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-design-system-filter-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    OefaFilterSidebarComponent,
    OefaButtonComponent,
    OefaStatusBadgeComponent
  ],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🔽 Filter Sidebar (&lt;oefa-filter-sidebar&gt;)</h2>
          <p class="subtitle">Organismo de filtrado facetado avanzado: sidebar fijo sticky en desktop y bottom sheet táctil en móvil.</p>
        </div>
        <div class="ds-header-controls">
          <button
            type="button"
            class="mode-toggle-btn"
            (click)="simulateMobile.set(!simulateMobile())"
          >
            {{ simulateMobile() ? '🖥️ Modo Desktop' : '📱 Probar Modo Móvil' }}
          </button>
          <span class="ds-badge">ORGANISMO</span>
        </div>
      </div>

      <!-- SECCIÓN 1: Layout en Vivo (Sidebar + Contenido) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Demostración Interactiva con Resultados en Vivo</h3>
          <span class="text-muted">Filtra por estado, rango de fechas, montos en UIT y temas con conteos reactivos.</span>
        </div>
        <div class="card-body">
          <div class="filter-layout" [class.mobile-simulated]="simulateMobile()">
            <!-- Botón flotante para activar el modal/sheet en móvil -->
            <div class="mobile-open-bar">
              <button type="button" class="mobile-open-btn" (click)="isMobileOpen.set(true)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span>Filtros y Criterios ({{ activeCount() }})</span>
              </button>
            </div>

            <!-- COMPONENTE REUTILIZABLE -->
            <div class="sidebar-wrapper">
              <oefa-filter-sidebar
                title="Refinar Búsqueda"
                [activeCount]="activeCount()"
                [statusOptions]="statusOptions"
                [selectedStatus]="selectedStatus()"
                [dateFrom]="dateFrom()"
                [dateTo]="dateTo()"
                [amountMin]="amountMin()"
                [amountMax]="amountMax()"
                amountUnit="UIT"
                [filterGroups]="filterGroups()"
                [searchQuery]="searchQuery()"
                [flagMedidas]="flagMedidas()"
                [flagAlertas]="flagAlertas()"
                [isOpenMobile]="isMobileOpen()"
                (statusChange)="selectedStatus.set($event)"
                (dateFromChange)="dateFrom.set($event)"
                (dateToChange)="dateTo.set($event)"
                (amountMinChange)="amountMin.set($event)"
                (amountMaxChange)="amountMax.set($event)"
                (groupToggle)="toggleGroup($event)"
                (optionToggle)="toggleOption($event)"
                (searchQueryChange)="searchQuery.set($event)"
                (flagMedidasChange)="flagMedidas.set($event)"
                (flagAlertasChange)="flagAlertas.set($event)"
                (clear)="clearAll()"
                (apply)="applyFilters()"
                (closeMobile)="isMobileOpen.set(false)"
              />
            </div>

            <!-- Área de Resultados de Ejemplo -->
            <div class="results-wrapper">
              <div class="results-header">
                <span class="results-count">Mostrando <strong>{{ activeCount() }}</strong> filtros activos</span>
                <span class="results-badge">142 registros evaluados</span>
              </div>

              <div class="cards-list">
                <div class="sample-result-card">
                  <div class="src-meta">
                    <span class="src-code">EXP-2024-00142-DSUP</span>
                    <oefa-status-badge status="EN_PROCESO" size="sm" [dot]="true" />
                  </div>
                  <h4>Supervisión Regular a Unidad Minera Acumulación Cuajone</h4>
                  <p>Evaluación de componentes ambientales y diques de relaves en cuenca Moquegua.</p>
                  <div class="src-footer">
                    <span>Sanción potencial: <strong>120 UIT</strong></span>
                    <span>Moquegua • Mariscal Nieto</span>
                  </div>
                </div>

                <div class="sample-result-card">
                  <div class="src-meta">
                    <span class="src-code">EXP-2024-00891-DEAM</span>
                    <oefa-status-badge status="OBSERVADO" size="sm" [dot]="true" />
                  </div>
                  <h4>Monitoreo de Calidad de Agua en Cuenca Mantaro</h4>
                  <p>Detección de superación de estándares de calidad ambiental en punto telemétrico.</p>
                  <div class="src-footer">
                    <span>Medida cautelar: <strong>Activa</strong></span>
                    <span>Junín • Huancayo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: Código de Uso -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Código de Implementación</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/filter-sidebar/</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;oefa-filter-sidebar
  title="Refinar Búsqueda"
  [activeCount]="activeFiltersCount()"
  [statusOptions]="statusOptions"
  [selectedStatus]="selectedStatus()"
  [filterGroups]="filterGroups()"
  [isOpenMobile]="isMobileOpen()"
  (statusChange)="selectedStatus.set($event)"
  (clear)="clearAll()"
  (apply)="applyFilters()"
  (closeMobile)="isMobileOpen.set(false)"
/&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      h2 { margin: 0 0 6px 0; font-family: var(--oefa-font-display); font-size: 1.5rem; color: #0f172a; }
      .subtitle { margin: 0; color: #64748b; font-size: 0.875rem; }
    }
    .ds-header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .mode-toggle-btn {
      padding: 6px 14px;
      border-radius: 8px;
      background: white;
      border: 1px solid #cbd5e1;
      font-size: 0.75rem;
      font-weight: 700;
      color: #0f172a;
      cursor: pointer;
      transition: background 0.15s;
      &:hover { background: #f1f5f9; }
    }
    .ds-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      letter-spacing: 0.04em;
    }
    .ds-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }
    .card-header {
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      h3 { margin: 0 0 4px 0; font-size: 1rem; font-family: var(--oefa-font-display); color: #0f172a; }
      .text-muted { font-size: 0.8125rem; color: #64748b; }
    }
    .card-body {
      padding: 20px;
    }
    .filter-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
      align-items: start;
    }
    .sidebar-wrapper {
      min-width: 0;
      width: 100%;
    }
    .mobile-open-bar {
      display: none;
      margin-bottom: 16px;
    }
    .mobile-open-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.875rem;
      color: var(--oefa-primary-root);
      cursor: pointer;
    }
    .filter-layout.mobile-simulated {
      grid-template-columns: 1fr;
      max-width: 440px;
      margin: 0 auto;
      border: 2px dashed #94a3b8;
      border-radius: 20px;
      padding: 16px;
      background: #f8fafc;
      .mobile-open-bar { display: block; }
      .sidebar-wrapper { display: none; }
    }
    .results-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    .results-count {
      font-size: 0.875rem;
      color: #334155;
    }
    .results-badge {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--oefa-primary-root);
      background: var(--oefa-primary-container);
      padding: 3px 8px;
      border-radius: 6px;
    }
    .cards-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .sample-result-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      h4 { margin: 0; font-family: var(--oefa-font-display); font-size: 0.9375rem; font-weight: 700; color: #0f172a; }
      p { margin: 0; font-size: 0.8125rem; color: #64748b; line-height: 1.4; }
    }
    .src-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .src-code {
      font-size: 0.6875rem;
      font-weight: 700;
      color: #64748b;
      font-family: monospace;
    }
    .src-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid #f1f5f9;
      font-size: 0.75rem;
      color: #475569;
    }
    .code-block {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      font-size: 0.8125rem;
      color: #1e293b;
      margin: 0;
      overflow-x: auto;
    }
  `]
})
export class DesignSystemFilterSidebarComponent {
  simulateMobile = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  selectedStatus = signal<string>('TODOS');
  dateFrom = signal<string>('2024-01-01');
  dateTo = signal<string>('2024-12-31');
  amountMin = signal<number | null>(25);
  amountMax = signal<number | null>(450);
  searchQuery = signal<string>('');
  flagMedidas = signal<boolean>(false);
  flagAlertas = signal<boolean>(true);

  statusOptions: FilterStatusOption[] = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'EN_PROCESO', label: 'En Proceso' },
    { value: 'OBSERVADO', label: 'Observado' },
    { value: 'FINALIZADO', label: 'Finalizado' }
  ];

  filterGroups = signal<FilterGroupItem[]>([
    {
      label: 'Tema / Sector Fiscalizado',
      open: true,
      options: [
        { label: 'Fiscalización Minera', count: 14, checked: true },
        { label: 'Energía e Hidrocarburos', count: 9, checked: false },
        { label: 'Pesquería e Industria', count: 11, checked: false },
        { label: 'Residuos Sólidos', count: 7, checked: false }
      ]
    },
    {
      label: 'Tipo de Tablero',
      open: true,
      options: [
        { label: 'Misional', count: 18, checked: false },
        { label: 'Estratégico', count: 7, checked: false },
        { label: 'Apoyo', count: 6, checked: false }
      ]
    }
  ]);

  activeCount = computed(() => {
    let count = 0;
    if (this.selectedStatus() !== 'TODOS') count++;
    if (this.dateFrom() || this.dateTo()) count++;
    if (this.amountMin() !== null || this.amountMax() !== null) count++;
    if (this.flagMedidas()) count++;
    if (this.flagAlertas()) count++;
    this.filterGroups().forEach(g => {
      count += g.options.filter(o => o.checked).length;
    });
    return count;
  });

  toggleGroup(index: number): void {
    this.filterGroups.update(groups =>
      groups.map((g, i) => i === index ? { ...g, open: !g.open } : g)
    );
  }

  toggleOption(event: { groupIndex: number; optionIndex: number; checked: boolean }): void {
    this.filterGroups.update(groups =>
      groups.map((g, gi) => {
        if (gi !== event.groupIndex) return g;
        const newOpts = g.options.map((opt, oi) =>
          oi === event.optionIndex ? { ...opt, checked: event.checked } : opt
        );
        return { ...g, options: newOpts };
      })
    );
  }

  clearAll(): void {
    this.selectedStatus.set('TODOS');
    this.dateFrom.set('');
    this.dateTo.set('');
    this.amountMin.set(null);
    this.amountMax.set(null);
    this.flagMedidas.set(false);
    this.flagAlertas.set(false);
    this.filterGroups.update(groups =>
      groups.map(g => ({
        ...g,
        options: g.options.map(o => ({ ...o, checked: false }))
      }))
    );
  }

  applyFilters(): void {
    this.isMobileOpen.set(false);
  }
}
