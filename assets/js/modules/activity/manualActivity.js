/**
 * VITATRACK - MANUAL ACTIVITY MODULE
 */
import ActivityService from '../../services/activityService.js';
import CalorieUtils from '@utils/calorieUtils.js';
import Toast from '../../components/toast.js';
import Modal from '../../components/modal.js';

const ManualActivity = {
  activities: [],

  async init() {
    await this.loadActivities();
    this.bindEvents();
  },

  async loadActivities() {
    try {
      this.activities = await ActivityService.getToday();
      this.render();
    } catch {
      Toast.error('Không thể tải hoạt động hôm nay');
    }
  },

  render() {
    const container = document.getElementById('activityList');
    if (!container) return;
    if (!this.activities.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">🏃</div><div class="empty-text">Chưa có hoạt động nào hôm nay</div></div>';
      return;
    }
    container.innerHTML = this.activities.map(act => `
      <div class="activity-item">
        <div class="activity-icon">${act.emoji || '💪'}</div>
        <div class="activity-info">
          <div class="activity-name">${act.name}</div>
          <div class="activity-meta">${act.duration} phút · ${act.distance || 0} km</div>
        </div>
        <div class="activity-cal">${act.calories} kcal</div>
        <button class="btn btn-ghost btn-icon btn-sm" onclick="ManualActivity.delete(${act.id})" title="Xóa">✕</button>
      </div>
    `).join('');
  },

  async add(data) {
    try {
      await ActivityService.addActivity(data);
      Toast.success('Đã thêm hoạt động!');
      Modal.closeAll();
      await this.loadActivities();
    } catch {
      Toast.error('Không thể thêm hoạt động');
    }
  },

  async delete(id) {
    Modal.confirm({
      title: 'Xóa hoạt động',
      message: 'Bạn có chắc muốn xóa hoạt động này?',
      confirmText: 'Xóa',
      onConfirm: async () => {
        try {
          await ActivityService.deleteActivity(id);
          this.activities = this.activities.filter(a => a.id !== id);
          this.render();
          Toast.success('Đã xóa hoạt động');
        } catch {
          Toast.error('Không thể xóa hoạt động');
        }
      }
    });
  },

  bindEvents() {
    document.getElementById('addActivityForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        type:     document.getElementById('actType')?.value,
        duration: parseInt(document.getElementById('actDuration')?.value),
        distance: parseFloat(document.getElementById('actDistance')?.value || 0),
        notes:    document.getElementById('actNotes')?.value,
        date:     new Date().toISOString().split('T')[0]
      };
      const weight = 65;
      const met = CalorieUtils.MET_VALUES[data.type] || 5;
      data.calories = CalorieUtils.calcBurned(met, weight, data.duration);
      this.add(data);
    });
  }
};

window.ManualActivity = ManualActivity;
export default ManualActivity;
