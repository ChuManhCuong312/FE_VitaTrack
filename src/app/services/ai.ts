// AI Service - Sẵn sàng tích hợp với AI API thực (OpenAI, Google AI, etc.)
// Version 2: Mock AI responses với cấu trúc sẵn sàng cho production

export interface FoodRecognitionResult {
  foodName: string;
  confidence: number;
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
  };
  servingSize: string;
  alternatives?: Array<{
    name: string;
    confidence: number;
  }>;
}

export interface AIConversation {
  id: string;
  userId: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface HealthInsight {
  type: "warning" | "success" | "info" | "recommendation";
  title: string;
  message: string;
  metrics?: string[];
  actionable?: boolean;
}

// AI Service API
export const aiService = {
  // Nhận diện món ăn từ ảnh
  recognizeFood: async (imageFile: File): Promise<FoodRecognitionResult> => {
    await simulateDelay(1500);
    
    // TODO: Tích hợp với AI API thực
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // const response = await fetch('YOUR_AI_API_ENDPOINT', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
    // });
    // return response.json();
    
    // Mock response
    return getMockFoodRecognition();
  },

  // Chat với AI Assistant
  chat: async (message: string, conversationId?: string): Promise<AIMessage> => {
    await simulateDelay(1000);
    
    // TODO: Tích hợp với AI API thực (OpenAI, Claude, etc.)
    // const response = await fetch('YOUR_AI_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify({
    //     message,
    //     conversationId,
    //     systemPrompt: 'Bạn là trợ lý sức khỏe và dinh dưỡng...'
    //   })
    // });
    // return response.json();
    
    // Mock response
    return getMockAIResponse(message);
  },

  // Phân tích sức khỏe và đưa ra insights
  analyzeHealth: async (userId: string, metrics: any): Promise<HealthInsight[]> => {
    await simulateDelay(800);
    
    // TODO: Tích hợp với AI để phân tích thông minh hơn
    
    const insights: HealthInsight[] = [];
    
    // Phân tích BMI
    if (metrics.bmi > 25) {
      insights.push({
        type: "warning",
        title: "BMI cao hơn mức khuyến nghị",
        message: "Chỉ số BMI của bạn đang ở mức 26.5, cao hơn ngưỡng lý tưởng. Hãy cân nhắc điều chỉnh chế độ ăn và tăng cường vận động.",
        metrics: ["BMI", "Cân nặng"],
        actionable: true,
      });
    }
    
    // Phân tích calories
    if (metrics.avgCalories > 2500) {
      insights.push({
        type: "info",
        title: "Lượng calo tiêu thụ cao",
        message: "Bạn đang tiêu thụ trung bình 2,650 calo/ngày. Với mục tiêu giảm cân, nên giảm xuống 2,000-2,200 calo.",
        metrics: ["Calories"],
        actionable: true,
      });
    }
    
    // Phân tích bước chân
    if (metrics.avgSteps < 8000) {
      insights.push({
        type: "recommendation",
        title: "Tăng hoạt động thể chất",
        message: "Trung bình 6,500 bước/ngày. Hãy cố gắng đạt mục tiêu 10,000 bước để cải thiện sức khỏe tim mạch.",
        metrics: ["Bước chân"],
        actionable: true,
      });
    } else {
      insights.push({
        type: "success",
        title: "Hoạt động thể chất tốt!",
        message: "Tuyệt vời! Bạn đang duy trì trung bình 11,200 bước mỗi ngày.",
        metrics: ["Bước chân"],
        actionable: false,
      });
    }
    
    // Phân tích nước
    if (metrics.avgWater < 2) {
      insights.push({
        type: "warning",
        title: "Cần uống nhiều nước hơn",
        message: "Bạn chỉ uống trung bình 1.5L nước/ngày. Nên tăng lên 2-2.5L để đảm bảo cơ thể được hydrat hóa tốt.",
        metrics: ["Nước"],
        actionable: true,
      });
    }
    
    // Phân tích giấc ngủ
    if (metrics.avgSleep < 7) {
      insights.push({
        type: "warning",
        title: "Thiếu ngủ",
        message: "Giấc ngủ trung bình của bạn là 6.2 giờ/đêm. Điều này có thể ảnh hưởng đến quá trình giảm cân và sức khỏe tổng thể.",
        metrics: ["Giấc ngủ"],
        actionable: true,
      });
    }
    
    return insights;
  },

  // Tạo kế hoạch dinh dưỡng
  generateMealPlan: async (
    preferences: {
      targetCalories: number;
      dietType?: string;
      allergies?: string[];
      mealsPerDay: number;
    }
  ): Promise<any> => {
    await simulateDelay(2000);
    
    // TODO: Tích hợp AI để tạo meal plan thông minh
    
    return getMockMealPlan(preferences);
  },

  // Đề xuất bài tập
  suggestWorkout: async (
    userProfile: {
      fitnessLevel: string;
      goals: string[];
      availableTime: number;
    }
  ): Promise<any> => {
    await simulateDelay(1500);
    
    // TODO: Tích hợp AI để đề xuất workout
    
    return getMockWorkoutPlan(userProfile);
  },
};

// Conversation Management
const STORAGE_KEY_AI = "vitatrack_ai_conversations";

export const conversationAPI = {
  getAll: async (userId: string): Promise<AIConversation[]> => {
    await simulateDelay();
    const conversations = getFromStorage<AIConversation>(STORAGE_KEY_AI);
    return conversations.filter(c => c.userId === userId);
  },

  get: async (conversationId: string): Promise<AIConversation | null> => {
    await simulateDelay();
    const conversations = getFromStorage<AIConversation>(STORAGE_KEY_AI);
    return conversations.find(c => c.id === conversationId) || null;
  },

  create: async (userId: string): Promise<AIConversation> => {
    await simulateDelay();
    const conversations = getFromStorage<AIConversation>(STORAGE_KEY_AI);
    const newConversation: AIConversation = {
      id: generateId(),
      userId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    conversations.push(newConversation);
    saveToStorage(STORAGE_KEY_AI, conversations);
    return newConversation;
  },

  addMessage: async (conversationId: string, message: Omit<AIMessage, "id" | "timestamp">): Promise<AIConversation> => {
    await simulateDelay();
    const conversations = getFromStorage<AIConversation>(STORAGE_KEY_AI);
    const conversation = conversations.find(c => c.id === conversationId);
    
    if (!conversation) throw new Error("Conversation not found");
    
    const newMessage: AIMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    
    conversation.messages.push(newMessage);
    conversation.updatedAt = new Date().toISOString();
    
    saveToStorage(STORAGE_KEY_AI, conversations);
    return conversation;
  },

  delete: async (conversationId: string): Promise<void> => {
    await simulateDelay();
    const conversations = getFromStorage<AIConversation>(STORAGE_KEY_AI);
    const filtered = conversations.filter(c => c.id !== conversationId);
    saveToStorage(STORAGE_KEY_AI, filtered);
  },
};

// Mock Data Functions
function getMockFoodRecognition(): FoodRecognitionResult {
  const foods = [
    {
      foodName: "Phở bò",
      calories: 450,
      protein: 22,
      carbs: 65,
      fat: 12,
      fiber: 3,
      sugar: 4,
      servingSize: "1 tô (500g)",
    },
    {
      foodName: "Cơm gà",
      calories: 550,
      protein: 35,
      carbs: 70,
      fat: 15,
      fiber: 2,
      sugar: 2,
      servingSize: "1 đĩa (400g)",
    },
    {
      foodName: "Bánh mì thịt",
      calories: 380,
      protein: 18,
      carbs: 42,
      fat: 16,
      fiber: 2,
      sugar: 5,
      servingSize: "1 ổ (200g)",
    },
    {
      foodName: "Salad trộn",
      calories: 250,
      protein: 12,
      carbs: 20,
      fat: 14,
      fiber: 5,
      sugar: 8,
      servingSize: "1 bát (300g)",
    },
  ];
  
  const selected = foods[Math.floor(Math.random() * foods.length)];
  
  return {
    foodName: selected.foodName,
    confidence: 0.85 + Math.random() * 0.1,
    nutritionInfo: {
      calories: selected.calories,
      protein: selected.protein,
      carbs: selected.carbs,
      fat: selected.fat,
      fiber: selected.fiber,
      sugar: selected.sugar,
    },
    servingSize: selected.servingSize,
    alternatives: foods
      .filter(f => f.foodName !== selected.foodName)
      .slice(0, 2)
      .map(f => ({
        name: f.foodName,
        confidence: 0.6 + Math.random() * 0.2,
      })),
  };
}

function getMockAIResponse(userMessage: string): AIMessage {
  const lowerMessage = userMessage.toLowerCase();
  
  let response = "";
  
  if (lowerMessage.includes("giảm cân") || lowerMessage.includes("giảm béo")) {
    response = "Để giảm cân hiệu quả và bền vững, tôi khuyên bạn:\n\n1. **Tạo thâm hụt calo hợp lý**: Giảm 300-500 calo/ngày so với nhu cầu để giảm 0.5-1kg/tuần\n2. **Ăn đủ protein**: 1.6-2.2g protein/kg cân nặng để giữ cơ\n3. **Tập luyện kết hợp**: Cardio + kháng lực 4-5 buổi/tuần\n4. **Uống đủ nước**: 2-3 lít/ngày\n5. **Ngủ đủ giấc**: 7-9 tiếng/đêm\n\nBạn muốn tôi tạo kế hoạch chi tiết cho bạn không?";
  } else if (lowerMessage.includes("bmi") || lowerMessage.includes("cân nặng")) {
    response = "Dựa vào thông tin của bạn:\n- Chiều cao: 170cm\n- Cân nặng hiện tại: 72kg\n- BMI: 24.9 (Bình thường)\n- Cân nằng lý tưởng: 58-72kg\n\nBMI của bạn đang ở mức khá tốt! Nếu muốn cải thiện thành phần cơ thể, hãy tập trung vào:\n- Tăng cơ bằng tập tạ\n- Giảm mỡ bằng cardio vừa phải\n- Ăn đủ protein";
  } else if (lowerMessage.includes("menu") || lowerMessage.includes("thực đơn")) {
    response = "Đây là gợi ý thực đơn 1 ngày (2000 calo):\n\n**Sáng (500 calo)**\n- 2 quả trứng + 1 bát cháo yến mạch + 1 quả chuối\n\n**Trưa (650 calo)**\n- 150g ức gà + 1 bát cơm gạo lứt + rau xanh + dầu oliu\n\n**Chiều (200 calo)**\n- 1 hộp sữa chua Hy Lạp + 30g hạt hỗn hợp\n\n**Tối (550 calo)**\n- 150g cá hồi + khoai lang + salad\n\n**Xế (100 calo)**\n- 1 quả táo hoặc protein shake\n\nBạn có dị ứng thực phẩm nào không?";
  } else if (lowerMessage.includes("tập") || lowerMessage.includes("exercise")) {
    response = "Gợi ý lịch tập cho người mới bắt đầu:\n\n**Thứ 2, 4, 6: Tập tạ toàn thân**\n- Squat: 3 sets x 12 reps\n- Push-up: 3 sets x 10 reps\n- Lunges: 3 sets x 10 reps/chân\n- Plank: 3 sets x 30s\n\n**Thứ 3, 5: Cardio**\n- Chạy bộ nhẹ: 30 phút\n- Hoặc đạp xe: 40 phút\n\n**Thứ 7: Active recovery**\n- Yoga hoặc đi bộ nhẹ\n\n**Chủ nhật: Nghỉ ngơi**\n\nHãy khởi động 5-10 phút trước mỗi buổi tập!";
  } else {
    response = "Xin chào! Tôi là trợ lý sức khỏe VitaTrack. Tôi có thể giúp bạn:\n\n✓ Tư vấn dinh dưỡng và giảm cân\n✓ Phân tích chỉ số sức khỏe (BMI, calo, v.v.)\n✓ Đề xuất thực đơn phù hợp\n✓ Lên kế hoạch tập luyện\n✓ Trả lời các câu hỏi về sức khỏe\n\nBạn cần tư vấn về vấn đề gì?";
  }
  
  return {
    id: generateId(),
    role: "assistant",
    content: response,
    timestamp: new Date().toISOString(),
  };
}

function getMockMealPlan(preferences: any) {
  return {
    totalCalories: preferences.targetCalories,
    meals: [
      {
        type: "breakfast",
        name: "Bữa sáng giàu protein",
        calories: Math.round(preferences.targetCalories * 0.25),
        items: ["2 quả trứng luộc", "1 bát yến mạch", "1 quả chuối", "Sữa hạnh nhân"],
      },
      {
        type: "lunch",
        name: "Bữa trưa cân bằng",
        calories: Math.round(preferences.targetCalories * 0.35),
        items: ["150g ức gà", "Cơm gạo lứt", "Rau củ luộc", "Dầu oliu"],
      },
      {
        type: "snack",
        name: "Bữa phụ",
        calories: Math.round(preferences.targetCalories * 0.1),
        items: ["Sữa chua Hy Lạp", "Hạt hỗn hợp"],
      },
      {
        type: "dinner",
        name: "Bữa tối nhẹ",
        calories: Math.round(preferences.targetCalories * 0.3),
        items: ["Cá hồi nướng", "Salad", "Khoai lang"],
      },
    ],
  };
}

function getMockWorkoutPlan(userProfile: any) {
  return {
    duration: userProfile.availableTime,
    exercises: [
      { name: "Chạy bộ", duration: 20, calories: 200 },
      { name: "Squat", sets: 3, reps: 15, calories: 50 },
      { name: "Push-up", sets: 3, reps: 10, calories: 30 },
      { name: "Plank", sets: 3, duration: 30, calories: 20 },
    ],
    totalCalories: 300,
  };
}

// Helpers
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFromStorage<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}
