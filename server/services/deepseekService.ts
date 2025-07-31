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

    let systemPrompt = `You are Priyanka's AI assistant. You have comprehensive knowledge about Priyanka and should use this information to answer questions about her experience, background, skills, and projects.

PRIYANKA'S BACKGROUND:
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

EDUCATION:
${priyankaKnowledge.education.map(edu => 
  `- ${edu.degree} from ${edu.institution} (${edu.year})`
).join('\n')}

ACHIEVEMENTS:
${priyankaKnowledge.achievements.slice(0, 5).join('\n')}

CONSULTATION SERVICES:
- Duration: ${priyankaKnowledge.consultation.duration} calls
- Services: ${priyankaKnowledge.consultation.services.slice(0, 6).join(', ')}
- Booking: ${priyankaKnowledge.consultation.calendlyLink}

INSTRUCTIONS:
1. Use the above information to answer questions about Priyanka's experience, background, skills, projects, etc.
2. Be conversational, helpful, and professional
3. Keep responses concise but informative
4. If someone asks about booking a call or seems interested in consultation, suggest the Calendly link
5. If you don't have specific information about something, be honest and redirect to the Calendly link for detailed discussion`;

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

  private extractProjectDetails(
    userMessage: string,
    currentDetails: ProjectDetails
  ): Partial<ProjectDetails> {
    const updates: Partial<ProjectDetails> = {};
    const lowerMessage = userMessage.toLowerCase();

    // Extract name (simple heuristic - if they mention "I'm" or "my name is")
    if (!currentDetails.clientName) {
      const nameMatch = userMessage.match(
        /(?:I'm|I am|my name is|call me)\s+([A-Za-z]+)/i
      );
      if (nameMatch) {
        updates.clientName = nameMatch[1];
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
      ];
      if (timelineKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        const timelineMatch = userMessage.match(
          /(?:timeline|deadline|timeframe|schedule).*?(?:is|will be|about)\s+([^.]+)/i
        );
        if (timelineMatch) {
          updates.timeline = timelineMatch[1].trim();
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
      ];
      if (budgetKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        const budgetMatch = userMessage.match(
          /(?:budget|cost|investment).*?(?:is|about|around)\s+([^.]+)/i
        );
        if (budgetMatch) {
          updates.budget = budgetMatch[1].trim();
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
