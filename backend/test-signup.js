const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignup() {
    // using a valid-looking domain to bypass Supabase basic email validation
    const testEmail = `careerforge.test.${Date.now()}@gmail.com`;
    const testPassword = 'TestPassword123!';
    console.log('Testing signup with email:', testEmail);
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
            data: {
                firstName: 'Test',
                lastName: 'User',
                role: 'job_seeker'
            }
        }
    });
    
    if (signUpError) {
        console.error('Signup Error:', JSON.stringify(signUpError, null, 2));
    } else {
        console.log('Signup Success! User ID:', signUpData.user?.id);
    }
}

testSignup();
