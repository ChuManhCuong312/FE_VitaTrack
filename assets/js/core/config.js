/**
 * VITATRACK - CONFIG
 * Cau hinh toan cuc – FIX: dung proxy Vite (/api) thay vi URL tuyet doi
 * Vite dev server proxy /api -> http://localhost:8080/api
 */
const CONFIG = {
  // FIX: dung duong dan tuong doi de Vite proxy hoat dong chinh xac
  // Khi deploy production, dat bien VITE_API_BASE_URL vao .env.production
  API_BASE_URL: import.meta?.env?.VITE_API_BASE_URL || '/api',

  APP_NAME:    'VitaTrack',
  APP_VERSION: '1.0.0',
  DEBUG:       import.meta?.env?.VITE_DEBUG === 'true',

  TOKEN_KEY:   'vitatrack_token',
  REFRESH_KEY: 'vitatrack_refresh',
  USER_KEY:    'vitatrack_user',
  ROLE_KEY:    'vitatrack_role',
  SIDEBAR_KEY: 'vitatrack_sidebar',

  ROLES: {
    USER:   'user',
    EXPERT: 'expert',
    ADMIN:  'admin'
  },

  MEAL_TYPES:  ['breakfast', 'lunch', 'dinner', 'snack'],
  MEAL_LABELS: {
    breakfast: 'Bua sang',
    lunch:     'Bua trua',
    dinner:    'Bua toi',
    snack:     'An vat'
  },
  MEAL_ICONS: {
    breakfast: '☀️',
    lunch:     '🌤️',
    dinner:    '🌙',
    snack:     '🍎'
  },

  BMI_CATEGORIES: [
    { max: 18.5, label: 'Thieu can',   color: '#3B82F6', bg: '#EFF6FF' },
    { max: 25.0, label: 'Binh thuong', color: '#22C55E', bg: '#F0FDF4' },
    { max: 30.0, label: 'Thua can',    color: '#F59E0B', bg: '#FFFBEB' },
    { max: 999,  label: 'Beo phi',     color: '#EF4444', bg: '#FEF2F2' }
  ],

  PAGINATION: { DEFAULT_PAGE_SIZE: 20 },

  CHART_COLORS: {
    primary:  '#22C55E',
    protein:  '#3B82F6',
    carbs:    '#F59E0B',
    fat:      '#EF4444',
    neutral:  '#9CA3AF',
    surface:  '#F9FAFB'
  }
};

export default CONFIG;
