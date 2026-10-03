# Análisis de Arquitectura de Estilos — OEFA Design System

> **Última revisión:** 2026-09-30
> **Alcance:** `src/styles.scss`, `shared/components/alert/`

---

## 1. El Problema: ¿Hay Duplicidad?

### Situación actual

| Archivo | Qué contiene |
|---|---|
| `src/styles.scss` | Tokens globales (colores, tipografía, radios, motion) **+** clases utilitarias de algunos patrones (`.oefa-alert-banner`, `.oefa-toast`, etc.) |
| `shared/components/alert/alert.component.scss` | Estilos encapsulados del componente `<oefa-alert>` (variantes info, success, warning, error, neutral) |

### Veredicto

**Sí hay duplicidad parcial — pero tiene matices:**

- `styles.scss` tiene `.oefa-alert-banner` (banner de error para formularios/auth).
- `alert.component.scss` tiene `.oefa-alert` (el componente reutilizable Angular).

Son **dos cosas distintas** que comparten el mismo dominio semántico ("alertas"), pero tienen usos diferentes. El problema real no es la duplicidad en sí, sino que **las reglas de cuándo usar cada uno no están documentadas claramente**.

---

## 2. Arquitectura Correcta: Qué va dónde

### `src/styles.scss` → Solo estas responsabilidades

```
1. Design tokens globales (:root { ... })
   - Colores, tipografía, radios, motion, sombras, z-index
   - NUNCA valores hardcoded; solo custom properties CSS

2. Reset / base (body, *, html)

3. Clases utilitarias de layout puro (no semánticas)
   - .oefa-container, .oefa-grid, .sr-only, etc.

4. Estilos de Shell (header, rail, footer) que NO son Angular Components
   - Porque estos afectan al DOM global, no a un componente encapsulado

5. Patrones imperativos (creados por JS / no Angular)
   - Toasts, overlays creados dinámicamente fuera del árbol de componentes
```

### `component.scss` → Siempre que sea un Angular Component

```
- Todo lo que pertenece al selector del componente
- Las variantes internas (info, warning, error, etc.)
- Usa var(--oefa-*) para consumir los tokens, nunca valores hardcoded
```

---

## 3. Qué Debemos Corregir

### Lo que está bien

- `alert.component.scss` — **correcto**. Los estilos del componente `<oefa-alert>` están encapsulados. Consume tokens de `styles.scss` via `var(--oefa-*)`. No hay hardcoding.

### Lo que debe limpiarse

#### `.oefa-alert-banner` en `styles.scss` (líneas 1704–1770)

Esta clase fue creada como patrón global antes de que existiera el componente Angular. Ahora hay dos opciones:

**Opción A (recomendada): Migrar a componente propio**
```
Crear: shared/components/alert-banner/alert-banner.component.ts
Mover los estilos al .scss del componente
Retirar .oefa-alert-banner de styles.scss
```

**Opción B (aceptable si no hay tiempo): Documentar la separación de roles**

Agregar un comentario claro en `styles.scss`:
```scss
/* NOTA: Usar SOLO fuera del árbol Angular (e.g., errores en shell/auth).
   Para formularios Angular, usar siempre: <oefa-alert type="error"> */
.oefa-alert-banner { ... }
```

---

## 4. Regla de Oro para Código Limpio

```
¿El patrón vive dentro de un Angular Component?
  → SÍ → Va en component.scss (encapsulado, con var(--oefa-*))
  → NO → Va en styles.scss SOLO si es global/shell/imperativo

¿Necesito un color o medida específica?
  → SIEMPRE usar var(--oefa-*). NUNCA #hex directo.
```

---

## 5. Acción Inmediata Recomendada

| Prioridad | Acción | Archivo |
|---|---|---|
| Alta | Agregar comentario de rol claro a `.oefa-alert-banner` | `src/styles.scss:1704` |
| Media | Crear `alert-banner.component.ts` y migrar el estilo (Opción A) | `shared/components/alert-banner/` |
| Baja | Documentar en `design-system-oefa.md` la distinción entre `oefa-alert` vs `oefa-alert-banner` | `design-system/design-system-oefa.md` |

---

## 6. Resumen Visual

```
styles.scss
 └── :root { tokens }          ← SIEMPRE aquí
 └── .oefa-alert-banner        ← Pendiente migrar o documentar rol

alert/
 └── alert.component.ts        ← Lógica + template
 └── alert.component.scss      ← Estilos encapsulados CORRECTO
```

La línea visual única se garantiza porque **ambos archivos consumen los mismos tokens**
(`var(--oefa-primary-container)`, `var(--oefa-error-root)`, etc.).
Si cambias un token en `:root`, cambia en todos lados automáticamente.
