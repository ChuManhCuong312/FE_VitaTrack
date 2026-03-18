/**
 * VITATRACK - SIMPLE ROUTER
 * Định tuyến trang và bảo vệ route
 */
import Auth from './auth.js';

const Router = {
  /** Các route cần đăng nhập */
  PROTECTED_ROUTES: [
    '/pages/',
    '/index.html'
  ],

  /** Các route chỉ dành cho guest */
  GUEST_ROUTES: [
    '/login.html',
    '/register.html'
  ],

  /** Các route chỉ dành cho admin */
  ADMIN_ROUTES: ['/pages/admin.html'],

  /** Các route chỉ dành cho expert */
  EXPERT_ROUTES: ['/pages/expert.html'],

  init() {
    const path = window.location.pathname;

    // Kiểm tra route bảo vệ
    const isProtected = this.PROTECTED_ROUTES.some(r => path.includes(r));
    const isGuest     = this.GUEST_ROUTES.some(r => path.endsWith(r));
    const isAdmin     = this.ADMIN_ROUTES.some(r => path.endsWith(r));
    const isExpert    = this.EXPERT_ROUTES.some(r => path.endsWith(r));

    if (isProtected && !Auth.isLoggedIn()) {
      window.location.href = '/login.html';
      return;
    }
    if (isGuest && Auth.isLoggedIn()) {
      window.location.href = Auth.getHomePage();
      return;
    }
    if (isAdmin && !Auth.isAdmin()) {
      window.location.href = Auth.getHomePage();
      return;
    }
    if (isExpert && !Auth.hasRole('expert', 'admin')) {
      window.location.href = Auth.getHomePage();
      return;
    }
  },

  navigate(path) {
    window.location.href = path;
  },

  back() {
    window.history.back();
  }
};

export default Router;
