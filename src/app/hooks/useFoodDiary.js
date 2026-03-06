import { useState, useEffect, useCallback } from "react";
import { foodDiaryAPI } from "../services/api";
function useFoodDiary(userId) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadEntries = useCallback(async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      const data = await foodDiaryAPI.getAll(userId, startDate, endDate);
      setEntries(data);
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 t\u1EA3i nh\u1EADt k\xFD \u0103n u\u1ED1ng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      loadEntries();
    }
  }, [userId, loadEntries]);
  const addEntry = async (data) => {
    try {
      const newEntry = await foodDiaryAPI.add(data);
      setEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 th\xEAm m\xF3n \u0103n");
      throw err;
    }
  };
  const updateEntry = async (id, data) => {
    try {
      const updated = await foodDiaryAPI.update(id, data);
      setEntries((prev) => prev.map((e) => e.id === id ? updated : e));
      return updated;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt m\xF3n \u0103n");
      throw err;
    }
  };
  const deleteEntry = async (id) => {
    try {
      await foodDiaryAPI.delete(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 x\xF3a m\xF3n \u0103n");
      throw err;
    }
  };
  const getEntriesByDate = (date) => {
    return entries.filter((e) => e.date === date);
  };
  const getEntriesByMealType = (mealType, date) => {
    let filtered = entries.filter((e) => e.mealType === mealType);
    if (date) {
      filtered = filtered.filter((e) => e.date === date);
    }
    return filtered;
  };
  const getDailyTotals = (date) => {
    const dailyEntries = getEntriesByDate(date);
    return {
      calories: sum(dailyEntries.map((e) => e.calories)),
      protein: sum(dailyEntries.map((e) => e.protein)),
      carbs: sum(dailyEntries.map((e) => e.carbs)),
      fat: sum(dailyEntries.map((e) => e.fat)),
      meals: dailyEntries.length
    };
  };
  const getWeeklyAverages = () => {
    const today = /* @__PURE__ */ new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekEntries = entries.filter((e) => {
      const entryDate = new Date(e.date);
      return entryDate >= weekAgo && entryDate <= today;
    });
    const days = new Set(weekEntries.map((e) => e.date)).size;
    return {
      avgCalories: days > 0 ? sum(weekEntries.map((e) => e.calories)) / days : 0,
      avgProtein: days > 0 ? sum(weekEntries.map((e) => e.protein)) / days : 0,
      avgCarbs: days > 0 ? sum(weekEntries.map((e) => e.carbs)) / days : 0,
      avgFat: days > 0 ? sum(weekEntries.map((e) => e.fat)) / days : 0,
      daysTracked: days
    };
  };
  const getNutritionDistribution = (date) => {
    const targetEntries = date ? getEntriesByDate(date) : entries;
    const totalProtein = sum(targetEntries.map((e) => e.protein));
    const totalCarbs = sum(targetEntries.map((e) => e.carbs));
    const totalFat = sum(targetEntries.map((e) => e.fat));
    const total = totalProtein + totalCarbs + totalFat;
    return {
      protein: total > 0 ? totalProtein / total * 100 : 0,
      carbs: total > 0 ? totalCarbs / total * 100 : 0,
      fat: total > 0 ? totalFat / total * 100 : 0
    };
  };
  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByDate,
    getEntriesByMealType,
    getDailyTotals,
    getWeeklyAverages,
    getNutritionDistribution,
    refresh: loadEntries
  };
}
function sum(numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
export {
  useFoodDiary
};
