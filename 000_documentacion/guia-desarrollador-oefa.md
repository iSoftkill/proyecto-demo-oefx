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

