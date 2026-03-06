# 💚 VitaTrack - Quản Lý Sức Khỏe & Dinh Dưỡng Thông Minh

<div align="center">

![Version](https://img.shields.io/badge/version-3.0.0-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

**Hệ thống SaaS toàn diện với AI nhận diện món ăn, trợ lý ảo, và dashboard đa vai trò**

[Demo](#-demo) • [Tính Năng](#-tính-năng-nổi-bật) • [Cài Đặt](#-cài-đặt-nhanh) • [Tài Liệu](#-tài-liệu)

</div>

---

## 🌟 Tổng Quan

**VitaTrack** là nền tảng quản lý sức khỏe và dinh dưỡng hiện đại, được thiết kế cho 3 vai trò:

- 🟢 **Người dùng**: Theo dõi BMI, calo, vận động, nhật ký ăn uống với AI
- 🔵 **Chuyên gia**: Quản lý khách hàng, tạo thực đơn, tư vấn dinh dưỡng
- 🟠 **Quản trị viên**: Quản lý hệ thống, database thực phẩm, cấp quyền

### ✨ Điểm Nổi Bật V3.0

- ✅ **Sidebar Collapsible**: Toggle trên cả desktop & mobile
- ✅ **Smooth Animations**: Transitions mượt mà 0.3s
- ✅ **Persistent State**: Lưu preferences tự động
- ✅ **Responsive Design**: Perfect trên mọi thiết bị
- ✅ **19+ Pages**: Dashboard hoàn chỉnh cho 3 roles

---

## 🚀 Quick Start

### 1️⃣ Cài Đặt

```bash
# Clone repository
git clone <your-repo-url>
cd vitatrack

# Install dependencies
npm install
# hoặc
pnpm install
```

### 2️⃣ Chạy Development

```bash
npm run dev
# Mở http://localhost:5173
```

### 3️⃣ Đăng Nhập & Khám Phá

```
Email: demo@vitatrack.vn
Password: anything
```

**Chuyển vai trò** bằng buttons ở header:
- 🟢 Người dùng → `/dashboard`
- 🔵 Chuyên gia → `/expert`
- 🟠 Quản trị viên → `/admin`

---

## 🎯 Tính Năng Nổi Bật

### 💪 Cho Người Dùng

| Tính Năng | Mô Tả |
|-----------|-------|
| 📊 **Health Dashboard** | Theo dõi BMI, BMR, TDEE, calo, bước chân real-time |
| 🍽️ **Food Diary** | Nhật ký ăn uống với AI nhận diện món ăn qua ảnh |
| 🤖 **AI Assistant** | Trợ lý ảo tư vấn dinh dưỡng 24/7, cá nhân hóa |
| 🏃 **Exercise Tracking** | Theo dõi vận động, tính calo tiêu hao |
| 👨‍⚕️ **Expert Connect** | Kết nối và chat trực tiếp với chuyên gia |
| 📈 **Progress Charts** | Biểu đồ cân nặng, dinh dưỡng, hoạt động |
| 💾 **Data Export** | Export dữ liệu JSON/CSV |

### 🔬 Cho Chuyên Gia

- 📊 Dashboard tổng quan khách hàng
- 👥 Quản lý danh sách người dùng
- 🍴 Tạo thực đơn theo nhu cầu cá nhân
- ⚠️ Hệ thống cảnh báo rủi ro sức khỏe
- 💬 Chat tư vấn trực tiếp
- 📋 Báo cáo tiến độ chi tiết

### 🎛️ Cho Quản Trị Viên

- 🎯 Dashboard analytics tổng quan
- 👤 Quản lý tất cả người dùng (all roles)
- 🥗 Quản lý database thực phẩm
- ✅ Cấp quyền và verify chuyên gia
- 📊 System insights & metrics

---

## 🏗️ Tech Stack

```
Frontend
├── React 18.3.1          # UI Library
├── TypeScript            # Type Safety  
├── Tailwind CSS v4       # Styling
├── React Router v7       # Routing (Data Mode)
└── Recharts              # Charts & Graphs

State Management
├── React Context API     # Global State
├── Custom Hooks          # Logic Reuse
└── localStorage          # Persistence

Services
├── AI Service            # Image Recognition, Chatbot
├── API Service           # Mock Backend
└── Data Export           # JSON, CSV Export

Build Tools
├── Vite 6.3.5           # Build Tool
└── @tailwindcss/vite    # Tailwind Integration
```

---

## 📁 Project Structure

```
vitatrack/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── Layout.tsx       # Main layout với sidebar
│   │   │   ├── ui/              # 40+ shadcn/ui components
│   │   │   └── ...
│   │   ├── context/             # React Context
│   │   │   ├── AppContext.tsx   # App state
│   │   │   └── SidebarContext.tsx # Sidebar state (V3.0)
│   │   ├── hooks/               # Custom Hooks
│   │   │   ├── useHealthData.ts
│   │   │   ├── useFoodDiary.ts
│   │   │   └── useAIChat.ts
│   │   ├── pages/               # 19+ pages
│   │   │   ├── auth/            # Login, Register
│   │   │   ├── user/            # 7 user pages
│   │   │   ├── expert/          # 5 expert pages
│   │   │   └── admin/           # 5 admin pages
│   │   ├── services/            # Business Logic
│   │   │   ├── ai.ts            # AI services
│   │   │   └── api.ts           # API services
│   │   ├── routes.ts            # Router config
│   │   └── App.tsx              # Root component
│   └── styles/                  # Global styles
├── docs/                        # Documentation
│   ├── VERSION3_README.md       # V3.0 features
│   ├── CHANGELOG_V3.md          # Version history
│   ├── QUICKSTART_V3.md         # Quick guide
│   ├── MIGRATION_V2_TO_V3.md    # Migration guide
│   ├── V3_IMPLEMENTATION_SUMMARY.md
│   └── PROJECT_OVERVIEW.md      # Complete overview
└── package.json
```

---

## 📱 Screenshots & Demo

### Dashboard Tổng Quan
<details>
<summary>View Screenshot</summary>

*Health metrics với BMI, calo, bước chân và charts*

Features:
- Real-time metrics tracking
- Interactive charts (Line, Pie, Bar)
- AI-powered insights
- Progress indicators

</details>

### Nhật Ký Ăn Uống + AI
<details>
<summary>View Screenshot</summary>

*Upload ảnh món ăn, AI tự động nhận diện*

Features:
- Manual food entry
- AI image recognition
- Nutrition breakdown
- Allergen warnings

</details>

### Trợ Lý Ảo AI
<details>
<summary>View Screenshot</summary>

*Chat interface thông minh, context-aware*

Features:
- 24/7 AI assistant
- Personalized recommendations
- Meal planning suggestions
- Health tips

</details>

---

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| 🟢 Green | `#22C55E` | Primary (User role, Success) |
| 🔵 Blue | `#2563EB` | Secondary (Expert role, Info) |
| 🟠 Orange | `#F59E0B` | Accent (Admin role, Warning) |
| 🔴 Red | `#EF4444` | Danger (Errors, Delete) |

### Typography

```css
Font Family: Inter (Google Fonts)
Font Weights: 400, 500, 600, 700
```

### Layout

```css
Sidebar Width: 260px (collapsible to 0)
Border Radius: 16px (cards), 8px (buttons)
Shadows: Subtle, elevation-based
```

---

## 📚 Tài Liệu

### Dành Cho Developers

| Tài Liệu | Mô Tả |
|----------|-------|
| [QUICKSTART_V3.md](/QUICKSTART_V3.md) | Bắt đầu trong 5 phút |
| [VERSION3_README.md](/VERSION3_README.md) | Chi tiết V3.0 features |
| [CHANGELOG_V3.md](/CHANGELOG_V3.md) | Lịch sử thay đổi |
| [MIGRATION_V2_TO_V3.md](/MIGRATION_V2_TO_V3.md) | Hướng dẫn nâng cấp |
| [PROJECT_OVERVIEW.md](/PROJECT_OVERVIEW.md) | Tổng quan dự án |
| [V3_IMPLEMENTATION_SUMMARY.md](/V3_IMPLEMENTATION_SUMMARY.md) | Chi tiết kỹ thuật |

### Code Examples

#### Sử Dụng Custom Hooks

```typescript
import { useHealthData } from './hooks/useHealthData';

function MyComponent() {
  const { metrics, loading, addMetric } = useHealthData('user-id');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>BMI: {metrics[0]?.bmi}</h1>
      <button onClick={() => addMetric({ weight: 70, height: 170 })}>
        Add Metric
      </button>
    </div>
  );
}
```

#### Sử Dụng Sidebar Context

```typescript
import { useSidebar } from './context/SidebarContext';

function CustomButton() {
  const { isOpen, toggleSidebar } = useSidebar();
  
  return (
    <button onClick={toggleSidebar}>
      {isOpen ? 'Close' : 'Open'} Sidebar
    </button>
  );
}
```

---

## 🔄 Version History

### [3.0.0] - Current (March 4, 2026)
**Codename:** "Responsive Freedom"

**Major Changes:**
- ✨ Sidebar collapsible on desktop
- ✨ Smooth animations & transitions
- ✨ Persistent state with localStorage
- 🐛 Fixed content obscured issues

[View Full Changelog](/CHANGELOG_V3.md)

### [2.0.0] - Previous
**Codename:** "Service Layer Architecture"

- ✨ Custom React Hooks
- ✨ Service layer architecture
- ✨ AI features (image recognition, chatbot)
- ✨ Data export functionality

### [1.0.0] - Initial
**Codename:** "Foundation"

- 🎉 Initial project setup
- 🎉 3-role system
- 🎉 Core pages structure

---

## 🚀 Deployment

### Build for Production

```bash
# Build
npm run build

# Preview
npm run preview

# Output in /dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

---

## 🛣️ Roadmap

### Version 3.1 (Q2 2026)
- [ ] Keyboard shortcuts (Ctrl+B)
- [ ] Resizable sidebar
- [ ] Mini sidebar mode (icons only)
- [ ] Sidebar position (left/right)
- [ ] Animation preferences

### Version 4.0 (Q3 2026)
- [ ] **Supabase Integration**
  - Real authentication
  - Database sync
  - File storage
  - Real-time updates

- [ ] **AI Integration**
  - OpenAI Vision API
  - ChatGPT API
  - Nutrition databases

### Version 5.0 (Q4 2026)
- [ ] Push notifications
- [ ] Social features
- [ ] Gamification
- [ ] Multi-language
- [ ] Mobile app (React Native)
- [ ] Advanced analytics

---

## 🧪 Testing

### Manual Testing

```bash
# Desktop (>= 768px)
✅ Sidebar toggle works
✅ Content responsive
✅ Charts render correctly
✅ Forms submit successfully

# Mobile (< 768px)
✅ Sidebar overlay works
✅ Touch interactions smooth
✅ No horizontal scroll
```

### Test Accounts

```
Đăng nhập với bất kỳ email/password nào
Demo mode không cần authentication
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: add amazing'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

### Commit Convention

```
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code refactoring
perf: Performance
test: Tests
chore: Build/deps
```

---

## 📄 License

MIT License - Free for personal and commercial use

```
Copyright (c) 2026 VitaTrack Team
```

---

## 🙏 Acknowledgments

### Tech & Tools
- [React](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Charts
- [Vite](https://vitejs.dev) - Build tool

### Design Inspiration
- Material Design principles
- Apple Human Interface Guidelines
- Modern SaaS dashboards

### Fonts
- [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson

---

## 📞 Support

### Documentation
- 📖 Read the [Quick Start Guide](/QUICKSTART_V3.md)
- 📋 Check the [Full Documentation](/VERSION3_README.md)
- 🔄 Migration? See [Migration Guide](/MIGRATION_V2_TO_V3.md)

### Troubleshooting

**Sidebar not working?**
```javascript
localStorage.removeItem("sidebar-open")
location.reload()
```

**Data lost?**
```javascript
// Check localStorage
console.log(localStorage)
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌟 Star History

If you find this project useful, please ⭐ star the repository!

---

## 📊 Project Stats

```
📁 Total Files: 100+
📝 Lines of Code: ~11,500
🎨 Components: 50+
📱 Pages: 19
🏗️ Contexts: 2
🪝 Custom Hooks: 3
⚙️ Services: 2
```

---

<div align="center">

**Built with 💚 by VitaTrack Team**

[⬆ Back to Top](#-vitatrack---quản-lý-sức-khỏe--dinh-dưỡng-thông-minh)

</div>
