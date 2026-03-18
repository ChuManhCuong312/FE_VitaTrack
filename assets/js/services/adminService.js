/**
 * VITATRACK - ADMIN SERVICE
 * API calls cho quản trị viên
 */
import api from '../core/api.js';

const AdminService = {
  /* ====== USERS ====== */
  async getAllUsers(params = {}) {
    return api.get('/admin/users', params);
  },
  async getUserById(id) {
    return api.get(`/admin/users/${id}`);
  },
  async updateUserRole(id, role) {
    return api.patch(`/admin/users/${id}/role`, { role });
  },
  async toggleUserStatus(id) {
    return api.patch(`/admin/users/${id}/toggle-status`);
  },
  async deleteUser(id) {
    return api.delete(`/admin/users/${id}`);
  },

  /* ====== FOODS ====== */
  async getAllFoods(params = {}) {
    return api.get('/admin/foods', params);
  },
  async createFood(data) {
    return api.post('/admin/foods', data);
  },
  async updateFood(id, data) {
    return api.put(`/admin/foods/${id}`, data);
  },
  async deleteFood(id) {
    return api.delete(`/admin/foods/${id}`);
  },

  /* ====== DASHBOARD ====== */
  async getDashboardStats() {
    return api.get('/admin/dashboard');
  },
  async getSystemLogs(params = {}) {
    return api.get('/admin/logs', params);
  },

  /* ====== EXPERT VERIFY ====== */
  async getPendingExperts() {
    return api.get('/admin/experts/pending');
  },
  async verifyExpert(id) {
    return api.patch(`/admin/experts/${id}/verify`);
  },
  async rejectExpert(id, reason) {
    return api.patch(`/admin/experts/${id}/reject`, { reason });
  }
};

export default AdminService;
