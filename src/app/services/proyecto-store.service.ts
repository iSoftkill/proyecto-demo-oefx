import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type ProyectoTipo = 'PROYECTO' | 'MANTENIMIENTO';
export type ProyectoOrigen = 'INTERNO' | 'EXTERNO';

export interface ProyectoData {
  id: string;
  codigo: string;
  nombre: string;
  tipo: ProyectoTipo;
  nodoCodigo?: string;
  fechaInicio?: string;
  fechaFin?: string;
  activo: boolean;
  origen: ProyectoOrigen;
}

const API_URL = 'http://localhost:8080/api/projects';
const STORAGE_KEY = 'seosc_proyectos_v1';

const INITIAL_SEED: ProyectoData[] = [
  {
    id: 'proy-001',
    codigo: 'PRY-2026-001',
    nombre: 'Implementación SIGED v2',
    tipo: 'PROYECTO',
    nodoCodigo: 'OTI_DEV',
    fechaInicio: '01/01/2026',
    fechaFin: '31/12/2026',
    activo: true,
    origen: 'INTERNO'
  },
  {
    id: 'proy-002',
    codigo: 'MNT-2026-001',
    nombre: 'Mantenimiento Infraestructura Centro de Datos',
    tipo: 'MANTENIMIENTO',
    nodoCodigo: 'OTI_INF',
    fechaInicio: '01/01/2026',
    fechaFin: undefined,
    activo: true,
    origen: 'INTERNO'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProyectoStoreService {
  private http = inject(HttpClient);
  proyectos = signal<ProyectoData[]>([]);

  activeProyectos = computed(() => this.proyectos().filter(p => p.activo));

  activeByTipo = (tipo: ProyectoTipo) =>
    this.activeProyectos().filter(p => p.tipo === tipo);

  constructor() {
    this.loadFromBackend();
  }

  public loadFromBackend(): void {
    this.http.get<any[]>(API_URL).subscribe({
      next: (data) => {
        const mapped: ProyectoData[] = (data || []).map(item => ({
          id: String(item.id),
          codigo: item.codigo,
          nombre: item.nombre,
          tipo: item.tipo as ProyectoTipo,
          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,
          activo: item.activo === 'S',
          origen: item.origen as ProyectoOrigen
        }));
        this.proyectos.set(mapped);
      },
      error: (err) => {
        console.warn('No se pudo conectar al Backend, usando datos locales:', err);
        this.loadFromStorage();
      }
    });
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.proyectos.set(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('ProyectoStoreService: error leyendo localStorage', e);
    }
    this.proyectos.set(INITIAL_SEED);
  }

  add(newProyecto: Omit<ProyectoData, 'id'>): ProyectoData {
    const tempId = `proy-${Date.now()}`;
    const proyecto: ProyectoData = {
      ...newProyecto,
      id: tempId
    };

    // Actualizar estado local
    this.proyectos.update(list => [proyecto, ...list]);

    // Enviar al Backend Oracle
    const payload = {
      codigo: newProyecto.codigo,
      nombre: newProyecto.nombre,
      tipo: newProyecto.tipo,
      fechaInicio: newProyecto.fechaInicio || null,
      fechaFin: newProyecto.fechaFin || null,
      origen: newProyecto.origen || 'INTERNO',
      activo: newProyecto.activo ? 'S' : 'N'
    };

    this.http.post<any>(API_URL, payload).subscribe({
      next: (res) => {
        console.log('Proyecto guardado exitosamente en Oracle DB via Backend:', res);
        this.loadFromBackend();
      },
      error: (err) => console.error('Error guardando en Backend:', err)
    });

    return proyecto;
  }

  getById(id: string): ProyectoData | undefined {
    return this.proyectos().find(p => p.id === id);
  }

  update(id: string, changes: Partial<Omit<ProyectoData, 'id'>>): void {
    this.proyectos.update(list =>
      list.map(p => p.id === id ? { ...p, ...changes } : p)
    );

    const current = this.getById(id);
    if (current && !id.startsWith('proy-')) {
      const payload: any = {};
      if (changes.codigo !== undefined) payload.codigo = changes.codigo;
      if (changes.nombre !== undefined) payload.nombre = changes.nombre;
      if (changes.tipo !== undefined) payload.tipo = changes.tipo;
      if (changes.fechaInicio !== undefined) payload.fechaInicio = changes.fechaInicio || null;
      if (changes.fechaFin !== undefined) payload.fechaFin = changes.fechaFin || null;
      if (changes.activo !== undefined) payload.activo = changes.activo ? 'S' : 'N';
      if (changes.origen !== undefined) payload.origen = changes.origen;

      this.http.put(`${API_URL}/${id}`, payload).subscribe({
        next: () => this.loadFromBackend(),
        error: (err) => console.error('Error actualizando proyecto en BD:', err)
      });
    }
  }

  toggleActivo(id: string): void {
    const current = this.getById(id);
    if (!current) return;

    const newActivo = !current.activo;
    this.update(id, { activo: newActivo });
  }

  resetCache(): void {
    this.loadFromBackend();
  }
}
