/**
 * VITATRACK - NAVBAR/HEADER COMPONENT
 */
import Sidebar from './sidebar.js';
import Auth from '../core/auth.js';
import CONFIG from '../core/config.js';

const Navbar = {
  init(pageTitle = 'VitaTrack') {
    const header = document.querySelector('.header');
    if (!header) return;
    const role = Auth.getRole();
    const user = Auth.getUser() || {};
    const initials = user.fullName
      ? user.fullName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
      : 'VT';

    header.innerHTML = `
      <div class="header-left">
        <button class="sidebar-toggle btn-ghost btn-icon" id="sidebarToggle" title="Toggle sidebar">☰</button>
        <span class="header-title">${pageTitle}</span>
      </div>
      <div class="header-right">
        <div class="role-switcher">
          <button class="role-btn ${role==='user'?'active-user':''}"   onclick="Navbar.switchRole('user')"  >👤 User</button>
          <button class="role-btn ${role==='expert'?'active-expert':''}" onclick="Navbar.switchRole('expert')">👨‍⚕️ Expert</button>
          <button class="role-btn ${role==='admin'?'active-admin':''}"  onclick="Navbar.switchRole('admin')" >🔧 Admin</button>
        </div>
        <button class="notif-btn btn-ghost btn-icon" title="Thông báo">
          🔔
          <span class="notif-badge"></span>
        </button>
        <div class="header-avatar" id="headerAvatar" title="${user.fullName || ''}">${initials}</div>
      </div>
    `;

    document.getElementById('sidebarToggle')?.addEventListener('click', () => Sidebar.toggle());
    document.getElementById('headerAvatar')?.addEventListener('click', () => {
      window.location.href = '/pages/profile.html';
    });
  },

  switchRole(role) {
    import('../core/storage.js').then(m => {
      m.default.set(CONFIG.ROLE_KEY, role);
      window.location.href = role === 'admin' ? '/pages/admin.html'
        : role === 'expert' ? '/pages/expert.html' : '/pages/dashboard.html';
    });
  }
};

// Expose globally for inline onclick
window.Navbar = Navbar;
export default Navbar;
