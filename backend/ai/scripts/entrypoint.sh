#!/usr/bin/env sh
set -euo pipefail

# Run migrations (no-op if DATABASE_URL not set)
python -m ai.scripts.run_migrations || (echo "Migrations failed; continuing" && true)

# Optionally run precache (if HF_API_KEY provided and desired)
if [ -n "${HF_API_KEY:-}" ]; then
  echo "HF_API_KEY detected, attempting to precache models (may take a while)"
  python -m ai.scripts.precache_models --models ai/models.yaml || echo "Precache failed; continuing"
fi

# Exec the app
exec python app.py
