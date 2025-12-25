#!/usr/bin/env python3
"""Backfill embeddings from a JSONL source file.

Input format (JSONL): each line is a JSON object with at least:
  {"candidate_id": 123, "text": "full resume text"}

Usage:
  python -m ai.scripts.backfill_embeddings --input data/resumes.jsonl --model_id sentence-transformers/all-MiniLM-L6-v2
"""
import argparse
import json
import os
import sys
from typing import Optional

from ai.shared.config import config
from ai.vector.pgvector import upsert_embedding, get_model_info


def compute_embedding(text: str, model_id: str):
    # Use sentence_transformers directly
    try:
        from sentence_transformers import SentenceTransformer
    except Exception as e:
        print("SentenceTransformer not available:", e)
        raise

    model = SentenceTransformer(model_id, cache_folder=config.CACHE_DIR)
    vec = model.encode(text)
    return vec.tolist() if hasattr(vec, 'tolist') else list(vec)


def backfill(input_path: str, model_id: str, dry_run: bool = False):
    if not os.path.exists(input_path):
        print("Input file not found:", input_path)
        return 2

    info = get_model_info(model_id)
    model_dim = int(info.get('model_dim')) if info and info.get('model_dim') else None
    count = 0
    failures = []

    with open(input_path, 'r', encoding='utf8') as f:
        for line in f:
            count += 1
            obj = json.loads(line)
            candidate_id = obj.get('candidate_id')
            text = obj.get('text') or obj.get('resume_text')
            role = obj.get('role')
            if not candidate_id or not text:
                failures.append((line, 'missing fields'))
                continue

            try:
                vec = compute_embedding(text, model_id)
                if dry_run:
                    print(f"DRY: would upsert candidate {candidate_id} model {model_id} dim {len(vec)}")
                else:
                    upsert_embedding(candidate_id, model_id, model_dim or len(vec), vec, {"source": input_path}, role=role)
            except Exception as e:
                failures.append((candidate_id, str(e)))

    print(f"Processed {count} records, failures: {len(failures)}")
    if failures:
        print('Failures sample:', failures[:5])

    return 0


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True, help='Path to JSONL file with candidate_id and text')
    parser.add_argument('--model_id', required=True, help='Embedding model id (e.g., sentence-transformers/all-MiniLM-L6-v2)')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    rc = backfill(args.input, args.model_id, args.dry_run)
    sys.exit(rc)
