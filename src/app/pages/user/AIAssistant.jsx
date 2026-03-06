import React, { useState, useRef, useEffect } from "react";
import { useAIChat } from "../../hooks/useAIChat";
import { useApp } from "../../context/AppContext";
const SUGGESTIONS = [
  "G\u1EE3i \xFD th\u1EF1c \u0111\u01A1n b\u1EEFa t\u1ED1i \xEDt calo",
  "Th\u1EF1c ph\u1EA9m n\xE0o gi\xE0u protein t\u1ED1t?",
  "T\xF4i n\xEAn \u0103n g\xEC sau khi t\u1EADp gym?",
  "L\u1ECBch \u0103n u\u1ED1ng cho m\u1EE5c ti\xEAu gi\u1EA3m 5kg",
  "Th\u1EF1c \u0111\u01A1n 1500 kcal cho ng\xE0y mai"
];
function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 16 } }, !isUser && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
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
        marginTop: 2
      }
    },
    "AI"
  ), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "75%" } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        background: isUser ? "#22C55E" : "#F9FAFB",
        color: isUser ? "#fff" : "#1F2937",
        borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
        padding: "12px 16px",
        fontSize: 14,
        lineHeight: 1.6,
        border: isUser ? "none" : "1px solid #E5E7EB",
        whiteSpace: "pre-wrap"
      },
      dangerouslySetInnerHTML: {
        __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/•/g, "\u2022")
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#9CA3AF", marginTop: 4, textAlign: isUser ? "right" : "left" } }, formatTime(msg.timestamp))), isUser && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
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
        marginTop: 2
      }
    },
    "U"
  ));
}
function AIAssistant() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const { activeConversation, createConversation, sendMessage, sending, conversations } = useAIChat(userId);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);
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
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };
  const messages = activeConversation?.messages || [];
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937", height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Tr\u1EE3 l\xFD AI"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "H\u1ECFi t\xF4i b\u1EA5t c\u1EE9 \u0111i\u1EC1u g\xEC v\u1EC1 dinh d\u01B0\u1EE1ng, t\u1EADp luy\u1EC7n v\xE0 s\u1EE9c kh\u1ECFe.")), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        flex: 1,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: 24 } }, messages.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 60 } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
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
          marginBottom: 16
        }
      },
      "AI"
    ), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 20, fontWeight: 600, color: "#1F2937", marginBottom: 8 } }, "Ch\xE0o b\u1EA1n! T\xF4i c\xF3 th\u1EC3 gi\xFAp g\xEC?"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280", marginBottom: 24 } }, "H\xE3y th\u1EED m\u1ED9t trong nh\u1EEFng c\xE2u h\u1ECFi d\u01B0\u1EDBi \u0111\xE2y ho\u1EB7c \u0111\u1EB7t c\xE2u h\u1ECFi c\u1EE7a ri\xEAng b\u1EA1n."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 600, margin: "0 auto" } }, SUGGESTIONS.map((s, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: () => handleSuggestionClick(s),
        style: {
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: 20,
          padding: "8px 16px",
          fontSize: 13,
          color: "#374151",
          cursor: "pointer",
          transition: "all 0.2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#22C55E";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "#22C55E";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#F9FAFB";
          e.currentTarget.style.color = "#374151";
          e.currentTarget.style.borderColor = "#E5E7EB";
        }
      },
      s
    )))), messages.map((msg) => /* @__PURE__ */ React.createElement(MessageBubble, { key: msg.id, msg })), sending && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-start", marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
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
          marginRight: 10
        }
      },
      "AI"
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: "#F9FAFB",
          borderRadius: "4px 16px 16px 16px",
          padding: "12px 16px",
          border: "1px solid #E5E7EB"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: i,
          style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#9CA3AF",
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
          }
        }
      )))
    )), /* @__PURE__ */ React.createElement("div", { ref: chatEndRef })),
    /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 24px", borderTop: "1px solid #E5E7EB", background: "#F9FAFB" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyPress: (e) => e.key === "Enter" && handleSend(),
        placeholder: "Nh\u1EADp c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n...",
        disabled: sending,
        style: {
          flex: 1,
          padding: "12px 16px",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          fontSize: 14,
          outline: "none",
          background: "#fff"
        }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleSend,
        disabled: !input.trim() || sending,
        style: {
          background: input.trim() && !sending ? "#22C55E" : "#E5E7EB",
          color: input.trim() && !sending ? "#fff" : "#9CA3AF",
          border: "none",
          borderRadius: 12,
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 600,
          cursor: input.trim() && !sending ? "pointer" : "not-allowed",
          transition: "all 0.2s"
        }
      },
      sending ? "\u0110ang g\u1EEDi..." : "G\u1EEDi"
    )))
  ), /* @__PURE__ */ React.createElement("style", null, `
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `));
}
export {
  AIAssistant as default
};
