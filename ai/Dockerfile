# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Optional: pre-cache models during image build (requires network; set HF_API_KEY build arg for private models)
ARG HF_API_KEY
ENV HF_API_KEY=${HF_API_KEY}
RUN python -m ai.scripts.precache_models --models ai/models.yaml || echo "Precache step failed or was skipped"

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Ensure entrypoint is executable
RUN chmod +x /app/ai/scripts/entrypoint.sh || true

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run migrations at start and then run the app
ENTRYPOINT ["/app/ai/scripts/entrypoint.sh"]
CMD []