/**
 * VITATRACK - CHART WRAPPER (uses Chart.js from CDN)
 * Cung cấp các hàm tạo chart theo design system VitaTrack
 */

const COLORS = {
  primary: '#22C55E',
  expert:  '#2563EB',
  admin:   '#F59E0B',
  danger:  '#EF4444',
  gray:    '#9CA3AF',
  primaryLight: 'rgba(34,197,94,0.15)',
  expertLight:  'rgba(37,99,235,0.15)',
  adminLight:   'rgba(245,158,11,0.15)',
};

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend:  { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#111827',
      bodyColor:  '#6B7280',
      borderColor:'#E5E7EB',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
    }
  }
};

const ChartHelper = {
  /** Line chart - weight/calorie trend */
  createLineChart(canvasId, labels, datasets, options = {}) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: datasets.map(ds => ({
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        tension: 0.4,
        fill: true,
        ...ds
      }))},
      options: {
        ...defaultOptions,
        scales: {
          x: { grid:{ display:false }, ticks:{ color:'#9CA3AF', font:{size:11} } },
          y: { grid:{ color:'#F3F4F6' }, ticks:{ color:'#9CA3AF', font:{size:11} } }
        },
        ...options
      }
    });
  },

  /** Bar chart - weekly overview */
  createBarChart(canvasId, labels, datasets, options = {}) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: datasets.map(ds => ({
        borderRadius: 6,
        borderWidth: 0,
        ...ds
      }))},
      options: {
        ...defaultOptions,
        scales: {
          x: { grid:{display:false}, ticks:{color:'#9CA3AF', font:{size:11}} },
          y: { grid:{color:'#F3F4F6'}, ticks:{color:'#9CA3AF', font:{size:11}} }
        },
        ...options
      }
    });
  },

  /** Doughnut chart - macro/calorie breakdown */
  createDoughnutChart(canvasId, labels, data, colors, options = {}) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }]
      },
      options: {
        ...defaultOptions,
        cutout: '72%',
        plugins: {
          ...defaultOptions.plugins,
          legend: { display: true, position: 'bottom', labels:{ boxWidth:10, padding:16, color:'#6B7280', font:{size:12} } }
        },
        ...options
      }
    });
  },

  COLORS
};

export default ChartHelper;
