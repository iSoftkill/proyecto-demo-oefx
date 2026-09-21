import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CollapsibleVariant = 'dashed' | 'bordered' | 'card';
export type CollapsibleBadgeVariant = 'neutral' | 'info' | 'primary' | 'success' | 'warning';

let nextUniqueId = 0;

/**
 * Componente reutilizable de Divulgación Progresiva (Progressive Disclosure / Collapsible)
 *
 * @example
 * <oefa-collapsible
 *   title="Información de Contacto y Datos Opcionales"
 *   badge="OPCIONAL"
 *   variant="dashed"
 *   [(isOpen)]="isContactOpen">
 *   <div class="form-grid-2">...</div>
 * </oefa-collapsible>
 */
@Component({
  selector: 'oefa-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="oefa-collapsible"
      [ngClass]="'variant-' + variant"
      [class.is-open]="isOpen"
      [class.disabled]="disabled">
      
      <!-- Disparador Accesible (Botón nativo WAI-ARIA) -->
      <button
        type="button"
        class="collapsible-trigger"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="contentId"
        [attr.id]="triggerId"
        [attr.aria-label]="ariaLabel || title"
        [disabled]="disabled"
        (click)="toggle()">
        
        <div class="trigger-left">
          <!-- Chevron interactivo rotatorio M3 -->
          <span class="chevron-icon" [class.rotated]="isOpen" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>

          <div class="trigger-text-group">
            <span class="collapsible-title">{{ title }}</span>
            @if (subtitle) {
              <span class="collapsible-subtitle">{{ subtitle }}</span>
            }
          </div>
        </div>

        @if (badge) {
          <span class="collapsible-badge" [ngClass]="'badge-' + badgeVariant">
            {{ badge }}
          </span>
        }
      </button>

      <!-- Región de Contenido Desplegable -->
      @if (isOpen) {
        <div
          class="collapsible-content oefa-motion-fade-in"
          [id]="contentId"
          role="region"
          [attr.aria-labelledby]="triggerId">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .oefa-collapsible {
      border-radius: var(--oefa-radius-md, 8px);
      box-sizing: border-box;
      transition: border-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  box-shadow var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      /* 1. Variante Dashed (Opcionales y complementarios tipo SAIP) */
      &.variant-dashed {
        border: 1px dashed var(--oefa-border-color, #cbd5e1);
        background: var(--oefa-surface-subtle, #f8fafc);

        &:hover:not(.disabled) {
          border-color: var(--oefa-primary-root, #144aa7);
        }

        &.is-open {
          border-color: var(--oefa-primary-root, #144aa7);
          border-style: solid;
          background: var(--oefa-surface-card, #ffffff);
          box-shadow: var(--oefa-shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.06));
        }
      }

      /* 2. Variante Bordered (Borde continuo neutro) */
      &.variant-bordered {
        border: 1px solid var(--oefa-border-color, #cbd5e1);
        background: var(--oefa-surface-card, #ffffff);

        &:hover:not(.disabled) {
          border-color: var(--oefa-border-color-strong, #94a3b8);
        }

        &.is-open {
          border-color: var(--oefa-primary-root, #144aa7);
          box-shadow: var(--oefa-shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.06));
        }
      }

      /* 3. Variante Card (Elevación tipo tarjeta bento) */
      &.variant-card {
        border: 1px solid var(--oefa-border-color, #e2e8f0);
        background: var(--oefa-surface-card, #ffffff);
        box-shadow: var(--oefa-shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.06));

        &:hover:not(.disabled) {
          box-shadow: var(--oefa-shadow-md, 0 4px 16px rgba(15, 23, 42, 0.08));
        }

        &.is-open {
          border-color: var(--oefa-primary-root, #144aa7);
        }
      }

      &.disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    }

    /* Botón disparador */
    .collapsible-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      background: transparent;
      border: none;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      color: inherit;
      border-radius: var(--oefa-radius-md, 8px);
      user-select: none;
      transition: background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &:hover:not(:disabled) {
        .collapsible-title {
          color: var(--oefa-primary-root, #144aa7);
        }

        .chevron-icon {
          background-color: var(--oefa-surface-card, #ffffff);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--oefa-focus-ring, #144aa7);
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    .trigger-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    /* Chevron rotatorio M3 */
    .chevron-icon {
      width: 26px;
      height: 26px;
      border-radius: var(--oefa-radius-sm, 6px);
      background: var(--oefa-surface-muted, #f1f5f9);
      color: var(--oefa-text-secondary, #475569);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform var(--oefa-duration-medium, 300ms) var(--oefa-ease-emphasized, cubic-bezier(0.2, 0, 0, 1)),
                  background-color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease),
                  color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);

      &.rotated {
        transform: rotate(180deg);
        background: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144aa7);
      }
    }

    .trigger-text-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .collapsible-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--oefa-text-primary, #0f172a);
      line-height: 1.35;
      transition: color var(--oefa-duration-short, 150ms) var(--oefa-ease-standard, ease);
    }

    .collapsible-subtitle {
      font-size: 0.75rem;
      color: var(--oefa-text-muted, #64748b);
      line-height: 1.3;
    }

    /* Badges */
    .collapsible-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      padding: 3px 8px;
      border-radius: var(--oefa-radius-sm, 4px);
      white-space: nowrap;
      flex-shrink: 0;

      &.badge-neutral {
        background: var(--oefa-surface-muted, #f1f5f9);
        color: var(--oefa-text-secondary, #475569);
        border: 1px solid var(--oefa-border-color, #e2e8f0);
      }

      &.badge-info,
      &.badge-primary {
        background: var(--oefa-primary-container, #eef4ff);
        color: var(--oefa-primary-root, #144aa7);
        border: 1px solid var(--oefa-primary-container-hc, #a4c1f4);
      }

      &.badge-success {
        background: var(--oefa-success-container, #f7ffee);
        color: var(--oefa-success-ui-safe, #578221);
        border: 1px solid var(--oefa-success-container-hc, #d0eaae);
      }

      &.badge-warning {
        background: var(--oefa-tertiary-container, #fff0cc);
        color: var(--oefa-tertiary-ui-safe, #996d00);
        border: 1px solid var(--oefa-tertiary-container-hc, #ffe199);
      }
    }

    /* Región de contenido */
    .collapsible-content {
      padding: 0 16px 16px 16px;
      border-top: 1px solid var(--oefa-border-color, #e2e8f0);
      margin-top: 4px;
      padding-top: 16px;
    }

    @media (prefers-reduced-motion: reduce) {
      .chevron-icon,
      .collapsible-content,
      .oefa-collapsible {
        transition: none !important;
        transform: none !important;
      }
      .chevron-icon.rotated {
        transform: rotate(180deg) !important;
      }
    }
  `]
})
export class OefaCollapsibleComponent {
  private readonly uniqueId = `oefa-collapsible-${nextUniqueId++}`;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() badgeVariant: CollapsibleBadgeVariant = 'neutral';
  @Input() isOpen = false;
  @Input() variant: CollapsibleVariant = 'dashed';
  @Input() disabled = false;
  @Input() ariaLabel = '';

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() toggled = new EventEmitter<boolean>();

  get triggerId(): string {
    return `${this.uniqueId}-trigger`;
  }

  get contentId(): string {
    return `${this.uniqueId}-content`;
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
    this.toggled.emit(this.isOpen);
  }
}
