/**
 * VITATRACK - TOAST NOTIFICATIONS
 */
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'success', duration = 3000) {
    this.init();
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
      <span class="toast-close" onclick="this.parentElement.remove()">✕</span>
    `;
    this.container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    if (duration > 0) {
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
    return toast;
  },

  success(msg, duration) { return this.show(msg, 'success', duration); },
  error(msg, duration)   { return this.show(msg, 'error', duration);   },
  warning(msg, duration) { return this.show(msg, 'warning', duration); },
  info(msg, duration)    { return this.show(msg, 'info', duration);    }
};

export default Toast;
