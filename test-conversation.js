// Test script for the conversational chatbot
console.log("🧪 Testing Conversational Chatbot");
console.log("==================================");

const testConversation = [
  "Hey",
  "I want to make a website",
  "So I am daksh CTO, 99755008124, at futureworld, and i want to make my company website",
  "ok I want this website to be done in 50k not more then that",
  "not yet",
  "Yes",
  "no 9:30pm is too late",
  "yes",
  "daksh@gmail.com"
];

const expectedFlow = [
  "Greeting and introduction",
  "Ask for project details and information collection",
  "Ask for budget",
  "Ask about UI/UX requirements",
  "Offer to book consultation",
  "Suggest time slot",
  "Offer alternative time",
  "Ask for email",
  "Thank and confirm"
];

console.log("\nExpected Conversation Flow:");
testConversation.forEach((input, index) => {
  console.log(`${index + 1}. User: "${input}"`);
  console.log(`   Expected: ${expectedFlow[index]}`);
  console.log("");
});

console.log("✅ Test script ready!");
console.log("To test the actual chatbot:");
console.log("1. Start the server: cd server && npm start");
console.log("2. Start the frontend: npm run dev");
console.log("3. Open the chat widget and try the conversation flow");
console.log("4. Check your email for the conversation summary");

console.log("\n🔧 Configuration Checklist:");
console.log("□ DeepSeek API key set in .env");
console.log("□ Gmail credentials configured");
console.log("□ Server running on port 3001");
console.log("□ Frontend running on port 5173");
console.log("□ Chat widget accessible via floating button");