/**
 * VITATRACK - WEARABLE SYNC MODULE
 */
import ActivityService from '../../services/activityService.js';
import Toast from '../../components/toast.js';

const WearableSync = {
  status: {},

  async init() {
    await this.checkStatus();
  },

  async checkStatus() {
    try {
      this.status = await ActivityService.getWearableStatus();
      this.render();
    } catch {
      this.render();
    }
  },

  render() {
    const container = document.getElementById('wearableList');
    if (!container) return;
    const devices = [
      { id:'fitbit',  name:'Fitbit',       icon:'⌚', color:'#00B0B9' },
      { id:'garmin',  name:'Garmin',       icon:'⌚', color:'#007CC3' },
      { id:'apple',   name:'Apple Health', icon:'🍎', color:'#FF2D55' },
      { id:'samsung', name:'Samsung Health',icon:'📱',color:'#1428A0' }
    ];
    container.innerHTML = devices.map(dev => {
      const connected = this.status[dev.id];
      return `
        <div class="wearable-card">
          <div class="wearable-icon" style="font-size:36px">${dev.icon}</div>
          <div class="wearable-info">
            <div class="wearable-name">${dev.name}</div>
            <div class="wearable-status ${connected?'connected':'disconnected'}">
              ${connected ? '● Đã kết nối' : '○ Chưa kết nối'}
            </div>
          </div>
          <button class="btn ${connected?'btn-secondary':'btn-primary'} btn-sm"
            onclick="WearableSync.toggle('${dev.id}', ${connected})">
            ${connected ? 'Ngắt kết nối' : 'Kết nối'}
          </button>
        </div>
      `;
    }).join('');
  },

  async toggle(device, connected) {
    if (connected) {
      Toast.info(`Đã ngắt kết nối ${device}`);
      this.status[device] = false;
    } else {
      try {
        await ActivityService.syncWearable(device, 'oauth_token');
        this.status[device] = true;
        Toast.success(`Đã kết nối ${device}!`);
      } catch {
        Toast.error('Kết nối thất bại');
      }
    }
    this.render();
  }
};

window.WearableSync = WearableSync;
export default WearableSync;
