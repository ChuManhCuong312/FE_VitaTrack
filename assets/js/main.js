/**
 * VITATRACK - MAIN JS ENTRY
 * Khởi tạo chung cho tất cả các trang có sidebar/header
 */
import Router from './core/router.js';
import Sidebar from './components/sidebar.js';
import Navbar from './components/navbar.js';
import Modal from './components/modal.js';
import Auth from './core/auth.js';

// Chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra auth & route
  Router.init();

  // Khởi tạo Sidebar & Navbar (chỉ cho các trang có layout)
  if (document.querySelector('.sidebar')) {
    Sidebar.init();
  }
  if (document.querySelector('.header')) {
    const title = document.title.replace(' | VitaTrack', '');
    Navbar.init(title);
  }

  // Modal
  Modal.init();

  // Expose Auth globally for inline onclick
  window.Auth = Auth;
  window.Modal = Modal;
});
