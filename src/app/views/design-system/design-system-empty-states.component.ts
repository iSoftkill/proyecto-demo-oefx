import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaEmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-design-system-empty-states',
  standalone: true,
  imports: [CommonModule, OefaEmptyStateComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📭 Estados Vacíos y Sin Resultados (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-empty-state&gt; para retroalimentación amigable cuando no hay registros, filtros sin coincidencias o carpetas vacías.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Sin Resultados de Búsqueda -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Búsqueda sin Coincidencias (Icono 'search')</h3>
          <span class="text-muted">Con botón de acción incorporado para limpiar filtros.</span>
        </div>
        <div class="card-body">
          <div class="empty-state-preview">
            <oefa-empty-state
              icon="search"
              title="No se encontraron órdenes"
              description="No hay resultados que coincidan con el término de búsqueda ingresado ni con los filtros seleccionados."
              actionText="Limpiar Filtros">
            </oefa-empty-state>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Formato Compacto en Bandejas / Tablas -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Modo Compacto (&lt;oefa-empty-state [compact]="true"&gt;)</h3>
          <span class="text-muted">Ajustado para insertarse dentro de filas vacías <code>&lt;td colspan="..."&gt;</code> de tablas de datos.</span>
        </div>
        <div class="card-body">
          <div class="empty-state-preview">
            <oefa-empty-state
              icon="inbox"
              title="Bandeja de entregables vacía"
              description="Esta orden aún no cuenta con entregables generados o programados."
              [compact]="true">
            </oefa-empty-state>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Variantes de Icono Disponibles -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Iconos Temáticos Incorporados</h3>
          <span class="text-muted">Iconos vectoriales limpios sin dependencias externas: <code>icon="search | inbox | folder | alert"</code>.</span>
        </div>
        <div class="card-body">
          <div class="icons-grid">
            <div class="icon-item">
              <oefa-empty-state icon="search" title="search" [compact]="true"></oefa-empty-state>
            </div>
            <div class="icon-item">
              <oefa-empty-state icon="inbox" title="inbox" [compact]="true"></oefa-empty-state>
            </div>
            <div class="icon-item">
              <oefa-empty-state icon="folder" title="folder" [compact]="true"></oefa-empty-state>
            </div>
            <div class="icon-item">
              <oefa-empty-state icon="alert" title="alert" [compact]="true"></oefa-empty-state>
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

    .ds-card { background: white; border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); }
    .card-header { padding: 18px 24px; border-bottom: 1px solid var(--oefa-border-color); display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-primary-root); }
    .card-body { padding: 24px; }

    .empty-state-preview { border: 1px dashed var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: #ffffff; }

    .icons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .icon-item { border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-md); background: var(--oefa-surface-subtle); }
  `]
})
export class DesignSystemEmptyStatesComponent {}
