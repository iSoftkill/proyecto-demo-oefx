# Walkthrough Técnico: Implementación y Sincronización de Métricas, Layout Inicio y Shell Adaptable

**Fecha:** 2026-10-04  
**Proyecto:** `proyecto-demo-oefx` & `oefx-starter-template`  
**Correlativo:** `001`  

---

## 1. Creación del Componente `<oefa-stat>`
Se creó el componente desacoplado para resolver la competencia de tamaño con el encabezado `H1` (24px).

### 1.1 Código TypeScript (`stat.component.ts`)
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OefaIconComponent } from '../icon/icon.component';
import { OefaStatusBadgeComponent, StatusType } from '../status-badge/status-badge.component';

export type StatSize = 'sm' | 'md' | 'lg';
export type StatColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

@Component({
  selector: 'oefa-stat',
  standalone: true,
  imports: [CommonModule, OefaIconComponent, OefaStatusBadgeComponent],
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class OefaStatComponent {
  @Input() value: string | number = '';
  @Input() number?: string | number; // Alias retrocompatible
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() size: StatSize = 'md';
  @Input() color: StatColor = 'primary';
  @Input() badge: string = '';
  @Input() badgeStatus: StatusType = 'neutral';
  @Input() showDivider: boolean = false;

  get displayValue(): string | number {
    return this.value || this.number || '';
  }

  get iconSize(): number {
    switch (this.size) {
      case 'sm': return 16;
      case 'lg': return 24;
      case 'md': default: return 18;
    }
  }
}
```

### 1.2 Estilos Encapsulados (`stat.component.scss`)
```scss
.oefa-stat {
  display: flex;
  align-items: center;
  gap: var(--oefa-spacing-sm, 12px);
  padding: 12px 14px;
  background-color: var(--oefa-surface-subtle, #f8fafc);
  border: 1px solid var(--oefa-border-color-subtle, #f1f5f9);
  border-radius: var(--oefa-radius-md, 10px);
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &.size-sm {
    padding: 8px 10px;
    gap: 8px;
    .stat-number { font-size: 1rem; }
    .stat-label { font-size: 0.6875rem; }
  }

  &.size-md {
    .stat-number { font-size: 1.25rem; } // 20px - Calibrado con H1 (24px)
    .stat-label { font-size: 0.75rem; }
  }

  &.size-lg {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;
    .stat-number { font-size: 1.875rem; } // 30px - Hero banners
  }
}
```

---

## 2. Reestructuración de la Fila de Inicio
Se colocaron en una misma fila (`.oefa-grid-2`) "Tableros destacados" en la columna 1 y "OEFA en cifras" junto con una tarjeta de imagen/banner en la columna 2.

```html
<section aria-label="OEFA en cifras y tableros destacados">
  <div class="oefa-grid-2">
    <!-- Columna 1: Tableros destacados -->
    <oefa-card title="Tableros destacados">
      <div class="destacados-cards-grid">
        @for (item of destacados; track item.title) {
          <a [routerLink]="item.url" class="mini-destacado-card">...</a>
        }
      </div>
    </oefa-card>

    <!-- Columna 2: Cifras y Banner Vertical con flex: 1 -->
    <div class="cifras-column">
      <oefa-card title="OEFA en cifras">
        <div class="oefa-grid-2 oefa-gap-md">
          @for (cifra of cifras; track cifra.label) {
            <oefa-stat [number]="cifra.number" [label]="cifra.label" [icon]="cifra.icon" size="md" />
          }
        </div>
      </oefa-card>

      <oefa-card class="banner-card">
        <div class="banner-content">
          <span class="banner-tag">COMUNICADO</span>
          <h4 class="banner-title">Compromiso con la fiscalización ambiental</h4>
        </div>
      </oefa-card>
    </div>
  </div>
</section>
```

---

## 3. Shell de Navegación Adaptable (Quick Action)
Se parametrizó la acción rápida mediante el signal `showQuickAction`:
- **Desktop:** `@if (shouldShowQuickAction)` en `sidebar-rail.component.html`.
- **Móvil:** `@else if (navService.showQuickAction())` en `mobile-nav-drawer.component.ts`.
- **Accesibilidad:** `padding: 4px 6px 40px;` en `.rail-nav` para evitar el clipping del focus outline superior en navegación por teclado.
