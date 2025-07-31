# Email Configuration Fix

## Issue: Gmail Authentication Failed

Your logs show:
```
535-5.7.8 Username and Password not accepted
```

## 🔧 **Solution Steps:**

### **1. Enable 2-Factor Authentication**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. This is required for App Passwords

### **2. Generate App Password**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Generate the app password
4. Copy the 16-character password

### **3. Update .env File**
```env
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_16_character_app_password
MAIL_TO=shahasanepriyanka@gmail.com
```

### **4. Test Email Configuration**
Create a test file `test-email.js`:
```javascript
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: 'Test Email',
      text: 'This is a test email from your chatbot'
    });
    
    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.log('❌ Email failed:', error.message);
  }
}

testEmail();
```

## **Alternative: Disable Email Temporarily**

If you want to test the chatbot without email, you can temporarily disable email notifications by commenting out the email service calls in the chat route.