import React, { useState, useRef, useEffect } from "react";
import { useAIChat } from "../../hooks/useAIChat";
import { useApp } from "../../context/AppContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTIONS = [
  "Gợi ý thực đơn bữa tối ít calo",
  "Thực phẩm nào giàu protein tốt?",
  "Tôi nên ăn gì sau khi tập gym?",
  "Lịch ăn uống cho mục tiêu giảm 5kg",
  "Thực đơn 1500 kcal cho ngày mai",
];

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 16 }}>
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#DCFCE7",
            color: "#16A34A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
            marginRight: 10,
            marginTop: 2,
          }}
        >
          AI
        </div>
      )}
      <div style={{ maxWidth: "75%" }}>
        <div
          style={{
            background: isUser ? "#22C55E" : "#F9FAFB",
            color: isUser ? "#fff" : "#1F2937",
            borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
            padding: "12px 16px",
            fontSize: 14,
            lineHeight: 1.6,
            border: isUser ? "none" : "1px solid #E5E7EB",
            whiteSpace: "pre-wrap",
          }}
          dangerouslySetInnerHTML={{
            __html: msg.content
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/•/g, "•"),
          }}
        />
        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, textAlign: isUser ? "right" : "left" }}>
          {formatTime(msg.timestamp)}
        </div>
      </div>
      {isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#DBEAFE",
            color: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
            marginLeft: 10,
            marginTop: 2,
          }}
        >
          U
        </div>
      )}
    </div>
  );
}

export default function AIAssistant() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const { activeConversation, createConversation, sendMessage, sending, conversations } = useAIChat(userId);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, [conversations.length, createConversation]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    
    const message = input.trim();
    setInput("");
    
    try {
      await sendMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const messages = activeConversation?.messages || [];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937", height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Trợ lý AI</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>
          Hỏi tôi bất cứ điều gì về dinh dưỡng, tập luyện và sức khỏe.
        </p>
      </div>

      {/* Chat container */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Messages area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                AI
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#1F2937", marginBottom: 8 }}>
                Chào bạn! Tôi có thể giúp gì?
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
                Hãy thử một trong những câu hỏi dưới đây hoặc đặt câu hỏi của riêng bạn.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    style={{
                      background: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: 20,
                      padding: "8px 16px",
                      fontSize: 13,
                      color: "#374151",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#22C55E";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "#22C55E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F9FAFB";
                      e.currentTarget.style.color = "#374151";
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {sending && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginRight: 10,
                }}
              >
                AI
              </div>
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: "4px 16px 16px 16px",
                  padding: "12px 16px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#9CA3AF",
                        animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #E5E7EB", background: "#F9FAFB" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={sending}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                fontSize: 14,
                outline: "none",
                background: "#fff",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              style={{
                background: input.trim() && !sending ? "#22C55E" : "#E5E7EB",
                color: input.trim() && !sending ? "#fff" : "#9CA3AF",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: input.trim() && !sending ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              {sending ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}