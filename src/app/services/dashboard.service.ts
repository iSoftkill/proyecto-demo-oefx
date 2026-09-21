import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TopClasificador {
  clasificador: string;
  descripcion: string;
  cantidadEntregables: number;
  montoTotal: number;
  montoPagado: number;
  montoPendiente: number;
  porcentajePagado: number;
}

export interface MonthlyExecution {
  mes: number;
  nombreMes: string;
  cantidadEntregables: number;
  montoProgramado: number;
  montoPagado: number;
  montoPendiente: number;
  porcentajePagado: number;
}

export interface ProyectoSummary {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  fechaInicio?: string;
  fechaFin?: string;
  diasRestantes?: number;
  estadoSalud: 'EN_PLAZO' | 'EN_RIESGO' | 'CRITICO' | 'FINALIZADO';
  totalOrdenes: number;
  totalEntregables: number;
  entregablesAtendidos: number;
  montoContratado: number;
  montoPagado: number;
  porcentajeFisico: number;
  porcentajeFinanciero: number;
  porcentajeTiempo: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  // En entorno local llamamos al backend en 8080 directamente para evitar reinicios de ng serve
  private baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/dashboard'
    : '/api/dashboard';

  getTopClasificadores(tipo: string = 'ALL'): Observable<TopClasificador[]> {
    return this.http.get<TopClasificador[]>(`${this.baseUrl}/top-clasificadores?tipo=${tipo}`);
  }

  getMonthlyExecution(anio: number = 2026): Observable<MonthlyExecution[]> {
    return this.http.get<MonthlyExecution[]>(`${this.baseUrl}/ejecucion-mensual?anio=${anio}`);
  }

  getProyectosResumen(): Observable<ProyectoSummary[]> {
    return this.http.get<ProyectoSummary[]>(`${this.baseUrl}/proyectos-resumen`);
  }
}

