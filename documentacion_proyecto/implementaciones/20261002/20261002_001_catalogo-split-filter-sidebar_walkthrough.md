# Walkthrough Técnico: Catálogo con Split Fijo y Refactorización de Filter Sidebar

**Fecha:** 2026-10-02  
**ID Sesión:** 20261002_001  
**Proyecto:** proyecto-demo-oefx  
**Estado:** Finalizado con éxito  

---

## 1. Problema 1: Scroll de la página con Filter Sidebar

### Causa
En el template de la vista Catálogo (anteriormente Dashboard), `<oefa-page-layout>` se utilizaba sin el atributo `[fit]="true"`. La clase CSS `.oefa-page-layout-body` tiene por defecto `overflow-y: auto`. Cuando el sidebar de filtros (`<oefa-filter-sidebar>`) tenía más contenido o se fijaba con altura calculada de viewport, la página completa hacía scroll.

### Solución Implementada: Split Fijo
1. Se activó `[fit]="true"` en el componente de layout:
```html
<oefa-page-layout
  pageTitle="Catálogo de Tableros y Reportes BI"
  [breadcrumbItems]="breadcrumbs"
  [fit]="true">
```
2. Se estructuró el contenedor `.tableros-layout` y sus columnas para que ambas tomen el 100% de la altura sin desbordar el contenedor raíz:
```scss
.tableros-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tableros-columns {
  display: flex;
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
  align-items: stretch;
}

.tableros-sidebar-column {
  width: 312px;
  flex-shrink: 0;
  height: 100%;
}

.tableros-content-column {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```
3. En `filter-sidebar.component.scss`, se reforzó la contención flex:
```scss
:host {
  display: block;
  height: 100%;
  max-height: 100%;
  min-height: 0;
}

.filter-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  min-height: 0;
}

.fs-scrollable-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

---

## 2. Problema 2: Status Badge azul al personalizar etiqueta

### Causa
`<oefa-status-badge>` infería su apariencia y etiqueta del input `status`. Si se pasaba una etiqueta personalizada como `"Destacado"`, la función `getStatusBadgeClass` en `status.utils.ts` no encontraba coincidencia en su switch y caía en el fallback por defecto `'info'` (color azul).

### Solución Implementada
1. En `status.utils.ts`:
```typescript
case 'DESTACADO':
case 'FEATURED':
  return 'danger'; // Ámbar / advertencia en el sistema de diseño OEFA
```
2. En `catalog-card.component.ts`:
```typescript
@Input() statusLabel?: string;
```
3. En `catalog-card.component.html`:
```html
<oefa-status-badge
  *ngIf="status"
  [status]="status"
  [label]="statusLabel">
</oefa-status-badge>
```

---

## 3. Parametrización de `statusTitle` en Filter Sidebar
Se eliminó el texto estático `"Estado del Expediente"` de `filter-sidebar.component.html`:
```typescript
// filter-sidebar.component.ts
@Input() statusTitle: string = 'Estado del Expediente';
```
```html
<!-- filter-sidebar.component.html -->
<span class="fs-section-title">{{ statusTitle }}</span>
```

---

## 4. Renombrado de Rutas y Vista a Catálogo
- Carpeta `src/app/views/dashboard/` renombrada a `src/app/views/catalogo/`.
- Archivos renombrados a `catalogo.component.ts`, `catalogo.component.html`, `catalogo.component.scss`.
- Selector: `app-catalogo`.
- Rutas actualizadas en `app.routes.ts`:
```typescript
{
  path: 'catalogo',
  loadComponent: () => import('./views/catalogo/catalogo.component').then(m => m.CatalogoComponent)
},
{ path: 'dashboard', redirectTo: 'catalogo', pathMatch: 'full' }
```
- Menú de navegación actualizado en `navigation.service.ts`:
```typescript
{
  id: 'catalogo',
  label: 'Catálogo',
  icon: 'pi-th-large',
  route: '/catalogo',
  badge: '12'
}
```

---

## 5. Verificación de Compilación
Se ejecutó `npm run build` con resultado exitoso:
```
Application bundle generation complete. [7.632 seconds]
Output: dist/proyecto-demo-oefx
```
