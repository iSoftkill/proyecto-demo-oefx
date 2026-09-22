import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaDrawerComponent, DrawerPosition, DrawerSize } from '../../shared/components/drawer/drawer.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-design-system-drawers',
  standalone: true,
  imports: [CommonModule, OefaDrawerComponent, OefaButtonComponent, OefaStatusBadgeComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📑 Paneles Laterales y Side Canvas (Organismos)</h2>
          <p class="subtitle">Componente &lt;oefa-drawer&gt; para fichas de detalle, edición in-situ y paneles auxiliares deslizantes sin salir del contexto de la pantalla.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tarjeta 1: Demostración Interactiva -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Demostración Interactiva de Drawer</h3>
          <span class="text-muted">Desliza desde los bordes del viewport con backdrop blur, elevación tonal y atajo de teclado Escape.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <oefa-button variant="primary" (clicked)="openDrawer('right', 'md', 'detalle')">
              📑 Abrir Detalle de Expediente (Derecha - MD)
            </oefa-button>

            <oefa-button variant="secondary" (clicked)="openDrawer('left', 'sm', 'navegacion')">
              👈 Abrir Panel Auxiliar (Izquierda - SM)
            </oefa-button>

            <oefa-button variant="secondary" (clicked)="openDrawer('bottom', 'md', 'resumen')">
              📱 Abrir Bottom Sheet (Abajo)
            </oefa-button>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Especificación y Tokens de Diseño -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación Técnica y Tokens del Drawer</h3>
          <span class="text-muted">Propiedades, directrices WCAG 2.2 AA y variables de diseño estandarizadas.</span>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--oefa-border-color); text-align: left;">
                    <th style="padding: 10px;">Propiedad / Slot</th>
                    <th style="padding: 10px;">Tipo / Valores</th>
                    <th style="padding: 10px;">Default</th>
                    <th style="padding: 10px;">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[isOpen]</td>
                    <td style="padding: 10px;"><code>boolean</code></td>
                    <td style="padding: 10px;"><code>false</code></td>
                    <td style="padding: 10px;">Controla la visibilidad y activa el scroll locking en <code>document.body</code>.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[position]</td>
                    <td style="padding: 10px;"><code>'right' | 'left' | 'bottom'</code></td>
                    <td style="padding: 10px;"><code>'right'</code></td>
                    <td style="padding: 10px;">Dirección de anclaje y animación de entrada M3.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[size]</td>
                    <td style="padding: 10px;"><code>'sm' | 'md' | 'lg' | 'xl' | 'full'</code></td>
                    <td style="padding: 10px;"><code>'md'</code></td>
                    <td style="padding: 10px;">Ancho máximo: sm (380px), md (480px), lg (640px), xl (800px), full (100vw).</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[badge]</td>
                    <td style="padding: 10px;"><code>string</code></td>
                    <td style="padding: 10px;"><code>''</code></td>
                    <td style="padding: 10px;">Insignia superior destacada en la cabecera.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">&lt;ng-content select="[footer]"&gt;</td>
                    <td style="padding: 10px;">Proyección HTML</td>
                    <td style="padding: 10px;">—</td>
                    <td style="padding: 10px;">Barra inferior persistente con fondo sutil para botones de confirmación.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Código de Ejemplo -->
            <div style="background: var(--oefa-surface-subtle); padding: 14px 18px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-secondary); text-transform: uppercase;">Ejemplo de Implementación HTML</span>
              <pre style="margin: 8px 0 0; font-family: var(--oefa-font-mono); font-size: 0.8125rem; color: var(--oefa-text-primary); overflow-x: auto;"><code>&lt;oefa-drawer
  [isOpen]="isDrawerOpen()"
  title="Detalle del Entregable N° 1"
  subtitle="Informe Técnico de Diagnóstico Situacional"
  badge="CONFORME"
  size="md"
  position="right"
  (closed)="isDrawerOpen.set(false)"&gt;

  &lt;!-- Cuerpo del Drawer con scroll interno --&gt;
  &lt;div class="drawer-content-box"&gt;
    &lt;p&gt;Contenido detallado, bitácora y trazabilidad SIGED...&lt;/p&gt;
  &lt;/div&gt;

  &lt;!-- Pie fijo con botones de acción --&gt;
  &lt;div footer style="display: flex; gap: 8px; justify-content: flex-end;"&gt;
    &lt;oefa-button variant="secondary" (clicked)="isDrawerOpen.set(false)"&gt;Cerrar&lt;/oefa-button&gt;
    &lt;oefa-button variant="primary" (clicked)="aprobarEntregable()"&gt;Confirmar&lt;/oefa-button&gt;
  &lt;/div&gt;
&lt;/oefa-drawer&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer de Ejemplo Dinámico -->
      <oefa-drawer
        [isOpen]="isDrawerOpen()"
        [title]="drawerTitle()"
        [subtitle]="drawerSubtitle()"
        [badge]="drawerBadge()"
        [position]="drawerPosition()"
        [size]="drawerSize()"
        (closed)="closeDrawer()">

        <!-- Cuerpo Dinámico -->
        @if (drawerMode() === 'detalle') {
          <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.875rem;">
            <div style="padding: 12px 16px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
              <span style="font-size: 0.75rem; color: var(--oefa-text-secondary); text-transform: uppercase; font-weight: 700;">Orden de Servicio Vinculada</span>
              <div style="font-family: var(--oefa-font-mono); font-weight: 700; color: var(--oefa-primary-root); font-size: 1.125rem; margin-top: 2px;">OS-00019-2026-OEFA</div>
            </div>

            <div>
              <h4 style="margin: 0 0 8px; font-size: 0.875rem; color: var(--oefa-text-primary);">Estado y Plazos:</h4>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <oefa-status-badge status="FINALIZADO" label="Conforme para Pago" [dot]="true"></oefa-status-badge>
              </div>
              <p style="margin: 0; color: var(--oefa-text-secondary);">Plazo de ejecución: <strong>20 Días Calendario</strong></p>
              <p style="margin: 4px 0 0; color: var(--oefa-text-secondary);">Fecha de Vencimiento: <strong>27/01/2026</strong></p>
            </div>

            <div>
              <h4 style="margin: 0 0 8px; font-size: 0.875rem; color: var(--oefa-text-primary);">Trazabilidad SIGED:</h4>
              <div style="padding: 10px 14px; background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-sm); font-family: var(--oefa-font-mono); font-size: 0.8125rem;">
                Expediente: 2026-E01-013000
              </div>
            </div>

            <div style="padding: 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-sm); border-left: 3px solid var(--oefa-primary-root);">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--oefa-primary-root);">OBSERVACIONES DEL ANALISTA</span>
              <p style="margin: 4px 0 0; font-size: 0.8125rem; color: var(--oefa-text-secondary);">
                El entregable cumple con los lineamientos técnicos del término de referencia institucional. Procede la tramitación de la conformidad.
              </p>
            </div>
          </div>
        } @else if (drawerMode() === 'navegacion') {
          <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.875rem;">
            <p style="margin: 0; color: var(--oefa-text-secondary);">Panel auxiliar acoplado al margen izquierdo (ideal para menús secundarios y navegación de módulos).</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="padding: 10px 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-sm); border: 1px solid var(--oefa-border-color); cursor: pointer;">
                📁 Registro de Entregables
              </div>
              <div style="padding: 10px 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-sm); border: 1px solid var(--oefa-border-color); cursor: pointer;">
                📊 Auditoría y Métricas
              </div>
              <div style="padding: 10px 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-sm); border: 1px solid var(--oefa-border-color); cursor: pointer;">
                ⚙️ Configuración del Módulo
              </div>
            </div>
          </div>
        } @else {
          <div style="display: flex; flex-direction: column; gap: 14px; font-size: 0.875rem;">
            <p style="margin: 0; color: var(--oefa-text-secondary);">Modal deslizable inferior (Bottom Sheet) con esquinas redondeadas superiores, óptimo para interacciones táctiles en pantallas móviles.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
              <div style="padding: 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
                <span style="font-size: 0.75rem; color: var(--oefa-text-secondary);">Monto Facturado</span>
                <div style="font-weight: 700; font-size: 1.125rem; color: var(--oefa-primary-root);">S/ 14,500.00</div>
              </div>
              <div style="padding: 12px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
                <span style="font-size: 0.75rem; color: var(--oefa-text-secondary);">Entregables Conformes</span>
                <div style="font-weight: 700; font-size: 1.125rem; color: var(--oefa-success-ui-safe);">2 de 3</div>
              </div>
            </div>
          </div>
        }

        <!-- Footer Proyectado -->
        <div footer style="display: flex; gap: 8px; justify-content: flex-end; width: 100%;">
          <oefa-button variant="secondary" (clicked)="closeDrawer()">Cerrar</oefa-button>
          @if (drawerMode() === 'detalle') {
            <oefa-button variant="primary" (clicked)="closeDrawer()">Descargar Cargo PDF</oefa-button>
          } @else if (drawerMode() === 'navegacion') {
            <oefa-button variant="primary" (clicked)="closeDrawer()">Acceder</oefa-button>
          } @else {
            <oefa-button variant="primary" (clicked)="closeDrawer()">Entendido</oefa-button>
          }
        </div>
      </oefa-drawer>
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
    .card-body { padding: 24px; }
  `]
})
export class DesignSystemDrawersComponent {
  isDrawerOpen = signal<boolean>(false);
  drawerPosition = signal<DrawerPosition>('right');
  drawerSize = signal<DrawerSize>('md');
  drawerMode = signal<'detalle' | 'navegacion' | 'resumen'>('detalle');
  drawerTitle = signal<string>('Detalle del Entregable N° 1');
  drawerSubtitle = signal<string>('Informe Técnico de Diagnóstico Situacional');
  drawerBadge = signal<string>('CONFORME');

  openDrawer(position: DrawerPosition, size: DrawerSize, mode: 'detalle' | 'navegacion' | 'resumen'): void {
    this.drawerPosition.set(position);
    this.drawerSize.set(size);
    this.drawerMode.set(mode);

    if (mode === 'detalle') {
      this.drawerTitle.set('Detalle del Entregable N° 1');
      this.drawerSubtitle.set('Informe Técnico de Diagnóstico Situacional');
      this.drawerBadge.set('CONFORME');
    } else if (mode === 'navegacion') {
      this.drawerTitle.set('Navegación Auxiliar');
      this.drawerSubtitle.set('Módulos de Seguimiento OSOC');
      this.drawerBadge.set('');
    } else {
      this.drawerTitle.set('Resumen Financiero Consolidado');
      this.drawerSubtitle.set('Liquidación Preliminar de Contrato');
      this.drawerBadge.set('2026');
    }

    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }
}
