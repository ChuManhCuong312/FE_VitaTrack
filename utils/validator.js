/**
 * VITATRACK - FORM VALIDATORS
 */
const Validator = {
  required(value, label = 'Trường này') {
    if (!value || String(value).trim() === '') {
      return `${label} là bắt buộc`;
    }
    return null;
  },

  email(value) {
    if (!value) return null;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? null : 'Email không hợp lệ';
  },

  password(value) {
    if (!value) return null;
    if (value.length < 8) return 'Mật khẩu tối thiểu 8 ký tự';
    if (!/[A-Z]/.test(value)) return 'Cần ít nhất 1 chữ hoa';
    if (!/[0-9]/.test(value)) return 'Cần ít nhất 1 chữ số';
    return null;
  },

  confirmPassword(password, confirm) {
    if (!confirm) return null;
    return password === confirm ? null : 'Mật khẩu xác nhận không khớp';
  },

  minLength(value, min, label = 'Trường này') {
    if (!value) return null;
    return value.length >= min ? null : `${label} tối thiểu ${min} ký tự`;
  },

  maxLength(value, max, label = 'Trường này') {
    if (!value) return null;
    return value.length <= max ? null : `${label} tối đa ${max} ký tự`;
  },

  number(value, label = 'Giá trị') {
    if (!value && value !== 0) return null;
    return isNaN(Number(value)) ? `${label} phải là số` : null;
  },

  range(value, min, max, label = 'Giá trị') {
    const n = Number(value);
    if (isNaN(n)) return `${label} phải là số`;
    if (n < min) return `${label} tối thiểu ${min}`;
    if (n > max) return `${label} tối đa ${max}`;
    return null;
  },

  phone(value) {
    if (!value) return null;
    return /^(0|\+84)[0-9]{9,10}$/.test(value) ? null : 'Số điện thoại không hợp lệ';
  },

  /** Validate form object: { field: [validators] }
   * Returns { valid: bool, errors: { field: string } }
   */
  validateForm(data, rules) {
    const errors = {};
    for (const [field, validators] of Object.entries(rules)) {
      for (const validator of validators) {
        const error = validator(data[field]);
        if (error) { errors[field] = error; break; }
      }
    }
    return { valid: Object.keys(errors).length === 0, errors };
  },

  /** Hiển thị lỗi vào DOM */
  showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('error');
    let errEl = field.parentElement.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      field.parentElement.appendChild(errEl);
    }
    errEl.textContent = message;
  },

  clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('error');
    const errEl = field.parentElement.querySelector('.form-error');
    if (errEl) errEl.textContent = '';
  },

  clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.form-control.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  }
};

export default Validator;
