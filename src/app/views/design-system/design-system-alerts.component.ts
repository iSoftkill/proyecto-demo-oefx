import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-design-system-alerts',
  standalone: true,
  imports: [CommonModule, OefaAlertComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📢 Alertas Institucionales en Bloque (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-alert&gt; con 5 variantes semánticas, contraste verificado y accesibilidad WCAG 2.2.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Sección 1: Estados Semánticos de Alerta -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Estados Semánticos de Alerta</h3>
          <span class="text-muted">Utilizan las paletas Primary, Success, Tertiary (Warning), Error y Neutral del OEFA Design System.</span>
        </div>
        <div class="card-body">
          <div class="alerts-stack">
            <div>
              <span class="state-tag">1. INFORMATIVA (INFO) — Azul Institucional</span>
              <oefa-alert
                type="info"
                title="Información Oficial de Trámite:"
                message="Las solicitudes registradas de 00:00 a 23:59 hrs se computan el mismo día hábil según Ley N° 27806."
              ></oefa-alert>
            </div>

            <div>
              <span class="state-tag">2. ÉXITO (SUCCESS) — Verde Conforme</span>
              <oefa-alert
                type="success"
                title="Operación Completada:"
                message="Su expediente ha sido registrado y derivado a la subdirección correspondiente con código EXP-2026-004."
              ></oefa-alert>
            </div>

            <div>
              <span class="state-tag">3. ADVERTENCIA (WARNING) — Ámbar Alerta</span>
              <oefa-alert
                type="warning"
                title="Advertencia de Plazo Contractual:"
                message="Atención: Quedan 2 días hábiles para el descargo de observaciones antes de archivar el trámite."
              ></oefa-alert>
            </div>

            <div>
              <span class="state-tag">4. ERROR / DESTRUCTIVO (ERROR) — Rojo Error</span>
              <oefa-alert
                type="error"
                title="Fallo en la Operación:"
                message="No se pudo verificar el número de documento con el servicio institucional RENIEC. Intente nuevamente."
              ></oefa-alert>
            </div>

            <div>
              <span class="state-tag">5. NEUTRAL (NEUTRAL) — Gris de Apoyo</span>
              <oefa-alert
                type="neutral"
                title="Aviso de Atención:"
                message="Para trámites presenciales puede acercarse a la Mesa de Partes en el horario de 08:30 a 16:30 hrs."
              ></oefa-alert>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección 2: Alertas Descartables y Sin Borde Izquierdo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Variantes Interactivas y Proyección de Contenido</h3>
          <span class="text-muted">Soporta botón de cierre accesible (dismissible) y contenido HTML proyectado.</span>
        </div>
        <div class="card-body">
          <div class="alerts-stack">
            <oefa-alert
              type="info"
              title="Alerta Descartable con Botón de Cierre:"
              message="Este aviso puede ser cerrado por el usuario pulsando la 'X' en la esquina superior derecha."
              [dismissible]="true"
            ></oefa-alert>

            <oefa-alert type="warning" [bordered]="false" title="Alerta sin borde de acento izquierdo (bordered=false):">
              <p style="margin: 4px 0 0 0;">
                Permite proyectar contenido personalizado con enlaces: 
                <a href="javascript:void(0)" style="color: inherit; font-weight: 700; text-decoration: underline;">
                  Consultar términos y condiciones aquí
                </a>.
              </p>
            </oefa-alert>
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
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .alerts-stack { display: flex; flex-direction: column; gap: 18px; }
    .state-tag { display: block; font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
  `]
})
export class DesignSystemAlertsComponent {}
