import { v4 as uuidv4 } from 'uuid';
import { ConversationContext, ProjectDetails, Message } from '../types';

class ConversationManager {
  private conversations: Map<string, ConversationContext> = new Map();
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  createSession(): string {
    const sessionId = uuidv4();
    const context: ConversationContext = {
      sessionId,
      messages: [{
        from: 'bot',
        text: "Hi! I'm Priyanka's AI assistant. I can help you schedule a 30-minute call with her. Just let me know when you'd like to meet!",
        timestamp: new Date(),
      }],
      projectDetails: {},
      lastActivity: new Date(),
    };
    
    this.conversations.set(sessionId, context);
    return sessionId;
  }

  getSession(sessionId: string): ConversationContext | null {
    const context = this.conversations.get(sessionId);
    if (!context) return null;

    // Check if session has expired
    const now = new Date();
    const timeDiff = now.getTime() - context.lastActivity.getTime();
    
    if (timeDiff > this.SESSION_TIMEOUT) {
      this.conversations.delete(sessionId);
      return null;
    }

    // Update last activity
    context.lastActivity = now;
    return context;
  }

  addMessage(sessionId: string, message: Message): void {
    const context = this.getSession(sessionId);
    if (!context) {
      throw new Error('Session not found or expired');
    }

    context.messages.push(message);
    context.lastActivity = new Date();
    this.conversations.set(sessionId, context);
  }

  updateProjectDetails(sessionId: string, details: Partial<ProjectDetails>): void {
    const context = this.getSession(sessionId);
    if (!context) {
      throw new Error('Session not found or expired');
    }

    context.projectDetails = { ...context.projectDetails, ...details };
    context.lastActivity = new Date();
    this.conversations.set(sessionId, context);
  }

  getConversationHistory(sessionId: string): Message[] {
    const context = this.getSession(sessionId);
    return context?.messages || [];
  }

  getProjectDetails(sessionId: string): ProjectDetails {
    const context = this.getSession(sessionId);
    return context?.projectDetails || {};
  }

  markCalendlyBooked(sessionId: string): void {
    this.updateProjectDetails(sessionId, { calendlyBooked: true });
  }

  endSession(sessionId: string): ConversationContext | null {
    const context = this.getSession(sessionId);
    if (context) {
      this.conversations.delete(sessionId);
    }
    return context;
  }

  // Cleanup expired sessions
  cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, context] of this.conversations.entries()) {
      const timeDiff = now.getTime() - context.lastActivity.getTime();
      if (timeDiff > this.SESSION_TIMEOUT) {
        this.conversations.delete(sessionId);
      }
    }
  }

  // Get session count for monitoring
  getActiveSessionCount(): number {
    return this.conversations.size;
  }
}

export const conversationManager = new ConversationManager();

// Cleanup expired sessions every 10 minutes
setInterval(() => {
  conversationManager.cleanupExpiredSessions();
}, 10 * 60 * 1000);