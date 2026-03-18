/**
 * VITATRACK - FOOD SEARCH MODULE
 */
import MealService from '../../services/mealService.js';
import Toast from '../../components/toast.js';

const FoodSearch = {
  results: [],
  selectedMealType: 'breakfast',
  debounceTimer: null,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('foodSearchInput');
    searchInput?.addEventListener('input', e => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.search(e.target.value), 400);
    });

    document.querySelectorAll('.meal-type-select').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.meal-type-select').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedMealType = btn.dataset.type;
      });
    });
  },

  async search(query) {
    if (!query || query.length < 2) {
      this.clearResults();
      return;
    }
    const container = document.getElementById('searchResults');
    if (container) container.innerHTML = '<div class="skeleton" style="height:60px;margin:4px 0"></div>'.repeat(3);

    try {
      const data = await MealService.searchFood(query);
      this.results = data.items || data;
      this.renderResults();
    } catch {
      Toast.error('Tìm kiếm thất bại');
    }
  },

  renderResults() {
    const container = document.getElementById('searchResults');
    if (!container) return;
    if (!this.results.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-text">Không tìm thấy thực phẩm</div></div>';
      return;
    }
    container.innerHTML = this.results.map(food => `
      <div class="food-item" style="cursor:pointer" onclick="FoodSearch.addFood(${food.id})">
        <div class="food-emoji">${food.emoji || '🍽️'}</div>
        <div class="food-info">
          <div class="food-name">${food.name}</div>
          <div class="food-detail">100g · ${food.calories}kcal · P:${food.protein}g C:${food.carbs}g F:${food.fat}g</div>
        </div>
        <button class="btn btn-primary btn-sm">Thêm</button>
      </div>
    `).join('');
  },

  async addFood(foodId) {
    try {
      const quantity = parseFloat(document.getElementById('quantity')?.value || 100);
      await MealService.addFoodEntry({
        foodId,
        mealType: this.selectedMealType,
        quantity,
        unit: 'g',
        date: new Date().toISOString().split('T')[0]
      });
      Toast.success('Đã thêm thực phẩm vào nhật ký!');
      // Reload diary
      if (window.MealLog) MealLog.loadDiary();
    } catch {
      Toast.error('Không thể thêm thực phẩm');
    }
  },

  clearResults() {
    const container = document.getElementById('searchResults');
    if (container) container.innerHTML = '';
  }
};

window.FoodSearch = FoodSearch;
export default FoodSearch;
