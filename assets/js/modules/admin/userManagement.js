/**
 * VITATRACK - USER MANAGEMENT MODULE
 */
import AdminService from '../../services/adminService.js';
import Toast from '../../components/toast.js';
import Modal from '../../components/modal.js';
import DateUtils from '@utils/dateUtils.js';

const UserManagement = {
  users: [],
  currentPage: 0,
  pageSize: 10,
  searchQuery: '',

  async init() {
    await this.loadUsers();
    this.bindEvents();
  },

  async loadUsers() {
    try {
      const data = await AdminService.getAllUsers({
        page: this.currentPage,
        size: this.pageSize,
        q:    this.searchQuery
      });
      this.users = data.items || data;
      this.render();
    } catch {
      Toast.error('Không thể tải danh sách người dùng');
    }
  },

  render() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    if (!this.users.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:40px">Không có người dùng nào</td></tr>`;
      return;
    }
    tbody.innerHTML = this.users.map(u => `
      <tr>
        <td>
          <div class="avatar-cell">
            <div class="table-avatar">${u.fullName?.[0] || '?'}</div>
            <div>
              <div style="font-weight:500">${u.fullName}</div>
              <div style="font-size:12px;color:var(--text-muted)">${u.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="badge badge-${u.role==='admin'?'orange':u.role==='expert'?'blue':'green'}">
            ${u.role==='admin'?'Admin':u.role==='expert'?'Chuyên gia':'Người dùng'}
          </span>
        </td>
        <td>
          <span class="badge badge-${u.status==='active'?'green':'gray'}">
            ${u.status==='active'?'Hoạt động':'Bị khóa'}
          </span>
        </td>
        <td style="font-size:13px;color:var(--text-secondary)">${DateUtils.format(u.createdAt)}</td>
        <td>
          <div class="flex" style="gap:4px">
            <button class="btn btn-secondary btn-sm" onclick="UserManagement.editRole(${u.id},'${u.role}')">Phân quyền</button>
            <button class="btn btn-${u.status==='active'?'danger':'primary'} btn-sm" onclick="UserManagement.toggleStatus(${u.id})">
              ${u.status==='active'?'Khóa':'Mở khóa'}
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  async toggleStatus(id) {
    Modal.confirm({
      title: 'Thay đổi trạng thái',
      message: 'Bạn có chắc muốn thay đổi trạng thái tài khoản này?',
      onConfirm: async () => {
        try {
          await AdminService.toggleUserStatus(id);
          Toast.success('Đã cập nhật trạng thái!');
          await this.loadUsers();
        } catch {
          Toast.error('Không thể cập nhật trạng thái');
        }
      }
    });
  },

  async editRole(id, currentRole) {
    const select = document.getElementById('newRoleSelect');
    if (select) select.value = currentRole;
    document.getElementById('editRoleUserId') && (document.getElementById('editRoleUserId').value = id);
    Modal.open('editRoleModal');
  },

  async saveRole() {
    const id   = document.getElementById('editRoleUserId')?.value;
    const role = document.getElementById('newRoleSelect')?.value;
    if (!id || !role) return;
    try {
      await AdminService.updateUserRole(id, role);
      Toast.success('Đã cập nhật vai trò!');
      Modal.close('editRoleModal');
      await this.loadUsers();
    } catch {
      Toast.error('Không thể cập nhật vai trò');
    }
  },

  bindEvents() {
    let timer;
    document.getElementById('searchUsers')?.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.searchQuery = e.target.value;
        this.currentPage = 0;
        this.loadUsers();
      }, 400);
    });
    document.getElementById('saveRoleBtn')?.addEventListener('click', () => this.saveRole());
  }
};

window.UserManagement = UserManagement;
export default UserManagement;
