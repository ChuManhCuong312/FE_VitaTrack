/**
 * VITATRACK - UPLOAD & AI RECOGNIZE FOOD
 */
import MealService from '../../services/mealService.js';
import Toast from '../../components/toast.js';

const UploadFoodImage = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('foodImageInput');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', ()=> zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) this.processImage(file);
    });
    input.addEventListener('change', e => {
      if (e.target.files[0]) this.processImage(e.target.files[0]);
    });
  },

  async processImage(file) {
    if (!file.type.startsWith('image/')) { Toast.warning('Vui lòng chọn file ảnh'); return; }
    if (file.size > 10 * 1024 * 1024)   { Toast.warning('Ảnh không được vượt quá 10MB'); return; }

    const preview = document.getElementById('imagePreview');
    if (preview) {
      const reader = new FileReader();
      reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block'; };
      reader.readAsDataURL(file);
    }

    const resultEl = document.getElementById('aiResult');
    if (resultEl) resultEl.innerHTML = '<div class="skeleton" style="height:80px"></div>';

    try {
      const result = await MealService.recognizeFood(file);
      this.showResult(result);
    } catch {
      Toast.error('Không thể nhận diện thực phẩm');
      if (resultEl) resultEl.innerHTML = '';
    }
  },

  showResult(result) {
    const el = document.getElementById('aiResult');
    if (!el || !result) return;
    el.innerHTML = `
      <div class="card" style="margin-top:16px">
        <div class="card-body">
          <div class="flex items-center justify-between" style="margin-bottom:12px">
            <div>
              <div style="font-weight:600;font-size:15px">${result.foodName || 'Không xác định'}</div>
              <div style="font-size:12px;color:var(--text-muted)">Độ chính xác: ${result.confidence || 0}%</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="UploadFoodImage.confirmAdd(${JSON.stringify(result).replace(/"/g,'&quot;')})">
              Thêm vào nhật ký
            </button>
          </div>
          <div class="nutrition-grid">
            <div class="nutrition-item"><div class="nutrition-val">${result.calories || 0}</div><div class="nutrition-unit">kcal</div></div>
            <div class="nutrition-item"><div class="nutrition-val">${result.protein || 0}g</div><div class="nutrition-unit">Protein</div></div>
            <div class="nutrition-item"><div class="nutrition-val">${result.carbs || 0}g</div><div class="nutrition-unit">Carbs</div></div>
            <div class="nutrition-item"><div class="nutrition-val">${result.fat || 0}g</div><div class="nutrition-unit">Chất béo</div></div>
          </div>
        </div>
      </div>
    `;
  },

  confirmAdd(result) {
    if (window.MealLog) MealLog.loadDiary();
    Toast.success(`Đã thêm ${result.foodName} vào nhật ký!`);
  }
};

window.UploadFoodImage = UploadFoodImage;
export default UploadFoodImage;
