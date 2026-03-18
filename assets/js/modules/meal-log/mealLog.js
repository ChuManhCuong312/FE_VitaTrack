/**
 * VITATRACK - MEAL LOG MODULE (Rewritten)
 * 3-step flow: Chon bua -> Tim thuc pham -> Xac nhan va luu
 * Ho tro: allergy warning, AI image upload, real-time calorie preview
 */
import MealService from '../../services/mealService.js';
import AIService from '../../services/aiService.js';
import Auth from '../../core/auth.js';
import Toast from '../../components/toast.js';

const MEAL_LABELS = { breakfast:'Bua sang', lunch:'Bua trua', dinner:'Bua toi', snack:'An vat' };

const MealLog = {
  state: {
    date:         new Date().toISOString().split('T')[0],
    mealType:     'breakfast',
    selectedFood: null,
    diary:        [],
    userAllergies:[]
  },
  searchTimeout: null,

  // ── Init ──────────────────────────────────────────────────────────────
  async init() {
    this.setupDateControls();
    this.setupMealTabs();
    this.setupFoodSearch();
    this.setupQuantityInput();
    this.setupAddButton();
    this.setupAIUpload();
    this.setupUploadToggle();

    // Load allergies tu profile
    try {
      const profile = await MealService.getHealthProfile();
      this.state.userAllergies = profile.allergies || [];
    } catch (_) {}

    await this.loadDiary();
  },

  // ── Date Controls ─────────────────────────────────────────────────────
  setupDateControls() {
    const input = document.getElementById('dateInput');
    if (input) {
      input.value = this.state.date;
      input.max   = new Date().toISOString().split('T')[0]; // khong chon tuong lai
      input.addEventListener('change', () => {
        this.state.date = input.value;
        this.updateDateLabel();
        this.loadDiary();
      });
    }
    document.getElementById('prevDay')?.addEventListener('click', () => this.changeDate(-1));
    document.getElementById('nextDay')?.addEventListener('click', () => this.changeDate(1));
    this.updateDateLabel();
  },

  changeDate(delta) {
    const d = new Date(this.state.date);
    d.setDate(d.getDate() + delta);
    const today = new Date();
    if (d > today) return; // khong di tuong lai
    this.state.date = d.toISOString().split('T')[0];
    const input = document.getElementById('dateInput');
    if (input) input.value = this.state.date;
    this.updateDateLabel();
    this.loadDiary();
  },

  updateDateLabel() {
    const d = new Date(this.state.date + 'T00:00:00');
    const today = new Date();
    today.setHours(0,0,0,0);
    const diff = Math.round((d - today) / 86400000);
    const label = diff === 0 ? 'Hom nay' : diff === -1 ? 'Hom qua' : d.toLocaleDateString('vi-VN');
    const el = document.getElementById('dateLabel');
    if (el) el.textContent = label;
  },

  // ── Meal Tabs ─────────────────────────────────────────────────────────
  setupMealTabs() {
    document.querySelectorAll('.meal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.meal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.state.mealType = tab.dataset.meal;
        this.updateCurrentMealLabel();
        this.renderDiary();
        this.clearSelected();
      });
    });
    this.updateCurrentMealLabel();
  },

  updateCurrentMealLabel() {
    const el = document.getElementById('currentMealLabel');
    if (el) el.textContent = MEAL_LABELS[this.state.mealType] || '';
  },

  // ── Food Search ───────────────────────────────────────────────────────
  setupFoodSearch() {
    const input = document.getElementById('foodSearch');
    if (!input) return;

    input.addEventListener('input', () => {
      clearTimeout(this.searchTimeout);
      const q = input.value.trim();
      if (q.length < 1) { this.hideResults(); return; }
      this.searchTimeout = setTimeout(() => this.searchFood(q), 350);
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('#foodSearch') && !e.target.closest('#foodResults')) {
        this.hideResults();
      }
    });
  },

  async searchFood(q) {
    try {
      const results = await MealService.searchFood(q);
      this.renderFoodResults(results.content || results || []);
    } catch (err) {
      console.error('[MealLog] Search error:', err);
    }
  },

  renderFoodResults(foods) {
    const container = document.getElementById('foodResults');
    if (!container) return;
    if (!foods.length) {
      container.innerHTML = '<div style="padding:1rem;text-align:center;font-size:0.8125rem;color:var(--text-muted)">Khong tim thay thuc pham</div>';
      container.style.display = 'block';
      return;
    }
    container.innerHTML = foods.slice(0, 10).map(f => `
      <div class="food-result-item" data-id="${f.id}">
        <div>
          <div class="food-result-name">${f.name}</div>
          <div class="food-result-meta">${f.category || ''} · P:${f.proteinPer100g||0}g C:${f.carbsPer100g||0}g F:${f.fatPer100g||0}g</div>
        </div>
        <div class="food-result-cal">${f.caloriesPer100g} kcal/100g</div>
      </div>
    `).join('');
    container.style.display = 'block';

    container.querySelectorAll('.food-result-item').forEach((item, i) => {
      item.addEventListener('click', () => this.selectFood(foods[i]));
    });
  },

  hideResults() {
    const c = document.getElementById('foodResults');
    if (c) { c.style.display = 'none'; c.innerHTML = ''; }
  },

  // ── Select Food ───────────────────────────────────────────────────────
  selectFood(food) {
    this.state.selectedFood = food;
    this.hideResults();
    document.getElementById('foodSearch').value = '';

    // Populate selected card
    document.getElementById('sf-name').textContent    = food.name;
    document.getElementById('sf-protein').textContent = food.proteinPer100g || 0;
    document.getElementById('sf-carbs').textContent   = food.carbsPer100g   || 0;
    document.getElementById('sf-fat').textContent     = food.fatPer100g     || 0;
    document.getElementById('quantityInput').value    = 100;
    document.getElementById('selectedFood').style.display = 'block';

    this.updateCaloriePreview();
    this.checkAllergy(food);
  },

  clearSelected() {
    this.state.selectedFood = null;
    const sf = document.getElementById('selectedFood');
    if (sf) sf.style.display = 'none';
    const aw = document.getElementById('allergyWarning');
    if (aw) aw.style.display = 'none';
    document.getElementById('foodSearch').value = '';
  },

  checkAllergy(food) {
    const warn = document.getElementById('allergyWarning');
    if (!warn) return;
    const userAllergens = this.state.userAllergies.map(a => a.toLowerCase());
    const foodAllergens = (food.allergens || '').toLowerCase().split(',').map(a => a.trim()).filter(Boolean);
    const matched = foodAllergens.filter(a => userAllergens.some(u => a.includes(u) || u.includes(a)));

    if (matched.length) {
      document.getElementById('allergyWarnText').textContent =
        `Mon nay chua: ${matched.join(', ')} – co the gay di ung!`;
      warn.style.display = 'flex';
    } else {
      warn.style.display = 'none';
    }
  },

  // ── Quantity & Calorie Preview ────────────────────────────────────────
  setupQuantityInput() {
    document.getElementById('quantityInput')?.addEventListener('input', () => this.updateCaloriePreview());
  },

  updateCaloriePreview() {
    const food = this.state.selectedFood;
    if (!food) return;
    const qty = parseFloat(document.getElementById('quantityInput')?.value) || 0;
    const cal = Math.round((food.caloriesPer100g || 0) * qty / 100);
    const el  = document.getElementById('calPreview');
    if (el) el.textContent = cal;
  },

  // ── Add Food Entry ────────────────────────────────────────────────────
  setupAddButton() {
    document.getElementById('addFoodBtn')?.addEventListener('click', () => this.addFood());
  },

  async addFood() {
    const food = this.state.selectedFood;
    if (!food) return;
    const qty = parseFloat(document.getElementById('quantityInput')?.value) || 0;
    if (qty <= 0) { Toast.warning('Vui long nhap khau phan hop le.'); return; }

    const btn = document.getElementById('addFoodBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Dang luu...'; }

    try {
      await MealService.addEntry({
        foodId:   food.id,
        mealType: this.state.mealType,
        date:     this.state.date,
        quantity: qty,
        unit:     'g'
      });
      Toast.success(`Da them ${food.name} vao ${MEAL_LABELS[this.state.mealType]}!`);
      this.clearSelected();
      await this.loadDiary();
    } catch (err) {
      Toast.error(err.message || 'Khong the them thuc pham. Thu lai.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Them vao bua an'; }
    }
  },

  // ── AI Upload ─────────────────────────────────────────────────────────
  setupAIUpload() {
    const zone  = document.getElementById('aiDropZone');
    const input = document.getElementById('foodImageInput');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) this.processAIImage(file);
    });
    input.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) this.processAIImage(file);
    });
  },

  async processAIImage(file) {
    const resultDiv = document.getElementById('aiResult');
    if (!resultDiv) return;
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted)">Dang phan tich anh... (toi da 8 giay)</div>';

    try {
      const data = await AIService.recognizeFood(file);
      const food = data.food || data;
      resultDiv.innerHTML = `
        <div class="selected-food-card">
          <div class="selected-food-name">🤖 AI: ${food.name || 'Mon an khong xac dinh'}</div>
          <div class="selected-food-macros">
            <span>Calo uoc luong: <strong>${food.estimatedCalories || food.caloriesPer100g || '?'}</strong> kcal</span>
          </div>
          <button class="btn btn-sm btn-outline" onclick="MealLog.acceptAIFood(${JSON.stringify(food).replace(/"/g,'&quot;')})">
            Chap nhan va chinh sua
          </button>
        </div>`;
    } catch (err) {
      resultDiv.innerHTML = `<div style="color:var(--color-danger);font-size:var(--font-size-sm);padding:var(--space-2)">
        Phan tich that bai: ${err.message}. Vui long tim thu cong.
      </div>`;
    }
  },

  acceptAIFood(food) {
    this.selectFood({
      id:               food.id || null,
      name:             food.name || 'Mon AI',
      caloriesPer100g:  food.caloriesPer100g || food.estimatedCalories || 0,
      proteinPer100g:   food.protein || 0,
      carbsPer100g:     food.carbs   || 0,
      fatPer100g:       food.fat     || 0,
      allergens:        food.allergens || ''
    });
    const aiSection = document.getElementById('aiUploadSection');
    if (aiSection) aiSection.style.display = 'none';
  },

  setupUploadToggle() {
    document.getElementById('toggleUploadBtn')?.addEventListener('click', () => {
      const s = document.getElementById('aiUploadSection');
      if (!s) return;
      s.style.display = s.style.display === 'none' ? 'block' : 'none';
    });
  },

  // ── Load & Render Diary ───────────────────────────────────────────────
  async loadDiary() {
    try {
      this.state.diary = await MealService.getDiary(this.state.date);
      this.renderDiary();
      this.updateMealTabCalories();
    } catch (err) {
      Toast.error('Khong the tai nhat ky. Thu lai.');
      console.error('[MealLog]', err);
    }
  },

  renderDiary() {
    const container = document.getElementById('diaryList');
    if (!container) return;
    const filtered = (this.state.diary || []).filter(e => e.mealType === this.state.mealType);

    if (!filtered.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${{breakfast:'☀️',lunch:'🌤️',dinner:'🌙',snack:'🍎'}[this.state.mealType]||'🍽️'}</div>
          <div class="empty-text">Chua co thuc pham cho ${MEAL_LABELS[this.state.mealType]}</div>
        </div>`;
      document.getElementById('mealTotalCal').textContent = '0 kcal';
      return;
    }

    const total = filtered.reduce((s, e) => s + (e.calories || 0), 0);
    document.getElementById('mealTotalCal').textContent = `${Math.round(total)} kcal`;

    container.innerHTML = filtered.map(e => `
      <div class="diary-food-row">
        <div class="diary-food-name">${e.foodName || e.name}</div>
        <div class="diary-food-qty">${e.quantity || 0}g</div>
        <div class="diary-food-cal">${Math.round(e.calories || 0)} kcal</div>
        <button class="diary-delete-btn" onclick="MealLog.deleteEntry(${e.id})" title="Xoa">✕</button>
      </div>
    `).join('');
  },

  updateMealTabCalories() {
    ['breakfast','lunch','dinner','snack'].forEach(type => {
      const items = (this.state.diary || []).filter(e => e.mealType === type);
      const total = items.reduce((s, e) => s + (e.calories || 0), 0);
      const el = document.getElementById(`cal-${type}`);
      if (el) el.textContent = Math.round(total) + ' kcal';
    });
  },

  async deleteEntry(id) {
    if (!confirm('Xoa thuc pham nay?')) return;
    try {
      await MealService.deleteEntry(id);
      Toast.success('Da xoa.');
      await this.loadDiary();
    } catch (err) {
      Toast.error('Khong the xoa. Thu lai.');
    }
  }
};

export default MealLog;
