import os
import yaml
import pytest

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "models.yaml"


def test_models_manifest_exists():
    assert MANIFEST.exists(), f"Manifest not found at {MANIFEST}"


def test_models_manifest_structure():
    with open(MANIFEST, 'r') as f:
        data = yaml.safe_load(f)

    assert 'models' in data and isinstance(data['models'], list) and len(data['models']) > 0

    for m in data['models']:
        assert 'id' in m and isinstance(m['id'], str) and m['id'].strip(), "Each model must have an id"
        assert 'purpose' in m and isinstance(m['purpose'], str)
        assert ('model_card' in m or 'docs' in m), "Each model should have a model_card or docs link"


@pytest.mark.skipif(not os.getenv('HF_API_KEY'), reason="HF_API_KEY not set; skipping live HF model checks")
def test_hf_models_access():
    """Optional live check against Hugging Face API if HF_API_KEY is provided (skipped in CI by default)."""
    from huggingface_hub import HfApi

    api = HfApi(token=os.getenv('HF_API_KEY'))
    with open(MANIFEST, 'r') as f:
        data = yaml.safe_load(f)

    failures = []

    for m in data['models']:
        model_id = m['id']
        # Skip layoutparser URIs
        if model_id.startswith('lp://'):
            continue
        try:
            api.model_info(model_id)
        except Exception as e:
            failures.append((model_id, str(e)))

    assert not failures, f"HF model accessibility failures: {failures}"
