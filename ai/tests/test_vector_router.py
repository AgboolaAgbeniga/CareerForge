import json
from fastapi.testclient import TestClient
import pytest

import ai.app as app_module
from ai.vector import router as vector_router

client = TestClient(app_module.app)


def test_init_calls_ensure(monkeypatch):
    called = {}

    def fake_ensure():
        called['ok'] = True

    monkeypatch.setattr('ai.vector.pgvector.ensure_extension_and_table', fake_ensure)

    r = client.post('/vectors/init')
    assert r.status_code == 200
    assert called.get('ok') is True


def test_index_uses_manifest_dim(monkeypatch):
    recorded = {}

    def fake_get_model_info(mid):
        return {'model_dim': 384}

    def fake_upsert(candidate_id, model_id, model_dim, embedding, payload, role=None):
        recorded['args'] = (candidate_id, model_id, model_dim, embedding[:3], payload, role)

    monkeypatch.setattr('ai.vector.pgvector.get_model_info', fake_get_model_info)
    monkeypatch.setattr('ai.vector.pgvector.upsert_embedding', fake_upsert)

    body = {
        'candidate_id': 42,
        'model_id': 'sentence-transformers/all-MiniLM-L6-v2',
        'embedding': [0.1] * 384,
        'payload': {'name': 'Alice'}
    }

    r = client.post('/vectors/index', json=body)
    assert r.status_code == 200
    assert recorded['args'][0] == 42
    assert recorded['args'][1] == body['model_id']
    assert recorded['args'][2] == 384


def test_index_missing_dim_errors(monkeypatch):
    def fake_get_model_info(mid):
        return {}

    monkeypatch.setattr('ai.vector.pgvector.get_model_info', fake_get_model_info)

    body = {
        'candidate_id': 99,
        'model_id': 'unknown/model',
        'embedding': [0.1] * 384,
    }

    r = client.post('/vectors/index', json=body)
    assert r.status_code == 400


def test_search_returns_results(monkeypatch):
    def fake_search(embedding, top_k, model_id=None, role=None):
        return [{'candidate_id': 42, 'distance': 0.01, 'model_id': model_id, 'role': role}]

    monkeypatch.setattr('ai.vector.pgvector.search_embeddings', fake_search)

    body = {
        'embedding': [0.1] * 384,
        'model_id': 'sentence-transformers/all-MiniLM-L6-v2',
        'role': 'job_seeker',
        'top_k': 5
    }

    r = client.post('/vectors/search', json=body)
    assert r.status_code == 200
    assert r.json()['results'][0]['candidate_id'] == 42
