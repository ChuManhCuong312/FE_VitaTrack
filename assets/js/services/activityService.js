/**
 * VITATRACK - ACTIVITY SERVICE
 * Endpoints map to /activities/*
 */
import api from '../core/api.js';

const ActivityService = {
  // GET /activities/today
  getToday() {
    return api.get('/activities/today');
  },

  // GET /activities?date=YYYY-MM-DD
  getLogs(date) {
    return api.get('/activities', { date });
  },

  // POST /activities (manual entry)
  addManual(dto) {
    return api.post('/activities', dto);
  },

  // DELETE /activities/:id
  deleteLog(id) {
    return api.delete(`/activities/${id}`);
  },

  // POST /activities/sync (Google Fit)
  syncWearable() {
    return api.post('/activities/sync', {});
  },

  // GET /activities/stats?period=7d
  getStats(period = '7d') {
    return api.get('/activities/stats', { period });
  }
};

export default ActivityService;
