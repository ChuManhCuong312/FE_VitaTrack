/**
 * VITATRACK - REGISTER MODULE
 */
import UserService from '../../services/userService.js';
import Auth from '../../core/auth.js';
import Validator from '@utils/validator.js';
import Toast from '../../components/toast.js';

const RegisterModule = {
  currentStep: 1,
  totalSteps: 3,
  formData: {},

  init() {
    Auth.requireGuest();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('nextStep1')?.addEventListener('click',  () => this.nextStep(1));
    document.getElementById('nextStep2')?.addEventListener('click',  () => this.nextStep(2));
    document.getElementById('prevStep2')?.addEventListener('click',  () => this.prevStep(2));
    document.getElementById('prevStep3')?.addEventListener('click',  () => this.prevStep(3));
    document.getElementById('registerForm')?.addEventListener('submit', e => {
      e.preventDefault();
      this.handleRegister();
    });
  },

  nextStep(step) {
    if (!this.validateStep(step)) return;
    this.collectStep(step);
    this.goToStep(step + 1);
  },

  prevStep(step) {
    this.goToStep(step - 1);
  },

  goToStep(step) {
    document.querySelectorAll('.step-panel').forEach((panel, i) => {
      panel.classList.toggle('active', i + 1 === step);
    });
    document.querySelectorAll('.step-num').forEach((num, i) => {
      num.classList.toggle('active', i + 1 === step);
      num.classList.toggle('done',   i + 1 < step);
      num.textContent = i + 1 < step ? '✓' : i + 1;
    });
    document.querySelectorAll('.step-connector').forEach((c, i) => {
      c.classList.toggle('done', i + 1 < step);
    });
    document.querySelectorAll('.step-label').forEach((l, i) => {
      l.classList.toggle('active', i + 1 === step);
    });
    this.currentStep = step;
  },

  validateStep(step) {
    Validator.clearAllErrors('registerForm');
    if (step === 1) {
      const { valid, errors } = Validator.validateForm({
        fullName: document.getElementById('fullName')?.value.trim(),
        email:    document.getElementById('email')?.value.trim(),
        password: document.getElementById('password')?.value,
        confirm:  document.getElementById('confirmPassword')?.value
      }, {
        fullName: [v => Validator.required(v, 'Họ tên'), v => Validator.minLength(v, 2, 'Họ tên')],
        email:    [v => Validator.required(v, 'Email'), v => Validator.email(v)],
        password: [v => Validator.required(v, 'Mật khẩu'), v => Validator.password(v)],
        confirm:  [v => Validator.confirmPassword(document.getElementById('password')?.value, v)]
      });
      if (!valid) {
        Object.entries(errors).forEach(([f, m]) => Validator.showFieldError(f, m));
        return false;
      }
    }
    if (step === 2) {
      const { valid, errors } = Validator.validateForm({
        weight: document.getElementById('weight')?.value,
        height: document.getElementById('height')?.value,
        age:    document.getElementById('age')?.value
      }, {
        weight: [v => Validator.required(v,'Cân nặng'), v => Validator.range(v,20,300,'Cân nặng')],
        height: [v => Validator.required(v,'Chiều cao'), v => Validator.range(v,100,250,'Chiều cao')],
        age:    [v => Validator.required(v,'Tuổi'), v => Validator.range(v,10,120,'Tuổi')]
      });
      if (!valid) {
        Object.entries(errors).forEach(([f, m]) => Validator.showFieldError(f, m));
        return false;
      }
    }
    return true;
  },

  collectStep(step) {
    if (step === 1) {
      Object.assign(this.formData, {
        fullName: document.getElementById('fullName')?.value.trim(),
        email:    document.getElementById('email')?.value.trim(),
        password: document.getElementById('password')?.value
      });
    }
    if (step === 2) {
      Object.assign(this.formData, {
        weight:       parseFloat(document.getElementById('weight')?.value),
        height:       parseFloat(document.getElementById('height')?.value),
        age:          parseInt(document.getElementById('age')?.value),
        gender:       document.getElementById('gender')?.value,
        activityLevel:document.getElementById('activityLevel')?.value
      });
    }
  },

  async handleRegister() {
    const goal = document.querySelector('.goal-card.selected')?.dataset.goal || 'maintain';
    Object.assign(this.formData, { goal });

    const btn = document.getElementById('registerBtn');
    btn.classList.add('loading');
    btn.disabled = true;
    try {
      const data = await UserService.register(this.formData);
      Auth.login(data);
      Toast.success('Đăng ký thành công! Chào mừng đến VitaTrack!');
      setTimeout(() => window.location.href = '/pages/dashboard.html', 800);
    } catch (err) {
      Toast.error(err.data?.message || 'Đăng ký thất bại, thử lại sau');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }
};

export default RegisterModule;
