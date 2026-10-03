---
name: oefa-dev-guide-manager
description: >
  Generador y sincronizador de guías didácticas y documentación técnica para desarrolladores en OEFA.
  Estandariza la explicación de componentes y utilidades globales mediante técnicas pedagógicas
  (problema/solución, snippets copiables "Zero CSS", tablas de equivalencias PrimeNG/Bootstrap y actualización de vistas).
---

# OEFA Developer Guide Manager — Guía y Técnica de Documentación

## 1. Propósito y Filosofía
Esta skill tiene como objetivo **eliminar la fricción de adopción** en los desarrolladores que construyen módulos en OEFA. Transforma especificaciones de diseño en guías prácticas, claras y de uso inmediato.

> **Principio Clave:** El programador no debe necesitar inspeccionar código fuente interno ni escribir CSS local para casos estándar. Todo se documenta con snippets listos para copiar y pegar.

---

## 2. Técnica Pedagógica de Documentación (Estructura de 4 Pasos)
Cada vez que se documente un componente, clase global o patrón de maquetación, debe seguirse estrictamente este formato:

### Paso 1: El Problema / Fricción Habitual
Explicar en 1 o 2 líneas el antipatrón que se busca erradicar (ej. *crear clases `.modulo-container` en archivos CSS locales*, *hacer tarjetas a mano*, *usar `p-button` de librerías externas*).

### Paso 2: La Solución Institucional OEFA
Indicar la etiqueta o clase global oficial:
- **Clase utilitaria global** (ej: `.oefa-page`, `.oefa-grid-auto`, `.oefa-card`).
- **Componente Angular compartido** (ej: `<oefa-card>`, `<oefa-page-header>`, `<oefa-button>`).

### Paso 3: Snippet Copiable "Zero CSS"
Proveer un bloque de código HTML/TS autocontenido, formateado y listo para usar en plantillas:
```html
<!-- Ejemplo estándar: Cero CSS requerido -->
<div class="oefa-page">
  <oefa-page-header title="Gestión de Expedientes" subtitle="Módulo Digital OEFA" />
  
  <div class="oefa-grid-auto">
    <oefa-card title="Expediente N° 2026-001" subtitle="En Evaluación">
      <p>Detalle del informe técnico preliminar...</p>
      <div card-footer>
        <oefa-button variant="primary" size="small">Ver Detalle</oefa-button>
      </div>
    </oefa-card>
  </div>
</div>
```

### Paso 4: Ficha Técnica (API + Accesibilidad WCAG)
Tabla concisa con inputs, outputs, slots y cumplimiento de accesibilidad:

| Atributo / Slot | Tipo | Default | Descripción |
|---|---|---|---|
| `[title]` | `string` | `undefined` | Título institucional de la tarjeta. |
| `[interactive]` | `boolean` | `false` | Habilita foco por teclado, rol semántico y hover. |
| `[card-footer]` | `ng-content` | — | Área alineada para acciones o metadatos. |
| **Accesibilidad** | — | — | Cumple WCAG 1.4.10 (Reflow) y WCAG 2.4.13 (Focus). |

---

## 3. Matriz de Equivalencias (Cheat Sheet para Desarrolladores)
Cuando los desarrolladores vengan con familiaridad en librerías externas (ej. PrimeNG, Bootstrap o Tailwind), usar siempre esta tabla comparativa:

| Patrón Tradicional / Externo | Equivalente Estándar OEFA | Tipo |
|---|---|---|
| Contenedor de página con header y breadcrumbs | `<oefa-page-layout title="..." [breadcrumbs]="...">` | Componente Compartido |
| `<div class="p-grid">` / `<div class="row">` | `<div class="oefa-grid-auto">` o `<div class="oefa-row">` | Clase Global en `styles.scss` |
| `<div class="col-12 col-md-6">` / `.p-col-6` | `<div class="oefa-col-12 oefa-col-md-6">` | Clase Global en `styles.scss` |
| Rejilla de formulario 2/3 columnas | `<div class="oefa-form-grid">` / `.oefa-form-grid-3` | Clase Global en `styles.scss` |
| `<p-card>` / `.card` armado a mano | `<oefa-card>` o `<div class="oefa-card">` | Componente / Clase Global |
| `<p-accordion>` / paneles plegables | `<oefa-accordion>` + `<oefa-collapsible>` | Componente Compartido |
| `p-divider` / `<hr>` | `.oefa-divider`, `.oefa-divider-text`, `.oefa-divider-vertical` | Clase Global en `styles.scss` |
| Barra inferior fija (guardar / cancelar) | `<div class="oefa-sticky-bar">` | Clase Global en `styles.scss` |
| `.p-4` / padding local en componente `.css` | `<div class="oefa-page">` | Clase Global en `styles.scss` |
| `<p-button>` / `<button class="btn btn-primary">` | `<oefa-button variant="primary">` | Componente Compartido |
| `<p-table>` básico | `<oefa-table>` / `.data-table` | Componente Compartido |
| `<p-tag>` / `<span class="badge">` | `<oefa-status-badge>` | Componente Compartido |


---

## 4. Flujo de Trabajo para Documentar Avances
Al crear o modificar cualquier componente o utilidad en el Design System:

1. **Identificar la necesidad del programador:** ¿Qué parte solía hacer manual o en qué se confundía?
2. **Redactar la ficha pedagógica** con la estructura de 4 pasos (sección 2 de esta guía).
3. **Actualizar la vista de documentación interactiva:**
   - Registrar el nuevo ejemplo o snippet en `src/app/views/design-system/` para que pueda verse y probarse en vivo con `npm start`.
4. **Verificar compilación:** Correr `npx ng build --no-progress` para asegurar que los snippets sean sintácticamente válidos en Angular 22.

---

## 5. Reglas de Calidad Didáctica
- **Prohibido snippets incompletos:** Siempre incluir etiquetas de cierre y dependencias importables si aplica.
- **Enfocarse en HTML y TS:** Evitar pedirle al desarrollador que agregue selectores CSS propios para tareas estructurales.
- **Tono directo y pragmático:** Explicar el "cómo se usa ya" antes que la teoría de diseño interno.
