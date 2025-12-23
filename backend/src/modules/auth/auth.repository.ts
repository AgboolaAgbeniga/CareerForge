import { db } from '../../utils/database';
import { users, jobSeekers, recruiters } from '../../models/schema';
import { eq } from 'drizzle-orm';

export class AuthRepository {
    async findUserByEmail(email: string) {
        const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return result[0];
    }

    async findUserById(id: string) {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0];
    }

    async createUser(userData: typeof users.$inferInsert) {
        const result = await db.insert(users).values(userData).returning();
        return result[0];
    }

    async createJobSeekerProfile(userId: string) {
        return await db.insert(jobSeekers).values({ id: userId }).returning();
    }

    async createRecruiterProfile(userId: string) {
        return await db.insert(recruiters).values({ id: userId }).returning();
    }

    async updateLastLogin(userId: string) {
        await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, userId));
    }

    async updateUserPassword(userId: string, passwordHash: string) {
        await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
    }

    async updateUserVerification(userId: string, isVerified: boolean) {
        await db.update(users).set({ isVerified }).where(eq(users.id, userId));
    }

    async updateUser2FASecret(userId: string, secret: string) {
        await db.update(users).set({ twoFactorSecret: secret }).where(eq(users.id, userId));
    }

    async updateUser2FAEnabled(userId: string, enabled: boolean) {
        await db.update(users).set({ twoFactorEnabled: enabled }).where(eq(users.id, userId));
    }

    async updateUserProfile(userId: string, updates: Partial<typeof users.$inferSelect>) {
        await db.update(users).set(updates).where(eq(users.id, userId));
    }

    async updateJobSeekerProfile(userId: string, updates: Partial<typeof jobSeekers.$inferSelect>) {
        await db.update(jobSeekers).set(updates).where(eq(jobSeekers.id, userId));
    }

    async updateRecruiterProfile(userId: string, updates: Partial<typeof recruiters.$inferSelect>) {
        await db.update(recruiters).set(updates).where(eq(recruiters.id, userId));
    }

    async getJobSeekerProfile(userId: string) {
        const result = await db.select().from(jobSeekers).where(eq(jobSeekers.id, userId)).limit(1);
        return result[0];
    }

    async getRecruiterProfile(userId: string) {
        const result = await db.select().from(recruiters).where(eq(recruiters.id, userId)).limit(1);
        return result[0];
    }
}
