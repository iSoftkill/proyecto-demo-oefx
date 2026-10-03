import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-system-foundations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-container">
      <!-- Encabezado -->
      <div class="ds-header">
        <div>
          <h2>🏛️ Principios y Fundaciones del Sistema de Diseño</h2>
          <p class="subtitle">La base visual y de experiencia que da coherencia a todas las aplicaciones del OEFA.</p>
        </div>
        <span class="ds-badge">ESTÁNDAR INSTITUCIONAL</span>
      </div>

      <!-- Tarjeta 1: Propósito -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>¿Por qué existe este sistema?</h3>
          <span class="text-muted">Un lenguaje visual compartido para todas las aplicaciones del OEFA.</span>
        </div>
        <div class="card-body">
          <div class="manifesto-box">
            <p class="manifesto-text">
              Cuando un servidor del OEFA interactua en los distintos sitemas CORE y de gestión administrativa
              <strong>la experiencia visual es la misma</strong>. Mismos colores, mismos botones, mismas reglas.
              El sistema de diseño es lo que lo hace posible: un conjunto de decisiones tomadas una sola vez y aplicadas en todos los productos digitales.
            </p>
            <div class="note-quote">
              <span class="quote-mark">"</span>
              <span>
                Los colores institucionales (azul OEFA, verde esmeralda) y la tipografía Poppins provienen del
                <strong>Manual de Identidad Visual del OEFA</strong>. Todo lo demás —la forma en que se organizan,
                los estados de los botones, los contrastes para personas con baja visión—
                es la ingeniería que hace que esa identidad funcione en software real.
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Los 4 Principios -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>Cuatro principios que guían cada decisión</h3>
          <span class="text-muted">Detrás de cada color, tamaño y componente hay una razón concreta.</span>
        </div>
        <div class="card-body">
          <div class="principles-grid">

            <!-- Principio 1 -->
            <div class="principle-card">
              <div class="principle-icon bg-primary">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="principle-content">
                <h4>Cada color tiene un motivo</h4>
                <p>El color no decora: avisa, prioriza y guía la acción. Rojo para alertas críticas, verde para confirmaciones, azul para acciones principales. Sin ambigüedad.</p>
                <div class="principle-tag">Propósito funcional</div>
              </div>
            </div>

            <!-- Principio 2 -->
            <div class="principle-card">
              <div class="principle-icon bg-secondary">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <div class="principle-content">
                <h4>Mucha información, sin ruido</h4>
                <p>Las pantallas del OEFA manejan expedientes, matrices y datos masivos. El diseño está optimizado para que los funcionarios encuentren lo que buscan sin esfuerzo.</p>
                <div class="principle-tag secondary-tag">Alta densidad de datos</div>
              </div>
            </div>

            <!-- Principio 3 -->
            <div class="principle-card">
              <div class="principle-icon bg-success">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="principle-content">
                <h4>Accesible para todos</h4>
                <p>Textos legibles, contrastes suficientes y botones con el tamaño correcto. Toda la plataforma cumple el estándar internacional WCAG 2.2 desde el diseño inicial.</p>
                <div class="principle-tag success-tag">WCAG 2.2 AA Nativo</div>
              </div>
            </div>

            <!-- Principio 4 -->
            <div class="principle-card">
              <div class="principle-icon bg-tertiary">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="principle-content">
                <h4>Una sola experiencia OEFA</h4>
                <p>Un funcionario que use dos sistemas distintos del OEFA no debería notar la diferencia. Mismo shell, mismos componentes, misma lógica de navegación.</p>
                <div class="principle-tag tertiary-tag">Consistencia transversal</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Cómo se organiza -->
      <div class="card ds-card">
        <div class="card-header">
          <h3>¿Cómo se organiza el sistema?</h3>
          <span class="text-muted">Cuatro capas que garantizan que el estándar se cumpla en todo momento.</span>
        </div>
        <div class="card-body">
          <div class="sources-flow">
            <div class="source-step">
              <div class="step-num">1</div>
              <div class="step-data">
                <strong>Manual de reglas</strong>
                <p>Define qué se puede hacer y qué no: colores permitidos, tipografías, comportamiento de cada componente y criterios de accesibilidad.</p>
              </div>
            </div>
            <div class="source-step">
              <div class="step-num">2</div>
              <div class="step-data">
                <strong>Tokens de diseño</strong>
                <p>Los valores exactos de cada color, tamaño y espaciado. Actualizarlos en un solo lugar actualiza toda la plataforma automáticamente.</p>
              </div>
            </div>
            <div class="source-step">
              <div class="step-num">3</div>
              <div class="step-data">
                <strong>Estilos globales</strong>
                <p>Traduce los tokens en código que entienden los navegadores. Las reglas responsivas y de accesibilidad están aquí.</p>
              </div>
            </div>
            <div class="source-step">
              <div class="step-num">4</div>
              <div class="step-data">
                <strong>Componentes listos</strong>
                <p>Botones, tablas, modales, formularios y más. Cada uno ya probado, accesible y listo para usarse en cualquier sistema del OEFA.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ds-container { display: flex; flex-direction: column; gap: 24px; }

    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      h2 { margin: 0; font-family: var(--oefa-font-display); font-size: 1.5rem; color: var(--oefa-text-primary); }
    }
    .subtitle { font-size: 0.875rem; color: var(--oefa-text-secondary); margin-top: 4px; }
    .ds-badge {
      background-color: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--oefa-radius-full);
      white-space: nowrap;
    }

    .ds-card {
      background: var(--oefa-surface-card);
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-lg);
      box-shadow: var(--oefa-shadow-sm);
      overflow: hidden;
    }
    .card-header {
      padding: 18px 24px;
      background: var(--oefa-surface-subtle);
      border-bottom: 1px solid var(--oefa-border-color);
      h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
    }
    .card-body { padding: 24px; }

    .manifesto-box { display: flex; flex-direction: column; gap: 16px; }
    .manifesto-text { font-size: 0.95rem; line-height: 1.65; color: var(--oefa-text-primary); margin: 0; }

    .note-quote {
      position: relative;
      padding: 16px 20px 16px 44px;
      background: var(--oefa-surface-subtle);
      border-left: 4px solid var(--oefa-primary-root);
      border-radius: 0 var(--oefa-radius-md) var(--oefa-radius-md) 0;
      font-size: 0.875rem;
      color: var(--oefa-text-secondary);
      line-height: 1.55;
    }
    .quote-mark {
      position: absolute;
      left: 14px;
      top: 6px;
      font-size: 2.2rem;
      color: var(--oefa-primary-root);
      opacity: 0.4;
      font-family: Georgia, serif;
    }

    .principles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }

    .principle-card {
      display: flex;
      gap: 16px;
      padding: 20px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      background: var(--oefa-surface-subtle);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--oefa-shadow-md);
      }
    }

    .principle-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #ffffff;
      &.bg-primary   { background: var(--oefa-primary-root); }
      &.bg-secondary { background: var(--oefa-secondary-ui-safe); }
      &.bg-success   { background: var(--oefa-success-ui-safe); }
      &.bg-tertiary  { background: var(--oefa-tertiary-ui-safe); }
    }

    .principle-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      h4 { margin: 0; font-size: 1rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
      p  { margin: 0; font-size: 0.85rem; color: var(--oefa-text-secondary); line-height: 1.5; }
    }

    .principle-tag {
      align-self: flex-start;
      margin-top: 6px;
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 2px 8px;
      border-radius: 100px;
      color: var(--oefa-primary-root);
      background: var(--oefa-primary-container);
      &.secondary-tag { color: var(--oefa-secondary-on-container); background: var(--oefa-secondary-container); }
      &.success-tag   { color: var(--oefa-success-on-container);   background: var(--oefa-success-container);   }
      &.tertiary-tag  { color: var(--oefa-tertiary-on-container);  background: var(--oefa-tertiary-container);  }
    }

    .sources-flow {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .source-step {
      display: flex;
      gap: 14px;
      padding: 16px;
      border: 1px solid var(--oefa-border-color);
      border-radius: var(--oefa-radius-md);
      background: var(--oefa-surface-subtle);
    }

    .step-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--oefa-primary-container);
      color: var(--oefa-primary-root);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 0.875rem;
    }

    .step-data {
      display: flex;
      flex-direction: column;
      gap: 4px;
      strong { font-size: 0.875rem; font-weight: 700; color: var(--oefa-text-primary); font-family: var(--oefa-font-display); }
      p { margin: 0; font-size: 0.8125rem; color: var(--oefa-text-secondary); line-height: 1.45; }
    }
  `]
})
export class DesignSystemFoundationsComponent { }
