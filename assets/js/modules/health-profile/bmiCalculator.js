/**
 * VITATRACK - BMI CALCULATOR MODULE
 */
import HealthService from '../../services/healthService.js';

const BmiCalculator = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    ['weight','height'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calculate());
    });
  },

  calculate() {
    const weight = parseFloat(document.getElementById('weight')?.value);
    const height = parseFloat(document.getElementById('height')?.value);
    if (!weight || !height) return;

    const bmi = HealthService.calculateBMI(weight, height);
    const cat = this.getCategory(bmi);

    const el = document.getElementById('bmiResult');
    if (el) {
      el.textContent = bmi;
      el.style.color = cat.color;
    }
    const catEl = document.getElementById('bmiCategory');
    if (catEl) { catEl.textContent = cat.label; catEl.style.color = cat.color; }

    const pointer = document.getElementById('bmiPointer');
    if (pointer) pointer.style.left = `${Math.min((bmi / 40) * 100, 100)}%`;

    this.updateIdealWeight(height);
  },

  getCategory(bmi) {
    if (bmi < 18.5) return { label:'Thiếu cân',   color:'#3B82F6' };
    if (bmi < 25)   return { label:'Bình thường',  color:'#22C55E' };
    if (bmi < 30)   return { label:'Thừa cân',     color:'#F59E0B' };
    return              { label:'Béo phì',      color:'#EF4444' };
  },

  updateIdealWeight(height) {
    const h = height / 100;
    const min = (18.5 * h * h).toFixed(1);
    const max = (24.9 * h * h).toFixed(1);
    const el = document.getElementById('idealWeight');
    if (el) el.textContent = `${min} - ${max} kg`;
  }
};

export default BmiCalculator;
