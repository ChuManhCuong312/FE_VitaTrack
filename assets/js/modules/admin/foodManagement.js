/**
 * VITATRACK - FOOD MANAGEMENT MODULE
 */
import AdminService from '../../services/adminService.js';
import Toast from '../../components/toast.js';
import Modal from '../../components/modal.js';

const FoodManagement = {
  foods: [],
  editingId: null,

  async init() {
    await this.loadFoods();
    this.bindEvents();
  },

  async loadFoods(query = '') {
    try {
      const data = await AdminService.getAllFoods({ q: query });
      this.foods = data.items || data;
      this.render();
    } catch {
      Toast.error('Không thể tải danh sách thực phẩm');
    }
  },

  render() {
    const tbody = document.getElementById('foodTableBody');
    if (!tbody) return;
    tbody.innerHTML = this.foods.map(f => `
      <tr>
        <td><span style="font-size:24px">${f.emoji||'🍽️'}</span></td>
        <td><div style="font-weight:500">${f.name}</div><div style="font-size:12px;color:var(--text-muted)">${f.category||''}</div></td>
        <td>${f.calories}</td>
        <td>${f.protein}g</td>
        <td>${f.carbs}g</td>
        <td>${f.fat}g</td>
        <td>
          <div class="flex" style="gap:4px">
            <button class="btn btn-secondary btn-sm" onclick="FoodManagement.edit(${f.id})">Sửa</button>
            <button class="btn btn-danger btn-sm"    onclick="FoodManagement.delete(${f.id})">Xóa</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openCreate() {
    this.editingId = null;
    document.getElementById('foodModalTitle') && (document.getElementById('foodModalTitle').textContent = 'Thêm thực phẩm mới');
    document.getElementById('foodForm')?.reset();
    Modal.open('foodModal');
  },

  edit(id) {
    const food = this.foods.find(f => f.id === id);
    if (!food) return;
    this.editingId = id;
    document.getElementById('foodModalTitle') && (document.getElementById('foodModalTitle').textContent = 'Sửa thực phẩm');
    ['name','category','emoji','calories','protein','carbs','fat','fiber'].forEach(f => {
      const el = document.getElementById(`food-${f}`);
      if (el) el.value = food[f] || '';
    });
    Modal.open('foodModal');
  },

  async save() {
    const data = {};
    ['name','category','emoji','calories','protein','carbs','fat','fiber'].forEach(f => {
      const el = document.getElementById(`food-${f}`);
      if (el) data[f] = ['calories','protein','carbs','fat','fiber'].includes(f) ? parseFloat(el.value) : el.value;
    });
    const btn = document.getElementById('saveFoodBtn');
    btn.classList.add('loading'); btn.disabled = true;
    try {
      if (this.editingId) {
        await AdminService.updateFood(this.editingId, data);
        Toast.success('Đã cập nhật thực phẩm!');
      } else {
        await AdminService.createFood(data);
        Toast.success('Đã thêm thực phẩm!');
      }
      Modal.close('foodModal');
      await this.loadFoods();
    } catch {
      Toast.error('Không thể lưu thực phẩm');
    } finally {
      btn.classList.remove('loading'); btn.disabled = false;
    }
  },

  delete(id) {
    Modal.confirm({
      title: 'Xóa thực phẩm',
      message: 'Bạn có chắc muốn xóa thực phẩm này? Hành động này không thể hoàn tác.',
      confirmText: 'Xóa',
      onConfirm: async () => {
        try {
          await AdminService.deleteFood(id);
          Toast.success('Đã xóa thực phẩm!');
          await this.loadFoods();
        } catch {
          Toast.error('Không thể xóa thực phẩm');
        }
      }
    });
  },

  bindEvents() {
    let timer;
    document.getElementById('searchFoods')?.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => this.loadFoods(e.target.value), 400);
    });
    document.getElementById('saveFoodBtn')?.addEventListener('click', () => this.save());
    document.getElementById('addFoodBtn')?.addEventListener('click', () => this.openCreate());
  }
};

window.FoodManagement = FoodManagement;
export default FoodManagement;
