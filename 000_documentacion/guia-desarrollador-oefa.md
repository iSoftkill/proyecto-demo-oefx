# Guía Didáctica para Desarrolladores OEFA — Layout, Grillas y Tarjetas

Documentación técnica generada según el estándar **OEFA Dev Guide Manager**. Diseñada para eliminar el uso de CSS local en maquetaciones y acelerar el desarrollo con plantillas "Zero CSS" listas para copiar y pegar.

---

## 1. Matriz de Equivalencias Rápidas (Cheat Sheet)

Si vienes de trabajar con **PrimeNG**, **Bootstrap** o estilos manuales, utiliza directamente su contraparte institucional OEFA:

| Si antes escribías (PrimeNG / Bootstrap) | Ahora usas en OEFA | Tipo de Solución | ¿Requiere CSS local? |
|---|---|---|:---:|
| `<div class="modulo-container">` con `padding: 24px` | `<div class="oefa-page">` | Clase Global en `styles.scss` | ❌ **Zero CSS** |
| `<div class="p-grid">` / `<div class="row">` | `<div class="oefa-grid-auto">` o `<div class="oefa-row">` | Clase Global en `styles.scss` | ❌ **Zero CSS** |
| `<div class="col-12 col-md-6">` / `.p-col-6` | `<div class="oefa-col-12 oefa-col-md-6">` | Clase Global en `styles.scss` | ❌ **Zero CSS** |
| `<p-card>` o tarjetas armadas en CSS local | `<oefa-card>` o `<div class="oefa-card">` | Componente / Clase Global | ❌ **Zero CSS** |
| `<p-button label="Guardar">` | `<oefa-button variant="primary">Guardar</oefa-button>` | Componente Compartido | ❌ **Zero CSS** |
| `<p-tag value="Activo">` | `<oefa-status-badge status="success">Activo</oefa-status-badge>` | Componente Compartido | ❌ **Zero CSS** |
| KPIs o métricas con `style="font-size:..."` | `<oefa-stat value="..." label="..." size="md">` | Componente Compartido | ❌ **Zero CSS** |

---

## 2. Fichas Técnicas Pedagógicas

### Ficha 1: Contenedor de Página Institucional (`.oefa-page`)

#### Paso 1: El Problema / Fricción Habitual
El desarrollador crea un `<div>` y abre el archivo `.css` de su componente para definir `.modulo-container { padding: 24px; }`. Esto duplica código, genera paddings inconsistentes y rompe la vista en móviles al no tener media queries.

#### Paso 2: La Solución Institucional OEFA
Utilizar la clase utilitaria global `.oefa-page` o `.oefa-page-container` directamente en el HTML.

#### Paso 3: Snippet Copiable "Zero CSS"
```html
<!-- En tu template *.component.html: Cero CSS adicional -->
<div class="oefa-page">
  <oefa-page-header 
    title="Bandeja de Fiscalización Ambiental" 
    subtitle="Listado general de inspecciones programadas del periodo" />

  <!-- Aquí va el contenido de tu vista -->
</div>
```

#### Paso 4: Ficha Técnica
| Selector / Clase | Propósito | Comportamiento Responsivo | WCAG 2.2 |
|---|---|---|---|
| `.oefa-page` | Contenedor principal de vistas | 24px padding en desktop, colapsa a 16px en móvil ($\le$ 640px) | 1.4.10 Reflow |
| `.oefa-page-compact` | Formularios o flujos centrados | Ancho máximo controlado de 1024px | 1.4.10 Reflow |
| `.oefa-page-fluid` | Visores cartográficos / GIS | Ancho 100% sin tope de max-width | — |

---

### Ficha 2: Rejilla Responsiva Automática (`.oefa-grid-auto`)

#### Paso 1: El Problema / Fricción Habitual
El desarrollador escribe `@media queries` manuales para adaptar tarjetas de 4 columnas a 2 en tablet y a 1 en celular, o añade librerías pesadas como PrimeNG solo para maquetar columnas.

#### Paso 2: La Solución Institucional OEFA
Utilizar `.oefa-grid-auto` para rejillas que se acomodan solas al espacio disponible, o `.oefa-grid-2` / `.oefa-grid-3` para columnas fijas predecibles.

#### Paso 3: Snippet Copiable "Zero CSS"
```html
<!-- Distribución automática responsiva: 1, 2, 3 o 4 columnas según la pantalla -->
<div class="oefa-grid-auto">
  <oefa-card title="Expediente 001-2026" subtitle="Sector Minería">
    <p>Inspección programada en unidad operativa.</p>
  </oefa-card>

  <oefa-card title="Expediente 002-2026" subtitle="Sector Energía">
    <p>Informe técnico en etapa de evaluación legal.</p>
  </oefa-card>

  <oefa-card title="Expediente 003-2026" subtitle="Sector Pesquería">
    <p>Monitoreo de efluentes completado satisfactoriamente.</p>
  </oefa-card>
</div>
```

#### Paso 4: Ficha Técnica
| Clase Global | Comportamiento | Breakpoints | WCAG |
|---|---|---|---|
| `.oefa-grid-auto` | `repeat(auto-fit, minmax(280px, 1fr))` | Adaptativo fluido sin saltos forzados | 1.4.10 Reflow |
| `.oefa-grid-2` | 2 columnas en Desktop | 1 columna en $\le$ 768px | 1.4.10 Reflow |
| `.oefa-grid-3` | 3 columnas en Desktop | 2 col en $\le$ 1024px, 1 col en $\le$ 640px | 1.4.10 Reflow |
| `.oefa-row` + `.oefa-col-*` | Rejilla de 12 columnas | `.oefa-col-md-6`, `.oefa-col-lg-4` | 1.3.2 DOM Order |

---

### Ficha 3: Tarjeta Institucional (`<oefa-card>`)

#### Paso 1: El Problema / Fricción Habitual
Para mostrar una tarjeta, el programador copia y pega bloques de 20 líneas de CSS con bordes, radios (`#e2e8f0`, `border-radius: 8px`), sombras y paddings ad-hoc que terminan desalineados del sistema de diseño.

#### Paso 2: La Solución Institucional OEFA
Importar y usar el componente angular `<oefa-card>` o la clase `.oefa-card`.

#### Paso 3: Snippet Copiable "Zero CSS"
```typescript
// 1. En tu *.component.ts:
import { OefaCardComponent, OefaButtonComponent } from '../../shared';

@Component({
  standalone: true,
  imports: [CommonModule, OefaCardComponent, OefaButtonComponent],
  // ...
})
export class MiModuloComponent {}
```

```html
<!-- 2. En tu *.component.html: -->
<oefa-card 
  title="Monitoreo de Calidad de Aire" 
  subtitle="Estación Huancavelica - Código EST-04">
  
  <p>Registro de material particulado dentro de los límites permisibles.</p>

  <!-- Acciones alineadas al pie de la tarjeta -->
  <div card-footer>
    <oefa-button variant="secondary" size="small">Descargar PDF</oefa-button>
    <oefa-button variant="primary" size="small">Ver Reporte</oefa-button>
  </div>
</oefa-card>
```

#### Paso 4: Ficha Técnica (API)
| Input / Slot | Tipo | Default | Descripción |
|---|---|---|---|
| `[title]` | `string` | `undefined` | Título institucional de cabecera. |
| `[subtitle]` | `string` | `undefined` | Bajada o categoría contextual. |
| `[interactive]` | `boolean` | `false` | Activa estados hover, foco accesible y evento click. |
| `(cardClick)` | `EventEmitter<void>` | — | Se emite al hacer clic o presionar `Enter`/`Espacio`. |
| `<ng-content>` | Slot | — | Cuerpo principal de la tarjeta. |
| `[card-actions]` | Slot | — | Botones o iconos a la derecha de la cabecera. |
| `[card-footer]` | Slot | — | Barra de botones o metadatos al pie. |
| **Accesibilidad** | — | — | Focus ring 2px visible (WCAG 2.4.13), contraste AA/AAA. |

---

### Ficha 4: Pantalla Fija Dividida vs Scroll Natural (`<oefa-page-layout [fit]>`)

#### Paso 1: El Problema / Fricción Habitual
El desarrollador activa `[fit]="true"` creyendo que "ajustará" la pantalla, pero el contenido se corta y se vuelve inalcanzable porque el layout bloquea el scroll (`overflow: hidden; padding: 0;`). Para solucionarlo, intenta calcular alturas a mano en CSS (`height: calc(100vh - 180px);`), lo cual es un **antipatrón frágil** que se descalibra con zoom, banners o diferentes monitores.

#### Paso 2: La Solución Institucional OEFA
1. **Regla de decisión:**
   - **`[fit]="false"` (por defecto):** Para páginas de contenido estándar, dashboards e inicio. La ventana tiene scroll vertical natural y márgenes correctos.
   - **`[fit]="true"`:** **Únicamente** para layouts divididos fijos (Master-Detail, Catálogos con Sidebar, Visores GIS o Bandejas Split) donde la página no debe hacer scroll y los sub-paneles gestionan su propio scroll independiente.
2. **Cero cálculos manuales:** Usar la técnica **Flexbox 0-height** con las clases globales `.oefa-split-layout` y `.oefa-scrollable`.

#### Paso 3: Snippets Copiables "Zero CSS"

**A) Pantalla dividida fija con Sidebar y Catálogo/Tabla scrolleable:**
```html
<!-- En tu template: Cero calc() y cero CSS local -->
<oefa-page-layout 
  title="Catálogo de Tableros Analíticos" 
  subtitle="Filtre y explore los indicadores institucionales"
  [fit]="true">

  <!-- Contenedor dividido 100% de la altura disponible -->
  <div class="oefa-split-layout oefa-gap-md">
    <!-- Panel 1: Sidebar de filtros fijo a la izquierda -->
    <oefa-filter-sidebar [isOpen]="true" />

    <!-- Panel 2: Área de resultados con canal de scroll independiente -->
    <div class="oefa-scrollable oefa-p-md">
      <div class="oefa-grid-auto">
        <!-- Tarjetas o tablas que scrollean limpiamente sin cortar la pantalla -->
      </div>
    </div>
  </div>
</oefa-page-layout>
```

**B) Página estándar con scroll vertical natural (Inicio, Formularios largos, Dashboards):**
```html
<!-- No usar [fit] o dejarlo en false: scroll natural garantizado -->
<oefa-page-layout 
  title="Plataforma de Inteligencia de Negocios" 
  subtitle="Gestión ambiental eficiente y transparente"
  [fit]="false">

  <div class="oefa-stack-lg">
    <!-- Las secciones fluyen y scrollean naturalmente con los paddings institucionales -->
  </div>
</oefa-page-layout>
```

#### Paso 4: Ficha Técnica y Reglas de Oro

| Propiedad `[fit]` | Comportamiento | Cuándo Usar | Clases Auxiliares Obligatorias |
|---|---|---|---|
| `[fit]="false"` *(default)* | Scroll vertical de ventana (`overflow-y: auto`), padding estándar (`24px`). | Inicio, Dashboards, Reportes, Formularios secuenciales. | `.oefa-stack-lg`, `.oefa-grid-*` |
| `[fit]="true"` | Ventana fija (`overflow: hidden; padding: 0`). | Split Master-Detail, GIS/Mapas, Catálogo + Sidebar. | `.oefa-split-layout` + `.oefa-scrollable` |

> ⚠️ **Regla de Oro:** **Prohibido usar `calc(100vh - Xpx)`**. Si usas `[fit]="true"`, envuelve tus listas/tablas dentro de `.oefa-scrollable` para que el navegador dimensione el scroll de forma nativa y automática.

---

### Ficha 5: Métricas y Cifras Institucionales (`<oefa-stat>`)

#### Paso 1: El Problema / Fricción Habitual
El desarrollador maqueta números grandes con `<h2>` y `style="font-size: 2.25rem"`, lo que compite y le quita protagonismo al título principal (`H1` de 24px/1.5rem). Además, inventa contenedores circulares para iconos y márgenes manuales en cada vista.

#### Paso 2: La Solución Institucional OEFA
Usar el componente tripartito `<oefa-stat>` configurando el input `[size]` según la jerarquía de la pantalla:
- **`size="md"` (20px / 1.25rem):** Tamaño predeterminado y recomendado para dashboards, tarjetas de resumen y analítica.
- **`size="sm"` (16px / 1rem):** Para tablas de datos, drawlers y barras laterales compactas.
- **`size="lg"` (30px / 1.875rem):** Reservado para Hero Banners o páginas de bienvenida institucionales.

#### Paso 3: Snippet Copiable "Zero CSS"
```typescript
// 1. En tu *.component.ts:
import { OefaStatComponent } from '../../shared';

@Component({
  standalone: true,
  imports: [CommonModule, OefaStatComponent],
  // ...
})
export class MiModuloComponent {}
```

```html
<!-- 2. En tu *.component.html: Cero CSS local -->
<div class="oefa-grid-auto">
  <oefa-stat 
    value="18,520" 
    label="Supervisiones realizadas" 
    icon="shield" 
    color="primary" 
    size="md" 
    badge="+12%" 
    badgeStatus="success" />

  <oefa-stat 
    value="99.4%" 
    label="Cumplimiento ambiental" 
    icon="check-circle" 
    color="success" 
    size="md" />

  <oefa-stat 
    value="45" 
    label="Casos en alerta" 
    icon="alert" 
    color="warning" 
    size="md" 
    badge="Urgente" 
    badgeStatus="danger" />
</div>
```

#### Paso 4: Ficha Técnica (API)
| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `[value]` | `string \| number` | `''` | Cifra numérica o texto del indicador (ej: `1,250`, `98.5%`). |
| `[label]` | `string` | `''` | Texto descriptivo de la métrica. |
| `[icon]` | `string` | `''` | Icono institucional del catálogo `<oefa-icon>`. |
| `[size]` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm` (16px), `md` (20px estándar dashboard), `lg` (30px hero). |
| `[color]` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | Rol de color semántico del icono y acentos. |
| `[badge]` | `string` | `''` | Texto de badge contextual (ej: `+5%`, `Meta`). |
| `[badgeStatus]` | `'info' \| 'success' \| 'danger' \| 'error' \| 'neutral' \| 'accent'` | `'neutral'` | Color institucional del badge. |
| `[layout]` | `'horizontal' \| 'vertical' \| 'auto'` | `'auto'` | Orientación del bloque de icono y textos. |

---

## 3. Ejemplo Integrado Completo (Módulo Típico OEFA)

Copia este bloque para iniciar cualquier pantalla nueva:

```html
<div class="oefa-page">
  <!-- Cabecera Institucional con <h1> semántico -->
  <oefa-page-header 
    title="Panel de Control Operativo" 
    subtitle="Monitoreo en tiempo real de actividades de supervisión"
    badgeText="ACTUALIZADO"
    badgeStatus="success" />

  <!-- Grilla de Tarjetas -->
  <div class="oefa-grid-auto oefa-mt-md">
    <oefa-card title="Supervisiones Pendientes" subtitle="Urgente">
      <h2 style="font-size: 2rem; margin: 8px 0; color: var(--oefa-primary-root);">18</h2>
      <p>Supervisiones con plazo límite menor a 48 horas.</p>
      <div card-footer>
        <oefa-button variant="primary" size="sm">Gestionar</oefa-button>
      </div>
    </oefa-card>

    <oefa-card title="Expedientes Archivados" subtitle="Histórico">
      <h2 style="font-size: 2rem; margin: 8px 0; color: var(--oefa-success-ui-safe);">142</h2>
      <p>Procesos concluidos conformes durante el ejercicio actual.</p>
      <div card-footer>
        <oefa-button variant="secondary" size="small">Auditar</oefa-button>
      </div>
    </oefa-card>
  </div>
</div>
```

---

## 4. Autocompletado y Snippets en VS Code (`oefa-*`)

El workspace cuenta con snippets integrados en `.vscode/oefa.code-snippets` para todos los componentes y estructuras del sistema de diseño.

### Cómo utilizarlos:
1. En cualquier archivo `*.component.html`, escribe el prefijo del componente (por ejemplo `oefa-page-layout`, `oefa-card`, `oefa-button`, `oefa-table`).
2. Presiona <kbd>Tab</kbd> o <kbd>Enter</kbd> en el menú de sugerencias de VS Code.
3. El snippet insertará la estructura completa con todos sus `@Input()` obligatorios/opcionales y slots `card-footer` o `header-actions`, permitiéndote navegar entre propiedades con la tecla <kbd>Tab</kbd>.

### Catálogo de Snippets Disponibles:
- **Estructura y Layout:** `oefa-page-layout`, `oefa-page-container`, `oefa-page-header`, `oefa-grid-auto`, `oefa-row`, `oefa-sticky-bar`, `oefa-section-divider`
- **Contenedores y Tarjetas:** `oefa-card`, `oefa-card-full`, `oefa-accordion`
- **Acciones y Formularios:** `oefa-button`, `oefa-button-icon`, `oefa-icon`, `oefa-form-grid`, `oefa-form-field`
- **Datos y Visualización:** `oefa-table`, `oefa-status-badge`, `oefa-info-card`, `oefa-kpi-card`, `oefa-progress-bar`, `oefa-skeleton`
- **Feedback y Diálogos:** `oefa-alert`, `oefa-toast`, `oefa-modal`, `oefa-drawer`, `oefa-confirm-dialog`, `oefa-empty-state`
- **Navegación:** `oefa-tabs`, `oefa-stepper`, `oefa-pagination`, `oefa-breadcrumbs`

