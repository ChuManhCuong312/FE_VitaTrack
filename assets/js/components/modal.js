/**
 * VITATRACK - MODAL MANAGER
 */
const Modal = {
  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal-overlay.active').forEach(el => {
      el.classList.remove('active');
    });
    document.body.style.overflow = '';
  },

  /** Tạo modal xác nhận */
  confirm({ title, message, confirmText = 'Xác nhận', cancelText = 'Hủy', onConfirm, type = 'danger' }) {
    const id = 'confirm-modal-' + Date.now();
    const btnClass = type === 'danger' ? 'btn-danger' : 'btn-primary';
    const el = document.createElement('div');
    el.id = id;
    el.className = 'modal-overlay';
    el.innerHTML = `
      <div class="modal modal-sm">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary)">${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="Modal.close('${id}'); this.closest('.modal-overlay').remove()">
            ${cancelText}
          </button>
          <button class="btn ${btnClass}" id="${id}-confirm">
            ${confirmText}
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    this.open(id);
    document.getElementById(`${id}-confirm`).onclick = () => {
      this.close(id);
      el.remove();
      if (typeof onConfirm === 'function') onConfirm();
    };
    el.addEventListener('click', e => {
      if (e.target === el) { this.close(id); el.remove(); }
    });
  },

  /** Init - đóng khi click overlay */
  init() {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        this.closeAll();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeAll();
    });
  }
};

export default Modal;
