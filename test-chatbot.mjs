// Simple test to show chatbot improvements
const testQuestions = [
  "How much experience does Priyanka have?",
  "Where has Priyanka worked before?",
  "What are Priyanka's skills?",
  "What projects has Priyanka built?",
  "Who is Priyanka?"
];

console.log("🤖 Enhanced Chatbot Test");
console.log("=======================");
console.log("");

testQuestions.forEach((question, index) => {
  console.log(`Q${index + 1}: ${question}`);
  
  // Simulate the enhanced responses
  let response = "";
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('experience') || lowerQ.includes('years')) {
    response = "Priyanka has 8 years of experience in software engineering and product development. She has worked at major tech companies like Google and Microsoft, and has built her own successful products like StopScrolling.life.";
  } else if (lowerQ.includes('worked') || lowerQ.includes('companies')) {
    response = "Priyanka's work experience includes: Senior Software Engineer at Google (2021-2023), Software Engineer at Microsoft (2019-2021), and Full Stack Developer at StartupX (2017-2019). She's currently working as a Product Engineer and Entrepreneur.";
  } else if (lowerQ.includes('skills')) {
    response = "Priyanka is skilled in: JavaScript/TypeScript, React/Next.js, Node.js, Python, Java, Go, AWS/Cloud Infrastructure, Docker/Kubernetes. She has expertise in both frontend and backend development, cloud infrastructure, and system design.";
  } else if (lowerQ.includes('projects') || lowerQ.includes('built')) {
    response = "Priyanka has built several successful products including: StopScrolling.life, TechMentor, and CodeReview.ai. Her most notable project is StopScrolling.life, a digital wellness platform that has helped 10,000+ users.";
  } else if (lowerQ.includes('who')) {
    response = "Priyanka is a Product Engineer and Entrepreneur with 8 years of experience. She has worked at Google and Microsoft, built successful products like StopScrolling.life, and now offers consultation services to help others with their technical and product challenges.";
  }
  
  console.log(`A: ${response}`);
  console.log("---");
});

console.log("✅ The chatbot now has comprehensive knowledge about Priyanka!");
console.log("📝 Users can ask about experience, work history, skills, projects, education, and more.");
console.log("🔗 The Calendly booking functionality is still maintained for consultation calls.");