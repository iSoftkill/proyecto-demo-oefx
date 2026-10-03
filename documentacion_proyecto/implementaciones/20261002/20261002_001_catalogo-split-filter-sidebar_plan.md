# Plan de Implementación: Catálogo con Split Fijo y Refactorización de Filter Sidebar

**Fecha:** 2026-10-02  
**ID Sesión:** 20261002_001  
**Proyecto:** proyecto-demo-oefx  
**Estado:** Finalizado  

---

## 1. Objetivos de la Sesión
1. **Resolver comportamiento de scroll en Filter Sidebar:**
   - Evitar que el sidebar crezca indefinidamente empujando el scroll de toda la página (`.oefa-page-layout-body`).
   - Implementar un diseño de **Split Fijo** con columnas y canales de scroll independientes (sidebar fijo con scroll interno y catálogo con scroll propio).
2. **Parametrizar títulos y etiquetas en componentes compartidos:**
   - Hacer configurable el título del bloque de estados en `<oefa-filter-sidebar>` mediante `@Input() statusTitle` para no forzar "Estado del Expediente".
   - Permitir etiquetas arbitrarias en `<oefa-catalog-card>` desacopladas del estado semántico mediante `@Input() statusLabel`, evitando que textos como "Destacado" rompan el color semántico de advertencia/peligro.
3. **Refactorización Integral de Vista y Navegación:**
   - Renombrar la vista `Dashboard` a `Catálogo` (`CatalogoComponent`, selectores, estilos y rutas `/catalogo`).
   - Actualizar el servicio de navegación `NavigationService` y enlaces de migas de pan y launcher.

---

## 2. Enfoque Técnico y Decisiones de Arquitectura

### 2.1 Layout Split Fijo (`[fit]="true"`)
- **Problema previo:** Con `[fit]="false"`, el contenedor padre `.oefa-page-layout-body` tiene `overflow-y: auto`. Si el sidebar o el catálogo superan la altura de la ventana, la página entera se desplaza, perdiendo la visibilidad fija de los filtros y controles superiores.
- **Solución elegida (Opción 1):** Activar `[fit]="true"` en `<oefa-page-layout>` para anular el scroll vertical global del viewport del layout.
- **Estructura flex interna:**
  - `.tableros-layout`: `height: 100%; display: flex; flex-direction: column; overflow: hidden;`.
  - Fila de dos columnas con `flex: 1 1 0; min-height: 0; display: flex; align-items: stretch;`.
  - `.tableros-sidebar-column`: ancho fijo (`312px`), `height: 100%; flex-shrink: 0;`.
  - `.tableros-content-column`: `flex: 1 1 auto; height: 100%; overflow-y: auto; overscroll-behavior: contain;`.

### 2.2 Desacople Semántico de Status Badge
- En `status.utils.ts`, registrar `DESTACADO` y `FEATURED` mapeados a clase `danger` (ámbar / advertencia) y label `"Destacado"`.
- En `catalog-card.component.ts`, exponer `@Input() statusLabel?: string` y pasar `[label]="statusLabel"` a `<oefa-status-badge>`. Si no se provee, mantiene retrocompatibilidad resolviendo desde el estado.

### 2.3 Renombrado de Rutas y Vista
- Mover directorio `src/app/views/dashboard/` a `src/app/views/catalogo/`.
- Renombrar componente a `CatalogoComponent` con selector `app-catalogo`.
- Actualizar `app.routes.ts`, `navigation.service.ts` e `inicio.component.ts`.
