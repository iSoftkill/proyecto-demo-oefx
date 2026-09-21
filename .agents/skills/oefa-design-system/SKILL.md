---
name: oefa-design-system-manager
description: >
  Guía completa para el uso, creación y actualización de componentes y estilos en OEFA.
  Audita si un componente ya existe en el catálogo para consumirlo según sus directrices,
  o evalúa si un nuevo componente/cambio debe ser local o registrarse en el estándar global
  (design-system-oefa.md, design-tokens.json, styles.scss, shared/components).
---

# OEFA Design System — Guía de Consumo y Alcance

## 1. Índice de fuentes del sistema

| # | Recurso | Ruta | Propósito |
|---|---------|------|-----------|
| **1** | `design-system-oefa.md` | `/design-system/design-system-oefa.md` | Directrices de uso, reglas, variantes, accesibilidad y catálogo documentado. |
| **2** | `design-tokens.json` | `/design-system/design-tokens.json` | Tokens y valores numéricos (colores, tipografía, spacing, breakpoints). |
| **3** | `styles.scss` | `/frontend/src/styles.scss` | Clases utilitarias globales, variables CSS y mixins globales. |
| **4** | `shared/components/` | `/frontend/src/app/shared/components/` | Componentes Angular reutilizables implementados (button, modal, table, tabs, etc.). |
| **5** | Vista demo | `/frontend/src/app/views/design-system/` | Ejemplos vivos de implementación y uso de los componentes. |

> **Regla de oro:** 
> 1. **Nunca reinventes:** Si ya existe en `shared/components/` o `styles.scss`, úsalo directamente.
> 2. Si un patrón se usará en 2+ vistas o proyectos, debe promoverse a global en los 3 archivos base.

---

## 2. Flujo de trabajo

### PASO 0 — Auditar y consumir antes de crear

Cuando se pida una UI o componente:

1. **Revisar si ya existe:**
   - Consulta el catálogo en `shared/components/` (ej: `button`, `chip`, `table`, `tabs`, `modal`, `date-picker`, etc.).
   - Revisa si existe como clase utilitaria en `styles.scss` (ej: `.oefa-badge`, `.oefa-card`).
   - Revisa directrices y ejemplos en `design-system-oefa.md` y `views/design-system/`.
2. **Si el componente existe:**
   - **Consúmelo directamente** importándolo en el módulo/componente correspondiente.
   - Sigue sus `inputs`, `outputs` y variantes ya establecidas.
   - Si requieres un ajuste menor visual solo para esa pantalla, hazlo mediante override local en `*.component.css` sin alterar el compartido.
   - **FIN DEL FLUJO**.
3. **Si el componente no existe o requiere una variante global nueva:**
   - Pasa al **PASO 1**.

---

### PASO 1 — Clasificar el nuevo elemento o cambio

Hazte estas preguntas:

1. **¿Es un componente reutilizable entre pantallas?**
   - Sí → Crear en `/frontend/src/app/shared/components/<nombre>` y documentar en `design-system-oefa.md`.
2. **¿Es un nuevo token/valor global** (color, espaciado, radio, breakpoint)?
   - Sí → Actualizar `design-tokens.json` y variables en `styles.scss`.
3. **¿Es una regla de diseño, interacción o accesibilidad general?**
   - Sí → Documentar en `design-system-oefa.md`.
4. **¿Aplica únicamente a una pantalla específica y no es reusable?**
   - Sí → Implementar exclusivamente en el componente local (`*.component.ts`, `*.component.html`, `*.component.css`).

---

### PASO 2 — Tabla de decisión rápida

| Tipo de cambio | Shared Component | #1 MD | #2 JSON | #3 SCSS | Componente Local |
|---|:---:|:---:|:---:|:---:|:---:|
| Uso de componente existente | Consumir | — | — | — | Importar/Usar |
| Nuevo componente global | ✅ Crear | ✅ | ✅ (tokens) | ✅ (si aplica) | — |
| Nueva variante global | ✅ Extender | ✅ | ✅ | si aplica | — |
| Nuevo color / spacing / token | — | — | ✅ | ✅ | — |
| Nueva regla WCAG o interacción | — | ✅ | — | si aplica | — |
| Override de variante local | — | — | — | — | ✅ override |
| Layout / Vista específica | — | — | — | — | ✅ |

---

### PASO 3 — Orden de actualización al crear/modificar estándar

```
1. design-system-oefa.md  → Documenta la REGLA, inputs/outputs o patrón.
2. design-tokens.json     → Registra VALORES o tokens nuevos si aplica.
3. styles.scss            → Aplica variables Sass/CSS y clases globales.
4. shared/components/     → Implementa/extiende el componente Angular compartido.
5. *.component.css        → Solo overrides de variante local si aplica.
```

---

## 3. Notas y restricciones

- **Nunca duplicar clases globales** dentro de `*.component.css`.
- **Comentar overrides locales:** `/* Variante: [nombre] — estándar global en styles.scss */`.
- **Sincronización estricta:** Si se añade un token o componente compartido, actualizar siempre `design-system-oefa.md` y `design-tokens.json`.
