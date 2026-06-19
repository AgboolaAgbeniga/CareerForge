-- CareerForge Migration: pgvector embedding tables
-- Stores NVIDIA NIM embeddings for fast ANN similarity search

-- Ensure pgvector extension is enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Candidate (resume) embeddings
CREATE TABLE IF NOT EXISTS candidate_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  model_id VARCHAR(100) NOT NULL DEFAULT 'nvidia/nv-embedqa-e5-v5',
  embedding vector(1024) NOT NULL,
  source_text TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, model_id)
);

-- Job posting embeddings
CREATE TABLE IF NOT EXISTS job_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  model_id VARCHAR(100) NOT NULL DEFAULT 'nvidia/nv-embedqa-e5-v5',
  embedding vector(1024) NOT NULL,
  source_text TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, model_id)
);

-- IVFFlat indexes for fast approximate nearest neighbor search
-- lists = sqrt(expected_rows) is a good starting point
CREATE INDEX IF NOT EXISTS candidate_emb_cosine_idx ON candidate_embeddings
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS job_emb_cosine_idx ON job_embeddings
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Helper function: find top N matching jobs for a candidate embedding
CREATE OR REPLACE FUNCTION match_jobs(
  query_embedding vector(1024),
  match_count INT DEFAULT 20,
  similarity_threshold FLOAT DEFAULT 0.5
)
RETURNS TABLE (
  job_id UUID,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    je.job_id,
    1 - (je.embedding <=> query_embedding) AS similarity
  FROM job_embeddings je
  JOIN jobs j ON je.job_id = j.id
  WHERE j.status = 'open'
    AND (j.expires_at IS NULL OR j.expires_at > NOW())
    AND 1 - (je.embedding <=> query_embedding) > similarity_threshold
  ORDER BY je.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Helper function: find top N matching candidates for a job embedding
CREATE OR REPLACE FUNCTION match_candidates(
  query_embedding vector(1024),
  match_count INT DEFAULT 20,
  similarity_threshold FLOAT DEFAULT 0.5
)
RETURNS TABLE (
  user_id UUID,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ce.user_id,
    1 - (ce.embedding <=> query_embedding) AS similarity
  FROM candidate_embeddings ce
  WHERE 1 - (ce.embedding <=> query_embedding) > similarity_threshold
  ORDER BY ce.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
