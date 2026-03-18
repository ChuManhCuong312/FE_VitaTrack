/**
 * VITATRACK - HEALTH SERVICE
 * Endpoints map to /health/* (Spring Boot context: /api)
 */
import api from '../core/api.js';

const HealthService = {
  // GET /health/metrics
  getMetrics() {
    return api.get('/health/metrics');
  },

  // POST /health/metrics
  saveMetrics(data) {
    return api.post('/health/metrics', data);
  },

  // GET /health/metrics/history?period=30d
  getHistory(period = '30d') {
    return api.get('/health/metrics/history', { period });
  },

  // GET /health/goals
  getGoals() {
    return api.get('/health/goals');
  },

  // PUT /health/goals
  updateGoals(goals) {
    return api.put('/health/goals', goals);
  }
};

export default HealthService;
