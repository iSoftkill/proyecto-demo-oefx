import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OefaDropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconButtonComponent } from '../../shared/components/icon-button/icon-button.component';

interface FilterOption {
  id: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-design-system-dropdowns',
  standalone: true,
  imports: [CommonModule, FormsModule, OefaDropdownComponent, OefaButtonComponent, OefaIconButtonComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📑 Menús Desplegables y Contextuales (Moléculas)</h2>
          <p class="subtitle">Componente &lt;oefa-dropdown&gt; para acciones agrupadas, menús con íconos, listas con buscador y selección múltiple con checkbox.</p>
        </div>
        <span class="ds-badge">MOLÉCULA</span>
      </div>

      <!-- Tarjeta 1: Botones con Íconos y Acciones Agrupadas -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Menú con Íconos Vectoriales y Opciones Simples</h3>
          <span class="text-muted">Cierra automáticamente al hacer clic en una acción (click outside o select). Compatible con íconos SVG y texto plano.</span>
        </div>
        <div class="card-body">
          <div class="dropdown-demo-row">
            <!-- Con Íconos -->
            <oefa-dropdown [(isOpen)]="isCreateOpen" align="left">
              <div trigger>
                <oefa-button variant="primary">
                  + Nueva Orden ▾
                </oefa-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Orden de Servicio (OS)</span>
                </button>
                <button type="button" class="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Orden de Compra (OC)</span>
                </button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Importar desde POI Excel</span>
                </button>
              </div>
            </oefa-dropdown>

            <!-- Sin Íconos / Acciones Masivas -->
            <oefa-dropdown [(isOpen)]="isActionsOpen" align="right">
              <div trigger>
                <oefa-button variant="secondary">
                  Acciones Masivas ▾
                </oefa-button>
              </div>
              <div menu>
                <button type="button" class="dropdown-item">📊 Exportar Seleccionados (.xlsx)</button>
                <button type="button" class="dropdown-item">🖨️ Imprimir Resumen de Lote</button>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item text-danger">🗑️ Eliminar Seleccionados</button>
              </div>
            </oefa-dropdown>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Dropdown con Buscador y Checkboxes -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Menú con Buscador y Selección Múltiple (Checkboxes)</h3>
          <span class="text-muted">Utiliza <code>[closeOnItemClick]="false"</code> para mantener abierto el popover mientras se filtran o seleccionan múltiples opciones.</span>
        </div>
        <div class="card-body">
          <div class="dropdown-demo-row">
            <oefa-dropdown [(isOpen)]="isFilterOpen" [closeOnItemClick]="false" align="left">
              <div trigger>
                <oefa-button variant="secondary">
                  🔍 Áreas Funcionales ({{ selectedAreasCount }}) ▾
                </oefa-button>
              </div>
              <div menu style="width: 260px;">
                <!-- Buscador Integrado -->
                <div class="dropdown-search">
                  <input
                    type="text"
                    class="dropdown-search-input"
                    placeholder="Buscar área..."
                    [(ngModel)]="searchAreaTerm" />
                </div>

                <div class="dropdown-divider"></div>

                <!-- Lista de Checkboxes -->
                <div class="dropdown-checkbox-list">
                  @for (area of filteredAreas; track area.id) {
                    <label class="dropdown-item-checkbox">
                      <input
                        type="checkbox"
                        [(ngModel)]="area.selected" />
                      <span>{{ area.label }}</span>
                    </label>
                  }
                  @if (filteredAreas.length === 0) {
                    <div style="padding: 8px 12px; font-size: 0.75rem; color: var(--oefa-text-muted); text-align: center;">
                      No se encontraron áreas
                    </div>
                  }
                </div>
              </div>
            </oefa-dropdown>

            <span class="status-pill">
              Seleccionadas: <strong>{{ selectedAreasLabels || 'Ninguna' }}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Menú Kebab en Celdas de Tabla -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Menú Kebab en Celdas de Tabla (&lt;oefa-icon-button variant="kebab"&gt;)</h3>
          <span class="text-muted">Ideal para filas de datos y espacios reducidos en móvil con opciones contextuales.</span>
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

      <!-- Tarjeta 4: Especificación de Uso y Código -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>4. Especificación de Uso</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/dropdown</code> con soporte de slots <code>[trigger]</code> y <code>[menu]</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;!-- 1. Con o sin Íconos --&gt;
&lt;oefa-dropdown [(isOpen)]="isMenuOpen" align="left"&gt;
  &lt;div trigger&gt;
    &lt;oefa-button variant="primary"&gt;Acciones ▾&lt;/oefa-button&gt;
  &lt;/div&gt;
  &lt;div menu&gt;
    &lt;button type="button" class="dropdown-item"&gt;
      &lt;svg width="16" height="16" ...&gt;...&lt;/svg&gt;
      &lt;span&gt;Opción con Ícono&lt;/span&gt;
    &lt;/button&gt;
    &lt;button type="button" class="dropdown-item"&gt;Opción Simple&lt;/button&gt;
    &lt;div class="dropdown-divider"&gt;&lt;/div&gt;
    &lt;button type="button" class="dropdown-item text-danger"&gt;Eliminar&lt;/button&gt;
  &lt;/div&gt;
&lt;/oefa-dropdown&gt;

&lt;!-- 2. Con Buscador y Checkboxes (closeOnItemClick = false) --&gt;
&lt;oefa-dropdown [(isOpen)]="isFilterOpen" [closeOnItemClick]="false" align="left"&gt;
  &lt;div trigger&gt;
    &lt;oefa-button variant="secondary"&gt;Filtrar (total) ▾&lt;/oefa-button&gt;
  &lt;/div&gt;
  &lt;div menu style="width: 260px;"&gt;
    &lt;div class="dropdown-search"&gt;
      &lt;input type="text" class="dropdown-search-input" placeholder="Buscar..." [(ngModel)]="search" /&gt;
    &lt;/div&gt;
    &lt;div class="dropdown-divider"&gt;&lt;/div&gt;
    &lt;div class="dropdown-checkbox-list"&gt;
      &lt;!-- Iterar opciones con checkbox --&gt;
      &lt;label class="dropdown-item-checkbox"&gt;
        &lt;input type="checkbox" [(ngModel)]="item.selected" /&gt;
        &lt;span&gt;Nombre de la opción&lt;/span&gt;
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/oefa-dropdown&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }
    .ds-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge { background-color: var(--oefa-primary-container); color: var(--oefa-primary-root); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--oefa-radius-full); }

    .ds-card { background: var(--oefa-surface-card); border: 1px solid var(--oefa-border-color); border-radius: var(--oefa-radius-lg); box-shadow: var(--oefa-shadow-sm); }
    .card-header { padding: 18px 24px; background: var(--oefa-surface-subtle); border-bottom: 1px solid var(--oefa-border-color); border-radius: calc(var(--oefa-radius-lg) - 1px) calc(var(--oefa-radius-lg) - 1px) 0 0; display: flex; flex-direction: column; gap: 2px; }
    .card-header h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    .card-body { padding: 24px; }

    .dropdown-demo-row { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
    .status-pill { font-size: 0.8125rem; color: var(--oefa-text-secondary); background: var(--oefa-surface-subtle); padding: 8px 14px; border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color); }
    .status-pill strong { color: var(--oefa-primary-root); font-weight: 600; }

    .kebab-demo-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; background: var(--oefa-surface-subtle); border-radius: var(--oefa-radius-md); border: 1px solid var(--oefa-border-color); }
    .row-label { font-size: 0.875rem; color: var(--oefa-text-primary); }

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
export class DesignSystemDropdownsComponent {
  isCreateOpen = false;
  isActionsOpen = false;
  isFilterOpen = false;
  isKebabOpen = false;

  searchAreaTerm = '';
  areas: FilterOption[] = [
    { id: '1', label: 'DFAI - Fiscalización y Sanción', selected: true },
    { id: '2', label: 'DSIN - Supervisión Institucional', selected: true },
    { id: '3', label: 'OAJ - Asesoría Jurídica', selected: false },
    { id: '4', label: 'OPP - Planeamiento y Presupuesto', selected: false },
    { id: '5', label: 'OTIC - Tecnologías de la Información', selected: false }
  ];

  get filteredAreas(): FilterOption[] {
    if (!this.searchAreaTerm.trim()) {
      return this.areas;
    }
    const term = this.searchAreaTerm.toLowerCase();
    return this.areas.filter(a => a.label.toLowerCase().includes(term));
  }

  get selectedAreasCount(): number {
    return this.areas.filter(a => a.selected).length;
  }

  get selectedAreasLabels(): string {
    return this.areas
      .filter(a => a.selected)
      .map(a => a.label.split(' - ')[0])
      .join(', ');
  }
}
