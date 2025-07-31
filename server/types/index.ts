import dotenv from 'dotenv';
dotenv.config();

export interface Message {
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ConversationContext {
  sessionId: string;
  messages: Message[];
  projectDetails: ProjectDetails;
  lastActivity: Date;
}

export interface ProjectDetails {
  clientName?: string;
  designation?: string;
  companyName?: string;
  phoneNumber?: string;
  email?: string;
  projectIdea?: string;
  timeline?: string;
  budget?: string;
  additionalInfo?: string;
  calendlyBooked?: boolean;
}

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  projectDetails: ProjectDetails;
  shouldBookCalendly: boolean;
}

export interface EmailSummaryRequest {
  sessionId: string;
  reason: 'conversation_end' | 'calendly_booked';
}