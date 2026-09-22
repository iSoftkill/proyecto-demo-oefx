import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPaginationComponent } from '../../shared/components/pagination/pagination.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OefaSpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaTableComponent, TableColumn, TableDensity } from '../../shared/components/table/table.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-design-system-tables',
  standalone: true,
  imports: [
    CommonModule, 
    OefaPaginationComponent, 
    OefaStatusBadgeComponent, 
    OefaTableComponent, 
    OefaButtonComponent
  ],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📊 Tablas y Matrices Institucionales (Organismos)</h2>
          <p class="subtitle">Demostración en vivo de los 3 patrones de tablas y matrices de datos institucionales de alta densidad según el estándar OEFA.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tabla 1: Data Table Estándar con Paginador Reutilizable -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Tabla de Datos Estándar (.data-table) + Paginador Reutilizable (&lt;oefa-pagination&gt;)</h3>
          <span class="text-muted">Uso: Bandejas generales por órdenes, listas de usuarios, nodos del árbol y catálogos administrativos.</span>
        </div>
        <div class="card-body" style="padding-bottom: 0;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 140px;">N° Orden</th>
                <th>Proveedor / Razón Social</th>
                <th>Área Solicitante</th>
                <th style="width: 110px;">Fecha Notif.</th>
                <th style="width: 120px;">Monto Total</th>
                <th style="width: 120px;">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono font-semibold color-primary">OS-00019-2026</td>
                <td class="font-medium">FERNANDEZ JACOBO ISABEL MERCEDES</td>
                <td><span class="area-chip">Administrativo</span></td>
                <td class="font-mono">08/01/2026</td>
                <td class="font-mono font-semibold">S/ 39,000.00</td>
                <td><oefa-status-badge status="FINALIZADO"></oefa-status-badge></td>
              </tr>
              <tr>
                <td class="font-mono font-semibold color-primary">OS-00023-2026</td>
                <td class="font-medium">BARRETO ENCISO ADA MIRELLA</td>
                <td><span class="area-chip">Administrativo</span></td>
                <td class="font-mono">08/01/2026</td>
                <td class="font-mono font-semibold">S/ 39,000.00</td>
                <td><oefa-status-badge status="FINALIZADO"></oefa-status-badge></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginador Reutilizable OEFA -->
        <oefa-pagination
          [currentPage]="demoCurrentPage()"
          [pageSize]="demoPageSize()"
          [totalItems]="148"
          [pageSizeOptions]="[10, 25, 50, 100]"
          itemLabel="órdenes encontradas"
          (pageChange)="demoCurrentPage.set($event)"
          (pageSizeChange)="demoPageSize.set($event)" />
      </div>

      <!-- Tabla 2: Matriz Plana Tipo Excel -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Matriz Plana Tipo Excel con Celdas Agrupadas (.excel-data-table)</h3>
          <span class="text-muted">Uso: Vista detallada de entregables cruzando montos, fechas de vencimiento (LPAG), proyectos y SIGED.</span>
        </div>
        <div class="card-body">
          <div class="table-wrapper">
            <table class="excel-data-table">
              <thead>
                <tr>
                  <th style="width: 160px;">N° OS / PROVEEDOR</th>
                  <th style="width: 60px; text-align: center;">AÑO</th>
                  <th style="width: 140px;">N° ENTREGABLE</th>
                  <th style="width: 100px;">INICIO</th>
                  <th style="width: 80px; text-align: center;">MÁX DÍAS</th>
                  <th style="width: 100px;">FECHA FIN</th>
                  <th style="width: 110px; text-align: right;">MONTO</th>
                  <th style="width: 140px;">PROYECTO / MANT.</th>
                  <th style="width: 130px;">SIGED</th>
                  <th style="width: 110px;">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="2" class="grouped-order-cell">
                    <button type="button" class="btn-order-link">
                      <span class="order-code">OS-00023-2026</span>
                      <span class="sub-info">BARRETO ENCISO</span>
                      <span class="link-hint">Ver Orden ↗</span>
                    </button>
                  </td>
                  <td class="text-center font-mono text-muted">2026</td>
                  <td class="font-medium text-center"><span class="del-num-badge">ENTREGABLE N° 1</span></td>
                  <td class="font-mono">08/01/2026</td>
                  <td class="font-mono text-center font-bold">20</td>
                  <td class="font-mono font-semibold color-primary">27/01/2026</td>
                  <td class="font-mono text-right font-semibold">S/ 5,850.00</td>
                  <td><span class="project-badge badge-proyecto">[PRY] PRY-2026-001</span></td>
                  <td><span class="siged-chip">2025-E01-013000</span></td>
                  <td><oefa-status-badge status="FINALIZADO" label="ATENDIDO"></oefa-status-badge></td>
                </tr>
                <tr>
                  <td class="text-center font-mono text-muted">2026</td>
                  <td class="font-medium text-center"><span class="del-num-badge">ENTREGABLE N° 2</span></td>
                  <td class="font-mono">08/01/2026</td>
                  <td class="font-mono text-center font-bold">50</td>
                  <td class="font-mono font-semibold color-primary">26/02/2026</td>
                  <td class="font-mono text-right font-semibold">S/ 6,630.00</td>
                  <td><span class="project-badge badge-mantenimiento">[MNT] MNT-2026-001</span></td>
                  <td><span class="siged-chip">2025-E01-024767</span></td>
                  <td><oefa-status-badge status="FINALIZADO" label="ATENDIDO"></oefa-status-badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Tabla 3: Acordeón Desplegable Estilo Gmail -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Tabla con Filas Desplegables Estilo Gmail (.gmail-table)</h3>
          <span class="text-muted">Uso: Inspección directa de trazabilidad e historial por entregable dentro del detalle de la orden.</span>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 55px;">N°</th>
                <th>N° ENTREGABLE</th>
                <th>Fecha Inicio</th>
                <th>Plazo Otorgado</th>
                <th>Fecha Límite</th>
                <th>Porcentaje</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row" style="background: var(--oefa-surface-submenu);">
                <td class="font-bold">
                  <div class="cell-num-flex">
                    <svg class="chevron-icon rotated" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span>1</span>
                  </div>
                </td>
                <td class="font-semibold">ENTREGABLE N° 1 <span class="badge-expanded-active">Abierto</span></td>
                <td class="font-mono">08/01/2026</td>
                <td class="font-mono">20 Días Cal.</td>
                <td class="font-mono font-semibold color-primary">27/01/2026</td>
                <td class="font-mono">15%</td>
                <td class="font-mono font-semibold">S/ 5,850.00</td>
                <td><oefa-status-badge status="FINALIZADO" label="ATENDIDO"></oefa-status-badge></td>
              </tr>
              <tr>
                <td colspan="8" style="padding: 14px; background: var(--oefa-surface-subtle);">
                  <div class="history-preview-box">
                    <strong>📌 Historial de Trazabilidad Registrado:</strong>
                    <p class="history-item">08/01/2026 09:00 AM — Orden notificada a locador mediante notificación electrónica zimbra.</p>
                    <p class="history-item">27/01/2026 04:30 PM — Entregable ingresado en SIGED con expediente 2025-E01-013000. Conformidad otorgada.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sección 4: Componente Standalone <oefa-table> -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Componente Standalone Reutilizable (&lt;oefa-table&gt;)</h3>
          <span class="text-muted">Componente puro con ordenamiento tipado, soporte de skeleton loader integrado, modos de densidad y cuadrícula matriz.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 10px; margin-bottom: 16px; align-items: center; flex-wrap: wrap;">
            <!-- Controles de Modo -->
            <oefa-button variant="secondary" size="sm" (clicked)="toggleLoadingTable()">
              {{ isTableLoading() ? 'Desactivar Carga' : 'Simular Carga (Skeleton)' }}
            </oefa-button>
            <oefa-button variant="ghost" size="sm" (clicked)="toggleEmptyTable()">
              {{ tableData().length === 0 ? 'Cargar Datos' : 'Vaciar Tabla' }}
            </oefa-button>
            <oefa-button variant="ghost" size="sm" (clicked)="toggleStriped()">
              {{ isStriped() ? 'Quitar Rayado' : 'Activar Rayado' }}
            </oefa-button>
            <oefa-button variant="ghost" size="sm" (clicked)="toggleBordered()">
              {{ isBordered() ? 'Bordes Normales' : 'Modo Cuadrícula Matriz' }}
            </oefa-button>
            <oefa-button variant="ghost" size="sm" (clicked)="cycleDensity()">
              Densidad: <strong>{{ tableDensity() }}</strong>
            </oefa-button>

            @if (selectedTableRow()) {
              <span class="text-muted font-mono" style="font-size: 0.8125rem; margin-left: auto;">
                Fila seleccionada: <strong>{{ selectedTableRow()?.numero }}</strong>
              </span>
            }
          </div>

          <oefa-table
            [columns]="tableColumns"
            [data]="tableData()"
            [loading]="isTableLoading()"
            [density]="tableDensity()"
            [striped]="isStriped()"
            [bordered]="isBordered()"
            [rowClickable]="true"
            (rowClick)="onTableRowClick($event)"
            emptyTitle="Sin órdenes registradas"
            emptyDescription="Actualmente no existen registros para esta consulta."
          ></oefa-table>
        </div>
      </div>

      <!-- Sección 5: Especificación Técnica y Tokens -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>5. Especificación Técnica y Tokens de Tablas</h3>
          <span class="text-muted">Propiedades, directrices WCAG 2.2 AA y variables de diseño estandarizadas.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--oefa-border-color); text-align: left;">
                    <th style="padding: 10px;">Propiedad</th>
                    <th style="padding: 10px;">Tipo / Valores</th>
                    <th style="padding: 10px;">Default</th>
                    <th style="padding: 10px;">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[columns]</td>
                    <td style="padding: 10px;"><code>TableColumn[]</code></td>
                    <td style="padding: 10px;"><code>[]</code></td>
                    <td style="padding: 10px;">Definición de columnas (key, header, sortable, align, width, type, formatter).</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[density]</td>
                    <td style="padding: 10px;"><code>'default' | 'compact' | 'comfortable'</code></td>
                    <td style="padding: 10px;"><code>'default'</code></td>
                    <td style="padding: 10px;">Controla el padding de celdas ('compact' ideal para matrices de supervisión).</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[striped]</td>
                    <td style="padding: 10px;"><code>boolean</code></td>
                    <td style="padding: 10px;"><code>false</code></td>
                    <td style="padding: 10px;">Alterna fondo de fila par para lectura descansada en listas densas.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[bordered]</td>
                    <td style="padding: 10px;"><code>boolean</code></td>
                    <td style="padding: 10px;"><code>false</code></td>
                    <td style="padding: 10px;">Añade delimitadores verticales de celda tipo cuadrícula Excel.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[loading]</td>
                    <td style="padding: 10px;"><code>boolean</code></td>
                    <td style="padding: 10px;"><code>false</code></td>
                    <td style="padding: 10px;">Despliega filas de <code>&lt;oefa-skeleton&gt;</code> para prevenir Cumulative Layout Shift (CLS).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Código de Ejemplo -->
            <div style="background: var(--oefa-surface-subtle); padding: 14px 18px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-secondary); text-transform: uppercase;">Ejemplo de Implementación HTML</span>
              <pre style="margin: 8px 0 0; font-family: var(--oefa-font-mono); font-size: 0.8125rem; color: var(--oefa-text-primary); overflow-x: auto;"><code>&lt;oefa-table
  [columns]="columns"
  [data]="ordersList()"
  [loading]="isLoading()"
  density="compact"
  [striped]="true"
  [bordered]="true"
  [rowClickable]="true"
  (rowClick)="verDetalle($event)"
  (sortChange)="ordenar($event)"&gt;
&lt;/oefa-table&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-lg) var(--oefa-radius-lg) 0 0; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; overflow-x: auto; }

    .cell-num-flex { display: inline-flex; align-items: center; gap: 4px; }
    .chevron-icon.rotated { transform: rotate(90deg); }
    .badge-expanded-active { font-size: 0.6875rem; background: var(--oefa-primary-container); color: var(--oefa-primary-root); padding: 1px 6px; border-radius: 4px; margin-left: 6px; font-weight: 600; }
    .history-preview-box { font-size: 0.8125rem; color: var(--oefa-text-primary); display: flex; flex-direction: column; gap: 4px; }
    .history-item { margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); }
  `]
})
export class DesignSystemTablesComponent {
  demoCurrentPage = signal<number>(1);
  demoPageSize = signal<number>(10);

  isTableLoading = signal<boolean>(false);
  isStriped = signal<boolean>(false);
  isBordered = signal<boolean>(false);
  tableDensity = signal<TableDensity>('default');
  selectedTableRow = signal<any | null>(null);

  tableColumns: TableColumn[] = [
    { key: 'numero', header: 'N° Orden', sortable: true, width: '150px', type: 'mono' },
    { key: 'proveedor', header: 'Proveedor', sortable: true },
    { key: 'area', header: 'Área Responsable', sortable: true },
    { key: 'fecha', header: 'Fecha Notif.', sortable: true, width: '130px', align: 'center', type: 'date' },
    { key: 'monto', header: 'Monto Total', sortable: true, width: '140px', align: 'right', type: 'currency' },
    { key: 'estado', header: 'Estado', sortable: true, width: '120px', align: 'center', type: 'badge' }
  ];

  sampleData = [
    { numero: 'OS-2026-00045', proveedor: 'ROSALES HUINCHO PABLO ALEJANDRO', area: 'OTI', fecha: '12/01/2026', monto: 'S/ 48,000.00', estado: 'FINALIZADO' },
    { numero: 'OS-2026-00049', proveedor: 'SISTEMAS Y SOLUCIONES TI S.A.C.', area: 'DFAI', fecha: '15/01/2026', monto: 'S/ 120,500.00', estado: 'FINALIZADO' },
    { numero: 'OC-2026-00012', proveedor: 'COMPUTECH PERU E.I.R.L.', area: 'OAJ', fecha: '18/01/2026', monto: 'S/ 24,300.00', estado: 'OBSERVADO' },
    { numero: 'OS-2026-00065', proveedor: 'CONSULTORES AMBIENTALES ASOCIADOS', area: 'DSEM', fecha: '22/01/2026', monto: 'S/ 65,000.00', estado: 'FINALIZADO' }
  ];

  tableData = signal<any[]>(this.sampleData);

  toggleLoadingTable() {
    this.isTableLoading.update(v => !v);
  }

  toggleEmptyTable() {
    if (this.tableData().length === 0) {
      this.tableData.set(this.sampleData);
    } else {
      this.tableData.set([]);
    }
  }

  toggleStriped() {
    this.isStriped.update(v => !v);
  }

  toggleBordered() {
    this.isBordered.update(v => !v);
  }

  cycleDensity() {
    const current = this.tableDensity();
    if (current === 'default') {
      this.tableDensity.set('compact');
    } else if (current === 'compact') {
      this.tableDensity.set('comfortable');
    } else {
      this.tableDensity.set('default');
    }
  }

  onTableRowClick(row: any) {
    this.selectedTableRow.set(row);
  }
}
