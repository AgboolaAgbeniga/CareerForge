ALTER TABLE "candidate_embeddings" ADD COLUMN "embedding" vector(1024) NOT NULL;--> statement-breakpoint
ALTER TABLE "job_embeddings" ADD COLUMN "embedding" vector(1024) NOT NULL;