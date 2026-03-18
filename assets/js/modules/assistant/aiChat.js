/**
 * VITATRACK - AI CHAT MODULE
 */
import AiService from '../../services/aiService.js';
import DateUtils from '@utils/dateUtils.js';
import Toast from '../../components/toast.js';

const AiChat = {
  conversationId: null,
  messages: [],

  init() {
    this.bindEvents();
    this.showWelcome();
  },

  showWelcome() {
    this.addMessage('ai', 'Xin chào! Tôi là trợ lý AI của VitaTrack 💚 Tôi có thể giúp bạn về dinh dưỡng, lịch tập luyện, và các mục tiêu sức khỏe. Bạn cần giúp gì hôm nay?');
  },

  addMessage(role, text) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const initials = role === 'ai' ? '🤖' : '👤';
    const div = document.createElement('div');
    div.className = `chat-message ${role} fade-in`;
    div.innerHTML = `
      <div class="msg-avatar ${role}">${initials}</div>
      <div>
        <div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div>
        <div class="msg-time">${DateUtils.format(new Date(),'HH:mm')}</div>
      </div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    this.messages.push({ role, text, time: new Date() });
  },

  showTyping() {
    const container = document.getElementById('chatMessages');
    const dots = document.createElement('div');
    dots.id = 'typingIndicator';
    dots.className = 'chat-message ai';
    dots.innerHTML = `
      <div class="msg-avatar ai">🤖</div>
      <div class="msg-bubble">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    container.appendChild(dots);
    container.scrollTop = container.scrollHeight;
  },

  hideTyping() {
    document.getElementById('typingIndicator')?.remove();
  },

  async send(message) {
    if (!message.trim()) return;
    this.addMessage('user', message);
    this.showTyping();

    const input = document.getElementById('chatInput');
    if (input) { input.value = ''; input.style.height = 'auto'; }

    try {
      const response = await AiService.sendMessage(message, this.conversationId);
      this.conversationId = response.conversationId;
      this.hideTyping();
      this.addMessage('ai', response.reply || response.message);
    } catch {
      this.hideTyping();
      this.addMessage('ai', 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau!');
    }
  },

  bindEvents() {
    const input  = document.getElementById('chatInput');
    const sendBtn= document.getElementById('sendBtn');

    sendBtn?.addEventListener('click', () => this.send(input?.value || ''));
    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(input.value); }
    });
    input?.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    document.querySelectorAll('.ai-suggestion').forEach(btn => {
      btn.addEventListener('click', () => this.send(btn.textContent.trim()));
    });
  }
};

export default AiChat;
