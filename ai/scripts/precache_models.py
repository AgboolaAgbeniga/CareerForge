#!/usr/bin/env python3
"""Pre-cache models listed in ai/models.yaml into the configured cache dir.

Usage:
  python -m ai.scripts.precache_models --models ai/models.yaml --dry-run
"""
import argparse
import os
import sys
import yaml
import logging
from huggingface_hub import snapshot_download, hf_hub_download

from ai.shared.config import config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def precache_models(models_file: str, dry_run: bool = False):
    if not os.path.exists(models_file):
        logger.error("Models file not found: %s", models_file)
        return 2

    os.makedirs(config.CACHE_DIR, exist_ok=True)

    with open(models_file, 'r') as f:
        data = yaml.safe_load(f)

    models = data.get('models', []) if isinstance(data, dict) else []

    if not models:
        logger.info("No models found in manifest. Nothing to do.")
        return 0

    failures = []

    for m in models:
        model_id = m.get('id')
        if not model_id:
            continue

        # Skip layoutparser URIs which use their own model zoo
        if isinstance(model_id, str) and model_id.startswith('lp://'):
            logger.info("Skipping LayoutParser model: %s", model_id)
            continue

        logger.info("Preparing to cache model: %s", model_id)
        if dry_run:
            continue

        try:
            # snapshot_download will download weights and save to HF cache structure under CACHE_DIR
            snapshot_download(repo_id=model_id, cache_dir=os.path.abspath(config.CACHE_DIR))
            logger.info("Successfully cached %s", model_id)
        except Exception as e:
            logger.exception("Failed to cache %s: %s", model_id, e)
            failures.append((model_id, str(e)))

    if failures:
        logger.error("Model caching had failures: %s", failures)
        return 3

    logger.info("All models processed")
    return 0


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--models', default='ai/models.yaml', help='Path to models.yaml')
    parser.add_argument('--dry-run', action='store_true', help='Do not download, just report')
    args = parser.parse_args()

    rc = precache_models(args.models, dry_run=args.dry_run)
    sys.exit(rc)
