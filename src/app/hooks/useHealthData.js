import { useState, useEffect, useCallback } from "react";
import { healthMetricsAPI, initializeDemoData } from "../services/api";
function useHealthData(userId) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      initializeDemoData(userId);
      const data = await healthMetricsAPI.getAll(userId);
      setMetrics(data);
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u s\u1EE9c kh\u1ECFe");
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
  const addMetric = async (data) => {
    try {
      const newMetric = await healthMetricsAPI.add(data);
      setMetrics((prev) => [newMetric, ...prev]);
      return newMetric;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 th\xEAm d\u1EEF li\u1EC7u");
      throw err;
    }
  };
  const updateMetric = async (id, data) => {
    try {
      const updated = await healthMetricsAPI.update(id, data);
      setMetrics((prev) => prev.map((m) => m.id === id ? updated : m));
      return updated;
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u");
      throw err;
    }
  };
  const deleteMetric = async (id) => {
    try {
      await healthMetricsAPI.delete(id);
      setMetrics((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError("Kh\xF4ng th\u1EC3 x\xF3a d\u1EEF li\u1EC7u");
      throw err;
    }
  };
  const latestMetric = metrics[0] || null;
  const getMetricsInRange = (startDate, endDate) => {
    return metrics.filter((m) => m.date >= startDate && m.date <= endDate);
  };
  const getAverages = (days = 7) => {
    const recent = metrics.slice(0, days);
    if (recent.length === 0) return null;
    return {
      weight: average(recent.map((m) => m.weight)),
      bmi: average(recent.map((m) => m.bmi)),
      calories: average(recent.map((m) => m.calories)),
      steps: average(recent.map((m) => m.steps)),
      water: average(recent.map((m) => m.water)),
      sleep: average(recent.map((m) => m.sleep))
    };
  };
  const getTrend = (metric, days = 7) => {
    const recent = metrics.slice(0, days);
    if (recent.length < 2) return "stable";
    const values = recent.map((m) => m[metric]);
    const first = values[values.length - 1];
    const last = values[0];
    const change = (last - first) / first * 100;
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
    refresh: loadMetrics
  };
}
function average(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
export {
  useHealthData
};
