const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('Fetching auth users...');
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) console.error('Auth Error:', authError.message);
    else console.log(`Found ${authData.users.length} auth users.`);

    console.log('Fetching public users...');
    const { data: publicData, error: publicError } = await supabase.from('users').select('*');
    if (publicError) console.error('Public Error:', publicError.message);
    else console.log(`Found ${publicData.length} public users.`);
}
check();
