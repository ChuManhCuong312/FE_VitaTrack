import { useState, useEffect, useCallback } from "react";
import { aiService, conversationAPI } from "../services/ai";
function useAIChat(userId) {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const loadConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationAPI.getAll(userId);
      setConversations(data);
      if (!activeConversation && data.length > 0) {
        setActiveConversation(data[0]);
      }
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 t\u1EA3i cu\u1ED9c tr\xF2 chuy\u1EC7n");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, activeConversation]);
  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId, loadConversations]);
  const createConversation = async () => {
    try {
      const newConv = await conversationAPI.create(userId);
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversation(newConv);
      return newConv;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 t\u1EA1o cu\u1ED9c tr\xF2 chuy\u1EC7n m\u1EDBi");
      throw err;
    }
  };
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    try {
      setSending(true);
      setError(null);
      let conversation = activeConversation;
      if (!conversation) {
        conversation = await createConversation();
      }
      const userMessage = {
        role: "user",
        content: message
      };
      const updatedConv = await conversationAPI.addMessage(conversation.id, userMessage);
      const aiResponse = await aiService.chat(message, conversation.id);
      const finalConv = await conversationAPI.addMessage(conversation.id, {
        role: aiResponse.role,
        content: aiResponse.content
      });
      setActiveConversation(finalConv);
      setConversations(
        (prev) => prev.map((c) => c.id === finalConv.id ? finalConv : c)
      );
      return aiResponse;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 g\u1EEDi tin nh\u1EAFn");
      throw err;
    } finally {
      setSending(false);
    }
  };
  const selectConversation = async (conversationId) => {
    try {
      const conv = await conversationAPI.get(conversationId);
      setActiveConversation(conv);
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 t\u1EA3i cu\u1ED9c tr\xF2 chuy\u1EC7n");
      throw err;
    }
  };
  const deleteConversation = async (conversationId) => {
    try {
      await conversationAPI.delete(conversationId);
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (activeConversation?.id === conversationId) {
        setActiveConversation(null);
      }
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 x\xF3a cu\u1ED9c tr\xF2 chuy\u1EC7n");
      throw err;
    }
  };
  return {
    conversations,
    activeConversation,
    loading,
    sending,
    error,
    createConversation,
    sendMessage,
    selectConversation,
    deleteConversation,
    refresh: loadConversations
  };
}
export {
  useAIChat
};
