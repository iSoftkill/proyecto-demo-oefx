import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaSelectionCardComponent } from '../../shared/components/selection-card/selection-card.component';

@Component({
  selector: 'app-design-system-selection-card',
  standalone: true,
  imports: [CommonModule, OefaSelectionCardComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🃏 Tarjetas de Selección Interactivas (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-selection-card&gt; para tarifas, modalidades de entrega y decisiones guiadas (WCAG 2.2 SC 2.5.8).</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Selección Única (Radio) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Modo Selección Única (Radio Cards)</h3>
          <span class="text-muted">Target size mínimo de 52px, badges de tarifario semánticos y control por teclado (Space / Enter).</span>
        </div>
        <div class="card-body">
          <div class="selection-grid">
            <oefa-selection-card
              name="delivery"
              title="Correo Electrónico (Digital)"
              description="Envío digital directo al correo consignado en la solicitud sin costo."
              priceBadge="Gratuito"
              badgeVariant="success"
              [selected]="deliveryMode === 'email'"
              (selectionChange)="deliveryMode = 'email'"
            ></oefa-selection-card>

            <oefa-selection-card
              name="delivery"
              title="Copia Simple (A4)"
              description="Impresión en papel bond para recojo presencial en mesa de partes."
              priceBadge="S/. 0.08 / pág."
              badgeVariant="primary"
              [selected]="deliveryMode === 'copy'"
              (selectionChange)="deliveryMode = 'copy'"
            ></oefa-selection-card>

            <oefa-selection-card
              name="delivery"
              title="Soporte Magnético (CD / DVD)"
              description="Grabación digital en disco óptico para entrega presencial."
              priceBadge="S/. 1.00 / unidad"
              badgeVariant="tertiary"
              [selected]="deliveryMode === 'cd'"
              (selectionChange)="deliveryMode = 'cd'"
            ></oefa-selection-card>

            <oefa-selection-card
              name="delivery"
              title="Opción Inactiva (Disabled)"
              description="Opción temporalmente no disponible según inventario institucional."
              priceBadge="No disponible"
              badgeVariant="neutral"
              [disabled]="true"
              [selected]="false"
            ></oefa-selection-card>
          </div>

          <div class="status-summary">
            Opción activa: <strong>{{ deliveryMode }}</strong>
          </div>
        </div>
      </div>

      <!-- Modo Selección Múltiple (Checkbox) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Modo Selección Múltiple (Checkbox Cards)</h3>
          <span class="text-muted">Configurado con type="checkbox" para opciones combinables de forma independiente.</span>
        </div>
        <div class="card-body">
          <div class="selection-grid">
            <oefa-selection-card
              type="checkbox"
              title="Notificación por Correo Electrónico"
              description="Recibir alertas de avance en la casilla personal."
              priceBadge="Habilitado"
              badgeVariant="primary"
              [selected]="multiOptions.email"
              (selectionChange)="multiOptions.email = $event.selected"
            ></oefa-selection-card>

            <oefa-selection-card
              type="checkbox"
              title="Mensajería SMS de Alerta"
              description="Avisos prioritarios de vencimiento al teléfono móvil."
              priceBadge="Opcional"
              badgeVariant="neutral"
              [selected]="multiOptions.sms"
              (selectionChange)="multiOptions.sms = $event.selected"
            ></oefa-selection-card>
          </div>
        </div>
      </div>

      <!-- Sección 3: Código de Implementación -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Código de Implementación</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/selection-card/</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;oefa-selection-card
  name="delivery"
  type="radio"
  title="Correo Electrónico (Digital)"
  description="Envío digital directo al correo consignado..."
  priceBadge="Gratuito"
  badgeVariant="success"
  [selected]="deliveryMode === 'email'"
  (selectionChange)="deliveryMode = 'email'"
/&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); overflow: hidden; }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .selection-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .status-summary { margin-top: 16px; font-size: 0.875rem; font-family: var(--oefa-font-mono); color: var(--oefa-text-secondary); background: var(--oefa-surface-subtle); border: 1px solid var(--oefa-border-color); padding: 10px 14px; border-radius: var(--oefa-radius-md); }
    .code-block {
      background: var(--oefa-surface-subtle);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 16px;
      font-size: 0.8125rem;
      color: var(--oefa-text-primary);
      margin: 0;
      overflow-x: auto;
      font-family: var(--oefa-font-mono);
      line-height: 1.5;
    }
  `]
})
export class DesignSystemSelectionCardComponent {
  deliveryMode = 'email';
  multiOptions = {
    email: true,
    sms: false
  };
}
