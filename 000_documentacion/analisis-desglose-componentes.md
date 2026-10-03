# Análisis de Arquitectura: Archivo Único vs. Desglose en Componentes Reutilizables

> **Fecha:** 2026-10-01  
> **Alcance:** `src/app/shared/components/` (35 componentes)  
> **Referencia Técnica:** `.agents/skills/oefa-design-system/SKILL.md` y `design-system/design-system-oefa.md`

---

## 1. Veredicto Ejecutivo

**Se debe desglosar.** Mantener los componentes en un solo archivo (`.component.ts` monolítico con HTML y CSS embebidos en strings) es insostenible y contradice las directrices del propio Design System de OEFA.

### Diagnóstico de la Situación Actual

Actualmente coexisten **3 enfoques inconsistentes** en los 35 componentes:

| Enfoque | Cantidad | Descripción | Ejemplos Críticos |
|---|:---:|---|---|
| **Monolito 100% Inline (SFC)** | **23** | Template (`template: \`...\``) y Estilos (`styles: [\`...\`\`) embebidos en el `.ts`. | `app-launcher` (1,120 líneas), `date-range-picker` (895 líneas), `filter-sidebar` (803 líneas), `stepper` (533 líneas), `file-uploader` (493 líneas). |
| **Híbrido (Inline HTML + SCSS/CSS)** | **10** | Template inline en `.ts`, pero estilos en archivo externo `.scss` o `.css`. | `alert` (`.ts` + `.scss`), `segmented-switch` (`.ts` + `.scss`), `date-picker` (`.ts` + `.css`), `drawer`, `form-field`. |
| **Desglosado Estándar (TS + HTML + CSS)** | **2** | Archivos separados para template, estilos y lógica. | `table` (`.html`, `.css`, `.ts`), `user-menu` (`.html`, `.css`, `.ts`). |

---

## 2. Por qué el archivo único actual es perjudicial

1. **Conflicto directo con la guía de estilos OEFA (`SKILL.md`, Sección 2):**
   - El estándar indica expresamente: `component.scss → Siempre que sea un Angular Component`. Embeber hasta 600 líneas de estilos dentro de `styles: [\`...\`]` dentro del `.ts` impide el uso adecuado de la precompilación Sass y anula las auditorías de tokens.
2. **Pérdida de tooling y calidad de código:**
   - **CSS/SCSS embebido:** No tiene soporte de `stylelint`, no valida errores de compilación Sass en tiempo de desarrollo y pierde el autoformateo de Prettier.
   - **HTML embebido en plantillas extensas:** Limita el resaltado sintáctico, la detección de atributos rotos y la optimización del Angular Language Service.
3. **Mantenibilidad crítica:**
   - En componentes como `app-launcher.component.ts` (1,120 líneas), los desarrolladores deben navegar cientos de líneas de CSS en texto plano antes de llegar a la lógica TypeScript o al template.
4. **Inconsistencia de formato de estilos:**
   - Hay componentes usando `.css` plano (`date-picker`, `table`, `toast`, `user-menu`) y otros usando `.scss` (`alert`, `dropdown`, `segmented-switch`). El estándar institucional debe ser **100% SCSS**.

---

## 3. Estándar Objetivo de Desglose

Cada componente compartido en `src/app/shared/components/<nombre>/` debe seguir la estructura:

```
src/app/shared/components/<nombre>/
├── <nombre>.component.ts         # Lógica pura, Inputs/Outputs, Signals, inyecciones
├── <nombre>.component.html       # Estructura semántica, accesibilidad ARIA
├── <nombre>.component.scss       # Estilos encapsulados con variables var(--oefa-*)
└── <nombre>.models.ts            # (Opcional) Si contiene tipos/interfaces > 30 líneas
```

> **Excepción controlada (Micro-componentes primitivos):**  
> Componentes atómicos con menos de 20 líneas de template y sin lógica (ej: `dot-badge`, `skeleton`, `chip`) pueden mantener el template inline si se prefiere, pero **sus estilos siempre deben ir a su `.component.scss`** o depender de clases utilitarias de `styles.scss`. Para máxima homogeneidad, se recomienda desglosar los 35 por igual.

---

## 4. Plan de Acción Recomendado (Hoja de Ruta)

### Fase 1: Desglose de Monolitos Críticos (> 400 líneas) — [COMPLETADO]
- [x] `app-launcher` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)
- [x] `date-range-picker` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)
- [x] `filter-sidebar` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)
- [x] `stepper` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)
- [x] `file-uploader` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)
- [x] `bento-kpi-tile` (desglosado en `.ts`, `.html`, `.scss`, `.models.ts`)

### Fase 2: Desglose de Componentes Medios (200 - 400 líneas) — [COMPLETADO]
- [x] `catalog-card` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `process-card` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `collapsible` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `modal` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `selection-card` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `icon` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `tabs` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `page-header` (desglosado en `.html`, `.scss`, `.ts`)
- [x] `info-tooltip` (desglosado en `.html`, `.scss`, `.ts`)

### Fase 3: Homogeneización de Componentes Híbridos y Migración CSS → SCSS — [COMPLETADO]
- [x] Migración `.css` a `.scss`: `date-picker`, `table`, `toast`, `user-menu`.
- [x] Extracción de `.html` y vinculación tripartita: `alert`, `drawer`, `dropdown`, `form-field`, `segmented-switch`, `kpi-card`, `icon-button`.

### Fase 4: Micro-componentes y Barrido Final (< 150 líneas) — [COMPLETADO]
- [x] Extracción `.html`, `.scss` y actualización `.ts`: `button`, `pagination`, `progress-bar`, `status-badge`, `spinner`, `chip`, `dot-badge`, `skeleton`, `empty-state`.

### Fase 5: Actualización de la Guía y Skill — [COMPLETADO]
- [x] Directriz tripartita estandarizada en [SKILL.md](file:///Users/jalvareza/Desktop/labOefa/oefx-starter-template/.agents/skills/oefa-design-system/SKILL.md) y [design-system-oefa.md](file:///Users/jalvareza/Desktop/labOefa/oefx-starter-template/design-system/design-system-oefa.md).

---

## 5. Estado Final del Proyecto

**100% de los componentes compartidos (`src/app/shared/components/`) han sido homogeneizados.**
- Estructura tripartita estricta aplicada (`.ts`, `.html`, `.scss` y `.models.ts`).
- 0 archivos `.css` residuales (todos migrados a `.scss`).
- 0 plantillas HTML embebidas o inline en archivos `.ts`.
- Compilación `npm run build` ejecutada con éxito (código de salida 0).
