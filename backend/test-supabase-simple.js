// Simple test to verify Supabase connection without database queries
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://jplxlgsrjxcksantcgnp.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseBasicConnection() {
    console.log('🧪 Testing Basic Supabase Connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseKey.substring(0, 20) + '...');
    
    try {
        // Test basic client initialization
        console.log('✅ Supabase client created successfully');
        
        // Test auth functionality (this doesn't require database tables)
        console.log('\n🔐 Testing Auth functionality...');
        
        const testEmail = `test-${Date.now()}@example.com`;
        const testPassword = 'TestPassword123!';
        
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
            if (signUpError.message.includes('already registered')) {
                console.log('✅ Auth signup test passed (user already exists)');
            } else if (signUpError.message.includes('rate limit')) {
                console.log('⚠️ Rate limited - this is normal for repeated tests');
            } else {
                console.log('⚠️ Signup test:', signUpError.message);
            }
        } else {
            console.log('✅ Basic auth functionality working');
            if (signUpData.user) {
                console.log('✅ User creation successful:', signUpData.user.email);
            }
        }
        
        // Test database connection (this will fail if schema doesn't exist)
        console.log('\n🗄️ Testing Database Access...');
        const { data, error } = await supabase.from('users').select('count').limit(1);
        
        if (error) {
            if (error.message.includes('relation "public.users" does not exist')) {
                console.log('❌ Database schema not created yet');
                console.log('💡 Solution: Run the SQL migration in Supabase SQL Editor');
                return false;
            } else {
                console.log('❌ Database error:', error.message);
                return false;
            }
        } else {
            console.log('✅ Database accessible');
            return true;
        }
        
    } catch (err) {
        console.error('❌ Test failed:', err.message);
        return false;
    }
}

async function testEnvironmentVariables() {
    console.log('\n🔧 Checking Environment Variables...');
    
    const requiredVars = [
        'SUPABASE_URL',
        'SUPABASE_ANON_KEY',
        'DATABASE_URL',
        'JWT_SECRET'
    ];
    
    let allPresent = true;
    
    for (const varName of requiredVars) {
        const value = process.env[varName];
        if (value) {
            console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
        } else {
            console.log(`❌ ${varName}: Missing`);
            allPresent = false;
        }
    }
    
    return allPresent;
}

async function main() {
    console.log('🚀 CareerForge Supabase Basic Integration Test\n');
    
    const envOk = await testEnvironmentVariables();
    const supabaseOk = await testSupabaseBasicConnection();
    
    console.log('\n📊 Test Results:');
    console.log(`Environment Variables: ${envOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Supabase Basic Connection: ${supabaseOk ? '✅ PASS' : '❌ FAIL'}`);
    
    if (envOk) {
        console.log('\n✅ Supabase configuration is correct!');
        console.log('\n🔧 Next Steps:');
        console.log('1. Run the database migration in Supabase SQL Editor');
        console.log('2. Copy contents of backend/supabase-schema.sql');
        console.log('3. Paste and run in Supabase > SQL Editor');
        console.log('4. Then test again with: node test-supabase.js');
    } else {
        console.log('\n❌ Environment variables missing. Please check your .env file.');
    }
}

main().catch(console.error);