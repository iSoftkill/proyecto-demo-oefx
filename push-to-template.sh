#!/usr/bin/env bash
# ==============================================================================
# SCRIPT PARA PROMOVER COMPONENTES HACIA EL MASTER (oefx-starter-template)
# ==============================================================================

set -e

TEMPLATE_DIR="../oefx-starter-template"
SRC_COMPONENTS_DIR="src/app/shared/components"

if [ -z "$1" ]; then
  echo "Error: Debes indicar el nombre de la carpeta del componente."
  echo "Uso: ./push-to-template.sh <nombre-del-componente>"
  echo "Ejemplo: ./push-to-template.sh date-picker"
  exit 1
fi

COMPONENT_NAME="$1"
SOURCE_PATH="$SRC_COMPONENTS_DIR/$COMPONENT_NAME"
TARGET_PATH="$TEMPLATE_DIR/src/app/shared/components/$COMPONENT_NAME"

if [ ! -d "$SOURCE_PATH" ]; then
  echo "Error: No existe el directorio '$SOURCE_PATH'."
  exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "Error: No se encontró el proyecto master en '$TEMPLATE_DIR'."
  exit 1
fi

echo "Promoviendo '$COMPONENT_NAME' hacia $TEMPLATE_DIR..."
mkdir -p "$TARGET_PATH"
rsync -av "$SOURCE_PATH/" "$TARGET_PATH/"

echo ""
echo "✅ Componente '$COMPONENT_NAME' copiado con éxito a oefx-starter-template."
echo "Próximos pasos:"
echo " 1. En oefx-starter-template, pídele al agente que valide el componente y lo exporte en 'src/app/shared/index.ts'."
echo " 2. Una vez validado en el master, ejecuta './sync-from-template.sh' para sincronizar la versión oficial."
