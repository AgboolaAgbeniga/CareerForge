const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkColumns() {
    const { data, error } = await supabaseAdmin.from('job_seekers').select('*').limit(1);
    if (data && data.length > 0) {
        console.log('Columns in job_seekers table:', Object.keys(data[0]));
    } else {
        console.log('No job seekers found or error:', error);
    }
}

checkColumns();
