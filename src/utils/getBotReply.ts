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
    
    // Enhanced fallback responses based on common queries about Priyanka
    const lowerMessage = userMessage.toLowerCase();
    
    // Experience and background queries
    if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('how long')) {
      return "Priyanka has 8 years of experience in software engineering and product development. She has worked at major tech companies like Google and Microsoft, and has built her own successful products like StopScrolling.life.";
    }
    
    // Work history queries
    if (lowerMessage.includes('worked') || lowerMessage.includes('companies') || lowerMessage.includes('jobs') || lowerMessage.includes('career')) {
      return "Priyanka's work experience includes: Senior Software Engineer at Google (2021-2023), Software Engineer at Microsoft (2019-2021), and Full Stack Developer at StartupX (2017-2019). She's currently working as a Product Engineer and Entrepreneur.";
    }
    
    // Skills and technologies queries
    if (lowerMessage.includes('skills') || lowerMessage.includes('technologies') || lowerMessage.includes('tech stack')) {
      return "Priyanka is skilled in: JavaScript/TypeScript, React/Next.js, Node.js, Python, Java, Go, AWS/Cloud Infrastructure, Docker/Kubernetes. She has expertise in both frontend and backend development, cloud infrastructure, and system design.";
    }
    
    // Projects queries
    if (lowerMessage.includes('projects') || lowerMessage.includes('built') || lowerMessage.includes('products')) {
      return "Priyanka has built several successful products including: StopScrolling.life, TechMentor, and CodeReview.ai. Her most notable project is StopScrolling.life, a digital wellness platform that has helped 10,000+ users.";
    }
    
    // Education queries
    if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university')) {
      return "Priyanka's education includes: Master of Science in Computer Science from Stanford University (2017), Bachelor of Engineering in Computer Science from University of California, Berkeley (2015).";
    }
    
    // Consultation and booking queries
    if (lowerMessage.includes('consultation') || lowerMessage.includes('help') || lowerMessage.includes('services') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return "Priyanka offers consultation services including: Product Development Strategy, Technical Architecture Review, Startup Technical Consulting, Engineering Team Building, and Code Review & Best Practices. You can book a 30-minute call at: https://calendly.com/shahasanepriyanka/30min";
    }
    
    // General who/what queries
    if (lowerMessage.includes('who') || lowerMessage.includes('what')) {
      return "Priyanka is a Product Engineer and Entrepreneur with 8 years of experience. She has worked at Google and Microsoft, built successful products like StopScrolling.life, and now offers consultation services to help others with their technical and product challenges.";
    }

    return `I'm here to help! You can book a 30-minute consultation call with Priyanka at: https://calendly.com/shahasanepriyanka/30min`;
  }
};
