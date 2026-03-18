/**
 * VITATRACK - DASHBOARD CHARTS
 */
import ChartHelper from '../../components/chart.js';
import DateUtils from '@utils/dateUtils.js';

const DashboardCharts = {
  charts: {},

  init(data = {}) {
    this.renderWeightChart(data.weightHistory || []);
    this.renderCalorieChart(data.calorieHistory || []);
    this.renderMacroChart(data.macros || {});
    this.renderActivityChart(data.activityHistory || []);
  },

  renderWeightChart(history) {
    const labels = DateUtils.last7Days().map(d => {
      const parts = d.split('-');
      return `${parts[2]}/${parts[1]}`;
    });
    const weights = DateUtils.last7Days().map(day => {
      const found = history.find(h => h.date === day);
      return found ? found.weight : null;
    });

    this.charts.weight = ChartHelper.createLineChart('weightChart', labels, [{
      label: 'Cân nặng (kg)',
      data: weights,
      borderColor: ChartHelper.COLORS.primary,
      backgroundColor: ChartHelper.COLORS.primaryLight
    }]);
  },

  renderCalorieChart(history) {
    const labels = DateUtils.last7Days().map(d => {
      const parts = d.split('-');
      return `${parts[2]}/${parts[1]}`;
    });
    const calories = DateUtils.last7Days().map(day => {
      const found = history.find(h => h.date === day);
      return found ? found.calories : 0;
    });

    this.charts.calorie = ChartHelper.createBarChart('calorieChart', labels, [{
      label: 'Calo (kcal)',
      data: calories,
      backgroundColor: ChartHelper.COLORS.primary
    }]);
  },

  renderMacroChart(macros) {
    const { protein = 0, carbs = 0, fat = 0 } = macros;
    this.charts.macro = ChartHelper.createDoughnutChart(
      'macroChart',
      ['Protein', 'Carbs', 'Chất béo'],
      [protein, carbs, fat],
      [ChartHelper.COLORS.primary, ChartHelper.COLORS.expert, ChartHelper.COLORS.admin]
    );
  },

  renderActivityChart(history) {
    const labels = DateUtils.last7Days().map(d => {
      const parts = d.split('-');
      return `${parts[2]}/${parts[1]}`;
    });
    const steps = DateUtils.last7Days().map(day => {
      const found = history.find(h => h.date === day);
      return found ? found.steps : 0;
    });

    this.charts.activity = ChartHelper.createBarChart('activityChart', labels, [{
      label: 'Bước chân',
      data: steps,
      backgroundColor: ChartHelper.COLORS.expert
    }]);
  },

  destroy() {
    Object.values(this.charts).forEach(c => c?.destroy());
    this.charts = {};
  }
};

export default DashboardCharts;
