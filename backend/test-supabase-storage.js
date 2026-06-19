require('dotenv').config();
const { supabaseClient } = require('./dist/utils/database');
const { uploadToSupabase, deleteFromSupabase } = require('./dist/utils/storage');

async function main() {
  console.log('🧪 Testing Supabase Storage Upload with the compiled backend service...');
  
  if (!supabaseClient) {
    console.error('❌ Supabase client is not initialized in database.js');
    process.exit(1);
  }

  const bucketName = 'resumes';
  const testFileName = `test-upload-${Date.now()}.txt`;
  const fileContent = Buffer.from('Hello, this is a test upload to verify RLS bypass using the Service Role key.');

  console.log(`URL: ${process.env.SUPABASE_URL}`);
  console.log(`Using Service Role Key: ${!!process.env.SUPABASE_SERVICE_ROLE_KEY}`);
  console.log(`📤 Attempting upload of file "${testFileName}" to bucket "${bucketName}"...`);

  try {
    const uploadResult = await uploadToSupabase(
      bucketName,
      testFileName,
      fileContent,
      {
        contentType: 'text/plain',
        cacheControl: '3600',
      }
    );

    console.log('✅ Upload succeeded!');
    console.log('Upload Result:', uploadResult);

    console.log(`\n🗑️ Cleaning up: Deleting "${testFileName}" from bucket "${bucketName}"...`);
    await deleteFromSupabase(bucketName, testFileName);
    console.log('✅ Deletion succeeded!');
    console.log('\n🎉 RLS bypass works correctly using the Service Role Key! Test PASSED.');
  } catch (error) {
    console.error('❌ Upload failed! RLS policy violation or connection issue.');
    console.error(error);
    process.exit(1);
  }
}

main();
