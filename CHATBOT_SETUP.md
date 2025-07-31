# Conversational Chatbot Setup Guide

## Overview
This chatbot creates a conversational experience similar to your example, where the AI assistant:
1. Greets users warmly
2. Collects project details (name, designation, company, phone, budget, etc.)
3. Asks about UI/UX requirements
4. Books consultation calls with Priyanka
5. Sends email summaries with collected information

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# DeepSeek AI Configuration
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here

# Email Configuration (Gmail)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
MAIL_TO=shahasanepriyanka@gmail.com

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend API URL
VITE_API_BASE_URL=http://localhost:3001
```

### 2. Get DeepSeek API Key
1. Go to https://platform.deepseek.com/
2. Sign up/Login
3. Generate an API key
4. Replace `your_actual_deepseek_api_key_here` with your real API key

### 3. Configure Gmail for Email Notifications
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in the `MAIL_PASS` field

### 4. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
```

### 5. Start the Application

```bash
# Terminal 1: Start the backend server
cd server
npm start

# Terminal 2: Start the frontend
npm run dev
```

## Features

### Conversational Flow
The chatbot follows this conversation pattern:
1. **Greeting**: "Hey! I'm Priyanka's personal assistant, how can I help you?"
2. **Project Inquiry**: Asks about their project and collects details
3. **Information Collection**: Gathers name, designation, company, phone, budget
4. **UI/UX Discussion**: Asks about design requirements
5. **Booking**: Offers to book a consultation call
6. **Scheduling**: Confirms time slots and collects email
7. **Confirmation**: Thanks and confirms booking

### Information Collected
- Client name and designation
- Company name
- Mobile number
- Project scope/description
- Budget range
- UI/UX requirements
- Preferred meeting time
- Email address

### Email Summaries
When a conversation ends or Calendly is booked, the system sends detailed email summaries including:
- All collected project details
- Complete conversation transcript
- Booking status
- Session information

### Calendly Integration
The chatbot suggests booking calls through Priyanka's Calendly link:
`https://calendly.com/shahasanepriyanka/30min`

## Example Conversation Flow

```
USER: Hey
AI: Hey! I'm Priyanka's personal assistant, how can I help you?

USER: I want to make a website
AI: Can you please tell me more? Based on our chat I will bring Priyanka up to speed. Can you help me with the following details: What is your name and designation, Name of your company, your mobile number, what is your scale for the website you want to make and what is your budget?

USER: So I am daksh CTO, 99755008124, at futureworld, and i want to make my company website
AI: Could you also please share the budget? Priyanka never says no to her customers, so you sharing the budget will just make the process easy

USER: ok I want this website to be done in 50k not more then that
AI: Do you have your UI UX ready? If not, any other websites you like?

USER: not yet
AI: No problem, Priyanka has a team of best people who can take care of everything. To move ahead let me quickly book a slot for you and Priyanka, will tomorrow work for you?

USER: Yes
AI: Great, I am booking for tomorrow, 9:30 PM will it work for you?

USER: no 9:30pm is too late
AI: Oh! So will 7:30 be fine on Saturday?

USER: yes
AI: Please share your email, I am booking your slot

USER: daksh@gmail.com
AI: Thank you.
```

## Troubleshooting

### API Connection Issues
- Ensure the DeepSeek API key is correctly set
- Check that the server is running on port 3001
- Verify the frontend can connect to the backend

### Email Issues
- Ensure Gmail app password is correctly configured
- Check that 2-factor authentication is enabled
- Verify the email addresses are correct

### Chatbot Not Responding
- Check browser console for errors
- Verify the backend server is running
- Ensure all environment variables are set

## Customization

### Modifying Conversation Flow
Edit `server/services/deepseekService.ts` to change the system prompt and conversation style.

### Updating Project Details
Modify `server/types/index.ts` to add new fields to the ProjectDetails interface.

### Email Templates
Update `server/services/emailService.ts` to customize email formatting and content.

## Security Notes
- Never commit your `.env` file to version control
- Keep your API keys secure
- Use environment variables for all sensitive configuration
- Regularly rotate your API keys and app passwords