require('dotenv').config();
const postgres = require('postgres');
const { createClient } = require('@supabase/supabase-js');

(async () => {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    console.log('\n== Supabase Full Health Check ==\n');

    // 1. Schemas
    const schemas = await sql`select schema_name from information_schema.schemata order by schema_name;`;
    console.log('Schemas:'); schemas.forEach(s => console.log('- ', s.schema_name));

    // 2. Public tables
    const tables = await sql`select tablename from pg_catalog.pg_tables where schemaname='public' order by tablename;`;
    console.log('\nPublic tables:'); tables.forEach(t => console.log('- ', t.tablename));

    // 3. Table counts for core tables
    const coreTables = ['users','jobs','applications','resumes','messages','companies'];
    for (const t of coreTables) {
      try {
        const r = await sql`select count(*)::int as cnt from public.${sql(t)};`;
        console.log(`\nTable ${t}: ${r[0].cnt} rows`);
      } catch (e) {
        console.log(`\nTable ${t}: error (${e.message})`);
      }
    }

    // 4. search_path
    const sp = await sql`show search_path;`;
    console.log('\nsearch_path:', sp[0].search_path);

    // 5. extensions
    const exts = await sql`select extname from pg_extension order by extname;`;
    console.log('\nExtensions:'); exts.forEach(x=>console.log('- ', x.extname));

    // 6. anon privileges check for public.users
    const privs = await sql`
      select
        has_schema_privilege('anon', 'public', 'USAGE') as anon_public_usage,
        has_table_privilege('anon', 'public.users', 'SELECT') as anon_users_select;
    `;
    console.log('\nAnon privileges:', privs[0]);

    // 7. explicit grants on users
    const grants = await sql`
      select grantee, privilege_type
      from information_schema.role_table_grants
      where table_schema='public' and table_name='users' and grantee='anon';
    `;
    console.log('\nAnon grants on users:'); grants.forEach(g=>console.log('- ', g.grantee, g.privilege_type));

    // 8. RLS and policies on users
    const rls = await sql`
      select relname, relrowsecurity
      from pg_class c join pg_namespace n on c.relnamespace = n.oid
      where n.nspname='public' and relname='users';
    `;
    console.log('\nRLS on users:', rls[0] ? rls[0].relrowsecurity : 'users not found');

    const policies = await sql`
      select * from pg_policies where schemaname='public' and tablename='users';
    `;
    console.log('\nPolicies on users:'); policies.forEach(p=>console.log('- ', p.policyname, p.command, p.permissive));

    // 9. Supabase client test
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    console.log('\nSupabase client test: url=', supabaseUrl, ' key=', supabaseKey ? supabaseKey.substring(0,20)+'...' : 'MISSING');
    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
      const { data, error } = await supabase.from('users').select('id').limit(1);
      if (error) {
        console.log('\nSupabase API select on users failed:', error.message || error);
      } else {
        console.log('\nSupabase API select on users succeeded. Rows:', data.length);
      }
    } catch (e) {
      console.log('\nSupabase client test error:', e.message);
    }

    console.log('\n== Check complete ==');
  } catch (e) {
    console.error('Fatal error during checks:', e.message);
    console.error(e.stack);
  } finally {
    try { await sql.end(); } catch(e){}
  }
})();
