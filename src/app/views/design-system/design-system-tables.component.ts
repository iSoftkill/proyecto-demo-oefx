import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPaginationComponent } from '../../shared/components/pagination/pagination.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OefaSpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { TableComponent, TableColumn } from '../../shared/components/table/table.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-design-system-tables',
  standalone: true,
  imports: [CommonModule, OefaPaginationComponent, OefaEmptyStateComponent, OefaSpinnerComponent, OefaStatusBadgeComponent, TableComponent, OefaButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📊 Tipos de Tablas y Grids de Datos</h2>
          <p class="subtitle">Demostración en vivo con data de ejemplo de los 3 patrones de tablas institucionales implementados en el sistema.</p>
        </div>
        <span class="ds-badge">SISTEMA DE DISEÑO OEFA</span>
      </div>

      <!-- Tabla 1: Data Table Estándar con Paginador Reutilizable -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Tabla de Datos Estándar (.data-table) + Paginador Reutilizable (&lt;oefa-pagination&gt;)</h3>
          <span class="text-muted">Uso: Bandejas generales por órdenes, listas de usuarios, nodos del árbol y catálogos.</span>
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
                  <td><span class="badge-status conforme">ATENDIDO</span></td>
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
                  <td><span class="badge-status conforme">ATENDIDO</span></td>
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
                <td colspan="8" style="padding: 14px; background: #F1F5F9;">
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

      <!-- Sección 4: Estados Vacíos y Carga en Tablas -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Estados de Carga y Bandejas Vacías (&lt;oefa-empty-state&gt; &amp; &lt;oefa-spinner&gt;)</h3>
          <span class="text-muted">Componentes compartidos para feedback visual de carga de red y resultados no encontrados.</span>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <!-- Demo Spinner -->
          <div style="border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); padding: 16px;">
            <h4 style="margin: 0 0 12px; font-size: 0.875rem; color: var(--oefa-text-secondary);">Indicadores de Carga:</h4>
            <div style="display: flex; gap: 24px; align-items: center; justify-content: center;">
              <oefa-spinner size="sm" message="Guardando..."></oefa-spinner>
              <oefa-spinner size="md" message="Cargando órdenes..."></oefa-spinner>
            </div>
          </div>

          <!-- Demo Empty State -->
          <div style="border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md);">
            <oefa-empty-state
              icon="search"
              title="No se encontraron registros"
              description="No hay órdenes que coincidan con los criterios de búsqueda aplicados."
              actionText="Limpiar Filtros"
              [compact]="true">
            </oefa-empty-state>
          </div>
        </div>
      <!-- Sección 5: Componente de Tabla Reutilizable <oefa-table> -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>5. Componente de Tabla Standalone Reutilizable (&lt;oefa-table&gt;)</h3>
          <span class="text-muted">Componente puro con ordenamiento tipado, soporte de skeleton loader integrado y estados vacíos.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
            <oefa-button variant="secondary" (clicked)="toggleLoadingTable()">
              {{ isTableLoading() ? 'Desactivar Carga' : 'Simular Carga (Skeleton)' }}
            </oefa-button>
            <oefa-button variant="ghost" (clicked)="toggleEmptyTable()">
              {{ tableData().length === 0 ? 'Cargar Datos' : 'Vaciar Tabla' }}
            </oefa-button>
            @if (selectedTableRow()) {
              <span class="text-muted font-mono" style="font-size: 0.8125rem;">
                Fila seleccionada: <strong>{{ selectedTableRow()?.numero }}</strong>
              </span>
            }
          </div>

          <oefa-table
            [columns]="tableColumns"
            [data]="tableData()"
            [loading]="isTableLoading()"
            [rowClickable]="true"
            (rowClick)="onTableRowClick($event)"
            emptyTitle="Sin órdenes registradas"
            emptyDescription="Actualmente no existen registros para esta consulta."
          ></oefa-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px; }

    .ds-card { background: white; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; overflow-x: auto; }

    .cell-num-flex { display: inline-flex; align-items: center; gap: 4px; }
    .chevron-icon.rotated { transform: rotate(90deg); }
    .badge-expanded-active { font-size: 0.6875rem; background: var(--oefa-primary-container); color: var(--oefa-primary-on-container); padding: 1px 6px; border-radius: 4px; margin-left: 6px; }
    .history-preview-box { font-size: 0.8125rem; color: var(--oefa-text-primary); display: flex; flex-direction: column; gap: 4px; }
    .history-item { margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); }
  `]
})
export class DesignSystemTablesComponent {
  demoCurrentPage = signal<number>(1);
  demoPageSize = signal<number>(10);

  isTableLoading = signal<boolean>(false);
  selectedTableRow = signal<any | null>(null);

  tableColumns: TableColumn[] = [
    { key: 'numero', header: 'N° Orden', sortable: true, width: '150px' },
    { key: 'proveedor', header: 'Proveedor', sortable: true },
    { key: 'area', header: 'Área Responsable', sortable: true },
    { key: 'fecha', header: 'Fecha Notif.', sortable: true, width: '130px', align: 'center' },
    { key: 'monto', header: 'Monto Total', sortable: true, width: '140px', align: 'right' }
  ];

  sampleData = [
    { numero: 'OS-2026-00045', proveedor: 'ROSALES HUINCHO PABLO ALEJANDRO', area: 'OTI', fecha: '12/01/2026', monto: 'S/ 48,000.00' },
    { numero: 'OS-2026-00049', proveedor: 'SISTEMAS Y SOLUCIONES TI S.A.C.', area: 'DFAI', fecha: '15/01/2026', monto: 'S/ 120,500.00' },
    { numero: 'OC-2026-00012', proveedor: 'COMPUTECH PERU E.I.R.L.', area: 'OAJ', fecha: '18/01/2026', monto: 'S/ 24,300.00' },
    { numero: 'OS-2026-00065', proveedor: 'CONSULTORES AMBIENTALES ASOCIADOS', area: 'DSEM', fecha: '22/01/2026', monto: 'S/ 65,000.00' }
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

  onTableRowClick(row: any) {
    this.selectedTableRow.set(row);
  }
}
