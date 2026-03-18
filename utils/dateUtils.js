/**
 * VITATRACK - DATE UTILITIES
 */
const DateUtils = {
  /** Format ngày: 01/01/2024 */
  format(date, format = 'dd/MM/yyyy') {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d)) return '';
    const pad = n => String(n).padStart(2, '0');
    return format
      .replace('dd',   pad(d.getDate()))
      .replace('MM',   pad(d.getMonth() + 1))
      .replace('yyyy', d.getFullYear())
      .replace('HH',   pad(d.getHours()))
      .replace('mm',   pad(d.getMinutes()))
      .replace('ss',   pad(d.getSeconds()));
  },

  /** Format ngày tiếng Việt: Thứ Hai, 01 tháng 1 2024 */
  formatVietnamese(date) {
    const d = date instanceof Date ? date : new Date(date);
    const days   = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    const months = ['tháng 1','tháng 2','tháng 3','tháng 4','tháng 5','tháng 6',
                    'tháng 7','tháng 8','tháng 9','tháng 10','tháng 11','tháng 12'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  },

  /** Format relative time: "2 giờ trước" */
  timeAgo(date) {
    const d = date instanceof Date ? date : new Date(date);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60)     return 'Vừa xong';
    if (diff < 3600)   return `${Math.floor(diff/60)} phút trước`;
    if (diff < 86400)  return `${Math.floor(diff/3600)} giờ trước`;
    if (diff < 604800) return `${Math.floor(diff/86400)} ngày trước`;
    return this.format(date);
  },

  /** Ngày hôm nay dạng yyyy-MM-dd */
  today() {
    return new Date().toISOString().split('T')[0];
  },

  /** Danh sách 7 ngày gần nhất */
  last7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  },

  /** Kiểm tra có phải hôm nay không */
  isToday(date) {
    const d = date instanceof Date ? date : new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  /** Lấy đầu và cuối tuần */
  getWeekRange(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toISOString().split('T')[0],
      end:   end.toISOString().split('T')[0]
    };
  }
};

export default DateUtils;
