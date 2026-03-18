/**
 * VITATRACK - CALORIE UTILITIES
 */
const CalorieUtils = {
  /** Calo đốt theo hoạt động (MET * weight * hours) */
  calcBurned(met, weightKg, durationMinutes) {
    return Math.round(met * weightKg * (durationMinutes / 60));
  },

  MET_VALUES: {
    walking:    3.5,
    running:    8.0,
    cycling:    6.8,
    swimming:   7.0,
    yoga:       2.5,
    gym:        5.0,
    dancing:    4.5,
    basketball: 6.5,
    football:   7.0,
    hiking:     5.3
  },

  /** Macro breakdown từ calo */
  macroFromCalories(totalCal, protein = 0.3, carbs = 0.45, fat = 0.25) {
    return {
      protein: Math.round((totalCal * protein) / 4),   // 4 cal/g
      carbs:   Math.round((totalCal * carbs)   / 4),
      fat:     Math.round((totalCal * fat)     / 9),   // 9 cal/g
      fiber:   Math.round(totalCal / 100)               // ~1g per 100 cal
    };
  },

  /** % macro từ gram */
  macroPercent(proteinG, carbsG, fatG) {
    const total = proteinG * 4 + carbsG * 4 + fatG * 9;
    if (total === 0) return { protein:0, carbs:0, fat:0 };
    return {
      protein: Math.round((proteinG * 4 / total) * 100),
      carbs:   Math.round((carbsG   * 4 / total) * 100),
      fat:     Math.round((fatG     * 9 / total) * 100)
    };
  },

  /** Tính calo thực phẩm */
  calcFoodCalories(proteinG, carbsG, fatG) {
    return Math.round(proteinG * 4 + carbsG * 4 + fatG * 9);
  },

  /** Đánh giá lượng nước cần uống */
  dailyWaterNeeds(weightKg, activityLevel = 'moderate') {
    const base = weightKg * 35;
    const bonus = { low: 0, moderate: 200, high: 400, very_high: 600 };
    return base + (bonus[activityLevel] || 200);
  }
};

export default CalorieUtils;
