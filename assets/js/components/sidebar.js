/**
 * VITATRACK - SIDEBAR COMPONENT
 * Quản lý sidebar: toggle, active link, user info
 */
import Auth from '../core/auth.js';
import Storage from '../core/storage.js';
import CONFIG from '../core/config.js';

const Sidebar = {
  isOpen: true,

  init() {
    this.isOpen = Storage.get(CONFIG.SIDEBAR_KEY, true);
    this.render();
    this.bindEvents();
    this.setActiveLink();
    this.applyState();
  },

  render() {
    const role = Auth.getRole();
    const user = Auth.getUser() || {};
    const initials = user.fullName
      ? user.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
      : 'VT';

    const navItems = this.getNavItems(role);
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <div class="logo-icon">💚</div>
        <span class="logo-text">Vita<span>Track</span></span>
      </div>
      <div class="sidebar-role role-${role}">
        ${role === 'user' ? '👤 Người dùng' : role === 'expert' ? '👨‍⚕️ Chuyên gia' : '🔧 Quản trị viên'}
      </div>
      <nav class="sidebar-nav">
        ${navItems.map(item =>
          item.divider
            ? `<div class="sidebar-section-title">${item.label}</div>`
            : `<a href="${item.href}" class="nav-item" data-page="${item.page}">
                 <span class="nav-icon">${item.icon}</span>
                 <span>${item.label}</span>
               </a>`
        ).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">${initials}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.fullName || 'Người dùng'}</div>
            <div class="sidebar-user-email">${user.email || ''}</div>
          </div>
          <button class="btn btn-ghost btn-icon" onclick="Auth.logout()" title="Đăng xuất" style="font-size:18px">🚪</button>
        </div>
      </div>
    `;
  },

  getNavItems(role) {
    const base = [
      { icon:'🏠', label:'Dashboard',         href: role === 'admin' ? '/pages/admin.html' : role === 'expert' ? '/pages/expert.html' : '/pages/dashboard.html', page:'dashboard' }
    ];

    if (role === 'user') return [...base,
      { divider: true, label: 'Sức Khoẻ' },
      { icon:'👤', label:'Hồ sơ sức khỏe', href:'/pages/profile.html',   page:'profile' },
      { icon:'🍽️', label:'Nhật ký ăn uống', href:'/pages/meal-log.html', page:'meal-log' },
      { icon:'🏃', label:'Hoạt động',        href:'/pages/activity.html', page:'activity' },
      { divider: true, label: 'Hỗ trợ' },
      { icon:'🤖', label:'Trợ lý AI',         href:'/pages/assistant.html', page:'assistant' },
      { icon:'👨‍⚕️', label:'Kết nối chuyên gia', href:'/pages/expert.html',    page:'expert' },
    ];

    if (role === 'expert') return [...base,
      { divider: true, label: 'Quản lý' },
      { icon:'👥', label:'Khách hàng',       href:'/pages/expert.html#clients',   page:'clients' },
      { icon:'📋', label:'Thực đơn',         href:'/pages/expert.html#meal-plans', page:'meal-plans' },
      { icon:'💬', label:'Tư vấn',           href:'/pages/expert.html#consult',   page:'consult' },
      { icon:'⚠️', label:'Cảnh báo',         href:'/pages/expert.html#alerts',    page:'alerts' },
    ];

    if (role === 'admin') return [...base,
      { divider: true, label: 'Hệ thống' },
      { icon:'👤', label:'Người dùng',       href:'/pages/admin.html#users',  page:'users' },
      { icon:'🥗', label:'Thực phẩm',        href:'/pages/admin.html#foods',  page:'foods' },
      { icon:'✅', label:'Duyệt chuyên gia', href:'/pages/admin.html#verify', page:'verify' },
      { icon:'📊', label:'Báo cáo',          href:'/pages/admin.html#reports',page:'reports' },
    ];

    return base;
  },

  setActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(link => {
      link.classList.toggle('active', path.endsWith(link.getAttribute('href').split('#')[0]));
    });
  },

  toggle() {
    this.isOpen = !this.isOpen;
    Storage.set(CONFIG.SIDEBAR_KEY, this.isOpen);
    this.applyState();
  },

  applyState() {
    const sidebar = document.querySelector('.sidebar');
    const header  = document.querySelector('.header');
    const main    = document.querySelector('.main-content');
    const overlay = document.querySelector('.sidebar-overlay');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      sidebar?.classList.toggle('mobile-open', this.isOpen);
      overlay?.classList.toggle('active', this.isOpen);
    } else {
      sidebar?.classList.toggle('collapsed', !this.isOpen);
      header?.classList.toggle('sidebar-collapsed', !this.isOpen);
      main?.classList.toggle('sidebar-collapsed', !this.isOpen);
    }
  },

  bindEvents() {
    document.querySelector('.sidebar-overlay')?.addEventListener('click', () => {
      this.isOpen = false;
      this.applyState();
    });
    window.addEventListener('resize', () => this.applyState());
  }
};

export default Sidebar;
