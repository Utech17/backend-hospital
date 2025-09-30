#!/bin/sh
set -e

# Entry script: run seeds once then start dev server
MARKER_FILE="/app/.seeded"

echo "Entrypoint: checking seeds marker..."
if [ ! -f "$MARKER_FILE" ]; then
  echo "No seed marker found. Running seeds-dev..."
  # Try seeds-dev (ts compiled) or seeds (if configured differently)
  if pnpm -s run seeds-dev; then
    echo "Seeds executed (seeds-dev)."
  else
    echo "seeds-dev failed or not defined; trying seeds..."
    pnpm -s run seeds || echo "No seeds script succeeded."
  fi
  touch "$MARKER_FILE"
else
  echo "Seed marker present, skipping seeds."
fi

echo "Starting dev server..."
exec pnpm dev
