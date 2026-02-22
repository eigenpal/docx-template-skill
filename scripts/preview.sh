#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PREVIEW_DIR="$SCRIPT_DIR/../preview"
PROJECT_DIR="$(pwd)"

# Parse arguments
ORIGINAL=""
TEMPLATE=""
DATA=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --original)
      ORIGINAL="$2"
      shift 2
      ;;
    --template)
      TEMPLATE="$2"
      shift 2
      ;;
    --data)
      DATA="$2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

# Auto-detect files if not specified
if [ -z "$ORIGINAL" ]; then
  ORIGINAL=$(find "$PROJECT_DIR/examples" -name "*.docx" -type f 2>/dev/null | head -1)
fi

if [ -z "$TEMPLATE" ]; then
  TEMPLATE=$(find "$PROJECT_DIR/templates" -name "*.docx" -type f 2>/dev/null | head -1)
fi

if [ -z "$DATA" ]; then
  if [ -f "$PROJECT_DIR/sample_data.json" ]; then
    DATA="$PROJECT_DIR/sample_data.json"
  fi
fi

echo "DOCX Template Preview"
echo "====================="
[ -n "$ORIGINAL" ] && echo "Original: $ORIGINAL"
[ -n "$TEMPLATE" ] && echo "Template: $TEMPLATE"
[ -n "$DATA" ] && echo "Data:     $DATA"
echo ""

# Install preview dependencies if needed
if [ ! -d "$PREVIEW_DIR/node_modules" ]; then
  echo "Installing preview dependencies..."
  (cd "$PREVIEW_DIR" && bun install)
  echo ""
fi

# Export paths for Vite to pick up
export DOCX_ORIGINAL="$ORIGINAL"
export DOCX_TEMPLATE="$TEMPLATE"
export DOCX_DATA="$DATA"

# Launch Vite dev server
echo "Starting preview server on http://localhost:3000"
(cd "$PREVIEW_DIR" && npx vite --open --port 3000)
