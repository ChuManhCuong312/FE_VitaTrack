/**
 * VITATRACK - PROFILE MODULE
 */
import UserService from '../../services/userService.js';
import HealthService from '../../services/healthService.js';
import BmiCalculator from './bmiCalculator.js';
import Toast from '../../components/toast.js';
import Validator from '@utils/validator.js';

const ProfileModule = {
  user: null,
  metrics: null,

  async init() {
    BmiCalculator.init();
    await this.loadData();
    this.bindEvents();
  },

  async loadData() {
    try {
      const [user, metrics] = await Promise.all([
        UserService.getProfile(),
        HealthService.getMetrics()
      ]);
      this.user    = user;
      this.metrics = metrics;
      this.populateForm();
    } catch (err) {
      Toast.error('Không thể tải thông tin hồ sơ');
    }
  },

  populateForm() {
    if (!this.user) return;
    const fields = ['fullName','email','phone','dateOfBirth','gender','weight','height','age','activityLevel'];
    fields.forEach(f => {
      const el = document.getElementById(f);
      const val = this.user[f] || this.metrics?.[f];
      if (el && val !== undefined) el.value = val;
    });

    const initials = this.user.fullName
      ? this.user.fullName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
      : 'VT';
    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) avatarEl.textContent = initials;
  },

  bindEvents() {
    document.getElementById('profileForm')?.addEventListener('submit', e => {
      e.preventDefault();
      this.saveProfile();
    });

    document.getElementById('metricsForm')?.addEventListener('submit', e => {
      e.preventDefault();
      this.saveMetrics();
    });

    document.querySelectorAll('.goal-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  },

  async saveProfile() {
    const data = {
      fullName: document.getElementById('fullName')?.value.trim(),
      phone:    document.getElementById('phone')?.value.trim(),
      dateOfBirth: document.getElementById('dateOfBirth')?.value,
      gender:   document.getElementById('gender')?.value
    };

    const btn = document.getElementById('saveProfileBtn');
    btn.classList.add('loading'); btn.disabled = true;
    try {
      await UserService.updateProfile(data);
      Toast.success('Đã cập nhật hồ sơ!');
    } catch {
      Toast.error('Không thể cập nhật hồ sơ');
    } finally {
      btn.classList.remove('loading'); btn.disabled = false;
    }
  },

  async saveMetrics() {
    const data = {
      weight: parseFloat(document.getElementById('weight')?.value),
      height: parseFloat(document.getElementById('height')?.value),
      date:   new Date().toISOString().split('T')[0]
    };

    const btn = document.getElementById('saveMetricsBtn');
    btn.classList.add('loading'); btn.disabled = true;
    try {
      await HealthService.saveMetrics(data);
      Toast.success('Đã lưu chỉ số sức khỏe!');
    } catch {
      Toast.error('Không thể lưu chỉ số');
    } finally {
      btn.classList.remove('loading'); btn.disabled = false;
    }
  }
};

export default ProfileModule;
