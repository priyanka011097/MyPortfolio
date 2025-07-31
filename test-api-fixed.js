// Test script to verify DeepSeek API after fixing payment
const https = require('https');

// Replace with your working API key
const API_KEY = process.env.DEEPSEEK_API_KEY || 'your_new_api_key_here';

function testAPI() {
  console.log('🔍 Testing DeepSeek API after payment fix...\n');
  
  if (!API_KEY || API_KEY === 'your_new_api_key_here') {
    console.log('❌ Please set your DEEPSEEK_API_KEY in .env file');
    return;
  }
  
  const data = JSON.stringify({
    model: "deepseek-chat",
    messages: [
      {
        role: "user",
        content: "Hello, respond with just: API is working"
      }
    ],
    max_tokens: 50,
    temperature: 0.1
  });
  
  const options = {
    hostname: 'api.deepseek.com',
    port: 443,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  
  const req = https.request(options, (res) => {
    console.log(`📊 Status: ${res.statusCode}`);
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsed = JSON.parse(responseData);
        if (res.statusCode === 200) {
          console.log('✅ API is working!');
          console.log('📝 Response:', parsed.choices?.[0]?.message?.content);
        } else {
          console.log('❌ API Error:', parsed);
        }
      } catch (e) {
        console.log('❌ Failed to parse response:', responseData);
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ Request failed:', error.message);
  });
  
  req.write(data);
  req.end();
}

testAPI();