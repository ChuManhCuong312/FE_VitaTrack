import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { useHealthData } from "../../hooks/useHealthData";
import { useFoodDiary } from "../../hooks/useFoodDiary";
import { useApp } from "../../context/AppContext";
import { aiService } from "../../services/ai";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
      {children}
    </h2>
  );
}

export default function Overview() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const { metrics, latestMetric, getAverages, getTrend, loading, addMetric } = useHealthData(userId);
  const { getDailyTotals, getWeeklyAverages, getNutritionDistribution } = useFoodDiary(userId);
  const [insights, setInsights] = React.useState<any[]>([]);
  const [weightInput, setWeightInput] = React.useState("");
  const [savingWeight, setSavingWeight] = React.useState(false);
  const [weightSaved, setWeightSaved] = React.useState(false);

  // Get today's date
  const today = new Date().toISOString().split("T")[0];
  const dailyTotals = getDailyTotals(today);
  const weeklyAvg = getWeeklyAverages();
  const nutritionDist = getNutritionDistribution(today);
  const averages = getAverages(7);

  // Calculate BMI from latest metric
  const bmi = latestMetric?.bmi || 23.4;
  const bmiStatus = bmi < 18.5 ? "Thiếu cân" : bmi < 25 ? "Bình thường" : bmi < 30 ? "Thừa cân" : "Béo phì";
  const bmiColor = bmi < 18.5 ? "#F59E0B" : bmi < 25 ? "#22C55E" : bmi < 30 ? "#F59E0B" : "#EF4444";

  // Calorie data
  const caloBudget = 2000;
  const caloNap = dailyTotals.calories || 0;
  const caloTieu = latestMetric?.steps ? Math.round(latestMetric.steps * 0.04) : 0;
  const caloConLai = caloBudget - caloNap + caloTieu;

  // Steps data
  const steps = latestMetric?.steps || 0;
  const stepsGoal = 10000;
  const stepsPercent = Math.min((steps / stepsGoal) * 100, 100);

  // Water data
  const water = latestMetric?.water || 0;
  const waterGoal = 2.5;
  const waterGlasses = Math.round((water / waterGoal) * 8);

  // Prepare weight chart data from metrics
  const weightData = metrics.slice(0, 14).reverse().map(m => ({
    ngay: new Date(m.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
    canNang: Math.round(m.weight * 10) / 10,
  }));

  // Macro pie data from nutrition distribution
  const macroData = [
    { name: "Protein", value: Math.round(nutritionDist.protein), color: "#22C55E" },
    { name: "Carb", value: Math.round(nutritionDist.carbs), color: "#2563EB" },
    { name: "Fat", value: Math.round(nutritionDist.fat), color: "#F59E0B" },
  ];

  // Weekly calorie data from last 7 metrics
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const calorieWeekData = metrics.slice(0, 7).reverse().map((m, i) => ({
    day: weekDays[new Date(m.date).getDay()],
    nap: m.calories,
    tieu: Math.round(m.steps * 0.04),
  }));

  // Load AI insights
  React.useEffect(() => {
    if (averages) {
      aiService.analyzeHealth(userId, {
        bmi,
        avgCalories: averages.calories,
        avgSteps: averages.steps,
        avgWater: averages.water,
        avgSleep: averages.sleep,
      }).then(setInsights);
    }
  }, [userId, bmi, averages]);

  const pct = Math.min((caloNap / caloBudget) * 100, 100);

  const handleQuickWeightSave = async () => {
    const w = parseFloat(weightInput);
    if (!w || w < 20 || w > 300) return;
    setSavingWeight(true);
    const height = latestMetric?.height || 170;
    const bmi = parseFloat((w / ((height / 100) ** 2)).toFixed(1));
    const today = new Date().toISOString().split("T")[0];
    try {
      await addMetric({
        userId,
        date: today,
        weight: w,
        height,
        bmi,
        calories: latestMetric?.calories || 0,
        steps: latestMetric?.steps || 0,
        water: latestMetric?.water || 0,
        sleep: latestMetric?.sleep || 0,
      });
      setWeightSaved(true);
      setWeightInput("");
      setTimeout(() => setWeightSaved(false), 2500);
    } finally {
      setSavingWeight(false);
    }
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937", padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 16, color: "#6B7280" }}>Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Tổng quan</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Theo dõi sức khỏe và dinh dưỡng của bạn hôm nay.</p>
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          {insights.slice(0, 2).map((insight, idx) => (
            <div
              key={idx}
              style={{
                background: insight.type === "success" ? "#D1FAE5" : insight.type === "warning" ? "#FEF3C7" : insight.type === "recommendation" ? "#DBEAFE" : "#FEE2E2",
                borderLeft: `4px solid ${insight.type === "success" ? "#22C55E" : insight.type === "warning" ? "#F59E0B" : insight.type === "recommendation" ? "#2563EB" : "#EF4444"}`,
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 14,
                color: insight.type === "success" ? "#065F46" : insight.type === "warning" ? "#92400E" : insight.type === "recommendation" ? "#1E3A8A" : "#991B1B",
              }}
            >
              <strong>{insight.title}:</strong> {insight.message}
            </div>
          ))}
        </div>
      )}

      {/* Top cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {/* BMI */}
        <Card>
          <SectionTitle>Chỉ số BMI</SectionTitle>
          <div style={{ fontSize: 48, fontWeight: 700, color: bmiColor, lineHeight: 1 }}>
            {bmi.toFixed(1)}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "4px 10px",
              borderRadius: 6,
              background: bmiColor + "20",
              color: bmiColor,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {bmiStatus}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 8 }}>
            Cân nặng: {latestMetric?.weight.toFixed(1) || "N/A"} kg · Cao: {latestMetric?.height || 170} cm
          </div>
        </Card>

        {/* Calo hôm nay */}
        <Card>
          <SectionTitle>Calo hôm nay</SectionTitle>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Nạp vào</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#1F2937" }}>{Math.round(caloNap)} kcal</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Tiêu hao</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#2563EB" }}>{caloTieu} kcal</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Còn lại</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#22C55E" }}>{Math.round(caloConLai)} kcal</div>
            </div>
          </div>
          <div style={{ background: "#E5E7EB", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: pct > 100 ? "#EF4444" : "#22C55E",
                borderRadius: 99,
                transition: "width 0.5s",
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
            {Math.round(caloNap)}/{caloBudget} kcal ({Math.round(pct)}% ngân sách)
          </div>
        </Card>

        {/* Steps */}
        <Card>
          <SectionTitle>Vận động hôm nay</SectionTitle>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#2563EB", lineHeight: 1 }}>
            {steps.toLocaleString("vi-VN")}
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>bước / {stepsGoal.toLocaleString("vi-VN")} mục tiêu</div>
          <div style={{ background: "#E5E7EB", borderRadius: 99, height: 8, overflow: "hidden", marginTop: 12 }}>
            <div style={{ width: `${stepsPercent}%`, height: "100%", background: "#2563EB", borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>Calo tiêu hao: {caloTieu} kcal</div>
        </Card>

        {/* Water */}
        <Card>
          <SectionTitle>Nước uống</SectionTitle>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#06B6D4", lineHeight: 1 }}>
            {water.toFixed(1)}L
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>/ {waterGoal}L mục tiêu</div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 28,
                  borderRadius: 4,
                  background: i <= waterGlasses ? "#06B6D4" : "#E5E7EB",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>Mỗi ly ≈ 250ml</div>
        </Card>
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        {/* Weight chart */}
        <Card style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Biểu đồ cân nặng theo thời gian</div>
              {latestMetric && (
                <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                  Hiện tại: <span style={{ fontWeight: 600, color: "#22C55E" }}>{latestMetric.weight.toFixed(1)} kg</span>
                </div>
              )}
            </div>
            {/* Quick weight entry */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", borderRadius: 10, padding: "8px 12px" }}>
              {weightSaved ? (
                <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>Đã lưu cân nặng!</span>
              ) : (
                <>
                  <span style={{ fontSize: 13, color: "#6B7280", whiteSpace: "nowrap" }}>Nhập cân nặng:</span>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    step="0.1"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleQuickWeightSave()}
                    placeholder={latestMetric?.weight.toFixed(1) || "70.0"}
                    style={{
                      width: 80,
                      height: 36,
                      padding: "0 8px",
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      fontSize: 14,
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#6B7280" }}>kg</span>
                  <button
                    onClick={handleQuickWeightSave}
                    disabled={savingWeight || !weightInput}
                    style={{
                      height: 36,
                      padding: "0 14px",
                      borderRadius: 8,
                      border: "none",
                      background: weightInput ? "#22C55E" : "#E5E7EB",
                      color: weightInput ? "#fff" : "#9CA3AF",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: weightInput ? "pointer" : "default",
                      transition: "all 0.2s",
                    }}
                  >
                    {savingWeight ? "Đang lưu..." : "Lưu"}
                  </button>
                </>
              )}
            </div>
          </div>
          {weightData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="ngay" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }}
                  formatter={(v: any) => [`${v} kg`, "Cân nặng"]}
                />
                <Line
                  key="canNang"
                  type="monotone"
                  dataKey="canNang"
                  stroke="#22C55E"
                  strokeWidth={2.5}
                  dot={{ fill: "#22C55E", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
              Chưa có dữ liệu
            </div>
          )}
        </Card>

        {/* Macro pie */}
        <Card>
          <SectionTitle>Tỷ lệ Macro hôm nay</SectionTitle>
          {dailyTotals.meals > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  key="macroData"
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value, entry: any) => (
                    <span style={{ fontSize: 13, color: "#374151" }}>{value}: {entry.payload.value}%</span>
                  )}
                />
                <Tooltip formatter={(v: any) => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
              Chưa có dữ liệu bữa ăn
            </div>
          )}
        </Card>
      </div>

      {/* Weekly calorie chart */}
      <Card>
        <SectionTitle>Calo nạp vs tiêu hao – Tuần này</SectionTitle>
        {calorieWeekData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={calorieWeekData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }}
                formatter={(v: any, name: string) => [
                  `${v} kcal`,
                  name === "nap" ? "Calo nạp" : "Calo tiêu",
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: 13, color: "#374151" }}>{value === "nap" ? "Calo nạp" : "Calo tiêu"}</span>
                )}
              />
              <Bar key="nap" dataKey="nap" fill="#22C55E" radius={[4, 4, 0, 0]} />
              <Bar key="tieu" dataKey="tieu" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
            Chưa có dữ liệu tuần này
          </div>
        )}
      </Card>
    </div>
  );
}