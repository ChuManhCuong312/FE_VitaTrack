// Custom Hook for Food Diary Management
import { useState, useEffect, useCallback } from "react";
import { foodDiaryAPI, FoodEntry } from "../services/api";

export function useFoodDiary(userId: string) {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load entries
  const loadEntries = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await foodDiaryAPI.getAll(userId, startDate, endDate);
      setEntries(data);
    } catch (err) {
      setError("Không thể tải nhật ký ăn uống");
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

  // Add entry
  const addEntry = async (data: Omit<FoodEntry, "id">) => {
    try {
      const newEntry = await foodDiaryAPI.add(data);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      setError("Không thể thêm món ăn");
      throw err;
    }
  };

  // Update entry
  const updateEntry = async (id: string, data: Partial<FoodEntry>) => {
    try {
      const updated = await foodDiaryAPI.update(id, data);
      setEntries(prev => prev.map(e => e.id === id ? updated : e));
      return updated;
    } catch (err) {
      setError("Không thể cập nhật món ăn");
      throw err;
    }
  };

  // Delete entry
  const deleteEntry = async (id: string) => {
    try {
      await foodDiaryAPI.delete(id);
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError("Không thể xóa món ăn");
      throw err;
    }
  };

  // Get entries by date
  const getEntriesByDate = (date: string) => {
    return entries.filter(e => e.date === date);
  };

  // Get entries by meal type
  const getEntriesByMealType = (mealType: FoodEntry["mealType"], date?: string) => {
    let filtered = entries.filter(e => e.mealType === mealType);
    if (date) {
      filtered = filtered.filter(e => e.date === date);
    }
    return filtered;
  };

  // Calculate daily totals
  const getDailyTotals = (date: string) => {
    const dailyEntries = getEntriesByDate(date);
    
    return {
      calories: sum(dailyEntries.map(e => e.calories)),
      protein: sum(dailyEntries.map(e => e.protein)),
      carbs: sum(dailyEntries.map(e => e.carbs)),
      fat: sum(dailyEntries.map(e => e.fat)),
      meals: dailyEntries.length,
    };
  };

  // Calculate weekly averages
  const getWeeklyAverages = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekEntries = entries.filter(e => {
      const entryDate = new Date(e.date);
      return entryDate >= weekAgo && entryDate <= today;
    });

    const days = new Set(weekEntries.map(e => e.date)).size;
    
    return {
      avgCalories: days > 0 ? sum(weekEntries.map(e => e.calories)) / days : 0,
      avgProtein: days > 0 ? sum(weekEntries.map(e => e.protein)) / days : 0,
      avgCarbs: days > 0 ? sum(weekEntries.map(e => e.carbs)) / days : 0,
      avgFat: days > 0 ? sum(weekEntries.map(e => e.fat)) / days : 0,
      daysTracked: days,
    };
  };

  // Get nutrition distribution
  const getNutritionDistribution = (date?: string) => {
    const targetEntries = date ? getEntriesByDate(date) : entries;
    const totalProtein = sum(targetEntries.map(e => e.protein));
    const totalCarbs = sum(targetEntries.map(e => e.carbs));
    const totalFat = sum(targetEntries.map(e => e.fat));
    
    const total = totalProtein + totalCarbs + totalFat;
    
    return {
      protein: total > 0 ? (totalProtein / total) * 100 : 0,
      carbs: total > 0 ? (totalCarbs / total) * 100 : 0,
      fat: total > 0 ? (totalFat / total) * 100 : 0,
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
    refresh: loadEntries,
  };
}

function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
