# Checklist de Tareas (Task): Estandarización de Métricas OEFA Stat y Shell Adaptable

**Fecha:** 2026-10-04  
**Proyecto:** `proyecto-demo-oefx` / `oefx-starter-template`  
**Correlativo:** `001`  

---

## Fases y Checklist de Ejecución

- [x] **1. Diagnóstico y Corrección de Scroll / Padding en `oefa-page-layout`**
  - [x] Explicar la diferencia funcional de `[fit]="true"` (Split Fijo sin scroll de ventana) vs `[fit]="false"` (scroll vertical natural con padding institucional).
  - [x] Corregir duplicación de márgenes en `.oefa-page-layout-root` asegurando `padding: 0 !important` cuando `fit` es false para alinear con `.workspace-card`.
  - [x] Documentar la regla didáctica en `guia-desarrollador-oefa.md` prohibiendo `calc(100vh - Xpx)`.

- [x] **2. Creación del Componente Compartido `<oefa-stat>`**
  - [x] Crear estructura tripartita en `src/app/shared/components/stat/` (`.ts`, `.html`, `.scss`).
  - [x] Implementar inputs: `value`/`number`, `label`, `icon`, `size` (`sm` 16px, `md` 20px, `lg` 30px), `color`, `badge`, `badgeStatus`.
  - [x] Replicar y sincronizar componente en `oefx-starter-template/src/app/shared/components/stat/`.
  - [x] Exportar en `src/app/shared/index.ts` en ambos repositorios.
  - [x] Documentar API en `design-system-oefa.md` (§24.5) y `guia-desarrollador-oefa.md` (Ficha 5).

- [x] **3. Rediseño de Vista Inicio**
  - [x] Integrar `<oefa-stat size="md">` en card "OEFA en cifras" con Zero CSS.
  - [x] Reestructurar fila compartida `.oefa-grid-2`: Columna 1 (Tableros destacados), Columna 2 (OEFA en cifras + Card imagen vertical).
  - [x] Implementar clase `.cifras-column` con `flex: 1` para igualar alturas automáticamente.
  - [x] Definir maquetación accesible para la tarjeta de imagen con texto HTML superpuesto (`.banner-tag`, `.banner-title`, gradiente oscuro para contraste WCAG AA).

- [x] **4. Acción Rápida Adaptable en Shell de Navegación**
  - [x] Añadir signal `showQuickAction` y setter en `NavigationService` en ambos proyectos.
  - [x] Condicionar botón `+` en `sidebar-rail.component.html` con `@if (shouldShowQuickAction)` y `@Input() showQuickAction` en `sidebar-rail.component.ts`.
  - [x] Condicionar botón "Nueva Orden" en `mobile-nav-drawer.component.ts` con `@else if (navService.showQuickAction())`.
  - [x] Sincronizar en `oefx-starter-template`.

- [x] **5. Accesibilidad de Navegación por Teclado**
  - [x] Corregir recorte visual del anillo de foco (`outline-offset: 2px`) en el primer ítem del riel añadiendo `padding: 4px 6px 40px;` en `.rail-nav`.
  - [x] Sincronizar cambio en `oefx-starter-template`.

- [x] **6. Verificación y Calidad**
  - [x] Ejecutar `ng build --configuration development` con 0 errores de compilación.
