/**
 * VITATRACK - USER SERVICE
 * API calls liên quan đến người dùng
 */
import api from '../core/api.js';

const UserService = {
  /** Đăng nhập - POST /auth/login */
  async login(email, password) {
    return api.post('/auth/login', { email, password });
  },

  /** Đăng ký - POST /auth/register */
  async register(data) {
    return api.post('/auth/register', data);
  },

  /** Lấy thông tin profile - GET /users/me */
  async getProfile() {
    return api.get('/users/me');
  },

  /** Cập nhật profile - PUT /users/me */
  async updateProfile(data) {
    return api.put('/users/me', data);
  },

  /** Đổi mật khẩu - POST /users/me/password */
  async changePassword(oldPassword, newPassword) {
    return api.post('/users/me/password', { oldPassword, newPassword });
  },

  /** Upload avatar - POST /users/me/avatar */
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.upload('/users/me/avatar', formData);
  },

  /** Quên mật khẩu - POST /auth/forgot-password */
  async forgotPassword(email) {
    return api.post('/auth/forgot-password', { email });
  },

  /** Reset mật khẩu - POST /auth/reset-password */
  async resetPassword(token, newPassword) {
    return api.post('/auth/reset-password', { token, newPassword });
  }
};

export default UserService;
