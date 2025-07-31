import axios from 'axios';
import { DeepSeekRequest, DeepSeekResponse, DeepSeekMessage, Message, ProjectDetails } from '../types';

class DeepSeekService {
  private readonly API_URL = 'https://api.deepseek.com/v1/chat/completions';
  private readonly CALENDLY_LINK = 'https://calendly.com/shahasanepriyanka/30min';

  private get API_KEY(): string {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is required in environment variables');
    }
    return apiKey;
  }

  constructor() {
    // Constructor no longer checks API key immediately
  }

  private createSystemPrompt(projectDetails: ProjectDetails): string {
    const hasProjectInfo = projectDetails.clientName || projectDetails.projectIdea || projectDetails.timeline || projectDetails.budget;
    
    let systemPrompt = `You are Priyanka's AI assistant. Priyanka is a product engineer and entrepreneur who:
- Built her own product StopScrolling.life
- Focuses on engineering bold ideas into scalable products with lasting social impact
- Offers 30-minute consultation calls for product development, engineering challenges, startup advice, and technical consulting
- Has a Calendly link for booking: ${this.CALENDLY_LINK}

Be helpful, friendly, and professional. Keep responses concise and engaging.`;

    if (hasProjectInfo) {
      systemPrompt += `\n\nCurrent project details collected:
${projectDetails.clientName ? `- Client Name: ${projectDetails.clientName}` : ''}
${projectDetails.projectIdea ? `- Project Idea: ${projectDetails.projectIdea}` : ''}
${projectDetails.timeline ? `- Timeline: ${projectDetails.timeline}` : ''}
${projectDetails.budget ? `- Budget: ${projectDetails.budget}` : ''}

If the user seems ready to book a call or has provided sufficient project details, suggest booking through the Calendly link.`;
    } else {
      systemPrompt += `\n\nTry to collect the following information naturally through conversation:
- Client name (if they're comfortable sharing)
- Project idea or description
- Timeline for the project
- Budget considerations

Once you have enough details, suggest booking a call through the Calendly link.`;
    }

    return systemPrompt;
  }

  private extractProjectDetails(userMessage: string, currentDetails: ProjectDetails): Partial<ProjectDetails> {
    const updates: Partial<ProjectDetails> = {};
    const lowerMessage = userMessage.toLowerCase();

    // Extract name (simple heuristic - if they mention "I'm" or "my name is")
    if (!currentDetails.clientName) {
      const nameMatch = userMessage.match(/(?:I'm|I am|my name is|call me)\s+([A-Za-z]+)/i);
      if (nameMatch) {
        updates.clientName = nameMatch[1];
      }
    }

    // Extract project idea
    if (!currentDetails.projectIdea) {
      const projectKeywords = ['project', 'idea', 'building', 'developing', 'creating', 'app', 'website', 'product'];
      if (projectKeywords.some(keyword => lowerMessage.includes(keyword))) {
        // Extract the sentence containing project info
        const sentences = userMessage.split(/[.!?]+/);
        const projectSentence = sentences.find(sentence => 
          projectKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
        );
        if (projectSentence) {
          updates.projectIdea = projectSentence.trim();
        }
      }
    }

    // Extract timeline
    if (!currentDetails.timeline) {
      const timelineKeywords = ['timeline', 'deadline', 'when', 'timeframe', 'schedule'];
      if (timelineKeywords.some(keyword => lowerMessage.includes(keyword))) {
        const timelineMatch = userMessage.match(/(?:timeline|deadline|timeframe|schedule).*?(?:is|will be|about)\s+([^.]+)/i);
        if (timelineMatch) {
          updates.timeline = timelineMatch[1].trim();
        }
      }
    }

    // Extract budget
    if (!currentDetails.budget) {
      const budgetKeywords = ['budget', 'cost', 'investment', 'money', 'funding'];
      if (budgetKeywords.some(keyword => lowerMessage.includes(keyword))) {
        const budgetMatch = userMessage.match(/(?:budget|cost|investment).*?(?:is|about|around)\s+([^.]+)/i);
        if (budgetMatch) {
          updates.budget = budgetMatch[1].trim();
        }
      }
    }

    return updates;
  }

  private shouldSuggestCalendly(userMessage: string, projectDetails: ProjectDetails): boolean {
    const lowerMessage = userMessage.toLowerCase();
    const bookingKeywords = ['book', 'schedule', 'meeting', 'call', 'appointment', 'calendar', 'meet', 'chat', 'discuss', 'talk', 'consultation'];
    
    // If user explicitly wants to book
    if (bookingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return true;
    }

    // If we have sufficient project details
    const hasProjectInfo = projectDetails.clientName || projectDetails.projectIdea || projectDetails.timeline || projectDetails.budget;
    const hasEnoughInfo = projectDetails.projectIdea && (projectDetails.timeline || projectDetails.budget);
    
    return hasProjectInfo && hasEnoughInfo;
  }

  async generateResponse(
    userMessage: string, 
    conversationHistory: Message[], 
    projectDetails: ProjectDetails
  ): Promise<{ reply: string; projectUpdates: Partial<ProjectDetails>; shouldBookCalendly: boolean }> {
    
    // Extract project details from user message
    const projectUpdates = this.extractProjectDetails(userMessage, projectDetails);
    const updatedProjectDetails = { ...projectDetails, ...projectUpdates };
    
    // Check if we should suggest Calendly
    const shouldBookCalendly = this.shouldSuggestCalendly(userMessage, updatedProjectDetails);

    // Prepare conversation history for DeepSeek
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: this.createSystemPrompt(updatedProjectDetails)
      }
    ];

    // Add conversation history (last 10 messages to stay within token limits)
    const recentMessages = conversationHistory.slice(-10);
    for (const msg of recentMessages) {
      messages.push({
        role: msg.from === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    const request: DeepSeekRequest = {
      model: 'deepseek-chat',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    };

    try {
      const response = await axios.post<DeepSeekResponse>(this.API_URL, request, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      let reply = response.data.choices[0]?.message?.content?.trim() || 
        "I'm here to help! You can book a call with Priyanka at: " + this.CALENDLY_LINK;

      // If we should suggest Calendly, make sure it's included in the response
      if (shouldBookCalendly && !reply.toLowerCase().includes('calendly')) {
        reply += `\n\nReady to discuss your project? You can book a 30-minute call with Priyanka at: ${this.CALENDLY_LINK}`;
      }

      return {
        reply,
        projectUpdates,
        shouldBookCalendly
      };

    } catch (error) {
      console.error('DeepSeek API Error:', error);
      
      // Fallback response
      let fallbackReply = "I'm here to help! You can book a call with Priyanka at: " + this.CALENDLY_LINK;
      
      if (shouldBookCalendly) {
        fallbackReply = `Great! I'd be happy to help you schedule a 30-minute call with Priyanka. You can book your appointment directly through her Calendly link: ${this.CALENDLY_LINK}`;
      }

      return {
        reply: fallbackReply,
        projectUpdates,
        shouldBookCalendly
      };
    }
  }
}

export const deepseekService = new DeepSeekService();