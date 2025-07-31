interface ChatResponse {
  reply: string;
  sessionId: string;
  projectDetails: any;
  shouldBookCalendly: boolean;
}

// Store session ID in localStorage to maintain conversation context
const getSessionId = (): string | null => {
  return localStorage.getItem('chatSessionId');
};

const setSessionId = (sessionId: string): void => {
  localStorage.setItem('chatSessionId', sessionId);
};

export const getBotReply = async (userMessage: string): Promise<string> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  
  console.log('🔧 API_BASE_URL:', API_BASE_URL);
  console.log('🔧 Environment variables:', {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    NODE_ENV: import.meta.env.NODE_ENV
  });
  
  try {
    const sessionId = getSessionId();
    
    console.log('🤖 Sending message to backend:', { message: userMessage, sessionId });
    
    const requestBody = {
      message: userMessage,
      sessionId: sessionId
    };
    
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 Backend response status:', response.status);
    console.log('📡 Backend response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error:', response.status, errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    console.log('✅ Backend response data:', data);
    
    // Store the session ID for future requests
    if (data.sessionId) {
      setSessionId(data.sessionId);
      console.log('💾 Stored session ID:', data.sessionId);
    }

    // Return the reply from the response
    return data.reply;
      
  } catch (error) {
    console.error("❌ API Error:", error);
    
    // Fallback responses based on common queries
    const fallbackResponses = {
      "who": "Priyanka is a product engineer and entrepreneur who builds scalable products with social impact. She created StopScrolling.life and offers consultation calls.",
      "what": "Priyanka helps with product development, engineering challenges, startup advice, and technical consulting through 30-minute calls.",
      "how": "You can book a 30-minute call with Priyanka through her Calendly: https://calendly.com/shahasanepriyanka/30min",
      "when": "Priyanka offers flexible scheduling through her Calendly link: https://calendly.com/shahasanepriyanka/30min",
      "where": "You can connect with Priyanka through her Calendly for virtual calls: https://calendly.com/shahasanepriyanka/30min",
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return `I'm here to help! You can book a 30-minute consultation call with Priyanka at: https://calendly.com/shahasanepriyanka/30min`;
  }
};
