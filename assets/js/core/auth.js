/**
 * VITATRACK - AUTH MODULE (Fixed)
 * Xu ly dang nhap, dang xuat, kiem tra quyen
 */
import CONFIG from './config.js';
import Storage from './storage.js';
import api from './api.js';

const Auth = {
  // Lay token hien tai
  getToken() {
    return Storage.get(CONFIG.TOKEN_KEY);
  },

  // Lay thong tin user dang dang nhap
  getUser() {
    try {
      const raw = Storage.get(CONFIG.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Lay role
  getRole() {
    return Storage.get(CONFIG.ROLE_KEY) || '';
  },

  // Kiem tra da dang nhap chua
  isLoggedIn() {
    return !!this.getToken();
  },

  // Kiem tra quyen
  isAdmin()  { return this.getRole() === CONFIG.ROLES.ADMIN; },
  isExpert() { return [CONFIG.ROLES.EXPERT, CONFIG.ROLES.ADMIN].includes(this.getRole()); },
  isUser()   { return this.isLoggedIn(); },

  // Luu thong tin sau khi dang nhap thanh cong
  saveSession(data) {
    Storage.set(CONFIG.TOKEN_KEY,   data.accessToken);
    Storage.set(CONFIG.REFRESH_KEY, data.refreshToken || '');
    Storage.set(CONFIG.ROLE_KEY,    data.role || 'user');
    Storage.set(CONFIG.USER_KEY,    JSON.stringify({
      id:       data.userId,
      email:    data.email,
      fullName: data.fullName,
      role:     data.role,
      avatar:   data.avatarUrl || ''
    }));
  },

  // Xoa session khi dang xuat
  clearSession() {
    const refreshToken = Storage.get(CONFIG.REFRESH_KEY);
    // Goi BE logout (non-blocking)
    if (refreshToken) {
      api.post('/auth/logout', { refreshToken }).catch(() => {});
    }
    Storage.remove(CONFIG.TOKEN_KEY);
    Storage.remove(CONFIG.REFRESH_KEY);
    Storage.remove(CONFIG.ROLE_KEY);
    Storage.remove(CONFIG.USER_KEY);
  },

  // Chuyen huong neu chua dang nhap
  requireAuth(redirectTo = '/login.html') {
    if (!this.isLoggedIn()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  // Chuyen huong neu da dang nhap
  redirectIfLoggedIn(to) {
    if (this.isLoggedIn()) {
      const role = this.getRole();
      const dest = to || (role === 'admin' ? '/pages/admin.html'
                        : role === 'expert' ? '/pages/expert.html'
                        : '/pages/dashboard.html');
      window.location.href = dest;
      return true;
    }
    return false;
  }
};

export default Auth;
