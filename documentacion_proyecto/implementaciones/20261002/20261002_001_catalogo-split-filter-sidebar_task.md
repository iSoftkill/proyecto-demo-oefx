# Checklist de Tareas: Catálogo con Split Fijo y Refactorización de Filter Sidebar

**Fecha:** 2026-10-02  
**ID Sesión:** 20261002_001  
**Proyecto:** proyecto-demo-oefx  
**Estado:** Completado (100%)  

---

## Tareas Ejecutadas

- [x] **Auditoría de scroll en Filter Sidebar**
  - [x] Detectar por qué `.filter-sidebar` provocaba scroll vertical en toda la página (`.oefa-page-layout-body`).
  - [x] Evaluar alternativas (Opción 1: Split Fijo vs Opción 2: Sticky Window Scroll).
  - [x] Decisión de diseño: Seleccionar **Opción 1: Split Fijo**.

- [x] **Ajustes de estructura interna en `<oefa-filter-sidebar>`**
  - [x] Configurar `:host` y `.filter-sidebar` con `height: 100%`, `max-height: 100%`, `display: flex`, `flex-direction: column`, `min-height: 0`.
  - [x] Fijar `.fs-header` y `.fs-sticky-footer` con `flex-shrink: 0`.
  - [x] Configurar `.fs-scrollable-body` con `flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain;`.
  - [x] Añadir `@Input() statusTitle: string = 'Estado del Expediente'` en `filter-sidebar.component.ts` y enlazar en `filter-sidebar.component.html`.

- [x] **Desacople semántico de badges en `<oefa-catalog-card>` y utilidades de estado**
  - [x] Diagnosticar por qué al pasar `'DESTACADO'` o cambiar el label se tornaba azul (`info`).
  - [x] Registrar alias `'DESTACADO'` y `'FEATURED'` mapeados a `'danger'` (ámbar) en `status.utils.ts`.
  - [x] Añadir `@Input() statusLabel?: string` en `catalog-card.component.ts`.
  - [x] Vincular `[label]="statusLabel"` en `catalog-card.component.html`.

- [x] **Actualización del catálogo del Sistema de Diseño OEFA**
  - [x] Documentar el patrón Split Fijo y tabla de API de `<oefa-filter-sidebar>` y `<oefa-catalog-card>` en `design-system-oefa.md`.
  - [x] Sincronizar tokens `--oefa-filter-sidebar-top` y `--oefa-filter-sidebar-max-height` en `design-tokens.json` y `styles.scss`.

- [x] **Renombrado y refactorización integral de la vista Dashboard a Catálogo**
  - [x] Mover y renombrar archivos de `src/app/views/dashboard/` a `src/app/views/catalogo/`.
  - [x] Renombrar clase a `CatalogoComponent` y selector a `app-catalogo`.
  - [x] Aplicar layout split fijo con `[fit]="true"` en `<oefa-page-layout>` dentro de `catalogo.component.html`.
  - [x] Ajustar estilos en `catalogo.component.scss` para dos columnas con canales de scroll independientes.
  - [x] Actualizar `app.routes.ts` (`/catalogo` y redirección desde `/dashboard`).
  - [x] Actualizar `navigation.service.ts` (`id: 'catalogo'`, `label: 'Catálogo'`, `route: '/catalogo'`).
  - [x] Actualizar referencias de rutas en `inicio.component.ts`, `inicio.component.html`, `configuraciones.component.ts`, `app-launcher.component.ts` y vistas del design system.

- [x] **Validación y compilación**
  - [x] Ejecutar `npm run build` verificando 0 errores de compilación TypeScript/SCSS.
