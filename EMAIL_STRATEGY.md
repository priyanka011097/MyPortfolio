# Email Sending Strategy - Never Lose Data

## 🎯 Problem Solved
Users can leave the chat at any time, so we need multiple strategies to capture data and send emails at various points to ensure **no information is lost**.

## 📧 Email Sending Triggers

### **1. Progress Updates** 
**When**: Significant information is collected
**Trigger**: When user provides key details like name, company, phone, budget, etc.
**Email Subject**: `📊 New Lead Progress Update`

**Logic**:
```typescript
const shouldSendProgressEmail = (updates, currentDetails) => {
  const hasKeyInfo = updates.clientName || updates.companyName || 
                     updates.phoneNumber || updates.email || 
                     updates.projectIdea || updates.budget;
                     
  const hasEnoughInfo = 
    (currentDetails.clientName || updates.clientName) &&
    (currentDetails.projectIdea || updates.projectIdea) &&
    (currentDetails.phoneNumber || updates.phoneNumber || 
     currentDetails.email || updates.email);
     
  const hasBudget = updates.budget || currentDetails.budget;
  
  return hasKeyInfo && (hasEnoughInfo || hasBudget);
};
```

### **2. Calendly Booking**
**When**: User agrees to book a consultation
**Trigger**: When `shouldBookCalendly` is true
**Email Subject**: `🎉 New Calendly Booking - Project Summary`

### **3. Session Expired**
**When**: User is inactive for 30 minutes
**Trigger**: Automatic cleanup of expired sessions
**Email Subject**: `⏰ Session Expired - Lead Data Captured`

**Logic**:
```typescript
const hasMeaningfulData = 
  context.projectDetails.clientName ||
  context.projectDetails.projectIdea ||
  context.projectDetails.phoneNumber ||
  context.projectDetails.email ||
  context.projectDetails.budget;

if (hasMeaningfulData && context.messages.length > 1) {
  // Send email before deleting session
}
```

### **4. User Leaves Page**
**When**: User closes browser tab, navigates away, or closes chat
**Trigger**: Frontend detects page unload/visibility change
**Email Subject**: `📝 Conversation Summary - Project Details`

**Frontend Detection**:
```typescript
// Detect when user is about to leave
window.addEventListener('beforeunload', sendFinalEmail);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    sendFinalEmail();
  }
});
```

### **5. Manual Session End**
**When**: Explicit session termination
**Trigger**: API call to `/api/chat/end-session`
**Email Subject**: `📝 Conversation Summary - Project Details`

## 📊 Data Collection Points

### **Information Extracted**:
- ✅ **Client Name** (e.g., "daksh")
- ✅ **Designation** (e.g., "CTO", "CEO")
- ✅ **Company Name** (e.g., "futureworld")
- ✅ **Phone Number** (e.g., "99755008124")
- ✅ **Email Address** (e.g., "daksh@gmail.com")
- ✅ **Project Idea** (e.g., "company website")
- ✅ **Budget** (e.g., "50k")
- ✅ **Timeline** (e.g., "tomorrow", "Saturday 7:30")
- ✅ **Additional Requirements** (any extra details)

### **Extraction Methods**:
1. **Pattern Matching**: Regex patterns for structured data
2. **Keyword Detection**: Identify important terms
3. **Natural Language Processing**: DeepSeek AI understanding
4. **Context Awareness**: Build on previous messages

## 🛡️ Data Protection Strategy

### **Multiple Safeguards**:

1. **Real-time Extraction**: Data captured as soon as user provides it
2. **Progress Emails**: Sent when significant info is collected
3. **Session Monitoring**: Track user activity and send emails on timeout
4. **Page Unload Detection**: Capture data when user leaves
5. **Automatic Cleanup**: Send emails before deleting expired sessions

### **Email Content**:
- 📋 **Complete Project Details** (all collected information)
- 💬 **Full Conversation Transcript** (every message)
- 📊 **Session Information** (timestamps, duration)
- 🎯 **Lead Status** (progress, booking status)
- 📧 **Contact Information** (for follow-up)

## ⚡ Performance Considerations

### **Background Processing**:
- Emails sent asynchronously (don't block user experience)
- Non-blocking API calls
- Error handling for failed email sends
- Retry logic for network issues

### **Session Management**:
- 30-minute session timeout
- Automatic cleanup every 10 minutes
- Memory-efficient storage
- Session persistence across page reloads

## 📈 Monitoring & Analytics

### **Email Tracking**:
- Success/failure rates
- Delivery confirmation
- Bounce handling
- Spam score monitoring

### **Session Analytics**:
- Active session count
- Average session duration
- Drop-off points
- Data collection completion rates

## 🔧 Configuration

### **Environment Variables**:
```bash
# Email Configuration
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_TO=shahasanepriyanka@gmail.com

# Session Configuration
SESSION_TIMEOUT=30 minutes
CLEANUP_INTERVAL=10 minutes
```

### **Email Templates**:
- HTML and text versions
- Professional formatting
- Mobile-responsive design
- Clear data presentation

## ✅ Success Metrics

### **Data Capture Rate**:
- 100% of meaningful conversations result in email
- No data loss due to user leaving
- Complete information preservation

### **Email Delivery**:
- 99%+ email delivery rate
- Proper categorization in inbox
- Professional presentation

### **Lead Quality**:
- Complete contact information
- Detailed project requirements
- Clear next steps for follow-up

## 🚀 Benefits

1. **Zero Data Loss**: Multiple capture points ensure no information is lost
2. **Real-time Updates**: Progress emails keep you informed immediately
3. **Complete Context**: Full conversation transcripts for better understanding
4. **Professional Follow-up**: All information needed for effective outreach
5. **Scalable System**: Handles multiple concurrent users efficiently

This strategy ensures that **every valuable lead is captured**, regardless of when or how the user leaves the conversation.