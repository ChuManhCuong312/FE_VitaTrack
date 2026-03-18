/**
 * VITATRACK - DASHBOARD MODULE (Rewritten)
 * Su dung Promise.allSettled de khong bi blocked boi bat ky request nao that bai
 */
import HealthService from '../../services/healthService.js';
import MealService from '../../services/mealService.js';
import ActivityService from '../../services/activityService.js';
import DashboardCharts from './charts.js';
import Toast from '../../components/toast.js';

const Dashboard = {
  data: { metrics: {}, diary: [], activities: [] },
  calChart: null,
  weightChart: null,
  macroChart: null,

  async init() {
    this.showSkeleton();
    try {
      const today = new Date().toISOString().split('T')[0];
      const [metricsRes, diaryRes, activitiesRes] = await Promise.allSettled([
        HealthService.getMetrics(),
        MealService.getDiary(today),
        ActivityService.getToday()
      ]);

      this.data.metrics    = metricsRes.status    === 'fulfilled' ? metricsRes.value    : {};
      this.data.diary      = diaryRes.status      === 'fulfilled' ? (Array.isArray(diaryRes.value) ? diaryRes.value : []) : [];
      this.data.activities = activitiesRes.status === 'fulfilled' ? (Array.isArray(activitiesRes.value) ? activitiesRes.value : []) : [];

      this.render();
      await this.loadCalorieChart('7d');
    } catch (err) {
      Toast.error('Khong the tai dashboard. Vui long thu lai.');
      console.error('[Dashboard]', err);
    }
  },

  render() {
    const { metrics = {}, diary = [], activities = [] } = this.data;

    // Tinh tong
    const totalCal    = diary.reduce((s, e) => s + (e.calories || 0), 0);
    const totalProtein= diary.reduce((s, e) => s + (e.protein  || 0), 0);
    const totalCarbs  = diary.reduce((s, e) => s + (e.carbs    || 0), 0);
    const totalFat    = diary.reduce((s, e) => s + (e.fat      || 0), 0);
    const burnedCal   = activities.reduce((s, a) => s + (a.caloriesBurned || a.calories || 0), 0);
    const totalSteps  = activities.reduce((s, a) => s + (a.stepsCount || 0), 0);

    const calorieGoal  = metrics.dailyCalorieGoal || 2000;
    const stepsGoal    = metrics.dailyStepsGoal   || 10000;
    const waterGoal    = metrics.dailyWaterGoal   || 2500;
    const calPercent   = Math.min(Math.round((totalCal / calorieGoal) * 100), 120);
    const burnPercent  = Math.min(Math.round((burnedCal / (calorieGoal * 0.3)) * 100), 100);

    // Stat cards
    this.setText('stat-bmi', metrics.bmi ? metrics.bmi.toFixed(1) : '--');
    this.setText('bmi-status', metrics.bmiCategory || '');
    this.setClass('bmi-status', 'stat-change', metrics.bmi
      ? (metrics.bmi >= 18.5 && metrics.bmi < 25 ? 'positive' : 'warning') : '');

    this.setText('stat-calories', Math.round(totalCal));
    this.setText('cal-goal-text', `/ ${calorieGoal} kcal muc tieu`);

    this.setText('stat-steps', totalSteps.toLocaleString());
    this.setText('steps-goal-text', `/ ${stepsGoal.toLocaleString()} muc tieu`);

    this.setText('stat-water', metrics.waterIntake || 0);
    this.setText('water-goal-text', `/ ${waterGoal} ml muc tieu`);

    // Calorie progress
    this.setText('cal-budget-label', `Con lai: ${Math.max(0, calorieGoal - totalCal)} kcal`);
    this.setText('cal-percent-text', `${calPercent}%`);
    const fill = document.getElementById('calorie-progress');
    if (fill) {
      fill.style.width = calPercent + '%';
      fill.className = 'progress-fill' + (calPercent >= 120 ? ' danger' : calPercent >= 100 ? ' warning' : '');
    }
    this.setText('burned-text', `${Math.round(burnedCal)} kcal`);
    const burnFill = document.getElementById('burned-progress');
    if (burnFill) burnFill.style.width = burnPercent + '%';

    // Macro values
    this.setText('macro-protein', `${Math.round(totalProtein)}g`);
    this.setText('macro-carbs',   `${Math.round(totalCarbs)}g`);
    this.setText('macro-fat',     `${Math.round(totalFat)}g`);

    // Charts
    this.renderMacroChart(totalProtein, totalCarbs, totalFat);
    this.renderWeightChart(metrics.weightHistory || []);

    // Meal list
    this.renderMealList(diary);

    // Timestamp
    this.setText('lastUpdated', 'Cap nhat: ' + new Date().toLocaleTimeString('vi-VN'));
  },

  renderMacroChart(protein, carbs, fat) {
    const ctx = document.getElementById('macroChart');
    if (!ctx) return;
    if (this.macroChart) this.macroChart.destroy();

    const total = protein + carbs + fat;
    const empty = total < 1;

    this.macroChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [{
          data: empty ? [1,1,1] : [protein, carbs, fat],
          backgroundColor: empty
            ? ['#E2E8F0','#E2E8F0','#E2E8F0']
            : ['#3B82F6','#F59E0B','#F87171'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${Math.round(ctx.raw)}g`
            }
          }
        }
      }
    });
  },

  renderWeightChart(history) {
    const ctx = document.getElementById('weightChart');
    if (!ctx) return;
    if (this.weightChart) this.weightChart.destroy();

    const labels = history.map(w => {
      const d = new Date(w.recordedAt);
      return `${d.getDate()}/${d.getMonth()+1}`;
    });
    const data = history.map(w => w.weight);

    this.weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Can nang (kg)',
          data,
          borderColor: '#22C55E',
          backgroundColor: 'rgba(34,197,94,0.08)',
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#22C55E'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  },

  async loadCalorieChart(period = '7d') {
    const ctx = document.getElementById('calorieChart');
    if (!ctx) return;
    if (this.calChart) this.calChart.destroy();

    try {
      const stats = await MealService.getStats(period);
      const labels = (stats.daily || []).map(d => {
        const dt = new Date(d.date);
        return `${dt.getDate()}/${dt.getMonth()+1}`;
      });
      const intake  = (stats.daily || []).map(d => d.calories || 0);
      const goal    = this.data.metrics.dailyCalorieGoal || 2000;

      this.calChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Calo nap',
              data: intake,
              backgroundColor: 'rgba(74,222,128,0.7)',
              borderColor: '#22C55E',
              borderWidth: 1,
              borderRadius: 6,
              maxBarThickness: 28
            },
            {
              label: 'Muc tieu',
              data: labels.map(() => goal),
              type: 'line',
              borderColor: '#94A3B8',
              borderDash: [4, 4],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } } }
          }
        }
      });
    } catch (e) {
      console.warn('[Dashboard] Calorie chart load failed:', e);
    }
  },

  renderMealList(diary) {
    const container = document.getElementById('mealList');
    if (!container) return;

    const ICONS = { breakfast:'☀️', lunch:'🌤️', dinner:'🌙', snack:'🍎' };
    const LABELS = { breakfast:'Bua sang', lunch:'Bua trua', dinner:'Bua toi', snack:'An vat' };

    if (!diary.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🍽️</div>
          <div class="empty-text">Chua co bua an nao hom nay</div>
          <a href="meal-log.html" class="empty-cta">+ Ghi nhat ky an uong</a>
        </div>`;
      return;
    }

    container.innerHTML = diary.slice(0, 6).map(item => `
      <div class="meal-item">
        <div class="meal-icon-wrap">${ICONS[item.mealType] || '🍽️'}</div>
        <div class="meal-info">
          <div class="meal-name">${item.foodName || item.name || 'Mon an'}</div>
          <div class="meal-meta">${LABELS[item.mealType] || ''} · ${item.quantity || 0}g</div>
        </div>
        <div class="meal-cal">${Math.round(item.calories || 0)} kcal</div>
      </div>
    `).join('');
  },

  showSkeleton() {
    document.querySelectorAll('.stat-value').forEach(el => el.classList.add('skeleton'));
    setTimeout(() => {
      document.querySelectorAll('.stat-value').forEach(el => el.classList.remove('skeleton'));
    }, 800);
  },

  setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  },

  setClass(id, base, extra) {
    const el = document.getElementById(id);
    if (el) el.className = base + (extra ? ' ' + extra : '');
  }
};

export default Dashboard;
