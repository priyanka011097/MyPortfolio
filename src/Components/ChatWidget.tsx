import { useState } from "react";
import { getBotReply } from "../utils/getBotReply";

export default function ChatWidget() {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const reply = await getBotReply(input);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white rounded-xl shadow-xl p-3 border">
      <h4 className="font-bold text-sm mb-1">👋 Talk to Priyanka’s Agent</h4>
      <div className="h-48 overflow-y-auto border p-2 rounded bg-gray-50 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <p className={`inline-block px-2 py-1 rounded ${msg.from === "user" ? "bg-blue-200" : "bg-green-100"}`}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 border px-2 py-1 rounded text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me something..."
        />
      </div>
    </div>
  );
}
