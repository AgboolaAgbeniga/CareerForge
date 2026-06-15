import json
import tempfile
import os
from scripts import backfill_embeddings as bf


def test_backfill_dry_run(monkeypatch, tmp_path):
    # Create a small JSONL
    p = tmp_path / 'data.jsonl'
    records = [
        {"candidate_id": 1, "text": "Alice resume text"},
        {"candidate_id": 2, "text": "Bob resume text", "role": "job_seeker"}
    ]
    with open(p, 'w', encoding='utf8') as f:
        for r in records:
            f.write(json.dumps(r) + '\n')

    # Monkeypatch compute_embedding to avoid heavy model
    def fake_compute(text, model_id):
        return [0.1] * 384

    monkeypatch.setattr(bf, 'compute_embedding', fake_compute)

    rc = bf.backfill(str(p), 'sentence-transformers/all-MiniLM-L6-v2', dry_run=True)
    assert rc == 0
