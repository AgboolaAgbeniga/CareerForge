CREATE TABLE "candidate_embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"model_id" varchar(100) DEFAULT 'nvidia/nv-embedqa-e5-v5' NOT NULL,
	"source_text" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"model_id" varchar(100) DEFAULT 'nvidia/nv-embedqa-e5-v5' NOT NULL,
	"source_text" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "responsibilities" text;--> statement-breakpoint
ALTER TABLE "recruiters" ADD COLUMN "company_id" uuid;--> statement-breakpoint
ALTER TABLE "candidate_embeddings" ADD CONSTRAINT "candidate_embeddings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_embeddings" ADD CONSTRAINT "job_embeddings_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "candidate_emb_user_model_idx" ON "candidate_embeddings" USING btree ("user_id","model_id");--> statement-breakpoint
CREATE UNIQUE INDEX "job_emb_job_model_idx" ON "job_embeddings" USING btree ("job_id","model_id");--> statement-breakpoint
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;