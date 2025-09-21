#!/usr/bin/env node

/**
 * Cloudinary Connection Test
 * 
 * This script helps you:
 * 1. Test your Cloudinary connection
 * 2. Find your cloud name
 * 3. Verify API credentials
 * 4. Set up the folder structure
 */

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testCloudinaryConnection() {
  console.log('🔍 Testing Cloudinary Connection...');
  console.log('==================================');

  // Configure Cloudinary
  const config = {
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
  };

  console.log(`Cloud Name: ${config.cloud_name || 'MISSING - Please add to .env.local'}`);
  console.log(`API Key: ${config.api_key ? '✅ Present' : '❌ Missing'}`);
  console.log(`API Secret: ${config.api_secret ? '✅ Present' : '❌ Missing'}`);

  if (!config.cloud_name) {
    console.log('\n❌ Missing Cloud Name!');
    console.log('📋 To find your cloud name:');
    console.log('   1. Go to https://console.cloudinary.com/');
    console.log('   2. Look at the URL: https://console.cloudinary.com/console/YOUR_CLOUD_NAME');
    console.log('   3. Add it to .env.local as: REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name');
    return;
  }

  if (!config.api_key || !config.api_secret) {
    console.log('\n❌ Missing API credentials!');
    console.log('📋 Your credentials are in .env.cloudinary but may not be loaded correctly');
    return;
  }

  // Configure Cloudinary
  cloudinary.config(config);

  try {
    // Test API connection
    console.log('\n🔄 Testing API connection...');
    const result = await cloudinary.api.ping();
    console.log('✅ Connection successful!');
    console.log(`Status: ${result.status}`);

    // Get account details
    console.log('\n📊 Account Information:');
    const usage = await cloudinary.api.usage();
    console.log(`Plan: ${usage.plan}`);
    console.log(`Credits Used: ${usage.credits_usage || 0}`);
    console.log(`Storage: ${Math.round((usage.storage.usage || 0) / 1024 / 1024)}MB used`);

    // Test upload capability with a simple image
    console.log('\n🔄 Testing upload capability...');
    
    // Create a simple test image data URL (1x1 transparent pixel)
    const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA5lnb8AAAAABJRU5ErkJggg==';
    
    const uploadResult = await cloudinary.uploader.upload(testImageData, {
      folder: 'tuneatlife/test',
      public_id: 'connection-test',
      overwrite: true,
      resource_type: 'image'
    });

    console.log('✅ Upload test successful!');
    console.log(`Test image URL: ${uploadResult.secure_url}`);

    // Clean up test image
    await cloudinary.uploader.destroy('tuneatlife/test/connection-test');
    console.log('✅ Test cleanup completed');

    // Check/Create folder structure
    console.log('\n📁 Setting up TuneAtLife folder structure...');
    const folders = ['experts', 'testimonials', 'icons', 'features', 'social', 'logo'];
    
    for (const folder of folders) {
      try {
        await cloudinary.api.create_folder(`tuneatlife/${folder}`);
        console.log(`✅ Created folder: tuneatlife/${folder}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`✅ Folder exists: tuneatlife/${folder}`);
        } else {
          console.log(`⚠️  Could not create folder tuneatlife/${folder}: ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Cloudinary setup complete!');
    console.log('📋 Next steps:');
    console.log('   1. Run: npm run generate-assets');
    console.log('   2. Review generated prompts');
    console.log('   3. Generate images using AI tools');
    console.log('   4. Upload images to the created folders');

  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.message.includes('Invalid cloud_name')) {
      console.log('\n💡 Your cloud name might be incorrect.');
      console.log('   Check https://console.cloudinary.com/ for the correct name');
    } else if (error.message.includes('Invalid API key')) {
      console.log('\n💡 Your API credentials might be incorrect.');
      console.log('   Check https://console.cloudinary.com/settings for correct values');
    }
  }
}

// Run the test
testCloudinaryConnection().catch(console.error);