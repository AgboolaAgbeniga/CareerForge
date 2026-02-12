DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewing', 'interview', 'accepted', 'rejected', 'withdrawn');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experience_level') THEN
        CREATE TYPE "public"."experience_level" AS ENUM('entry', 'mid', 'senior', 'executive');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experiment_status') THEN
        CREATE TYPE "public"."experiment_status" AS ENUM('draft', 'running', 'completed', 'stopped');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
        CREATE TYPE "public"."job_status" AS ENUM('draft', 'open', 'closed', 'paused');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_type') THEN
        CREATE TYPE "public"."job_type" AS ENUM('full_time', 'part_time', 'contract', 'remote');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_type') THEN
        CREATE TYPE "public"."message_type" AS ENUM('application', 'interview', 'update', 'followup', 'general');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
        CREATE TYPE "public"."notification_type" AS ENUM('application_update', 'new_message', 'job_match', 'interview_invite', 'system');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE "public"."user_role" AS ENUM('job_seeker', 'recruiter');
    END IF;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"event_type" varchar(100) NOT NULL,
	"event_data" jsonb,
	"session_id" varchar(255),
	"user_agent" text,
	"ip_address" "inet",
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_seeker_id" uuid,
	"job_id" uuid,
	"status" "application_status" DEFAULT 'pending',
	"applied_at" timestamp DEFAULT now(),
	"last_updated_at" timestamp DEFAULT now(),
	"match_score" numeric(5, 2),
	"skills" jsonb,
	"cover_letter" text,
	"resume_version_url" varchar(255),
	"next_step" varchar(255),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"industry" varchar(100),
	"headquarters" varchar(255),
	"size" varchar(50),
	"description" text,
	"website_url" varchar(255),
	"logo_url" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiment_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experiment_id" uuid,
	"user_id" uuid,
	"variant_assigned" varchar(100),
	"enrolled_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"conversion_events" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"status" "experiment_status" DEFAULT 'draft',
	"variants" jsonb,
	"target_audience" jsonb,
	"start_date" timestamp,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_seekers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"experience_years" integer,
	"skills" text[],
	"education" text,
	"portfolio_url" varchar(255),
	"linkedin_url" varchar(255),
	"resume_file_url" varchar(255),
	"profile_completion_percentage" integer DEFAULT 0,
	"is_profile_visible" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiter_id" uuid,
	"company_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text,
	"requirements" text,
	"location" varchar(255),
	"salary_min" numeric(10, 2),
	"salary_max" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'NGN',
	"job_type" "job_type" DEFAULT 'full_time',
	"experience_level" "experience_level",
	"skills_required" text[],
	"status" "job_status" DEFAULT 'draft',
	"views_count" integer DEFAULT 0,
	"applications_count" integer DEFAULT 0,
	"posted_at" timestamp,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" uuid,
	"recipient_id" uuid,
	"application_id" uuid,
	"subject" varchar(255),
	"content" text,
	"message_type" "message_type" DEFAULT 'general',
	"is_read" boolean DEFAULT false,
	"read_at" timestamp,
	"sent_at" timestamp DEFAULT now(),
	"attachments" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"type" "notification_type" NOT NULL,
	"title" varchar(255),
	"content" text,
	"data" jsonb,
	"is_read" boolean DEFAULT false,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recruiters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company_name" varchar(255),
	"industry" varchar(100),
	"company_size" varchar(50),
	"title" varchar(255),
	"experience_years" integer,
	"specialization" text,
	"billing_info" jsonb,
	"subscription_plan" varchar(50) DEFAULT 'free',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_seeker_id" uuid,
	"version" integer DEFAULT 1,
	"original_file_url" varchar(255),
	"parsed_data" jsonb,
	"ai_optimized_data" jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"role" "user_role" NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"phone" varchar(20),
	"location" varchar(255),
	"is_verified" boolean DEFAULT false,
	"email_verified_at" timestamp,
	"two_factor_enabled" boolean DEFAULT false,
	"two_factor_secret" varchar(255),
	"backup_codes" text[],
	"onboarding_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_login_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "analytics_events" DROP CONSTRAINT IF EXISTS "analytics_events_user_id_users_id_fk";
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT IF EXISTS "applications_job_seeker_id_job_seekers_id_fk";
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_seeker_id_job_seekers_id_fk" FOREIGN KEY ("job_seeker_id") REFERENCES "public"."job_seekers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT IF EXISTS "applications_job_id_jobs_id_fk";
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_participants" DROP CONSTRAINT IF EXISTS "experiment_participants_experiment_id_experiments_id_fk";
ALTER TABLE "experiment_participants" ADD CONSTRAINT "experiment_participants_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_participants" DROP CONSTRAINT IF EXISTS "experiment_participants_user_id_users_id_fk";
ALTER TABLE "experiment_participants" ADD CONSTRAINT "experiment_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_seekers" DROP CONSTRAINT IF EXISTS "job_seekers_id_users_id_fk";
ALTER TABLE "job_seekers" ADD CONSTRAINT "job_seekers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT IF EXISTS "jobs_recruiter_id_recruiters_id_fk";
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_recruiter_id_recruiters_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT IF EXISTS "jobs_company_id_companies_id_fk";
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_sender_id_users_id_fk";
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_recipient_id_users_id_fk";
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipient_id_users_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_application_id_applications_id_fk";
ALTER TABLE "messages" ADD CONSTRAINT "messages_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" DROP CONSTRAINT IF EXISTS "notifications_user_id_users_id_fk";
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT IF EXISTS "password_reset_tokens_user_id_users_id_fk";
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiters" DROP CONSTRAINT IF EXISTS "recruiters_id_users_id_fk";
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT IF EXISTS "resumes_job_seeker_id_job_seekers_id_fk";
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_job_seeker_id_job_seekers_id_fk" FOREIGN KEY ("job_seeker_id") REFERENCES "public"."job_seekers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "analytics_user_id_idx" ON "analytics_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "analytics_event_type_idx" ON "analytics_events" USING btree ("event_type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_job_seeker_job_idx" ON "applications" USING btree ("job_seeker_id","job_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_status_idx" ON "applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_job_seeker_idx" ON "applications" USING btree ("job_seeker_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_job_idx" ON "applications" USING btree ("job_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_experiment_participant_idx" ON "experiment_participants" USING btree ("experiment_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jobs_status_idx" ON "jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jobs_posted_at_idx" ON "jobs" USING btree ("posted_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jobs_recruiter_id_idx" ON "jobs" USING btree ("recruiter_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jobs_company_id_idx" ON "jobs" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "messages_sender_idx" ON "messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "messages_recipient_idx" ON "messages" USING btree ("recipient_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "messages_application_idx" ON "messages" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_user_id_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_created_at_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "token_user_id_idx" ON "password_reset_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "token_value_idx" ON "password_reset_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resumes_job_seeker_idx" ON "resumes" USING btree ("job_seeker_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");