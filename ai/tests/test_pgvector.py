import os
import pytest
from ai.vector.pgvector import ensure_extension_and_table, upsert_embedding, search_embeddings, EMBEDDING_COLUMN_DIM


@pytest.mark.skipif(not os.getenv('DATABASE_URL'), reason='DATABASE_URL not set; skipping pgvector integration tests')
def test_pgvector_index_and_search():
    ensure_extension_and_table()

    # simple embed for all-MiniLM (384 dim)
    emb = [0.1] * EMBEDDING_COLUMN_DIM
    model_id = 'sentence-transformers/all-MiniLM-L6-v2'
    model_dim = EMBEDDING_COLUMN_DIM
    upsert_embedding(99999, model_id, model_dim, emb, {"name": "test user"}, role='job_seeker')

    results = search_embeddings(emb, top_k=5, model_id=model_id)
    assert isinstance(results, list)
    assert any(r['candidate_id'] == 99999 for r in results)


@pytest.mark.skipif(not os.getenv('DATABASE_URL'), reason='DATABASE_URL not set; skipping pgvector integration tests')
def test_dimension_validation():
    ensure_extension_and_table()
    emb_bad = [0.1] * (EMBEDDING_COLUMN_DIM + 1)
    with pytest.raises(ValueError):
        upsert_embedding(100001, model_id, model_dim, emb_bad, {})


def test_upsert_pads_embedding(monkeypatch):
    # Capture the SQL params used during execute
    recorded = {}

    class FakeCursor:
        def __enter__(self):
            return self
        def __exit__(self, exc_type, exc, tb):
            return False
        def execute(self, sql, params=None):
            recorded['params'] = params
        def fetchall(self):
            return []

    class FakeConn:
        def __enter__(self):
            return self
        def __exit__(self, exc_type, exc, tb):
            return False
        def cursor(self):
            return FakeCursor()
        def commit(self):
            pass

    monkeypatch.setattr('ai.vector.pgvector.get_conn', lambda: FakeConn())

    small_emb = [0.1] * 10
    model_id = 'small/model'
    model_dim = 10

    upsert_embedding(12345, model_id, model_dim, small_emb, {'name': 'test'}, role='job_seeker')

    assert 'params' in recorded, 'No SQL params recorded'
    params = recorded['params']
    emb_lit = params[4]
    # Count numbers in the literal
    nums = emb_lit.strip('[]').split(',')
    assert len(nums) == EMBEDDING_COLUMN_DIM, f"Expected padded length {EMBEDDING_COLUMN_DIM}, got {len(nums)}"
