# Tareas Pendientes — Layout, CSS y Estructura Tipo PrimeNG / Material

**Fecha:** 2026-10-01  
**Objetivo:** Consolidar una suite de utilidades de estructura y maquetación nativas (Zero CSS) en el estándar OEFA, cubriendo los casos de uso habituales de librerías como PrimeNG, Angular Material y PrimeFlex.

---

## 1. Utilidades CSS Globales de Maquetación (Estilo PrimeFlex / Tailwind)
*Ubicación: `src/styles.scss`*

- [x] **Alineación y Flexbox utilitario:**
  - `.oefa-justify-between`, `.oefa-justify-center`, `.oefa-justify-end`, `.oefa-justify-start`.
  - `.oefa-align-center`, `.oefa-align-start`, `.oefa-align-end`.
  - `.oefa-flex-wrap`, `.oefa-flex-nowrap`, `.oefa-flex-1`.
- [x] **Visibilidad y Ocultamiento Responsivo:**
  - `.oefa-hide-sm` (ocultar en celulares $< 640px$).
  - `.oefa-hide-md` (ocultar en tablets $< 768px$).
  - `.oefa-only-sm` (visible únicamente en móviles).
  - `.oefa-sr-only` (accesibilidad: solo lectores de pantalla).
- [x] **Tipografía y Helpers de Texto:**
  - `.oefa-text-truncate` (puntos suspensivos en desbordamiento).
  - `.oefa-text-center`, `.oefa-text-right`, `.oefa-text-left`.
  - `.oefa-text-muted`, `.oefa-text-danger`, `.oefa-text-success`.
- [x] **Divisores y Separadores Visuales:**
  - `.oefa-divider` (línea horizontal institucional con tokens `--oefa-border-color`).
  - `.oefa-divider-vertical` (separador vertical para barras de herramientas y menús).
  - Variante con texto al centro: `.oefa-divider-text` (tipo `p-divider`).

---

## 2. Componentes de Estructura y Layout (Estilo Angular Material / PrimeNG)
*Ubicación: `src/app/shared/components/`*

- [x] **Componente `<oefa-page-layout>` (Fase 2 del Plan):**
  - Wrapper completo que combine en un solo llamado:
    - Padding adaptativo `.oefa-page`.
    - Cabecera con título, subtítulo y breadcrumbs (`<oefa-page-header>`).
    - Barra de acciones superior con slot `[actions]`.
    - Contenedor de contenido central sin CSS local.
- [x] **Grid Estructurado de Formularios (`.oefa-form-grid`):**
  - Rejilla adaptativa específica para campos de entrada (`oefa-form-field`).
  - Distribución clásica de 2 y 3 columnas que colapsa a 1 columna en móviles sin desordenar el flujo de lectura (WCAG 1.3.2).
- [x] **Barra de Acciones Inferior Fija (`.oefa-sticky-bar`):**
  - Barra flotante al pie de página para guardar/cancelar en formularios extensos, asegurando contraste y touch targets de 44px.
- [x] **Acordeón Institucional (`<oefa-accordion>`):**
  - Agrupador de paneles plegables (extensión del actual `<oefa-collapsible>`) con soporte para colapsar todos o permitir expansión múltiple.

---

## 3. Productividad y Adopción para Desarrolladores (DX)

- [x] **Snippets Oficiales de VS Code (`.vscode/oefa.code-snippets`):**
  - `oefa-page` $\rightarrow$ Genera estructura completa de página.
  - `oefa-grid` $\rightarrow$ Genera contenedor con 2-4 tarjetas responsivas.
  - `oefa-card` $\rightarrow$ Genera tarjeta con header, body y footer.
  - `oefa-table` $\rightarrow$ Genera tabla con cabecera y paginación institucional.
- [x] **Sincronización en la Guía Interactiva (`/design-system/guia-dev`):**
  - Añadir sección interactiva para el sistema de 12 columnas (`.oefa-row` / `.oefa-col-*`).
  - Añadir visualizador de divisores y helpers de texto.
- [x] **Refactorización de Vistas Existentes (Starter):**
  - Migrar `src/app/views/dashboard/` para que use las nuevas clases globales `.oefa-page` y `.oefa-grid-auto` eliminando líneas de su `.dashboard.component.css`.

---

## 4. Prioridad de Ejecución para Mañana

| Prioridad | Tarea | Esfuerzo Estimado | Impacto |
|:---:|---|:---:|:---:|
| **Alta** | Utilidades Flex y Visibilidad Responsiva en `styles.scss` | 2 horas | Alto (evita CSS ad-hoc en botones y barras) |
| **Alta** | Divisores `.oefa-divider` (horizontal y vertical) | 1 hora | Medio (muy usado en formularios) |
| **Media** | Componente `<oefa-page-layout>` envoltorio | 3 horas | Alto (ahorra maquetar cabeceras a mano) |
| **Media** | Snippets de VS Code `.code-snippets` | 1 hora | Alto (adopción inmediata del equipo) |

---

## 5. Perfeccionamiento Catálogo y Filter Sidebar (Completado 2026-10-02)

- [x] **Split Fijo en Page Layout:** Soporte `[fit]="true"` para desacoplar el scroll del layout y habilitar columnas con canales de scroll independientes.
- [x] **Parametrización en `<oefa-filter-sidebar>`:** `@Input() statusTitle` para títulos de sección dinámicos.
- [x] **Desacople de Status Badges:** Soporte de `@Input() statusLabel` en `<oefa-catalog-card>` y alias `'DESTACADO'` en `status.utils.ts`.
- [x] **Migración Vista y Navegación:** Renombrado completo de `Dashboard` a `Catálogo` (`CatalogoComponent`, `/catalogo` y `NavigationService`).

