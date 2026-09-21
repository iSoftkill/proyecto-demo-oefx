import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes reutilizables compartidos del Design System OEFA
import { OefaButtonComponent } from '../../shared/components/button/button.component';
import { OefaStatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { OefaAlertComponent } from '../../shared/components/alert/alert.component';
import { OefaBentoKpiTileComponent } from '../../shared/components/bento-kpi-tile/bento-kpi-tile.component';

interface ColorToken {
  token: string;
  hex: string;
  textColor: string;
  borderColor?: string;
  category: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'surface' | 'text' | 'dark';
  categoryLabel: string;
  name: string;
  usage: string;
  appliedIn: string[];
  wcagBadge: string;
  wcagClass: string;
  contrastRatio?: string;
}

interface TonalRampStep {
  step: string;
  hex: string;
  token: string;
  textColor: string;
  usageNote: string;
  isRoot?: boolean;
}

interface TonalRamp {
  name: string;
  role: string;
  description: string;
  steps: TonalRampStep[];
}

@Component({
  selector: 'app-design-system-colors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OefaButtonComponent,
    OefaStatusBadgeComponent,
    OefaAlertComponent,
    OefaBentoKpiTileComponent
  ],
  templateUrl: './design-system-colors.component.html',
  styleUrl: './design-system-colors.component.scss'
})
export class DesignSystemColorsComponent {
  selectedTab = signal<'all' | 'semantics' | 'ramps' | 'surfaces' | 'dark' | 'matrix'>('all');
  searchQuery = signal<string>('');
  copiedToken = signal<string | null>(null);

  // Lista exhaustiva de tokens semánticos y de superficies
  tokens: ColorToken[] = [
    // --- PRIMARIO ---
    {
      token: '--oefa-primary-root',
      hex: '#144AA7',
      textColor: '#FFFFFF',
      category: 'primary',
      categoryLabel: 'Primario Institucional',
      name: 'Azul Primario OEFA',
      usage: 'Identidad principal, botones de acción primaria, enlaces principales, borde activo y focos de accesibilidad.',
      appliedIn: ['Botón .oefa-btn-primary', 'Sidebar Rail (ítem activo)', 'Header institucional', 'Borde focus de inputs', 'Tabs activas'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '8.18:1 vs Blanco'
    },
    {
      token: '--oefa-primary-container',
      hex: '#EEF4FF',
      textColor: '#002463',
      borderColor: '#BFDBFE',
      category: 'primary',
      categoryLabel: 'Primario Institucional',
      name: 'Contenedor Primario Suave',
      usage: 'Fondos de tarjetas informativas, filas seleccionadas en tablas, badges primarios y estados hover sutiles.',
      appliedIn: ['Fila seleccionada en tablas', 'Badges de tipo trámite', 'Alertas informativas', 'Cards de detalle'],
      wcagBadge: 'UI Container Safe',
      wcagClass: 'badge-safe',
      contrastRatio: 'Texto #002463 (14.1:1)'
    },
    {
      token: '--oefa-primary-on-container',
      hex: '#002463',
      textColor: '#FFFFFF',
      category: 'primary',
      categoryLabel: 'Primario Institucional',
      name: 'Texto On-Container Primario',
      usage: 'Texto principal, títulos e iconos dentro de superficies con fondo --oefa-primary-container.',
      appliedIn: ['Texto de badge primario', 'Título en alert informativo', 'Icono activo en contenedor suave'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '14.1:1 vs #EEF4FF'
    },
    {
      token: '--oefa-primary-container-hc',
      hex: '#A4C1F4',
      textColor: '#05142E',
      category: 'primary',
      categoryLabel: 'Primario Institucional',
      name: 'Contenedor Alto Contraste',
      usage: 'Badges y chips pequeños de prioridad, bordes de enfoque (focus ring) y resaltados de tabla.',
      appliedIn: ['Chips con texto pequeño', 'Anillo de foco de teclado (outline)', 'Indicador de paso activo'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '10.05:1 vs #05142E'
    },
    {
      token: '--oefa-primary-on',
      hex: '#FFFFFF',
      textColor: '#002463',
      borderColor: '#E2E8F0',
      category: 'primary',
      categoryLabel: 'Primario Institucional',
      name: 'Texto On-Primary',
      usage: 'Color de texto, etiquetas e iconos cuando se colocan sobre fondo azul primario --oefa-primary-root.',
      appliedIn: ['Texto de botón primario', 'Icono de botón primario', 'Etiquetas de tab activa'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '8.18:1 vs #144AA7'
    },

    // --- SECUNDARIO ---
    {
      token: '--oefa-secondary-root',
      hex: '#44BFB5',
      textColor: '#0A2825',
      category: 'secondary',
      categoryLabel: 'Secundario Institucional',
      name: 'Verde Turquesa Marca',
      usage: 'Acentos de marca y apoyo gráfico institucional. IMPORTANTE: No usar como fondo de botón de acción ni texto directo sobre blanco (usar UI-Safe).',
      appliedIn: ['Acentos decorativos', 'Ilustraciones / Empty states', 'Bordes de tarjetas secundarias'],
      wcagBadge: 'Solo Áreas Grandes',
      wcagClass: 'badge-warning',
      contrastRatio: '2.24:1 vs Blanco (No texto)'
    },
    {
      token: '--oefa-secondary-ui-safe',
      hex: '#2C817A',
      textColor: '#FFFFFF',
      category: 'secondary',
      categoryLabel: 'Secundario Institucional',
      name: 'Secundario UI-Safe (Texto/Iconos)',
      usage: 'Variante corregida con suficiente luminosidad para texto, iconos y bordes finos sobre blanco.',
      appliedIn: ['Texto secundario de acento', 'Iconos de métricas secundarias', 'Bordes de chips turquesa'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '4.64:1 vs Blanco'
    },
    {
      token: '--oefa-secondary-container',
      hex: '#EEFFFE',
      textColor: '#005D58',
      borderColor: '#B3E5E1',
      category: 'secondary',
      categoryLabel: 'Secundario Institucional',
      name: 'Contenedor Secundario',
      usage: 'Fondos de chips de categoría, tarjetas secundarias y badges con temática turquesa.',
      appliedIn: ['Chips de etiquetas / tags', 'Tarjetas secundarias', 'Filtros facetados activos'],
      wcagBadge: 'UI Container Safe',
      wcagClass: 'badge-safe',
      contrastRatio: 'Texto #005D58 (7.8:1)'
    },
    {
      token: '--oefa-secondary-on-container',
      hex: '#005D58',
      textColor: '#FFFFFF',
      category: 'secondary',
      categoryLabel: 'Secundario Institucional',
      name: 'Texto On-Container Secundario',
      usage: 'Texto e iconos dentro de superficies con fondo --oefa-secondary-container.',
      appliedIn: ['Texto de chip secundario', 'Etiquetas de categorías'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '7.8:1 vs #EEFFFE'
    },
    {
      token: '--oefa-secondary-container-hc',
      hex: '#B3E5E1',
      textColor: '#0A2825',
      category: 'secondary',
      categoryLabel: 'Secundario Institucional',
      name: 'Contenedor Secundario Alto Contraste',
      usage: 'Chips y etiquetas pequeñas que requieren alta visibilidad y diferenciación visual.',
      appliedIn: ['Badges de expedientes SIGED', 'Etiquetas destacadas'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '5.1:1 vs #27726C'
    },

    // --- TERCIARIO / WARNING ---
    {
      token: '--oefa-tertiary-root',
      hex: '#FFB500',
      textColor: '#332400',
      category: 'tertiary',
      categoryLabel: 'Alerta & Observación (Ámbar)',
      name: 'Ámbar Institucional (Superficies)',
      usage: 'Color de marca institucional para advertencia y observación. Solo para fondos amplios o indicadores decorativos.',
      appliedIn: ['Barras de progreso en alerta', 'Iconos ilustrativos grandes', 'Banners decorativos'],
      wcagBadge: 'Solo Áreas Grandes',
      wcagClass: 'badge-warning',
      contrastRatio: '1.77:1 vs Blanco'
    },
    {
      token: '--oefa-tertiary-ui-safe',
      hex: '#996D00',
      textColor: '#FFFFFF',
      category: 'tertiary',
      categoryLabel: 'Alerta & Observación (Ámbar)',
      name: 'Ámbar UI-Safe (Texto/Iconos)',
      usage: 'Tono ajustado para textos, números, iconos y bordes de estado Observado / En Alerta sobre blanco.',
      appliedIn: ['Texto de estado "Observado"', 'Icono de alerta (warning)', 'Contador de días en riesgo (7-4 días)'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '4.62:1 vs Blanco'
    },
    {
      token: '--oefa-tertiary-container',
      hex: '#FFF0CC',
      textColor: '#664800',
      borderColor: '#FFE199',
      category: 'tertiary',
      categoryLabel: 'Alerta & Observación (Ámbar)',
      name: 'Contenedor Alerta / Observado',
      usage: 'Fondos de alertas de advertencia, tarjetas de órdenes con observación y badges de estado.',
      appliedIn: ['Alertas de advertencia (.oefa-alert-warning)', 'Badge de estado "Observado"', 'Fila en riesgo en tabla'],
      wcagBadge: 'UI Container Safe',
      wcagClass: 'badge-safe',
      contrastRatio: 'Texto #664800 (8.43:1)'
    },
    {
      token: '--oefa-tertiary-on-container',
      hex: '#664800',
      textColor: '#FFFFFF',
      category: 'tertiary',
      categoryLabel: 'Alerta & Observación (Ámbar)',
      name: 'Texto On-Container Ámbar',
      usage: 'Texto legible, títulos e iconos dentro de contenedores ámbar de advertencia.',
      appliedIn: ['Mensaje dentro de alerta ámbar', 'Texto de chip observado'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '8.43:1 vs #FFF0CC'
    },
    {
      token: '--oefa-tertiary-container-hc',
      hex: '#FFE199',
      textColor: '#332400',
      category: 'tertiary',
      categoryLabel: 'Alerta & Observación (Ámbar)',
      name: 'Contenedor Ámbar Alto Contraste',
      usage: 'Badges de alerta crítica o chips donde el texto de advertencia sea de 10-12px.',
      appliedIn: ['Badges de alta visibilidad', 'Chips de alerta urgente'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '15.07:1 vs #332400'
    },

    // --- SUCCESS / ÉXITO ---
    {
      token: '--oefa-success-root',
      hex: '#8CCD3A',
      textColor: '#1B290A',
      category: 'success',
      categoryLabel: 'Éxito & Conforme (Verde)',
      name: 'Verde Éxito Institucional',
      usage: 'Color de marca para indicar cumplimiento al 100%, estado Conforme y aprobación. Áreas amplias.',
      appliedIn: ['Barras de progreso completado', 'Gráficos de 100% de avance', 'Checks grandes'],
      wcagBadge: 'Solo Áreas Grandes',
      wcagClass: 'badge-warning',
      contrastRatio: '1.97:1 vs Blanco'
    },
    {
      token: '--oefa-success-ui-safe',
      hex: '#578221',
      textColor: '#FFFFFF',
      category: 'success',
      categoryLabel: 'Éxito & Conforme (Verde)',
      name: 'Verde UI-Safe (Texto/Iconos)',
      usage: 'Versión ajustada para texto, iconos de check y bordes de estado Conforme sobre fondo blanco.',
      appliedIn: ['Texto de badge "Conforme"', 'Icono de éxito (check-circle)', 'Indicador numérico positivo'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '4.55:1 vs Blanco'
    },
    {
      token: '--oefa-success-container',
      hex: '#F7FFEE',
      textColor: '#386200',
      borderColor: '#D0EAAE',
      category: 'success',
      categoryLabel: 'Éxito & Conforme (Verde)',
      name: 'Contenedor Conforme / Éxito',
      usage: 'Fondos de alertas de confirmación, badges "Atendido" / "Conforme", tarjetas de éxito.',
      appliedIn: ['Alertas de éxito (.oefa-alert-success)', 'Badge "Conforme"', 'Toast de operación exitosa'],
      wcagBadge: 'UI Container Safe',
      wcagClass: 'badge-safe',
      contrastRatio: 'Texto #386200 (9.1:1)'
    },
    {
      token: '--oefa-success-on-container',
      hex: '#386200',
      textColor: '#FFFFFF',
      category: 'success',
      categoryLabel: 'Éxito & Conforme (Verde)',
      name: 'Texto On-Container Verde',
      usage: 'Texto legible e iconos dentro de contenedores verdes de éxito.',
      appliedIn: ['Texto dentro de toast verde', 'Etiqueta de badge conforme'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '9.1:1 vs #F7FFEE'
    },
    {
      token: '--oefa-success-container-hc',
      hex: '#D0EAAE',
      textColor: '#1B290A',
      category: 'success',
      categoryLabel: 'Éxito & Conforme (Verde)',
      name: 'Contenedor Éxito Alto Contraste',
      usage: 'Badges de estado conforme de alta densidad y chips con texto pequeño.',
      appliedIn: ['Chips de conformidad', 'Contadores completados'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '13.5:1 vs #1B290A'
    },

    // --- ERROR / CRÍTICO ---
    {
      token: '--oefa-error-root',
      hex: '#E51A2F',
      textColor: '#FFFFFF',
      category: 'error',
      categoryLabel: 'Error & Crítico (Rojo)',
      name: 'Rojo Error / Vencido',
      usage: 'Botones destructivos, mensajes de error, bordes de inputs inválidos, alertas críticas (0 días / Hoy) y estados vencidos.',
      appliedIn: ['Botón destructivo (.oefa-btn-danger)', 'Borde de input inválido', 'Badge "Vencido" / "Desestimado"', 'Alertas críticas'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '4.65:1 vs Blanco'
    },
    {
      token: '--oefa-error-container',
      hex: '#FFEFF1',
      textColor: '#AA1223',
      borderColor: '#EEC4C9',
      category: 'error',
      categoryLabel: 'Error & Crítico (Rojo)',
      name: 'Contenedor Error / Alerta Crítica',
      usage: 'Fondos de alerta de error, banners de rechazo, toasts de fallo y tarjetas de entregables vencidos.',
      appliedIn: ['Alertas de error (.oefa-alert-danger)', 'Toasts de fallo', 'Fondo de fila de entregable vencido'],
      wcagBadge: 'UI Container Safe',
      wcagClass: 'badge-safe',
      contrastRatio: 'Texto #AA1223 (7.3:1)'
    },
    {
      token: '--oefa-error-on-container',
      hex: '#AA1223',
      textColor: '#FFFFFF',
      category: 'error',
      categoryLabel: 'Error & Crítico (Rojo)',
      name: 'Texto On-Container Rojo',
      usage: 'Texto legible e iconos dentro de contenedores rojos de error.',
      appliedIn: ['Mensajes de error en alertas', 'Texto de badge de error'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '7.3:1 vs #FFEFF1'
    },
    {
      token: '--oefa-error-container-hc',
      hex: '#EEC4C9',
      textColor: '#490008',
      category: 'error',
      categoryLabel: 'Error & Crítico (Rojo)',
      name: 'Contenedor Error Alto Contraste',
      usage: 'Badges de alerta urgente y chips de estado crítico con máximo impacto visual.',
      appliedIn: ['Badges de orden desestimada', 'Chips de penalidad'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '11.8:1 vs #490008'
    },

    // --- SUPERFICIES & NEUTROS ---
    {
      token: '--oefa-surface-app',
      hex: '#F0F4F9',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Fondo de Aplicación (Canvas)',
      usage: 'Capa base y fondo general del body de toda la aplicación. Proporciona descanso visual y resalta las tarjetas blancas.',
      appliedIn: ['body', '.app-container', 'Lienzo de pantallas operativas'],
      wcagBadge: 'Superficie Base',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-card',
      hex: '#FFFFFF',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie de Tarjeta y Espacio de Trabajo',
      usage: 'Fondo de tarjetas, modales, tablas, drawers y cajas de contenido principal.',
      appliedIn: ['.oefa-card', 'Modales', 'Drawers laterales', 'Tablas de datos'],
      wcagBadge: 'Superficie Nivel 1',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-header',
      hex: '#FFFFFF',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie de Cabecera (Header)',
      usage: 'Barra superior institucional fija. Mantiene nitidez e integración con logos oficiales.',
      appliedIn: ['.app-header', 'Barra superior del sistema'],
      wcagBadge: 'Nivel 1 Elevado',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-rail',
      hex: '#FFFFFF',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie del Sidebar Rail',
      usage: 'Barra lateral de navegación principal (ancho 80px). Contiene los iconos de navegación de primer nivel.',
      appliedIn: ['.sidebar-rail', 'Barra de navegación primaria'],
      wcagBadge: 'Navegación Fija',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-submenu',
      hex: '#F8FAFC',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie de Submenú Desplegable',
      usage: 'Panel flotante o fijado del sidebar cuando el ítem activo cuenta con subopciones.',
      appliedIn: ['.sidebar-submenu', 'Flyout lateral'],
      wcagBadge: 'Superficie Nivel 2',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-subtle',
      hex: '#F8FAFC',
      textColor: '#1D1D1B',
      borderColor: '#E2E8F0',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie Sutil (Table Headers)',
      usage: 'Encabezados de tabla, filas alternas (zebra striping) y contenedores secundarios.',
      appliedIn: ['th de tablas', 'Fila par en listados', 'Separadores de sección'],
      wcagBadge: 'Superficie Nivel 2',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-input',
      hex: '#FFFFFF',
      textColor: '#1D1D1B',
      borderColor: '#CBD5E1',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Superficie de Controles de Entrada',
      usage: 'Cajas de texto, selectores, checkboxes, textareas y controles de fecha.',
      appliedIn: ['.form-control', '.form-select', 'Inputs del sistema'],
      wcagBadge: 'Control Interactivo',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-login-bg',
      hex: '#0A1128',
      textColor: '#FFFFFF',
      category: 'surface',
      categoryLabel: 'Superficies y Fondos',
      name: 'Fondo Oscuro de Login (Hero)',
      usage: 'Superficie azul institucional profunda exclusiva para la vista de inicio de sesión institucional.',
      appliedIn: ['.login-hero-container', 'Fondo de bienvenida institucional'],
      wcagBadge: 'Contraste Alto',
      wcagClass: 'badge-aaa',
      contrastRatio: '12:1 vs #DEDEDE'
    },
    {
      token: '--oefa-border-color',
      hex: '#E2E8F0',
      textColor: '#1D1D1B',
      category: 'surface',
      categoryLabel: 'Bordes y Separadores',
      name: 'Borde Estándar (Slate 200)',
      usage: 'Líneas divisorias de tablas, contornos de tarjetas y separadores estructurales (WCAG 2.2 SC 1.4.11).',
      appliedIn: ['Bordes de .oefa-card', 'Separador de filas en tablas', 'Divisores del header'],
      wcagBadge: 'SC 1.4.11 Pass',
      wcagClass: 'badge-safe'
    },

    // --- TEXTOS ---
    {
      token: '--oefa-text-primary',
      hex: '#1D1D1B',
      textColor: '#FFFFFF',
      category: 'text',
      categoryLabel: 'Tipografía y Textos',
      name: 'Texto Primario (Alta Legibilidad)',
      usage: 'Títulos H1-H4, encabezados de tarjeta, datos clave, montos y valores de tablas operativas.',
      appliedIn: ['Títulos H1 a H4', 'Contenido principal de celdas', 'Montos en soles/dólares'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '16.2:1 vs Blanco'
    },
    {
      token: '--oefa-text-secondary',
      hex: '#334155',
      textColor: '#FFFFFF',
      category: 'text',
      categoryLabel: 'Tipografía y Textos',
      name: 'Texto Secundario (Slate 700)',
      usage: 'Etiquetas de formulario, nombres de columnas en tablas, subtítulos y metadatos.',
      appliedIn: ['Labels de formulario', 'Encabezados de columna th', 'Subtítulos de página'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '8.9:1 vs Blanco'
    },
    {
      token: '--oefa-text-muted',
      hex: '#475569',
      textColor: '#FFFFFF',
      category: 'text',
      categoryLabel: 'Tipografía y Textos',
      name: 'Texto Atenuado (Slate 600)',
      usage: 'Fechas secundarias, textos de ayuda (hints), breadcrumbs y números de expediente complementarios.',
      appliedIn: ['Helper texts debajo de inputs', 'Breadcrumbs', 'Timestamps de auditoría'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '5.8:1 vs Blanco'
    },
    {
      token: '--oefa-text-on-dark',
      hex: '#DEDEDE',
      textColor: '#0A1128',
      category: 'text',
      categoryLabel: 'Tipografía y Textos',
      name: 'Texto sobre Fondo Oscuro',
      usage: 'Títulos y párrafos descriptivos colocados sobre el hero azul oscuro del Login.',
      appliedIn: ['Login hero copy', 'Encabezados de banners oscuros'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '12:1 vs #0A1128'
    },

    // --- MODO OSCURO (INVERSIONES) ---
    {
      token: '--oefa-primary-root (Dark)',
      hex: '#76A3EF',
      textColor: '#05142E',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Azul Primario Luminoso (Tonal 70)',
      usage: 'Acento primario para botones activos, enlaces y focus ring en tema oscuro sobre fondo #0B1120.',
      appliedIn: ['Botón primario en Dark Mode', 'Enlaces en modo oscuro', 'Borde focus en modo oscuro'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '6.8:1 vs #0B1120'
    },
    {
      token: '--oefa-primary-container (Dark)',
      hex: '#103D89',
      textColor: '#D1E0FA',
      borderColor: '#23529E',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Contenedor Primario Oscuro (Tonal 30)',
      usage: 'Fondos de badges, selección de filas y tarjetas informativas en tema oscuro.',
      appliedIn: ['Badges en dark theme', 'Fila seleccionada en dark theme'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: 'Texto #D1E0FA (7.5:1)'
    },
    {
      token: '--oefa-surface-app (Dark)',
      hex: '#0B1120',
      textColor: '#F8FAFC',
      borderColor: '#334155',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Fondo Canvas Modo Oscuro (Slate 950)',
      usage: 'Superficie de fondo principal en modo oscuro. Evita el uso de negro puro (#000) para reducir la fatiga visual.',
      appliedIn: ['body en dark mode', 'Fondo de workspace oscuro'],
      wcagBadge: 'Base Ergonómica',
      wcagClass: 'badge-safe'
    },
    {
      token: '--oefa-surface-card (Dark)',
      hex: '#131C2E',
      textColor: '#F8FAFC',
      borderColor: '#334155',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Tarjeta y Modales (Elevación 1)',
      usage: 'Superficie elevada para tarjetas, cabecera y sidebar en tema oscuro.',
      appliedIn: ['Cards en dark theme', 'Sidebar en dark theme', 'Modales oscuros'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: 'Texto #F8FAFC (15.2:1)'
    },
    {
      token: '--oefa-tertiary-root (Dark)',
      hex: '#FFD366',
      textColor: '#332400',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Ámbar Alerta (Tonal 70)',
      usage: 'Estado observado y alertas en modo oscuro con luminosidad compensada para lectura óptima.',
      appliedIn: ['Badges observados en dark theme', 'Iconos de advertencia oscuros'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '11.2:1 vs #131C2E'
    },
    {
      token: '--oefa-success-root (Dark)',
      hex: '#A0D65C',
      textColor: '#1B290A',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Verde Conforme (Tonal 60)',
      usage: 'Estado conforme y finalizado con alto contraste sobre la superficie oscura.',
      appliedIn: ['Badges conforme en dark theme', 'Iconos de check verde'],
      wcagBadge: 'WCAG 2.2 AAA',
      wcagClass: 'badge-aaa',
      contrastRatio: '9.5:1 vs #131C2E'
    },
    {
      token: '--oefa-error-root (Dark)',
      hex: '#F87171',
      textColor: '#4A0D15',
      category: 'dark',
      categoryLabel: 'Modo Oscuro (Dark Theme)',
      name: 'Rojo Error (Tonal 70)',
      usage: 'Errores, estado vencido y acciones destructivas con legibilidad garantizada en modo oscuro.',
      appliedIn: ['Botón destructivo en dark theme', 'Alertas de error oscuras'],
      wcagBadge: 'WCAG 2.2 AA',
      wcagClass: 'badge-aa',
      contrastRatio: '6.5:1 vs #131C2E'
    }
  ];

  // Escalas monocromáticas completas (Tonal Ramps 10 a 99)
  tonalRamps: TonalRamp[] = [
    {
      name: 'Azul Primario Institucional (OEFA Primary)',
      role: 'primary',
      description: 'Generada a partir del azul corporativo #144AA7 (Tonal 40). Base para identidad, estados activos, botones y foco.',
      steps: [
        { step: '10', hex: '#05142E', token: '--oefa-primary-10', textColor: '#FFFFFF', usageNote: 'Texto sobre contenedores de alto contraste / Fondos ultra profundos' },
        { step: '20', hex: '#0B285B', token: '--oefa-primary-20', textColor: '#FFFFFF', usageNote: 'Texto primario sobre tonal 90/95' },
        { step: '30', hex: '#103D89', token: '--oefa-primary-30', textColor: '#FFFFFF', usageNote: 'Contenedor primario en modo oscuro (Dark Container)' },
        { step: '40', hex: '#1651B6', token: '--oefa-primary-40', textColor: '#FFFFFF', usageNote: 'Azul primario institucional (Root #144AA7)', isRoot: true },
        { step: '50', hex: '#1B65E4', token: '--oefa-primary-50', textColor: '#FFFFFF', usageNote: 'Hover en botón primario / Botón activo' },
        { step: '60', hex: '#4984E9', token: '--oefa-primary-60', textColor: '#05142E', usageNote: 'Ilustraciones / Acento gráfico' },
        { step: '70', hex: '#76A3EF', token: '--oefa-primary-70', textColor: '#05142E', usageNote: 'Acento primario en Modo Oscuro (Dark Root)' },
        { step: '80', hex: '#A4C1F4', token: '--oefa-primary-80', textColor: '#05142E', usageNote: 'Contenedor de Alto Contraste (Container HC)' },
        { step: '90', hex: '#D1E0FA', token: '--oefa-primary-90', textColor: '#05142E', usageNote: 'Contenedor suave / Selección en hover' },
        { step: '95', hex: '#E8F0FC', token: '--oefa-primary-95', textColor: '#05142E', usageNote: 'Fondo de fila seleccionada / Container (#EEF4FF)' },
        { step: '99', hex: '#FAFCFE', token: '--oefa-primary-99', textColor: '#05142E', usageNote: 'Tinte sutil de tarjeta informativa' }
      ]
    },
    {
      name: 'Turquesa Secundario Institucional (OEFA Secondary)',
      role: 'secondary',
      description: 'Generada a partir del turquesa #44BFB5 (Tonal 50). Utilizado para soporte institucional, branding y chips de categoría.',
      steps: [
        { step: '10', hex: '#0A2825', token: '--oefa-secondary-10', textColor: '#FFFFFF', usageNote: 'Texto profundo sobre fondos turquesa claros' },
        { step: '20', hex: '#134F49', token: '--oefa-secondary-20', textColor: '#FFFFFF', usageNote: 'Contenedor oscuro en Dark Mode' },
        { step: '30', hex: '#27726C', token: '--oefa-secondary-30', textColor: '#FFFFFF', usageNote: 'Secundario UI-Safe (#2C817A) para texto sobre blanco' },
        { step: '40', hex: '#349890', token: '--oefa-secondary-40', textColor: '#FFFFFF', usageNote: 'Borde de chip secundario activo' },
        { step: '50', hex: '#41BEB4', token: '--oefa-secondary-50', textColor: '#0A2825', usageNote: 'Turquesa de marca (Root #44BFB5)', isRoot: true },
        { step: '60', hex: '#67CBC3', token: '--oefa-secondary-60', textColor: '#0A2825', usageNote: 'Acento secundario en Dark Mode' },
        { step: '70', hex: '#8DD8D2', token: '--oefa-secondary-70', textColor: '#0A2825', usageNote: 'Resaltado de texto en modo oscuro' },
        { step: '80', hex: '#B3E5E1', token: '--oefa-secondary-80', textColor: '#0A2825', usageNote: 'Contenedor Secundario Alto Contraste (Container HC)' },
        { step: '90', hex: '#D9F2F0', token: '--oefa-secondary-90', textColor: '#0A2825', usageNote: 'Contenedor suave para chips' },
        { step: '95', hex: '#ECF8F7', token: '--oefa-secondary-95', textColor: '#0A2825', usageNote: 'Fondo de tarjeta temática secundaria (#EEFFFE)' },
        { step: '99', hex: '#FBFEFD', token: '--oefa-secondary-99', textColor: '#0A2825', usageNote: 'Tinte sutil para gráficas' }
      ]
    },
    {
      name: 'Ámbar Terciario / Advertencia (OEFA Tertiary - Warning)',
      role: 'tertiary',
      description: 'Generada a partir del ámbar #FFB500 (Tonal 50). Utilizado para indicar alertas, entregables en ventana crítica (7-4 días) y observaciones.',
      steps: [
        { step: '10', hex: '#332400', token: '--oefa-tertiary-10', textColor: '#FFFFFF', usageNote: 'Texto sobre contenedor de alto contraste' },
        { step: '20', hex: '#664800', token: '--oefa-tertiary-20', textColor: '#FFFFFF', usageNote: 'Texto On-Container (#664800) legible en WCAG AAA' },
        { step: '30', hex: '#996D00', token: '--oefa-tertiary-30', textColor: '#FFFFFF', usageNote: 'Ámbar UI-Safe (#996D00) para texto/iconos sobre blanco' },
        { step: '40', hex: '#CC9100', token: '--oefa-tertiary-40', textColor: '#FFFFFF', usageNote: 'Bordes de alerta y hover de botones ámbar' },
        { step: '50', hex: '#FFB500', token: '--oefa-tertiary-50', textColor: '#332400', usageNote: 'Ámbar de marca institucional (Root)', isRoot: true },
        { step: '60', hex: '#FFC433', token: '--oefa-tertiary-60', textColor: '#332400', usageNote: 'Ilustraciones de alerta' },
        { step: '70', hex: '#FFD366', token: '--oefa-tertiary-70', textColor: '#332400', usageNote: 'Alerta ámbar en Modo Oscuro (Dark Root)' },
        { step: '80', hex: '#FFE199', token: '--oefa-tertiary-80', textColor: '#332400', usageNote: 'Contenedor Ámbar Alto Contraste (Container HC)' },
        { step: '90', hex: '#FFF0CC', token: '--oefa-tertiary-90', textColor: '#332400', usageNote: 'Contenedor de alerta / Fondo de badge observado' },
        { step: '95', hex: '#FFF8E5', token: '--oefa-tertiary-95', textColor: '#332400', usageNote: 'Fondo suave de alerta institucional' },
        { step: '99', hex: '#FFFEFA', token: '--oefa-tertiary-99', textColor: '#332400', usageNote: 'Tinte sutil para tarjeta de aviso' }
      ]
    },
    {
      name: 'Verde Éxito / Conforme (OEFA Success)',
      role: 'success',
      description: 'Generada a partir del verde #8CCD3A (Tonal 50). Utilizado para indicar cumplimiento de metas, órdenes aprobadas y entregables conformes.',
      steps: [
        { step: '10', hex: '#1B290A', token: '--oefa-success-10', textColor: '#FFFFFF', usageNote: 'Texto sobre contenedor verde alto contraste' },
        { step: '20', hex: '#375115', token: '--oefa-success-20', textColor: '#FFFFFF', usageNote: 'Texto oscuro sobre verde claro' },
        { step: '30', hex: '#527A1F', token: '--oefa-success-30', textColor: '#FFFFFF', usageNote: 'Verde UI-Safe (#578221) para texto/iconos sobre blanco' },
        { step: '40', hex: '#6DA329', token: '--oefa-success-40', textColor: '#FFFFFF', usageNote: 'Bordes de chips conformes' },
        { step: '50', hex: '#88CB34', token: '--oefa-success-50', textColor: '#1B290A', usageNote: 'Verde institucional de marca (Root #8CCD3A)', isRoot: true },
        { step: '60', hex: '#A0D65C', token: '--oefa-success-60', textColor: '#1B290A', usageNote: 'Éxito en Modo Oscuro (Dark Root)' },
        { step: '70', hex: '#B8E085', token: '--oefa-success-70', textColor: '#1B290A', usageNote: 'Métricas de avance destacadas' },
        { step: '80', hex: '#D0EAAE', token: '--oefa-success-80', textColor: '#1B290A', usageNote: 'Contenedor Éxito Alto Contraste (Container HC)' },
        { step: '90', hex: '#E7F5D6', token: '--oefa-success-90', textColor: '#1B290A', usageNote: 'Contenedor de badge conforme' },
        { step: '95', hex: '#F3FAEB', token: '--oefa-success-95', textColor: '#1B290A', usageNote: 'Fondo de alerta de éxito (#F7FFEE)' },
        { step: '99', hex: '#FDFEFB', token: '--oefa-success-99', textColor: '#1B290A', usageNote: 'Tinte sutil para checklist completada' }
      ]
    },
    {
      name: 'Rojo Error / Crítico (OEFA Error)',
      role: 'error',
      description: 'Generada a partir del rojo institucional #E51A2F (Tonal 50). Utilizado para entregables vencidos, desestimaciones y errores de validación.',
      steps: [
        { step: '10', hex: '#2E0509', token: '--oefa-error-10', textColor: '#FFFFFF', usageNote: 'Texto ultra oscuro para contraste extremo' },
        { step: '20', hex: '#5C0A13', token: '#AA1223', textColor: '#FFFFFF', usageNote: 'Texto On-Container (#AA1223) accesible AAA' },
        { step: '30', hex: '#89101C', token: '--oefa-error-30', textColor: '#FFFFFF', usageNote: 'Hover en botón de acción destructiva' },
        { step: '40', hex: '#B71526', token: '--oefa-error-40', textColor: '#FFFFFF', usageNote: 'Borde de input inválido' },
        { step: '50', hex: '#E51A2F', token: '--oefa-error-50', textColor: '#FFFFFF', usageNote: 'Rojo institucional de error (Root #E51A2F)', isRoot: true },
        { step: '60', hex: '#EA4859', token: '--oefa-error-60', textColor: '#FFFFFF', usageNote: 'Botón destructivo activo' },
        { step: '70', hex: '#EF7682', token: '--oefa-error-70', textColor: '#4A0D15', usageNote: 'Rojo de error en Modo Oscuro (#F87171)' },
        { step: '80', hex: '#F5A3AC', token: '--oefa-error-80', textColor: '#4A0D15', usageNote: 'Contenedor Error Alto Contraste (Container HC)' },
        { step: '90', hex: '#FAD1D5', token: '--oefa-error-90', textColor: '#4A0D15', usageNote: 'Contenedor suave para badges de vencido' },
        { step: '95', hex: '#FCE8EA', token: '--oefa-error-95', textColor: '#4A0D15', usageNote: 'Fondo de alerta de error (#FFEFF1)' },
        { step: '99', hex: '#FEFAFB', token: '--oefa-error-99', textColor: '#4A0D15', usageNote: 'Tinte sutil para celda de error' }
      ]
    },
    {
      name: 'Escala de Neutros / Grises (Slate Neutral Scale)',
      role: 'neutral',
      description: 'Escala monocromática de grises neutros Slate utilizada para la jerarquía de superficies, bordes y niveles de lectura de texto.',
      steps: [
        { step: '50', hex: '#F8FAFC', token: '--oefa-neutral-50', textColor: '#0F172A', usageNote: 'Fondo sutil de submenú, headers de tablas y filas pares' },
        { step: '100', hex: '#F1F5F9', token: '--oefa-neutral-100', textColor: '#0F172A', usageNote: 'Superficie de controles deshabilitados' },
        { step: '200', hex: '#E2E8F0', token: '--oefa-neutral-200', textColor: '#0F172A', usageNote: 'Borde institucional estándar (--oefa-border-color)' },
        { step: '300', hex: '#CBD5E1', token: '--oefa-neutral-300', textColor: '#0F172A', usageNote: 'Bordes de inputs activos y scrollbars' },
        { step: '400', hex: '#94A3B8', token: '--oefa-neutral-400', textColor: '#0F172A', usageNote: 'Placeholders y texto atenuado en Dark Mode' },
        { step: '500', hex: '#64748B', token: '--oefa-neutral-500', textColor: '#FFFFFF', usageNote: 'Iconos inactivos y bordes de tarjetas' },
        { step: '600', hex: '#475569', token: '--oefa-neutral-600', textColor: '#FFFFFF', usageNote: 'Texto atenuado (--oefa-text-muted) para hints' },
        { step: '700', hex: '#334155', token: '--oefa-neutral-700', textColor: '#FFFFFF', usageNote: 'Texto secundario (--oefa-text-secondary) y labels' },
        { step: '800', hex: '#1E293B', token: '--oefa-neutral-800', textColor: '#FFFFFF', usageNote: 'Superficie de modales en Modo Oscuro' },
        { step: '900', hex: '#0F172A', token: '--oefa-neutral-900', textColor: '#FFFFFF', usageNote: 'Tooltips y textos de alto contraste' },
        { step: '950', hex: '#0B1120', token: '--oefa-neutral-950', textColor: '#FFFFFF', usageNote: 'Fondo canvas principal en Modo Oscuro' }
      ]
    }
  ];

  filteredTokens = computed(() => {
    const tab = this.selectedTab();
    const q = this.searchQuery().toLowerCase().trim();

    return this.tokens.filter(item => {
      // Filtrar por tab
      if (tab === 'semantics' && !['primary', 'secondary', 'tertiary', 'success', 'error'].includes(item.category)) {
        return false;
      }
      if (tab === 'surfaces' && !['surface', 'text'].includes(item.category)) {
        return false;
      }
      if (tab === 'dark' && item.category !== 'dark') {
        return false;
      }

      // Filtrar por query de búsqueda
      if (!q) return true;
      return (
        item.token.toLowerCase().includes(q) ||
        item.hex.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.usage.toLowerCase().includes(q) ||
        item.appliedIn.some(a => a.toLowerCase().includes(q))
      );
    });
  });

  copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedToken.set(`${label}: ${text}`);
      setTimeout(() => {
        if (this.copiedToken()?.includes(text)) {
          this.copiedToken.set(null);
        }
      }, 2500);
    });
  }
}
