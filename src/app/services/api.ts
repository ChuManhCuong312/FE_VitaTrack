// API Service Layer - Sẵn sàng tích hợp với backend thực
// Version 2: Enhanced với localStorage persistence và mock data

export interface HealthMetrics {
  id: string;
  userId: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  calories: number;
  steps: number;
  water: number;
  sleep: number;
}

export interface FoodEntry {
  id: string;
  userId: string;
  date: string;
  time: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}

export interface ExerciseEntry {
  id: string;
  userId: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  intensity: "low" | "medium" | "high";
}

export interface ChatMessage {
  id: string;
  userId: string;
  expertId?: string;
  sender: "user" | "expert" | "ai";
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "expert" | "admin";
  avatar?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  targetWeight?: number;
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very_active";
  healthGoals?: string[];
  allergies?: string[];
  dietPreferences?: string[];
}

// LocalStorage keys
const STORAGE_KEYS = {
  USER_PROFILE: "vitatrack_user_profile",
  HEALTH_METRICS: "vitatrack_health_metrics",
  FOOD_ENTRIES: "vitatrack_food_entries",
  EXERCISE_ENTRIES: "vitatrack_exercise_entries",
  CHAT_MESSAGES: "vitatrack_chat_messages",
  AI_CONVERSATIONS: "vitatrack_ai_conversations",
};

// Helper functions
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// User Profile API
export const userProfileAPI = {
  get: async (userId: string): Promise<UserProfile | null> => {
    await simulateDelay();
    const profiles = getFromStorage<UserProfile>(STORAGE_KEYS.USER_PROFILE);
    return profiles.find(p => p.id === userId) || null;
  },

  update: async (userId: string, data: Partial<UserProfile>): Promise<UserProfile> => {
    await simulateDelay();
    const profiles = getFromStorage<UserProfile>(STORAGE_KEYS.USER_PROFILE);
    const index = profiles.findIndex(p => p.id === userId);
    
    if (index >= 0) {
      profiles[index] = { ...profiles[index], ...data };
    } else {
      profiles.push({ id: userId, ...data } as UserProfile);
    }
    
    saveToStorage(STORAGE_KEYS.USER_PROFILE, profiles);
    return profiles[index >= 0 ? index : profiles.length - 1];
  },
};

// Health Metrics API
export const healthMetricsAPI = {
  getAll: async (userId: string): Promise<HealthMetrics[]> => {
    await simulateDelay();
    const metrics = getFromStorage<HealthMetrics>(STORAGE_KEYS.HEALTH_METRICS);
    return metrics.filter(m => m.userId === userId).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  add: async (data: Omit<HealthMetrics, "id">): Promise<HealthMetrics> => {
    await simulateDelay();
    const metrics = getFromStorage<HealthMetrics>(STORAGE_KEYS.HEALTH_METRICS);
    const newMetric = { ...data, id: generateId() };
    metrics.push(newMetric);
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, metrics);
    return newMetric;
  },

  update: async (id: string, data: Partial<HealthMetrics>): Promise<HealthMetrics> => {
    await simulateDelay();
    const metrics = getFromStorage<HealthMetrics>(STORAGE_KEYS.HEALTH_METRICS);
    const index = metrics.findIndex(m => m.id === id);
    
    if (index >= 0) {
      metrics[index] = { ...metrics[index], ...data };
      saveToStorage(STORAGE_KEYS.HEALTH_METRICS, metrics);
      return metrics[index];
    }
    throw new Error("Metric not found");
  },

  delete: async (id: string): Promise<void> => {
    await simulateDelay();
    const metrics = getFromStorage<HealthMetrics>(STORAGE_KEYS.HEALTH_METRICS);
    const filtered = metrics.filter(m => m.id !== id);
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, filtered);
  },
};

// Food Diary API
export const foodDiaryAPI = {
  getAll: async (userId: string, startDate?: string, endDate?: string): Promise<FoodEntry[]> => {
    await simulateDelay();
    const entries = getFromStorage<FoodEntry>(STORAGE_KEYS.FOOD_ENTRIES);
    let filtered = entries.filter(e => e.userId === userId);
    
    if (startDate) {
      filtered = filtered.filter(e => e.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(e => e.date <= endDate);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()
    );
  },

  add: async (data: Omit<FoodEntry, "id">): Promise<FoodEntry> => {
    await simulateDelay();
    const entries = getFromStorage<FoodEntry>(STORAGE_KEYS.FOOD_ENTRIES);
    const newEntry = { ...data, id: generateId() };
    entries.push(newEntry);
    saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, entries);
    return newEntry;
  },

  update: async (id: string, data: Partial<FoodEntry>): Promise<FoodEntry> => {
    await simulateDelay();
    const entries = getFromStorage<FoodEntry>(STORAGE_KEYS.FOOD_ENTRIES);
    const index = entries.findIndex(e => e.id === id);
    
    if (index >= 0) {
      entries[index] = { ...entries[index], ...data };
      saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, entries);
      return entries[index];
    }
    throw new Error("Food entry not found");
  },

  delete: async (id: string): Promise<void> => {
    await simulateDelay();
    const entries = getFromStorage<FoodEntry>(STORAGE_KEYS.FOOD_ENTRIES);
    const filtered = entries.filter(e => e.id !== id);
    saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, filtered);
  },
};

// Exercise API
export const exerciseAPI = {
  getAll: async (userId: string, startDate?: string, endDate?: string): Promise<ExerciseEntry[]> => {
    await simulateDelay();
    const entries = getFromStorage<ExerciseEntry>(STORAGE_KEYS.EXERCISE_ENTRIES);
    let filtered = entries.filter(e => e.userId === userId);
    
    if (startDate) {
      filtered = filtered.filter(e => e.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(e => e.date <= endDate);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()
    );
  },

  add: async (data: Omit<ExerciseEntry, "id">): Promise<ExerciseEntry> => {
    await simulateDelay();
    const entries = getFromStorage<ExerciseEntry>(STORAGE_KEYS.EXERCISE_ENTRIES);
    const newEntry = { ...data, id: generateId() };
    entries.push(newEntry);
    saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, entries);
    return newEntry;
  },

  update: async (id: string, data: Partial<ExerciseEntry>): Promise<ExerciseEntry> => {
    await simulateDelay();
    const entries = getFromStorage<ExerciseEntry>(STORAGE_KEYS.EXERCISE_ENTRIES);
    const index = entries.findIndex(e => e.id === id);
    
    if (index >= 0) {
      entries[index] = { ...entries[index], ...data };
      saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, entries);
      return entries[index];
    }
    throw new Error("Exercise entry not found");
  },

  delete: async (id: string): Promise<void> => {
    await simulateDelay();
    const entries = getFromStorage<ExerciseEntry>(STORAGE_KEYS.EXERCISE_ENTRIES);
    const filtered = entries.filter(e => e.id !== id);
    saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, filtered);
  },
};

// Chat API
export const chatAPI = {
  getMessages: async (userId: string, expertId?: string): Promise<ChatMessage[]> => {
    await simulateDelay();
    const messages = getFromStorage<ChatMessage>(STORAGE_KEYS.CHAT_MESSAGES);
    let filtered = messages.filter(m => m.userId === userId);
    
    if (expertId) {
      filtered = filtered.filter(m => m.expertId === expertId);
    }
    
    return filtered.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  },

  sendMessage: async (data: Omit<ChatMessage, "id" | "timestamp">): Promise<ChatMessage> => {
    await simulateDelay();
    const messages = getFromStorage<ChatMessage>(STORAGE_KEYS.CHAT_MESSAGES);
    const newMessage = {
      ...data,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    messages.push(newMessage);
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages);
    return newMessage;
  },

  markAsRead: async (messageIds: string[]): Promise<void> => {
    await simulateDelay();
    const messages = getFromStorage<ChatMessage>(STORAGE_KEYS.CHAT_MESSAGES);
    messages.forEach(msg => {
      if (messageIds.includes(msg.id)) {
        msg.isRead = true;
      }
    });
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages);
  },
};

// Utility functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize demo data if empty
export const initializeDemoData = (userId: string) => {
  const healthMetrics = getFromStorage<HealthMetrics>(STORAGE_KEYS.HEALTH_METRICS);
  
  if (healthMetrics.filter(m => m.userId === userId).length === 0) {
    // Thêm dữ liệu demo 30 ngày
    const demoMetrics: HealthMetrics[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      demoMetrics.push({
        id: generateId(),
        userId,
        date: dateStr,
        weight: 70 + Math.random() * 5 - 2.5,
        height: 170,
        bmi: 24 + Math.random() * 2 - 1,
        calories: 1800 + Math.floor(Math.random() * 400),
        steps: 6000 + Math.floor(Math.random() * 6000),
        water: 1.5 + Math.random() * 1.5,
        sleep: 6 + Math.random() * 3,
      });
    }
    
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, [...healthMetrics, ...demoMetrics]);
  }
};
