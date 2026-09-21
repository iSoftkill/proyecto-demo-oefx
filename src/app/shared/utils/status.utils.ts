/**
 * Utilidad compartida para convertir un estado de orden/entregable
 * a su clase CSS de badge correspondiente bajo la norma WCAG 2.2 AA.
 *
 * 6 ESTADOS UNIVERSALES OEFA (Tokens CSS WCAG 2.2 AA):
 * - 'error'    -> var(--oefa-error-container) / var(--oefa-error-on-container)
 * - 'info'     -> var(--oefa-primary-container) / var(--oefa-primary-on-container)
 * - 'exito'    -> var(--oefa-success-container) / var(--oefa-success-on-container)
 * - 'danger'   -> var(--oefa-tertiary-container) / var(--oefa-tertiary-on-container)
 * - 'neutral'  -> var(--oefa-surface-muted) / var(--oefa-text-primary)
 * - 'alterno'  -> var(--oefa-secondary-container) / var(--oefa-secondary-on-container)
 */
export type UniversalBadgeVariant =
  | 'error'
  | 'info'
  | 'exito'
  | 'danger'
  | 'neutral'
  | 'alterno';

export type StatusBadgeClass =
  | UniversalBadgeVariant
  | 'registered'
  | 'conforme'
  | 'observado'
  | 'desestimado'
  | 'prevision'
  | 'success'
  | 'warning'
  | 'gray'
  | 'secondary';

export function getStatusBadgeClass(status: string): StatusBadgeClass {
  const norm = status?.trim().toUpperCase() ?? '';

  switch (norm) {
    // 1. Estados de Error (Rojo)
    case 'ERROR':
    case 'DESESTIMADO':
    case 'RECHAZADO':
    case 'ANULADO':
    case 'VENCIDO':
      return 'error';

    // 2. Estados de Éxito (Verde)
    case 'EXITO':
    case 'SUCCESS':
    case 'CONFORME':
    case 'FINALIZADO':
    case 'ATENDIDO':
    case 'APROBADO':
    case 'PAGADO':
      return 'exito';

    // 3. Estados de Danger / Advertencia (Naranja / Ámbar)
    case 'DANGER':
    case 'WARNING':
    case 'OBSERVADO':
    case 'ALERTA':
    case 'ATENDIDO_OBSERVADO':
    case 'NOTIFICADO':
      return 'danger';

    // 4. Estados Alternos (Turquesa secundario)
    case 'ALTERNO':
    case 'PREVISION':
    case 'EN_PREVISION':
      return 'alterno';

    // 5. Estados Neutrales (Gris)
    case 'NEUTRAL':
    case 'BORRADOR':
    case 'DRAFT':
    case 'INACTIVO':
    case 'ARCHIVADO':
      return 'neutral';

    // 6. Estados de Info / En Curso (Azul institucional)
    case 'INFO':
    case 'EN_PROCESO':
    case 'EN_REVISION':
    case 'PENDIENTE':
    case 'PENDIENTE_FIRMA':
    case 'REGISTRADO':
    default:
      return 'info';
  }
}

/**
 * Devuelve el label display de un estado, formateado para UI.
 * Si no hay mapeo, retorna el valor original.
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    EN_PROCESO: 'En Proceso',
    EN_REVISION: 'En Revisión',
    FINALIZADO: 'Finalizado',
    ATENDIDO: 'Atendido',
    PENDIENTE_FIRMA: 'Pdte. Firma',
    OBSERVADO: 'Observado',
    ATENDIDO_OBSERVADO: 'Obs. Atendido',
    NOTIFICADO: 'Notificado',
    DESESTIMADO: 'Desestimado',
    PREVISION: 'Previsión',
    PENDIENTE: 'Pendiente',
  };
  return labels[status] ?? status;
}
