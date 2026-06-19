const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkUser(id) {
    const { data, error } = await supabaseAdmin.from('users').select('*').eq('id', id);
    console.log('Public users result:', data);
    
    const { data: jsData, error: jsError } = await supabaseAdmin.from('job_seekers').select('*').eq('id', id);
    console.log('Job seekers result:', jsData);
}

checkUser('58877c44-9e89-412d-bddf-e3e7118bb367');
