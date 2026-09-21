import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';

@Component({
  selector: 'app-design-system-bento-kpi',
  standalone: true,
  imports: [CommonModule, OefaBentoKpiTileComponent],
  template: `
    <div class="ds-container">
      <div class="ds-header">
        <div>
          <h2>📊 Bento KPI Tiles (&lt;oefa-bento-kpi-tile&gt;)</h2>
          <p class="subtitle">Tarjetas modulares para tableros de control con rellenos suaves, esquinas de 20px y micro-gráficos contextuales.</p>
        </div>
        <span class="ds-badge">MOLÉCULA BENTO</span>
      </div>

      <!-- SECCIÓN 1: Cuadrícula en Vivo de Bento KPI Tiles -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>1. Cuadrícula de KPIs con Micro-Gráficos Integrados</h3>
          <span class="text-muted">Interactivas con elevación M3 Expressive, esquinas redondeadas y micro-gráficos SVG automáticos.</span>
        </div>
        <div class="card-body">
          <div class="bento-grid">
            <oefa-bento-kpi-tile
              sector="Sector Supervisión"
              title="Fiscalización Directa"
              value="1,248"
              metricLabel="Actas en campo"
              trendLabel="+8.4% este mes"
              periodLabel="Periodo anual 2024"
              icon="factory"
              iconColor="var(--oefa-primary-on-container)"
              bgTint="var(--oefa-primary-container)"
              accentColor="var(--oefa-primary-root)"
              [chip]="{ variant: 'project', label: 'PRY-2024' }"
              status="EN_PROCESO"
              chartType="donut"
              [percentage]="75"
              (tileClick)="onSelectTile('Fiscalización Directa')"
            />

            <oefa-bento-kpi-tile
              sector="Evaluación Ambiental"
              title="Monitoreo de Agua"
              value="3,842"
              metricLabel="Muestras en cuencas"
              trendLabel="Óptimo"
              periodLabel="24 Regiones evaluadas"
              icon="droplets"
              iconColor="var(--oefa-secondary-on-container)"
              bgTint="var(--oefa-secondary-container)"
              accentColor="var(--oefa-secondary-ui-safe)"
              [chip]="{ variant: 'area', label: 'DEAM' }"
              status="FINALIZADO"
              chartType="gauge"
              [percentage]="85"
              (tileClick)="onSelectTile('Monitoreo de Agua')"
            />

            <oefa-bento-kpi-tile
              sector="DFAI / Sancionador"
              title="Procedimientos PAS"
              value="456"
              metricLabel="Expedientes activos"
              trendLabel="En curso"
              periodLabel="92% resueltos a tiempo"
              icon="scale"
              iconColor="var(--oefa-tertiary-on-container)"
              bgTint="color-mix(in srgb, var(--oefa-tertiary-container) 45%, white)"
              accentColor="var(--oefa-tertiary-ui-safe)"
              [chip]="{ variant: 'siged', label: 'EXP-0491' }"
              status="OBSERVADO"
              chartType="bars"
              (tileClick)="onSelectTile('Procedimientos PAS')"
            />

            <oefa-bento-kpi-tile
              sector="Gestión Institucional"
              title="Metas POI / PLANEFA"
              value="94.2%"
              metricLabel="Cumplimiento anual"
              trendLabel="Alto nivel"
              periodLabel="1,840 EFA fiscalizadas"
              icon="leaf"
              iconColor="var(--oefa-success-on-container)"
              bgTint="var(--oefa-success-container)"
              accentColor="var(--oefa-success-ui-safe)"
              [chip]="{ variant: 'deliverable', label: 'ENT-Q3' }"
              status="POR_INICIAR"
              chartType="sparkline"
              (tileClick)="onSelectTile('Metas POI / PLANEFA')"
            />
          </div>

          @if (selectedTile()) {
            <div class="feedback-alert">
              <span>🎯 Se hizo clic en el tile: <strong>{{ selectedTile() }}</strong></span>
            </div>
          }
        </div>
      </div>

      <!-- SECCIÓN 2: Código de Implementación -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>2. Código de Consumo en Plantillas Angular</h3>
          <span class="text-muted">Componente standalone disponible desde <code>shared/components/bento-kpi-tile/</code>.</span>
        </div>
        <div class="card-body">
          <pre class="code-block">&lt;oefa-bento-kpi-tile
  sector="Sector Supervisión"
  title="Fiscalización Directa"
  value="1,248"
  metricLabel="Actas en campo"
  trendLabel="+8.4% este mes"
  periodLabel="Periodo anual 2024"
  icon="factory"
  bgTint="var(--oefa-primary-container)"
  accentColor="var(--oefa-primary-root)"
  [chip]="&#123; variant: 'project', label: 'PRY-2024' &#125;"
  status="EN_PROCESO"
  chartType="donut"
  [percentage]="75"
  (tileClick)="abrirDetalle()"
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
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
export class DesignSystemBentoKpiComponent {
  selectedTile = signal<string | null>(null);

  onSelectTile(name: string): void {
    this.selectedTile.set(name);
  }
}
