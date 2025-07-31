import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/v1/chat/completions";

async function testDeepSeekAPI() {
  console.log('🔍 Testing DeepSeek API Connection...\n');
  
  // Check if API key is configured
  if (!DEEPSEEK_API_KEY) {
    console.log('❌ ERROR: DEEPSEEK_API_KEY not found in environment variables');
    console.log('📝 Please create a .env file with your DeepSeek API key:');
    console.log('   DEEPSEEK_API_KEY=your_actual_api_key_here');
    return;
  }
  
  console.log('✅ API Key found in environment variables');
  console.log(`🔑 API Key: ${DEEPSEEK_API_KEY.substring(0, 10)}...`);
  
  // Test 1: Basic API call
  console.log('\n🧪 Test 1: Basic API Call');
  try {
    const response = await axios.post(API_URL, {
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: "Hello, can you respond with just 'API is working'?"
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log('✅ API call successful!');
    console.log('📝 Response:', response.data.choices[0].message.content);
    console.log('⏱️  Response time:', response.headers['x-request-id'] ? 'Tracked' : 'Not tracked');
    
  } catch (error) {
    console.log('❌ API call failed!');
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📝 Error:', error.response.data);
    } else if (error.request) {
      console.log('🌐 Network error - no response received');
      console.log('💡 This might indicate:');
      console.log('   - Internet connection issues');
      console.log('   - API endpoint is down');
      console.log('   - Firewall blocking the request');
    } else {
      console.log('🔧 Request setup error:', error.message);
    }
  }
  
  // Test 2: Check API key validity
  console.log('\n🧪 Test 2: API Key Validation');
  try {
    const response = await axios.get('https://api.deepseek.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      timeout: 5000
    });
    
    console.log('✅ API key is valid!');
    console.log('📋 Available models:', response.data.data.length);
    
  } catch (error) {
    console.log('❌ API key validation failed!');
    if (error.response?.status === 401) {
      console.log('🔑 Invalid API key - please check your credentials');
    } else {
      console.log('🌐 Connection issue:', error.message);
    }
  }
  
  // Test 3: Server health check
  console.log('\n🧪 Test 3: Server Health Check');
  try {
    const response = await axios.get('http://localhost:3001/api/health', {
      timeout: 3000
    });
    
    console.log('✅ Local server is running!');
    console.log('📊 Server status:', response.data);
    
  } catch (error) {
    console.log('❌ Local server is not responding');
    console.log('💡 Make sure to start the server with: npm run server');
  }
  
  console.log('\n📋 Summary:');
  console.log('1. Check if your .env file has the correct DEEPSEEK_API_KEY');
  console.log('2. Verify your internet connection');
  console.log('3. Ensure the local server is running: npm run server');
  console.log('4. Check if DeepSeek API service is available');
}

// Run the test
testDeepSeekAPI().catch(console.error);