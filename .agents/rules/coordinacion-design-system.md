# Coordinación del Sistema de Diseño con oefx-starter-template (Master)

Este proyecto (`proyecto-demo-oefx`) es un **proyecto consumidor/hijo** del repositorio maestro de diseño `oefx-starter-template`.

## Protocolo para Nuevos Componentes Reutilizables

Cuando se detecte la necesidad de un nuevo componente que sea de uso general o cross:

1. **Revisar primero el catálogo:**
   - Verifica si ya existe en `src/app/shared/components/` o en `../oefx-starter-template/src/app/shared/components/`.
   - Si ya existe en el template pero no en el proyecto hijo, ejecuta `./sync-from-template.sh`.

2. **Creación / Promoción al Master:**
   - Si el componente debe ser creado:
     - Opción A: Crear el componente directamente en `../oefx-starter-template/src/app/shared/components/<nombre>`.
     - Opción B: Desarrollarlo inicialmente en `src/app/shared/components/<nombre>` y luego ejecutar `./push-to-template.sh <nombre>`.

3. **Validación en el Master:**
   - En `oefx-starter-template`:
     - El componente debe exportarse en `src/app/shared/index.ts`.
     - Registrarlo en `design-system/design-system-oefa.md`.
     - Cumplir tokens de diseño y directrices de accesibilidad.

4. **Sincronización:**
   - Una vez validado en el master, ejecutar `./sync-from-template.sh` para incorporar la versión aprobada y el barrel actualizado.
