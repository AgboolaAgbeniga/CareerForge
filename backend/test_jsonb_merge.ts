import { AuthService } from './src/modules/auth/auth.service';
import { AuthRepository } from './src/modules/auth/auth.repository';
import { db } from './src/utils/database';
import { users, jobSeekers } from './src/models/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
dotenv.config();

async function runTest() {
    console.log('🧪 Starting JSONB Merge Integration Test...');
    
    // 1. Setup a dummy user via database directly to avoid Auth overhead
    const dummyEmail = `test_merge_${Date.now()}@example.com`;
    const [user] = await db.insert(users).values({
        email: dummyEmail,
        role: 'job_seeker',
        firstName: 'Test',
        lastName: 'User'
    }).returning();
    
    if (!user) throw new Error('Failed to create user');

    await db.insert(jobSeekers).values({
        id: user.id
    });
    
    const authService = new AuthService();
    
    try {
        console.log(`✅ Created test user: ${user.id}`);
        
        // 2. First Update (simulate Step 3 of onboarding)
        await authService.updateProfile(user.id, {}, {
            preferences: {
                workArrangement: 'Hybrid',
                preferredLocation: 'San Francisco, CA'
            }
        });
        
        console.log('✅ Applied first preference update (workArrangement, preferredLocation)');
        
        // 3. Second Update (simulate Step 4 of onboarding)
        await authService.updateProfile(user.id, {}, {
            preferences: {
                aiCoachEnabled: true
            }
        });
        
        console.log('✅ Applied second preference update (aiCoachEnabled)');
        
        // 4. Verify Merge
        const authRepo = new AuthRepository();
        const finalProfile = await authRepo.getJobSeekerProfile(user.id);
        
        if (!finalProfile) throw new Error('Failed to fetch final profile');

        const prefs = finalProfile.preferences as Record<string, any>;
        
        if (prefs.workArrangement === 'Hybrid' && 
            prefs.preferredLocation === 'San Francisco, CA' && 
            prefs.aiCoachEnabled === true) {
            console.log('🎉 TEST PASSED: All preferences were successfully deep-merged!');
            console.log('Final Preferences:', JSON.stringify(prefs, null, 2));
        } else {
            console.error('❌ TEST FAILED: Data was lost during merge.');
            console.error('Final Preferences:', JSON.stringify(prefs, null, 2));
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Test failed with exception:', error);
    } finally {
        // Cleanup
        await db.delete(jobSeekers).where(eq(jobSeekers.id, user.id));
        await db.delete(users).where(eq(users.id, user.id));
        console.log('🧹 Cleaned up test data.');
        process.exit(0);
    }
}

runTest();
