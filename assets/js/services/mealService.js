/**
 * VITATRACK - MEAL SERVICE
 * Endpoints map to /meals/* and /foods/*
 */
import api from '../core/api.js';

const MealService = {
  // GET /foods/search?q=...&page=0&size=20
  searchFood(q, page = 0, size = 20) {
    return api.get('/foods/search', { q, page, size });
  },

  // GET /foods/:id
  getFoodDetail(id) {
    return api.get(`/foods/${id}`);
  },

  // GET /meals/diary?date=YYYY-MM-DD
  getDiary(date) {
    return api.get('/meals/diary', { date });
  },

  // POST /meals/diary
  addEntry(dto) {
    return api.post('/meals/diary', dto);
  },

  // DELETE /meals/diary/:id
  deleteEntry(id) {
    return api.delete(`/meals/diary/${id}`);
  },

  // GET /meals/stats?period=7d
  getStats(period = '7d') {
    return api.get('/meals/stats', { period });
  },

  // GET /health/goals – de lay thong tin di ung
  getHealthProfile() {
    return api.get('/health/metrics');
  }
};

export default MealService;
