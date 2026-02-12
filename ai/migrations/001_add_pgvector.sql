-- Migration: add pgvector extension and normalized embeddings table

CREATE EXTENSION IF NOT EXISTS vector;

-- Normalized embeddings table supports multi-model embeddings with metadata
-- NOTE: vector(384) dimension is set to accommodate the main embedding model.
-- For models with smaller dimensions, pad embeddings with zeros to reach 384 dimensions.
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

-- Practical partial index example for the main embedding model (tune lists for your dataset)
-- This index is created for the commonly used model: 'sentence-transformers/all-MiniLM-L6-v2'
CREATE INDEX IF NOT EXISTS idx_embeddings_allminilm ON embeddings
  USING ivfflat (embedding vector_l2_ops)
  WITH (lists = 100)
  WHERE model_id = 'sentence-transformers/all-MiniLM-L6-v2';

-- Optional: a default index for small datasets (uncomment if needed)
-- CREATE INDEX IF NOT EXISTS idx_embeddings_embedding ON embeddings USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);

-- Note: legacy `resumes` table is not removed by this migration; consider migration/cleanup as needed.
