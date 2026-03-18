/**
 * VITATRACK - LOGIN MODULE
 */
import UserService from '../../services/userService.js';
import Auth from '../../core/auth.js';
import Validator from '@utils/validator.js';
import Toast from '../../components/toast.js';

const LoginModule = {
  init() {
    Auth.requireGuest();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('loginForm')?.addEventListener('submit', e => {
      e.preventDefault();
      this.handleLogin();
    });

    document.getElementById('togglePassword')?.addEventListener('click', () => {
      const input = document.getElementById('password');
      const btn   = document.getElementById('togglePassword');
      if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
      else                           { input.type = 'password'; btn.textContent = '👁️'; }
    });

    // Real-time validation
    document.getElementById('email')?.addEventListener('blur', e => {
      const err = Validator.email(e.target.value);
      if (err) Validator.showFieldError('email', err);
      else Validator.clearFieldError('email');
    });
  },

 tin đăng nhập không đúng');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }
};

export default LoginModule;
