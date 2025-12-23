import { pgTable, uuid, varchar, text, integer, boolean, timestamp, decimal, jsonb, pgEnum, inet } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const userRole = pgEnum('user_role', ['job_seeker', 'recruiter']);
export const jobType = pgEnum('job_type', ['full_time', 'part_time', 'contract', 'remote']);
export const experienceLevel = pgEnum('experience_level', ['entry', 'mid', 'senior', 'executive']);
export const jobStatus = pgEnum('job_status', ['draft', 'open', 'closed', 'paused']);
export const applicationStatus = pgEnum('application_status', ['pending', 'reviewing', 'interview', 'accepted', 'rejected', 'withdrawn']);
export const messageType = pgEnum('message_type', ['application', 'interview', 'update', 'followup', 'general']);
export const notificationType = pgEnum('notification_type', ['application_update', 'new_message', 'job_match', 'interview_invite', 'system']);
export const experimentStatus = pgEnum('experiment_status', ['draft', 'running', 'completed', 'stopped']);

// Tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  role: userRole('role').notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  location: varchar('location', { length: 255 }),
  isVerified: boolean('is_verified').default(false),
  emailVerifiedAt: timestamp('email_verified_at'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
  twoFactorSecret: varchar('two_factor_secret', { length: 255 }),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

export const jobSeekers = pgTable('job_seekers', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }),
  experienceYears: integer('experience_years'),
  skills: text('skills').array(), // PostgreSQL array
  education: text('education'),
  portfolioUrl: varchar('portfolio_url', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  resumeFileUrl: varchar('resume_file_url', { length: 255 }),
  profileCompletionPercentage: integer('profile_completion_percentage').default(0),
  isProfileVisible: boolean('is_profile_visible').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const recruiters = pgTable('recruiters', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  companyName: varchar('company_name', { length: 255 }),
  industry: varchar('industry', { length: 100 }),
  companySize: varchar('company_size', { length: 50 }),
  title: varchar('title', { length: 255 }),
  experienceYears: integer('experience_years'),
  specialization: text('specialization'),
  billingInfo: jsonb('billing_info'),
  subscriptionPlan: varchar('subscription_plan', { length: 50 }).default('free'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 100 }),
  headquarters: varchar('headquarters', { length: 255 }),
  size: varchar('size', { length: 50 }),
  description: text('description'),
  websiteUrl: varchar('website_url', { length: 255 }),
  logoUrl: varchar('logo_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  recruiterId: uuid('recruiter_id').references(() => recruiters.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id').references(() => companies.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  requirements: text('requirements'),
  location: varchar('location', { length: 255 }),
  salaryMin: decimal('salary_min', { precision: 10, scale: 2 }),
  salaryMax: decimal('salary_max', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('NGN'),
  jobType: jobType('job_type').default('full_time'),
  experienceLevel: experienceLevel('experience_level'),
  skillsRequired: text('skills_required').array(),
  status: jobStatus('status').default('draft'),
  viewsCount: integer('views_count').default(0),
  applicationsCount: integer('applications_count').default(0),
  postedAt: timestamp('posted_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  jobSeekerId: uuid('job_seeker_id').references(() => jobSeekers.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }),
  status: applicationStatus('status').default('pending'),
  appliedAt: timestamp('applied_at').defaultNow(),
  lastUpdatedAt: timestamp('last_updated_at').defaultNow(),
  matchScore: decimal('match_score', { precision: 5, scale: 2 }),
  coverLetter: text('cover_letter'),
  resumeVersionUrl: varchar('resume_version_url', { length: 255 }),
  nextStep: varchar('next_step', { length: 255 }),
  notes: text('notes'),
}, (table) => ({
  uniqueJobSeekerJob: sql`UNIQUE(${table.jobSeekerId}, ${table.jobId})`,
}));

export const resumes = pgTable('resumes', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  jobSeekerId: uuid('job_seeker_id').references(() => jobSeekers.id, { onDelete: 'cascade' }),
  version: integer('version').default(1),
  originalFileUrl: varchar('original_file_url', { length: 255 }),
  parsedData: jsonb('parsed_data'),
  aiOptimizedData: jsonb('ai_optimized_data'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'cascade' }),
  recipientId: uuid('recipient_id').references(() => users.id, { onDelete: 'cascade' }),
  applicationId: uuid('application_id').references(() => applications.id, { onDelete: 'set null' }),
  subject: varchar('subject', { length: 255 }),
  content: text('content'),
  messageType: messageType('message_type').default('general'),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  sentAt: timestamp('sent_at').defaultNow(),
  attachments: jsonb('attachments'),
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).unique().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  type: notificationType('type').notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  data: jsonb('data'),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  eventData: jsonb('event_data'),
  sessionId: varchar('session_id', { length: 255 }),
  userAgent: text('user_agent'),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const experiments = pgTable('experiments', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: experimentStatus('status').default('draft'),
  variants: jsonb('variants'),
  targetAudience: jsonb('target_audience'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const experimentParticipants = pgTable('experiment_participants', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  experimentId: uuid('experiment_id').references(() => experiments.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  variantAssigned: varchar('variant_assigned', { length: 100 }),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  conversionEvents: jsonb('conversion_events'),
});