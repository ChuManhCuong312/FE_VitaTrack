/**
 * VITATRACK - AI SERVICE
 * API calls cho AI assistant và nhận diện món ăn
 */
import api from '../core/api.js';

const AiService = {
  /** Gửi tin nhắn chat - POST /ai/chat */
  async sendMessage(message, conversationId = null) {
    return api.post('/ai/chat', { message, conversationId });
  },

  /** Lấy lịch sử chat - GET /ai/chat/history */
  async getChatHistory(conversationId) {
    return api.get('/ai/chat/history', { conversationId });
  },

  /** Tạo gợi ý thực đơn - POST /ai/meal-plan */
  async generateMealPlan(preferences) {
    return api.post('/ai/meal-plan', preferences);
  },

  /** Phân tích ảnh thực phẩm - POST /ai/food-analyze */
  async analyzeFoodImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.upload('/ai/food-analyze', formData);
  },

  /** Lấy gợi ý hàng ngày - GET /ai/suggestions */
  async getDailySuggestions() {
    return api.get('/ai/suggestions');
  },

  /** Lấy danh sách hội thoại - GET /ai/conversations */
  async getConversations() {
    return api.get('/ai/conversations');
  },

  /** Xóa hội thoại - DELETE /ai/conversations/:id */
  async deleteConversation(id) {
    return api.delete(`/ai/conversations/${id}`);
  }
};

export default AiService;
