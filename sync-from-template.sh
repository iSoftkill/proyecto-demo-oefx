#!/usr/bin/env bash
# ==============================================================================
# SCRIPT PARA SINCRONIZAR PROYECTO-DEMO-OEFX CON EL MASTER (oefx-starter-template)
# ==============================================================================

set -e

TEMPLATE_DIR="../oefx-starter-template"
TARGET_DIR="."

echo "Sincronizando desde $TEMPLATE_DIR hacia $TARGET_DIR..."

# 1. Tokens y documentación
rsync -av --delete "$TEMPLATE_DIR/design-system/" "$TARGET_DIR/design-system/"

# 2. Estilos globales
cp "$TEMPLATE_DIR/src/styles.scss" "$TARGET_DIR/src/styles.scss"

# 3. Componentes shared
rsync -av --delete "$TEMPLATE_DIR/src/app/shared/" "$TARGET_DIR/src/app/shared/"

# 4. Vistas showcase del Design System
rsync -av --delete "$TEMPLATE_DIR/src/app/views/design-system/" "$TARGET_DIR/src/app/views/design-system/"

# 5. Agentes, Skills y Reglas institucionales
mkdir -p "$TARGET_DIR/.agents/skills" "$TARGET_DIR/.agents/rules"
rsync -av "$TEMPLATE_DIR/.agents/skills/" "$TARGET_DIR/.agents/skills/"

# 6. Snippets de VS Code
mkdir -p "$TARGET_DIR/.vscode"
if [ -f "$TEMPLATE_DIR/.vscode/oefa.code-snippets" ]; then
  cp "$TEMPLATE_DIR/.vscode/oefa.code-snippets" "$TARGET_DIR/.vscode/oefa.code-snippets"
fi

# 7. Documentación Técnica
mkdir -p "$TARGET_DIR/000_documentacion"
rsync -av "$TEMPLATE_DIR/000_documentacion/" "$TARGET_DIR/000_documentacion/"

echo "Sincronización completada con éxito en proyecto-demo-oefx."
