# VitaTrack Version 2.0 - Technical Documentation

## 🎉 Tổng quan Version 2

VitaTrack Version 2.0 là bản nâng cấp lớn với tích hợp services layer, state management nâng cao, và sẵn sàng cho AI/Backend API.

## ✨ Tính năng mới Version 2

### 1. **Service Layer Architecture**
- `/src/app/services/api.ts` - RESTful API service với localStorage persistence
- `/src/app/services/ai.ts` - AI service sẵn sàng tích hợp OpenAI/Google AI/Claude
- Structured data models cho tất cả entities
- Mock data với realistic delays để mô phỏng API calls

### 2. **Custom React Hooks**
- `useHealthData` - Quản lý health metrics với real-time updates
- `useFoodDiary` - Food diary management với analytics
- `useAIChat` - AI conversation management với history

### 3. **AI Features (Mock + Ready for Production)**

#### **Trợ lý AI nâng cao**
- Conversation history với persistence
- Contextual responses dựa trên user data
- Health insights và recommendations
- Sẵn sàng tích hợp OpenAI API, Claude, hoặc Google AI

#### **Food Image Recognition** 
- Component `FoodImageRecognition.tsx`
- Drag & drop image upload
- Mock AI recognition với realistic nutrition data
- Sẵn sàng tích hợp với Vision AI APIs (Google Cloud Vision, AWS Rekognition, v.v.)

#### **Health Analytics AI**
- Automatic insights generation
- Trend analysis (BMI, calories, steps, water, sleep)
- Personalized recommendations
- Alert system cho health metrics

### 4. **Data Management**

#### **LocalStorage Persistence**
```typescript
// Tất cả dữ liệu được lưu tự động vào localStorage
- vitatrack_user_profile
- vitatrack_health_metrics
- vitatrack_food_entries
- vitatrack_exercise_entries
- vitatrack_chat_messages
- vitatrack_ai_conversations
```

#### **Auto-Generated Demo Data**
- 30 ngày health metrics khi user đăng nhập lần đầu
- Realistic data với variations
- Easy reset và re-initialization

### 5. **Enhanced Components**

#### **Overview Dashboard**
- Real-time data từ hooks
- AI-powered insights cards
- Dynamic charts dựa trên actual data
- Loading states và error handling
- Empty states với meaningful messages

#### **AI Assistant**
- Full conversation interface
- Message history với timestamps
- Typing indicators
- Suggestions chips
- Auto-scroll to latest message

## 🏗️ Kiến trúc mới

```
src/app/
├── services/          # Service layer
│   ├── api.ts        # Data API (sẵn sàng thay bằng Supabase/Backend)
│   └── ai.ts         # AI services (sẵn sàng tích hợp AI APIs)
├── hooks/            # Custom React hooks
│   ├── useHealthData.ts
│   ├── useFoodDiary.ts
│   └── useAIChat.ts
├── components/       # Shared components
│   └── FoodImageRecognition.tsx
├── context/          # React Context (Auth, App state)
└── pages/           # Page components
```

## 🔌 Tích hợp Backend (Sẵn sàng cho Production)

### Cách tích hợp Supabase

1. **Cài đặt Supabase Client**
```bash
pnpm install @supabase/supabase-js
```

2. **Tạo Supabase Client**
```typescript
// src/app/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

3. **Thay thế mock API**
```typescript
// src/app/services/api.ts - Thay thế các functions
export const healthMetricsAPI = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  // ... other methods
};
```

### Cách tích hợp OpenAI cho AI Assistant

1. **Cài đặt OpenAI SDK**
```bash
pnpm install openai
```

2. **Update AI Service**
```typescript
// src/app/services/ai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo
});

export const aiService = {
  chat: async (message: string, conversationId?: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Bạn là trợ lý sức khỏe và dinh dưỡng chuyên nghiệp..."
        },
        {
          role: "user",
          content: message
        }
      ],
    });
    
    return {
      id: generateId(),
      role: "assistant" as const,
      content: response.choices[0].message.content || "",
      timestamp: new Date().toISOString(),
    };
  },
};
```

### Cách tích hợp Google Cloud Vision cho Food Recognition

```typescript
// src/app/services/ai.ts
export const aiService = {
  recognizeFood: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Option 1: Google Cloud Vision
    const response = await fetch('YOUR_CLOUD_FUNCTION_URL', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${YOUR_API_KEY}`
      }
    });
    
    // Option 2: Custom ML Model
    // Option 3: Third-party API (Clarifai, etc.)
    
    return response.json();
  },
};
```

## 📊 Database Schema (Supabase)

```sql
-- Users table (handled by Supabase Auth)

-- User Profiles
create table user_profiles (
  id uuid references auth.users primary key,
  name text,
  age integer,
  gender text,
  height numeric,
  weight numeric,
  target_weight numeric,
  activity_level text,
  created_at timestamp with time zone default now()
);

-- Health Metrics
create table health_metrics (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  date date not null,
  weight numeric,
  height numeric,
  bmi numeric,
  calories numeric,
  steps integer,
  water numeric,
  sleep numeric,
  created_at timestamp with time zone default now()
);

-- Food Entries
create table food_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  date date not null,
  time time not null,
  meal_type text not null,
  food_name text not null,
  calories numeric,
  protein numeric,
  carbs numeric,
  fat numeric,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Exercise Entries
create table exercise_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  date date not null,
  time time not null,
  type text not null,
  duration integer,
  calories_burned numeric,
  intensity text,
  created_at timestamp with time zone default now()
);

-- AI Conversations
create table ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  messages jsonb[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table user_profiles enable row level security;
alter table health_metrics enable row level security;
alter table food_entries enable row level security;
alter table exercise_entries enable row level security;
alter table ai_conversations enable row level security;

-- Create policies (users can only access their own data)
create policy "Users can view own profile" on user_profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on user_profiles
  for update using (auth.uid() = id);

-- Repeat for other tables...
```

## 🔐 Environment Variables

Tạo file `.env.local`:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (optional)
VITE_OPENAI_API_KEY=your_openai_api_key

# Google Cloud Vision (optional)
VITE_GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
```

## 📈 Performance Optimizations

### Current Optimizations
- LocalStorage caching
- Lazy loading của components
- Memoized calculations
- Debounced search inputs
- Optimistic UI updates

### Recommended for Production
- React Query cho server state management
- Virtual scrolling cho long lists
- Code splitting cho routes
- Image optimization
- Service Worker cho offline support

## 🧪 Testing Strategy

### Recommended Testing Setup
```bash
pnpm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Example Tests
```typescript
// src/app/hooks/__tests__/useHealthData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useHealthData } from '../useHealthData';

describe('useHealthData', () => {
  it('should load health metrics', async () => {
    const { result } = renderHook(() => useHealthData('test-user'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.metrics.length).toBeGreaterThan(0);
  });
});
```

## 🚀 Deployment

### Recommended Platforms
1. **Vercel** (Recommended) - Zero config deployment
2. **Netlify** - Good for static sites
3. **Firebase Hosting** - If using Firebase backend
4. **AWS Amplify** - Enterprise solution

### Build Commands
```bash
# Production build
pnpm build

# Preview build locally
pnpm preview
```

## 📝 Migration Guide (V1 → V2)

### Dữ liệu hiện tại sẽ được migrate tự động vào localStorage
1. User login → Initialize demo data
2. Data persists across sessions
3. Easy export/import functionality (có thể thêm)

### Breaking Changes
- `AppContext` giờ chỉ handle authentication
- Data fetching được move sang hooks
- Mock responses có delays (có thể điều chỉnh)

## 🎯 Next Steps

### Immediate (Production Ready)
1. ✅ Tích hợp Supabase authentication
2. ✅ Tích hợp OpenAI cho AI Assistant
3. ✅ Deploy lên Vercel/Netlify
4. ✅ Setup custom domain

### Short-term
1. Add export/import data feature
2. Add data visualization export (PDF/PNG)
3. Email notifications
4. Mobile app (React Native reuse components)

### Long-term
1. Expert consultation booking system
2. Payment integration
3. Premium features
4. Social features (share progress)
5. Wearable device integration (Fitbit, Apple Watch)

## 🔗 API Integration Examples

### Ví dụ integration với nutrition API
```typescript
// Calorie Ninjas API, Nutritionix, etc.
const response = await fetch(
  `https://api.calorieninjas.com/v1/nutrition?query=${foodName}`,
  {
    headers: { 'X-Api-Key': YOUR_API_KEY }
  }
);
```

### Ví dụ integration với fitness tracker
```typescript
// Google Fit, Fitbit API, etc.
const stepsData = await fetch(
  'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
  {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: JSON.stringify({ ... })
  }
);
```

## 💡 Tips & Best Practices

1. **Data Validation**: Luôn validate data từ user input và API
2. **Error Handling**: Implement proper error boundaries
3. **Loading States**: Luôn show feedback cho user
4. **Accessibility**: Đảm bảo app accessible cho mọi người
5. **SEO**: Thêm meta tags và structured data
6. **Analytics**: Integrate Google Analytics hoặc Mixpanel
7. **Monitoring**: Setup Sentry cho error tracking

## 📞 Support & Resources

- Supabase Docs: https://supabase.com/docs
- OpenAI API: https://platform.openai.com/docs
- React Docs: https://react.dev
- Recharts: https://recharts.org

---

**Version 2.0** - Built with ❤️ by VitaTrack Team
Last Updated: March 4, 2026
