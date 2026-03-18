/**
 * VITATRACK - MEAL PLAN MODULE (for Expert)
 */
import api from '../../core/api.js';
import Toast from '../../components/toast.js';

const MealPlan = {
  plans: [],

  async init() {
    await this.loadPlans();
    this.bindEvents();
  },

  async loadPlans() {
    try {
      this.plans = await api.get('/expert/meal-plans');
      this.render();
    } catch {
      Toast.error('Không thể tải thực đơn');
    }
  },

  render() {
    const container = document.getElementById('mealPlanList');
    if (!container) return;
    if (!this.plans.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">Chưa có thực đơn nào</div></div>';
      return;
    }
    container.innerHTML = this.plans.map(plan => `
      <div class="card" style="margin-bottom:12px">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <div style="font-weight:600">${plan.title}</div>
              <div style="font-size:12px;color:var(--text-muted)">${plan.clientName} · ${plan.duration} ngày · ${plan.targetCalories} kcal/ngày</div>
            </div>
            <div class="flex" style="gap:8px">
              <button class="btn btn-secondary btn-sm" onclick="MealPlan.edit(${plan.id})">Sửa</button>
              <button class="btn btn-primary btn-sm" onclick="MealPlan.send(${plan.id})">Gửi</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  async create(data) {
    try {
      await api.post('/expert/meal-plans', data);
      Toast.success('Đã tạo thực đơn!');
      await this.loadPlans();
    } catch {
      Toast.error('Không thể tạo thực đơn');
    }
  },

  async send(id) {
    try {
      await api.post(`/expert/meal-plans/${id}/send`);
      Toast.success('Đã gửi thực đơn cho khách hàng!');
    } catch {
      Toast.error('Gửi thực đơn thất bại');
    }
  },

  edit(id) {
    const plan = this.plans.find(p => p.id === id);
    if (!plan) return;
    // Populate edit modal
    document.getElementById('editPlanId') && (document.getElementById('editPlanId').value = id);
    document.getElementById('editPlanTitle') && (document.getElementById('editPlanTitle').value = plan.title);
    if (window.Modal) Modal.open('editPlanModal');
  },

  bindEvents() {
    document.getElementById('createMealPlanForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        title:          document.getElementById('planTitle')?.value,
        clientId:       document.getElementById('planClientId')?.value,
        duration:       parseInt(document.getElementById('planDuration')?.value),
        targetCalories: parseInt(document.getElementById('planCalories')?.value),
        notes:          document.getElementById('planNotes')?.value
      };
      this.create(data);
    });
  }
};

export default MealPlan;
