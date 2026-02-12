require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

(async () => {
  console.log('\n== Supabase API-only Health Check ==\n');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  console.log('Supabase URL:', supabaseUrl);

  const tables = ['users','jobs','applications','resumes','messages','companies'];
  let failed = false;

  for (const t of tables) {
    try {
      const { data, error, status } = await supabase.from(t).select('id').limit(1);
      if (error) {
        console.error(`- ${t}: ERROR -`, error.message || error);
        failed = true;
      } else {
        console.log(`- ${t}: OK - returned ${Array.isArray(data) ? data.length : 'unknown'} rows (status ${status})`);
      }
    } catch (e) {
      console.error(`- ${t}: EXCEPTION -`, e.message);
      failed = true;
    }
  }

  // Auth signup test (creates a test user)
  try {
    const testEmail = `api-test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const { data, error } = await supabase.auth.signUp({ email: testEmail, password: testPassword });
    if (error) {
      console.error('\nAuth signup test: ERROR -', error.message || error);
      failed = true;
    } else {
      console.log('\nAuth signup test: OK - user created', data?.user?.email);
    }
  } catch (e) {
    console.error('\nAuth signup test: EXCEPTION -', e.message);
    failed = true;
  }

  console.log('\n== API check complete ==\n');

  if (failed) {
    console.error('One or more checks failed');
    process.exit(1);
  }

  process.exit(0);
})();