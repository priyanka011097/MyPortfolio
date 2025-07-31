#!/usr/bin/env node

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

console.log('🔧 Backend Setup Test\n');

// Check environment variables
const requiredVars = [
  'DEEPSEEK_API_KEY',
  'MAIL_USER', 
  'MAIL_PASS',
  'MAIL_TO'
];

const optionalVars = [
  'PORT',
  'NODE_ENV'
];

console.log('📋 Environment Variables Check:');
console.log('================================');

let allRequiredPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Configured`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    allRequiredPresent = false;
  }
});

console.log('\nOptional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: Not set (using default)`);
  }
});

console.log('\n📧 Email Configuration:');
console.log('=======================');
if (process.env.MAIL_USER && process.env.MAIL_PASS) {
  console.log(`✅ From: ${process.env.MAIL_USER}`);
  console.log(`✅ To: ${process.env.MAIL_TO || 'shahasanepriyanka@gmail.com'}`);
} else {
  console.log('❌ Email credentials not configured');
}

console.log('\n🤖 DeepSeek AI Configuration:');
console.log('=============================');
if (process.env.DEEPSEEK_API_KEY) {
  console.log('✅ DeepSeek API key configured');
} else {
  console.log('❌ DeepSeek API key missing');
}

console.log('\n🚀 Server Configuration:');
console.log('========================');
console.log(`✅ Port: ${process.env.PORT || 3001}`);
console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);

console.log('\n📝 Summary:');
console.log('===========');
if (allRequiredPresent) {
  console.log('✅ All required environment variables are configured!');
  console.log('🚀 You can now start the server with: npm run server');
} else {
  console.log('❌ Some required environment variables are missing.');
  console.log('📝 Please check the .env file and ensure all required variables are set.');
}

console.log('\n💡 Next Steps:');
console.log('==============');
console.log('1. Start the server: npm run server');
console.log('2. Test the API: curl http://localhost:3001/api/health');
console.log('3. Test email: curl -X POST http://localhost:3001/api/email/test');
console.log('4. Start frontend: npm run dev');