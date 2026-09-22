# Design System OEFA — Fundaciones

Sistema de diseño **general**, no atado a un proyecto. Cualquier sistema institucional que use el shell de referencia (header + sidebar de 3 estados que compartiste) debe partir de este documento y de `design-tokens.json`. Lo específico de un proyecto puntual (ej. Control de Pagos de Entregables) vive en un documento aparte que *extiende* esto, nunca lo reemplaza.

> Los valores de marca (colores raíz, Poppins) vienen de ti / del Manual de Identidad OEFA. Todo lo demás (tonal ramps, tamaños, reglas de contraste, estructura) es la propuesta técnica que sustenta ese material de marca en un producto de software real.

---

## 1. Principios
1. **Institucional y sobrio** — el color no decora, informa (estado, jerarquía, urgencia).
2. **Denso pero legible** — optimizado para tablas, formularios y flujos de trabajo, no para páginas de marketing.
3. **Accesible por defecto** — todo color/tamaño/contraste cumple WCAG 2.2, nunca como capa aparte al final.
4. **Un solo lenguaje visual entre sistemas** — un usuario que use dos sistemas OEFA distintos con este shell no debe notar que son productos diferentes.

---

## 2. Color

### 2.1 Roles (M3-like, ya validado como enfoque correcto)
Tu clasificación (Primary/Secondary/Tertiary + Container + On + Alto Contraste, más Success/Error) sigue correctamente el patrón de Material Design 3. Es el patrón correcto para un sistema que necesita *muchos* estados semánticos (como los estados de entregable que ya definimos en el proyecto). Los valores corregidos y completos están en `design-tokens.json`; aquí el criterio de **cuándo usar cada uno**:

| Rol | Uso |
|---|---|
| **Primary** | Acción principal (botón primario), elemento activo/seleccionado, foco de teclado, enlaces |
| **Primary Container** | Fondo de tarjetas informativas, superficies grandes relacionadas a "información" |
| **Primary Container Alto Contraste** | Badges/chips pequeños — más saturado que el Container normal, para que el texto pequeño no pierda legibilidad |
| **Secondary** | Acentos de marca, elementos secundarios de navegación — **nunca** para botones de acción (compite con Primary) |
| **Tertiary (Warning)** | Advertencias — nunca como color de texto/ícono pequeño sobre blanco directamente (ver 2.2) |
| **Success** | Confirmaciones, estados "completado" |
| **Error** | Errores, acciones destructivas, estados de fallo |
| **Surface / Surface Container** | Fondos de aplicación (header, rail) vs. fondos de contenido |

### 2.2 Corrección importante: colores de marca vs. colores de UI
`FFB500` (Tertiary) y `8CCD3A` (Success) tienen **muy bajo contraste sobre blanco** (1.77:1 y 1.97:1 respectivamente — el mínimo WCAG es 3:1 para íconos/gráficos y 4.5:1 para texto). Esto confirma tu sospecha: están pensados para superficies grandes (posters, fondos de card), no para texto/ícono pequeño sobre blanco.

**Regla**: cada color de marca tiene ahora dos usos posibles:
- **Tono de marca** (el hex original): fondos de container grandes, ilustración, elementos decorativos de área amplia.
- **Tono UI-seguro** (mismo matiz, luminosidad ajustada, calculado para ≥4.5:1 sobre blanco): la única versión permitida para texto, íconos pequeños o bordes finos sobre fondo blanco.

Ver tabla exacta en `design-tokens.json` (`uiSafe` dentro de cada color).

### 2.3 Tonal ramps
Para Primary, Secondary, Tertiary, Success, Error y Neutros se generaron rampas tonales completas (pasos 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99 en formato `--oefa-[role]-[step]`).
- **10–20**: Textos legibles sobre contenedores pasteles / Dark Mode surfaces ultra profundas.
- **30–40**: Tonos base institucionales oscuros (ej. `--oefa-primary-root` #144AA7 es tonal 40).
- **50–60**: Colores de marca y hover activo.
- **70–80**: Acentos luminosos para Modo Oscuro y Contenedores Alto Contraste (`container-hc`).
- **90–95**: Fondos suaves y contenedores pasteles (`container` #EEF4FF, #F7FFEE, #FFF0CC, #FFEFF1).
- **99**: Tintes sutiles para tarjetas informativas y hovers suaves.

Visualización en vivo disponible en la ruta: `/design-system/colores`.

### 2.4 Regla de contraste
Todo texto/ícono sobre color exige verificación real de contraste (4.5:1 texto normal, 3:1 texto grande ≥18px o ícono/gráfico) — no asumir por apariencia. Los tokens ya vienen verificados en `design-tokens.json`.

---

## 3. Tipografía

### 3.1 Roles de familia
| Rol | Fuente | Uso |
|---|---|---|
| `fontFamily.display` | **Poppins** | H1–H4, títulos de página, cabecera de card, títulos de sección |
| `fontFamily.body` | **Inter** (propuesta — ver justificación abajo) | Párrafos, tablas, formularios, botones, badges/chips, H5/labels |
| `fontFamily.fallback` | Arial → `system-ui` | Fallback de ambos roles si la fuente no carga |

**Por qué Inter y no mantener todo en Poppins**: Poppins es una geométrica de carácter fuerte, ideal para títulos donde la personalidad de marca importa. Pero en un sistema con tablas de montos, fechas y códigos (SIGED, N° OS/OC), la legibilidad a 12-14px y los **números tabulares** (que alinean en columna) importan más que la personalidad — ahí Inter es superior y es el estándar de facto en productos SaaS (Linear, Notion, GitHub). Poppins se reserva donde realmente se lee "de un vistazo" (títulos), no donde se escanea una tabla.

### 3.2 Correcciones a la escala tipográfica que enviaste
Ver el detalle completo y los valores corregidos en `design-tokens.json`. Resumen de los cambios de criterio:

| Problema detectado | Corrección propuesta |
|---|---|
| `H5` (14px) casi igual a párrafo (16px) — poco salto jerárquico | Subir a 16-18px, o tratarlo como "Label" y no como heading |
| `buttonLarge` (24px) / `buttonXlarge` (32px) son tamaños de CTA de marketing | Reservar solo para landing/hero; el rango operativo real de la app es Xsmall–Medium (12-16px) |
| `componentsGeneralXsmall` (8px, y 9px en móvil) por debajo del mínimo legible | Reservar exclusivamente a elementos decorativos (badge numérico tipo punto), nunca a texto con información |
| `letterSpacing: 0` en todo | Agregar un valor de tracking positivo (+0.02 a +0.06em) solo para variantes en MAYÚSCULAS (labels de estado, eyebrows) |
| Tamaños en `px` fijos | Implementar en `rem` (base 16px) para respetar el zoom/preferencias de accesibilidad del usuario (WCAG 1.4.4) |
| Perfil `expo` con decimales (ej. 39.6px) | Redondear a entero o al 0.5 más cercano al implementar en React Native, por limpieza de renderizado |

### 3.3 Mapeo de pesos
| Nombre (token) | Peso numérico |
|---|---|
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |

Tanto Poppins como Inter cubren este rango completo sin problema (ambas tienen familia variable/estática de 100 a 900).

---

## 4. Iconografía

**Regla confirmada**: el tamaño del ícono = el `lineHeight` del estilo de texto que lo acompaña. Es una regla sólida — asegura alineación óptica perfecta entre ícono y texto en cualquier combinación. Tabla derivada (ejemplos, ver tokens completos en el JSON):

| Contexto | lineHeight del texto | Tamaño de ícono resultante |
|---|---|---|
| Botón medium | 24px | 24px |
| Ítem de menú (componentsGeneral Xlarge) | 24px | 24px |
| Badge/chip (componentsGeneral Medium) | 20px | 20px |
| Badge/chip pequeño (componentsGeneral Small) | 18px | 18px |
| Título de card (H4) | 28px | 28px |
| Botón large (uso marketing) | 32px | 32px |

Estilo del ícono: **lineal, trazo uniforme** (no relleno), como en tu referencia. Color: gris texto secundario si inactivo, `Primary` si activo/seleccionado. Nunca como único indicador de estado (siempre con texto o `aria-label` — WCAG 2.2).

---

## 5. Layout — Shell general (reutilizable en cualquier sistema)

```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo institución] [Logo sistema]  [🔔][▦ apps][👤] │
├────┬──────────────┬───────────────────────────────────────┤
│ +  │ Sidebar rail │  Panel de submenú   │   Área de trabajo │
└────┴──────────────┴───────────────────────────────────────┘
```

- **Header**: fondo `Surface`, ~64px alto. Logo institucional + logo del sistema específico (izquierda); notificaciones, selector de apps/módulos, perfil (derecha).
- **Botón "+" flotante**: acción rápida contextual del módulo activo (definida por cada proyecto que use este shell).
- **Sidebar rail**: ancho fijo ~80px, ícono + etiqueta corta (nunca solo ícono).
- **Área de trabajo**: fondo blanco, contenido real de cada pantalla.

### 5.1 Las 3 reglas del sidebar (un mismo componente, 3 estados)
| Estado | Cuándo | Comportamiento |
|---|---|---|
| **Oculto** | Por defecto | Solo el riel de íconos visible; área de trabajo a ancho completo |
| **Flotante** | El ítem activo tiene hijos | Panel superpuesto (no empuja contenido); se cierra al hacer clic fuera |
| **Fijado** | El usuario lo fija, o el ítem no tiene hijos | Columna fija junto al riel; el área de trabajo se recalcula, nunca se solapa |

### 5.2 Puntos de corte responsivos (Breakpoints)
| Token | Valor | Dispositivo objetivo | Comportamiento estándar |
|---|---|---|---|
| `--oefa-breakpoint-sm` | `640px` | Móvil / Celular | Formularios en 1 columna, botones al 100% de ancho, títulos reducidos. |
| `--oefa-breakpoint-md` | `768px` | Tablet vertical | Sidebar colapsable (hamburguesa/drawer), tablas con scroll táctil protegido. |
| `--oefa-breakpoint-lg` | `1024px` | Tablet horizontal / Laptop | Sidebar fijable, grillas de 2 a 3 columnas. **En Login**: conmuta de 2 columnas (Hero + Tarjeta) a 1 columna centrada sin Hero lateral. |
| `--oefa-breakpoint-xl` | `1280px` | Desktop | Layout institucional completo sin scroll horizontal forzado. |

---

## 6. Componentes primitivos (genéricos, sin lógica de negocio)

| Componente | Regla de color/uso |
|---|---|
| Botón primario | `Primary` fondo, `On Primary` texto. Uno solo por vista — es la acción principal. |
| Botón secundario | Borde `Surface Container` oscuro, texto oscuro, fondo blanco |
| Botón destructivo | `Error`, siempre con confirmación modal |
| Badge/chip universal | **6 estados universales WCAG 2.2 AA (relación > 4.5:1)**: <br>1. **Error** (`#FFEFF1` / `#AA1223` - 7.9:1)<br>2. **Info** (`#EEF4FF` / `#002463` - 14.8:1)<br>3. **Éxito** (`#F7FFEE` / `#386200` - 8.1:1)<br>4. **Danger** (`#FFF0CC` / `#664800` - 8.4:1)<br>5. **Neutral** (`#F1F5F9` / `#1E293B` - 11.2:1)<br>6. **Alterno** (`#EEFFFE` / `#005D58` - 6.5:1). Nunca usar color de marca puro sin validar contraste. |
| Card | Fondo `[Rol] Container`, texto `On [Rol] Container` |
| Tabla | Encabezado `Surface`, filas con hover `Surface Container`, badges alineados a la derecha |
| Alertas/mensajes de error | Lenguaje claro, sin jerga técnica, con acción de recuperación (ya exigido por cualquier estándar institucional de accesibilidad) |

---

## 7. Accesibilidad (WCAG 2.2) — reglas transversales
- Foco de teclado siempre visible (contorno `Primary`, 2px), incluido dentro de paneles flotantes.
- Panel flotante navegable por teclado (`Tab`/`Esc`) y anunciado a lectores de pantalla (`aria-expanded`, `role="menu"`).
- Ningún color de marca se usa como texto/ícono sobre blanco sin pasar por su tono "UI-safe" (sección 2.2).
- Ningún estado se comunica solo por color — siempre + texto o ícono con `aria-label`.

---

## 8. Componentes globales

### 8.1 Tabs (Pestañas de navegación) (`<oefa-tabs>`)
- **Clasificación Atomic Design**: **Molécula de Navegación Horizontal**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/tabs/tabs.component.ts`.
- **Propósito**: Navegación horizontal seccional estructurada, accesible y de alta densidad para conmutar vistas, bandejas o detalles sin recargar la página.
- **Entradas (`Inputs`)**:
  - `tabs: OefaTabItem[]`: Colección de pestañas tipadas que admiten:
    - `id: string`: Clave unívoca del tab.
    - `label: string`: Texto descriptivo principal.
    - `icon?: string`: Ícono opcional (soporta glifos SVG o emojis; habilita pestañas **con icono** o **sin icono**).
    - `badge?: string | number`: Contador numérico o badge contextual (ej. `3` entregables).
    - `badgeDot?: boolean`: Indicador sutil de punto ("puntito rojo" o semántico) para notificaciones o novedades no leídas.
    - `badgeDotColor?: 'danger' | 'warning' | 'primary' | 'success'`: Tono cromático del punto (default: `'danger'` rojo `#EF4444`).
    - `infoTooltip?: string`: Mensaje contextual que renderiza un icono de información circular `ⓘ` con tooltip institucional inmediato en `:hover` y `:focus-visible`.
    - `disabled?: boolean`: Deshabilita la interacción con la pestaña.
  - `activeTab: string`: Identificador de la pestaña activa con soporte de enlace bidireccional `[(activeTab)]`.
  - `variant: 'underline' | 'pill'`: Variante visual institucional (default: `'underline'`).
- **Salidas (`Outputs`)**:
  - `activeTabChange: EventEmitter<string>`: Emite el ID al cambiar de pestaña.
  - `tabChange: EventEmitter<string>`: Notificación de evento para recarga de datos o filtros.
- **Variantes Visuales**:
  - `underline` (por defecto): Borde inferior activo de 3px con `var(--oefa-primary-root)`, tipografía de peso 700 y fondo transparente/blanco. Ideal para fichas de detalle y formularios.
  - `pill`: Contenedor tipo cápsula con fondo `var(--oefa-surface-subtle)` y pestañas activas elevadas en `var(--oefa-surface-card)` con sombra suave. Ideal para sub-secciones y dashboards.
- **Comportamiento y Ergonomía**:
  - Las pestañas **nunca se comprimen** (`flex-shrink: 0`) y activan scroll horizontal automático sin barra visible (`scrollbar-width: none`).
  - Arrastre con mouse (drag-to-scroll) con umbral de 6px para diferenciar clic de arrastre.
  - Flechas circulares flotantes estilo Material UI si existe desbordamiento horizontal.
- **Accesibilidad (WCAG 2.2 - W3C Tabs Pattern)**:
  - Cabecera con `role="tablist"` y pestañas con `role="tab"`, `[attr.aria-selected]="activeTab === tab.id"`, `[attr.aria-controls]="'panel-' + tab.id"`.
  - Soporte de navegación por teclado mediante flechas (`ArrowRight`, `ArrowLeft`, `Home`, `End`).
  - El icono de información `infoTooltip` detiene la propagación del clic para no activar la pestaña involuntariamente al consultar el tooltip.

### 8.2 Barra de Navegación (Rail 80px), Submenú Flotante y Tooltips Rápidos
- **Barra de Navegación Principal (Rail 80px)**:
  - Ancho estándar de **80px** con alineación centrada de módulos y scroll vertical independiente (`flex: 1; min-height: 0; overflow-y: auto;`).
  - **Nombres de Módulos a 2 Líneas (`.item-label`)**: Nombres compuestos como *"Órdenes de Servicio"* o *"Sistema de Diseño"* se ajustan a dos líneas con `display: -webkit-box; -webkit-line-clamp: 2; line-height: 1.15;` en reposo.
  - **Expansión en Hover/Foco sin Desplazamiento (Patrón Google Waffle / M3)**: Cada ítem cuenta con un contenedor de flujo fijo (`.rail-item-wrapper` a `72px`). En `:hover` y `:focus-visible`, el botón `.rail-item` se eleva en capa flotante (`position: absolute; z-index: 40; background: var(--oefa-surface-card); box-shadow: 0 4px 14px rgba(0,0,0,0.14);`), liberando la etiqueta completa (`-webkit-line-clamp: unset`) hacia abajo sobre los siguientes elementos sin empujarlos ni alterar el layout vertical, sin salirse del ancho de 80px ni chocar con el submenú lateral.
  - **Geometría del Foco Accesible (WCAG 2.2 SC 2.4.7 / 2.4.13)**: Los botones `.rail-item` cuentan con `box-sizing: border-box; width: 100%;` y contención estricta de sus elementos hijos. Esto previene desbordamientos laterales que deformen el anillo de foco (eliminando formas irregulares o en cuello de botella) garantizando un contorno rectangular redondeado uniforme de `2px solid var(--oefa-focus-ring)` con `offset: 2px` y `border-radius: var(--oefa-radius-md)`.
- **Tooltips Institucionales de Alta Respuesta (`[data-oefa-tooltip]`)**:
  - Cumplimiento de **WCAG 2.2 SC 1.4.13 (Content on Hover or Focus)**: Sustituye el atributo nativo `title` del navegador (que demora entre 1.5 y 2 segundos) por tooltips institucionales de respuesta rápida (~150ms de delay).
  - **Comportamiento**: No parpadea en desplazamientos rápidos del cursor pero ofrece confirmación de destino casi inmediata al detenerse.
  - **Diseño**: Fondo contrastante `var(--oefa-surface-tooltip)` (`#0F172A` en claro, `#1E293B` en oscuro), texto en `--oefa-tooltip-text` (`#F8FAFC`), tipografía Inter de 12px, flecha indicadora y sombra de elevación. Desaparición instantánea al desenfocar o mover el cursor.
- **Submenú de Opciones (Sidebar Flyout y Pinned - 260px)**:
  - **Ancho Fijo Uniforme**: Ancho estándar de **260px** (estándar Gmail/Material Design 3) para consistencia tanto en modo fijo (`.pinned`) como flotante (`.floating-flyout`).
  - **Fondo de Superficie**: `var(--oefa-surface-submenu)` (`#F8FAFC` en claro, `#111827` en oscuro).
  - **Estado Hover (Accesible SC 1.4.11 / SC 1.4.3)**: 
    - Para garantizar contraste perceptible contra `--oefa-surface-submenu`, el fondo de `:hover` debe ser `var(--oefa-surface-muted)` (`#F1F5F9` en claro / `#1E293B` en oscuro) o `rgba(20, 74, 167, 0.06)`.
    - El color del texto cambia a `var(--oefa-primary-root)` para acentuar el objetivo interactivo.
  - **Estado Seleccionado / Activo (`.selected` / `.active`)**:
    - **Fondo**: `var(--oefa-primary-container)` (`#EEF4FF` en claro / `#103D89` en oscuro).
    - **Borde Perimetral Limpio**: `1px solid var(--oefa-primary-container-hc)` (`#A4C1F4` en claro / `#23529E` en oscuro) uniforme en todos sus lados, sin `border-left` grueso para mantener una estética limpia y simétrica.
  - **Títulos Separadores de Grupo (`.group-header`, `.group-title`) — Opción A**:
    - **Comportamiento Fijo**: Son categorías estructurales permanentes; **no llevan flecha de colapso** para evitar falsas expectativas de interacción.
    - **Tipografía Micro-Overline**: `font-size: 0.6875rem` (11px), `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.08em`.
    - **Color y Opacidad**: `var(--oefa-text-secondary)` con opacidad `0.85`.
    - **Línea Divisoria Superior**: Todo grupo posterior al primero (`.tree-group:not(:first-child)`) lleva `border-top: 1px solid var(--oefa-border-color-subtle, #F1F5F9)` con `padding-top: 12px` y `margin-top: 4px` para una separación limpia y elegante.
  - **Truncamiento de Texto**: Cuando el nombre de la opción excede el ancho disponible del panel, se trunca automáticamente usando puntos suspensivos (`text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`).
  - **Accesibilidad y Atributos**: Para cumplir con el estándar WCAG 2.2 AA, todo elemento con texto truncado incluye `data-oefa-tooltip="[Texto Completo]"` y `aria-label="[Texto Completo]"`.
- **Drawer de Navegación Móvil (`<app-mobile-nav-drawer>`)**:
  - En móviles (<768px), la cabecera integra directamente la acción principal rápida mediante `<oefa-button variant="primary" size="md">` (*Nueva Orden*) junto con `<oefa-icon-button variant="close">` para cierre accesible, y `<oefa-button variant="ghost" size="sm">` para retroceso en navegación Drill-Down por niveles.


### 8.3 Menús Desplegables (`<oefa-dropdown>`, `<oefa-user-menu>`)
- **Componente General `<oefa-dropdown>`**: Ubicado en `src/app/shared/components/dropdown/dropdown.component.ts`.
  - Diseñado para menús contextuales, botones de acción agrupada, filtros de selección múltiple y menús kebab en tablas (`align="left" | "right"`).
  - **Control de Cierre (`[closeOnItemClick]="true | false"`)**: Permite mantener el popover abierto al interactuar con formularios, buscadores o checkboxes múltiples.
  - **Slots Semánticos**:
    - `[trigger]`: Elemento disparador (botón primario, secundario, botón de icono kebab o chips).
    - `[menu]`: Contenedor de opciones con normalización de clases institucionales.
  - **Variantes de Configuración de Opciones**:
    1. **Con o Sin Ícono**: Botones `.dropdown-item` con glifos SVG vectoriales (`width="16" height="16" stroke="currentColor"`), heredando automáticamente acentos de foco y hover.
    2. **Con o Sin Buscador Integrado**: Bloque `.dropdown-search` con input `.dropdown-search-input` para filtrado reactivo de opciones en tiempo real.
    3. **Con o Sin Checkboxes (`.dropdown-item-checkbox`)**: Selector múltiple accesible con `accent-color: var(--oefa-primary-root)` y área de clic completa (`user-select: none`).
    4. **Divisores y Destructivos**: Separador `.dropdown-divider` e items `.dropdown-item.text-danger` para acciones críticas (eliminar, desestimar).
  - **Animación y Ergonomía**: Transición `dropdownPop` con `var(--oefa-duration-short-4)` y curva `var(--oefa-ease-emphasized-decel)`.
  - **Soporte WCAG 2.2**: Cierre con tecla `Escape`, clic exterior (`click outside`) y foco visible `:focus-visible` con `outline: 2px solid var(--oefa-focus-ring)`.
  - **Tokens de Color**: Fondo `var(--oefa-surface-card)`, borde `var(--oefa-border-color)`, elevación `var(--oefa-shadow-flyout)`, hover en `var(--oefa-surface-subtle)` y acento en `var(--oefa-primary-root)`. Items destructivos con `var(--oefa-error-ui-safe)` y `var(--oefa-error-container)`.

- **Menú Desplegable de Usuario (`<oefa-user-menu>`, Header Profile Dropdown)**:
  - **Componente Standalone**: Ubicado en `src/app/shared/components/user-menu/user-menu.component.ts`.
  - **Despliegue y Anclaje**: Flotante alineado a la derecha, anclado debajo del botón avatar de usuario (`HeaderComponent` o shells independientes).
  - **Ancho y Elevación**: Ancho estándar de `300px`, fondo `var(--oefa-surface-card)`, borde tenue `var(--oefa-border-color)` y elevación con sombra `var(--oefa-shadow-flyout)`.
  - **Cierre Inteligente**: Cierre automático al hacer clic fuera del componente (`@HostListener('document:click')`) o al pulsar la tecla `Escape`.
  - **Estructura Interna — Secciones**:
    1. **Cabecera Informativa (Obligatoria)**:
       - Avatar con iniciales o foto con anillo de foco accesible.
       - Nombre completo del usuario (`user.name`), correo electrónico (`user.email`), rol (`user.role`) y badge de área funcional asignada (`user.area`).
    2. **Selector de Tema Integrado (Obligatorio)**:
       - Grupo de botones tipo píldora (`ThemeService`): Claro / Oscuro / Sistema (`light` / `dark` / `system`).
    3. **Sección de Centro de Ayuda (Obligatoria)**:
       - Botón directo hacia el portal de manuales y soporte (`helpClicked` output o enlace).
    4. **Sección Cierre de Sesión (Obligatoria)**:
       - Botón de acción destructiva/salida (`logout-item`) estilizado con color `var(--oefa-error-root)` que emite evento `logout`.

### 8.4 Controles de Formulario e Inputs (Light & Dark Mode)
- **Superficie de Entrada (`--oefa-surface-input`)**: `#FFFFFF` en modo claro, `#0F172A` en modo oscuro (contraste de borde ≥ 3:1 vs `#0B1120` y `#131C2E`).
- **Listas Desplegables (`.form-select`, `.form-select-sm`)**:
  - Uso obligatorio de `appearance: none` con glifo chevron vectorial SVG integrado en `background-image`, asegurando contraste óptimo en ambos temas (relleno en `--oefa-text-secondary` / `#94A3B8`).
  - Opciones (`<option>`): fondo explícito en superficie contenedor (`var(--oefa-surface-card)` / `#131C2E` en dark) y texto en `var(--oefa-text-primary)` para evitar cajas emergentes blancas deslumbrantes en navegadores basados en Chromium/WebKit.
- **Campos de Fecha y Hora (`<oefa-date-picker>`)**:
  - Componente accesible `src/app/shared/components/date-picker/date-picker.component.ts` implementando `ControlValueAccessor` (compatible con `[(ngModel)]` y Reactive Forms).
  - Admite `label`, `required`, `disabled`, `error`, `min`, `max`, `placeholder`.
  - **Calendario Flotante Institucional**: Popover flotante homologado con cuadrícula WAI-ARIA (`role="grid"` / `role="gridcell"`), navegación por teclado (flechas, Escape, Enter) y botón de acceso rápido "Hoy".
  - Ícono SVG de calendario explícito integrado con `var(--oefa-primary-root)` y botón de borrado rápido `✕`.
  - Anuncio accesible de errores con `role="alert"` y relación semántica `aria-describedby`.
- **Anillo de Foco (WCAG 2.2 SC 2.4.7 / 2.4.13)**:
  - Borde con acento de marca (`--oefa-primary-root`: `#144AA7` en light / `#76A3EF` en dark).
  - Resplandor exterior (`--oefa-focus-glow`): `rgba(20, 74, 167, 0.20)` en light y `rgba(118, 163, 239, 0.25)` en dark.
- **Controles de Selección (Checkbox / Radio)**: Uso de `accent-color: var(--oefa-primary-root)` para coherencia cromática institucional automática.
- **Campos de Formulario con Ícono (`.oefa-form-field`)**:
  - Contenedor flexible de altura fija (44px) que agrupa un glifo vectorial SVG (`.field-icon`), el campo de entrada (`.field-input`) y opcionalmente botones de acción (`.password-toggle`).
  - Estado de error (`.has-error`): activa borde semántico `var(--oefa-error-root)` y anillo de foco en rojo accesible `rgba(229, 26, 47, 0.25)`.
- **Botón de Mostrar/Ocultar Contraseña (`.password-toggle`)**:
  - Cumplimiento estricto de **WCAG 2.2 SC 3.3.8** (Autenticación Accesible) y **SC 2.5.8** (Tamaño de Objetivo Mínimo ≥ 24×24px, objetivo de 32×32px).
  - Obligatorio incluir atributos `type="button"`, `aria-label` y `aria-pressed`.
- **Banner de Alerta Inline para Formularios (`.oefa-alert-banner`)**:
  - Diseñado para cumplimiento de **WCAG 2.2 SC 3.3.1** (Identificación de Errores) y **SC 4.1.3** (Mensajes de Estado).
  - **REGLA ARQUITECTURAL**: En formularios de autenticación o ingreso de datos críticos, los errores deben mostrarse en `.oefa-alert-banner` inline (permanente junto al input), **NUNCA** sustituirse exclusivamente por toasts flotantes temporales.
  - Atributos obligatorios: `role="alert"`, `aria-live="assertive"`, `tabindex="-1"`.
- **Estados Deshabilitados**: Superficie atenuada (`--oefa-surface-muted`), borde suave (`--oefa-border-color-subtle`), texto muted (`--oefa-text-muted`) y cursor `not-allowed`.


### 8.5 Segmented Switch y Conmutadores de Modo (`<oefa-segmented-switch>`, `.segmented-switch`, `.view-switch-group`)
- **Componente Standalone**: `src/app/shared/components/segmented-switch/segmented-switch.component.ts`.
- **Contenedor**: Cápsula de fondo atenuado (`--oefa-surface-muted`) con borde perimetral (`--oefa-border-color`) y padding interno de `3px`. Soporta `[fullWidth]="true"` para layouts responsivos.
- **Botones de Opción (`.switch-btn`, `.switch-mode-btn`)**:
  - Inactivo: fondo transparente, texto `--oefa-text-secondary`, hover sutil con `--oefa-surface-subtle`.
  - Activo: fondo de acento de marca (`--oefa-primary-root`), texto en `--oefa-primary-on` (NUNCA blanco fijo `#FFFFFF`, ya que en dark mode `--oefa-primary-root` es `#76A3EF` y requiere texto oscuro `#05142E` para cumplir WCAG AA > 10:1). Sombra suave de elevación (`--oefa-shadow-sm`).
- **Badges e Íconos Integrados (`.switch-badge`, `.switch-icon`)**:
  - Ícono SVG opcional con espaciado uniforme a la izquierda del texto de opción.
  - Badge tipo píldora (`.switch-badge`): en estado inactivo usa `var(--oefa-surface-subtle)` y `var(--oefa-text-secondary)`; en estado activo `rgba(255, 255, 255, 0.25)` y `var(--oefa-primary-on)`.
- **Accesibilidad WAI-ARIA**: `role="group"`, `aria-label`, y atributos individuales `aria-pressed="true|false"` en cada botón de opción.
- **Botón de Filtros Avanzados (`.btn-toggle-filters`)**:
  - Estado normal: fondo `--oefa-surface-card`, borde institucional y texto primario.
  - Estado activo: fondo contenedor primario (`--oefa-primary-container`), texto y borde en `--oefa-primary-root`.
  - Punto indicador (`.badge-filter-dot`): acento primario posicionado en esquina superior derecha.

### 8.6 Componentes de Administración y Jerarquías (Settings & Toasts)
- **Átomo de Jerarquía de Árbol (`.tree-node`, `.tree-level-badge`)**:
  - Nivel Dirección (`.level-dir`): fondo `--oefa-primary-container` y texto `--oefa-primary-on-container`.
  - Nivel Subdirección/Oficina (`.level-sub`): fondo `--oefa-secondary-container` y texto `--oefa-secondary-on-container`.
  - Nivel Área Funcional (`.level-area`): fondo `--oefa-tertiary-container` y texto `--oefa-tertiary-on-container`.
  - Código de nodo (`.tree-code`): fondo `--oefa-surface-muted`, texto `--oefa-text-muted` y borde tenue.
  - Indicadores de estado (`.in-use-badge`, `.inactive-badge`): contenedores semánticos Success y Error respectivamente.
- **Notificaciones Emergentes Reactivas (`<oefa-toast>`, `ToastService`)**:
  - Componente global montado en `app.html` (`src/app/shared/components/toast/`).
  - Gestionado reactivamente mediante `ToastService` inyectable (`success()`, `info()`, `warning()`, `error()`, `remove()`).
  - Animación suave de entrada con deslizamiento (`translateY`), auto-cierre configurable (default 4000ms), botón manual de descarte y botón opcional de acción.
  - Región en vivo para accesibilidad WCAG (`role="status"` o `role="alert"` según el tipo de severidad).
  - Fondo semántico `var(--oefa-[variant]-container)`, marco perimetral uniforme `1px solid var(--oefa-[variant]-container-hc)` y elevación `var(--oefa-shadow-flyout)`.

### 8.7 Pantalla de Login y Escenas con Fondos Fotográficos
- **Overlay Fotográfico Adaptativo (`--oefa-login-overlay`)**:
  - En **Light Mode**: tinte neutro semitransparente `rgba(0, 0, 0, 0.55)` con desenfoque (`backdrop-filter: blur(8px)`).
  - En **Dark Mode**: degradado institucional profundo `linear-gradient(135deg, rgba(11, 17, 32, 0.88) 0%, rgba(5, 20, 46, 0.78) 100%)`. Reduce el deslumbramiento fotográfico y garantiza contraste WCAG AAA.
- **Tipografía de Título Hero sobre Escenarios Oscuros**:
  - Texto de bienvenida (`.hero-welcome-text`): `--oefa-text-on-dark` (`#CBD5E1`).
  - Título Principal (`.hero-main-title`): `--oefa-neutral-100` (`#FFFFFF`) con `text-shadow: 0 2px 8px rgba(0,0,0,0.5)`. **Regla crítica**: NUNCA usar `--oefa-primary-on` sobre fondos fotográficos oscuros porque en dark mode dicho token vale `#05142E` (oscuro) y vuelve el texto invisible.
  - Subtítulo de marca (`.hero-sub-title`): `--oefa-primary-container-hc` (`#90B8F8` en light, `#76A3EF` en dark). Luz azulada de alto contraste (>7:1).
- **Tarjeta y Logotipo**:
  - Tarjeta (`.login-card`): fondo `--oefa-surface-card`, borde perimetral `1px solid var(--oefa-border-color)` y sombra `var(--oefa-shadow-flyout)`.
  - Logotipo oficial OEFA (`.oefa-official-logo-img`): en dark mode se invierte tipografía mediante `filter: brightness(0) invert(1)` o alternancia a versión monocromática blanca.
- **Botones de Asistencia y Soporte (`.oefa-help-card`)**:
  - Tarjetas interactivas compactas con fondo atenuado (`--oefa-surface-subtle`), borde perimetral (`--oefa-border-color`), icono en acento institucional (`.help-card-icon`, `--oefa-primary-root`) y texto en `.help-card-text`.
  - Hover: activa contenedor primario (`--oefa-primary-container`), borde y texto en `--oefa-primary-root`, con elevación suave (`--oefa-shadow-sm`). Integración accesible tanto en Light Mode como en Dark Mode.

- **Adaptación Responsiva (Breakpoint LG — `1024px`)**:
  - En pantallas `< 1024px` (`--oefa-breakpoint-lg`), la grilla de dos columnas (`.login-grid-container`) colapsa a una sola columna centrada.
  - El Hero lateral (`.login-hero-section`) se oculta y el título de bienvenida pasa al interior superior de la tarjeta (`.mobile-hero-title`).
  - El encabezado interno *"Iniciar Sesión"* (`.card-headline-group`) se oculta (`display: none`) para evitar redundancia cognitiva y maximizar el espacio vertical visible ante la apertura del teclado móvil.
- **Accesibilidad en Campos y Autenticación (WCAG 2.2)**:
  - **Botón Ver / Ocultar Contraseña (SC 3.3.8 & SC 2.5.8)**: `<button type="button">` con `aria-label` dinámico (*"Mostrar contraseña"* / *"Ocultar contraseña"*), `aria-pressed`, foco visible y target size accesible.
  - **Alertas de Error (SC 3.3.1, 4.1.3 & 1.4.1)**: Banner con `role="alert"`, `aria-live="assertive"` y foco programático, combinando icono descriptivo con texto inequívoco. Los inputs asociados reflejan `aria-invalid="true"` y `aria-describedby`.

### 8.8 Paginación de Tablas de Datos (`<oefa-pagination>`, `.pagination-bar`)
- **Componente Standalone Reutilizable**: `src/app/shared/components/pagination/pagination.component.ts`.
- **Regla de Carga Inicial**:
  - El tamaño por defecto es de **10 registros por página** en todas las vistas de tablas, catálogos y matrices.
  - La opción mostrada visualmente en el desplegable `<select>` debe coincidir estrictamente con el número de elementos renderizados desde el primer ciclo de renderizado (data-binding bidireccional reactivo `[ngModel]`).
- **Opciones Estándar de Tamaño**:
  - Valores permitidos: `[10, 25, 50, 100]` elementos por página.
- **Comportamiento Reactivo y Reseteo**:
  - Al cambiar de tamaño de página o alternar entre módulos/filtros, el índice de página activa siempre debe resetearse a `1` (`currentPage = 1`) para garantizar coherencia en los límites de datos.
- **Accesibilidad y Ergonomía (WCAG 2.2)**:
  - Los botones de navegación (`«`, `‹`, `›`, `»`) deben incluir `title` descriptivo (*"Primera página"*, *"Página anterior"*, etc.) y soporte para lectores de pantalla (`aria-label`).
  - Los botones de página numérica (`.btn-page`) y navegación tienen un área de pulsación mínima de `32x32px` (`SC 2.5.8 Target Size`).
  - Enfoque accesible visible (`:focus-visible`) con anillo `outline: 2px solid var(--oefa-focus-ring)`.
  - La página activa se señala con fondo institucional `var(--oefa-primary-root)` y texto en `var(--oefa-primary-on)` (NUNCA blanco fijo `#FFFFFF` para preservar contraste pleno en modo oscuro). Atributo `aria-current="page"`.

### 8.9 Cabeceras de Módulos y Acciones Responsivas (`.header-actions-wrapper`, `.btn-kebab`)
- **Switch de Modo de Vista Adaptativo (`.view-switch-group`)**:
  - **Escritorio (`> 768px`)**: Muestra ícono SVG y texto descriptivo (`.switch-mode-text`), con padding generoso y tipografía de cuerpo semi-negrita.
  - **Móvil (`≤ 768px`)**: Oculta el texto (`display: none`) transformándose en botones compactos de solo ícono (`36x36px`, `SC 2.5.8 Target Size`) con `title` y `aria-label` para mantener total accesibilidad.
- **Menú Kebab Colapsable de 3 Puntos (`.kebab-menu-container`, `.btn-kebab`)**:
  - En resoluciones móviles (`≤ 768px`), las acciones secundarias (exportación, limpieza, etc.) y de creación se repliegan automáticamente dentro de un menú desplegable de 3 puntos verticales (`⋮`).
- **Alineación a la Derecha y Apertura Segura**:
  - La barra de acciones (`.header-actions-wrapper`) se ancla al extremo derecho de la cabecera (`margin-left: auto; justify-content: flex-end;`).
  - El menú desplegable flotante (`.kebab-dropdown-menu`) abre hacia el interior (`right: 0; left: auto; max-width: calc(100vw - 48px);`) garantizando que nunca sufra recortes ni desbordamientos por los bordes laterales de la pantalla.
  - Cierre accesible: se oculta automáticamente al seleccionar una opción, presionar la tecla `Escape` o hacer clic fuera del componente.

### 8.10 Header Institucional General (`.oefa-header`)
- **Estructura y Anatomía**:
  - Altura estándar: `64px` (`--oefa-header-height`).
  - Fondo: Superficie de cabecera (`--oefa-surface-header`, `#FFFFFF` en claro, `#0F172A` en oscuro) con borde inferior `1px solid var(--oefa-border-color)` y `z-index: 40`.
  - Extremo izquierdo (`.header-left`): Botón toggle de sidebar, Logotipo institucional oficial OEFA, divisor vertical sutil y bloque de marca del sistema (acrónimo + subtítulo descriptivo).
  - Extremo derecho (`.header-right`): Conmutador de Modo Oscuro/Claro, botón de notificaciones con badge numérico, selector de aplicaciones en cuadrícula (`.apps-btn`) y perfil de usuario con avatar interactivo.
- **Reglas de Adaptación Responsiva por Breakpoints Oficiales**:
  - **Escritorio (`> 1024px`)**: Despliegue completo sin omisión de elementos.
  - **Tablet Horizontal / Laptop (`≤ 1024px`, `--oefa-breakpoint-lg`)**:
    - Se oculta el subtítulo descriptivo en dos líneas (`.plusd-sub`), preservando el acrónimo/título del sistema (`SEOSC`) y el logotipo OEFA.
  - **Tablet Vertical (`≤ 768px`, `--oefa-breakpoint-md`)**:
    - Se oculta el nombre del usuario (`.user-name`) y el ícono chevron (`.chevron-icon`), dejando visible el avatar circular accesible.
    - Se compacta el padding horizontal de `20px` a `12px` (`--oefa-header-padding-x-mobile`).
    - La altura del logotipo OEFA se reduce a `30px` (`--oefa-header-logo-height-mobile`) y los gaps entre botones se reducen a `8px`.
    - El dropdown de usuario (`.user-dropdown-menu`) ajusta su ancho a `270px` con límite `max-width: calc(100vw - 24px)` anclado a `right: 0`.
  - **Móvil / Celular (`≤ 640px`, `--oefa-breakpoint-sm`)**:
    - Se ocultan el divisor (`.brand-divider`) y la marca del sistema (`.system-brand`), priorizando el logotipo institucional OEFA como ancla primaria de identidad.
    - Se mantiene prioritariamente visible el selector/lanzador de aplicaciones (`.apps-btn`) como acceso directo al ecosistema de aplicaciones OEFA.
    - Se oculta el botón directo de alternar tema (`.theme-toggle-btn`), ya que dicha preferencia está disponible dentro del menú desplegable del perfil de usuario (`.menu-theme-selector`).
    - Los botones de acción reducen su padding a `6px` y el logo OEFA ajusta su altura a `26px`.
    - El dropdown de perfil ocupa el ancho disponible de la pantalla (`width: calc(100vw - 24px); right: 0;`).
- **Prevención de Desborde (Overflow)**:
  - Todo el contenedor `.oefa-header` define `box-sizing: border-box; width: 100%; overflow-x: clip;` para garantizar que ningún elemento exceda el viewport.

### 8.11 Filtros de Tabla Responsivos (`.mobile-filter-drawer`, `.filter-chips-carousel`)
- **Problema que resuelve**: En tablets y pantallas intermedias (`≤ 1024px`), el área disponible para las tablas se reduce sustancialmente (especialmente cuando el sidebar permanece fijado / pinned a 340px). Las barras tradicionales con 4 selects y botón de filtros avanzados desbordan horizontalmente.
- **Punto de Activación**: Se activa automáticamente a partir de **`≤ 1024px` (`--oefa-breakpoint-lg`)**, garantizando una interfaz libre de desbordes tanto en tablet como en móvil.
- **Anatomía del Patrón Responsivo**:
  1. **Barra de Entrada Compacta**:
     - Input de búsqueda principal (`.search-box`) a ancho flexible.
     - Botón lanzador de filtros (`.btn-filter-trigger`) con ícono de embudo y badge numérico de filtros activos (`.filter-badge-count`), manteniendo tamaño táctil accesible (`≥ 36px`).
  2. **Carrusel Horizontal de Chips Rápidos (`.filter-chips-carousel`)**:
     - Fila horizontal con desplazamiento táctil protegido (`overflow-x: auto; scrollbar-width: none;`).
     - Chips de estado (`.filter-chip`) con radio píldora (`--oefa-radius-full`), fondo tenue (`--oefa-surface-subtle`) y estado activo con acento institucional (`--oefa-primary-root` y texto blanco).
     - Incluye chip condicional `✕ Limpiar` cuando hay filtros aplicados.
  3. **Panel Deslizable Modal / Bottom Sheet (`.mobile-filter-drawer`)**:
     - Se despliega desde la parte inferior (o lateral en tablet) con fondo semitransparente atenuado (`.mobile-filter-backdrop`, con desenfoque de 3px).
     - **Cabecera**: Título "Filtros de búsqueda", contador de activos y botón de cierre accesible (`✕` con `aria-label="Cerrar filtros"`).
     - **Cuerpo desplazable**:
       - *Filtros Básicos*: selectores principales (Área solicitante, Estado, Año) en columna única vertical.
       - *Acordeón de Filtros Avanzados (`.adv-accordion`)*: Botón desplegable con ícono chevron que contiene criterios de fecha, rango de fechas, tipo de contratista, montos y proyectos, manteniendo la interfaz despejada hasta que el usuario decida abrirlos.
     - **Pie fijo de acciones (`.drawer-footer`)**:
       - Botón secundario: *"Limpiar filtros"*.
       - Botón primario: *"Aplicar filtros"* con indicador dinámico de resultados encontrados.
- **Criterios de Accesibilidad (WCAG 2.2)**:
  - Cierre mediante tecla `Escape`, clic sobre el backdrop o botón de cierre.
  - Bloqueo de scroll del fondo mientras el drawer permanece abierto.
  - Anuncio adecuado con atributos `role="dialog"` y `aria-modal="true"`.

### 8.12 Tablas de Datos y Matrices Institucionales (`<oefa-table>`, `.data-table`, `.excel-data-table`, `.gmail-table`)
- **Clasificación Atomic Design**: **Organismo de Visualización de Datos y Análisis**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/table/table.component.ts` (`<oefa-table>`).
- **Los 3 Patrones Institucionales de Tablas**:
  1. **Tabla de Datos Estándar (`.data-table` / `<oefa-table>`)**:
     - Para bandejas generales de expedientes, órdenes y catálogos administrativos.
     - Encabezados compactos con tipografía display (`0.75rem`, `font-weight: 700`, `letter-spacing: 0.05em`), hover reactivo con `var(--oefa-surface-subtle)` y paginador integrado (`<oefa-pagination>`).
  2. **Matriz Plana Tipo Excel (`.excel-data-table`)**:
     - Diseñada para alta densidad informativa y cruce multidimensional de entregables (OS, año, número de entregable, días LPAG, montos numéricos, SIGED y estados).
     - Soporta agrupación de celdas (`rowspan` con clase `.grouped-order-cell` y borde derecho delimitador `2px solid var(--oefa-border-color)`), valores numéricos monoespaciados alineados a la derecha (`font-family: var(--oefa-font-mono)`) y padding compacto.
  3. **Tabla con Filas Desplegables Tipo Gmail (`.gmail-table`)**:
     - Permite inspección inline de trazabilidad, eventos de notificación y bitácoras sin cambiar de contexto ni abrir modales pesados.
     - Chevron rotatorio animado (`transform: rotate(90deg)`) y fila expandida con fondo diferenciado (`var(--oefa-surface-subtle)`).
- **Entradas (`Inputs`) de `<oefa-table>`**:
  - `columns: TableColumn[]`: Especificación de columnas (`key`, `header`, `sortable`, `align`, `width`, `type`, `formatter`).
  - `data: any[]`: Colección de registros a renderizar.
  - `loading: boolean`: Muestra filas de skeleton interactivo (`<oefa-skeleton>`) evitando saltos de diseño (CLS).
  - `skeletonRows: number`: Cantidad de filas simuladas durante la carga (default: `4`).
  - `density: 'default' | 'compact' | 'comfortable'`: Control de padding vertical y tamaño tipográfico.
  - `striped: boolean`: Alterna colores de fondo en filas pares/impares para lectura descansada.
  - `bordered: boolean`: Activa cuadrícula completa de bordes verticales ideal para matrices tipo Excel.
  - `stickyHeader: boolean`: Mantiene la cabecera fija al hacer scroll vertical en contenedores con overflow.
  - `emptyTitle`, `emptyDescription`: Títulos y descripciones personalizados delegados a `<oefa-empty-state>`.
  - `rowClickable: boolean`: Habilita cursor interactivo y eventos de selección.
- **Salidas (`Outputs`)**:
  - `sortChange: EventEmitter<{ key: string, direction: 'asc' | 'desc' }>`: Disparado al hacer clic en columnas ordenables.
  - `rowClick: EventEmitter<any>`: Emite el objeto de datos de la fila seleccionada.
- **Accesibilidad (WCAG 2.2)**:
  - Estructura nativa semántica con `<table role="table">`, `<thead>`, `<tbody>`, `<th>` y `<td>`.
  - Atributo accesible `aria-sort="ascending" | "descending"` y navegación por teclado en cabeceras ordenables.
  - Soporte integral de Dark Mode mediante elevación tonal sobre `var(--oefa-surface-card)` y `var(--oefa-surface-subtle)`.


### 8.13 Tarjeta de Selección (`<oefa-selection-card>`)
- **Componente Standalone**: Ubicado en `src/app/shared/components/selection-card/selection-card.component.ts`.
- **Propósito**: Selección intuitiva en formato de tarjetas interactivas para opciones tarifadas, modalidades de entrega o flujos de decisiones estructuradas.
- **Entradas (`Inputs`)**:
  - `name: string`: Identificador del grupo (para radio grupal accesible).
  - `value: any`: Valor del ítem.
  - `selected: boolean`: Estado activo/seleccionado.
  - `title: string`: Título principal de la opción.
  - `description?: string`: Detalle descriptivo secundario.
  - `priceBadge?: string`: Texto destacado de costo/tarifa o estado (ej. "Gratuito", "S/. 0.08 / pág.").
  - `badgeVariant?: 'primary' | 'success' | 'tertiary' | 'neutral'`: Variante cromática del badge.
  - `type: 'radio' | 'checkbox'`: Comportamiento de selección única o múltiple (default: `'radio'`).
  - `disabled: boolean`: Deshabilita la interacción.
- **Salidas (`Outputs`)**:
  - `selectionChange: EventEmitter<any>`: Notifica cuando la tarjeta es seleccionada.
- **Accesibilidad (WCAG 2.2)**:
  - `role="radio"` o `role="checkbox"` según corresponda, con `aria-checked` dinámico.
  - Target size mínimo de 48px de altura (supera SC 2.5.8 ≥ 24px).
  - Operable 100% por teclado (`Tab`, `Space`, `Enter`).
  - Anillo de foco de alto contraste (`--oefa-focus-ring`) con outline visible.
  - No depende exclusivamente del color: incluye indicador visual de radio/check y badge explícito (SC 1.4.1).

### 8.14 Cargador de Documentos Accesible (`<oefa-file-uploader>`)
- **Componente Standalone**: Ubicado en `src/app/shared/components/file-uploader/file-uploader.component.ts`.
- **Propósito**: Proveer un área de arrastrar y soltar (drag & drop) o selector manual de documentos (PDFs/adjuntos) con validación inmediata de tamaño y formato.
- **Entradas (`Inputs`)**:
  - `accept: string`: Extensiones o tipos MIME permitidos (default: `'.pdf'`).
  - `maxSizeMb: number`: Peso máximo permitido en Megabytes (default: `10`).
  - `multiple: boolean`: Permite carga múltiple (default: `true`).
  - `label?: string`: Etiqueta principal (default: `'Documentos de sustento'`).
  - `hint?: string`: Texto explicativo (default: `'Solo archivos PDF de hasta 10 MB'`).
  - `disabled: boolean`: Desactiva la carga.
  - `files: File[]`: Lista actual de archivos cargados.
- **Salidas (`Outputs`)**:
  - `filesChange: EventEmitter<File[]>`: Emite la colección actualizada de archivos al agregar o eliminar.
  - `fileError: EventEmitter<string>`: Emite mensaje de validación si excede el tamaño o formato.
- **Accesibilidad (WCAG 2.2)**:
  - Región `aria-live="polite"` para notificar lectura de archivos adjuntados o eliminados sin interrumpir (SC 4.1.3).
  - Mensajes de error en línea con `role="alert"` (SC 3.3.1 / SC 3.3.3).
  - El botón "Seleccionar archivo" tiene foco accesible y está vinculado con `<input type="file" class="sr-only">`.
  - Zona de arrastre con feedback visual y contraste `≥ 3:1` (`--oefa-border-color`).
  - Botón de eliminación en lista con `aria-label="Eliminar archivo [nombre]"`.

### 8.15 Alertas Institucionales en Bloque (`<oefa-alert>`)
- **Componente Standalone**: Ubicado en `src/app/shared/components/alert/alert.component.ts`.
- **Propósito**: Notificar avisos contextuales permanentes o descartables en vistas y formularios con 5 estados semánticos del sistema de diseño.
- **Directriz de Estilo y Borde**: Se elimina el borde izquierdo grueso (`border-left: 4px`) en favor de un marco perimetral uniforme y limpio de 1px (`border: 1px solid var(--oefa-[variant]-container-hc)`), garantizando una estética moderna, equilibrada y armónica con esquinas redondeadas.
- **Variantes de Estado (`type`)**:
  - `info`: Azul institucional (`--oefa-primary-container`, borde `--oefa-primary-container-hc`, texto `--oefa-primary-on-container`).
  - `success`: Verde éxito (`--oefa-success-container`, borde `--oefa-success-container-hc`, texto `--oefa-success-on-container`).
  - `warning`: Ámbar advertencia (`--oefa-tertiary-container`, borde `--oefa-tertiary-container-hc`, texto `--oefa-tertiary-on-container`).
  - `error`: Rojo error/destructivo (`--oefa-error-container`, borde `--oefa-error-container-hc`, texto `--oefa-error-on-container`).
  - `neutral`: Gris institucional (`--oefa-surface-subtle`, borde `--oefa-border-color`, texto `--oefa-text-primary`).
- **Entradas (`Inputs`)**:
  - `type: 'info' | 'success' | 'warning' | 'error' | 'neutral'`: Tipo de alerta (default: `'info'`).
  - `title?: string`: Título o encabezado en negrita de la alerta.
  - `message?: string`: Mensaje descriptivo (también admite proyección con `<ng-content>`).
  - `dismissible: boolean`: Muestra botón de cierre `✕` accesible (default: `false`).
  - `showIcon: boolean`: Muestra ícono representativo de estado (default: `true`).
  - `bordered: boolean`: Estilo con marco perimetral uniforme de 1px (default: `true`). Si es `false`, se muestra plano sin borde.
- **Salidas (`Outputs`)**:
  - `dismissed: EventEmitter<void>`: Emite al pulsar el botón de cierre.
- **Accesibilidad (WCAG 2.2)**:
  - `role="alert"` dinámico en `error` y `warning` (SC 3.3.1 / SC 4.1.3).
  - `role="status"` o `role="region"` en `info`, `success` y `neutral`.
  - Contraste superior a 4.5:1 verificado en todos los estados tanto en tema claro como en modo oscuro.
### 8.16 Selector Institucional de Aplicativos (`<oefa-app-launcher>`)
- **Clasificación Atomic Design**: **Organismo Institucional del Shell**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/app-launcher/app-launcher.component.ts`.
- **Propósito**: Switcher centralizado de aplicativos para navegar entre sistemas del ecosistema OEFA según los permisos otorgados al usuario (Single Sign-On / IAM).
- **Entradas (`Inputs`)**:
  - `apps: OefaAppItem[]`: Colección dinámica de aplicaciones y permisos configurados para el usuario actual. Si no se provee, utiliza el catálogo institucional por defecto.
  - `currentAppId: string`: Identificador del sistema en ejecución (ej: `'seosc'`, `'saip'`) para marcarlo con el badge `ACTUAL`.
  - `title: string`: Título de la cabecera (default: `'Aplicativos y Servicios'`).
  - `helpdeskUrl: string`: Enlace institucional a Mesa de Ayuda OTI (default: `'https://mesadeayuda.oefa.gob.pe'`).
  - `viewMode: 'grid3x3' | 'list2col'`: Formato de visualización inicial (default: `'grid3x3'`).
- **Salidas (`Outputs`)**:
  - `appSelect: EventEmitter<OefaAppItem>`: Emite al pulsar una aplicación habilitada (`hasAccess: true`).
  - `requestAccess: EventEmitter<void>`: Emite al pulsar el enlace de solicitud de permisos para manejo local o redirección.
- **Modelo `OefaAppItem`**:
  ```typescript
  export interface OefaAppItem {
    id: string;
    name: string;
    shortName: string;
    description: string;
    category: 'operativo' | 'gestion' | 'apoyo';
    iconBg: string;
    iconGradient: string;
    iconColor: string;
    iconType: 'checklist' | 'document' | 'folder' | 'shield' | 'environment' | 'inbox' | 'workflow' | 'analytics';
    hasAccess: boolean;
    isCurrentApp?: boolean;
    url?: string;
    badge?: string;
  }
  ```
- **Alineación con Tokens y Menú de Usuario**:
  - Contenedor con `var(--oefa-surface-card)`, borde `var(--oefa-border-color)` y sombra `var(--oefa-shadow-flyout)`.
  - Cabecera y pie con `var(--oefa-surface-submenu)` delimitados por divisores institucionales.
  - Tarjetas 1:1 y detalladas con radio estándar `var(--oefa-radius-md)`.
- **Accesibilidad (WCAG 2.2)**:
  - Cierre automático con tecla `Escape` y clic fuera del flyout.
  - Botón disparador con atributos `aria-expanded`, `aria-haspopup="dialog"`, y `aria-label`.
### 8.17 Selector de Rango de Fechas (`<oefa-date-range-picker>`)
- **Clasificación Atomic Design**: **Molécula de Formulario**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/date-range-picker/date-range-picker.component.ts`.
- **Propósito**: Selección intuitiva y accesible de intervalos de fechas (inicio y fin) con sombreado dinámico continuo, presets de período rápido y soporte completo para Reactive Forms (`ControlValueAccessor`).
- **Entradas (`Inputs`)**:
  - `label?: string`: Etiqueta descriptiva accesible.
  - `placeholder: string`: Texto guía (default: `'DD/MM/AAAA — DD/MM/AAAA'`).
  - `min?: string`: Fecha mínima permitida en formato ISO (`'YYYY-MM-DD'`).
  - `max?: string`: Fecha máxima permitida en formato ISO (`'YYYY-MM-DD'`).
  - `disabled: boolean`: Estado deshabilitado.
  - `required: boolean`: Muestra asterisco de obligatoriedad y valida presencia.
  - `error?: string`: Mensaje descriptivo de error con `role="alert"`.
- **Salidas (`Outputs`)**:
  - `rangeChange: EventEmitter<OefaDateRange>`: Emite el objeto `{ start: string, end: string }` al confirmar la selección del rango.
- **Interacción y Sombreado**:
  - Clic en día 1: Establece inicio (`.range-start`) en círculo sólido con `--oefa-primary-root`.
  - Hover sobre días siguientes: Sombrea en tiempo real el intervalo previo (`.in-preview`).
  - Clic en día 2: Fija la fecha de fin (`.range-end`) y aplica franja continua con `--oefa-primary-container` y texto `--oefa-primary-on-container`.
  - Presets en un clic: Chips de "Hoy", "Últimos 7 días", "Últimos 30 días" y "Este mes".
- **Accesibilidad (WCAG 2.2)**:
  - Estructura WAI-ARIA Grid (`role="dialog"`, `role="grid"`, `role="gridcell"`).
  - Cada celda cuenta con `aria-label="[Día de la semana], [día] de [mes] de [año]"` y `aria-selected="true"`.
  - Región dinámica `aria-live="polite"` que verbaliza el estado para lectores de pantalla.
  - Navegación por teclado completa (flechas de dirección, PageUp/PageDown y Escape).

### 8.18 Barra de Progreso Accesible (`<oefa-progress-bar>`)
- **Clasificación Atomic Design**: **Átomo de Datos / Feedback**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/progress-bar/progress-bar.component.ts`.
- **Propósito**: Visualización estandarizada de avance físico, ejecución presupuestal, cumplimiento y métricas porcentuales con variantes semánticas y tamaños adaptables.
- **Entradas (`Inputs`)**:
  - `value: number`: Valor del progreso de 0 a 100 (clamp automático).
  - `variant: 'primary' | 'success' | 'warning' | 'danger'`: Variante semántica de color (default: `'primary'`).
  - `size: 'sm' | 'md' | 'lg'`: Grosor de la barra (`sm` = 6px para tablas, `md` = 8px estándar, `lg` = 12px para paneles destacados).
  - `label?: string`: Etiqueta descriptiva superior opcional.
  - `subtext?: string`: Texto contextual derecho (ej. "3/5 entregables" o montos).
  - `showValueText: boolean`: Muestra u oculta el texto con porcentaje (default: `false`).
- **Accesibilidad (WCAG 2.2)**:
  - Contenedor con `role="progressbar"`, `[attr.aria-valuenow]="value"`, `aria-valuemin="0"` y `aria-valuemax="100"`.
  - Etiqueta accesible mediante `[attr.aria-label]="label || 'Progreso ' + value + '%'"` para lectores de pantalla.
  - Contraste ≥ 4.5:1 en texto de valores sobre las superficies institucionales.

### 8.19 Diálogos Modales y Confirmaciones (`<oefa-modal>`)
- **Clasificación Atomic Design**: **Organismo de Diálogo / Feedback**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/modal/modal.component.ts`.
- **Propósito**: Ventanas emergentes de interacción focalizada, confirmaciones destructivas, avisos de plazo y visores de pantalla completa con backdrop blur accesible.
- **Entradas (`Inputs`)**:
  - `isOpen: boolean`: Control reactivo de visibilidad.
  - `title: string`: Título institucional accesible (`aria-labelledby`).
  - `subtitle?: string`: Subtítulo o código técnico complementario.
  - `variant: 'default' | 'info' | 'success' | 'warning' | 'danger'`: Variante semántica con ícono contextual representativo (la tarjeta modal mantiene contorno uniforme perimetral sin `border-top`).
  - `size: 'sm' | 'md' | 'lg' | 'xl' | 'full'`: Ancho adaptable (`sm` = 420px confirmaciones, `md` = 560px estándar, `lg` = 760px detalles, `xl` = 980px tablas complejas, `full` = pantalla completa para visores).
  - `confirmText?: string`, `cancelText?: string`: Textos de acciones principales.
  - `confirmVariant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'excel'`: Estilo del botón de confirmación (autocalculado según variante).
  - `showCloseButton: boolean`: Muestra botón de cierre `✕` (default: `true`).
  - `showFooter: boolean`: Muestra barra de acciones inferior (default: `true`).
  - `loading: boolean`: Estado de carga en botón de confirmación.
  - `closeOnBackdrop: boolean`: Permite cerrar al pulsar el backdrop (default: `true`).
- **Regla de Borde Perimetral (Ausencia de `border-top`)**:
  - Las tarjetas modales **no utilizan franjas o barras superiores coloreadas** (`border-top: none`).
  - Mantienen un borde perimetral sutil y uniforme `1px solid var(--oefa-border-color)` en todo su contorno.
  - La carga semántica de la variante (peligro, advertencia, éxito o información) se transmite de manera limpia y accesible mediante el contenedor de icono de 40px (`.modal-variant-icon`) y el botón de acción principal (`confirmVariant`).
- **Salidas (`Outputs`)**:
  - `confirm: EventEmitter<void>`: Evento de confirmación.
  - `cancel: EventEmitter<void>`: Evento de cancelación.
  - `close: EventEmitter<void>`: Evento general de cierre.
- **Accesibilidad (WCAG 2.2)**:
  - Atributos `role="dialog"` y `aria-modal="true"`.
  - Cierre inmediato mediante tecla `Escape` (cuando `showCloseButton` está activo).
  - Trampeo de clics y fondo blur de 2px con `var(--oefa-surface-overlay)`.

### 8.20 Botones Institucionales (`<oefa-button>`, `.btn`)
- **Clasificación Atomic Design**: **Átomo de Acción e Interacción**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/button/button.component.ts`.
- **Propósito**: Controles de pulsación para acciones directas, llamadas a la acción primarias, confirmaciones, cancelaciones y exportación de datos.
- **Regla de Borde y Ausencia de Glassmorphism**:
  - Para evitar efectos biselados o bordes traslúcidos no deseados heredados del agente de usuario (*user-agent stylesheet* del navegador), todo botón `.btn` define explícitamente `border: 1px solid transparent;`.
  - La variante secundaria aplica `border-color: var(--oefa-border-color);`, garantizando un delineado nítido institucional sin cambios dimensionales de caja.
- **Variantes Semánticas (`variant`)**:
  - `primary`: Azul institucional (`--oefa-primary-root`), texto `#FFFFFF`, sombra de elevación `0 2px 6px rgba(20, 74, 167, 0.25)`.
  - `secondary`: Superficie card (`--oefa-surface-card`), borde `--oefa-border-color`, texto `--oefa-text-primary`.
  - `ghost`: Fondo y borde transparentes; fondo sutil en hover (`--oefa-surface-muted`).
  - `excel`: Verde institucional (`#107C41`), texto `#FFFFFF` para exportaciones masivas.
  - `danger`: Rojo destructivo (`--oefa-error-root`), texto `#FFFFFF` para acciones irreversibles.
- **Tamaños (`size`)**:
  - `sm`: Padding `6px 14px`, tipografía `0.8125rem` (13px), radio `radius-sm` (6px).
  - `md`: Padding `9px 18px`, tipografía `0.875rem` (14px), radio `radius-md` (10px) *(Estándar)*.
  - `lg`: Padding `12px 24px`, tipografía `1rem` (16px), radio `radius-md` (10px).
- **Interacción y Material Motion M3**:
  - Curva de transición: `var(--oefa-ease-standard)`.
  - Duración de hover: `var(--oefa-duration-short)` (150ms).
  - Micro-compresión en active: `scale(0.98)` durante `var(--oefa-duration-short-1)` (50ms).
  - Anillo de enfoque: `2px solid var(--oefa-focus-ring)` con `outline-offset: 2px` en `:focus-visible`.

### 8.21 Panel Plegable / Divulgación Progresiva (`<oefa-collapsible>`)
- **Clasificación Atomic Design**: **Molécula de Contenedor / Layout Plegable**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/collapsible/collapsible.component.ts`.
- **Propósito**: Implementa el patrón de **Divulgación Progresiva (*Progressive Disclosure*)** para encapsular campos opcionales, filtros secundarios o secciones extensas sin saturar la vista inicial.
- **Entradas (`Inputs`)**:
  - `title: string`: Texto descriptivo de la sección plegable.
  - `badge?: string`: Etiqueta contextual opcional (ej: 'OPCIONAL', 'AVANZADO').
  - `badgeVariant?: 'neutral' | 'info' | 'primary'`: Estilo semántico del badge (default: 'neutral').
  - `isOpen: boolean`: Estado reactivo de despliegue (default: `false`).
  - `variant: 'dashed' | 'bordered' | 'card'`: Estilo visual de contorno (`dashed` punteado sutil para opcionales, `bordered` sólido, `card` con fondo).
  - `icon?: string`: Ícono opcional personalizado para la cabecera.
- **Salidas (`Outputs`)**:
  - `isOpenChange: EventEmitter<boolean>`: Emite el nuevo estado para soporte `[(isOpen)]`.
  - `toggled: EventEmitter<boolean>`: Evento de alternancia para analíticas o lógica de formulario.
- **Interacción y Material Motion M3**:
  - Chevron interactivo SVG con rotación fluida `rotate(180deg)` gobernada por `var(--oefa-ease-emphasized)` en `300ms`.
  - Despliegue de altura suave sin saltos bruscos.
- **Accesibilidad (WCAG 2.2)**:
  - Disparador nativo `<button>` con `[attr.aria-expanded]="isOpen"`.
  - Contenedor con `role="region"` y `[attr.aria-labelledby]`.
  - Foco visible accesible `var(--oefa-focus-ring)` con soporte de teclado `Enter` y `Espacio`.
  - Respeta `prefers-reduced-motion` cancelando la animación de rotación y despliegue.

### 8.22 Estados Vacíos y Sin Resultados (`<oefa-empty-state>`)
- **Clasificación Atomic Design**: **Molécula de Feedback / Estado de Vista**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/empty-state/empty-state.component.ts`.
- **Propósito**: Retroalimentación amigable, orientada a la acción y visualmente equilibrada cuando no hay registros, una búsqueda no arroja coincidencias o una bandeja/tabla se encuentra vacía.
- **Entradas (`Inputs`)**:
  - `icon: 'search' | 'inbox' | 'folder' | 'alert'`: Tipo de icono SVG vectorial institucional incorporado (default: `'search'`).
  - `title: string`: Título principal del estado (ej. "No se encontraron órdenes").
  - `description: string`: Mensaje explicativo o sugerencia de acción para el usuario.
  - `actionText?: string`: Etiqueta del botón de acción principal opcional (ej. "Limpiar Filtros").
  - `compact: boolean`: Modo compacto con icono de 52px y relleno optimizado para incrustarse dentro de tablas (`<td colspan="...">`) o tarjetas pequeñas (default: `false`).
- **Salidas (`Outputs`)**:
  - `actionClick: EventEmitter<void>`: Se dispara al pulsar el botón de acción configurado con `actionText`.
- **Slots / Proyección de Contenido (`ng-content`)**:
  - `[icon]`: Permite proyectar un icono o ilustración personalizada en reemplazo de los SVGs predeterminados.
  - Predeterminado (`<ng-content>`): Permite proyectar contenido secundario, guías o enlaces adicionales debajo de la descripción.
  - `[actions]`: Permite proyectar botones de acción personalizados o agrupaciones de botones complejas.
- **Tokens y Modo Oscuro**:
  - Círculo de icono: fondo `var(--oefa-surface-subtle)`, borde `var(--oefa-border-color)`, color de trazo `var(--oefa-primary-root)`.
  - Tipografía: Título con `var(--oefa-font-display)` y `var(--oefa-text-primary)`; descripción con `var(--oefa-text-secondary)`.
  - Transición suave de superficies con `var(--oefa-duration-short)` y `var(--oefa-ease-standard)`.
- **Accesibilidad (WCAG 2.2)**:
  - Contenedor con `role="region"` y `[attr.aria-label]="title || 'Estado vacío'"`.
  - Iconos decorativos encapsulados con `aria-hidden="true"`.
  - Botón de acción con foco visible y contraste accesible acorde al estándar `<oefa-button>`.

### 8.23 Átomo de Información y Tooltip Reutilizable (`<oefa-info-tooltip>`)
- **Clasificación Atomic Design**: **Átomo de Asistencia / Micro-Feedback**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/info-tooltip/info-tooltip.component.ts`.
- **Propósito**: Icono de ayuda circular institucional (`ⓘ`) que proporciona contexto adicional, instrucciones o glosarios rápidos mediante un tooltip accesible de alta respuesta (~150ms) en `:hover` y `:focus-visible`, sin saturar la interfaz. Reutilizable en pestañas, cabeceras de columnas en tablas, etiquetas de formularios y tarjetas de métricas.
- **Entradas (`Inputs`)**:
  - `text: string`: Mensaje o texto descriptivo desplegado en el tooltip institucional.
  - `position: 'top' | 'bottom' | 'left' | 'right'`: Posición preferida de la burbuja respecto al icono (default: `'top'`).
  - `size: 'sm' | 'md'`: Tamaño del icono (`sm` = 14px ideal para pestañas y formularios compactos, `md` = 16px para encabezados de sección).
  - `ariaLabel?: string`: Etiqueta accesible para lectores de pantalla (default: `'Más información'`).
- **Sistema de Posicionamiento Inteligente Antirrecorte (Zero Dependencias Externas)**:
  - **Inmunidad a Contenedores con Overflow (`document.body` Portal)**: El globo del tooltip se teletransporta directamente al final del `document.body` con `position: fixed` y `z-index: 10000`, evitando ser cortado por contenedores con `overflow: hidden`, `overflow-x: auto` o `overflow: scroll` (como pestañas, tarjetas y tablas).
  - **Detección Automática de Bordes (Auto-Flip)**: Mediante `getBoundingClientRect()`, detecta si el espacio libre hacia arriba es menor a la altura del tooltip; si es insuficiente, conmuta automáticamente a `'bottom'`. Del mismo modo conmuta entre `'left'` y `'right'` en márgenes estrechos.
  - **Alineación Horizontal Suave (Viewport Clamping)**: Si el icono está próximo al borde izquierdo o derecho de la pantalla, el tooltip se desplaza horizontalmente para mantenerse siempre dentro del viewport con un margen de seguridad de 8px, reorientando dinámicamente la flecha indicadora para que apunte con precisión al icono disparador.
- **Comportamiento y Ciclo de Vida**:
  - Detiene la propagación de eventos (`$event.stopPropagation()`) para prevenir activaciones accidentales del elemento contenedor (como tabs o filas de tabla).
  - Se cierra automáticamente al pulsar `Escape`, al hacer scroll en la ventana o al perder el foco (`blur`).
  - Destrucción segura en `ngOnDestroy` garantizando cero fugas de memoria o nodos huérfanos en el DOM.
- **Accesibilidad (WCAG 2.2 SC 1.4.13)**:
  - Foco visible con contorno accesible (`outline: 2px solid var(--oefa-focus-ring)`).
  - Soporta activación por teclado (`tabindex="0"`) y lectura completa mediante lectores de pantalla (`aria-label`).

### 8.24 Asistente de Pasos y Wizard Progresivo (`<oefa-stepper>`)
- **Clasificación Atomic Design**: **Molécula de Navegación Secuencial / Flujo Guiado**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/stepper/stepper.component.ts`.
- **Propósito**: Guía intuitiva para procesos secuenciales de registro, parametrización o confirmación en múltiples etapas.
- **Entradas (`Inputs`)**:
  - `steps: OefaStepItem[]`: Lista ordenada de pasos `{ title: string, description?: string, disabled?: boolean }`.
  - `currentStep: number`: Índice numérico del paso activo (1-based, default: `1`). Soporta enlace bidireccional `[(currentStep)]`.
  - `clickable: boolean`: Permite navegación directa al hacer clic en los pasos completados o habilitados (default: `false`).
  - `orientation: 'horizontal' | 'vertical'`: Disposición espacial de los pasos (default: `'horizontal'`).
- **Salidas (`Outputs`)**:
  - `currentStepChange: EventEmitter<number>`: Emite el nuevo índice activo.
  - `stepChange: EventEmitter<number>`: Notificación de cambio de paso para validaciones de formulario.
- **Adaptabilidad Progresiva Multi-Dispositivo**:
  - **Desktop (> 992px)**: Disposición horizontal completa con círculos de 36px, títulos y descripciones a la derecha, unidos por líneas de conexión fluidas.
  - **Tablet (641px – 992px)**: Distribución equitativa de ancho (`flex: 1 1 0`) con círculos centrados arriba y títulos truncados a dos líneas abajo (`-webkit-line-clamp: 2`).
  - **Móvil (≤ 640px)**: Barra continua con círculos compactos y **burbuja de diálogo activa** (`.mobile-speech-bubble`) que desplaza suavemente una flecha superior (`getArrowPositionPercentage()`) para señalar el paso en curso sin generar desbordamiento horizontal.
- **Accesibilidad (WCAG 2.2)**:
  - Estructura semántica con `<ol role="list">` y `<div role="navigation" aria-label="Progreso del asistente">`.
  - Círculos de estado con `aria-current="step"` y etiquetas completas `aria-label="Paso X: Título (Paso actual / Completado)"`.
  - Notificaciones en tiempo real para lectores de pantalla con `role="status"` y `aria-live="polite"` en móvil.
  - Navegación por teclado accesible con `Enter` y `Espacio`, y foco visible `outline: 2px solid var(--oefa-focus-ring)`.
  - *Nota*: Para especificación visual extendida, ver también la [Sección 11: Stepper y Wizard Progresivo](#11-componente-stepper-y-wizard-progresivo-oefa-stepper).

### 8.25 Panel de Filtros y Drawer Facetado (`<oefa-filter-sidebar>`)
- **Clasificación Atomic Design**: **Organismo de Búsqueda y Filtrado Facetado**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/filter-sidebar/filter-sidebar.component.ts`.
- **Propósito**: Refinamiento granular y estructurado de catálogos y bandejas de expedientes, adaptándose como panel sticky fijo en escritorio o como bottom sheet táctil con tirador en dispositivos móviles.
- **Entradas (`Inputs`)**:
  - `title: string`: Título principal (default: `'Refinar Búsqueda'`).
  - `activeCount: number`: Contador global de criterios aplicados.
  - `statusOptions?: FilterStatusOption[]`: Colección de chips con indicadores de estado (`value`, `label`).
  - `selectedStatus: string`: Clave del estado seleccionado (default: `'TODOS'`).
  - `showDateRange: boolean`: Conmuta bloque de fechas con `<oefa-date-picker>` (default: `true`).
  - `dateFrom: string`, `dateTo: string`: Fechas ISO de intervalo.
  - `showAmountRange: boolean`: Conmuta inputs numéricos con slider dual de rango (default: `true`).
  - `amountMin: number | null`, `amountMax: number | null`, `amountUnit: string`: Parámetros monetarios o sancionatorios.
  - `filterGroups: FilterGroupItem[]`: Acordeones facetados con checkboxes, conteos y buscador instantáneo.
  - `showSpecialConditions: boolean`: Conmuta interruptores con switches institucionales.
  - `flagMedidas: boolean`, `flagAlertas: boolean`: Banderas booleanas de filtrado rápido.
  - `isOpenMobile: boolean`: Apertura reactiva del bottom sheet en viewports reducidos (≤ 768px).
- **Salidas (`Outputs`)**:
  - `statusChange`, `dateFromChange`, `dateToChange`, `amountMinChange`, `amountMaxChange`, `groupToggle`, `optionToggle`, `clear`, `apply`, `closeMobile`.
- **Adaptabilidad y Ergonomía**:
  - **Desktop (≥ 769px)**: Sidebar fijo y sticky (`top: 16px`) con scrollbar estilizado (`overflow-y: auto`) y barra inferior de acciones persistente (`.fs-sticky-footer`).
  - **Móvil (≤ 768px)**: Bottom sheet con tirador (`.fs-sheet-handle`), `max-height: 88vh`, backdrop con desenfoque (`backdrop-filter: blur(3px)`) y animación M3 `var(--oefa-ease-emphasized-decel)`.
- *Nota*: Para la tabla detallada de propiedades, ver también la [Sección 16: Filter Sidebar](#16-filter-sidebar-oefa-filter-sidebar).

### 8.26 Paneles Laterales y Side Canvas (`<oefa-drawer>`)
- **Clasificación Atomic Design**: **Organismo de Inspección y Flujos Secundarios**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/drawer/drawer.component.ts`.
- **Propósito**: Despliegue de fichas de detalle, formularios de edición rápida, auditoría de expedientes y paneles auxiliares sin salir del contexto de la pantalla ni provocar recargas.
- **Entradas (`Inputs`)**:
  - `isOpen: boolean`: Controla la visibilidad del drawer y activa el bloqueo de scroll del fondo (`overflow: hidden`).
  - `title: string`: Título principal del encabezado.
  - `subtitle?: string`: Texto complementario o código de expediente.
  - `badge?: string`: Insignia o tag resumido (ej. `"CONFORME"`, `"PENDIENTE"`, `"N° 01"`).
  - `position: DrawerPosition`: Orientación de entrada (`'right'` default, `'left'`, `'bottom'`).
  - `size: DrawerSize`: Ancho del panel (`'sm'` [380px], `'md'` [480px default], `'lg'` [640px], `'xl'` [800px], `'full'` [100vw]).
  - `closeOnBackdrop: boolean`: Permite cerrar al pulsar fuera del panel (default: `true`).
  - `closeOnEsc: boolean`: Permite cerrar mediante la tecla `Escape` (default: `true`).
- **Salidas (`Outputs`)**:
  - `closed: EventEmitter<void>`: Evento emitido al pulsar cerrar, backdrop o `Escape`.
- **Zonas de Proyección (`Slots`)**:
  - `[header-actions]`: Acciones secundarias en cabecera junto al título.
  - `[default]` (`<ng-content />`): Contenedor de cuerpo con scroll vertical protegido (`overflow-y: auto`).
  - `[footer]`: Barra fija de acciones inferiores con fondo sutil y alineación flexible.
- **Accesibilidad (WCAG 2.2)**:
  - Diálogo modal con `role="dialog"`, `aria-modal="true"` y rotulado accesible (`aria-label` / `aria-labelledby`).
  - Botón de cierre estandarizado `<oefa-icon-button variant="close">` con `title="Cerrar panel (Esc)"`.
  - Captura y restablecimiento de foco tras el cierre y bloqueo reactivo de scroll en `document.body`.
  - Animación elástica decelerada `var(--oefa-ease-emphasized-decel)` con anulación en `@media (prefers-reduced-motion: reduce)`.

### 8.27 Encabezado de Página Institucional (`<oefa-page-header>`)
- **Clasificación Atomic Design**: **Organismo de Estructura y Navegación de Vista**.
- **Componente Standalone**: Ubicado en `src/app/shared/components/page-header/page-header.component.ts`.
- **Propósito**: Proporcionar el ancla semántica primaria (`<h1>`) de cada pantalla del sistema, integrando migas de pan (`breadcrumbs`), subtítulo contextual, badges de estado del negocio y barras de acciones primarias/secundarias.
- **Entradas (`Inputs`)**:
  - `title: string`: Título principal obligatorio de la pantalla (renderizado en un `<h1>`).
  - `subtitle?: string`: Descripción o metadato descriptivo (ej. "RUC", "Proveedor", "Fecha de corte").
  - `badgeText?: string`: Etiqueta textual visible dentro del badge de estado.
  - `badgeStatus?: string`: Estado del badge que mapea a tokens (`'info'`, `'exito'`, `'FINALIZADO'`, `'OBSERVADO'`, etc.).
  - `breadcrumbs?: BreadcrumbItem[]`: Colección de migas de pan `{ label: string; url?: string }`.
  - `showBack?: boolean`: Muestra un botón accesible de retroceso a la izquierda del título.
  - `backUrl?: string`: Ruta de redirección directa al pulsar retroceso.
- **Salidas (`Outputs`)**:
  - `back: EventEmitter<void>`: Disparado al pulsar el botón de retroceso.
- **Zonas de Proyección (`Slots`)**:
  - `[actions]`: Contenedor para conmutadores de vista (`<oefa-segmented-switch>`), botones principales (`<oefa-button>`) o kebab menu.
  - `[extra]`: Zona inferior opcional para resúmenes estadísticos rápidos o filtros complementarios.
- **Accesibilidad (WCAG 2.2)**:
  - Estructura semántica única con landmark `<header role="banner">` y `<h1>` principal con tipografía display institucional.
  - Navegación breadcrumb dentro de `<nav aria-label="Ruta de navegación">` con lista ordenada `<ol>`, enlaces con `:focus-visible` y `aria-current="page"` en el último elemento.
  - Botón de retroceso accesible con `aria-label="Regresar a la página anterior"` y contraste mínimo 4.5:1.

---





## 10. Modo Oscuro Institucional (Dark Mode) & Estándar WCAG 2.2

### 10.1 Filosofía de Diseño: Elevación Tonal de Superficies
El modo oscuro del OEFA **no es una simple inversión cromática negativa** ni un fondo `#000000` puro (lo cual genera fatiga visual y deslumbramiento tipo halación). Sigue el modelo de capas y elevación de Material Design 3 y estándares de ergonomía visual:
- **Capa Base (Canvas/App)**: Azul pizarra oscuro institucional profundo (`#0B1120`). Representa la superficie más lejana y descansada para la vista.
- **Capa Contenedora (Cards / Rail / Header)**: Azul oscuro elevado (`#131C2E` / `#1E293B`).
- **Capa Secundaria / Elementos sutiles (Table Headers, Zebra, Hover)**: Tono intermedio (`#172238` / `#243248`).
- **Capa Flotante / Modales / Flyouts**: Mayor luminosidad para indicar proximidad y superposición (`#1E293B` con borde `#334155` y sombra profunda).

### 10.2 Cumplimiento Estricto de WCAG 2.2
Todo color, texto, icono y borde activo en Modo Oscuro debe verificar los siguientes criterios de éxito:
1. **SC 1.4.3 Contraste (Mínimo) [Nivel AA]**:
   - Texto primario (`#F8FAFC`) sobre fondo base (`#0B1120`): **15.2:1** (Supera ampliamente AAA).
   - Texto secundario (`#CBD5E1`) sobre superficies (`#131C2E`): **8.9:1** (Cumple AAA).
   - Texto atenuado/muted (`#94A3B8`): **5.4:1** (Cumple AA ≥ 4.5:1).
2. **SC 1.4.11 Contraste de Contenido No Textual [Nivel AA]**:
   - Bordes de inputs, checkboxes, separadores y tarjetas (`#334155`) vs fondos adyacentes: **≥ 3:1**.
   - Iconos interactivos y estados inactivos: **≥ 3:1**.
3. **SC 2.4.7 / SC 2.4.13 Foco Visible y Apariencia del Foco [Nivel AA/AAA]**:
   - Anillo de enfoque (`--oefa-focus-ring`): contorno visible de 2px con color de alto contraste (`#76A3EF` en dark / `#144AA7` en light) y separación (`outline-offset: 2px`).
4. **SC 1.4.1 Uso del Color**:
   - Todo estado (observado, conforme, registrado) combina color + icono o texto explícito, nunca solo color.

### 10.3 Inversión Armónica de Roles Semánticos
En fondos oscuros, el tono raíz claro no puede ser idéntico al del modo diurno. Se utiliza la rampa tonal institucional verificada:
| Rol Semántico | Modo Claro (Light) | Modo Oscuro (Dark) | Rango Tonal Dark | Ratio WCAG en Dark |
|---|---|---|---|---|
| **Primary Root** | `#144AA7` (Tonal 40) | `#76A3EF` (Tonal 70) | Acento legible | > 6.5:1 |
| **Primary On** | `#FFFFFF` | `#05142E` (Tonal 10) | Texto en botón primario | > 10:1 |
| **Primary Container** | `#EEF4FF` | `#103D89` (Tonal 30) | Fondo chip/badge | — |
| **Primary On-Container** | `#002463` | `#D1E0FA` (Tonal 90) | Texto en chip/badge | > 7.5:1 |
| **Secondary Root** | `#44BFB5` / `#2C817A` | `#67CBC3` / `#8DD8D2` | Acento secundario | > 8:1 |
| **Secondary Container** | `#EEFFFE` | `#134F49` (On: `#D9F2F0`) | Previsiones/Avisos | > 6:1 |
| **Tertiary / Warning** | `#FFB500` / `#996D00` | `#FFD366` (Tonal 70) | Advertencias/Observaciones | > 11:1 |
| **Warning Container** | `#FFF0CC` | `#4D3600` (On: `#FFE199`) | Fondo de observación | > 8:1 |
| **Success** | `#8CCD3A` / `#578221` | `#A0D65C` (Tonal 60) | Estados Conforme/Aprobado | > 9.5:1 |
| **Success Container** | `#F7FFEE` | `#233B0C` (On: `#E7F5D6`) | Fondo de éxito | > 8:1 |
| **Error / Destructivo** | `#E51A2F` | `#F87171` / `#EF7682` | Desestimado/Errores | > 6.5:1 |
| **Error Container** | `#FFEFF1` | `#4A0D15` (On: `#FAD1D5`) | Fondo de error | > 7:1 |

### 10.4 Regla de Oro para Todos los Sistemas OEFA
> **PROHIBICIÓN ESTRICTA:** Queda terminantemente prohibido declarar valores hexadecimales fijos (`#FFFFFF`, `#F8FAFC`, `#000000`, etc.) en archivos locales `*.component.css` o reglas de vista. Todo color de fondo, texto, borde, icono o sombra **DEBE** referenciar las variables semánticas `--oefa-*`. De esta forma, cualquier sistema institucional heredará el cambio de tema automáticamente con 100% de consistencia.

### 10.5 Implementación Técnica Estándar
- Selector primario: Atributo `[data-theme="dark"]` en la raíz `<html>`.
- Soporte automático del SO: `@media (prefers-color-scheme: dark)` activo cuando el usuario no ha forzado un tema manual.
- Persistencia: Servicio `ThemeService` con guardado en `localStorage('oefa-theme')` y valores `light | dark | system`.

### 10.6 Feedback y Carga: Skeleton vs. Spinner (WCAG 2.2)

| Criterio | Skeleton Loading (`<oefa-skeleton>`) | Spinner (`<oefa-spinner>`) |
|---|---|---|
| **Definición** | Silueta dimensional que imita la estructura exacta del contenido por llegar. | Indicador circular rotativo de actividad indeterminada. |
| **¿Cuándo usarlo?** | **Cargas iniciales y de estructura conocida:** tablas de datos, vistas de detalle, cards de métricas, listas y formularios completos. | **Acciones puntuales disparadas por el usuario:** guardar formulario, exportar Excel, procesar pago o micro-spinners dentro de botones. |
| **Impacto WCAG / UX** | **Previene Cumulative Layout Shift (CLS - SC 2.2):** reserva el espacio exacto impidiendo saltos visuales de contenido. | No reserva espacio estructural; centra la atención en que un proceso background está en curso. |
| **Atributos de Accesibilidad** | - `aria-hidden="true"` en los bloques skeleton.<br>- `aria-busy="true"` en el contenedor padre hasta completar la carga.<br>- Texto descriptivo `<span class="sr-only">Cargando datos...</span>`. | - `role="status"` o `role="progressbar"`.<br>- `aria-live="polite"`.<br>- `aria-label="Cargando..."` explícito. |
| **Regla de decisión** | Si la pantalla **ya conoce dónde va el texto, tabla o tarjeta**, usa **Skeleton**.<br>Si la pantalla **está esperando una transacción o respuesta asíncrona tras un clic**, usa **Spinner**. |

---

## 11. Componente: Stepper y Wizard Progresivo (`<oefa-stepper>`)

### 11.1 Propósito y Filosofía Responsive
El componente `<oefa-stepper>` guía flujos de trabajo secuenciales en la plataforma OEFA. Su diseño horizontal implementa adaptabilidad progresiva sin romper la continuidad del flujo ni generar desbordes horizontales:

| Dispositivo / Viewport | Comportamiento Visual | Especificación CSS / UX |
|---|---|---|
| **Desktop (> 992px)** | Completo horizontal | Círculo numérico (36px) + Título + Descripción completa en cada paso. Líneas conectoras fluidas automáticas. |
| **Tablet (641px – 992px)** | Columnas equitativas (`flex: 1 1 0`) | Círculo centrado arriba y **Título centrado debajo** de cada paso. Oculta descripciones extensas. `min-width: 0` y `-webkit-line-clamp: 2` para evitar desalineación entre pasos cortos y largos. Línea conectora alineada de centro a centro. |
| **Móvil (≤ 640px)** | Barra continua + Burbuja con flecha dinámica | Círculos numéricos (36px) en barra continua con líneas conectoras reforzadas (3px). Debajo, una **burbuja de diálogo a ancho completo (100%)** con fondo `Primary Container` y una **flecha indicadora dinámica** en la parte superior que apunta con precisión geométrica (`calc(...)` + transición suave) hacia el círculo del paso activo. |

### 11.2 Accesibilidad (WCAG 2.2 Nivel AA)
- **Navegación por teclado:** Cada paso interactivo admite foco con contorno visible (`--oefa-focus-ring`) y activación mediante teclas `Enter` y `Espacio`.
- **Lectores de pantalla:** La barra usa lista semántica ordenada (`<ol role="list">`), etiquetas dinámicas `aria-label="Paso X: Título (Paso actual / Completado)"` y atributo `aria-current="step"`.
- **Anuncios de cambio de estado:** La burbuja informativa móvil utiliza `role="status"` y `aria-live="polite"` para notificar cambios de paso a usuarios invidentes sin interrumpir su navegación.
- **Ratio de contraste:** El texto sobre la burbuja cumple ratio > 7.5:1 sobre fondo `Primary Container`.

### 11.3 Modo Vertical
Para paneles laterales (drawers), asistentes en tarjetas estrechas o procesos de auditoría, se utiliza `orientation="vertical"`, manteniendo la alineación del círculo con línea vertical izquierda continua.

---

## 12. Navegación Móvil Jerárquica: Patrón Drill-Down (`<app-mobile-nav-drawer>`)

### 12.1 Problemática y Solución
En pantallas móviles (≤ 768px), los árboles de 3 o más niveles (*Padre → Hijo → Nieto*) sufren problemas de compresión y scroll excesivo con acordeones tradicionales. OEFA adopta el patrón **Drill-Down (Paneles Deslizantes por Pila)**:

| Característica | Implementación Técnica | Beneficio UX / Institucional |
|---|---|---|
| **Estructura por Niveles** | Pila de navegación reactiva (`navStack: signal<MobileNavLevel[]>`). | Ancho completo (100%) para cada nivel de texto; ningún rótulo se comprime por sangrías. |
| **Cabecera Dinámica** | Botón `← Volver` con etiqueta contextual (*"Volver a [Nivel Anterior]"*). | Orientación espacial inmediata del usuario. |
| **Acciones y Cierre** | Selección de enlace final navega y auto-cierra el drawer reseteando la pila al menú raíz. | Flujo limpio sin residuos de navegación previa. |
| **Accesibilidad (WCAG 2.2)** | `role="dialog"`, `aria-modal="true"`, foco visible y soporte de navegación por teclado (`Enter`, `Espacio`). | Navegación autónoma para lectores de pantalla y tecnología de asistencia. |

---

## 13. Motion & Micro-interacciones (Material 3 Expressive)

### 13.1 Filosofía de Movimiento Institucional
El movimiento en OEFA cumple un rol funcional de orientación y feedback táctil; no es meramente decorativo. Sigue los lineamientos de **Material 3 Expressive**:
1. **Físicas de resorte y desaceleración:** Los elementos interactivos no se mueven de forma mecánica ni lineal; usan curvas cúbicas con desaceleración natural.
2. **Jerarquía temporal:**
   - Feedback táctil (clicks, switches, checkmarks): `150ms` (`--oefa-duration-short`).
   - Transiciones de superficie (hover, cards bento, flyouts): `300ms` (`--oefa-duration-medium`).
   - Despliegue de estructuras (modales, drawers laterales): `450ms` (`--oefa-duration-long`).

### 13.2 Catálogo de Curvas Easing
| Token CSS | Curva Cúbica | Uso Recomendado |
|---|---|---|
| `--oefa-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Hover de botones, checkboxes, inputs y chips |
| `--oefa-ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Elevaciones fluidas, tarjetas bento y morphing |
| `--oefa-ease-emphasized-decel` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Entrada de modales, drawers y elementos al viewport |
| `--oefa-ease-emphasized-accel` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Salida rápida de elementos fuera de pantalla |

### 13.3 Matriz de Asignación de Motion en Componentes Reutilizables
| Categoría | Componentes | Curva Easing | Duración | Comportamiento Físico |
|---|---|---|---|---|
| **Overlays / Capas** | `<oefa-modal>`, `<oefa-drawer>`, `<oefa-filter-sidebar>` | `var(--oefa-ease-emphasized-decel)` | `var(--oefa-duration-long-1)` (350ms) / `var(--oefa-duration-long)` (450ms) | Entrada elástica natural con fade + slide; salida rápida (`emphasized-accel`). |
| **Flyouts & Toasts** | `<oefa-dropdown>`, `<oefa-toast>` | `var(--oefa-ease-emphasized-decel)` | `var(--oefa-duration-medium-1)` (250ms) / `var(--oefa-duration-short-4)` (200ms) | Pop suave con escala `0.98 -> 1` y micro-desplazamiento vertical. |
| **Controles & Botones** | `<oefa-button>`, `<oefa-icon-button>`, `<oefa-chip>` | `var(--oefa-ease-standard)` | `var(--oefa-duration-short)` (150ms) / active `50ms` | Feedback táctil inmediato en hover y micro-compresión `scale(0.98)` en active. |
| **Switches y Tabs** | `<oefa-segmented-switch>`, `<oefa-tabs>` | `var(--oefa-ease-emphasized)` | `var(--oefa-duration-medium-1)` (250ms) | Desplazamiento elástico de la pastilla activa (thumb) sin cortes. |
| **Tarjetas Bento & Catálogo** | `<oefa-bento-kpi-tile>`, `<oefa-catalog-card>` | `var(--oefa-ease-emphasized)` | `var(--oefa-duration-medium)` (300ms) | Elevación suave `translateY(-4px)` + micro-rotación del contenedor de ícono (`rotate(8deg) scale(1.12)`). |
| **Tarjetas de Selección** | `<oefa-selection-card>` | `var(--oefa-ease-emphasized)` | `var(--oefa-duration-medium)` (300ms) | Micro-elevación `translateY(-2px)`, sombra ambiental y tilt de ícono proyectado (`rotate(8deg) scale(1.10)`). |
| **Lanzador de Apps & Cuadrícula** | `<oefa-app-launcher>` | `var(--oefa-ease-emphasized)` | `var(--oefa-duration-short-4)` (200ms) | Elevación táctil y micro-rotación en squircle vectorial (`rotate(8deg) scale(1.12)`). |
| **Dropzone de Archivos** | `<oefa-file-uploader>` | `var(--oefa-ease-emphasized)` | `var(--oefa-duration-medium)` (300ms) | Micro-inclinación y elevación de ícono nube (`translateY(-4px) rotate(-6deg) scale(1.10)`) en hover y dragover. |
| **Alertas & Mensajes** | `<oefa-alert>` | `var(--oefa-ease-standard-accel)` | `var(--oefa-duration-short-4)` (200ms) | Desvanecimiento y colapso de altura al descartar. |

### 13.4 Micro-interacciones de Énfasis: Micro-rotación de Íconos (Icon Tilt)
- **Concepto M3 Expressive**: Transmite receptividad y dinamismo táctil previo al clic.
- **Regla de Aplicación**: Se limita a **contenedores interactivos de selección o destino** (bento tiles, tarjetas de catálogo, selección de opciones, lanzador de aplicativos, dropzone).
- **Parámetros Estándar**:
  - Transformación: `rotate(8deg) scale(1.12)` (o `rotate(-6deg)` en subida).
  - Curva de transición: `var(--oefa-ease-emphasized)`.
  - Duración: `var(--oefa-duration-medium)` (300ms) o `var(--oefa-duration-short-4)` (200ms).
- **Restricción de Contención**: Prohibido en tablas de datos, inputs de texto, barras de progreso y modales para no generar fatiga visual.

### 13.5 Utilidades Globales de Animación
- `.oefa-motion-fade-in`: Fundido de entrada suave.
- `.oefa-motion-scale-in`: Aparición escalonada con micro-zoom.
- `.oefa-motion-slide-up`: Entrada ascendente para alertas y cards.
- `.oefa-motion-spring-hover`: Efecto táctil de elevación (-3px) y amortiguación elástica en active.

### 13.6 Accesibilidad Obligatoria (WCAG 2.2 SC 2.3.3)
Todo el sistema respeta las preferencias del sistema operativo mediante `@media (prefers-reduced-motion: reduce)`. Las duraciones se reducen automáticamente a `0.01ms` para usuarios con sensibilidad vestibular o mareo por movimiento.

---

## 14. Bento KPI Tile (`<oefa-bento-kpi-tile>`)

### 14.1 Propósito y Filosofía Visual
Tarjeta modular para métricas clave inspirada en la estética Bento moderna:
- **Esquinas suaves:** `border-radius: 20px` sin bordes perimetrales duros.
- **Fills pasteles contextuales:** Fondos tintados suaves derivados de los contenedores institucionales (`--oefa-primary-container`, `--oefa-secondary-container`, etc.).
- **Micro-gráficos SVG incrustados:** Cuatro modalidades reactivas (`donut`, `gauge`, `bars`, `sparkline`).
- **Físicas de interacción M3:** Elevación táctil de `-4px` con curva elástica `var(--oefa-ease-emphasized)`.

### 14.2 API del Componente
| Propiedad | Tipo | Descripción |
|---|---|---|
| `[sector]` | `string` | Nombre del sector o subdirección superior. |
| `[title]` | `string` | Título del indicador o proceso institucional. |
| `[value]` | `string` | Valor numérico principal destacado (ej: '1,248', '94.2%'). |
| `[metricLabel]` | `string` | Etiqueta de apoyo contextual con punto indicador. |
| `[trendLabel]` | `string` | Indicador de tendencia o píldora de avance. |
| `[periodLabel]` | `string` | Temporalidad del dato (ej: 'Periodo anual 2024'). |
| `[icon]` | `string` | Clave del ícono SVG (`factory`, `droplets`, `scale`, `leaf`, `chart`). |
| `[bgTint]` | `string` | Color de fondo pastel tintado. |
| `[accentColor]` | `string` | Color de acento institucional para el gráfico y enlaces. |
| `[chip]` | `BentoChipConfig` | Chip opcional para vincular código SIGED, proyecto o entregable. |
| `[status]` | `string` | Código de estado OEFA para badge semántico. |
| `[chartType]` | `'donut' \| 'gauge' \| 'bars' \| 'sparkline' \| 'none'` | Tipo de micro-gráfico visual. |
| `[percentage]` | `number` | Porcentaje de avance para donuts y gauges (0 a 100). |
| `(tileClick)` | `EventEmitter<void>` | Evento emitido al hacer clic o presionar Enter en la tarjeta. |
| `(linkClick)` | `EventEmitter<Event>` | Evento emitido al hacer clic en el enlace de detalle inferior. |

---

## 15. Catalog Card Bento (`<oefa-catalog-card>`)

### 15.1 Propósito y Estructura
Tarjeta de catálogo institucional para exploración de sistemas, módulos y tableros temáticos:
- **Radio amigable:** `border-radius: 18px` con elevación y sombras reactivas.
- **Header con doble nivel de clasificación:** Ícono contenedor a la izquierda y badges combinados de estado (`<oefa-status-badge>`) y tipo de módulo a la derecha.
- **Etiquetado flexible:** Admite chips institucionales (`[PRY]`, `[MNT]`, `[SIGED]`) junto a tags contextuales planos.
- **Micro-indicador de actividad en vivo:** Tres modalidades de feedback en footer:
  - `sparkline`: Gráfico de tendencia SVG.
  - `bar`: Barra de carga/progreso mini.
  - `pulse`: Punto pulsante verde en tiempo real (*"En línea"*).
- **Acción táctil adaptable:** Botón `Abrir →` con hover transform horizontal.

### 15.2 API del Componente
| Propiedad | Tipo | Descripción |
|---|---|---|
| `[icon]` | `string` | Ícono representativo (`pickaxe`, `waves`, `scale`, `clipboard-check`, `default`). |
| `[title]` | `string` | Nombre del tablero o módulo. |
| `[description]` | `string` | Descripción del objetivo funcional (soporta clamp de 2 líneas). |
| `[tags]` | `string[]` | Etiquetas de texto secundarias. |
| `[chips]` | `CatalogChipConfig[]` | Chips institucionales OEFA con variantes semánticas. |
| `[status]` | `string` | Estado para el badge semántico. |
| `[type]` | `string` | Tipo de clasificación (ej: 'Misional • Minería'). |
| `[color]` | `string` | Color temático primario de la tarjeta. |
| `[bgTint]` | `string` | Tinte de fondo para el badge y botón. |
| `[activityType]` | `'sparkline' \| 'bar' \| 'pulse' \| 'none'` | Tipo de micro-indicador en footer. |
| `[activityLabel]` | `string` | Texto descriptivo de la actividad. |
| `[updatedAt]` | `string` | Timestamp de última actualización (ej: 'Hace 10 min'). |
| `[actionText]` | `string` | Texto del botón (por defecto 'Abrir'). |
| `(cardClick)` | `EventEmitter<void>` | Disparado al presionar la tarjeta completa. |
| `(actionClick)` | `EventEmitter<Event>` | Disparado al pulsar el botón de acción específico. |

---

## 16. Filter Sidebar (`<oefa-filter-sidebar>`)

### 16.1 Propósito y Comportamiento Híbrido
Organismo para refinamiento de listas densas y catálogos de expedientes:
- **Desktop (>= 769px):** Panel lateral fijo y sticky con altura adaptativa, scroll interno y footer fijo para acciones inmediatas (*Aplicar* / *Limpiar*).
- **Móvil (<= 768px):** Bottom sheet táctil (`max-height: 88vh`) con tirador de arrastre (`handle bar`), backdrop translúcido con desenfoque (`backdrop-filter: blur(3px)`) y animación elástica de entrada M3.
- **Secciones integradas:** Chips de estado, selectores de rango de fecha, inputs numéricos con slider dual de apoyo, acordeones facetados con buscador instantáneo y switches booleanos.

### 16.2 API del Componente
| Propiedad | Tipo | Descripción |
|---|---|---|
| `[title]` | `string` | Título del panel (por defecto 'Refinar Búsqueda'). |
| `[activeCount]` | `number` | Contador de filtros activos reflejado en botones y badge. |
| `[statusOptions]` | `FilterStatusOption[]` | Opciones de estado para chips interactivos. |
| `[selectedStatus]` | `string` | Estado seleccionado actualmente. |
| `[dateFrom]` / `[dateTo]` | `string` | Rango de fechas ISO (`YYYY-MM-DD`). |
| `[amountMin]` / `[amountMax]` | `number` | Rango numérico monetario o sancionatorio. |
| `[amountUnit]` | `string` | Etiqueta de unidad (por defecto 'UIT'). |
| `[filterGroups]` | `FilterGroupItem[]` | Colección de grupos facetados con checkboxes y conteos. |
| `[isOpenMobile]` | `boolean` | Controla la apertura del bottom sheet en móvil. |
| `(clear)` | `EventEmitter<void>` | Disparado al presionar "Limpiar todo". |
| `(apply)` | `EventEmitter<void>` | Disparado al pulsar el botón principal "Aplicar". |
| `(closeMobile)` | `EventEmitter<void>` | Disparado al tocar el backdrop o el botón de cierre móvil. |

---

## 17. Side Canvas Drawer (`<oefa-drawer>`)

### 17.1 Propósito y Ergonomía de Pantalla
Componente contenedor deslizante sobrevolapado (Side Sheet / Canvas) diseñado para mantener al usuario enfocado en la vista principal mientras inspecciona o edita información complementaria:
- **Inspección de Detalle:** Despliegue de datos extendidos de una orden de servicio, trazabilidad SIGED o historial de observaciones sin abandonar la matriz de datos.
- **Formularios de Edición Rápida:** Edición in-situ con validaciones y acciones en el footer fijo (`[footer]`).
- **Navegación Táctil Móvil:** En dispositivos móviles o con `position="bottom"`, se transforma en un bottom sheet ergonómico adaptado a una sola mano.

### 17.2 API del Componente
| Propiedad | Tipo | Default | Descripción |
|---|---|---|---|
| `[isOpen]` | `boolean` | `false` | Abre/cierra el drawer y gestiona el bloqueo de scroll (`document.body`). |
| `[title]` | `string` | `''` | Título del encabezado. |
| `[subtitle]` | `string` | `''` | Subtítulo explicativo o metadato bajo el título. |
| `[badge]` | `string` | `''` | Insignia compacta numérica o de estado en la cabecera. |
| `[position]` | `'right' \| 'left' \| 'bottom'` | `'right'` | Lado de acoplamiento del panel. |
| `[size]` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Ancho máximo: `sm` (380px), `md` (480px), `lg` (640px), `xl` (800px), `full` (100vw). |
| `[closeOnBackdrop]` | `boolean` | `true` | Cierra al hacer clic en el overlay difuminado. |
| `[closeOnEsc]` | `boolean` | `true` | Cierra al presionar la tecla `Escape`. |
| `(closed)` | `EventEmitter<void>` | — | Notifica al contenedor cuando el drawer se cierra. |

---

## 18. Encabezado de Página Institucional (`<oefa-page-header>`)

### 18.1 Propósito y Composición Visual
Organismo que encabeza cada módulo del sistema, unificando la identidad del módulo, el contexto jerárquico de navegación (breadcrumbs) y los puntos de interacción principales:
- **Jerarquía Semántica:** Único contenedor en el DOM que debe alojar el elemento `<h1>` principal de la vista activa.
- **Ruta de Navegación (Breadcrumbs):** Indica al usuario su ubicación relativa dentro del árbol del aplicativo, con enlaces navegables y separadores accesibles.
- **Badges de Contexto Inmediato:** Permite adjuntar insignias de estado operacional (`Vigente`, `Conforme`, `Observado`, etc.) alineadas directamente al título.
- **Zona de Acciones Contextuales (`[actions]`):** Espacio reservado para herramientas de visualización (cards/tabla/bento), botones de exportación Excel y botones primarios de acción.
- **Soporte Responsivo:** En resoluciones móviles (≤ 768px), el título ajusta su tamaño tipográfico de `1.5rem` a `1.25rem`, y la barra de acciones pasa a ocupar el ancho completo preservando orden visual.

### 18.2 API del Componente
| Propiedad | Tipo | Default | Descripción |
|---|---|---|---|
| `[title]` | `string` | `''` | Título principal de la página (`<h1>`). |
| `[subtitle]` | `string` | `''` | Subtítulo descriptivo o metadatos informativos. |
| `[badgeText]` | `string` | `''` | Texto del badge institucional adjunto al título. |
| `[badgeStatus]` | `string` | `'info'` | Variante o estado semántico del badge (`'info'`, `'exito'`, etc.). |
| `[breadcrumbs]` | `BreadcrumbItem[]` | `[]` | Lista de nodos de migas de pan `{ label, url? }`. |
| `[showBack]` | `boolean` | `false` | Activa el botón de retorno rápido a la izquierda del título. |
| `[backUrl]` | `string` | `''` | Ruta opcional a navegar automáticamente al pulsar retroceso. |
| `(back)` | `EventEmitter<void>` | — | Evento emitido al hacer clic en el botón de retroceso. |

---

## 19. Tablas y Matrices de Datos (`<oefa-table>`, `.excel-data-table`, `.gmail-table`)

### 19.1 Arquitectura y Criterios de Selección
OEFA cuenta con tres patrones estandarizados según la densidad y naturaleza del flujo de trabajo:
1. **Bandeja de Catálogo (`<oefa-table>` / `.data-table`):** Para listas densas con paginación (`<oefa-pagination>`), ordenamiento por columnas, estados de carga y búsqueda rápida.
2. **Matriz Plana de Supervisión (`.excel-data-table`):** Para seguimiento presupuestal y de plazos LPAG con celdas agrupadas (`rowspan`), bordes de celda tipo cuadrícula, números monoespaciados alineados a la derecha y chips semánticos.
3. **Detalle Desplegable In-situ (`.gmail-table`):** Para auditoría de eventos de notificación y bitácoras asociadas a cada entregable sin cambiar de pantalla.

### 19.2 API del Componente Reutilizable (`<oefa-table>`)
| Propiedad | Tipo | Default | Descripción |
|---|---|---|---|
| `[columns]` | `TableColumn[]` | `[]` | Definición de columnas (`key`, `header`, `sortable`, `align`, `width`, `type`, `formatter`). |
| `[data]` | `any[]` | `[]` | Conjunto de registros a desplegar en filas. |
| `[loading]` | `boolean` | `false` | Conmuta filas de esqueletos (`<oefa-skeleton>`) para feedback de carga. |
| `[skeletonRows]` | `number` | `4` | Cantidad de filas simuladas en modo loading. |
| `[density]` | `'default' \| 'compact' \| 'comfortable'` | `'default'` | Control de altura y padding de celdas. |
| `[striped]` | `boolean` | `false` | Alterna fondo sutil en filas pares. |
| `[bordered]` | `boolean` | `false` | Dibuja cuadrícula completa con bordes verticales de columna. |
| `[stickyHeader]` | `boolean` | `false` | Fija la cabecera durante el scroll vertical. |
| `[emptyTitle]` | `string` | `'Sin registros'` | Título cuando `data` es vacío. |
| `[emptyDescription]` | `string` | `'...'` | Descripción complementaria del estado vacío. |
| `[rowClickable]` | `boolean` | `false` | Habilita hover interactivo y evento de selección. |
| `(sortChange)` | `EventEmitter<{ key, direction }>` | — | Notifica el ordenamiento activo. |
| `(rowClick)` | `EventEmitter<any>` | — | Emite la fila seleccionada. |

---

## 20. Cabecera Institucional y Barra de Navegación Lateral (Top Header & Side Rail)

### 20.1 Arquitectura del Shell Institucional
El shell ergonómico del OEFA organiza la pantalla en cuatro capas operativas coordinadas:
1. **Top Header (`.oefa-header` / `<app-header>`):** Barra superior horizontal fija de `64px` de altura (`--oefa-header-height`) que aloja la identidad institucional, conmutador de menú, marca del sistema (`SEOSC`), conmutador de tema, notificaciones, selector de aplicativos (`<oefa-app-launcher>`) y menú de usuario (`<oefa-user-menu>`).
2. **Side Rail (`.sidebar-rail` / `<app-sidebar-rail>`):** Barra lateral primaria de **80px** de ancho con alineación vertical centrada de módulos, botón de acción rápida circular (`+`), e iconos institucionales M3.
3. **Submenú Flyout (`.submenu-panel` / `<app-submenu-panel>`):** Panel desplegable de **260px** de ancho para navegación en profundidad (hasta 3 niveles) con soporte de anclaje permanente (*Pinned*) o flotante por hover (*Floating*).
4. **Área de Trabajo (`<main class="workspace">`):** Espacio fluido adaptativo con scroll vertical independiente (`height: calc(100vh - 64px)`).

### 20.2 Modos de Visualización del Sidebar
| Modo | Ancho Total | Comportamiento | Casos de Uso Recomendados |
|---|---|---|---|
| **Pinned (Fijo)** | 80px + 260px = 340px | El submenú permanece siempre anclado al lienzo de trabajo. | Usuarios intensivos en monitores de escritorio (`> 1024px`). |
| **Floating (Flotante)** | 80px (Flyout flota con sombra) | El submenú se abre al pasar el cursor o hacer clic sobre el ítem del rail y se oculta automáticamente. | Pantallas intermedias (1024px a 1366px) para maximizar espacio horizontal. |
| **Hidden / Mobile** | 0px (Overlay lateral) | Rail y submenú se repliegan por completo, dando paso al drawer móvil con navegación Drill-Down. | Tablets y dispositivos móviles (`≤ 768px`). |

### 20.3 Patrón Waffle M3 en el Rail (80px)
- **Expansión sin Desplazamiento:** Cada ítem del rail está alojado en un contenedor de flujo vertical fijo de `72px` (`.rail-item-wrapper`).
- **Elevación en Hover/Foco:** Al posar el cursor o recibir foco (`:hover` / `:focus-visible`), el botón se proyecta en una capa flotante (`position: absolute; z-index: 40; box-shadow: 0 4px 14px rgba(0,0,0,0.14)`), liberando el texto a dos o tres líneas completas hacia abajo sin desplazar ni empujar a los ítems inferiores.
- **Geometría del Foco Accesible (WCAG 2.2 SC 2.4.7 / 2.4.13):** Contorno rectangular redondeado uniforme de `2px solid var(--oefa-focus-ring)` con `offset: 2px` y `border-radius: var(--oefa-radius-md)` contenido dentro del ancho del rail.

### 20.4 Adaptación Responsiva del Header por Breakpoints
- **Desktop (`> 1024px`):** Despliegue completo (Logo + Divisor + Acrónimo + Subtítulo + Notificaciones + Tema + Apps + Usuario con nombre).
- **Tablet Horizontal / Laptop (`≤ 1024px`, `--oefa-breakpoint-lg`):** Se oculta el subtítulo descriptivo (`.plusd-sub`), preservando el acrónimo `SEOSC` y el logotipo OEFA.
- **Tablet Vertical (`≤ 768px`, `--oefa-breakpoint-md`):** Se oculta el nombre del usuario (`.user-name`) dejando visible el avatar circular de `36px`; se compacta el padding horizontal de `20px` a `12px` y el logo a `30px`.
- **Móvil (`≤ 640px`, `--oefa-breakpoint-sm`):** Se ocultan el divisor y la marca del sistema, priorizando el logotipo institucional; el selector de apps (`.apps-btn`) se mantiene accesible como acceso directo al ecosistema OEFA.

---

## 21. Layout, Responsividad y Sistema de Rejilla (Grid & Responsive Breakpoints)

### 21.1 Matriz Oficial de Breakpoints OEFA
| Token CSS | Valor | Dispositivo / Contexto | Comportamiento del Layout |
|---|---|---|---|
| `--oefa-breakpoint-sm` | `640px` | Móvil / Celular | Formularios a 1 columna vertical; botones al 100% de ancho; títulos a `1.25rem`; marca del sistema oculta preservando logo OEFA; selector de apps accesible. |
| `--oefa-breakpoint-md` | `768px` | Tablet Vertical | Side rail (80px) colapsa a Drawer móvil con patrón Drill-Down; nombre de usuario se oculta dejando avatar; tablas con scroll horizontal protegido. |
| `--oefa-breakpoint-lg` | `1024px` | Tablet Horizontal / Laptop | Subtítulo descriptivo del header se oculta preservando acrónimo SEOSC; submenú pasa a modo Pinned o Floating; filtros facetados en bottom sheet táctil. |
| `--oefa-breakpoint-xl` | `1280px` | Desktop / Monitores amplios | Despliegue completo sin scroll horizontal forzado; matrices densas de entregables y dashboards Bento en ancho total. |

### 21.2 Transformaciones Responsivas por Componente
1. **Top Header (`.oefa-header`):**
   - Altura inalterable de `64px` en todos los viewports.
   - En `≤ 768px`, el padding se compacta a `12px` y el logo a `30px`.
   - En `≤ 640px`, se prioriza el logo OEFA y el botón lanzador de aplicaciones (`.apps-btn`).
2. **Navegación Lateral (Rail 80px + Submenú 260px):**
   - En desktop (`> 768px`): Rail visible de 80px con submenú pinned o floating.
   - En móvil (`≤ 768px`): Repliegue total; apertura mediante botón de menú superior como `<app-mobile-nav-drawer>` con patrón Drill-Down.
3. **Tablas y Matrices (`.data-table`, `.excel-data-table`, `<oefa-table>`):**
   - Encapsuladas siempre en un contenedor con `overflow-x: auto; -webkit-overflow-scrolling: touch;`.
   - Prohibido romper el ancho de pantalla; la tabla preserva su densidad interna y habilita scroll táctil suave con cabecera sticky opcional.
4. **Modales y Drawers (`<oefa-modal>`, `<oefa-drawer>`):**
   - En desktop: Modales de `420px` a `760px` centrados; drawers laterales acoplados a derecha o izquierda.
   - En móvil (`≤ 640px`): Modales ocupan el `calc(100vw - 32px)` y los drawers laterales pasan automáticamente a modo Bottom Sheet con esquinas redondeadas superiores (`var(--oefa-radius-lg)`).
5. **Asistente de Pasos (`<oefa-stepper>`):**
   - En desktop: Orientación horizontal con líneas conectoras fluidas y etiquetas bajo el círculo.
   - En móvil (`≤ 768px`): Reorganización a modo vertical o visualización compacta paso actual/total (`Paso X de Y`).
6. **Formularios y Botones (`.btn`, `<oefa-button>`):**
   - En desktop: Grupos alineados en fila con `gap: 8px` o `12px`.
   - En móvil (`≤ 640px`): Botones de acción principal ocupan el `100%` del ancho del contenedor en apilamiento vertical (`flex-direction: column-reverse` para ubicar el botón principal en la zona táctil superior).

### 21.3 Ergonomía Táctil y Accesibilidad (WCAG 2.2 SC 2.5.8)
- Todos los elementos interactivos táctiles en móviles y tablets garantizan un área de toque mínima de **44x44px** (o mínimo absoluto de 24x24px con separación perimetral protegida).
- Los enlaces y botones en móvil cuentan con `:active` state inmediato con reducción sutil de escala (`0.98`) y anillo de foco visible `:focus-visible` de `2px solid var(--oefa-focus-ring)`.

---

## 22. Siguiente paso
Con esto cerrado como fundación general, cada proyecto (empezando por Control de Pagos de Entregables) escribe su propio documento corto que solo mapea estos tokens a sus casos de uso específicos — ver `design-project-control-pagos.md`.


