import { Component, OnInit, signal, computed, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderStoreService, OrderData, DeliverableData, TimelineEvent, BienItemData, calculateOrderProgress } from '../../services/order-store.service';
import { NavigationService } from '../../services/navigation.service';
import { ProyectoStoreService } from '../../services/proyecto-store.service';
import { SigaService } from '../../services/siga-api.service';
import { SigedExpedienteResponse, SigedDocumentoItem, SigedBusquedaState } from '../../models/siga.model';
import { DragScrollDirective } from '../../directives/drag-scroll.directive';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { OefaProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { getStatusBadgeClass } from '../../shared/utils/status.utils';
import { ToastService } from '../../shared/components/toast/toast.service';

export interface EditableDeliverableItem {
  id: string;
  name: string;
  startDate: string;
  daysOffset: number;
  dueDate: string;
  amountPercent: number;
  calculatedAmount: number;
  status: DeliverableData['status'];
  sigedCode?: string;
  fechaAtencion?: string;
  observacion?: string;
  esHistorico?: boolean;
  observationCount: number;
  hasEvents: boolean;
  projectId?: string;
}

export type EventType = 
  | 'SIGED'                   // PENDIENTE -> EN_REVISION
  | 'APROBAR_CONFORMIDAD'     // EN_REVISION -> ATENDIDO (con doc SIGED + N° Conformidad)
  | 'OBSERVAR'                // EN_REVISION -> ATENDIDO_OBSERVADO (con doc + plazo + params)
  | 'NOTIFICAR_CONTRATISTA'   // ATENDIDO_OBSERVADO -> NOTIFICADO (datetime + calc. plazo)
  | 'SUBSANAR_CONTRATISTA'    // NOTIFICADO -> EN_REVISION (nuevo SIGED)
  | 'DESESTIMAR_SIGED'        // EN_REVISION / ATENDIDO_OBSERVADO / NOTIFICADO -> PENDIENTE
  | 'DESESTIMAR_ENTREGABLE'   // Cualquier estado no atendido -> REBAJADO
  | 'REACTIVAR_ENTREGABLE'    // REBAJADO -> PENDIENTE
  | 'PREVISION';              // PENDIENTE -> PREVISION

export interface SigedHistoryRecord {
  id: string;
  code: string;
  entryDate: string;
  status: 'ACTIVO' | 'DESESTIMADO';
  subsanacionNum: number;
}

export interface DeliverableHistoryRecord {
  user: string;
  action: string;
  actionClass: 'success' | 'warning' | 'info' | 'default';
  date: string;
  observation: string;
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DragScrollDirective, OefaStatusBadgeComponent, OefaButtonComponent, OefaIconButtonComponent, OefaProgressBarComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  currentOrderId = '';

  orderData: OrderData = {
    id: 'os-45',
    number: 'OS-00045-2026',
    type: 'OS',
    provider: 'Consorcio Ambiental S.A.',
    ruc: '20548963211',
    contractorType: 'PERSONA JURÍDICA',
    serviceDescription: 'Servicio de monitoreo participativo de calidad de agua en la cuenca del río Mantaro',
    requestingArea: 'DFA - Dirección de Fiscalización Ambiental',
    notificationDate: '2026-01-15',
    totalAmount: 85000,
    progressPercent: 33,
    status: 'EN_PROCESO',
    isRecurrent: false,
    requiresExtraVb: true,
    computeRule: 'NEXT_DAY',
    deliverables: [],
    timeline: []
  };

  deliverables = signal<DeliverableData[]>([]);
  timelineEvents = signal<TimelineEvent[]>([]);
  bienes = signal<any[]>([]);

  // System Tabs State
  activeTab = signal<'deliverables' | 'timeline' | 'bienes'>('deliverables');

  // Gmail Style Row Expansion State
  expandedDeliverableId = signal<string | null>(null);

  // Dropdown Menu State
  showDropdown = signal<boolean>(false);

  // Event Registration Modal State
  showEventModal = signal<boolean>(false);
  selectedDeliverableForEvent = signal<DeliverableData | null>(null);

  eventForm = {
    deliverableId: '',
    eventType: 'SIGED' as EventType,
    sigedCode: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryTime: '08:00',
    conformityNumber: '',
    approvalDoc: '',
    requiresExtraVb: false,
    notes: '',
    observationNotes: '',
    plazoSubsanacionDias: 5,
    plazoCuentaDesde: 'DIA_NOTIFICACION' as 'DIA_NOTIFICACION' | 'DIA_SIGUIENTE',
    plazoTipoDias: 'HABILES' as 'HABILES' | 'CALENDARIO'
  };

  // SIGED Search State
  sigedBusqueda = signal<SigedBusquedaState>({
    numeroExpediente: '',
    loading: false,
    error: null,
    resultado: null,
    documentoSeleccionadoId: null
  });

  private sigaService = inject(SigaService);
  private navService = inject(NavigationService);

  // State: Edit Mode
  isEditMode = signal<boolean>(false);
  editIsRecurrent = false;
  editStartDayRule: 'NEXT_DAY' | 'SAME_DAY' = 'NEXT_DAY';
  editableList = signal<EditableDeliverableItem[]>([]);

  toastMessage = signal<string>('');

  // Computed Properties
  totalPercent = computed(() => {
    return this.deliverables().reduce((sum, item) => sum + (item.amountPercent || 0), 0);
  });

  totalEditPercentSum = computed(() => {
    return Math.round(this.editableList().reduce((sum, item) => sum + (Number(item.amountPercent) || 0), 0));
  });

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private orderStoreService: OrderStoreService,
    private elementRef: ElementRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadOrder(id);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showDropdown() && !this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown.set(false);
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showDropdown.update(val => !val);
  }

  toggleExpandDeliverable(id: string) {
    if (this.expandedDeliverableId() === id) {
      this.expandedDeliverableId.set(null);
    } else {
      this.expandedDeliverableId.set(id);
    }
  }

  loadOrder(id?: string) {
    let order: OrderData | undefined;
    if (id) {
      order = this.orderStoreService.getOrderById(id);
    }

    if (!order && !id) {
      const allOrders = this.orderStoreService.orders();
      order = allOrders[0];
    }

    // Si aún no está en cache (cargando backend), reintentar brevemente
    if (!order && id) {
      setTimeout(() => {
        const retryOrder = this.orderStoreService.getOrderById(id);
        if (retryOrder) {
          this.applyOrderData(retryOrder);
        }
      }, 300);
      return;
    }

    if (order) {
      this.applyOrderData(order);
    }
  }

  private applyOrderData(order: OrderData) {
    this.currentOrderId = order.id;
    const calcProg = calculateOrderProgress(order.deliverables, order.totalAmount);
    this.orderData = {
      ...order,
      progressPercent: (order.progressPercent != null && order.progressPercent > 0) ? order.progressPercent : calcProg
    };
    this.navService.activeItemId.set(order.type === 'OC' ? 'ordenes_compra' : 'ordenes_servicio');
    this.deliverables.set(order.deliverables || []);
    this.timelineEvents.set(order.timeline || []);
    this.editIsRecurrent = order.isRecurrent || false;
    this.editStartDayRule = order.computeRule || 'NEXT_DAY';

    // Si es OC, abrir pestaña de bienes si no tiene entregables o por defecto
    if (order.type === 'OC' && (!order.deliverables || order.deliverables.length === 0)) {
      this.activeTab.set('bienes');
    }

    if (order.bienes && order.bienes.length > 0) {
      this.bienes.set(order.bienes);
    } else if (order.type === 'OC') {
      const rawNumericId = order.id.replace(/^oc-/, '').replace(/^os-/, '');
      this.http.get<BienItemData[]>(`/api/orders/${rawNumericId}/bienes?orderNumber=${encodeURIComponent(order.number)}`).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.bienes.set(data);
          }
        },
        error: (err) => console.warn('No se pudieron cargar los bienes de la OC', err)
      });
    } else {
      this.bienes.set([]);
    }

    // Mantener todos los entregables colapsados por defecto
    this.expandedDeliverableId.set(null);
  }

  /** @deprecated Usa <oefa-status-badge [status]="..."> en el template. Delegado al utility compartido. */
  getStatusClass(status: string): string {
    return getStatusBadgeClass(status);
  }

  getAvailableActionsForDeliverable(del: DeliverableData | null): { type: EventType; icon: string; bgClass: string; title: string; sub: string }[] {
    if (!del) return [];

    switch (del.status) {
      case 'PENDIENTE':
        return [
          { type: 'SIGED', icon: '📄', bgClass: 'info-bg', title: '1. Registrar Expediente SIGED', sub: 'Ingresa código de Mesa de Partes ➔ Pasa a EN REVISIÓN' },
          { type: 'PREVISION', icon: '📌', bgClass: 'warning-bg', title: '2. Programar Previsión Fiscal', sub: 'Pasa a PREVISIÓN (Año fiscal posterior)' },
          { type: 'DESESTIMAR_ENTREGABLE', icon: '❌', bgClass: 'danger-bg', title: '3. Desestimar Entregable', sub: 'Pasa a REBAJADO (no se ejecutará contractualmente)' }
        ];

      case 'EN_REVISION':
        return [
          { type: 'APROBAR_CONFORMIDAD', icon: '✓', bgClass: 'success-bg', title: '1. Otorgar Conformidad Técnica', sub: 'Doc SIGED + N° Conformidad ➔ Pasa a ATENDIDO' },
          { type: 'OBSERVAR', icon: '⚠️', bgClass: 'warning-bg', title: '2. Registrar Observación', sub: 'Doc SIGED + sustento + plazo ➔ Pasa a ATENDIDO OBSERVADO' },
          { type: 'DESESTIMAR_SIGED', icon: '🚫', bgClass: 'danger-bg', title: '3. Desestimar Documento SIGED', sub: 'Marca SIGED desestimado ➔ Regresa a PENDIENTE' },
          { type: 'DESESTIMAR_ENTREGABLE', icon: '❌', bgClass: 'danger-bg', title: '4. Desestimar Entregable', sub: 'Pasa a REBAJADO (desestimado contractualmente)' }
        ];

      case 'ATENDIDO_OBSERVADO':
        return [
          { type: 'NOTIFICAR_CONTRATISTA', icon: '📬', bgClass: 'warning-bg', title: '1. Registrar Notificación al Contratista', sub: 'Fecha+Hora ➔ Calcula plazo de subsanación ➔ Pasa a NOTIFICADO' },
          { type: 'DESESTIMAR_ENTREGABLE', icon: '❌', bgClass: 'danger-bg', title: '2. Desestimar Entregable', sub: 'Pasa a REBAJADO (desestimado contractualmente)' }
        ];

      case 'NOTIFICADO':
        return [
          { type: 'SUBSANAR_CONTRATISTA', icon: '🔄', bgClass: 'info-bg', title: '1. Registrar Subsanación (SIGED)', sub: 'Ingresa nuevo expediente ➔ Pasa a EN REVISIÓN' },
          { type: 'DESESTIMAR_SIGED', icon: '🚫', bgClass: 'danger-bg', title: '2. Desestimar Documento SIGED', sub: 'Marca SIGED desestimado ➔ Regresa a PENDIENTE' },
          { type: 'DESESTIMAR_ENTREGABLE', icon: '❌', bgClass: 'danger-bg', title: '3. Desestimar Entregable', sub: 'Pasa a REBAJADO (desestimado contractualmente)' }
        ];

      case 'ATENDIDO':
        return [
          { type: 'OBSERVAR', icon: '⚠️', bgClass: 'warning-bg', title: '1. Registrar Observación Posterior', sub: 'Doc SIGED + sustento + plazo ➔ Reabre ciclo ➔ ATENDIDO OBSERVADO' },
          { type: 'DESESTIMAR_SIGED', icon: '🚫', bgClass: 'danger-bg', title: '2. Desestimar Documento SIGED', sub: 'Anula atención ➔ Regresa a PENDIENTE' },
          { type: 'DESESTIMAR_ENTREGABLE', icon: '❌', bgClass: 'danger-bg', title: '3. Desestimar Entregable', sub: 'Pasa a REBAJADO (desestimado contractualmente)' }
        ];

      case 'REBAJADO':
        return [
          { type: 'REACTIVAR_ENTREGABLE', icon: '🔄', bgClass: 'info-bg', title: '1. Reactivar Entregable', sub: 'Reincorpora el entregable ➔ Regresa a PENDIENTE' }
        ];

      default:
        return [];
    }
  }

  goBack() {
    if (this.orderData.type === 'OC') {
      this.router.navigate(['/ordenes-compra']);
    } else {
      this.router.navigate(['/ordenes-servicio']);
    }
  }

  // --- EVENT REGISTRATION MODAL FLOW ---
  openRegisterEventModal(deliverableId?: string) {
    const list = this.deliverables();
    if (list.length === 0) {
      alert('No existen entregables en esta orden para registrar eventos.');
      return;
    }

    const targetId = deliverableId || list[0].id;
    this.eventForm.deliverableId = targetId;
    this.eventForm.sigedCode = '';
    this.eventForm.entryDate = new Date().toISOString().split('T')[0];
    this.eventForm.conformityNumber = '';
    this.eventForm.approvalDoc = '';
    this.eventForm.notes = '';
    this.eventForm.observationNotes = '';

    this.onEventDeliverableChange();
    this.showEventModal.set(true);
  }

  closeEventModal() {
    this.showEventModal.set(false);
    // Resetear búsqueda SIGED al cerrar
    this.sigedBusqueda.set({
      numeroExpediente: '',
      loading: false,
      error: null,
      resultado: null,
      documentoSeleccionadoId: null
    });
  }

  // ── SIGED Search ────────────────────────────────────────────────────────────

  buscarExpedienteSiged() {
    const numero = this.sigedBusqueda().numeroExpediente.trim();
    if (!numero) return;

    this.sigedBusqueda.update(s => ({ ...s, loading: true, error: null, resultado: null, documentoSeleccionadoId: null }));

    this.sigaService.buscarExpedienteSiged(numero).subscribe({
      next: (resp) => {
        if (resp.estado !== '1') {
          this.sigedBusqueda.update(s => ({
            ...s,
            loading: false,
            error: resp.mensaje || 'El expediente no fue encontrado.'
          }));
          return;
        }

        // Preseleccionar el documento esPrincipal = 1
        const principal = resp.documentos.find(d => d.esPrincipal === 1);
        const selId = principal?.idDocumento ?? (resp.documentos[0]?.idDocumento ?? null);

        this.sigedBusqueda.update(s => ({
          ...s,
          loading: false,
          resultado: resp,
          documentoSeleccionadoId: selId
        }));

        // Sincronizar el campo del formulario para que processEventSubmit lo vea
        this.eventForm.sigedCode = resp.numero;
        if (resp.fechaCreacionExpediente) {
          this.eventForm.entryDate = new Date(resp.fechaCreacionExpediente).toISOString().split('T')[0];
        }
      },
      error: (err) => {
        const msg = err.status === 404
          ? `El expediente "${numero}" no fue encontrado en SIGED.`
          : 'Error al consultar el servicio SIGED. Intente nuevamente.';
        this.sigedBusqueda.update(s => ({ ...s, loading: false, error: msg }));
      }
    });
  }

  seleccionarDocumentoSiged(idDocumento: number) {
    this.sigedBusqueda.update(s => ({ ...s, documentoSeleccionadoId: idDocumento }));
  }

  getDocumentoSeleccionado(): SigedDocumentoItem | null {
    const estado = this.sigedBusqueda();
    if (!estado.resultado || estado.documentoSeleccionadoId === null) return null;
    return estado.resultado.documentos.find(d => d.idDocumento === estado.documentoSeleccionadoId) ?? null;
  }

  formatTimestampToDate(ts: number): string {
    if (!ts) return '-';
    const d = new Date(ts);
    return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  onEventDeliverableChange() {
    const selected = this.deliverables().find(d => d.id === this.eventForm.deliverableId);
    this.selectedDeliverableForEvent.set(selected || null);

    if (selected) {
      const actions = this.getAvailableActionsForDeliverable(selected);
      const initialType = actions.length > 0 ? actions[0].type : 'SIGED';
      this.eventForm.eventType = initialType;

      if (initialType === 'SUBSANAR_CONTRATISTA') {
        // En subsanación es un nuevo registro SIGED: dejar limpio sin prefetch
        this.eventForm.sigedCode = '';
        this.sigedBusqueda.set({
          numeroExpediente: '',
          loading: false,
          error: null,
          resultado: null,
          documentoSeleccionadoId: null
        });
      } else if (selected.sigedCode) {
        this.eventForm.sigedCode = selected.sigedCode;
        if (initialType === 'APROBAR_CONFORMIDAD' || initialType === 'OBSERVAR') {
          this.cargarExpedienteSiAplica(selected.sigedCode);
        }
      } else {
        this.eventForm.sigedCode = '';
        this.sigedBusqueda.set({
          numeroExpediente: '',
          loading: false,
          error: null,
          resultado: null,
          documentoSeleccionadoId: null
        });
      }
    }
  }

  setEventType(type: EventType) {
    this.eventForm.eventType = type;
    const selected = this.selectedDeliverableForEvent();

    if (type === 'SUBSANAR_CONTRATISTA') {
      // Dejar limpio el campo de expediente y no ejecutar búsqueda automática
      this.eventForm.sigedCode = '';
      this.sigedBusqueda.set({
        numeroExpediente: '',
        loading: false,
        error: null,
        resultado: null,
        documentoSeleccionadoId: null
      });
      return;
    }

    // Auto-cargar SIGED cuando aplica (para conformidad u observación sobre el expediente activo)
    if ((type === 'APROBAR_CONFORMIDAD' || type === 'OBSERVAR') && selected?.sigedCode) {
      this.cargarExpedienteSiAplica(selected.sigedCode);
    }
    // Pre-cargar feriados para el cálculo de plazo
    if (type === 'NOTIFICAR_CONTRATISTA') {
      this.preCargaFeriadosAnioActual();
    }
  }

  cargarExpedienteSiAplica(sigedCode: string) {
    if (!sigedCode) return;
    const current = this.sigedBusqueda();
    if (current.resultado?.numero === sigedCode && !current.loading) {
      this.preseleccionarDocumentoDisponible(current.resultado);
      return;
    }

    this.sigedBusqueda.update(s => ({
      ...s,
      numeroExpediente: sigedCode,
      loading: true,
      error: null,
      resultado: null,
      documentoSeleccionadoId: null
    }));

    this.sigaService.buscarExpedienteSiged(sigedCode).subscribe({
      next: (resp) => {
        if (resp.estado !== '1') {
          this.sigedBusqueda.update(s => ({
            ...s,
            loading: false,
            error: resp.mensaje || 'El expediente no fue encontrado.'
          }));
          return;
        }
        this.sigedBusqueda.update(s => ({
          ...s,
          loading: false,
          resultado: resp
        }));
        this.preseleccionarDocumentoDisponible(resp);
      },
      error: (err) => {
        const msg = err.status === 404
          ? `El expediente "${sigedCode}" no fue encontrado en SIGED.`
          : 'Error al consultar el servicio SIGED. Intente nuevamente.';
        this.sigedBusqueda.update(s => ({ ...s, loading: false, error: msg }));
      }
    });
  }

  preseleccionarDocumentoDisponible(resp: SigedExpedienteResponse) {
    // Para APROBAR_CONFORMIDAD y OBSERVAR: pre-seleccionar doc no usado
    const usaDocNoRepetible = this.eventForm.eventType === 'APROBAR_CONFORMIDAD' ||
                               this.eventForm.eventType === 'OBSERVAR';
    if (usaDocNoRepetible) {
      const disponible = resp.documentos.find(d => !this.isDocAlreadyUsed(d.idDocumento, d));
      this.sigedBusqueda.update(s => ({ ...s, documentoSeleccionadoId: disponible?.idDocumento ?? null }));
    } else {
      const principal = resp.documentos.find(d => d.esPrincipal === 1);
      const selId = principal?.idDocumento ?? (resp.documentos[0]?.idDocumento ?? null);
      this.sigedBusqueda.update(s => ({ ...s, documentoSeleccionadoId: selId }));
    }
  }

  isDocAlreadyUsed(idDocumento: number, doc?: SigedDocumentoItem): boolean {
    const del = this.selectedDeliverableForEvent();
    if (!del) return false;

    // Caso especial: Observación Posterior (cuando el entregable está en ATENDIDO y se va a OBSERVAR)
    const esObservacionPosterior = del.status === 'ATENDIDO' && this.eventForm.eventType === 'OBSERVAR';
    if (esObservacionPosterior) {
      // En observación posterior solo se bloquea el documento principal
      if (doc && doc.esPrincipal === 1) return true;
      if (del.initialDocId === idDocumento) return true;
      return false;
    }

    // Regla estándar: no reutilizar ningún documento ya registrado
    if (del.usedDocIds && del.usedDocIds.includes(idDocumento)) return true;
    if (del.initialDocId === idDocumento) return true;
    return false;
  }

  // ── Cálculo de plazos con feriados ──────────────────────────────────────────

  private feriadosCache: Record<string, Set<string>> = {};

  private async cargarFeriados(anio: number): Promise<Set<string>> {
    const key = String(anio);
    if (this.feriadosCache[key]) return this.feriadosCache[key];
    try {
      const resp = await fetch('/assets/feriados_pe.json');
      const data: Record<string, string[]> = await resp.json();
      const set = new Set<string>(data[key] || []);
      this.feriadosCache[key] = set;
      return set;
    } catch {
      return new Set<string>();
    }
  }

  /** Devuelve true si la fecha (YYYY-MM-DD) cae en sábado, domingo o feriado */
  private esDiaNoHabil(fechaStr: string, feriados: Set<string>): boolean {
    const d = new Date(`${fechaStr}T12:00:00`);
    const dow = d.getDay();
    return dow === 0 || dow === 6 || feriados.has(fechaStr);
  }

  /** Suma N días hábiles o calendario a partir de fechaBase, excluyendo feriados */
  private sumarDiasDesde(
    fechaBase: Date,
    dias: number,
    tipo: 'HABILES' | 'CALENDARIO',
    feriados: Set<string>,
    desde: 'DIA_NOTIFICACION' | 'DIA_SIGUIENTE'
  ): Date {
    let actual = new Date(fechaBase);

    if (tipo === 'CALENDARIO') {
      // Si corre desde el día siguiente, sumamos N días calendario completos a fechaBase (ej: notif 10/09 + 7d = 17/09).
      // Si corre desde el mismo día, el día de notificación cuenta como día 1, por lo que sumamos N - 1 días.
      const diasASumar = desde === 'DIA_SIGUIENTE' ? dias : Math.max(1, dias - 1);
      actual.setDate(actual.getDate() + diasASumar);
    } else {
      // Días Hábiles
      let contados = 0;
      if (desde === 'DIA_NOTIFICACION') {
        const str = actual.toISOString().split('T')[0];
        if (!this.esDiaNoHabil(str, feriados)) {
          contados = 1;
        }
      }
      while (contados < dias) {
        actual.setDate(actual.getDate() + 1);
        const str = actual.toISOString().split('T')[0];
        if (!this.esDiaNoHabil(str, feriados)) {
          contados++;
        }
      }
    }

    // Regla LPAG art. 145.3: Si el día de vencimiento cae en día inhábil (sábado, domingo, feriado), prorrogar al primer día hábil siguiente
    let finStr = actual.toISOString().split('T')[0];
    while (this.esDiaNoHabil(finStr, feriados)) {
      actual.setDate(actual.getDate() + 1);
      finStr = actual.toISOString().split('T')[0];
    }

    return actual;
  }

  /**
   * Calcula la fecha de vencimiento del plazo de subsanación.
   * Regla 16:30: si hora notif > 16:30 → fecha efectiva es el siguiente día hábil.
   */
  calcularFechaVencimiento(
    notifDateStr: string,
    notifTime: string,
    plazo: { dias: number; desde: 'DIA_NOTIFICACION' | 'DIA_SIGUIENTE'; tipo: 'HABILES' | 'CALENDARIO' }
  ): string {
    const anio = parseInt(notifDateStr.split('-')[0]);
    const feriados = this.feriadosCache[String(anio)] || new Set<string>();

    const [horaStr, minStr] = notifTime.split(':');
    const hora = parseInt(horaStr);
    const min = parseInt(minStr);
    const superaLimite = hora > 16 || (hora === 16 && min > 30);

    // Fecha efectiva de notificación
    let fechaEfectiva = new Date(`${notifDateStr}T12:00:00`);
    if (superaLimite) {
      // Notificación posterior a 16:30 se tiene por efectuada el siguiente día hábil
      let sig = new Date(fechaEfectiva);
      sig.setDate(sig.getDate() + 1);
      let sigStr = sig.toISOString().split('T')[0];
      while (this.esDiaNoHabil(sigStr, feriados)) {
        sig.setDate(sig.getDate() + 1);
        sigStr = sig.toISOString().split('T')[0];
      }
      fechaEfectiva = sig;
    }

    const vencimiento = this.sumarDiasDesde(fechaEfectiva, plazo.dias, plazo.tipo, feriados, plazo.desde);
    return vencimiento.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  /** Pre-carga los feriados del año actual al abrir el modal de notificación */
  async preCargaFeriadosAnioActual() {
    const anio = new Date().getFullYear();
    await this.cargarFeriados(anio);
  }

  processEventSubmit() {
    const targetDel = this.selectedDeliverableForEvent();
    if (!targetDel) return;


    const now = new Date();
    const dateStr = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
    const userRole = `Operador (${this.orderData.requestingArea.split('-')[0].trim()})`;

    const allDeliverables = [...this.deliverables()];
    const delIndex = allDeliverables.findIndex(d => d.id === targetDel.id);
    if (delIndex === -1) return;

    const delToUpdate = { ...allDeliverables[delIndex] };
    let newTimelineEvent: TimelineEvent;

    switch (this.eventForm.eventType) {
      case 'SIGED':
      case 'SUBSANAR_CONTRATISTA': {
        // Validar que se buscó y se tiene resultado SIGED
        const busqueda = this.sigedBusqueda();
        if (this.eventForm.eventType === 'SIGED' && !busqueda.resultado) {
          alert('Por favor busque un expediente SIGED válido antes de registrar.');
          return;
        }
        if (!this.eventForm.sigedCode.trim()) {
          alert('Por favor ingrese o busque el código de expediente SIGED.');
          return;
        }
        delToUpdate.sigedCode = this.eventForm.sigedCode.trim();
        delToUpdate.status = 'EN_REVISION';

        const docSel = this.getDocumentoSeleccionado();
        if (docSel) {
          delToUpdate.initialDocId = docSel.idDocumento;
          delToUpdate.usedDocIds = [docSel.idDocumento];
        }
        const docInfo = docSel ? ` | Doc: ${docSel.numero}` : '';
        const adminInfo = busqueda.resultado ? ` | Administrado: ${busqueda.resultado.administrado}` : '';
        const evTitle = this.eventForm.eventType === 'SIGED'
          ? `Documento SIGED Registrado (${delToUpdate.sigedCode}) — ${delToUpdate.name}`
          : `Subsanación Registrada por SIGED (${delToUpdate.sigedCode}) — ${delToUpdate.name}`;

        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: evTitle,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: `Fecha Mesa Partes: ${this.eventForm.entryDate}${adminInfo}${docInfo}`,
          type: 'info'
        };
        const toastLabel = this.eventForm.eventType === 'SIGED' ? 'ingresado' : 'subsanación registrada';
        this.showToast(`Expediente ${delToUpdate.sigedCode} ${toastLabel}. Entregable en EN REVISIÓN.`);
        break;
      }


      case 'APROBAR_CONFORMIDAD': {
        if (!this.eventForm.conformityNumber?.trim()) {
          alert('Por favor ingrese el N° de Conformidad.');
          return;
        }
        const docConf = this.getDocumentoSeleccionado();
        if (!docConf) {
          alert('Por favor seleccione el documento del expediente SIGED vinculado a la conformidad.');
          return;
        }
        if (this.isDocAlreadyUsed(docConf.idDocumento, docConf)) {
          alert('El documento seleccionado ya fue utilizado en otra etapa. Seleccione otro documento.');
          return;
        }
        delToUpdate.status = 'ATENDIDO';
        delToUpdate.conformityDocId = docConf.idDocumento;
        delToUpdate.conformityDocNumber = docConf.numero;
        if (!delToUpdate.usedDocIds) delToUpdate.usedDocIds = [];
        if (!delToUpdate.usedDocIds.includes(docConf.idDocumento)) {
          delToUpdate.usedDocIds.push(docConf.idDocumento);
        }
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Conformidad Técnica Otorgada — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: `N° Conformidad SIGA: ${this.eventForm.conformityNumber.trim()} | Doc: ${docConf.numero}`,
          type: 'success'
        };
        this.showToast(`Conformidad N° ${this.eventForm.conformityNumber.trim()} registrada. Entregable ATENDIDO.`);
        break;
      }

      case 'OBSERVAR': {
        if (!this.eventForm.observationNotes.trim()) {
          alert('Por favor ingrese el sustento técnico de la observación.');
          return;
        }
        const docObs = this.getDocumentoSeleccionado();
        if (!docObs) {
          alert('Por favor seleccione el documento del expediente SIGED asociado a la observación.');
          return;
        }
        if (this.isDocAlreadyUsed(docObs.idDocumento, docObs)) {
          const msg = (delToUpdate.status === 'ATENDIDO')
            ? 'El documento principal no puede seleccionarse para la observación. Seleccione un anexo.'
            : 'El documento seleccionado ya fue utilizado en otra etapa. Seleccione otro documento.';
          alert(msg);
          return;
        }
        const plazo = this.eventForm.plazoSubsanacionDias ?? 5;
        const desde = this.eventForm.plazoCuentaDesde;
        const tipoDias = this.eventForm.plazoTipoDias;

        delToUpdate.status = 'ATENDIDO_OBSERVADO';
        delToUpdate.observationCount = (delToUpdate.observationCount || 0) + 1;
        delToUpdate.plazoSubsanacionDias = plazo;
        delToUpdate.plazoCuentaDesde = desde;
        delToUpdate.plazoTipoDias = tipoDias;
        if (!delToUpdate.usedDocIds) delToUpdate.usedDocIds = [];
        if (!delToUpdate.usedDocIds.includes(docObs.idDocumento)) {
          delToUpdate.usedDocIds.push(docObs.idDocumento);
        }

        const desdeLabel = desde === 'DIA_SIGUIENTE' ? 'día siguiente a notif.' : 'día de notif.';
        const tipoLabel = tipoDias === 'HABILES' ? 'días hábiles' : 'días calendario';
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Observación x${delToUpdate.observationCount} Registrada — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: `Doc: ${docObs.numero} | Sustento: "${this.eventForm.observationNotes}" | Plazo: ${plazo} ${tipoLabel} desde ${desdeLabel}`,
          type: 'warning'
        };
        this.showToast(`Observación x${delToUpdate.observationCount} registrada. Entregable ATENDIDO OBSERVADO.`);
        break;
      }

      case 'NOTIFICAR_CONTRATISTA': {
        const notifDate = this.eventForm.entryDate;
        const notifTime = this.eventForm.entryTime || '08:00';
        if (!notifDate) {
          alert('Por favor ingrese la fecha de notificación.');
          return;
        }
        const notifDatetime = `${notifDate}T${notifTime}`;
        const plazoInfo = {
          dias: targetDel.plazoSubsanacionDias ?? 5,
          desde: targetDel.plazoCuentaDesde ?? 'DIA_NOTIFICACION',
          tipo: targetDel.plazoTipoDias ?? 'HABILES'
        };
        const vencimiento = this.calcularFechaVencimiento(notifDate, notifTime, plazoInfo);

        delToUpdate.status = 'NOTIFICADO';
        delToUpdate.notificacionDatetime = notifDatetime;
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Notificación Enviada al Contratista — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: `Fecha/Hora notif.: ${notifDate} ${notifTime} | Plazo: ${plazoInfo.dias} días (${plazoInfo.tipo === 'HABILES' ? 'hábiles' : 'calendario'}) | Vence: ${vencimiento}`,
          type: 'warning'
        };
        this.showToast(`Notificación registrada. Plazo vence el ${vencimiento}. Entregable NOTIFICADO.`);
        break;
      }


      case 'DESESTIMAR_SIGED': {
        const oldSiged = delToUpdate.sigedCode || 'SIGED Activo';
        delToUpdate.sigedCode = undefined;
        delToUpdate.status = 'PENDIENTE';

        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Documento SIGED Desestimado (${oldSiged}) — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: `Expediente ${oldSiged} desestimado formalmente. El entregable regresa a estado PENDIENTE.`,
          type: 'warning'
        };
        this.showToast(`Documento SIGED desestimado. El entregable volvió a PENDIENTE.`);
        break;
      }

      case 'DESESTIMAR_ENTREGABLE': {
        delToUpdate.status = 'REBAJADO';
        const motivo = this.eventForm.observationNotes?.trim() || 'Entregable desestimado contractualmente (Rebajado).';
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Entregable Desestimado / Rebajado — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: motivo,
          type: 'default'
        };
        this.showToast(`Entregable ${delToUpdate.name} desestimado. Pasó a estado REBAJADO.`);
        break;
      }

      case 'REACTIVAR_ENTREGABLE': {
        delToUpdate.status = 'PENDIENTE';
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Entregable Reactivado — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: 'Entregable reincorporado al ciclo activo de atención.',
          type: 'info'
        };
        this.showToast(`Entregable ${delToUpdate.name} reactivado. Regresó a estado PENDIENTE.`);
        break;
      }

      case 'PREVISION':
        delToUpdate.status = 'PREVISION';
        newTimelineEvent = {
          id: `t-${Date.now()}`,
          date: dateStr,
          title: `Entregable pasado a Previsión Fiscal — ${delToUpdate.name}`,
          user: userRole,
          deliverableId: delToUpdate.id,
          observation: 'Programado para ejecución y previsión en ejercicio presupuestal posterior.',
          type: 'info'
        };
        this.showToast(`Entregable pasado a PREVISIÓN FISCAL.`);
        break;
    }

    allDeliverables[delIndex] = delToUpdate;

    this.orderStoreService.updateOrder(this.currentOrderId, (order) => ({
      ...order,
      deliverables: allDeliverables,
      timeline: [newTimelineEvent, ...(order.timeline || [])]
    }));

    this.loadOrder(this.currentOrderId);
    this.closeEventModal();
  }

  enableEditFromMenu() {
    this.showDropdown.set(false);
    this.enableEditMode();
  }

  desestimarOrdenFromMenu() {
    this.showDropdown.set(false);
    if (confirm(`¿Está seguro de desestimar la orden ${this.orderData.number}? Todos los entregables pendientes pasarán a estado REBAJADO.`)) {
      this.showToast(`La orden ${this.orderData.number} ha sido desestimada.`);
    }
  }

  // --- EDIT MODE LOGIC ---
  enableEditMode() {
    this.editIsRecurrent = this.orderData.isRecurrent || false;
    this.editStartDayRule = this.orderData.computeRule || 'NEXT_DAY';

    const mapped: EditableDeliverableItem[] = this.deliverables().map((d, idx) => {
      const hasEvts = Boolean(d.sigedCode || d.observationCount > 0 || d.status !== 'PENDIENTE');
      return {
        id: d.id || `edit-${idx}`,
        name: d.name,
        startDate: d.startDate || this.orderData.notificationDate,
        daysOffset: d.daysOffset || 30,
        dueDate: d.dueDate,
        amountPercent: d.amountPercent || 25,
        calculatedAmount: d.amount || ((this.orderData.totalAmount * (d.amountPercent || 25)) / 100),
        status: d.status,
        sigedCode: d.sigedCode,
        fechaAtencion: d.fechaAtencion,
        observacion: d.observacion,
        esHistorico: d.esHistorico,
        observationCount: d.observationCount || 0,
        hasEvents: hasEvts,
        projectId: d.projectId || this.orderData.projectId
      };
    });

    this.editableList.set(mapped);
    this.recalculateDates();
    this.recalculateAmounts();
    this.isEditMode.set(true);
  }

  cancelEditMode() {
    this.isEditMode.set(false);
  }

  onRecurrentToggle() {
    this.recalculateDates();
  }

  setStartDayRule(rule: 'NEXT_DAY' | 'SAME_DAY') {
    this.editStartDayRule = rule;
    this.recalculateDates();
  }

  addDeliverableRow() {
    const current = this.editableList();
    const nextIdx = current.length + 1;
    const notifDate = this.orderData.notificationDate;

    let startDateStr = notifDate;
    if (nextIdx > 1 && current[nextIdx - 2]?.dueDate) {
      startDateStr = current[nextIdx - 2].dueDate;
    }

    const newPercent = 10;
    const calculatedAmount = (this.orderData.totalAmount * newPercent) / 100;

    const newItem: EditableDeliverableItem = {
      id: `new-${Date.now()}`,
      name: `Entregable N° ${nextIdx}`,
      startDate: startDateStr,
      daysOffset: 15,
      dueDate: '',
      amountPercent: newPercent,
      calculatedAmount: calculatedAmount,
      status: 'PENDIENTE',
      observationCount: 0,
      hasEvents: false
    };

    const updated = [...current, newItem];
    this.editableList.set(updated);
    this.recalculateDates();
    this.recalculateAmounts();
  }

  removeDeliverableRow(index: number) {
    const list = this.editableList();
    if (list.length <= 1) return;

    const targetItem = list[index];
    if (targetItem.hasEvents) {
      alert('No se puede eliminar un entregable que ya cuenta con eventos o documentos registrados en la trazabilidad.');
      return;
    }

    list.splice(index, 1);
    this.editableList.set([...list]);
    this.recalculateDates();
    this.recalculateAmounts();
  }

  recalculateDates() {
    const notifDate = this.orderData.notificationDate;
    const list = this.editableList();

    list.forEach((item, idx) => {
      let baseDateStr = notifDate;

      if (this.editIsRecurrent) {
        if (!item.startDate) {
          item.startDate = (idx === 0) ? notifDate : (list[idx - 1]?.dueDate || notifDate);
        }
        baseDateStr = item.startDate;
      } else {
        baseDateStr = notifDate;
        item.startDate = notifDate;
      }

      item.dueDate = this.calculateDueDateStr(baseDateStr, Number(item.daysOffset || 0), this.editStartDayRule);
    });

    this.editableList.set([...list]);
  }

  recalculateAmounts() {
    const totalAmount = this.orderData.totalAmount || 0;
    const list = this.editableList();

    list.forEach(item => {
      item.calculatedAmount = (totalAmount * Number(item.amountPercent || 0)) / 100;
    });

    this.editableList.set([...list]);
  }

  saveOrderEdits() {
    if (this.totalEditPercentSum() !== 100) {
      alert('La suma de porcentajes de los entregables debe ser exactamente 100%.');
      return;
    }

    const updatedDeliverables: DeliverableData[] = this.editableList().map(item => ({
      id: item.id,
      name: item.name,
      startDate: item.startDate,
      daysOffset: item.daysOffset,
      computeMode: this.editStartDayRule,
      dueDate: item.dueDate,
      amountPercent: item.amountPercent,
      amount: item.calculatedAmount,
      status: item.status,
      sigedCode: item.sigedCode,
      observationCount: item.observationCount,
      projectId: item.projectId || undefined
    }));

    const now = new Date();
    const dateStr = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
    const newTimelineItem: TimelineEvent = {
      id: `t-${Date.now()}`,
      date: dateStr,
      title: `Programación de Entregables Reajustada (${updatedDeliverables.length} entregables)`,
      user: `Por: Operador (${this.orderData.requestingArea.split('-')[0].trim()})`,
      type: 'info'
    };

    this.orderStoreService.updateOrder(this.currentOrderId, (order) => ({
      ...order,
      isRecurrent: this.editIsRecurrent,
      computeRule: this.editStartDayRule,
      deliverables: updatedDeliverables,
      timeline: [newTimelineItem, ...(order.timeline || [])]
    }));

    this.loadOrder(this.currentOrderId);
    this.isEditMode.set(false);
    this.showToast('Programación de entregables actualizada con éxito (100% verificado).');
  }

  public proyectoStoreService = inject(ProyectoStoreService);

  getProyectoBadge(proyId?: string): { label: string; tipo: 'PROYECTO' | 'MANTENIMIENTO' } | null {
    if (!proyId) return null;
    const p = this.proyectoStoreService.getById(proyId);
    if (!p) return null;
    return { label: `[${p.tipo === 'PROYECTO' ? 'PRY' : 'MNT'}] ${p.codigo}`, tipo: p.tipo };
  }

  formatDateToDDMMYYYY(dateStr?: string): string {
    if (!dateStr) return '-';
    if (dateStr.includes('/')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [yyyy, mm, dd] = parts;
      return `${dd.padStart(2, '0')}/${mm.padStart(2, '0')}/${yyyy}`;
    }
    return dateStr;
  }

  calculateDueDateStr(startDateStr: string, days: number, mode: 'NEXT_DAY' | 'SAME_DAY'): string {
    if (!startDateStr || isNaN(days)) return '-';
    
    let year: number, month: number, day: number;
    if (startDateStr.includes('/')) {
      const parts = startDateStr.split('/');
      if (parts.length !== 3) return '-';
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    } else {
      const parts = startDateStr.split('-');
      if (parts.length !== 3) return '-';
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
    }
    
    const date = new Date(year, month, day);
    const addDays = mode === 'NEXT_DAY' ? days : Math.max(1, days - 1);
    
    date.setDate(date.getDate() + addDays);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  getDeliverableHistory(item: DeliverableData): DeliverableHistoryRecord[] {
    const records: DeliverableHistoryRecord[] = [];

    // 1. Verificar si hay eventos en el timeline global de la orden
    const matchedTimeline = this.timelineEvents().filter(e => 
      (e.deliverableId && e.deliverableId === item.id) ||
      e.title.toLowerCase().includes(item.name.toLowerCase()) || 
      (item.sigedCode && e.title.includes(item.sigedCode))
    );

    if (matchedTimeline.length > 0) {
      matchedTimeline.forEach(e => {
        // Extraer usuario limpio (sin observaciones / sustento)
        let cleanUser = e.user ? e.user.replace(/^Por:\s*/i, '').trim() : 'Usuario del Sistema';
        if (cleanUser.includes('—')) {
          cleanUser = cleanUser.split('—')[0].trim();
        }
        if (cleanUser.includes('|')) {
          cleanUser = cleanUser.split('|')[0].trim();
        }

        // Extraer observación / sustento
        let obs = e.observation;
        if (!obs) {
          if (e.user.includes('—')) {
            obs = e.user.split('—').slice(1).join('—').trim();
          } else if (e.user.includes('|')) {
            obs = e.user.split('|').slice(1).join('|').trim();
          } else if (e.title.includes('—')) {
            obs = e.title.split('—').slice(1).join('—').trim();
          } else {
            obs = 'Registro auditado en el sistema';
          }
        }

        records.push({
          user: cleanUser,
          action: e.title.split('—')[0].trim(),
          actionClass: e.type,
          date: e.date,
          observation: obs
        });
      });
    }

    // 2. Si no hay eventos manuales en el timeline, generar trazabilidad real del ciclo de vida
    if (records.length === 0) {
      // Evento A: Programación inicial
      records.push({
        user: 'Sistema OEFA',
        action: 'Programación Inicial',
        actionClass: 'default',
        date: this.formatDateToDDMMYYYY(item.startDate || this.orderData.notificationDate),
        observation: `Entregable registrado con plazo de ${item.daysOffset || 30} días (Fecha límite: ${this.formatDateToDDMMYYYY(item.dueDate)}).`
      });

      // Evento B: Ingreso de documento SIGED si existe
      if (item.sigedCode) {
        const fechaIngreso = item.fechaAtencion ? this.formatDateToDDMMYYYY(item.fechaAtencion) : this.formatDateToDDMMYYYY(item.dueDate);
        records.push({
          user: 'Mesa de Partes Virtual / SIGED',
          action: 'Ingreso Documento SIGED',
          actionClass: 'info',
          date: fechaIngreso,
          observation: `Expediente N° ${item.sigedCode} presentado formalmente.`
        });
      }

      // Evento C: Estado de atención o revisión
      if (item.status === 'ATENDIDO') {
        const fechaAtenc = item.fechaAtencion ? this.formatDateToDDMMYYYY(item.fechaAtencion) : this.formatDateToDDMMYYYY(item.dueDate);
        const obs = item.observacion || (item.esHistorico ? 'Carga inicial histórica desde Excel DATA_2026' : 'Entregable atendido y conforme.');
        records.push({
          user: item.esHistorico ? 'Carga Histórica / OTI' : 'Administrador del Sistema',
          action: 'Entregable Atendido',
          actionClass: 'success',
          date: fechaAtenc,
          observation: obs
        });
      } else if (item.status === 'ATENDIDO_OBSERVADO' || item.status === 'NOTIFICADO') {
        records.push({
          user: 'Equipo Técnico OTI',
          action: `Observación N° ${item.observationCount || 1}`,
          actionClass: 'warning',
          date: this.formatDateToDDMMYYYY(item.dueDate),
          observation: item.observacion || 'Entregable observado en revisión técnica.'
        });
      } else if (item.status === 'EN_REVISION') {
        records.push({
          user: 'Equipo Técnico OTI',
          action: 'En Revisión Técnica',
          actionClass: 'info',
          date: this.formatDateToDDMMYYYY(item.dueDate),
          observation: 'Expediente en evaluación de conformidad.'
        });
      } else if (item.status === 'PREVISION') {
        records.push({
          user: 'Planificación OTI',
          action: 'Entregable en Previsión',
          actionClass: 'default',
          date: this.formatDateToDDMMYYYY(item.dueDate),
          observation: 'Presupuesto y ejecución proyectada para el siguiente ejercicio fiscal.'
        });
      } else if (item.status === 'REBAJADO') {
        records.push({
          user: 'Administrador del Sistema',
          action: 'Entregable Rebajado',
          actionClass: 'default',
          date: this.formatDateToDDMMYYYY(item.dueDate),
          observation: 'Entregable desestimado / rebajado contractualmente.'
        });
      }
    }

    return records;
  }

  private toastService = inject(ToastService);

  showToast(msg: string) {
    this.toastService.success(msg);
  }
}
