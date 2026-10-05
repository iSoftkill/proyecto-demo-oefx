# Plan de Implementación: Estandarización de Métricas OEFA Stat, Reestructuración de Inicio y Acción Rápida Adaptable

**Fecha:** 2026-10-04  
**Proyecto:** `proyecto-demo-oefx` / `oefx-starter-template`  
**Correlativo:** `001`  

---

## 🎯 Objetivos de la Sesión
1. **Auditoría del Layout `oefa-page-layout`:** Diagnosticar la conducta de scroll con `[fit]="true"` vs `[fit]="false"`, resolver la duplicación de paddings entre `.oefa-page-layout-root` y `.workspace-card`, y documentar las directrices en la guía didáctica de desarrollo prohibiendo `calc(100vh - Xpx)`.
2. **Jerarquía Visual en Métricas Institucionales:** Resolver el conflicto visual en el card "OEFA en cifras" donde números a `2.25rem` (30px) competían con el `H1` (24px / 1.5rem), creando el componente compartido tripartito `<oefa-stat>` con 3 escalas (`sm`, `md`, `lg`).
3. **Reestructuración de la Vista Inicio:**
   - Consumir `<oefa-stat size="md">` con Zero CSS.
   - Reorganizar la fila para ubicar "Tableros destacados" en Columna 1 y "OEFA en cifras" junto con una tarjeta de imagen/banner en Columna 2 (`.oefa-grid-2`).
   - Implementar maquetación con `flex: 1` para igualar la altura de ambas columnas automáticamente.
   - Definir patrón accesible WCAG 1.4.5 con texto HTML overlay sobre la imagen sin incrustar tipografía en el mapa de bits.
4. **Shell de Navegación Adaptable:** Parametrizar el botón circular de acción rápida (`+` en escritorio y botón en drawer móvil) mediante signal `showQuickAction` e `@Input()` para habilitarlo u ocultarlo condicionalmente.
5. **Accesibilidad en Navegación por Teclado:** Corregir el recorte visual del anillo de foco (`outline-offset: 2px`) en el riel de navegación agregando `padding-top: 4px` a `.rail-nav`.

---

## 🏗️ Arquitectura y Componentes Involucrados
- **`OefaStatComponent` (Nuevo Componente Tripartito):**
  - `src/app/shared/components/stat/stat.component.ts`
  - `src/app/shared/components/stat/stat.component.html`
  - `src/app/shared/components/stat/stat.component.scss`
  - Exportado en `src/app/shared/index.ts`.
- **Vista Inicio:**
  - `src/app/views/inicio/inicio.component.html`
  - `src/app/views/inicio/inicio.component.scss`
  - `src/app/views/inicio/inicio.component.ts`
- **Shell de Navegación:**
  - `src/app/services/navigation.service.ts`
  - `src/app/components/sidebar-rail/sidebar-rail.component.ts`
  - `src/app/components/sidebar-rail/sidebar-rail.component.html`
  - `src/app/components/sidebar-rail/sidebar-rail.component.css`
  - `src/app/components/mobile-nav-drawer/mobile-nav-drawer.component.ts`
- **Documentación del Sistema:**
  - `design-system/design-system-oefa.md` (§24.5)
  - `000_documentacion/guia-desarrollador-oefa.md` (Ficha 5)
