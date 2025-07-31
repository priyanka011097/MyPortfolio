export const getBotReply = async (userMessage: string): Promise<string> => {
  const calendlyLink = "https://calendly.com/shahasanepriyanka/30min";
  
  // Check if user wants to book a meeting
  const bookingKeywords = [
    "book", "schedule", "meeting", "call", "appointment", "calendar", 
    "meet", "chat", "discuss", "talk", "consultation", "session"
  ];
  
  const isBookingRequest = bookingKeywords.some(keyword => 
    userMessage.toLowerCase().includes(keyword)
  );

  if (isBookingRequest) {
    return `Great! I'd be happy to help you schedule a 30-minute call with Priyanka. 

You can book your appointment directly through her Calendly link: ${calendlyLink}

The call will be 30 minutes long and you can choose a time that works best for you. Priyanka is available for discussions about:
• Product development and strategy
• Engineering challenges
• Startup advice
• Technical consulting

Would you like me to help you with anything else while you're booking?`;
  }

  // Use Perplexity API for other queries
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are Priyanka's AI assistant. Priyanka is a product engineer and entrepreneur who:
- Built her own product StopScrolling.life
- Focuses on engineering bold ideas into scalable products with lasting social impact
- Offers 30-minute consultation calls for product development, engineering challenges, startup advice, and technical consulting
- Has a Calendly link for booking: ${calendlyLink}

Be helpful, friendly, and professional. If someone asks about booking a call, always provide the Calendly link. Keep responses concise and engaging.`
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || 
      "I'm here to help! You can book a call with Priyanka at: " + calendlyLink;
      
  } catch (error) {
    console.error("API Error:", error);
    
    // Fallback responses based on common queries
    const fallbackResponses = {
      "who": "Priyanka is a product engineer and entrepreneur who builds scalable products with social impact. She created StopScrolling.life and offers consultation calls.",
      "what": "Priyanka helps with product development, engineering challenges, startup advice, and technical consulting through 30-minute calls.",
      "how": "You can book a 30-minute call with Priyanka through her Calendly: " + calendlyLink,
      "when": "Priyanka offers flexible scheduling through her Calendly link: " + calendlyLink,
      "where": "You can connect with Priyanka through her Calendly for virtual calls: " + calendlyLink,
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return `I'm here to help! You can book a 30-minute consultation call with Priyanka at: ${calendlyLink}`;
  }
};
