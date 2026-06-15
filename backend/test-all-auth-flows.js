const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testAllAuthFlows() {
    console.log('🔄 Starting Full Auth Flow Tests...\n');
    
    // Use a unique email to avoid "already registered"
    const testEmail = `auth.fulltest.${Date.now()}@gmail.com`;
    const testPassword = 'StrongPassword123!';
    let userId;
    let userSession;

    try {
        // 1. Test Sign Up (Using Admin to auto-confirm email)
        console.log(`[1/5] Testing Sign Up & Auto-Confirm for ${testEmail}...`);
        const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
            email: testEmail,
            password: testPassword,
            email_confirm: true, // Auto confirm so we can log in!
            user_metadata: {
                firstName: 'Auth',
                lastName: 'Tester',
                role: 'job_seeker'
            }
        });

        if (signUpError) throw new Error(`Sign Up Failed: ${signUpError.message}`);
        userId = signUpData.user.id;
        console.log(`✅ Sign Up Success! User ID: ${userId}`);

        // Wait a brief moment to allow triggers to finish syncing to public.users
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 2. Test Sign In (Using Anon client to simulate real user)
        console.log(`\n[2/5] Testing Sign In...`);
        const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
        });

        if (signInError) throw new Error(`Sign In Failed: ${signInError.message}`);
        userSession = signInData.session;
        console.log(`✅ Sign In Success! Got Access Token for User ID: ${signInData.user.id}`);

        // 3. Test Read/Update User Profile (Testing RLS Policies)
        console.log(`\n[3/5] Testing Database Access & RLS Policies...`);
        
        // Use the authenticated client to test RLS
        const authenticatedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${userSession.access_token}`
                }
            }
        });

        // Read from public.users
        const { data: profileRead, error: readError } = await authenticatedSupabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (readError) throw new Error(`Failed to read user profile: ${readError.message}`);
        console.log(`✅ Profile Read Success! First Name: ${profileRead.first_name}`);

        // Update public.users
        const { data: profileUpdate, error: updateError } = await authenticatedSupabase
            .from('users')
            .update({ phone: '555-0123' })
            .eq('id', userId)
            .select()
            .single();

        if (updateError) throw new Error(`Failed to update user profile: ${updateError.message}`);
        console.log(`✅ Profile Update Success! Phone set to: ${profileUpdate.phone}`);

        // Read from public.job_seekers to ensure profile trigger worked
        const { data: jobSeekerRead, error: jsReadError } = await authenticatedSupabase
            .from('job_seekers')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (jsReadError) throw new Error(`Failed to read job seeker profile: ${jsReadError.message}`);
        console.log(`✅ Job Seeker Profile Read Success! Profile exists.`);

        // 4. Test Password Reset Initiation
        console.log(`\n[4/5] Testing Password Reset Flow...`);
        const { error: resetError } = await supabaseAnon.auth.resetPasswordForEmail(testEmail);
        if (resetError) {
            if (resetError.message.includes('rate limit')) {
                console.log(`⚠️ Password Reset Rate Limited (Expected for rapid testing). Continuing...`);
            } else {
                throw new Error(`Password Reset Failed: ${resetError.message}`);
            }
        } else {
            console.log(`✅ Password Reset Initiation Success! (Reset email requested)`);
        }

        // 5. Test Sign Out
        console.log(`\n[5/5] Testing Sign Out...`);
        const { error: signOutError } = await supabaseAnon.auth.signOut();
        if (signOutError) throw new Error(`Sign Out Failed: ${signOutError.message}`);
        console.log(`✅ Sign Out Success!`);

        console.log('\n🎉 ALL AUTH FLOWS TESTED SUCCESSFULLY! No errors found.');

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
    }
}

testAllAuthFlows();
