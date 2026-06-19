import { AuthService } from './src/modules/auth/auth.service';
import { db } from './src/utils/database';
import { users } from './src/models/schema';

async function testGetProfile() {
  const authService = new AuthService();
  const allUsers = await db.select().from(users).limit(1);
  if (allUsers.length === 0) {
    console.log('No users found in DB');
    return;
  }
  
  const userId = allUsers[0]?.id as string;
  console.log(`1. Fetching profile for user ${userId}...`);
  try {
    const profile = await authService.getProfile(userId);
    console.log('2. Profile fetch SUCCESS:', profile);
  } catch (e: any) {
    console.error('3. Profile fetch FAILED:', e.message);
  }
}

testGetProfile().then(() => process.exit(0));
