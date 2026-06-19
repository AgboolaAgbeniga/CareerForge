"""Simple pgvector helper utilities (sync) using psycopg.

This module keeps dependencies minimal and avoids ORMs. It expects a
`DATABASE_URL` environment variable (Postgres) with `pgvector` extension available.
"""
import os
import json
from typing import List, Dict, Any, Optional
import psycopg

DATABASE_URL = os.getenv("DATABASE_URL")
# Column dimension for the embeddings column. If you change the migration, update this.
EMBEDDING_COLUMN_DIM = int(os.getenv("EMBEDDING_COLUMN_DIM", "384"))


# SQL to support a normalized embeddings table
CREATE_EXT_SQL = "CREATE EXTENSION IF NOT EXISTS vector;"

CREATE_EMBEDDINGS_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS embeddings (
  id bigserial PRIMARY KEY,
  candidate_id int NOT NULL,
  model_id text NOT NULL,
  model_dim int NOT NULL,
  role text,
  embedding vector(384) NOT NULL,
  payload jsonb,
  created_at timestamptz default now()
);
"""

# Example partial index for the main embedding model
CREATE_INDEX_ALLMINILM_SQL = """
CREATE INDEX IF NOT EXISTS idx_embeddings_allminilm ON embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
  WHERE model_id = 'sentence-transformers/all-MiniLM-L6-v2';
"""


def _vec_to_literal(vec: List[float]) -> str:
    """Convert python list to pgvector literal string: '[0.1,0.2,...]'.

    Uses plain string formatting to avoid locale issues.
    """
    return '[' + ','.join(f"{float(x):.6g}" for x in vec) + ']'


def _pad_or_truncate_embedding(vec: List[float]) -> List[float]:
    """Pad with zeros or truncate to match EMBEDDING_COLUMN_DIM."""
    if len(vec) == EMBEDDING_COLUMN_DIM:
        return vec
    if len(vec) < EMBEDDING_COLUMN_DIM:
        return vec + [0.0] * (EMBEDDING_COLUMN_DIM - len(vec))
    # len(vec) > EMBEDDING_COLUMN_DIM
    return vec[:EMBEDDING_COLUMN_DIM]


def get_conn():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL not set; cannot connect to Postgres")
    return psycopg.connect(DATABASE_URL)


def _load_models_manifest():
    """Load ai/models.yaml and return dict by model id"""
    import yaml
    manifest_path = os.path.join(os.path.dirname(__file__), '..', 'models.yaml')
    if not os.path.exists(manifest_path):
        return {}
    try:
        with open(manifest_path, 'r') as f:
            data = yaml.safe_load(f) or {}
        models = data.get('models', [])
        return {m.get('id'): m for m in models}
    except Exception:
        return {}


# Cached manifest
_MODELS_MANIFEST = _load_models_manifest()


def get_model_info(model_id: str) -> Dict[str, Any]:
    """Return model metadata dict (may be empty)"""
    return _MODELS_MANIFEST.get(model_id, {})


def ensure_extension_and_table():
    """Ensure vector extension and embeddings table exist (idempotent)."""
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(CREATE_EXT_SQL)
            conn.commit()
            cur.execute(CREATE_EMBEDDINGS_TABLE_SQL)
            conn.commit()
            # Try to create example index for main model
            try:
                cur.execute(CREATE_INDEX_ALLMINILM_SQL)
                conn.commit()
            except Exception:
                # Index creation may fail if vector ops missing; log but continue
                pass


def upsert_embedding(candidate_id: int, model_id: str, model_dim: int, embedding: List[float], payload: Optional[Dict[str, Any]] = None, role: Optional[str] = None):
    """Insert or update an embedding; validate dimension against manifest when available.
    
    NOTE: The embeddings table uses a fixed column dimension (default set by EMBEDDING_COLUMN_DIM). Embeddings shorter than this dimension will be padded with zeros automatically.
    """
    payload = payload or {}

    # Pad embedding to the configured column dimension if necessary
    target_dim = EMBEDDING_COLUMN_DIM
    if len(embedding) > target_dim:
        raise ValueError(f"Embedding length {len(embedding)} exceeds maximum dimension {target_dim}")
    elif len(embedding) < target_dim:
        embedding = embedding + [0.0] * (target_dim - len(embedding))
        model_dim = target_dim  # Update model_dim to reflect actual storage dimension

    # Optionally validate against models manifest (using original model_dim)
    info = get_model_info(model_id)
    if info and info.get('model_type') == 'embedding' and info.get('model_dim') and int(info.get('model_dim')) != model_dim:
        raise ValueError(f"model_dim mismatch: provided {model_dim} vs manifest {info.get('model_dim')}")

    emb_lit = _vec_to_literal(embedding)
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO embeddings (candidate_id, model_id, model_dim, role, embedding, payload)
                VALUES (%s, %s, %s, %s, %s::vector, %s::jsonb)
                ON CONFLICT (candidate_id, model_id) DO UPDATE
                  SET embedding = EXCLUDED.embedding, payload = EXCLUDED.payload, role = EXCLUDED.role, model_dim = EXCLUDED.model_dim;
                """,
                (candidate_id, model_id, model_dim, role, emb_lit, json.dumps(payload)),
            )
            conn.commit()


# Backwards compatible wrapper (defaults to main embedding model)
def upsert_resume(candidate_id: int, embedding: List[float], payload: Optional[Dict[str, Any]] = None):
    """Backwards compatible resume embedding upsert.
    
    NOTE: Automatically pads embeddings to the configured column dimension for storage.
    """
    default_model = 'sentence-transformers/all-MiniLM-L6-v2'
    info = get_model_info(default_model)
    model_dim = int(info.get('model_dim')) if info and info.get('model_dim') else len(embedding)
    upsert_embedding(candidate_id, default_model, model_dim, embedding, payload)


def search_embeddings(embedding: List[float], top_k: int = 10, model_id: Optional[str] = None, role: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search embeddings. Optionally restrict by model_id and/or role.
    
    NOTE: Input embeddings shorter than 384 dimensions will be padded with zeros.
    """
    target_dim = EMBEDDING_COLUMN_DIM
    if len(embedding) > target_dim:
        raise ValueError(f"Embedding length {len(embedding)} exceeds maximum dimension {target_dim}")
    elif len(embedding) < target_dim:
        embedding = _pad_or_truncate_embedding(embedding)
    
    emb_lit = _vec_to_literal(embedding)
    where_clauses = []
    params = [emb_lit]

    sql = "SELECT id, candidate_id, model_id, role, payload, embedding <=> %s::vector AS distance FROM embeddings"

    if model_id:
        where_clauses.append("model_id = %s")
        params.append(model_id)
    if role:
        where_clauses.append("role = %s")
        params.append(role)

    if where_clauses:
        sql += " WHERE " + " AND ".join(where_clauses)

    sql += " ORDER BY distance LIMIT %s"
    params.append(top_k)

    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, tuple(params))
            rows = cur.fetchall()
            results = []
            for r in rows:
                results.append({
                    "id": r[0],
                    "candidate_id": r[1],
                    "model_id": r[2],
                    "role": r[3],
                    "payload": r[4],
                    "distance": float(r[5]) if r[5] is not None else None,
                })
            return results


# Backwards-compatible search alias
def search_similar(embedding: List[float], top_k: int = 10) -> List[Dict[str, Any]]:
    return search_embeddings(embedding, top_k)
