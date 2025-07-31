import { useState, useRef, useEffect } from "react";
import { getBotReply } from "../utils/getBotReply";

interface Message {
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  onClose: () => void;
}

export default function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send final email when user leaves
  const sendFinalEmail = async () => {
    if (sessionId.current && messages.length > 1) {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        await fetch(`${API_BASE_URL}/api/chat/end-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionId.current })
        });
      } catch (error) {
        console.error('Failed to send final email:', error);
      }
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendFinalEmail();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendFinalEmail();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sendFinalEmail(); // Send email when component unmounts
    };
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    console.log('💬 User sent message:', userMessage);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage, timestamp: new Date() },
    ]);

    setIsTyping(true);

    try {
      console.log('🔄 Getting bot reply...');
      const response = await getBotReply(userMessage);
      console.log('🤖 Bot reply received:', response);

      // Store session ID from response
      if (response.sessionId) {
        sessionId.current = response.sessionId;
      }

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: response.reply, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("❌ Error getting bot reply:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Sorry, I'm having trouble connecting right now. Error: ${errorMessage}. You can still book a meeting directly at: https://calendly.com/shahasanepriyanka/30min`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "120px",
        right: "50px",
        width: "350px",
        height: "500px",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        borderRadius: "20px",
        border: "2px solid rgba(0, 247, 255, 0.3)",
        boxShadow: "0 10px 40px rgba(0, 247, 255, 0.2)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px 20px",
          borderBottom: "1px solid rgba(0, 247, 255, 0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgb(255, 255, 255), rgb(0, 247, 255))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          ></div>
          <div>
            <h4
              style={{
                color: "#fff",
                margin: 0,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Priyanka's AI Assistant
            </h4>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              Online • Ready to help
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={async () => {
              console.log('🧪 Testing API connection...');
              try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
                const response = await fetch(`${API_BASE_URL}/api/health`);
                if (response.ok) {
                  console.log('✅ API connection working');
                  alert('✅ API connection is working!');
                } else {
                  console.log('❌ API connection failed');
                  alert('❌ API connection failed');
                }
              } catch (error) {
                console.error('❌ API test failed:', error);
                alert('❌ API test failed: ' + error);
              }
            }}
            style={{
              background: "rgba(0, 247, 255, 0.2)",
              border: "1px solid rgba(0, 247, 255, 0.3)",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Test
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {messages.length === 0 && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100%",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "14px",
            textAlign: "center"
          }}>
            Start a conversation with Priyanka's AI assistant...
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor:
                  msg.from === "user"
                    ? "rgba(0, 247, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "14px",
                lineHeight: "1.4",
                border:
                  msg.from === "user"
                    ? "1px solid rgba(0, 247, 255, 0.3)"
                    : "none",
                wordBreak: "break-all",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                overflowX: "hidden",
                maxWidth: "85%",
              }}
            >
              {msg.text}
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.5)",
                marginTop: "4px",
                marginLeft: msg.from === "user" ? "0" : "12px",
                marginRight: msg.from === "user" ? "12px" : "0",
              }}
            >
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgb(255, 255, 255), rgb(0, 247, 255))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            ></div>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 247, 255, 0.8)",
                    animation: `typing 1.4s infinite ease-in-out ${delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(0, 247, 255, 0.2)",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "25px",
              border: "1px solid rgba(0, 247, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              padding: "12px 16px",
              borderRadius: "50%",
              border: "none",
              background: input.trim()
                ? "radial-gradient(circle, rgb(255, 255, 255), rgb(0, 247, 255))"
                : "rgba(255, 255, 255, 0.2)",
              color: "#000",
              cursor: input.trim() ? "pointer" : "not-allowed",
              fontSize: "16px",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ➤
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
