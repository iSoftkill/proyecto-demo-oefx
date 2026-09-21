# OEFA Starter Template & Design System

Plantilla oficial base para el desarrollo ágil de aplicaciones web en OEFA, con integración completa de tokens de diseño, componentes UI estandarizados y catálogo interactivo.

---

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js >= 18
- Angular CLI >= 19

### Instalación y ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm start
```
Navega a `http://localhost:4200/` para ver la aplicación base y el catálogo del sistema de diseño en `/design-system`.

---

## 📂 Estructura del Proyecto

```text
src/
├── app/
│   ├── components/            # Componentes estructurales (Header, Sidebar, Workspace)
│   ├── shared/
│   │   ├── components/        # Catálogo de componentes UI reutilizables OEFA
│   │   │   ├── button/
│   │   │   ├── table/
│   │   │   ├── modal/
│   │   │   ├── date-picker/
│   │   │   └── ...
│   │   └── utils/             # Funciones utilitarias compartidas
│   ├── views/
│   │   ├── dashboard/         # Vista inicial de ejemplo
│   │   └── design-system/     # Catálogo interactivo de componentes
│   └── app.routes.ts          # Rutas principales
├── styles.scss                # Variables CSS, tokens y reglas globales
design-system/
├── design-tokens.json         # Tokens de diseño OEFA (Colores, Spacing, Shadows, etc.)
└── design-system-oefa.md      # Especificación completa del Design System
```

---

## 🔄 Cómo sincronizar actualizaciones desde esta plantilla

Cuando se agreguen nuevos componentes o mejoras a `oefa-starter-template`, los proyectos derivados pueden actualizar su carpeta de componentes compartidos sin alterar la lógica de su aplicación:

```bash
# 1. Registrar la plantilla como upstream (solo una vez en tu proyecto)
git remote add upstream https://github.com/TU_ORG/oefa-starter-template.git

# 2. Descargar los últimos cambios
git fetch upstream

# 3. Sincronizar solo componentes y estilos compartidos
git checkout upstream/main -- src/app/shared/ src/styles.scss design-system/

# 4. Confirmar los cambios
git commit -m "chore: sync design system components from starter template"
```
