const aiService = {
  // Nhận diện món ăn từ ảnh
  recognizeFood: async (imageFile) => {
    await simulateDelay(1500);
    return getMockFoodRecognition();
  },
  // Chat với AI Assistant
  chat: async (message, conversationId) => {
    await simulateDelay(1e3);
    return getMockAIResponse(message);
  },
  // Phân tích sức khỏe và đưa ra insights
  analyzeHealth: async (userId, metrics) => {
    await simulateDelay(800);
    const insights = [];
    if (metrics.bmi > 25) {
      insights.push({
        type: "warning",
        title: "BMI cao h\u01A1n m\u1EE9c khuy\u1EBFn ngh\u1ECB",
        message: "Ch\u1EC9 s\u1ED1 BMI c\u1EE7a b\u1EA1n \u0111ang \u1EDF m\u1EE9c 26.5, cao h\u01A1n ng\u01B0\u1EE1ng l\xFD t\u01B0\u1EDFng. H\xE3y c\xE2n nh\u1EAFc \u0111i\u1EC1u ch\u1EC9nh ch\u1EBF \u0111\u1ED9 \u0103n v\xE0 t\u0103ng c\u01B0\u1EDDng v\u1EADn \u0111\u1ED9ng.",
        metrics: ["BMI", "C\xE2n n\u1EB7ng"],
        actionable: true
      });
    }
    if (metrics.avgCalories > 2500) {
      insights.push({
        type: "info",
        title: "L\u01B0\u1EE3ng calo ti\xEAu th\u1EE5 cao",
        message: "B\u1EA1n \u0111ang ti\xEAu th\u1EE5 trung b\xECnh 2,650 calo/ng\xE0y. V\u1EDBi m\u1EE5c ti\xEAu gi\u1EA3m c\xE2n, n\xEAn gi\u1EA3m xu\u1ED1ng 2,000-2,200 calo.",
        metrics: ["Calories"],
        actionable: true
      });
    }
    if (metrics.avgSteps < 8e3) {
      insights.push({
        type: "recommendation",
        title: "T\u0103ng ho\u1EA1t \u0111\u1ED9ng th\u1EC3 ch\u1EA5t",
        message: "Trung b\xECnh 6,500 b\u01B0\u1EDBc/ng\xE0y. H\xE3y c\u1ED1 g\u1EAFng \u0111\u1EA1t m\u1EE5c ti\xEAu 10,000 b\u01B0\u1EDBc \u0111\u1EC3 c\u1EA3i thi\u1EC7n s\u1EE9c kh\u1ECFe tim m\u1EA1ch.",
        metrics: ["B\u01B0\u1EDBc ch\xE2n"],
        actionable: true
      });
    } else {
      insights.push({
        type: "success",
        title: "Ho\u1EA1t \u0111\u1ED9ng th\u1EC3 ch\u1EA5t t\u1ED1t!",
        message: "Tuy\u1EC7t v\u1EDDi! B\u1EA1n \u0111ang duy tr\xEC trung b\xECnh 11,200 b\u01B0\u1EDBc m\u1ED7i ng\xE0y.",
        metrics: ["B\u01B0\u1EDBc ch\xE2n"],
        actionable: false
      });
    }
    if (metrics.avgWater < 2) {
      insights.push({
        type: "warning",
        title: "C\u1EA7n u\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc h\u01A1n",
        message: "B\u1EA1n ch\u1EC9 u\u1ED1ng trung b\xECnh 1.5L n\u01B0\u1EDBc/ng\xE0y. N\xEAn t\u0103ng l\xEAn 2-2.5L \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o c\u01A1 th\u1EC3 \u0111\u01B0\u1EE3c hydrat h\xF3a t\u1ED1t.",
        metrics: ["N\u01B0\u1EDBc"],
        actionable: true
      });
    }
    if (metrics.avgSleep < 7) {
      insights.push({
        type: "warning",
        title: "Thi\u1EBFu ng\u1EE7",
        message: "Gi\u1EA5c ng\u1EE7 trung b\xECnh c\u1EE7a b\u1EA1n l\xE0 6.2 gi\u1EDD/\u0111\xEAm. \u0110i\u1EC1u n\xE0y c\xF3 th\u1EC3 \u1EA3nh h\u01B0\u1EDFng \u0111\u1EBFn qu\xE1 tr\xECnh gi\u1EA3m c\xE2n v\xE0 s\u1EE9c kh\u1ECFe t\u1ED5ng th\u1EC3.",
        metrics: ["Gi\u1EA5c ng\u1EE7"],
        actionable: true
      });
    }
    return insights;
  },
  // Tạo kế hoạch dinh dưỡng
  generateMealPlan: async (preferences) => {
    await simulateDelay(2e3);
    return getMockMealPlan(preferences);
  },
  // Đề xuất bài tập
  suggestWorkout: async (userProfile) => {
    await simulateDelay(1500);
    return getMockWorkoutPlan(userProfile);
  }
};
const STORAGE_KEY_AI = "vitatrack_ai_conversations";
const conversationAPI = {
  getAll: async (userId) => {
    await simulateDelay();
    const conversations = getFromStorage(STORAGE_KEY_AI);
    return conversations.filter((c) => c.userId === userId);
  },
  get: async (conversationId) => {
    await simulateDelay();
    const conversations = getFromStorage(STORAGE_KEY_AI);
    return conversations.find((c) => c.id === conversationId) || null;
  },
  create: async (userId) => {
    await simulateDelay();
    const conversations = getFromStorage(STORAGE_KEY_AI);
    const newConversation = {
      id: generateId(),
      userId,
      messages: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    conversations.push(newConversation);
    saveToStorage(STORAGE_KEY_AI, conversations);
    return newConversation;
  },
  addMessage: async (conversationId, message) => {
    await simulateDelay();
    const conversations = getFromStorage(STORAGE_KEY_AI);
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) throw new Error("Conversation not found");
    const newMessage = {
      ...message,
      id: generateId(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    conversation.messages.push(newMessage);
    conversation.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    saveToStorage(STORAGE_KEY_AI, conversations);
    return conversation;
  },
  delete: async (conversationId) => {
    await simulateDelay();
    const conversations = getFromStorage(STORAGE_KEY_AI);
    const filtered = conversations.filter((c) => c.id !== conversationId);
    saveToStorage(STORAGE_KEY_AI, filtered);
  }
};
function getMockFoodRecognition() {
  const foods = [
    {
      foodName: "Ph\u1EDF b\xF2",
      calories: 450,
      protein: 22,
      carbs: 65,
      fat: 12,
      fiber: 3,
      sugar: 4,
      servingSize: "1 t\xF4 (500g)"
    },
    {
      foodName: "C\u01A1m g\xE0",
      calories: 550,
      protein: 35,
      carbs: 70,
      fat: 15,
      fiber: 2,
      sugar: 2,
      servingSize: "1 \u0111\u0129a (400g)"
    },
    {
      foodName: "B\xE1nh m\xEC th\u1ECBt",
      calories: 380,
      protein: 18,
      carbs: 42,
      fat: 16,
      fiber: 2,
      sugar: 5,
      servingSize: "1 \u1ED5 (200g)"
    },
    {
      foodName: "Salad tr\u1ED9n",
      calories: 250,
      protein: 12,
      carbs: 20,
      fat: 14,
      fiber: 5,
      sugar: 8,
      servingSize: "1 b\xE1t (300g)"
    }
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
      sugar: selected.sugar
    },
    servingSize: selected.servingSize,
    alternatives: foods.filter((f) => f.foodName !== selected.foodName).slice(0, 2).map((f) => ({
      name: f.foodName,
      confidence: 0.6 + Math.random() * 0.2
    }))
  };
}
function getMockAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  let response = "";
  if (lowerMessage.includes("gi\u1EA3m c\xE2n") || lowerMessage.includes("gi\u1EA3m b\xE9o")) {
    response = "\u0110\u1EC3 gi\u1EA3m c\xE2n hi\u1EC7u qu\u1EA3 v\xE0 b\u1EC1n v\u1EEFng, t\xF4i khuy\xEAn b\u1EA1n:\n\n1. **T\u1EA1o th\xE2m h\u1EE5t calo h\u1EE3p l\xFD**: Gi\u1EA3m 300-500 calo/ng\xE0y so v\u1EDBi nhu c\u1EA7u \u0111\u1EC3 gi\u1EA3m 0.5-1kg/tu\u1EA7n\n2. **\u0102n \u0111\u1EE7 protein**: 1.6-2.2g protein/kg c\xE2n n\u1EB7ng \u0111\u1EC3 gi\u1EEF c\u01A1\n3. **T\u1EADp luy\u1EC7n k\u1EBFt h\u1EE3p**: Cardio + kh\xE1ng l\u1EF1c 4-5 bu\u1ED5i/tu\u1EA7n\n4. **U\u1ED1ng \u0111\u1EE7 n\u01B0\u1EDBc**: 2-3 l\xEDt/ng\xE0y\n5. **Ng\u1EE7 \u0111\u1EE7 gi\u1EA5c**: 7-9 ti\u1EBFng/\u0111\xEAm\n\nB\u1EA1n mu\u1ED1n t\xF4i t\u1EA1o k\u1EBF ho\u1EA1ch chi ti\u1EBFt cho b\u1EA1n kh\xF4ng?";
  } else if (lowerMessage.includes("bmi") || lowerMessage.includes("c\xE2n n\u1EB7ng")) {
    response = "D\u1EF1a v\xE0o th\xF4ng tin c\u1EE7a b\u1EA1n:\n- Chi\u1EC1u cao: 170cm\n- C\xE2n n\u1EB7ng hi\u1EC7n t\u1EA1i: 72kg\n- BMI: 24.9 (B\xECnh th\u01B0\u1EDDng)\n- C\xE2n n\u1EB1ng l\xFD t\u01B0\u1EDFng: 58-72kg\n\nBMI c\u1EE7a b\u1EA1n \u0111ang \u1EDF m\u1EE9c kh\xE1 t\u1ED1t! N\u1EBFu mu\u1ED1n c\u1EA3i thi\u1EC7n th\xE0nh ph\u1EA7n c\u01A1 th\u1EC3, h\xE3y t\u1EADp trung v\xE0o:\n- T\u0103ng c\u01A1 b\u1EB1ng t\u1EADp t\u1EA1\n- Gi\u1EA3m m\u1EE1 b\u1EB1ng cardio v\u1EEBa ph\u1EA3i\n- \u0102n \u0111\u1EE7 protein";
  } else if (lowerMessage.includes("menu") || lowerMessage.includes("th\u1EF1c \u0111\u01A1n")) {
    response = "\u0110\xE2y l\xE0 g\u1EE3i \xFD th\u1EF1c \u0111\u01A1n 1 ng\xE0y (2000 calo):\n\n**S\xE1ng (500 calo)**\n- 2 qu\u1EA3 tr\u1EE9ng + 1 b\xE1t ch\xE1o y\u1EBFn m\u1EA1ch + 1 qu\u1EA3 chu\u1ED1i\n\n**Tr\u01B0a (650 calo)**\n- 150g \u1EE9c g\xE0 + 1 b\xE1t c\u01A1m g\u1EA1o l\u1EE9t + rau xanh + d\u1EA7u oliu\n\n**Chi\u1EC1u (200 calo)**\n- 1 h\u1ED9p s\u1EEFa chua Hy L\u1EA1p + 30g h\u1EA1t h\u1ED7n h\u1EE3p\n\n**T\u1ED1i (550 calo)**\n- 150g c\xE1 h\u1ED3i + khoai lang + salad\n\n**X\u1EBF (100 calo)**\n- 1 qu\u1EA3 t\xE1o ho\u1EB7c protein shake\n\nB\u1EA1n c\xF3 d\u1ECB \u1EE9ng th\u1EF1c ph\u1EA9m n\xE0o kh\xF4ng?";
  } else if (lowerMessage.includes("t\u1EADp") || lowerMessage.includes("exercise")) {
    response = "G\u1EE3i \xFD l\u1ECBch t\u1EADp cho ng\u01B0\u1EDDi m\u1EDBi b\u1EAFt \u0111\u1EA7u:\n\n**Th\u1EE9 2, 4, 6: T\u1EADp t\u1EA1 to\xE0n th\xE2n**\n- Squat: 3 sets x 12 reps\n- Push-up: 3 sets x 10 reps\n- Lunges: 3 sets x 10 reps/ch\xE2n\n- Plank: 3 sets x 30s\n\n**Th\u1EE9 3, 5: Cardio**\n- Ch\u1EA1y b\u1ED9 nh\u1EB9: 30 ph\xFAt\n- Ho\u1EB7c \u0111\u1EA1p xe: 40 ph\xFAt\n\n**Th\u1EE9 7: Active recovery**\n- Yoga ho\u1EB7c \u0111i b\u1ED9 nh\u1EB9\n\n**Ch\u1EE7 nh\u1EADt: Ngh\u1EC9 ng\u01A1i**\n\nH\xE3y kh\u1EDFi \u0111\u1ED9ng 5-10 ph\xFAt tr\u01B0\u1EDBc m\u1ED7i bu\u1ED5i t\u1EADp!";
  } else {
    response = "Xin ch\xE0o! T\xF4i l\xE0 tr\u1EE3 l\xFD s\u1EE9c kh\u1ECFe VitaTrack. T\xF4i c\xF3 th\u1EC3 gi\xFAp b\u1EA1n:\n\n\u2713 T\u01B0 v\u1EA5n dinh d\u01B0\u1EE1ng v\xE0 gi\u1EA3m c\xE2n\n\u2713 Ph\xE2n t\xEDch ch\u1EC9 s\u1ED1 s\u1EE9c kh\u1ECFe (BMI, calo, v.v.)\n\u2713 \u0110\u1EC1 xu\u1EA5t th\u1EF1c \u0111\u01A1n ph\xF9 h\u1EE3p\n\u2713 L\xEAn k\u1EBF ho\u1EA1ch t\u1EADp luy\u1EC7n\n\u2713 Tr\u1EA3 l\u1EDDi c\xE1c c\xE2u h\u1ECFi v\u1EC1 s\u1EE9c kh\u1ECFe\n\nB\u1EA1n c\u1EA7n t\u01B0 v\u1EA5n v\u1EC1 v\u1EA5n \u0111\u1EC1 g\xEC?";
  }
  return {
    id: generateId(),
    role: "assistant",
    content: response,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function getMockMealPlan(preferences) {
  return {
    totalCalories: preferences.targetCalories,
    meals: [
      {
        type: "breakfast",
        name: "B\u1EEFa s\xE1ng gi\xE0u protein",
        calories: Math.round(preferences.targetCalories * 0.25),
        items: ["2 qu\u1EA3 tr\u1EE9ng lu\u1ED9c", "1 b\xE1t y\u1EBFn m\u1EA1ch", "1 qu\u1EA3 chu\u1ED1i", "S\u1EEFa h\u1EA1nh nh\xE2n"]
      },
      {
        type: "lunch",
        name: "B\u1EEFa tr\u01B0a c\xE2n b\u1EB1ng",
        calories: Math.round(preferences.targetCalories * 0.35),
        items: ["150g \u1EE9c g\xE0", "C\u01A1m g\u1EA1o l\u1EE9t", "Rau c\u1EE7 lu\u1ED9c", "D\u1EA7u oliu"]
      },
      {
        type: "snack",
        name: "B\u1EEFa ph\u1EE5",
        calories: Math.round(preferences.targetCalories * 0.1),
        items: ["S\u1EEFa chua Hy L\u1EA1p", "H\u1EA1t h\u1ED7n h\u1EE3p"]
      },
      {
        type: "dinner",
        name: "B\u1EEFa t\u1ED1i nh\u1EB9",
        calories: Math.round(preferences.targetCalories * 0.3),
        items: ["C\xE1 h\u1ED3i n\u01B0\u1EDBng", "Salad", "Khoai lang"]
      }
    ]
  };
}
function getMockWorkoutPlan(userProfile) {
  return {
    duration: userProfile.availableTime,
    exercises: [
      { name: "Ch\u1EA1y b\u1ED9", duration: 20, calories: 200 },
      { name: "Squat", sets: 3, reps: 15, calories: 50 },
      { name: "Push-up", sets: 3, reps: 10, calories: 30 },
      { name: "Plank", sets: 3, duration: 30, calories: 20 }
    ],
    totalCalories: 300
  };
}
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function simulateDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}
export {
  aiService,
  conversationAPI
};
