// Custom Hook for AI Chat Management
import { useState, useEffect, useCallback } from "react";
import { aiService, conversationAPI, AIConversation, AIMessage } from "../services/ai";

export function useAIChat(userId: string) {
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<AIConversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationAPI.getAll(userId);
      setConversations(data);
      
      // Set active to most recent if none selected
      if (!activeConversation && data.length > 0) {
        setActiveConversation(data[0]);
      }
    } catch (err) {
      setError("Không thể tải cuộc trò chuyện");
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

  // Create new conversation
  const createConversation = async () => {
    try {
      const newConv = await conversationAPI.create(userId);
      setConversations(prev => [newConv, ...prev]);
      setActiveConversation(newConv);
      return newConv;
    } catch (err) {
      setError("Không thể tạo cuộc trò chuyện mới");
      throw err;
    }
  };

  // Send message
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    try {
      setSending(true);
      setError(null);

      // Create conversation if none exists
      let conversation = activeConversation;
      if (!conversation) {
        conversation = await createConversation();
      }

      // Add user message
      const userMessage: Omit<AIMessage, "id" | "timestamp"> = {
        role: "user",
        content: message,
      };
      
      const updatedConv = await conversationAPI.addMessage(conversation.id, userMessage);
      
      // Get AI response
      const aiResponse = await aiService.chat(message, conversation.id);
      
      // Add AI response
      const finalConv = await conversationAPI.addMessage(conversation.id, {
        role: aiResponse.role,
        content: aiResponse.content,
      });
      
      // Update state
      setActiveConversation(finalConv);
      setConversations(prev => 
        prev.map(c => c.id === finalConv.id ? finalConv : c)
      );
      
      return aiResponse;
    } catch (err) {
      setError("Không thể gửi tin nhắn");
      throw err;
    } finally {
      setSending(false);
    }
  };

  // Select conversation
  const selectConversation = async (conversationId: string) => {
    try {
      const conv = await conversationAPI.get(conversationId);
      setActiveConversation(conv);
    } catch (err) {
      setError("Không thể tải cuộc trò chuyện");
      throw err;
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId: string) => {
    try {
      await conversationAPI.delete(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      
      if (activeConversation?.id === conversationId) {
        setActiveConversation(null);
      }
    } catch (err) {
      setError("Không thể xóa cuộc trò chuyện");
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
    refresh: loadConversations,
  };
}
