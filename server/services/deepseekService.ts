import axios from "axios";
import {
  DeepSeekRequest,
  DeepSeekResponse,
  DeepSeekMessage,
  Message,
  ProjectDetails,
} from "../types";
import { priyankaKnowledge, getPriyankaInfo } from "./priyankaKnowledge";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


class DeepSeekService {
  private readonly API_KEY = process.env.DEEPSEEK_API_KEY;
  private readonly API_URL = "https://api.deepseek.com/v1/chat/completions";
  private readonly CALENDLY_LINK =
    "https://calendly.com/shahasanepriyanka/30min";

  constructor() {
    if (!this.API_KEY) {
      throw new Error("DEEPSEEK_API_KEY is required in environment variables");
    }
  }

  private createSystemPrompt(projectDetails: ProjectDetails): string {
    const hasProjectInfo =
      projectDetails.clientName ||
      projectDetails.projectIdea ||
      projectDetails.timeline ||
      projectDetails.budget;

    let systemPrompt = `You are Priyanka's personal AI assistant. Your role is to help collect project details from potential clients and book consultation calls with Priyanka.

CONVERSATION FLOW:
1. Greet warmly and introduce yourself as Priyanka's assistant
2. Ask about their project/needs
3. Collect key information: name, designation, company, phone, project scope, budget
4. Ask about UI/UX requirements
5. Offer to book a consultation call
6. Confirm time slots and collect email
7. Thank them and confirm booking

INFORMATION TO COLLECT:
- Client name and designation
- Company name
- Mobile number
- Project scope/description
- Budget range
- UI/UX requirements
- Preferred meeting time
- Email address

PRIYANKA'S BACKGROUND (for context):
- Name: ${priyankaKnowledge.personal.name}
- Title: ${priyankaKnowledge.personal.title}
- Experience: ${priyankaKnowledge.experience.yearsOfExperience} years in software engineering and product development
- Current Role: ${priyankaKnowledge.experience.currentRole}
- Location: ${priyankaKnowledge.personal.location}

WORK EXPERIENCE:
${priyankaKnowledge.experience.previousRoles.map(role => 
  `- ${role.title} at ${role.company} (${role.duration}): ${role.description}`
).join('\n')}

KEY SKILLS:
Technical: ${priyankaKnowledge.skills.technical.slice(0, 8).join(', ')}
Soft Skills: ${priyankaKnowledge.skills.soft.slice(0, 5).join(', ')}

NOTABLE PROJECTS:
${priyankaKnowledge.projects.map(project => 
  `- ${project.name}: ${project.description} (Tech: ${project.tech.join(', ')})`
).join('\n')}

CONSULTATION SERVICES:
- Duration: ${priyankaKnowledge.consultation.duration} calls
- Services: ${priyankaKnowledge.consultation.services.slice(0, 6).join(', ')}
- Booking: ${priyankaKnowledge.consultation.calendlyLink}

CONVERSATION STYLE:
- Be friendly, professional, and helpful
- Ask one question at a time
- Be conversational, not robotic
- Show enthusiasm about their project
- Be flexible with scheduling
- Always mention that Priyanka never says no to customers
- Offer to help with UI/UX if they don't have it ready
- Suggest time slots like "9:30 PM" or "7:30 PM on Saturday"
- Collect email at the end for booking confirmation

EXAMPLE RESPONSES:
- "Hey! I'm Priyanka's personal assistant, how can I help you?"
- "Can you please tell me more? Based on our chat I will bring Priyanka up to speed. Can you help me with the following details: What is your name and designation, Name of your company, your mobile number, what is your scale for the website you want to make and what is your budget?"
- "Could you also please share the budget? Priyanka never says no to her customers, so you sharing the budget will just make the process easy"
- "Do you have your UI UX ready? If not, any other websites you like?"
- "No problem, Priyanka has a team of best people who can take care of everything. To move ahead let me quickly book a slot for you and Priyanka, will tomorrow work for you?"
- "Great, I am booking for tomorrow, 9:30 PM will it work for you?"
- "Oh! So will 7:30 be fine on Saturday?"
- "Please share your email, I am booking your slot"
- "Thank you."`;

    if (hasProjectInfo) {
      systemPrompt += `\n\nCurrent project details collected:
${
  projectDetails.clientName ? `- Client Name: ${projectDetails.clientName}` : ""
}
${
  projectDetails.projectIdea
    ? `- Project Idea: ${projectDetails.projectIdea}`
    : ""
}
${projectDetails.timeline ? `- Timeline: ${projectDetails.timeline}` : ""}
${projectDetails.budget ? `- Budget: ${projectDetails.budget}` : ""}

Use this information to provide more personalized responses and suggest booking a call.`;
    } else {
      systemPrompt += `\n\nTry to collect the following information naturally through conversation:
- Client name and designation
- Company name
- Mobile number
- Project scope/description
- Budget range
- UI/UX requirements

Once you have enough details, suggest booking a call through the Calendly link.`;
    }

    return systemPrompt;
  }

  private extractProjectDetails(
    userMessage: string,
    currentDetails: ProjectDetails
  ): Partial<ProjectDetails> {
    const updates: Partial<ProjectDetails> = {};
    const lowerMessage = userMessage.toLowerCase();

    // Extract name and designation
    if (!currentDetails.clientName) {
      // Look for patterns like "I am [name] [designation]" or "my name is [name]"
      const nameMatch = userMessage.match(
        /(?:I am|I'm|my name is|call me)\s+([A-Za-z]+)(?:\s+([A-Za-z]+))?/i
      );
      if (nameMatch) {
        updates.clientName = nameMatch[1];
        if (nameMatch[2]) {
          updates.designation = nameMatch[2];
        }
      }
    }

    // Extract designation if not already captured
    if (!currentDetails.designation && !updates.designation) {
      const designationKeywords = ['cto', 'ceo', 'founder', 'manager', 'director', 'developer'];
      for (const keyword of designationKeywords) {
        if (lowerMessage.includes(keyword)) {
          updates.designation = keyword.toUpperCase();
          break;
        }
      }
    }

    // Extract company name
    if (!currentDetails.companyName) {
      const companyMatch = userMessage.match(
        /(?:at|company|work at|from)\s+([A-Za-z]+)/i
      );
      if (companyMatch) {
        updates.companyName = companyMatch[1];
      }
    }

    // Extract phone number
    if (!currentDetails.phoneNumber) {
      const phoneMatch = userMessage.match(
        /(\d{10,12})/
      );
      if (phoneMatch) {
        updates.phoneNumber = phoneMatch[1];
      }
    }

    // Extract email
    if (!currentDetails.email) {
      const emailMatch = userMessage.match(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
      );
      if (emailMatch) {
        updates.email = emailMatch[1];
      }
    }

    // Extract project idea
    if (!currentDetails.projectIdea) {
      const projectKeywords = [
        "project",
        "idea",
        "building",
        "developing",
        "creating",
        "app",
        "website",
        "product",
        "make",
        "want to",
      ];
      if (projectKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        // Extract the sentence containing project info
        const sentences = userMessage.split(/[.!?]+/);
        const projectSentence = sentences.find((sentence) =>
          projectKeywords.some((keyword) =>
            sentence.toLowerCase().includes(keyword)
          )
        );
        if (projectSentence) {
          updates.projectIdea = projectSentence.trim();
        }
      }
    }

    // Extract timeline
    if (!currentDetails.timeline) {
      const timelineKeywords = [
        "timeline",
        "deadline",
        "when",
        "timeframe",
        "schedule",
        "tomorrow",
        "saturday",
        "next week",
      ];
      if (timelineKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        const timelineMatch = userMessage.match(
          /(?:timeline|deadline|timeframe|schedule).*?(?:is|will be|about)\s+([^.]+)/i
        );
        if (timelineMatch) {
          updates.timeline = timelineMatch[1].trim();
        } else {
          // Extract specific time mentions
          const timeMatch = userMessage.match(
            /(?:tomorrow|saturday|next week|9\.30|7\.30|9:30|7:30)/i
          );
          if (timeMatch) {
            updates.timeline = timeMatch[0];
          }
        }
      }
    }

    // Extract budget
    if (!currentDetails.budget) {
      const budgetKeywords = [
        "budget",
        "cost",
        "investment",
        "money",
        "funding",
        "k",
        "thousand",
        "lakh",
      ];
      if (budgetKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        const budgetMatch = userMessage.match(
          /(?:budget|cost|investment).*?(?:is|about|around)\s+([^.]+)/i
        );
        if (budgetMatch) {
          updates.budget = budgetMatch[1].trim();
        } else {
          // Extract budget amounts
          const amountMatch = userMessage.match(
            /(\d+)\s*(?:k|thousand|lakh)/i
          );
          if (amountMatch) {
            updates.budget = `${amountMatch[1]}k`;
          }
        }
      }
    }

    return updates;
  }

  private shouldSuggestCalendly(
    userMessage: string,
    projectDetails: ProjectDetails
  ): boolean {
    const lowerMessage = userMessage.toLowerCase();
    const bookingKeywords = [
      "book",
      "schedule",
      "meeting",
      "call",
      "appointment",
      "calendar",
      "meet",
      "chat",
      "discuss",
      "talk",
      "consultation",
    ];

    // If user explicitly wants to book
    if (bookingKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return true;
    }

    // If we have sufficient project details
    const hasProjectInfo =
      !!projectDetails.clientName ||
      !!projectDetails.projectIdea ||
      !!projectDetails.timeline ||
      !!projectDetails.budget;

    const hasEnoughInfo =
      !!projectDetails.projectIdea &&
      (!!projectDetails.timeline || !!projectDetails.budget);

    return hasProjectInfo && hasEnoughInfo;
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: Message[],
    projectDetails: ProjectDetails
  ): Promise<{
    reply: string;
    projectUpdates: Partial<ProjectDetails>;
    shouldBookCalendly: boolean;
  }> {
    // Extract project details from user message
    const projectUpdates = this.extractProjectDetails(
      userMessage,
      projectDetails
    );
    const updatedProjectDetails = { ...projectDetails, ...projectUpdates };

    // Check if we should suggest Calendly
    const shouldBookCalendly = this.shouldSuggestCalendly(
      userMessage,
      updatedProjectDetails
    );

    // Prepare conversation history for DeepSeek
    const messages: DeepSeekMessage[] = [
      {
        role: "system",
        content: this.createSystemPrompt(updatedProjectDetails),
      },
    ];

    // Add conversation history (last 10 messages to stay within token limits)
    const recentMessages = conversationHistory.slice(-10);
    for (const msg of recentMessages) {
      messages.push({
        role: msg.from === "user" ? "user" : "assistant",
        content: msg.text,
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage,
    });

    const request: DeepSeekRequest = {
      model: "deepseek-chat",
      messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    };

    try {
      const response = await axios.post<DeepSeekResponse>(
        this.API_URL,
        request,
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let reply =
        response.data.choices[0]?.message?.content?.trim() ||
        "I'm here to help! You can book a call with Priyanka at: " +
          this.CALENDLY_LINK;

      // If we should suggest Calendly, make sure it's included in the response
      if (
        shouldBookCalendly &&
        reply &&
        !reply.toLowerCase().includes("calendly")
      ) {
        reply += `\n\nReady to discuss your project? You can book a 30-minute call with Priyanka at: ${this.CALENDLY_LINK}`;
      }

      return {
        reply,
        projectUpdates,
        shouldBookCalendly,
      };
    } catch (error) {
      console.error("DeepSeek API Error:", error);

      // Check if the error is due to missing API key
      if (!this.API_KEY || this.API_KEY === 'your_deepseek_api_key_here') {
        return {
          reply: "I apologize, but the AI service is not properly configured. Please contact the administrator to set up the DeepSeek API key. In the meantime, you can book a call with Priyanka directly at: " + this.CALENDLY_LINK,
          projectUpdates,
          shouldBookCalendly: true,
        };
      }

      // For other API errors, provide a more generic response
      let fallbackReply = "I'm having trouble connecting to the AI service right now. ";
      
      if (shouldBookCalendly) {
        fallbackReply += `You can book a 30-minute call with Priyanka to discuss your project: ${this.CALENDLY_LINK}`;
      } else if (userMessage.toLowerCase().includes('book') || userMessage.toLowerCase().includes('schedule') || userMessage.toLowerCase().includes('call')) {
        fallbackReply = `Great! I'd be happy to help you schedule a 30-minute call with Priyanka. You can book your appointment directly through her Calendly link: ${this.CALENDLY_LINK}`;
      } else {
        fallbackReply += "You can book a call with Priyanka to discuss your questions: " + this.CALENDLY_LINK;
      }

      return {
        reply: fallbackReply,
        projectUpdates,
        shouldBookCalendly: true,
      };
    }
  }
}

export const deepseekService = new DeepSeekService();
