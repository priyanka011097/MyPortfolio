# AI Chatbot Setup Guide

## Getting Your Perplexity API Key

1. **Visit Perplexity AI**: Go to https://www.perplexity.ai/
2. **Sign up/Login**: Create an account or log in to your existing account
3. **Navigate to API Settings**: 
   - Click on your profile icon in the top right
   - Go to "Settings"
   - Click on "API" in the left sidebar
4. **Generate API Key**: 
   - Click "Generate API Key"
   - Copy the generated key
5. **Add to Environment**: 
   - Open the `.env` file in your project root
   - Replace `your_perplexity_api_key_here` with your actual API key
   - Save the file

## Example .env file:
```env
VITE_PERPLEXITY_API_KEY=pclx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Testing the Chatbot

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to the local development URL (usually http://localhost:5173)

3. **Test the chatbot**:
   - Click the AI Assistant button (🤖) in the bottom-right corner
   - Try asking questions like:
     - "I'd like to book a call with Priyanka"
     - "What does Priyanka do?"
     - "How can I schedule a meeting?"
     - "Tell me about Priyanka's services"

## Features

The AI chatbot can:
- ✅ Detect booking requests and provide the Calendly link
- ✅ Answer questions about Priyanka's work and services
- ✅ Provide intelligent responses using Perplexity AI
- ✅ Show typing indicators and timestamps
- ✅ Handle errors gracefully with fallback responses

## Troubleshooting

- **API Key Issues**: Make sure your Perplexity API key is correct and has proper permissions
- **Environment Variables**: Ensure the `.env` file is in the project root and the variable name is exactly `VITE_PERPLEXITY_API_KEY`
- **CORS Issues**: The Perplexity API should work without CORS issues as it's a server-to-server call

## Calendly Integration

The chatbot automatically detects booking-related keywords and provides the Calendly link:
- https://calendly.com/shahasanepriyanka/30min

Users can book 30-minute consultation calls for:
- Product development and strategy
- Engineering challenges  
- Startup advice
- Technical consulting