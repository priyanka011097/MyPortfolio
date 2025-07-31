import { Router, Request, Response } from 'express';
import { conversationManager } from '../services/conversationManager';
import { deepseekService } from '../services/deepseekService';
import { emailService } from '../services/emailService';
import { ChatRequest, ChatResponse, Message } from '../types';

const router = Router();

// Helper function to determine if we should send a progress email
const shouldSendProgressEmail = (updates: any, currentDetails: any): boolean => {
  // Send email when we collect key information
  const hasKeyInfo = 
    updates.clientName || 
    updates.companyName || 
    updates.phoneNumber || 
    updates.email || 
    updates.projectIdea || 
    updates.budget;
    
  // Send email when we have enough info to be valuable
  const hasEnoughInfo = 
    (currentDetails.clientName || updates.clientName) &&
    (currentDetails.projectIdea || updates.projectIdea) &&
    (currentDetails.phoneNumber || updates.phoneNumber || currentDetails.email || updates.email);
    
  // Send email when budget is mentioned (important for business)
  const hasBudget = updates.budget || currentDetails.budget;
  
  return hasKeyInfo && (hasEnoughInfo || hasBudget);
};

// POST /api/chat - Handle chat messages
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, sessionId }: ChatRequest = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    let currentSessionId = sessionId;
    let conversationHistory: Message[] = [];
    let projectDetails = {};

    // Create new session if none provided
    if (!currentSessionId) {
      currentSessionId = conversationManager.createSession();
      console.log(`🆕 Created new session: ${currentSessionId}`);
    } else {
      // Get existing session
      const session = conversationManager.getSession(currentSessionId);
      if (!session) {
        // Session expired, create new one
        currentSessionId = conversationManager.createSession();
        console.log(`🔄 Session expired, created new session: ${currentSessionId}`);
      } else {
        conversationHistory = session.messages;
        projectDetails = session.projectDetails;
      }
    }

    // Add user message to conversation
    const userMessage: Message = {
      from: 'user',
      text: message,
      timestamp: new Date()
    };
    conversationManager.addMessage(currentSessionId, userMessage);

    // Generate AI response
    console.log(`🤖 Generating response for session: ${currentSessionId}`);
    const aiResponse = await deepseekService.generateResponse(
      message,
      conversationHistory,
      projectDetails
    );

    // Update project details if any were extracted
    if (Object.keys(aiResponse.projectUpdates).length > 0) {
      conversationManager.updateProjectDetails(currentSessionId, aiResponse.projectUpdates);
      console.log(`📝 Updated project details:`, aiResponse.projectUpdates);
      
      // Send email when significant information is collected
      const session = conversationManager.getSession(currentSessionId);
      if (session && shouldSendProgressEmail(aiResponse.projectUpdates, session.projectDetails)) {
        emailService.sendProjectSummary(session, 'progress_update')
          .then(success => {
            if (success) {
              console.log(`📧 Progress email sent for session: ${currentSessionId}`);
            } else {
              console.log(`❌ Failed to send progress email for session: ${currentSessionId}`);
            }
          })
          .catch(error => {
            console.error(`❌ Progress email error for session ${currentSessionId}:`, error);
          });
      }
    }

    // Add bot response to conversation
    const botMessage: Message = {
      from: 'bot',
      text: aiResponse.reply,
      timestamp: new Date()
    };
    conversationManager.addMessage(currentSessionId, botMessage);

    // Check if we should send email (when Calendly is suggested)
    if (aiResponse.shouldBookCalendly) {
      const session = conversationManager.getSession(currentSessionId);
      if (session) {
        // Send email in background (don't wait for it)
        emailService.sendProjectSummary(session, 'conversation_end')
          .then(success => {
            if (success) {
              console.log(`📧 Email sent for session: ${currentSessionId}`);
            } else {
              console.log(`❌ Failed to send email for session: ${currentSessionId}`);
            }
          })
          .catch(error => {
            console.error(`❌ Email error for session ${currentSessionId}:`, error);
          });
      }
    }

    // Prepare response
    const response: ChatResponse = {
      reply: aiResponse.reply,
      sessionId: currentSessionId,
      projectDetails: { ...projectDetails, ...aiResponse.projectUpdates },
      shouldBookCalendly: aiResponse.shouldBookCalendly
    };

    console.log(`✅ Chat response sent for session: ${currentSessionId}`);
    res.json(response);

  } catch (error) {
    console.error('❌ Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process chat message'
    });
  }
});

// POST /api/chat/calendly-booked - Mark Calendly as booked
router.post('/calendly-booked', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = conversationManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or expired' });
    }

    // Mark Calendly as booked
    conversationManager.markCalendlyBooked(sessionId);

    // Send email notification
    const emailSent = await emailService.sendProjectSummary(session, 'calendly_booked');
    
    if (emailSent) {
      console.log(`🎉 Calendly booked and email sent for session: ${sessionId}`);
    } else {
      console.log(`⚠️ Calendly booked but email failed for session: ${sessionId}`);
    }

    res.json({ 
      success: true, 
      message: 'Calendly booking recorded',
      emailSent 
    });

  } catch (error) {
    console.error('❌ Calendly booking error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to record Calendly booking'
    });
  }
});

// POST /api/chat/end-session - End conversation and send summary
router.post('/end-session', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = conversationManager.endSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or already ended' });
    }

    // Send email summary
    const emailSent = await emailService.sendProjectSummary(session, 'conversation_end');
    
    if (emailSent) {
      console.log(`📧 Session ended and email sent for session: ${sessionId}`);
    } else {
      console.log(`⚠️ Session ended but email failed for session: ${sessionId}`);
    }

    res.json({ 
      success: true, 
      message: 'Session ended successfully',
      emailSent 
    });

  } catch (error) {
    console.error('❌ End session error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to end session'
    });
  }
});

// GET /api/chat/session/:sessionId - Get session details
router.get('/session/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = conversationManager.getSession(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found or expired' });
    }

    res.json({
      sessionId: session.sessionId,
      messages: session.messages,
      projectDetails: session.projectDetails,
      lastActivity: session.lastActivity
    });

  } catch (error) {
    console.error('❌ Get session error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get session details'
    });
  }
});

// GET /api/chat/stats - Get server stats
router.get('/stats', (req: Request, res: Response) => {
  try {
    const activeSessions = conversationManager.getActiveSessionCount();
    
    res.json({
      activeSessions,
      timestamp: new Date().toISOString(),
      serverStatus: 'healthy'
    });

  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get server stats'
    });
  }
});

export { router as chatRouter };