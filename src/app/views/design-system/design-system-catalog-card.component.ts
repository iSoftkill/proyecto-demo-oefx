import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaCatalogCardComponent, CatalogChipConfig } from '../../shared/components/catalog-card/catalog-card.component';

@Component({
  selector: 'app-design-system-catalog-card',
  standalone: true,
  imports: [CommonModule, OefaCatalogCardComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>🗂️ Catalog Cards Bento (&lt;oefa-catalog-card&gt;)</h2>
          <p class="subtitle">Tarjetas de catálogo institucional para exploración de sistemas, módulos temáticos y tableros con micro-indicador de actividad en vivo.</p>
        </div>
        <span class="ds-badge">MOLÉCULA BENTO</span>
      </div>

      <!-- SECCIÓN 1: Cuadrícula en Vivo -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Cuadrícula de Módulos con Actividad en Vivo</h3>
          <span class="text-muted">Esquinas de 18px, tags institucionales OEFA y botón adaptable con micro-interacciones M3.</span>
        </div>
        <div class="card-body">
          <div class="catalog-grid">
            <oefa-catalog-card
              icon="pickaxe"
              title="Supervisión en Minería"
              description="Monitoreo de obligaciones ambientales y fiscalización de unidades mineras en mediana y gran minería."
              [chips]="[{ variant: 'project', label: 'PRY-2024' }]"
              [tags]="['Minería', 'Operativo']"
              status="EN_PROCESO"
              type="Misional • Minería"
              color="var(--oefa-primary-root)"
              bgTint="var(--oefa-primary-container)"
              activityType="sparkline"
              activityLabel="Uso semanal"
              updatedAt="Hace 10 min"
              (cardClick)="onSelectCard('Supervisión en Minería')"
              (actionClick)="onActionCard('Supervisión en Minería')"
            />

            <oefa-catalog-card
              icon="waves"
              title="Calidad de Cuerpos de Agua"
              description="Evaluación de parámetros físico-químicos en cuencas hidrográficas con sensores telemétricos."
              [chips]="[{ variant: 'area', label: 'DEAM' }]"
              [tags]="['IoT', 'Cuencas']"
              status="FINALIZADO"
              type="Monitoreo • Ambiental"
              color="var(--oefa-secondary-ui-safe)"
              bgTint="var(--oefa-secondary-container)"
              activityType="bar"
              activityLabel="Transmisión 98%"
              updatedAt="Hace 25 min"
              (cardClick)="onSelectCard('Calidad de Cuerpos de Agua')"
              (actionClick)="onActionCard('Calidad de Cuerpos de Agua')"
            />

            <oefa-catalog-card
              icon="scale"
              title="Registro de Sanciones PAS"
              description="Seguimiento de procedimientos administrativos sancionadores y resoluciones emitidas por DFAI."
              [chips]="[{ variant: 'siged', label: 'EXP-0491' }]"
              [tags]="['DFAI', 'Legal']"
              status="OBSERVADO"
              type="Sancionador • PAS"
              color="var(--oefa-tertiary-ui-safe)"
              bgTint="color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)"
              activityType="sparkline"
              activityLabel="Actividad 30d"
              updatedAt="Ayer"
              (cardClick)="onSelectCard('Registro de Sanciones PAS')"
              (actionClick)="onActionCard('Registro de Sanciones PAS')"
            />

            <oefa-catalog-card
              icon="clipboard-check"
              title="Planeamiento Operativo POI"
              description="Cumplimiento de metas trimestrales institucionales y ejecución presupuestal de fiscalización."
              [chips]="[{ variant: 'deliverable', label: 'ENT-Q3' }]"
              [tags]="['POI', 'Gestión']"
              status="POR_INICIAR"
              type="Apoyo • Gestión"
              color="var(--oefa-success-ui-safe)"
              bgTint="var(--oefa-success-container)"
              activityType="pulse"
              activityLabel="En línea"
              updatedAt="Hace 1h"
              (cardClick)="onSelectCard('Planeamiento Operativo POI')"
              (actionClick)="onActionCard('Planeamiento Operativo POI')"
            />
          </div>

          @if (feedback()) {
            <div class="feedback-alert">
              <span>{{ feedback() }}</span>
            </div>
          }
        </div>
      </div>

      <!-- SECCIÓN 2: Código de Uso -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Código de Implementación</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/catalog-card/</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;oefa-catalog-card
  icon="pickaxe"
  title="Supervisión en Minería"
  description="Monitoreo de obligaciones ambientales y fiscalización..."
  [chips]="[&#123; variant: 'project', label: 'PRY-2024' &#125;]"
  [tags]="['Minería', 'Operativo']"
  status="EN_PROCESO"
  type="Misional • Minería"
  color="var(--oefa-primary-root)"
  bgTint="var(--oefa-primary-container)"
  activityType="sparkline"
  activityLabel="Uso semanal"
  updatedAt="Hace 10 min"
  (cardClick)="abrirTablero()"
  (actionClick)="abrirDirecto()"
/&gt;</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      h2 { margin: 0 0 6px 0; font-family: var(--oefa-font-display); font-size: 1.5rem; color: #0f172a; }
      .subtitle { margin: 0; color: #64748b; font-size: 0.875rem; }
    }
    .ds-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      letter-spacing: 0.04em;
    }
    .ds-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    }
    .card-header {
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      h3 { margin: 0 0 4px 0; font-size: 1rem; font-family: var(--oefa-font-display); color: #0f172a; }
      .text-muted { font-size: 0.8125rem; color: #64748b; }
    }
    .card-body {
      padding: 20px;
    }
    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
    .feedback-alert {
      margin-top: 16px;
      padding: 12px 16px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 10px;
      color: #1e40af;
      font-size: 0.875rem;
    }
    .code-block {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      font-size: 0.8125rem;
      color: #1e293b;
      margin: 0;
      overflow-x: auto;
    }
  `]
})
export class DesignSystemCatalogCardComponent {
  feedback = signal<string | null>(null);

  onSelectCard(title: string): void {
    this.feedback.set(`Tarjeta seleccionada: ${title}`);
  }

  onActionCard(title: string): void {
    this.feedback.set(`Acción "Abrir" ejecutada para: ${title}`);
  }
}
