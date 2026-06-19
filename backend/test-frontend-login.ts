import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

async function testFlow() {
  const email = `john.doe.${Date.now()}@gmail.com`;
  const password = 'Password12345!';
  
  console.log('1. Registering new user via Supabase...', email);
  const { data: regData, error: regError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: 'Test',
        lastName: 'User',
        role: 'job_seeker'
      }
    }
  });

  if (regError) {
    console.error('Registration error:', regError.message);
    return;
  }
  
  console.log('2. Waiting for trigger to populate database...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('3. Signing in...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    console.error('Login error:', authError.message);
    return;
  }
  
  console.log('4. Fetching profile from backend...');
  try {
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${authData.session?.access_token}`
      }
    });
    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', JSON.stringify(data, null, 2));
  } catch (e: any) {
    console.error('Backend fetch failed:', e.message);
  }
}

testFlow().then(() => process.exit(0));
