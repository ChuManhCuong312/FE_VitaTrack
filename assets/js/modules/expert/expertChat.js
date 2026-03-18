/**
 * VITATRACK - EXPERT CHAT MODULE
 */
import api from '../../core/api.js';
import Toast from '../../components/toast.js';
import DateUtils from '@utils/dateUtils.js';

const ExpertChat = {
  activeClientId: null,

  init() {
    this.loadClients();
    this.bindEvents();
  },

  async loadClients() {
    try {
      const clients = await api.get('/expert/clients');
      this.renderClientList(clients);
    } catch {
      Toast.error('Không thể tải danh sách khách hàng');
    }
  },

  renderClientList(clients = []) {
    const container = document.getElementById('clientList');
    if (!container) return;
    container.innerHTML = clients.map(c => `
      <div class="nav-item ${c.id === this.activeClientId ? 'active' : ''}"
           onclick="ExpertChat.selectClient(${c.id})" style="cursor:pointer">
        <div class="sidebar-avatar" style="background:var(--color-expert)">${c.initials || c.fullName?.[0] || '?'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:500">${c.fullName}</div>
          <div style="font-size:11px;color:var(--text-muted)">${c.lastMessage || 'Chưa có tin nhắn'}</div>
        </div>
        ${c.unread ? `<span class="badge badge-blue">${c.unread}</span>` : ''}
      </div>
    `).join('');
  },

  selectClient(id) {
    this.activeClientId = id;
    this.loadChat(id);
  },

  async loadChat(clientId) {
    try {
      const history = await api.get(`/expert/chat/${clientId}`);
      this.renderChat(history);
    } catch {
      Toast.error('Không thể tải lịch sử chat');
    }
  },

  renderChat(messages = []) {
    const container = document.getElementById('expertChatMessages');
    if (!container) return;
    container.innerHTML = messages.map(m => `
      <div class="chat-message ${m.role === 'expert' ? 'user' : 'ai'}">
        <div class="msg-avatar ${m.role === 'expert' ? 'user' : 'ai'}">${m.role === 'expert' ? '👨‍⚕️' : '👤'}</div>
        <div>
          <div class="msg-bubble">${m.content}</div>
          <div class="msg-time">${DateUtils.timeAgo(m.createdAt)}</div>
        </div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  },

  async sendMessage(text) {
    if (!text.trim() || !this.activeClientId) return;
    try {
      await api.post(`/expert/chat/${this.activeClientId}`, { content: text });
      this.loadChat(this.activeClientId);
    } catch {
      Toast.error('Gửi tin nhắn thất bại');
    }
  },

  bindEvents() {
    const input = document.getElementById('expertChatInput');
    const btn   = document.getElementById('expertSendBtn');
    btn?.addEventListener('click', () => { this.sendMessage(input?.value || ''); if(input) input.value=''; });
    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(input.value); input.value=''; }
    });
  }
};

window.ExpertChat = ExpertChat;
export default ExpertChat;
