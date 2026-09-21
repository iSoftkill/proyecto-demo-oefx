import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type DeliverableStatus = 
  | 'PENDIENTE' 
  | 'EN_REVISION' 
  | 'ATENDIDO_OBSERVADO' 
  | 'NOTIFICADO' 
  | 'ATENDIDO' 
  | 'REBAJADO' 
  | 'PREVISION';

export interface DeliverableData {
  id: string;
  name: string;
  startDate?: string;
  daysOffset?: number;
  computeMode?: 'NEXT_DAY' | 'SAME_DAY';
  dueDate: string;
  amountPercent?: number;
  amount?: number;
  status: DeliverableStatus;
  sigedCode?: string;
  fechaAtencion?: string;
  observacion?: string;
  esHistorico?: boolean;
  initialDocId?: number;
  usedDocIds?: number[];
  conformityDocId?: number;
  conformityDocNumber?: string;
  observationCount: number;
  /** FK nullable → T_MAP_PROYECTO. Fuente de verdad del proyecto asignado al entregable. */
  projectId?: string;
  /** Campos de plazo para ciclo de observación/subsanación */
  plazoSubsanacionDias?: number;
  plazoCuentaDesde?: 'DIA_NOTIFICACION' | 'DIA_SIGUIENTE';
  plazoTipoDias?: 'HABILES' | 'CALENDARIO';
  /** Datetime efectivo de la notificación al contratista */
  notificacionDatetime?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  user: string;
  type: 'success' | 'warning' | 'info' | 'default';
  observation?: string;
  deliverableId?: string;
}

export interface BienItemData {
  idRq: number;
  tipoRq: string;
  nroRq: string;
  itemRq?: string;
  detalleRq?: string;
  importeRq: number;
  estadoRq?: string;
  itemPoi?: string;
  codigoBien?: string;
  descripcionBien?: string;
  cantidadTotal?: number;
  precioUnitario?: number;
}

export function calculateOrderProgress(deliverables?: DeliverableData[], totalAmount?: number): number {
  if (!deliverables || deliverables.length === 0) return 0;
  const attended = deliverables.filter(d => d.status === 'ATENDIDO');
  if (attended.length === 0) return 0;
  if (attended.length === deliverables.length) return 100;

  const totalPercent = deliverables.reduce((acc, d) => acc + (Number(d.amountPercent) || 0), 0);
  if (totalPercent >= 90) {
    const attendedPercent = attended.reduce((acc, d) => acc + (Number(d.amountPercent) || 0), 0);
    return Math.min(100, Math.round(attendedPercent));
  }

  if (totalAmount && totalAmount > 0) {
    const attendedAmount = attended.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
    if (attendedAmount > 0) {
      return Math.min(100, Math.round((attendedAmount / totalAmount) * 100));
    }
  }

  return Math.min(100, Math.round((attended.length / deliverables.length) * 100));
}

export interface OrderData {
  id: string;
  number: string;
  type: 'OS' | 'OC';
  ruc: string;
  provider: string;
  contractorType: string;
  contractNumber?: string;
  serviceDescription: string;
  requestingArea: string;
  notificationDate: string;
  totalAmount: number;
  progressPercent: number;
  status: 'EN_PROCESO' | 'FINALIZADO' | 'DESESTIMADO';
  isRecurrent: boolean;
  requiresExtraVb: boolean;
  computeRule: 'NEXT_DAY' | 'SAME_DAY';
  deliverables: DeliverableData[];
  timeline: TimelineEvent[];
  /** FK nullable → T_MAP_PROYECTO. Valor por defecto usado para pre-llenar entregables. No es autoridad. */
  projectId?: string;
  /** Lista de bienes adquiridos asociados si la orden es de tipo OC */
  bienes?: BienItemData[];
}

const STORAGE_KEY = 'seosc_orders_v6';

const INITIAL_SEED: OrderData[] = [
  {
    id: 'os-001',
    number: 'OS-00019-2026',
    type: 'OS',
    ruc: '58304794081',
    provider: 'FERNANDEZ JACOBO ISABEL MERCEDES',
    contractorType: 'LOCADOR',
    contractNumber: 'CONTRATO MENOR N° 003-2026-OEFA',
    serviceDescription: 'SERVICIO DE SEGUIMIENTO Y ASISTENCIA DE ACTIVIDADES ADMINISTRATIVAS PARA LA OFICINA DE TECNOLOGIAS DE LA INFORMACION',
    requestingArea: 'Administrativo',
    notificationDate: '08/01/2026',
    totalAmount: 39000.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    projectId: 'proy-001',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '08/01/2026', daysOffset: 20, dueDate: '27/01/2026', amountPercent: 15.0, amount: 5850.0, status: 'ATENDIDO', sigedCode: '2025-E01-012852', observationCount: 0, projectId: 'proy-001' },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '08/01/2026', daysOffset: 50, dueDate: '26/02/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-024933', observationCount: 0, projectId: 'proy-001' },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '08/01/2026', daysOffset: 80, dueDate: '28/03/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-039788', observationCount: 0, projectId: 'proy-001' },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '08/01/2026', daysOffset: 110, dueDate: '27/04/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-055073', observationCount: 0, projectId: 'proy-001' },
      { id: 'd5', name: 'ENTREGABLE 5', startDate: '08/01/2026', daysOffset: 140, dueDate: '27/05/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-069641', observationCount: 0, projectId: 'proy-001' },
      { id: 'd6', name: 'ENTREGABLE 6', startDate: '08/01/2026', daysOffset: 170, dueDate: '26/06/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-082729', observationCount: 0, projectId: 'proy-001' }
    ],
    timeline: [
      { id: 't1', date: '08/01/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-002',
    number: 'OS-00023-2026',
    type: 'OS',
    ruc: '96401778707',
    provider: 'BARRETO ENCISO ADA MIRELLA',
    contractorType: 'LOCADOR',
    contractNumber: 'CONTRATO N° 012-2026-OEFA/GAF',
    serviceDescription: 'SERVICIO DE SEGUIMIENTO A LA EJECUCIÓN FÍSICA, FINANCIERA Y ADMINISTRATIVA DE PROYECTOS Y ACTIVIDADES DE LA OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN',
    requestingArea: 'Administrativo',
    notificationDate: '08/01/2026',
    totalAmount: 39000.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '08/01/2026', daysOffset: 20, dueDate: '27/01/2026', amountPercent: 15.0, amount: 5850.0, status: 'ATENDIDO', sigedCode: '2025-E01-013000', observationCount: 0, projectId: 'proy-001' },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '08/01/2026', daysOffset: 50, dueDate: '26/02/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-024767', observationCount: 0, projectId: 'proy-001' },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '08/01/2026', daysOffset: 80, dueDate: '28/03/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-040058', observationCount: 0, projectId: 'proy-002' },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '08/01/2026', daysOffset: 110, dueDate: '27/04/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-056763', observationCount: 0, projectId: 'proy-002' },
      { id: 'd5', name: 'ENTREGABLE 5', startDate: '08/01/2026', daysOffset: 140, dueDate: '27/05/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-069779', observationCount: 0 },
      { id: 'd6', name: 'ENTREGABLE 6', startDate: '08/01/2026', daysOffset: 170, dueDate: '26/06/2026', amountPercent: 17.0, amount: 6630.0, status: 'ATENDIDO', sigedCode: '2025-E01-082638', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '08/01/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-003',
    number: 'OS-00038-2026',
    type: 'OS',
    ruc: '53893644388',
    provider: 'AGUILAR LAGO RICHARD ALBERTO',
    contractorType: 'LOCADOR',
    serviceDescription: 'SERVICIO DE ASISTENCIA TÉCNICA EN MONITOREO Y SEGUIMIENTO DE IMPLEMENTACIÓN DEL SISTEMA INTEGRADO DE GESTIÓN ADMINISTRATIVA',
    requestingArea: 'Desarrollo',
    notificationDate: '10/01/2026',
    totalAmount: 42000.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '10/01/2026', daysOffset: 20, dueDate: '29/01/2026', amountPercent: 15.0, amount: 6300.0, status: 'ATENDIDO', sigedCode: '2025-E01-013879', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '10/01/2026', daysOffset: 50, dueDate: '28/02/2026', amountPercent: 17.0, amount: 7140.0, status: 'ATENDIDO', sigedCode: '2025-E01-025979', observationCount: 0 },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '10/01/2026', daysOffset: 80, dueDate: '30/03/2026', amountPercent: 17.0, amount: 7140.0, status: 'ATENDIDO', sigedCode: '2025-E01-038500', observationCount: 0 },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '10/01/2026', daysOffset: 110, dueDate: '29/04/2026', amountPercent: 17.0, amount: 7140.0, status: 'ATENDIDO', sigedCode: '2025-E01-056260', observationCount: 0 },
      { id: 'd5', name: 'ENTREGABLE 5', startDate: '10/01/2026', daysOffset: 140, dueDate: '29/05/2026', amountPercent: 17.0, amount: 7140.0, status: 'ATENDIDO', sigedCode: '2025-E01-070176', observationCount: 0 },
      { id: 'd6', name: 'ENTREGABLE 6', startDate: '10/01/2026', daysOffset: 170, dueDate: '28/06/2026', amountPercent: 17.0, amount: 7140.0, status: 'ATENDIDO', sigedCode: '2025-E01-082911', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '10/01/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-004',
    number: 'OS-00327-2026',
    type: 'OS',
    ruc: '20615371145',
    provider: 'REPRESENTACIONES NIRO SOCIEDAD ANONIMA CERRADA',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE SOPORTE Y MANTENIMIENTO PREVENTIVO DE LOS EQUIPOS DE AIRES ACONDICIONADO DE PRECISIÓN DEL CENTRO DE DATOS DEL OEFA',
    requestingArea: 'Infraestructura',
    notificationDate: '22/11/2026',
    totalAmount: 28378.92,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '22/11/2026', daysOffset: 92, dueDate: '21/02/2026', amountPercent: 17.0, amount: 6519.48, status: 'ATENDIDO', sigedCode: '2025-E01-026203', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '22/02/2026', daysOffset: 89, dueDate: '21/05/2026', amountPercent: 17.0, amount: 6519.48, status: 'ATENDIDO', sigedCode: '2025-E01-081672', observationCount: 0 },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '22/05/2026', daysOffset: 92, dueDate: '21/08/2026', amountPercent: 20.0, amount: 7669.98, status: 'ATENDIDO', sigedCode: '2025-E01-107688', observationCount: 0 },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '22/08/2026', daysOffset: 92, dueDate: '21/11/2026', amountPercent: 20.0, amount: 7669.98, status: 'ATENDIDO', sigedCode: '2025-E01-148235', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '22/11/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-005',
    number: 'OS-00328-2026',
    type: 'OS',
    ruc: '72724175286',
    provider: 'DIGILINK S.A.C.',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE SELLADO DE TIEMPO PRINCIPAL Y ALTERNO PARA EL PROCESO DE FIRMA DIGITAL INTEGRADO EN LOS SISTEMAS DE INFORMACION DEL OEFA',
    requestingArea: 'Desarrollo',
    notificationDate: '17/05/2026',
    totalAmount: 15296.25,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '17/05/2026', daysOffset: 365, dueDate: '16/05/2026', amountPercent: 50.0, amount: 15296.25, status: 'ATENDIDO', sigedCode: '2025-E01-081958', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '17/05/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-006',
    number: 'OS-00331-2026',
    type: 'OS',
    ruc: '76931639247',
    provider: 'STAMPING S.A.C.',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE REGISTRO Y TRAZABILIDAD DE LA INFORMACIÓN MEDIANTE TECNOLOGÍA BLOCKCHAIN PARA DECLARACIONES JURADAS DEL SISTEMA DE APORTE POR REGULACIÓN',
    requestingArea: 'Desarrollo',
    notificationDate: '23/05/2026',
    totalAmount: 4534.6,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '23/05/2026', daysOffset: 365, dueDate: '22/05/2026', amountPercent: 20.0, amount: 4534.6, status: 'ATENDIDO', sigedCode: '2025-E01-068590', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '23/05/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-007',
    number: 'OS-00347-2026',
    type: 'OS',
    ruc: '68121420425',
    provider: 'AL CONTROL SISTEM S.A.C.',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE MANTENIMIENTO PREVENTIVO DEL SISTEMA CONTRA INCENDIO PARA EL CENTRO DE DATOS DEL OEFA',
    requestingArea: 'Infraestructura',
    notificationDate: '13/02/2026',
    totalAmount: 5930.91,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '13/02/2026', daysOffset: 90, dueDate: '13/05/2026', amountPercent: 5.0, amount: 1976.97, status: 'ATENDIDO', sigedCode: '2025-E01-023648', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '14/05/2026', daysOffset: 93, dueDate: '14/08/2026', amountPercent: 5.0, amount: 1976.97, status: 'ATENDIDO', sigedCode: '2025-E01-074811', observationCount: 0 },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '15/08/2026', daysOffset: 93, dueDate: '15/11/2026', amountPercent: 5.0, amount: 1976.97, status: 'ATENDIDO', sigedCode: '2025-E01-109665', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '13/02/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-008',
    number: 'OS-00349-2026',
    type: 'OS',
    ruc: '17885515740',
    provider: 'NEXTNET S.A.C.',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE INTERNET PARA LA SEDE PRINCIPAL DEL OEFA',
    requestingArea: 'Infraestructura',
    notificationDate: '24/12/2026',
    totalAmount: 61075.84,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '24/12/2026', daysOffset: 31, dueDate: '23/01/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-014190', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '24/01/2026', daysOffset: 31, dueDate: '23/02/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-027617', observationCount: 0 },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '24/02/2026', daysOffset: 28, dueDate: '23/03/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-040221', observationCount: 0 },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '24/03/2026', daysOffset: 31, dueDate: '23/04/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-057300', observationCount: 0 },
      { id: 'd5', name: 'ENTREGABLE 5', startDate: '24/04/2026', daysOffset: 30, dueDate: '23/05/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-070656', observationCount: 0 },
      { id: 'd6', name: 'ENTREGABLE 6', startDate: '24/05/2026', daysOffset: 31, dueDate: '23/06/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-084466', observationCount: 0 },
      { id: 'd7', name: 'ENTREGABLE 7', startDate: '24/06/2026', daysOffset: 29, dueDate: '22/07/2026', amountPercent: 0.0, amount: 8725.12, status: 'ATENDIDO', sigedCode: '2025-E01-098718', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '24/12/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-009',
    number: 'OS-00543-2026',
    type: 'OS',
    ruc: '55646040197',
    provider: 'DLMRED NETWORK POWER PROTECTION SOCIEDAD ANONIMA CERRADA',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO MANTENIMIENTO PREVENTIVO Y SOPORTE DE SISTEMA DE ACUMULADOR DE ENERGIA - EQUIPO DE UPS',
    requestingArea: 'Infraestructura',
    notificationDate: '22/01/2026',
    totalAmount: 40725.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '22/01/2026', daysOffset: 5, dueDate: '26/01/2026', amountPercent: 80.0, amount: 32580.0, status: 'ATENDIDO', sigedCode: '2025-E01-025854', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '08/01/2026', daysOffset: 365, dueDate: '07/01/2026', amountPercent: 20.0, amount: 8145.0, status: 'PREVISION', sigedCode: 'PREVISIÓN 2026', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '22/01/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-010',
    number: 'OS-00556-2026',
    type: 'OS',
    ruc: '38340355386',
    provider: 'GM MARKETING SERVICES SAC',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO DE ENVÍOS DE MENSAJES SMS PARA EL OEFA',
    requestingArea: 'Desarrollo',
    notificationDate: '01/08/2026',
    totalAmount: 3100.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '01/08/2026', daysOffset: 365, dueDate: '31/07/2026', amountPercent: 50.0, amount: 3100.0, status: 'ATENDIDO', sigedCode: '2025-E01-099356', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '01/08/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  },
  {
    id: 'os-011',
    number: 'OS-01588-2026',
    type: 'OS',
    ruc: '14299890124',
    provider: 'SOLUCIONES APLICADAS EN TECNOLOGIA AVANZADA S.A.C.',
    contractorType: 'JURIDICA',
    serviceDescription: 'SERVICIO ESPECIALIZADO DE CASILLAS ELECTRÓNICAS PARA EL OEFA Y REALIZAR LAS ADECUACIONES EN EL SISTEMA DE GESTION ELECTRÓNICA DE DOCUMENTOS (SIGED) PARA INTEGRARLO A LA PLATAFORMA',
    requestingArea: 'Desarrollo',
    notificationDate: '03/05/2026',
    totalAmount: 96480.0,
    progressPercent: 100,
    status: 'FINALIZADO',
    isRecurrent: false,
    requiresExtraVb: false,
    computeRule: 'NEXT_DAY',
    deliverables: [
      { id: 'd1', name: 'ENTREGABLE 1', startDate: '03/05/2026', daysOffset: 5, dueDate: '07/05/2026', amountPercent: 0.0, amount: 0.0, status: 'ATENDIDO', sigedCode: '2025-E01-063442', observationCount: 0 },
      { id: 'd2', name: 'ENTREGABLE 2', startDate: '03/05/2026', daysOffset: 30, dueDate: '01/06/2026', amountPercent: 60.0, amount: 17280.0, status: 'ATENDIDO', sigedCode: '2025-E01-087532', observationCount: 0 },
      { id: 'd3', name: 'ENTREGABLE 3', startDate: '03/05/2026', daysOffset: 180, dueDate: '29/10/2026', amountPercent: 20.0, amount: 72000.0, status: 'ATENDIDO', sigedCode: '2025-E01-137359', observationCount: 0 },
      { id: 'd4', name: 'ENTREGABLE 4', startDate: '03/05/2026', daysOffset: 365, dueDate: '02/05/2026', amountPercent: 20.0, amount: 7200.0, status: 'PREVISION', sigedCode: 'PREVISION 2026', observationCount: 0 }
    ],
    timeline: [
      { id: 't1', date: '03/05/2026 09:00 AM', title: 'Orden Registrada en el Sistema SEOSC', user: 'Por: Jerson Alvarez', type: 'info' }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {
  orders = signal<OrderData[]>([]);
  private http = inject(HttpClient);

  constructor() {
    // Clear old seed caches if exist
    try {
      localStorage.removeItem('seosc_orders_cache_v1');
      localStorage.removeItem('seosc_orders_v2');
    } catch (e) {}
    this.loadFromStorage();
    this.fetchFromBackend();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withRecalculated = parsed.map((o: OrderData) => ({
            ...o,
            progressPercent: calculateOrderProgress(o.deliverables, o.totalAmount)
          }));
          this.orders.set(withRecalculated);
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading orders from localStorage', e);
    }

    // Default Real Seed Data
    this.orders.set(INITIAL_SEED);
    this.saveToStorage();
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders()));
    } catch (e) {
      console.warn('Error saving orders to localStorage', e);
    }
  }

  updateOrder(orderId: string, mutator: (order: OrderData) => OrderData): void {
    const cleanId = orderId.toLowerCase();
    let updatedOrder: OrderData | null = null;
    this.orders.update(list => list.map(o => {
      const oId = o.id.toLowerCase();
      const oNum = o.number.toLowerCase();
      if (oId === cleanId || oNum === cleanId || oId === ('oc-' + cleanId) || oId === ('os-' + cleanId)) {
        const updated = mutator({ ...o });
        updated.progressPercent = calculateOrderProgress(updated.deliverables, updated.totalAmount);
        updatedOrder = updated;
        return updated;
      }
      return o;
    }));
    this.saveToStorage();

    if (updatedOrder) {
      this.persistOrderToBackend(updatedOrder);
    }
  }

  private persistOrderToBackend(order: OrderData): void {
    const rawId = order.id.replace(/^(os-|oc-)/i, '');
    const numId = Number(rawId);
    if (isNaN(numId) || numId <= 0) return;

    let numericPryId: number | null = null;
    if (order.projectId) {
      const parsed = Number(String(order.projectId).replace(/\D/g, ''));
      if (!isNaN(parsed) && parsed > 0) numericPryId = parsed;
    }

    const payload = {
      id: numId,
      type: order.type,
      projectId: numericPryId,
      totalAmount: order.totalAmount,
      status: order.status,
      deliverables: (order.deliverables || []).map(d => {
        let delPryId: number | null = null;
        if (d.projectId) {
          const parsed = Number(String(d.projectId).replace(/\D/g, ''));
          if (!isNaN(parsed) && parsed > 0) delPryId = parsed;
        }
        const delNumId = Number(String(d.id).replace(/\D/g, ''));
        return {
          id: !isNaN(delNumId) && delNumId > 0 ? delNumId : null,
          projectId: delPryId,
          amount: d.amount,
          amountPercent: d.amountPercent,
          status: d.status,
          dueDate: d.dueDate ? this.formatDateToIso(d.dueDate) : null
        };
      })
    };

    this.http.put(`/api/orders/${numId}`, payload).subscribe({
      next: () => console.log(`Orden ${order.number} y entregables sincronizados con Oracle DB`),
      error: (err) => console.warn(`Error al sincronizar orden ${order.number} con backend:`, err)
    });
  }

  private formatDateToIso(val?: string): string | null {
    if (!val) return null;
    if (val.includes('-')) return val;
    const parts = val.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return null;
  }


  getOrdersByType(type: 'OS' | 'OC'): OrderData[] {
    return this.orders().filter(o => o.type === type);
  }

  getOrderById(id: string): OrderData | undefined {
    if (!id) return undefined;
    const clean = id.trim().toLowerCase();
    return this.orders().find(o => {
      const oId = o.id.toLowerCase();
      const oNum = o.number.toLowerCase();
      return oId === clean || 
             oNum === clean || 
             oId === ('oc-' + clean) || 
             oId === ('os-' + clean) ||
             clean === ('oc-' + oId) ||
             clean === ('os-' + oId) ||
             oNum.includes(clean);
    });
  }

  existsOrderNumber(orderNumber: string, excludeId?: string): boolean {
    if (!orderNumber) return false;
    const cleanNumber = orderNumber.trim().toUpperCase();
    return this.orders().some(o => 
      o.number.trim().toUpperCase() === cleanNumber && (!excludeId || o.id !== excludeId)
    );
  }

  addOrder(newOrder: Omit<OrderData, 'id' | 'progressPercent' | 'status' | 'timeline'>): OrderData {
    const id = `order-${Date.now()}`;
    const nowStr = new Date().toLocaleDateString('es-PE') + ' ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    
    const order: OrderData = {
      ...newOrder,
      id: id,
      progressPercent: 0,
      status: 'EN_PROCESO',
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: nowStr,
          title: `Orden Registrada en SEOSC (${newOrder.number})`,
          user: `Por: Operador (${newOrder.requestingArea.split('-')[0].trim()})`,
          type: 'info'
        }
      ]
    };

    this.orders.update(list => [order, ...list]);
    this.saveToStorage();
    return order;
  }

  addDeliverableToOrder(orderId: string, newDeliverable: DeliverableData): void {
    const nowStr = new Date().toLocaleDateString('es-PE') + ' ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    this.orders.update(list => {
      return list.map(o => {
        if (o.id === orderId || o.number === orderId) {
          const updatedDeliverables = [...o.deliverables, newDeliverable];
          const progress = calculateOrderProgress(updatedDeliverables, o.totalAmount);

          const newTimelineItem: TimelineEvent = {
            id: `t-${Date.now()}`,
            date: nowStr,
            title: `Entregable Creado: ${newDeliverable.name}`,
            user: `Por: Operador (${o.requestingArea.split('-')[0].trim()})`,
            type: 'info'
          };

          return {
            ...o,
            deliverables: updatedDeliverables,
            progressPercent: progress,
            timeline: [newTimelineItem, ...o.timeline]
          };
        }
        return o;
      });
    });

    this.saveToStorage();
  }

  fetchFromBackend(): void {
    this.http.get<any[]>('/api/orders').subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: OrderData[] = data.map(o => {
            const ordType: 'OS' | 'OC' = (o.type === 'OC' ? 'OC' : 'OS');
            const prefix = ordType.toLowerCase() + '-';
            const rawId = String(o.id);
            const safeId = rawId.startsWith('os-') || rawId.startsWith('oc-') ? rawId : (prefix + rawId);

            const localOrder = this.orders().find(lo =>
              lo.id.toLowerCase() === safeId.toLowerCase() ||
              (o.number && lo.number.toLowerCase() === o.number.toLowerCase())
            );

            const dels = (o.deliverables || []).map((d: any) => {
              const localDel = localOrder?.deliverables?.find(ld => ld.id === String(d.id) || ld.name === d.name);
              return {
                id: String(d.id),
                name: d.name || ('ENTREGABLE ' + (d.deliverableNumber || 1)),
                startDate: this.formatDateIso(d.startDate),
                daysOffset: d.daysOffset != null ? Number(d.daysOffset) : 30,
                dueDate: this.formatDateIso(d.dueDate),
                amountPercent: d.amountPercent != null ? Number(d.amountPercent) : 0,
                amount: d.amount != null ? Number(d.amount) : 0,
                status: (d.status || 'PENDIENTE') as DeliverableStatus,
                sigedCode: d.sigedCode || '',
                fechaAtencion: this.formatDateIso(d.fechaAtencion),
                observacion: d.observacion || '',
                esHistorico: Boolean(d.esHistorico),
                observationCount: 0,
                projectId: d.projectId ? String(d.projectId) : (localDel?.projectId || undefined)
              };
            });

            const totalAmt = Number(o.totalAmount || 0);
            const calculatedProgress = (o.progressPercent != null && Number(o.progressPercent) > 0)
              ? Number(o.progressPercent)
              : calculateOrderProgress(dels, totalAmt);

            return {
              id: safeId,
              number: o.number || '',
              type: ordType,
              ruc: o.ruc || '',
              provider: o.provider || '',
              contractorType: o.contractorType || 'LOCADOR',
              serviceDescription: o.serviceDescription || '',
              requestingArea: o.requestingArea || 'OTI',
              notificationDate: this.formatDateIso(o.notificationDate),
              totalAmount: totalAmt,
              progressPercent: calculatedProgress,
              status: (o.status === 'FINALIZADO' || o.status === 'DESESTIMADO') ? o.status : 'EN_PROCESO',
              isRecurrent: Boolean(o.isRecurrent),
              requiresExtraVb: Boolean(o.requiresExtraVb),
              computeRule: 'NEXT_DAY',
              deliverables: dels,
              timeline: [
                {
                  id: 't-init',
                  date: this.formatDateIso(o.notificationDate) + ' 09:00 AM',
                  title: 'Orden Registrada en el Sistema SEOSC (desde POI)',
                  user: 'Por: Sistema SIGA-POI',
                  type: 'info'
                }
              ],
              projectId: o.projectId ? String(o.projectId) : (localOrder?.projectId || undefined),

              bienes: (o.bienes || []).map((b: any) => ({
                idRq: b.idRq,
                tipoRq: b.tipoRq,
                nroRq: b.nroRq,
                itemRq: b.itemRq,
                detalleRq: b.detalleRq,
                importeRq: Number(b.importeRq || 0),
                estadoRq: b.estadoRq,
                itemPoi: b.itemPoi,
                codigoBien: b.codigoBien,
                descripcionBien: b.descripcionBien,
                cantidadTotal: b.cantidadTotal != null ? Number(b.cantidadTotal) : undefined,
                precioUnitario: b.precioUnitario != null ? Number(b.precioUnitario) : undefined
              }))
            };
          });
          this.orders.set(mapped);
          this.saveToStorage();
        }
      },
      error: (err) => console.warn('Could not fetch orders from backend, using local store', err)
    });
  }

  private formatDateIso(val: any): string {
    if (!val) return '';
    const str = String(val);
    const parts = str.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return str;
  }

  resetCache(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.fetchFromBackend();
  }
}
