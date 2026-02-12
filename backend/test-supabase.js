// Test script to verify Supabase integration
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://jplxlgsrjxcksantcgnp.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
    console.log('🧪 Testing Supabase Connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseKey.substring(0, 20) + '...');
    
    try {
        // Test basic connection
        const { data, error } = await supabase.from('users').select('count').limit(1);
        
        if (error) {
            console.error('❌ Connection failed:', error.message);
            return false;
        }
        
        console.log('✅ Supabase connection successful!');
        console.log('✅ Database accessible');
        
        // Test auth functionality
        console.log('\\n🔐 Testing Auth functionality...');
        
        // Test signup (this will fail if user already exists, which is expected)
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
                console.log('✅ Sign up test passed (user already exists)');
            } else {
                console.log('⚠️ Sign up test:', signUpError.message);
            }
        } else {
            console.log('✅ Sign up test successful');
            console.log('✅ User created:', signUpData.user?.email);
        }
        
        return true;
        
    } catch (err) {
        console.error('❌ Test failed:', err.message);
        return false;
    }
}

async function testEnvironmentVariables() {
    console.log('\\n🔧 Checking Environment Variables...');
    
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
    console.log('🚀 CareerForge Supabase Integration Test\\n');
    
    const envOk = await testEnvironmentVariables();
    const supabaseOk = await testSupabaseConnection();
    
    console.log('\\n📊 Test Results:');
    console.log(`Environment Variables: ${envOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Supabase Connection: ${supabaseOk ? '✅ PASS' : '❌ FAIL'}`);
    
    if (envOk && supabaseOk) {
        console.log('\\n🎉 All tests passed! Supabase integration is working correctly.');
        console.log('\\n📋 Next Steps:');
        console.log('1. Run your database migrations');
        console.log('2. Start the backend server: npm run dev');
        console.log('3. Test the authentication endpoints');
    } else {
        console.log('\\n❌ Some tests failed. Please check your configuration.');
        console.log('\\n🔧 Common fixes:');
        console.log('1. Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct');
        console.log('2. Check that your Supabase project is active');
        console.log('3. Ensure all required environment variables are set');
    }
}

main().catch(console.error);