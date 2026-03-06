# VitaTrack V3.0 - Quick Start Guide

## 🚀 Bắt Đầu Nhanh

### 1. Cài Đặt & Chạy

```bash
# Clone dự án
git clone <repository-url>
cd vitatrack

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt tại http://localhost:5173
```

---

## 🎯 Tính Năng Mới V3.0

### ✨ Toggle Sidebar - Giải Quyết Vấn Đề Che Khuất Nội Dung

#### Trước V3.0 ❌
- Sidebar luôn cố định trên desktop (260px)
- Không thể đóng sidebar để xem toàn bộ nội dung
- Nội dung bị che khuất, đặc biệt trên màn hình nhỏ

#### Sau V3.0 ✅
- Click nút hamburger menu (☰) để mở/đóng sidebar
- Sidebar mượt mà collapse và expand
- Nội dung tự động điều chỉnh, không bị che khuất
- Trạng thái sidebar được lưu tự động

---

## 📱 Hướng Dẫn Sử Dụng

### Desktop (≥ 768px)

**Mở/Đóng Sidebar:**
1. Click vào nút hamburger menu (☰) ở góc trên bên trái
2. Sidebar sẽ slide in/out mượt mà
3. Nội dung tự động điều chỉnh margin-left
4. Trạng thái được lưu và giữ nguyên khi reload

**Keyboard Shortcuts (Coming in V3.1):**
- `Ctrl + B` - Toggle sidebar

### Mobile (< 768px)

**Mở Sidebar:**
1. Click nút hamburger menu (☰)
2. Sidebar xuất hiện dạng overlay
3. Background tối đi (overlay effect)

**Đóng Sidebar:**
1. Click vào overlay (background tối)
2. Click nút X ở góc trên sidebar
3. Click vào bất kỳ menu item nào (auto-close)

---

## 🎨 Demo Pages

### 1. Đăng Nhập
- URL: `/login`
- Test accounts:
  - Email: `demo@vitatrack.vn`
  - Password: `any password`

### 2. User Dashboard (7 pages)
- **Tổng quan**: `/dashboard`
  - Metrics cards (BMI, Calories, Steps)
  - Health charts (Weight, Nutrition, Activity)
  - AI insights & recommendations

- **Hồ sơ sức khỏe**: `/dashboard/health-profile`
  - Personal info form
  - Health metrics calculator
  - Goal settings

- **Nhật ký ăn uống**: `/dashboard/food-diary`
  - Add food entries manually
  - AI image recognition (upload food photo)
  - Daily nutrition tracking

- **Theo dõi vận động**: `/dashboard/exercise`
  - Exercise log
  - Activity calendar
  - Progress charts

- **Trợ lý ảo**: `/dashboard/ai-assistant`
  - AI chatbot for health questions
  - Personalized recommendations
  - Meal suggestions

- **Chuyên gia**: `/dashboard/expert`
  - Browse experts
  - Book consultations
  - Chat with experts

- **Cài đặt**: `/dashboard/settings`
  - Profile settings
  - Notifications
  - Privacy & security

### 3. Expert Dashboard (5 pages)
- **Tổng quan**: `/expert`
- **Danh sách người dùng**: `/expert/users`
- **Tạo thực đơn**: `/expert/create-menu`
- **Cảnh báo rủi ro**: `/expert/alerts`
- **Cài đặt**: `/expert/settings`

### 4. Admin Dashboard (5 pages)
- **Tổng quan**: `/admin`
- **Quản lý người dùng**: `/admin/users`
- **Quản lý thực phẩm**: `/admin/food`
- **Cấp quyền chuyên gia**: `/admin/experts`
- **Cài đặt**: `/admin/settings`

---

## 🔄 Chuyển Đổi Vai Trò (Demo)

Để test các vai trò khác nhau:

1. Click vào nút vai trò ở góc trên bên phải:
   - 🟢 **Người dùng** - User dashboard
   - 🔵 **Chuyên gia** - Expert dashboard  
   - 🟠 **Quản trị viên** - Admin dashboard

2. Mỗi vai trò có navigation menu riêng

---

## 💾 Data Persistence

### LocalStorage Keys

```javascript
// Sidebar state
"sidebar-open": "true" | "false"

// Health data
"health-metrics-{userId}": [...metrics]

// Food diary
"food-diary-{userId}": [...entries]

// AI chat history
"ai-chat-{userId}": [...messages]
```

### Xóa Data (Reset Demo)

```javascript
// Clear all app data
localStorage.clear();

// Hoặc xóa specific keys
localStorage.removeItem("sidebar-open");
localStorage.removeItem("health-metrics-demo-user");
```

---

## 🎨 Design System

### Colors
```css
--primary-green: #22C55E;   /* Primary actions, success */
--primary-blue: #2563EB;    /* Secondary actions, info */
--warning: #F59E0B;         /* Warnings */
--danger: #EF4444;          /* Errors, delete actions */
--gray-50: #F9FAFB;         /* Background */
--gray-200: #E5E7EB;        /* Borders */
--gray-700: #374151;        /* Text */
```

### Typography
```css
font-family: 'Inter', sans-serif;
/* Import from Google Fonts */
```

### Border Radius
```css
--radius-card: 16px;     /* Main cards */
--radius-button: 8px;    /* Buttons */
--radius-badge: 4px;     /* Small badges */
```

---

## 🔧 Customization

### Thay Đổi Sidebar Width

Edit `/src/app/components/Layout.tsx`:

```typescript
// Current: 260px
width: isOpen ? 260 : 0,

// Change to 300px:
width: isOpen ? 300 : 0,

// Don't forget to update margin-left:
className={isOpen ? "md:ml-[300px]" : "md:ml-0"}
```

### Thay Đổi Animation Speed

```typescript
// Current: 0.3s
transition: "width 0.3s ease-in-out",

// Faster (0.2s):
transition: "width 0.2s ease-in-out",

// Slower (0.5s):
transition: "width 0.5s ease-in-out",
```

### Disable Sidebar Persistence

Edit `/src/app/context/SidebarContext.tsx`:

```typescript
// Remove this useEffect:
useEffect(() => {
  localStorage.setItem("sidebar-open", isOpen.toString());
}, [isOpen]);
```

---

## 🐛 Troubleshooting

### Sidebar không mở/đóng

**Solution:**
```javascript
// Check console for errors
// Clear localStorage
localStorage.removeItem("sidebar-open");
// Refresh page (Ctrl+Shift+R)
```

### Nội dung vẫn bị che khuất

**Solution:**
```javascript
// Check if SidebarProvider is wrapping app
// See /src/app/App.tsx
<SidebarProvider>
  <RouterProvider router={router} />
</SidebarProvider>
```

### Layout bị lỗi trên mobile

**Solution:**
```css
/* Check Tailwind breakpoints */
md:ml-[260px]  /* >= 768px */
```

---

## 📊 Performance Tips

### 1. Lazy Load Pages

```typescript
// Instead of direct import:
import Overview from "./pages/user/Overview";

// Use React.lazy:
const Overview = React.lazy(() => import("./pages/user/Overview"));
```

### 2. Optimize Charts

```typescript
// Use smaller datasets for charts
const weekData = metrics.slice(0, 7); // Only last 7 days
```

### 3. Debounce Sidebar Toggle

```typescript
// Add debounce to prevent rapid toggles
import { debounce } from "lodash";
const toggleSidebar = debounce(() => setIsOpen(prev => !prev), 200);
```

---

## 🎓 Learning Resources

### React Concepts Used
- Context API for state management
- Custom hooks for logic reuse
- React Router v7 Data Mode
- Controlled components

### CSS Techniques
- Flexbox layouts
- CSS transitions
- Responsive design with Tailwind
- Fixed/sticky positioning

### TypeScript Patterns
- Interface definitions
- Type-safe contexts
- Generic components

---

## 🚀 Next Steps

### For Development
1. Read `/VERSION3_README.md` for architecture details
2. Check `/CHANGELOG_V3.md` for what's new
3. Explore service layer in `/src/app/services/`
4. Study custom hooks in `/src/app/hooks/`

### For Backend Integration
1. Setup Supabase project
2. Replace localStorage with Supabase queries
3. Add authentication with Supabase Auth
4. Integrate real AI APIs

### For Production
1. Run `npm run build`
2. Test production build: `npm run preview`
3. Deploy to Vercel/Netlify
4. Setup environment variables

---

## 📞 Support

### Common Questions

**Q: Làm sao để thêm trang mới?**
```typescript
// 1. Create page in /src/app/pages/
// 2. Add route in /src/app/routes.ts
// 3. Add nav item in /src/app/components/Layout.tsx
```

**Q: Làm sao để customize colors?**
```css
/* Edit /src/styles/theme.css */
:root {
  --color-primary: #22C55E;
  --color-secondary: #2563EB;
}
```

**Q: Sidebar có thể ở bên phải được không?**
```typescript
// Edit Layout.tsx:
// Change: left: 0 → right: 0
// Change: ml-[260px] → mr-[260px]
```

---

**Happy Coding! 💚**

VitaTrack V3.0 - Quản lý sức khỏe & dinh dưỡng thông minh
