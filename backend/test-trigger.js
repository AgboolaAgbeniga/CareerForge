const { Client } = require('pg');
require('dotenv').config();

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to DB');

    const res = await client.query(`
      SELECT public.handle_new_user(
        jsonb_build_object(
          'id', gen_random_uuid(),
          'email', 'test2@example.com',
          'email_confirmed_at', NOW(),
          'user_metadata', jsonb_build_object(
            'firstName', 'Test',
            'lastName', 'User',
            'role', 'job_seeker'
          )
        )::auth.users
      );
    `);
    console.log('Success:', res.rows);
  } catch (err) {
    console.error('Trigger Test Error:', err.message);
  } finally {
    await client.end();
  }
}

run();
