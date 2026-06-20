CREATE TYPE "public"."document_type" AS ENUM('cover_letter', 'optimized_resume', 'match_report', 'career_pitch_deck', 'talent_pipeline_report');--> statement-breakpoint
CREATE TABLE "generated_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"document_type" "document_type" NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(255) NOT NULL,
	"file_size_bytes" integer,
	"related_job_id" uuid,
	"related_resume_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "guided_builder_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stage" integer DEFAULT 1,
	"current_section" varchar(50),
	"context_data" jsonb,
	"draft_sections" jsonb,
	"reader_test_results" jsonb,
	"is_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "generated_documents" ADD CONSTRAINT "generated_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_documents" ADD CONSTRAINT "generated_documents_related_job_id_jobs_id_fk" FOREIGN KEY ("related_job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_documents" ADD CONSTRAINT "generated_documents_related_resume_id_resumes_id_fk" FOREIGN KEY ("related_resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guided_builder_sessions" ADD CONSTRAINT "guided_builder_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "gen_docs_user_idx" ON "generated_documents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "gen_docs_type_idx" ON "generated_documents" USING btree ("document_type");--> statement-breakpoint
CREATE INDEX "gen_docs_job_idx" ON "generated_documents" USING btree ("related_job_id");--> statement-breakpoint
CREATE INDEX "guided_sessions_user_idx" ON "guided_builder_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "guided_sessions_completed_idx" ON "guided_builder_sessions" USING btree ("is_completed");