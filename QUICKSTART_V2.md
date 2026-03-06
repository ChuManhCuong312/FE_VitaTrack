# VitaTrack V2 - Quick Start Guide

## 🚀 Bắt đầu nhanh

### 1. Khám phá ứng dụng

#### Đăng nhập
- Truy cập `/login`
- Nhập bất kỳ email/password nào
- Chọn role: **User**, **Expert**, hoặc **Admin**

#### Demo Accounts (Mặc định)
```
User:
  Email: an.nguyen@email.com
  Name: Nguyễn Văn An

Expert:
  Email: bich.tran@expert.com
  Name: ThS. Trần Thị Bích

Admin:
  Email: admin@healthapp.vn
  Name: Admin Hệ Thống
```

### 2. Tính năng chính Version 2

#### 📊 **Dashboard Thông Minh**
- Tự động tải 30 ngày dữ liệu demo khi đăng nhập lần đầu
- AI insights dựa trên health metrics thực tế
- Charts động với dữ liệu từ localStorage
- Trend analysis (BMI, weight, calories, steps)

**Thử ngay:**
1. Đăng nhập với role "User"
2. Xem dashboard tại `/dashboard`
3. Kiểm tra AI insights ở đầu trang
4. Scroll xuống xem charts với dữ liệu thực

#### 🤖 **AI Assistant Pro**
- Trò chuyện thông minh với context awareness
- Lưu lịch sử conversation
- Typing indicators và timestamps
- Mock responses realistic

**Thử ngay:**
1. Vào `/dashboard/ai-assistant`
2. Click vào suggestion chips hoặc gõ câu hỏi
3. Thử: "Gợi ý thực đơn bữa tối ít calo"
4. Xem AI response chi tiết

#### 📸 **Food Recognition** (Mock AI)
- Upload hoặc drag-drop ảnh món ăn
- Nhận diện món ăn với confidence score
- Nutrition info chi tiết (calories, protein, carbs, fat)
- Alternative suggestions

**Thử ngay:**
1. Vào `/dashboard/food-diary`
2. Click nút "Nhận diện bằng AI" (nếu có)
3. Upload ảnh món ăn bất kỳ
4. Xem kết quả nhận diện

#### 📤 **Export Dữ liệu**
- Export to CSV (mở bằng Excel)
- Export to JSON (cho developers)
- Print to PDF (báo cáo đẹp)
- Chọn khoảng thời gian và loại dữ liệu

**Thử ngay:**
1. Vào `/dashboard/settings`
2. Scroll xuống "Vùng nguy hiểm"
3. Click "📊 Xuất dữ liệu"
4. Chọn format và export

### 3. Làm việc với dữ liệu

#### LocalStorage Keys
VitaTrack lưu dữ liệu vào localStorage với các keys:
```javascript
vitatrack_user_profile      // User profiles
vitatrack_health_metrics    // Health data (BMI, weight, etc.)
vitatrack_food_entries      // Food diary
vitatrack_exercise_entries  // Exercise log
vitatrack_chat_messages     // Expert chat
vitatrack_ai_conversations  // AI chat history
```

#### Xem dữ liệu trong DevTools
1. Mở DevTools (F12)
2. Tab "Application" → "Local Storage"
3. Chọn domain của app
4. Xem các keys `vitatrack_*`

#### Clear dữ liệu (Reset)
```javascript
// Trong Console
localStorage.clear();
location.reload();
```

### 4. Kiểm tra các hooks

#### useHealthData
```typescript
import { useHealthData } from './hooks/useHealthData';

function MyComponent() {
  const userId = "user@example.com";
  const {
    metrics,          // Mảng health metrics
    latestMetric,     // Latest entry
    loading,          // Loading state
    addMetric,        // Thêm metric mới
    getAverages,      // Tính trung bình
    getTrend,         // Up/down/stable
  } = useHealthData(userId);

  // Use the data...
}
```

#### useFoodDiary
```typescript
import { useFoodDiary } from './hooks/useFoodDiary';

function MyComponent() {
  const userId = "user@example.com";
  const {
    entries,              // Food entries
    addEntry,             // Thêm món ăn
    getDailyTotals,       // Tổng calo ngày
    getWeeklyAverages,    // Trung bình tuần
  } = useFoodDiary(userId);

  // Use the data...
}
```

#### useAIChat
```typescript
import { useAIChat } from './hooks/useAIChat';

function MyComponent() {
  const userId = "user@example.com";
  const {
    activeConversation,  // Current chat
    sendMessage,         // Gửi message
    createConversation,  // Tạo chat mới
    conversations,       // Tất cả chats
  } = useAIChat(userId);

  // Use the chat...
}
```

### 5. Testing AI Services

#### Test Food Recognition
```typescript
import { aiService } from './services/ai';

// Mock file object
const file = new File(['fake'], 'test.jpg', { type: 'image/jpeg' });

const result = await aiService.recognizeFood(file);
console.log(result);
// {
//   foodName: "Phở bò",
//   confidence: 0.92,
//   nutritionInfo: { calories: 450, protein: 22, ... },
//   servingSize: "1 tô (500g)"
// }
```

#### Test AI Chat
```typescript
import { aiService } from './services/ai';

const response = await aiService.chat("Gợi ý thực đơn giảm cân");
console.log(response);
// {
//   id: "...",
//   role: "assistant",
//   content: "Để giảm cân hiệu quả...",
//   timestamp: "2026-03-04T10:30:00.000Z"
// }
```

#### Test Health Analysis
```typescript
import { aiService } from './services/ai';

const insights = await aiService.analyzeHealth(userId, {
  bmi: 26.5,
  avgCalories: 2200,
  avgSteps: 6500,
  avgWater: 1.8,
  avgSleep: 6.2,
});

console.log(insights);
// Array of health insights với recommendations
```

### 6. Customization

#### Thay đổi màu chính
```typescript
// Tìm và thay thế trong code:
#22C55E  →  Your green color
#2563EB  →  Your blue color
```

#### Thay đổi font
```css
/* src/styles/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

```css
/* src/styles/theme.css */
body {
  font-family: 'YourFont', sans-serif;
}
```

#### Thay đổi border-radius
```typescript
// Tìm borderRadius: 16 và thay bằng giá trị khác
borderRadius: 12  // Rounded ít hơn
borderRadius: 20  // Rounded nhiều hơn
```

### 7. Development Tips

#### Hot Reload
```bash
# App tự động reload khi code thay đổi
pnpm dev  # hoặc npm run dev
```

#### Debug với React DevTools
1. Cài React Developer Tools extension
2. Mở DevTools → Tab "Components"
3. Inspect component state và props
4. Check context values

#### Performance Profiling
1. DevTools → Tab "Profiler"
2. Click Record
3. Tương tác với app
4. Stop recording
5. Analyze performance

### 8. Common Tasks

#### Thêm food entry mới
```typescript
import { foodDiaryAPI } from './services/api';

const newEntry = await foodDiaryAPI.add({
  userId: "user@example.com",
  date: "2026-03-04",
  time: "12:30",
  mealType: "lunch",
  foodName: "Cơm gà",
  calories: 550,
  protein: 35,
  carbs: 70,
  fat: 15,
});
```

#### Update health metric
```typescript
import { healthMetricsAPI } from './services/api';

const today = new Date().toISOString().split('T')[0];

const metric = await healthMetricsAPI.add({
  userId: "user@example.com",
  date: today,
  weight: 72,
  height: 170,
  bmi: 24.9,
  calories: 2000,
  steps: 8500,
  water: 2.2,
  sleep: 7.5,
});
```

#### Create AI conversation
```typescript
import { conversationAPI } from './services/ai';

const conversation = await conversationAPI.create("user@example.com");

const withMessage = await conversationAPI.addMessage(
  conversation.id,
  {
    role: "user",
    content: "Tôi muốn giảm 5kg trong 2 tháng"
  }
);
```

### 9. Troubleshooting

#### Không thấy dữ liệu?
```javascript
// Check localStorage
console.log(localStorage.getItem('vitatrack_health_metrics'));

// Reinitialize demo data
import { initializeDemoData } from './services/api';
initializeDemoData("your-user-id");
```

#### Charts không hiển thị?
- Check console for errors
- Verify data format matches chart requirements
- Ensure Recharts is installed: `pnpm list recharts`

#### AI không response?
- Check network tab (mock có delay 1-2s)
- Verify message format
- Check console for errors

### 10. Next Steps

#### Development
1. ✅ Làm quen với code structure
2. ✅ Test tất cả features
3. ✅ Đọc VERSION2_README.md
4. ⏳ Setup Supabase (optional)
5. ⏳ Integrate OpenAI (optional)
6. ⏳ Deploy to Vercel

#### Production
1. Setup environment variables
2. Configure Supabase
3. Add real AI APIs
4. Setup monitoring (Sentry)
5. Add analytics (Google Analytics)
6. Deploy!

---

## 🎓 Learning Resources

### React Hooks
- [React Hooks Documentation](https://react.dev/reference/react)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Supabase
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- [Supabase + React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

### OpenAI
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [GPT Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)

---

## 💡 Pro Tips

1. **Use TypeScript**: Code đã có full types, leverage nó!
2. **Mock First**: Test với mock data trước khi integrate API
3. **Console.log**: Debug bằng console.log trong services
4. **DevTools**: Sử dụng React DevTools để inspect state
5. **localStorage**: Dùng DevTools để xem/edit localStorage
6. **Error Handling**: Luôn wrap API calls trong try-catch
7. **Loading States**: Luôn show loading khi fetch data
8. **Optimistic UI**: Update UI trước, sync sau
9. **Validation**: Validate data trước khi lưu
10. **Comments**: Đọc comments trong code để hiểu logic

---

## 🐛 Known Issues & Limitations

### Current Limitations
- Mock AI responses (not real AI yet)
- LocalStorage limit (5-10MB depending on browser)
- No real-time sync (single device only)
- No user authentication (demo mode)
- No image upload to cloud (local only)

### Planned Fixes in V3
- Real AI integration
- Cloud storage
- Multi-device sync
- Real authentication
- Offline mode with sync

---

## 📞 Need Help?

- 📖 Read: VERSION2_README.md (comprehensive guide)
- 📋 Check: CHANGELOG_V2.md (what's new)
- 💬 Ask: Check code comments
- 🔍 Debug: Use browser DevTools
- 📝 Document: Add comments for future you

---

**Happy Coding! 🎉**

*Last updated: March 4, 2026*
*Version: 2.0.0*
