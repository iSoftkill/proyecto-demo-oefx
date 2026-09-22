import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaPageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OefaButtonComponent,
    OefaPageHeaderComponent
  ],
  template: `
    <div class="dashboard-container">
      <oefa-page-header
        title="Plantilla Base OEFA"
        subtitle="Inicio rápido para nuevos sistemas institucionales con Design System integrado.">
        <div actions>
          <a routerLink="/design-system">
            <oefa-button variant="primary">
              Ver Catálogo Design System
            </oefa-button>
          </a>
        </div>
      </oefa-page-header>

      <!-- KPI Summary Bar (Cards nativas OEFA) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-title">Componentes UI</span>
          <div class="kpi-value">30+</div>
          <span class="kpi-foot positive">Listos para usar</span>
        </div>

        <div class="kpi-card">
          <span class="kpi-title">Estándar Institucional</span>
          <div class="kpi-value">100%</div>
          <span class="kpi-foot positive">Accesibilidad & Tokens</span>
        </div>

        <div class="kpi-card">
          <span class="kpi-title">Arquitectura</span>
          <div class="kpi-value">Angular 22</div>
          <span class="kpi-foot">Standalone components</span>
        </div>

        <div class="kpi-card urgent">
          <span class="kpi-title">Modo Plantilla</span>
          <div class="kpi-value text-tertiary">Activo</div>
          <span class="kpi-foot">Sin dependencias de BD</span>
        </div>
      </div>

      <!-- Card estándar con fill de superficie y borde OEFA -->
      <div class="card p-6">
        <h2 class="welcome-title">Bienvenido al Starter Kit OEFA</h2>
        <p class="welcome-text">
          Esta plantilla contiene todos los tokens, tipografías corporativas, componentes compartidos
          y estilos globales del Design System de OEFA. Puedes comenzar creando tus modelos, servicios y vistas de negocio.
        </p>
        <div class="welcome-actions">
          <a routerLink="/design-system/botones">
            <oefa-button variant="secondary">
              Explorar Catálogo de Componentes
            </oefa-button>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: var(--space-6, 24px);
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .kpi-card {
      background-color: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg);
      padding: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--oefa-shadow-sm);
    }

    .kpi-card.urgent {
      border-color: var(--oefa-tertiary-container-hc);
      background-color: var(--oefa-tertiary-container);
    }

    .kpi-title {
      font-size: 0.8125rem;
      color: var(--oefa-text-secondary);
      font-weight: 600;
    }

    .kpi-value {
      font-family: var(--oefa-font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--oefa-primary-root);
      margin: 6px 0;
    }

    .kpi-value.text-tertiary {
      color: var(--oefa-tertiary-ui-safe);
    }

    .kpi-foot {
      font-size: 0.75rem;
      color: var(--oefa-text-muted);
    }

    .kpi-foot.positive {
      color: var(--oefa-success-ui-safe);
      font-weight: 600;
    }

    .p-6 {
      padding: 24px;
    }

    .welcome-title {
      margin-top: 0;
      color: var(--oefa-text-primary);
      font-family: var(--oefa-font-display);
      font-size: 1.25rem;
      font-weight: 700;
    }

    .welcome-text {
      color: var(--oefa-text-secondary);
      max-width: 700px;
      line-height: 1.6;
      font-size: 0.875rem;
    }

    .welcome-actions {
      margin-top: 20px;
    }
  `]
})
export class DashboardComponent {}
