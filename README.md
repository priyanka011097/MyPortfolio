# Priyanka's Portfolio with AI Assistant

This is Priyanka's personal portfolio website featuring an AI-powered chatbot assistant that can help visitors schedule consultation calls.

## Features

- **AI Chatbot**: Intelligent assistant powered by DeepSeek AI
- **Calendly Integration**: Direct booking for 30-minute consultation calls
- **Email Notifications**: Automatic project summaries sent to Priyanka
- **Conversation Management**: Session-based chat with context preservation
- **Project Details Extraction**: Automatically collects client information
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Chat**: Live conversation with typing indicators and timestamps

## AI Assistant Features

The chatbot can help with:
- Scheduling 30-minute consultation calls
- Collecting project details (name, idea, timeline, budget)
- Answering questions about Priyanka's work
- Providing information about services offered
- Directing users to the Calendly booking link
- Sending email summaries to Priyanka

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file and configure your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:
```env
# DeepSeek AI Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Email Configuration (Gmail)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
MAIL_TO=shahasanepriyanka@gmail.com

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `MAIL_PASS`

### 4. Test Setup
```bash
node server/test-setup.js
```

### 5. Start Development
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
npm run server  # Backend on port 3001
npm run dev     # Frontend on port 5173
```

## 📋 API Endpoints

### Chat Endpoints
- `POST /api/chat` - Send message and get AI response
- `POST /api/chat/calendly-booked` - Mark Calendly as booked
- `POST /api/chat/end-session` - End conversation and send summary
- `GET /api/chat/session/:sessionId` - Get session details
- `GET /api/chat/stats` - Get server statistics

### Email Endpoints
- `POST /api/email/send-summary` - Manually send email summary
- `POST /api/email/test` - Test email service
- `GET /api/email/config` - Get email configuration

### Health Check
- `GET /api/health` - Server health check

## 🤖 DeepSeek AI Integration

The backend uses DeepSeek AI to:
- Maintain conversation context across messages
- Extract project details (name, idea, timeline, budget)
- Suggest Calendly booking when appropriate
- Provide fallback responses if API fails

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

## Usage

- Click the AI Assistant button (🤖) in the bottom-right corner of the hero section
- Start a conversation with the chatbot
- The AI will naturally collect project details through conversation
- Ask about booking a call or any questions about Priyanka's services
- The chatbot will provide the Calendly link for scheduling
- Email summaries are automatically sent to Priyanka

## Technology Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations

### Backend
- Node.js with Express
- TypeScript
- DeepSeek AI API
- Nodemailer for email notifications
- Session management with conversation context

## Development

### Project Structure
```
├── src/                    # Frontend React app
│   ├── Components/        # React components
│   └── utils/            # Frontend utilities
├── server/                # Backend API
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   └── types/            # TypeScript interfaces
└── .env.example          # Environment template
```

### Testing the API
```bash
# Test health check
curl http://localhost:3001/api/health

# Test chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Test email
curl -X POST http://localhost:3001/api/email/test
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEEPSEEK_API_KEY` | DeepSeek AI API key | Yes |
| `MAIL_USER` | Gmail address for sending emails | Yes |
| `MAIL_PASS` | Gmail app password | Yes |
| `MAIL_TO` | Email to receive summaries | Yes |
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment mode | No (default: development) |

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
