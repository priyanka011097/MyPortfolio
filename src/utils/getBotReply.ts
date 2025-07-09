export const getBotReply = async (userMessage: string): Promise<string> => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // ✅ updated model name
      messages: [
        {
          role: "system",
          content: `give them this link: https://calendly.com/shahasanepriyanka/30min`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();0
    console.error("Groq API Error:", errorText);
    return "⚠️ I’m currently offline. You can still book a meeting here: https://calendly.com/shahasanepriyanka/30min";
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "No reply.";
};
