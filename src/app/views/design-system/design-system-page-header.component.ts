import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaSegmentedSwitchComponent, SegmentedOption } from '../../shared/components/segmented-switch/segmented-switch.component';

@Component({
  selector: 'app-design-system-page-header',
  standalone: true,
  imports: [CommonModule, OefaPageHeaderComponent, OefaButtonComponent, OefaSegmentedSwitchComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🧭 Encabezado de Página Institucional (Organismos)</h2>
          <p class="subtitle">Componente &lt;oefa-page-header&gt; unificado para títulos de módulo, navegación breadcrumb, badges de estado, botón de retorno y barra de acciones.</p>
        </div>
        <span class="ds-badge">ORGANISMO</span>
      </div>

      <!-- Tarjeta 1: Demostración Interactiva -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Ejemplos de Implementación de Encabezado</h3>
          <span class="text-muted">Estructura canónica de cabecera de pantalla adaptativa con soporte Dark Mode.</span>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; gap: 24px;">
          
          <!-- Caso A: Cabecera Estándar de Bandeja con Acciones y Switch -->
          <div class="header-preview-box">
            <span class="preview-tag">Caso A: Bandeja de Módulo con Switch y Acciones</span>
            <oefa-page-header
              title="Bandeja de Órdenes de Servicio"
              subtitle="Control presupuestal y seguimiento de entregables 2026"
              badgeText="Vigente"
              badgeStatus="FINALIZADO"
              [breadcrumbs]="[
                { label: 'Inicio', url: '/design-system' },
                { label: 'Contrataciones' },
                { label: 'Órdenes de Servicio' }
              ]">
              <div actions style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <oefa-segmented-switch
                  [options]="viewOptions"
                  [selected]="currentView()"
                  (selectedChange)="currentView.set($event)"
                  ariaLabel="Modo de vista" />
                <oefa-button variant="excel" size="sm">📊 Exportar Excel</oefa-button>
                <oefa-button variant="primary" size="sm">+ Nueva Orden OS</oefa-button>
              </div>
            </oefa-page-header>
          </div>

          <!-- Caso B: Ficha de Detalle con Botón de Retroceso -->
          <div class="header-preview-box">
            <span class="preview-tag">Caso B: Ficha de Detalle con Botón de Retroceso y Estado Crítico</span>
            <oefa-page-header
              title="Orden de Servicio OS-00019-2026"
              subtitle="Proveedor: FERNANDEZ JACOBO ISABEL MERCEDES — RUC: 10452319801"
              badgeText="Observado"
              badgeStatus="OBSERVADO"
              [showBack]="true"
              (back)="onBack()"
              [breadcrumbs]="[
                { label: 'Órdenes', url: '/design-system/page-header' },
                { label: 'OS-00019-2026' }
              ]">
              <div actions style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <oefa-button variant="secondary" size="sm">Historial SIGED</oefa-button>
                <oefa-button variant="primary" size="sm">Registrar Evento</oefa-button>
              </div>
            </oefa-page-header>
            @if (backNotice()) {
              <div style="margin-top: 10px; font-size: 0.8125rem; color: var(--oefa-primary-root); font-weight: 600;">
                {{ backNotice() }}
              </div>
            }
          </div>

        </div>
      </div>

      <!-- Tarjeta 2: Especificación Técnica y Tokens -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Especificación Técnica y Tokens del Encabezado</h3>
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
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[title]</td>
                    <td style="padding: 10px;"><code>string</code></td>
                    <td style="padding: 10px;"><code>''</code></td>
                    <td style="padding: 10px;">Título principal de la vista renderizado en un elemento <code>&lt;h1&gt;</code> accesible.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[subtitle]</td>
                    <td style="padding: 10px;"><code>string?</code></td>
                    <td style="padding: 10px;"><code>undefined</code></td>
                    <td style="padding: 10px;">Metadatos contextuales o descripción subordinada al título.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[showBack]</td>
                    <td style="padding: 10px;"><code>boolean</code></td>
                    <td style="padding: 10px;"><code>false</code></td>
                    <td style="padding: 10px;">Activa el botón accesible de retorno rápido hacia la pantalla predecesora.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">[breadcrumbs]</td>
                    <td style="padding: 10px;"><code>BreadcrumbItem[]?</code></td>
                    <td style="padding: 10px;"><code>undefined</code></td>
                    <td style="padding: 10px;">Ruta jerárquica con separadores automáticos y <code>aria-current="page"</code> en el último nodo.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--oefa-border-color);">
                    <td style="padding: 10px; font-family: var(--oefa-font-mono);">&lt;ng-content select="[actions]"&gt;</td>
                    <td style="padding: 10px;">Proyección HTML</td>
                    <td style="padding: 10px;">—</td>
                    <td style="padding: 10px;">Barra de acciones adaptativa (se repliega a ancho completo en móviles).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Código de Ejemplo -->
            <div style="background: var(--oefa-surface-subtle); padding: 14px 18px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color);">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--oefa-text-secondary); text-transform: uppercase;">Ejemplo de Implementación HTML</span>
              <pre style="margin: 8px 0 0; font-family: var(--oefa-font-mono); font-size: 0.8125rem; color: var(--oefa-text-primary); overflow-x: auto;"><code>&lt;oefa-page-header
  title="Bandeja de Entregables"
  subtitle="Supervisión de plazos y conformidades"
  badgeText="En Proceso"
  badgeStatus="EN_PROCESO"
  [showBack]="true"
  (back)="volver()"
  [breadcrumbs]="[
    {{ '{' }} label: 'Inicio', url: '/' {{ '}' }},
    {{ '{' }} label: 'Entregables' {{ '}' }}
  ]"&gt;
  &lt;div actions&gt;
    &lt;oefa-button variant="secondary" size="sm"&gt;Exportar&lt;/oefa-button&gt;
    &lt;oefa-button variant="primary" size="sm"&gt;+ Nuevo&lt;/oefa-button&gt;
  &lt;/div&gt;
&lt;/oefa-page-header&gt;</code></pre>
            </div>
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
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-lg) var(--oefa-radius-lg) 0 0; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .header-preview-box {
      border: 1px dashed var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      padding: 20px;
      background: var(--oefa-surface-card);
      position: relative;
    }

    .preview-tag {
      display: inline-block;
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--oefa-text-secondary);
      margin-bottom: 12px;
      letter-spacing: 0.04em;
    }
  `]
})
export class DesignSystemPageHeaderComponent {
  currentView = signal<string>('cards');
  backNotice = signal<string>('');

  viewOptions: SegmentedOption[] = [
    { value: 'cards', label: 'Cards' },
    { value: 'table', label: 'Tabla' },
    { value: 'bento', label: 'Bento' }
  ];

  onBack(): void {
    this.backNotice.set('✓ Evento (back) capturado con éxito. Redirigiendo a vista previa...');
    setTimeout(() => this.backNotice.set(''), 3000);
  }
}
