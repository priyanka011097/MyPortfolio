import { Router, Request, Response } from 'express';
import { emailService } from '../services/emailService';
import { conversationManager } from '../services/conversationManager';

const router = Router();

// POST /api/email/send-summary - Manually send email summary
router.post('/send-summary', async (req: Request, res: Response) => {
  try {
    const { sessionId, reason } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    if (!reason || !['conversation_end', 'calendly_booked'].includes(reason)) {
      return res.status(400).json({ error: 'Reason must be "conversation_end" or "calendly_booked"' });
    }

    const session = conversationManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or expired' });
    }

    const emailSent = await emailService.sendProjectSummary(session, reason);
    
    if (emailSent) {
      console.log(`📧 Manual email sent for session: ${sessionId}`);
      res.json({ 
        success: true, 
        message: 'Email sent successfully',
        sessionId,
        reason
      });
    } else {
      console.log(`❌ Manual email failed for session: ${sessionId}`);
      res.status(500).json({ 
        error: 'Failed to send email',
        message: 'Email service error'
      });
    }

  } catch (error) {
    console.error('❌ Send summary error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to send email summary'
    });
  }
});

// POST /api/email/test - Test email connection
router.post('/test', async (req: Request, res: Response) => {
  try {
    const connectionTest = await emailService.testConnection();
    
    if (connectionTest) {
      res.json({ 
        success: true, 
        message: 'Email service connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ 
        error: 'Email service connection failed',
        message: 'Check your email credentials'
      });
    }

  } catch (error) {
    console.error('❌ Email test error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to test email service'
    });
  }
});

// GET /api/email/config - Get email configuration status
router.get('/config', (req: Request, res: Response) => {
  try {
    const config = {
      mailUser: process.env.MAIL_USER ? 'Configured' : 'Missing',
      mailPass: process.env.MAIL_PASS ? 'Configured' : 'Missing',
      mailTo: process.env.MAIL_TO || 'shahasanepriyanka@gmail.com',
      timestamp: new Date().toISOString()
    };

    res.json(config);

  } catch (error) {
    console.error('❌ Email config error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get email configuration'
    });
  }
});

export { router as emailRouter };