import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderStoreService } from '../../services/order-store.service';
import { OrgStoreService } from '../../services/org-store.service';
import { ProyectoStoreService } from '../../services/proyecto-store.service';
import { DashboardService, TopClasificador, MonthlyExecution, ProyectoSummary } from '../../services/dashboard.service';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { OefaProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    OefaPageHeaderComponent,
    OefaButtonComponent,
    OefaSkeletonComponent,
    OefaStatusBadgeComponent,
    OefaEmptyStateComponent,
    OefaProgressBarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private orderStore = inject(OrderStoreService);
  private orgStore = inject(OrgStoreService);
  public proyectoStore = inject(ProyectoStoreService);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  isLoading = signal(true);
  topClasificadores = signal<TopClasificador[]>([]);
  clasificadorTipo = signal<'ALL' | 'OS' | 'OC'>('ALL');
  monthlyExecution = signal<MonthlyExecution[]>([]);

  // Raw orders signal from cache/store
  orders = this.orderStore.orders;

  // Resumen ejecutivo de proyectos calculado de forma 100% reactiva
  proyectosResumen = computed<ProyectoSummary[]>(() => {
    const list = this.proyectoStore.activeProyectos();
    const allOrders = this.orders();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return list.map(p => {
      const matchedDels: Array<{
        amount: number;
        status: string;
        dueDate?: string;
      }> = [];
      const matchedOrderIds = new Set<string>();

      for (const ord of allOrders) {
        const orderHasPry = (ord.projectId === p.id || ord.projectId === p.codigo);
        for (const del of (ord.deliverables || [])) {
          const delHasPry = (del.projectId === p.id || del.projectId === p.codigo);
          if (delHasPry || (!del.projectId && orderHasPry)) {
            const amt = del.amount != null && del.amount > 0
              ? del.amount
              : ((ord.totalAmount || 0) * (del.amountPercent || 0)) / 100;
            matchedDels.push({
              amount: amt,
              status: del.status,
              dueDate: del.dueDate
            });
            matchedOrderIds.add(ord.id);
          }
        }
      }

      const totalOrdenes = matchedOrderIds.size;
      const totalEntregables = matchedDels.length;
      const atendidos = matchedDels.filter(d => d.status === 'ATENDIDO').length;
      const montoContratado = matchedDels.reduce((acc, d) => acc + (d.amount || 0), 0);
      const montoPagado = matchedDels.filter(d => d.status === 'ATENDIDO').reduce((acc, d) => acc + (d.amount || 0), 0);

      const porcentajeFisico = totalEntregables > 0
        ? Math.round((atendidos * 100.0 / totalEntregables) * 10.0) / 10.0
        : 0;
      const porcentajeFinanciero = montoContratado > 0
        ? Math.round((montoPagado * 100.0 / montoContratado) * 10.0) / 10.0
        : 0;

      let diasRestantes: number | undefined = undefined;
      let porcentajeTiempo = 0;
      let estadoSalud: 'EN_PLAZO' | 'EN_RIESGO' | 'CRITICO' | 'FINALIZADO' = 'EN_PLAZO';

      if (totalEntregables > 0 && atendidos === totalEntregables) {
        estadoSalud = 'FINALIZADO';
        diasRestantes = 0;
        porcentajeTiempo = 100;
      } else if (p.fechaFin) {
        const finDate = this.parseDate(p.fechaFin);
        const iniDate = p.fechaInicio ? this.parseDate(p.fechaInicio) : null;
        if (finDate) {
          diasRestantes = Math.ceil((finDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (iniDate && finDate.getTime() > iniDate.getTime()) {
            const totalD = finDate.getTime() - iniDate.getTime();
            const elapsed = today.getTime() - iniDate.getTime();
            porcentajeTiempo = Math.max(0, Math.min(100, Math.round((elapsed * 100.0 / totalD) * 10.0) / 10.0));
          }
          if (diasRestantes < 0) {
            estadoSalud = 'CRITICO';
          } else if (diasRestantes <= 30) {
            estadoSalud = 'EN_RIESGO';
          } else {
            estadoSalud = 'EN_PLAZO';
          }
        }
      } else {
        // Mantenimiento sin fecha fin explícita: calcular advertencia por entregables pendientes
        let minDays: number | null = null;
        for (const del of matchedDels) {
          if (del.status !== 'ATENDIDO' && del.status !== 'REBAJADO' && del.dueDate) {
            const dDate = this.parseDate(del.dueDate);
            if (dDate) {
              const diff = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              if (minDays === null || diff < minDays) {
                minDays = diff;
              }
            }
          }
        }
        if (minDays !== null) {
          diasRestantes = minDays;
          if (minDays < 0) {
            estadoSalud = 'CRITICO';
          } else if (minDays <= 15) {
            estadoSalud = 'EN_RIESGO';
          } else {
            estadoSalud = 'EN_PLAZO';
          }
        }
      }

      return {
        id: Number(p.id) || 0,
        codigo: p.codigo,
        nombre: p.nombre,
        tipo: p.tipo,
        fechaInicio: p.fechaInicio,
        fechaFin: p.fechaFin,
        diasRestantes,
        estadoSalud,
        totalOrdenes,
        totalEntregables,
        entregablesAtendidos: atendidos,
        montoContratado,
        montoPagado,
        porcentajeFisico,
        porcentajeFinanciero,
        porcentajeTiempo
      };
    });
  });

  // Métricas ejecutivas consolidadas
  totalProyectosCount = computed(() => this.proyectosResumen().length);
  proyectosEnRiesgoCount = computed(() =>
    this.proyectosResumen().filter(p => p.estadoSalud === 'EN_RIESGO' || p.estadoSalud === 'CRITICO').length
  );
  proyectosFisicoPromedio = computed(() => {
    const list = this.proyectosResumen();
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, p) => acc + (p.porcentajeFisico || 0), 0);
    return Math.round(sum / list.length);
  });
  proyectosFinancieroPromedio = computed(() => {
    const list = this.proyectosResumen();
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, p) => acc + (p.porcentajeFinanciero || 0), 0);
    return Math.round(sum / list.length);
  });

  // Real-time KPIs
  osCount = computed(() => this.orders().filter(o => o.type === 'OS').length);

  osExecutingCount = computed(() => this.orders().filter(o => o.type === 'OS' && o.status === 'EN_PROCESO').length);

  ocCount = computed(() => this.orders().filter(o => o.type === 'OC').length);
  ocPendingCount = computed(() => this.orders().filter(o => o.type === 'OC' && o.status === 'EN_PROCESO').length);

  totalExecutedAmount = computed(() => {
    return this.orders().reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  });

  maxMonthlyAmount = computed(() => {
    const max = Math.max(...this.monthlyExecution().map(m => m.montoProgramado || 0), 0);
    return max > 0 ? max : 1;
  });

  // Ventana ajustada a exactamente 7 días
  urgentDeliverables = computed(() => {
    const list: Array<{
      id: string;
      orderId: string;
      orderNumber: string;
      provider: string;
      deliverableName: string;
      dueDate: string;
      daysLeft: number;
    }> = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const order of this.orders()) {
      for (const del of order.deliverables) {
        if (del.status !== 'ATENDIDO' && del.status !== 'REBAJADO' && del.dueDate) {
          let due: Date | null = null;
          if (del.dueDate.includes('/')) {
            const parts = del.dueDate.split('/');
            due = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
          } else if (del.dueDate.includes('-')) {
            const parts = del.dueDate.split('-');
            due = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          }

          let daysLeft = 0;
          if (due) {
            const diffTime = due.getTime() - today.getTime();
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          // Filtro estricto: próximos 7 días (0 a 7 días)
          if (daysLeft >= 0 && daysLeft <= 7) {
            list.push({
              id: del.id,
              orderId: order.id,
              orderNumber: order.number,
              provider: order.provider,
              deliverableName: del.name,
              dueDate: del.dueDate,
              daysLeft: daysLeft
            });
          }
        }
      }
    }

    list.sort((a, b) => a.daysLeft - b.daysLeft);
    return list;
  });

  urgentCount = computed(() => this.urgentDeliverables().length);

  observedList = computed(() => {
    const list: Array<{
      id: string;
      orderId: string;
      code: string;
      area: string;
      reason: string;
      ageDays: number;
    }> = [];

    for (const order of this.orders()) {
      for (const del of order.deliverables) {
        if (del.status === 'ATENDIDO_OBSERVADO') {
          list.push({
            id: del.id,
            orderId: order.id,
            code: del.sigedCode || `ENT-${order.number}`,
            area: order.requestingArea.split('-')[0].trim(),
            reason: del.observationCount > 0 ? `Entregable con ${del.observationCount} observación(es)` : 'Observación registrada',
            ageDays: 3
          });
        }
      }
    }
    return list;
  });

  areaCompliance = computed(() => {
    const activeAreas = this.orgStore.flatActiveAreas();
    const areaStats: Record<string, { totalDeliverables: number; completedDeliverables: number }> = {};

    for (const area of activeAreas) {
      areaStats[area.code] = { totalDeliverables: 0, completedDeliverables: 0 };
    }

    for (const order of this.orders()) {
      const areaCode = order.requestingArea.split('-')[0].trim();
      if (!areaStats[areaCode]) {
        areaStats[areaCode] = { totalDeliverables: 0, completedDeliverables: 0 };
      }
      for (const del of order.deliverables) {
        areaStats[areaCode].totalDeliverables++;
        if (del.status === 'ATENDIDO') {
          areaStats[areaCode].completedDeliverables++;
        }
      }
    }

    const result: Array<{ name: string; percent: number; total: number; paid: number; pending: number }> = [];
    for (const [code, stat] of Object.entries(areaStats)) {
      if (stat.totalDeliverables > 0) {
        const percent = Math.round((stat.completedDeliverables / stat.totalDeliverables) * 100);
        result.push({
          name: code,
          percent,
          total: stat.totalDeliverables,
          paid: stat.completedDeliverables,
          pending: stat.totalDeliverables - stat.completedDeliverables
        });
      }
    }

    if (result.length === 0) {
      return activeAreas.slice(0, 4).map(a => ({ name: a.code, percent: 0, total: 0, paid: 0, pending: 0 }));
    }

    return result;
  });

  goToOrderDetail(orderId: string) {
    this.router.navigate(['/ordenes', orderId]);
  }

  setClasificadorFilter(tipo: 'ALL' | 'OS' | 'OC') {
    this.clasificadorTipo.set(tipo);
    this.loadTopClasificadores(tipo);
  }

  loadTopClasificadores(tipo: string = this.clasificadorTipo()) {
    this.dashboardService.getTopClasificadores(tipo).subscribe({
      next: (data) => {
        this.topClasificadores.set(data);
      },
      error: (err) => {
        console.error('Error al cargar top clasificadores:', err);
      }
    });
  }

  loadMonthlyExecution() {
    this.dashboardService.getMonthlyExecution(2026).subscribe({
      next: (data) => {
        this.monthlyExecution.set(data);
      },
      error: (err) => {
        console.error('Error al cargar ejecucion mensual:', err);
      }
    });
  }

  private parseDate(str?: string): Date | null {
    if (!str) return null;
    if (str.includes('/')) {
      const parts = str.split('/');
      return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    }
    if (str.includes('-')) {
      const parts = str.split('-');
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return null;
  }

  refreshDashboard() {
    this.isLoading.set(true);
    this.loadTopClasificadores();
    this.loadMonthlyExecution();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 250);
  }

  ngOnInit() {
    this.loadTopClasificadores();
    this.loadMonthlyExecution();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 250);
  }
}


