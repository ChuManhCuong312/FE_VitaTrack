const STORAGE_KEYS = {
  USER_PROFILE: "vitatrack_user_profile",
  HEALTH_METRICS: "vitatrack_health_metrics",
  FOOD_ENTRIES: "vitatrack_food_entries",
  EXERCISE_ENTRIES: "vitatrack_exercise_entries",
  CHAT_MESSAGES: "vitatrack_chat_messages",
  AI_CONVERSATIONS: "vitatrack_ai_conversations"
};
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
const userProfileAPI = {
  get: async (userId) => {
    await simulateDelay();
    const profiles = getFromStorage(STORAGE_KEYS.USER_PROFILE);
    return profiles.find((p) => p.id === userId) || null;
  },
  update: async (userId, data) => {
    await simulateDelay();
    const profiles = getFromStorage(STORAGE_KEYS.USER_PROFILE);
    const index = profiles.findIndex((p) => p.id === userId);
    if (index >= 0) {
      profiles[index] = { ...profiles[index], ...data };
    } else {
      profiles.push({ id: userId, ...data });
    }
    saveToStorage(STORAGE_KEYS.USER_PROFILE, profiles);
    return profiles[index >= 0 ? index : profiles.length - 1];
  }
};
const healthMetricsAPI = {
  getAll: async (userId) => {
    await simulateDelay();
    const metrics = getFromStorage(STORAGE_KEYS.HEALTH_METRICS);
    return metrics.filter((m) => m.userId === userId).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
  add: async (data) => {
    await simulateDelay();
    const metrics = getFromStorage(STORAGE_KEYS.HEALTH_METRICS);
    const newMetric = { ...data, id: generateId() };
    metrics.push(newMetric);
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, metrics);
    return newMetric;
  },
  update: async (id, data) => {
    await simulateDelay();
    const metrics = getFromStorage(STORAGE_KEYS.HEALTH_METRICS);
    const index = metrics.findIndex((m) => m.id === id);
    if (index >= 0) {
      metrics[index] = { ...metrics[index], ...data };
      saveToStorage(STORAGE_KEYS.HEALTH_METRICS, metrics);
      return metrics[index];
    }
    throw new Error("Metric not found");
  },
  delete: async (id) => {
    await simulateDelay();
    const metrics = getFromStorage(STORAGE_KEYS.HEALTH_METRICS);
    const filtered = metrics.filter((m) => m.id !== id);
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, filtered);
  }
};
const foodDiaryAPI = {
  getAll: async (userId, startDate, endDate) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.FOOD_ENTRIES);
    let filtered = entries.filter((e) => e.userId === userId);
    if (startDate) {
      filtered = filtered.filter((e) => e.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((e) => e.date <= endDate);
    }
    return filtered.sort(
      (a, b) => (/* @__PURE__ */ new Date(b.date + " " + b.time)).getTime() - (/* @__PURE__ */ new Date(a.date + " " + a.time)).getTime()
    );
  },
  add: async (data) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.FOOD_ENTRIES);
    const newEntry = { ...data, id: generateId() };
    entries.push(newEntry);
    saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, entries);
    return newEntry;
  },
  update: async (id, data) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.FOOD_ENTRIES);
    const index = entries.findIndex((e) => e.id === id);
    if (index >= 0) {
      entries[index] = { ...entries[index], ...data };
      saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, entries);
      return entries[index];
    }
    throw new Error("Food entry not found");
  },
  delete: async (id) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.FOOD_ENTRIES);
    const filtered = entries.filter((e) => e.id !== id);
    saveToStorage(STORAGE_KEYS.FOOD_ENTRIES, filtered);
  }
};
const exerciseAPI = {
  getAll: async (userId, startDate, endDate) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.EXERCISE_ENTRIES);
    let filtered = entries.filter((e) => e.userId === userId);
    if (startDate) {
      filtered = filtered.filter((e) => e.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((e) => e.date <= endDate);
    }
    return filtered.sort(
      (a, b) => (/* @__PURE__ */ new Date(b.date + " " + b.time)).getTime() - (/* @__PURE__ */ new Date(a.date + " " + a.time)).getTime()
    );
  },
  add: async (data) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.EXERCISE_ENTRIES);
    const newEntry = { ...data, id: generateId() };
    entries.push(newEntry);
    saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, entries);
    return newEntry;
  },
  update: async (id, data) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.EXERCISE_ENTRIES);
    const index = entries.findIndex((e) => e.id === id);
    if (index >= 0) {
      entries[index] = { ...entries[index], ...data };
      saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, entries);
      return entries[index];
    }
    throw new Error("Exercise entry not found");
  },
  delete: async (id) => {
    await simulateDelay();
    const entries = getFromStorage(STORAGE_KEYS.EXERCISE_ENTRIES);
    const filtered = entries.filter((e) => e.id !== id);
    saveToStorage(STORAGE_KEYS.EXERCISE_ENTRIES, filtered);
  }
};
const chatAPI = {
  getMessages: async (userId, expertId) => {
    await simulateDelay();
    const messages = getFromStorage(STORAGE_KEYS.CHAT_MESSAGES);
    let filtered = messages.filter((m) => m.userId === userId);
    if (expertId) {
      filtered = filtered.filter((m) => m.expertId === expertId);
    }
    return filtered.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  },
  sendMessage: async (data) => {
    await simulateDelay();
    const messages = getFromStorage(STORAGE_KEYS.CHAT_MESSAGES);
    const newMessage = {
      ...data,
      id: generateId(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    messages.push(newMessage);
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages);
    return newMessage;
  },
  markAsRead: async (messageIds) => {
    await simulateDelay();
    const messages = getFromStorage(STORAGE_KEYS.CHAT_MESSAGES);
    messages.forEach((msg) => {
      if (messageIds.includes(msg.id)) {
        msg.isRead = true;
      }
    });
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, messages);
  }
};
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function simulateDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const initializeDemoData = (userId) => {
  const healthMetrics = getFromStorage(STORAGE_KEYS.HEALTH_METRICS);
  if (healthMetrics.filter((m) => m.userId === userId).length === 0) {
    const demoMetrics = [];
    const today = /* @__PURE__ */ new Date();
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
        steps: 6e3 + Math.floor(Math.random() * 6e3),
        water: 1.5 + Math.random() * 1.5,
        sleep: 6 + Math.random() * 3
      });
    }
    saveToStorage(STORAGE_KEYS.HEALTH_METRICS, [...healthMetrics, ...demoMetrics]);
  }
};
export {
  chatAPI,
  exerciseAPI,
  foodDiaryAPI,
  healthMetricsAPI,
  initializeDemoData,
  userProfileAPI
};
