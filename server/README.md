# Backend API Documentation

This backend provides the API endpoints for Priyanka's AI chatbot with DeepSeek AI integration, conversation management, and email notifications.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual credentials.

3. **Start the Server**
   ```bash
   npm run server
   ```
   Or run both frontend and backend:
   ```bash
   npm run dev:full
   ```

## 📋 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DEEPSEEK_API_KEY` | Your DeepSeek AI API key | `sk-...` |
| `MAIL_USER` | Gmail address for sending emails | `your@gmail.com` |
| `MAIL_PASS` | Gmail app password | `your_app_password` |
| `MAIL_TO` | Email address to receive summaries | `shahasanepriyanka@gmail.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |

## 📧 Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `MAIL_PASS`

## 🔌 API Endpoints

### Chat Endpoints

#### `POST /api/chat`
Send a message and get AI response.

**Request:**
```json
{
  "message": "Hello, I'd like to discuss a project",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "reply": "Hi! I'm Priyanka's AI assistant...",
  "sessionId": "generated-session-id",
  "projectDetails": {
    "clientName": "John",
    "projectIdea": "Building a mobile app",
    "timeline": "3 months",
    "budget": "$10k"
  },
  "shouldBookCalendly": true
}
```

#### `POST /api/chat/calendly-booked`
Mark that a Calendly meeting was scheduled.

**Request:**
```json
{
  "sessionId": "session-id"
}
```

#### `POST /api/chat/end-session`
End conversation and send email summary.

**Request:**
```json
{
  "sessionId": "session-id"
}
```

#### `GET /api/chat/session/:sessionId`
Get session details and conversation history.

#### `GET /api/chat/stats`
Get server statistics.

### Email Endpoints

#### `POST /api/email/send-summary`
Manually send email summary.

**Request:**
```json
{
  "sessionId": "session-id",
  "reason": "conversation_end"
}
```

#### `POST /api/email/test`
Test email service connection.

#### `GET /api/email/config`
Get email configuration status.

### Health Check

#### `GET /api/health`
Server health check.

## 🤖 DeepSeek AI Integration

The backend uses DeepSeek AI to generate contextual responses. The AI:

- Maintains conversation context across messages
- Extracts project details (name, idea, timeline, budget)
- Suggests Calendly booking when appropriate
- Provides fallback responses if API fails

## 📝 Project Details Extraction

The system automatically extracts:

- **Client Name**: From phrases like "I'm John" or "my name is Sarah"
- **Project Idea**: From sentences containing project keywords
- **Timeline**: From timeline/deadline mentions
- **Budget**: From budget/cost discussions

## 📧 Email Notifications

Emails are automatically sent when:

1. **Calendly is suggested** - Project summary sent to Priyanka
2. **Conversation ends** - Full transcript and details sent
3. **Calendly is booked** - Confirmation email with project details

Email includes:
- Project details summary
- Full conversation transcript
- Calendly booking status
- Session information

## 🔧 Development

### Project Structure
```
server/
├── index.ts              # Main server file
├── types/                # TypeScript interfaces
├── services/             # Business logic
│   ├── conversationManager.ts
│   ├── deepseekService.ts
│   └── emailService.ts
└── routes/               # API routes
    ├── chat.ts
    └── email.ts
```

### Adding New Features

1. **New API Endpoint**: Add to appropriate route file
2. **New Service**: Create in `services/` directory
3. **New Types**: Add to `types/index.ts`
4. **Environment Variables**: Add to `.env.example`

### Testing

Test the API endpoints using curl or Postman:

```bash
# Test chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Test email
curl -X POST http://localhost:3001/api/email/test
```

## 🚨 Error Handling

The backend includes comprehensive error handling:

- API failures with fallback responses
- Email delivery failures with logging
- Session expiration handling
- Input validation
- Graceful degradation

## 📊 Monitoring

The server logs:
- Session creation/expiration
- API calls and responses
- Email delivery status
- Error details for debugging

## 🔒 Security

- CORS configured for frontend domains
- Environment variables for sensitive data
- Input validation on all endpoints
- Session timeout (30 minutes)
- Error messages don't expose internal details in production