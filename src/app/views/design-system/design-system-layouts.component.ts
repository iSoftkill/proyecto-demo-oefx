import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaIconComponent } from '../../shared/components/icon/icon.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-design-system-layouts',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    OefaIconComponent
  ],
  template: `
    <div class="ds-container">
      <!-- Encabezado de la Sección -->
      <div class="ds-header">
        <div>
          <h2>🏛️ Arquitectura de Layouts OEFA: Sistema Interno vs Portal Público</h2>
          <p class="subtitle">
            Especificación y maquetación de las dos estructuras maestras de diseño. Define la anatomía del shell, 
            el comportamiento de scroll, el nivel de navegación y el modelo de footer institucional.
          </p>
        </div>
        <span class="ds-badge">SHELL & TEMPLATES</span>
      </div>

      <!-- Tarjeta Comparativa Resumen Rápido -->
      <div class="card ds-card summary-card">
        <div class="summary-grid">
          <div class="summary-col internal-col">
            <div class="col-badge">
              <span class="dot-indicator dot-internal"></span>
              <strong>SISTEMA INTERNO (Backoffice / Operativo)</strong>
            </div>
            <h3>Header + Sidebar Rail + Workspace</h3>
            <p>
              Optimizado para productividad, carga densa de datos y operaciones repetitivas de usuarios internos (colaboradores OEFA).
            </p>
            <ul class="spec-list">
              <li><oefa-icon name="check" size="sm"></oefa-icon> Viewport bloqueado (<code>height: 100vh</code>) con scroll autónomo en Workspace.</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> Sidebar Rail (80px) con navegación jerárquica colapsable/flotante.</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> <strong>Sin footer general</strong> (máximo aprovechamiento vertical de pantalla).</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> Header con App Launcher OEFA, búsqueda global y perfil de usuario.</li>
            </ul>
            <div class="action-row">
              <a routerLink="/catalogo" class="layout-btn btn-internal">
                <oefa-icon name="layout" size="sm"></oefa-icon>
                <span>Ver Shell Interno en Vivo</span>
              </a>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-col portal-col">
            <div class="col-badge">
              <span class="dot-indicator dot-portal"></span>
              <strong>PORTAL PÚBLICO (Web / Ciudadano / Directivo)</strong>
            </div>
            <h3>Header + Workspace Centrado + Footer</h3>
            <p>
              Diseñado para lectura accesible, consulta pública, directivos y transparencia ciudadana (conforme a estándares Gob.pe).
            </p>
            <ul class="spec-list">
              <li><oefa-icon name="check" size="sm"></oefa-icon> Scroll natural fluido en la página completa (<code>body/html</code>).</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> Header institucional con co-branding MINAM + OEFA y nav horizontal.</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> Contenedor de contenido expandible para dashboards, analítica y mapas (<code>max-width: 1920px</code>).</li>
              <li><oefa-icon name="check" size="sm"></oefa-icon> <strong>Footer institucional completo</strong> (legales, WCAG 2.2 AA, enlaces, redes).</li>
            </ul>
            <div class="action-row">
              <a routerLink="/pin-demo" class="layout-btn btn-portal">
                <oefa-icon name="external-link" size="sm"></oefa-icon>
                <span>Ver Maqueta Viva (Portal PIN)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 1: MAQUETA WIREFRAME SISTEMA INTERNO -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>1. Anatomía Estándar: Sistema Interno</h3>
            <span class="text-muted">Estructura para aplicaciones de gestión (SEOSC, SICOPAGO, Fiscalización, Mesa de Ayuda).</span>
          </div>
          <span class="tag-status tag-blue">Viewport Lock (100vh)</span>
        </div>
        <div class="card-body">
          <!-- Wireframe Gráfico Interactivo Sistema Interno -->
          <div class="wireframe-mockup internal-wireframe">
            <!-- Header Simulado -->
            <div class="wf-header">
              <div class="wf-brand">
                <span class="wf-box-pill brand-toggle">☰</span>
                <span class="wf-box-logo">OEFA</span>
                <span class="wf-divider"></span>
                <span class="wf-text">SEOSC — Seguimiento de Órdenes</span>
              </div>
              <div class="wf-header-right">
                <span class="wf-box-pill">🔍 Buscar...</span>
                <span class="wf-box-pill">⚡ App Launcher</span>
                <span class="wf-avatar">JA</span>
              </div>
            </div>

            <!-- Body: Sidebar + Workspace -->
            <div class="wf-body">
              <!-- Sidebar Rail -->
              <div class="wf-sidebar-rail">
                <div class="wf-rail-item active" title="Inicio / Dashboard">📊</div>
                <div class="wf-rail-item" title="Órdenes de Servicio">📑</div>
                <div class="wf-rail-item" title="Reportes">📈</div>
                <div class="wf-rail-item" title="Configuración">⚙️</div>
                <div class="wf-rail-bottom" title="Colapsar / Fijar">📌</div>
              </div>

              <!-- Submenu Panel Opcional -->
              <div class="wf-submenu-panel">
                <div class="wf-panel-title">MÓDULO ÓRDENES</div>
                <div class="wf-tree-item active">Todas las órdenes</div>
                <div class="wf-tree-item">Pendientes de pago</div>
                <div class="wf-tree-item">Concluidas</div>
                <div class="wf-tree-item">Reportes SIGA</div>
              </div>

              <!-- Área de Trabajo Workspace -->
              <div class="wf-workspace">
                <div class="wf-workspace-banner">
                  <div>
                    <h4>Workspace Principal con Scroll Independiente</h4>
                    <p>El header y los sidebars permanecen estáticos. El contenido hace scroll dentro de este contenedor.</p>
                  </div>
                  <span class="badge-accent">Scroll Interior</span>
                </div>

                <div class="wf-grid-cards">
                  <div class="wf-card">KPI: Órdenes Activas</div>
                  <div class="wf-card">KPI: Presupuesto Comprometido</div>
                  <div class="wf-card">KPI: Devengados en Trámite</div>
                </div>

                <div class="wf-table-mock">
                  <div class="wf-table-header">Matriz de Datos / Tabla de Registros</div>
                  <div class="wf-table-row"></div>
                  <div class="wf-table-row"></div>
                  <div class="wf-table-row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: MAQUETA WIREFRAME PORTAL PÚBLICO -->
      <div class="card ds-card">
        <div class="card-header">
          <div>
            <h3>2. Anatomía Estándar: Portal Público / Ciudadano</h3>
            <span class="text-muted">Estructura para portales institucionales, directivos y de consulta ciudadana (PIN, Consulta Pública, Portal de Datos).</span>
          </div>
          <span class="tag-status tag-green">Scroll Natural (Body)</span>
        </div>
        <div class="card-body">
          <!-- Wireframe Gráfico Interactivo Portal -->
          <div class="wireframe-mockup portal-wireframe">
            <!-- QA Banner Opcional -->
            <div class="wf-qa-banner">
              <span>AVISO INSTITUCIONAL / AMBIENTE DE PRUEBAS</span>
              <span class="wf-box-pill small">Modo Oscuro / Accesibilidad</span>
            </div>

            <!-- Portal Header -->
            <div class="wf-portal-header">
              <div class="wf-portal-brands">
                <div class="wf-peru-mark"><strong>PERÚ</strong> Minam</div>
                <span class="wf-divider"></span>
                <div class="wf-oefa-logo">OEFA</div>
                <span class="wf-divider"></span>
                <div class="wf-portal-title"><strong>PIN</strong> Inteligencia de Negocios</div>
              </div>
              <div class="wf-portal-nav">
                <span class="wf-nav-link active">Inicio</span>
                <span class="wf-nav-link">Tableros</span>
                <span class="wf-nav-link">Acerca de</span>
                <span class="wf-search-input">🔍 Buscar tablero...</span>
              </div>
            </div>

            <!-- Hero Section -->
            <div class="wf-portal-hero">
              <div class="wf-hero-content">
                <h3>Hero Banner Institucional con Buscador y Filtros</h3>
                <p>Bienvenida a la plataforma ciudadana con accesos directos y métricas clave.</p>
              </div>
            </div>

            <!-- Contenido Centralizado -->
            <div class="wf-portal-body">
              <div class="wf-grid-cards">
                <div class="wf-card portal-card">Tablero DEAM Planefa</div>
                <div class="wf-card portal-card">Tablero DS / Supervisión</div>
                <div class="wf-card portal-card">Fiscalización Ambiental</div>
              </div>
            </div>

            <!-- Footer Institucional Estándar -->
            <div class="wf-portal-footer">
              <div class="wf-footer-col">
                <strong>OEFA</strong>
                <p>Organismo de Evaluación y Fiscalización Ambiental</p>
              </div>
              <div class="wf-footer-col">
                <strong>Enlaces y Accesibilidad</strong>
                <span>Términos de uso • Política de privacidad • WCAG 2.2 AA</span>
              </div>
              <div class="wf-footer-col">
                <strong>Contacto y Redes</strong>
                <span>© 2026 OEFA. Todos los derechos reservados.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: TABLA TÉCNICA COMPARATIVA -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>3. Cuadro Comparativo de Directrices Técnicas</h3>
          <span class="text-muted">Parámetros CSS, accesibilidad y experiencia de usuario.</span>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="ds-table">
              <thead>
                <tr>
                  <th>Dimensión</th>
                  <th>Sistema Interno (App / Backoffice)</th>
                  <th>Portal Público / Ciudadano (Web)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Scroll Principal</strong></td>
                  <td><code>overflow: hidden</code> en <code>body</code>. Scroll vertical solo en <code>.workspace-main</code>.</td>
                  <td><code>overflow: auto</code> en <code>body</code>. Scroll natural de página completa.</td>
                </tr>
                <tr>
                  <td><strong>Header Superior</strong></td>
                  <td>Fijo (64px). App switcher institucional, buscador global compacto, user menu y notificaciones.</td>
                  <td>Sticky (70px a 80px). Co-branding MINAM + OEFA, navegación por pestañas/menú horizontal y búsqueda central.</td>
                </tr>
                <tr>
                  <td><strong>Navegación Lateral (Sidebar)</strong></td>
                  <td><strong>Obligatoria</strong>: Sidebar Rail (80px) + Submenú flyout (260px) con soporte fijado o flotante.</td>
                  <td><strong>No aplica</strong> (o se reemplaza por cajón de filtros laterales plegables / Facet Search).</td>
                </tr>
                <tr>
                  <td><strong>Footer</strong></td>
                  <td><strong>Sin footer general</strong>. Opcional: Action bar fija inferior (Guardar / Cancelar / Paginación).</td>
                  <td><strong>Obligatorio</strong>: Footer institucional completo (marcas, enlaces legales, sello WCAG AA, copyright).</td>
                </tr>
                <tr>
                  <td><strong>Ancho Máximo (Container)</strong></td>
                  <td>Fluido al 100% de la pantalla con acolchado adaptable (<code>padding: 16px - 24px</code>).</td>
                  <td>Delimitado y centrado con tope panorámico (<code>max-width: 1920px</code> vía <code>--oefa-portal-max-width</code>) para tableros analíticos, gráficos y mapas geoespaciales.</td>
                </tr>
                <tr>
                  <td><strong>Modo Oscuro</strong></td>
                  <td>Soportado vía token central <code>data-theme="dark"</code> en shell interno.</td>
                  <td>Soportado vía selector en banner/header sin afectar la legibilidad de la marca Perú/OEFA.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      font-family: var(--oefa-font-family-body, 'Inter', sans-serif);
    }

    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--oefa-border-color, #E2E8F0);
      padding-bottom: 20px;

      h2 {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--oefa-text-primary, #0F172A);
        margin: 0 0 6px 0;
      }

      .subtitle {
        font-size: 0.9375rem;
        color: var(--oefa-text-secondary, #64748B);
        max-width: 850px;
        line-height: 1.5;
        margin: 0;
      }

      .ds-badge {
        background: #EEF2F6;
        color: #0F52BA;
        font-weight: 700;
        font-size: 0.75rem;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid #CBD5E1;
        letter-spacing: 0.05em;
      }
    }

    .ds-card {
      background: var(--oefa-surface-card, #FFFFFF);
      border: 1px solid var(--oefa-border-color, #E2E8F0);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      overflow: hidden;

      .card-header {
        padding: 16px 20px;
        border-bottom: 1px solid var(--oefa-border-color, #E2E8F0);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--oefa-text-primary, #0F172A);
          margin: 0 0 4px 0;
        }

        .text-muted {
          font-size: 0.8125rem;
          color: var(--oefa-text-secondary, #64748B);
        }
      }

      .card-body {
        padding: 24px;
      }
    }

    // Summary Card Grid
    .summary-card {
      background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1px 1fr;
      padding: 24px;
      gap: 24px;

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
      }
    }

    .summary-divider {
      background-color: var(--oefa-border-color, #E2E8F0);
      width: 1px;
      height: 100%;

      @media (max-width: 860px) {
        display: none;
      }
    }

    .summary-col {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .col-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.75rem;
        letter-spacing: 0.05em;

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-internal {
          background-color: #0F52BA;
          box-shadow: 0 0 0 3px rgba(15, 82, 186, 0.2);
        }

        .dot-portal {
          background-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
        }
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--oefa-text-primary, #0F172A);
        margin: 0;
      }

      p {
        font-size: 0.875rem;
        color: var(--oefa-text-secondary, #64748B);
        margin: 0;
        line-height: 1.5;
      }

      .spec-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
          font-size: 0.8125rem;
          color: var(--oefa-text-primary, #1E293B);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;

          code {
            background: #E2E8F0;
            padding: 1px 5px;
            border-radius: 4px;
            font-size: 0.75rem;
            color: #0F52BA;
          }
        }
      }

      .action-row {
        margin-top: auto;
        padding-top: 12px;
      }
    }

    .layout-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;

      &.btn-internal {
        background-color: #0F52BA;
        color: #FFFFFF;

        &:hover {
          background-color: #0C4194;
          box-shadow: 0 4px 12px rgba(15, 82, 186, 0.25);
        }
      }

      &.btn-portal {
        background-color: #059669;
        color: #FFFFFF;

        &:hover {
          background-color: #047857;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
        }
      }
    }

    .tag-status {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;

      &.tag-blue {
        background: #EFF6FF;
        color: #1D4ED8;
        border: 1px solid #BFDBFE;
      }

      &.tag-green {
        background: #ECFDF5;
        color: #047857;
        border: 1px solid #A7F3D0;
      }
    }

    // Wireframe Mockups Styling
    .wireframe-mockup {
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      overflow: hidden;
      background: #F1F5F9;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);
    }

    // 1. Internal Mockup
    .internal-wireframe {
      display: flex;
      flex-direction: column;
      height: 380px;

      .wf-header {
        height: 48px;
        background: #0F52BA;
        color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;

        .wf-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 0.8125rem;
        }

        .wf-box-pill {
          background: rgba(255,255,255,0.2);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .wf-box-logo {
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .wf-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.3);
        }

        .wf-header-right {
          display: flex;
          align-items: center;
          gap: 10px;

          .wf-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #FFFFFF;
            color: #0F52BA;
            font-size: 0.7rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .wf-body {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      .wf-sidebar-rail {
        width: 52px;
        background: #0C4194;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 0;
        gap: 16px;

        .wf-rail-item {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: #93C5FD;
          cursor: pointer;

          &.active {
            background: #FFFFFF;
            color: #0F52BA;
          }
        }

        .wf-rail-bottom {
          margin-top: auto;
          color: rgba(255,255,255,0.6);
        }
      }

      .wf-submenu-panel {
        width: 180px;
        background: #FFFFFF;
        border-right: 1px solid #E2E8F0;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .wf-panel-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: #64748B;
          margin-bottom: 4px;
        }

        .wf-tree-item {
          font-size: 0.75rem;
          padding: 6px 8px;
          border-radius: 4px;
          color: #334155;

          &.active {
            background: #EFF6FF;
            color: #1D4ED8;
            font-weight: 600;
          }
        }
      }

      .wf-workspace {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 14px;

        .wf-workspace-banner {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h4 { margin: 0 0 2px 0; font-size: 0.875rem; color: #0F172A; }
          p { margin: 0; font-size: 0.75rem; color: #64748B; }

          .badge-accent {
            background: #DBEAFE;
            color: #1E40AF;
            font-size: 0.7rem;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
          }
        }

        .wf-grid-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;

          .wf-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            padding: 14px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #475569;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          }
        }

        .wf-table-mock {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;

          .wf-table-header {
            font-size: 0.75rem;
            font-weight: 600;
            color: #0F172A;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 6px;
          }

          .wf-table-row {
            height: 16px;
            background: #F8FAFC;
            border-radius: 3px;
          }
        }
      }
    }

    // 2. Portal Mockup
    .portal-wireframe {
      display: flex;
      flex-direction: column;

      .wf-qa-banner {
        background: #D97706;
        color: #FFFFFF;
        font-size: 0.7rem;
        font-weight: 600;
        padding: 4px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .small {
          background: rgba(0,0,0,0.2);
          padding: 2px 6px;
          border-radius: 3px;
        }
      }

      .wf-portal-header {
        background: #FFFFFF;
        border-bottom: 1px solid #CBD5E1;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .wf-portal-brands {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8125rem;

          .wf-peru-mark strong { color: #DC2626; }
          .wf-oefa-logo { font-weight: 800; color: #0F52BA; }
          .wf-portal-title strong { color: #0284C7; }
          .wf-divider { width: 1px; height: 16px; background: #CBD5E1; }
        }

        .wf-portal-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8125rem;

          .wf-nav-link {
            color: #475569;
            cursor: pointer;

            &.active {
              color: #0F52BA;
              font-weight: 600;
              border-bottom: 2px solid #0F52BA;
              padding-bottom: 2px;
            }
          }

          .wf-search-input {
            background: #F1F5F9;
            border: 1px solid #CBD5E1;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            color: #64748B;
          }
        }
      }

      .wf-portal-hero {
        background: linear-gradient(135deg, #0F52BA 0%, #0369A1 100%);
        color: #FFFFFF;
        padding: 24px 20px;
        text-align: center;

        h3 { margin: 0 0 6px 0; font-size: 1.125rem; }
        p { margin: 0; font-size: 0.8125rem; opacity: 0.9; }
      }

      .wf-portal-body {
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        padding: 20px 16px;

        .wf-grid-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;

          .portal-card {
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            padding: 16px;
            font-size: 0.8125rem;
            font-weight: 600;
            text-align: center;
            color: #1E293B;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
          }
        }
      }

      .wf-portal-footer {
        background: #0B192C;
        color: #94A3B8;
        padding: 16px 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        font-size: 0.75rem;
        border-top: 1px solid #1E293B;

        .wf-footer-col {
          display: flex;
          flex-direction: column;
          gap: 4px;

          strong { color: #FFFFFF; }
        }
      }
    }

    // Technical Table
    .table-responsive {
      overflow-x: auto;
    }

    .ds-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th {
        text-align: left;
        background: #F8FAFC;
        padding: 12px 16px;
        font-weight: 600;
        color: #334155;
        border-bottom: 2px solid #E2E8F0;
      }

      td {
        padding: 14px 16px;
        border-bottom: 1px solid #E2E8F0;
        color: #1E293B;
        vertical-align: top;
        line-height: 1.45;

        code {
          background: #F1F5F9;
          color: #0F52BA;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8125rem;
        }
      }

      tr:hover td {
        background-color: #F8FAFC;
      }
    }
  `]
})
export class DesignSystemLayoutsComponent {}
