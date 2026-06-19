CREATE TABLE "ai_chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "job_seekers" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "job_seekers" ADD COLUMN "experience" jsonb;--> statement-breakpoint
ALTER TABLE "job_seekers" ADD COLUMN "education_history" jsonb;--> statement-breakpoint
ALTER TABLE "job_seekers" ADD COLUMN "certifications" jsonb;--> statement-breakpoint
ALTER TABLE "job_seekers" ADD COLUMN "preferences" jsonb;--> statement-breakpoint
ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "ai_chat_messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_chat_messages_user_idx" ON "ai_chat_messages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_chat_messages_created_at_idx" ON "ai_chat_messages" USING btree ("created_at");