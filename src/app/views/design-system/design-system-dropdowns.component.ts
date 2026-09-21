import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaDropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-design-system-dropdowns',
  standalone: true,
  imports: [CommonModule, OefaDropdownComponent, OefaButtonComponent, OefaIconButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📑 Menús Desplegables y Contextuales (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-dropdown&gt; para acciones agrupadas, menús de fila y botones con menú desplegable.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Botón con Dropdown Principal -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Menú Desplegable con Botón Primario</h3>
          <span class="text-muted">Cierra automáticamente al hacer clic afuera (click outside) o al seleccionar una opción.</span>
        </div>
        <div class="card-body">
          <div class="dropdown-demo-row">
            <oefa-dropdown [(isOpen)]="isCreateOpen" align="left">
              <div trigger>
                <oefa-button variant="primary">
                  + Nueva Orden ▾
                </oefa-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">📄 Orden de Servicio (OS)</button>
                <button type="button" class="dropdown-item">📦 Orden de Compra (OC)</button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item">📥 Importar desde POI Excel</button>
              </div>
            </oefa-dropdown>

            <oefa-dropdown [(isOpen)]="isActionsOpen" align="right">
              <div trigger>
                <oefa-button variant="secondary">
                  Acciones Masivas ▾
                </oefa-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">📊 Exportar Seleccionados (.xlsx)</button>
                <button type="button" class="dropdown-item">🖨️ Imprimir Resumen</button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item text-danger">🗑️ Eliminar Seleccionados</button>
              </div>
            </oefa-dropdown>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Menú Kebab de Fila (3 Puntos) -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Menú Kebab en Celdas de Tabla (&lt;oefa-icon-button variant="kebab"&gt;)</h3>
          <span class="text-muted">Ideal para filas de datos y espacios reducidos en móvil.</span>
        </div>
        <div class="card-body">
          <div class="kebab-demo-row">
            <span class="row-label">Fila: <strong>OS-00019-2026</strong> — Locador: Isabel Fernandez</span>
            <oefa-dropdown [(isOpen)]="isKebabOpen" align="right">
              <div trigger>
                <oefa-icon-button variant="kebab" ariaLabel="Opciones de fila"></oefa-icon-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">🔍 Ver Ficha Completa</button>
                <button type="button" class="dropdown-item">✏️ Editar Entregables</button>
                <button type="button" class="dropdown-item">⚡ Registrar Conformidad</button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item text-danger">⚠️ Desestimar Orden</button>
              </div>
            </oefa-dropdown>
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

    .dropdown-demo-row { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
    .kebab-demo-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color); }
    .row-label { font-size: 0.875rem; color: var(--oefa-text-primary); }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 14px;
      border: none;
      background: transparent;
      font-size: 0.875rem;
      color: var(--oefa-text-primary);
      cursor: pointer;
      text-align: left;
      font-family: inherit;
    }
    .dropdown-item:hover {
      background-color: var(--oefa-surface-subtle);
      color: var(--oefa-primary-root);
    }
    .dropdown-item.text-danger {
      color: var(--oefa-error-root);
    }
    .dropdown-item.text-danger:hover {
      background-color: var(--oefa-error-container);
      color: var(--oefa-error-root);
    }
    .dropdown-divider {
      height: 1px;
      background-color: var(--oefa-border-color);
      margin: 4px 0;
    }
  `]
})
export class DesignSystemDropdownsComponent {
  isCreateOpen = false;
  isActionsOpen = false;
  isKebabOpen = false;
}
