// Custom Hook for Health Data Management
import { useState, useEffect, useCallback } from "react";
import { healthMetricsAPI, HealthMetrics, initializeDemoData } from "../services/api";

export function useHealthData(userId: string) {
  const [metrics, setMetrics] = useState<HealthMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data
  const loadMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize demo data if needed
      initializeDemoData(userId);
      
      const data = await healthMetricsAPI.getAll(userId);
      setMetrics(data);
    } catch (err) {
      setError("Không thể tải dữ liệu sức khỏe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadMetrics();
    }
  }, [userId, loadMetrics]);

  // Add new metric
  const addMetric = async (data: Omit<HealthMetrics, "id">) => {
    try {
      const newMetric = await healthMetricsAPI.add(data);
      setMetrics(prev => [newMetric, ...prev]);
      return newMetric;
    } catch (err) {
      setError("Không thể thêm dữ liệu");
      throw err;
    }
  };

  // Update metric
  const updateMetric = async (id: string, data: Partial<HealthMetrics>) => {
    try {
      const updated = await healthMetricsAPI.update(id, data);
      setMetrics(prev => prev.map(m => m.id === id ? updated : m));
      return updated;
    } catch (err) {
      setError("Không thể cập nhật dữ liệu");
      throw err;
    }
  };

  // Delete metric
  const deleteMetric = async (id: string) => {
    try {
      await healthMetricsAPI.delete(id);
      setMetrics(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError("Không thể xóa dữ liệu");
      throw err;
    }
  };

  // Get latest metric
  const latestMetric = metrics[0] || null;

  // Get metrics for specific date range
  const getMetricsInRange = (startDate: string, endDate: string) => {
    return metrics.filter(m => m.date >= startDate && m.date <= endDate);
  };

  // Calculate averages
  const getAverages = (days: number = 7) => {
    const recent = metrics.slice(0, days);
    if (recent.length === 0) return null;

    return {
      weight: average(recent.map(m => m.weight)),
      bmi: average(recent.map(m => m.bmi)),
      calories: average(recent.map(m => m.calories)),
      steps: average(recent.map(m => m.steps)),
      water: average(recent.map(m => m.water)),
      sleep: average(recent.map(m => m.sleep)),
    };
  };

  // Get trends
  const getTrend = (metric: keyof HealthMetrics, days: number = 7) => {
    const recent = metrics.slice(0, days);
    if (recent.length < 2) return "stable";

    const values = recent.map(m => m[metric] as number);
    const first = values[values.length - 1];
    const last = values[0];
    const change = ((last - first) / first) * 100;

    if (Math.abs(change) < 2) return "stable";
    return change > 0 ? "up" : "down";
  };

  return {
    metrics,
    loading,
    error,
    latestMetric,
    addMetric,
    updateMetric,
    deleteMetric,
    getMetricsInRange,
    getAverages,
    getTrend,
    refresh: loadMetrics,
  };
}

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
