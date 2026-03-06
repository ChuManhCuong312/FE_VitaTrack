import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { useHealthData } from "../../hooks/useHealthData";
import { useFoodDiary } from "../../hooks/useFoodDiary";
import { useApp } from "../../context/AppContext";
import { aiService } from "../../services/ai";
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        ...style
      }
    },
    children
  );
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 } }, children);
}
function Overview() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const { metrics, latestMetric, getAverages, getTrend, loading, addMetric } = useHealthData(userId);
  const { getDailyTotals, getWeeklyAverages, getNutritionDistribution } = useFoodDiary(userId);
  const [insights, setInsights] = React.useState([]);
  const [weightInput, setWeightInput] = React.useState("");
  const [savingWeight, setSavingWeight] = React.useState(false);
  const [weightSaved, setWeightSaved] = React.useState(false);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dailyTotals = getDailyTotals(today);
  const weeklyAvg = getWeeklyAverages();
  const nutritionDist = getNutritionDistribution(today);
  const averages = getAverages(7);
  const bmi = latestMetric?.bmi || 23.4;
  const bmiStatus = bmi < 18.5 ? "Thi\u1EBFu c\xE2n" : bmi < 25 ? "B\xECnh th\u01B0\u1EDDng" : bmi < 30 ? "Th\u1EEBa c\xE2n" : "B\xE9o ph\xEC";
  const bmiColor = bmi < 18.5 ? "#F59E0B" : bmi < 25 ? "#22C55E" : bmi < 30 ? "#F59E0B" : "#EF4444";
  const caloBudget = 2e3;
  const caloNap = dailyTotals.calories || 0;
  const caloTieu = latestMetric?.steps ? Math.round(latestMetric.steps * 0.04) : 0;
  const caloConLai = caloBudget - caloNap + caloTieu;
  const steps = latestMetric?.steps || 0;
  const stepsGoal = 1e4;
  const stepsPercent = Math.min(steps / stepsGoal * 100, 100);
  const water = latestMetric?.water || 0;
  const waterGoal = 2.5;
  const waterGlasses = Math.round(water / waterGoal * 8);
  const weightData = metrics.slice(0, 14).reverse().map((m) => ({
    ngay: new Date(m.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
    canNang: Math.round(m.weight * 10) / 10
  }));
  const macroData = [
    { name: "Protein", value: Math.round(nutritionDist.protein), color: "#22C55E" },
    { name: "Carb", value: Math.round(nutritionDist.carbs), color: "#2563EB" },
    { name: "Fat", value: Math.round(nutritionDist.fat), color: "#F59E0B" }
  ];
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const calorieWeekData = metrics.slice(0, 7).reverse().map((m, i) => ({
    day: weekDays[new Date(m.date).getDay()],
    nap: m.calories,
    tieu: Math.round(m.steps * 0.04)
  }));
  React.useEffect(() => {
    if (averages) {
      aiService.analyzeHealth(userId, {
        bmi,
        avgCalories: averages.calories,
        avgSteps: averages.steps,
        avgWater: averages.water,
        avgSleep: averages.sleep
      }).then(setInsights);
    }
  }, [userId, bmi, averages]);
  const pct = Math.min(caloNap / caloBudget * 100, 100);
  const handleQuickWeightSave = async () => {
    const w = parseFloat(weightInput);
    if (!w || w < 20 || w > 300) return;
    setSavingWeight(true);
    const height = latestMetric?.height || 170;
    const bmi2 = parseFloat((w / (height / 100) ** 2).toFixed(1));
    const today2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    try {
      await addMetric({
        userId,
        date: today2,
        weight: w,
        height,
        bmi: bmi2,
        calories: latestMetric?.calories || 0,
        steps: latestMetric?.steps || 0,
        water: latestMetric?.water || 0,
        sleep: latestMetric?.sleep || 0
      });
      setWeightSaved(true);
      setWeightInput("");
      setTimeout(() => setWeightSaved(false), 2500);
    } finally {
      setSavingWeight(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937", padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, color: "#6B7280" } }, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..."));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "T\u1ED5ng quan"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Theo d\xF5i s\u1EE9c kh\u1ECFe v\xE0 dinh d\u01B0\u1EE1ng c\u1EE7a b\u1EA1n h\xF4m nay.")), insights.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 } }, insights.slice(0, 2).map((insight, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      style: {
        background: insight.type === "success" ? "#D1FAE5" : insight.type === "warning" ? "#FEF3C7" : insight.type === "recommendation" ? "#DBEAFE" : "#FEE2E2",
        borderLeft: `4px solid ${insight.type === "success" ? "#22C55E" : insight.type === "warning" ? "#F59E0B" : insight.type === "recommendation" ? "#2563EB" : "#EF4444"}`,
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 14,
        color: insight.type === "success" ? "#065F46" : insight.type === "warning" ? "#92400E" : insight.type === "recommendation" ? "#1E3A8A" : "#991B1B"
      }
    },
    /* @__PURE__ */ React.createElement("strong", null, insight.title, ":"),
    " ",
    insight.message
  ))), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 24
      }
    },
    /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Ch\u1EC9 s\u1ED1 BMI"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, fontWeight: 700, color: bmiColor, lineHeight: 1 } }, bmi.toFixed(1)), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          display: "inline-block",
          marginTop: 8,
          padding: "4px 10px",
          borderRadius: 6,
          background: bmiColor + "20",
          color: bmiColor,
          fontSize: 13,
          fontWeight: 600
        }
      },
      bmiStatus
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 8 } }, "C\xE2n n\u1EB7ng: ", latestMetric?.weight.toFixed(1) || "N/A", " kg \xB7 Cao: ", latestMetric?.height || 170, " cm")),
    /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Calo h\xF4m nay"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, "N\u1EA1p v\xE0o"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 600, color: "#1F2937" } }, Math.round(caloNap), " kcal")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, "Ti\xEAu hao"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 600, color: "#2563EB" } }, caloTieu, " kcal")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, "C\xF2n l\u1EA1i"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 600, color: "#22C55E" } }, Math.round(caloConLai), " kcal"))), /* @__PURE__ */ React.createElement("div", { style: { background: "#E5E7EB", borderRadius: 99, height: 8, overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          width: `${pct}%`,
          height: "100%",
          background: pct > 100 ? "#EF4444" : "#22C55E",
          borderRadius: 99,
          transition: "width 0.5s"
        }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 6 } }, Math.round(caloNap), "/", caloBudget, " kcal (", Math.round(pct), "% ng\xE2n s\xE1ch)")),
    /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "V\u1EADn \u0111\u1ED9ng h\xF4m nay"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, fontWeight: 700, color: "#2563EB", lineHeight: 1 } }, steps.toLocaleString("vi-VN")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 4 } }, "b\u01B0\u1EDBc / ", stepsGoal.toLocaleString("vi-VN"), " m\u1EE5c ti\xEAu"), /* @__PURE__ */ React.createElement("div", { style: { background: "#E5E7EB", borderRadius: 99, height: 8, overflow: "hidden", marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${stepsPercent}%`, height: "100%", background: "#2563EB", borderRadius: 99 } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 6 } }, "Calo ti\xEAu hao: ", caloTieu, " kcal")),
    /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "N\u01B0\u1EDBc u\u1ED1ng"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, fontWeight: 700, color: "#06B6D4", lineHeight: 1 } }, water.toFixed(1), "L"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 4 } }, "/ ", waterGoal, "L m\u1EE5c ti\xEAu"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 12 } }, [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        style: {
          flex: 1,
          height: 28,
          borderRadius: 4,
          background: i <= waterGlasses ? "#06B6D4" : "#E5E7EB"
        }
      }
    ))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 6 } }, "M\u1ED7i ly \u2248 250ml"))
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 } }, /* @__PURE__ */ React.createElement(Card, { style: { gridColumn: "span 2" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" } }, "Bi\u1EC3u \u0111\u1ED3 c\xE2n n\u1EB7ng theo th\u1EDDi gian"), latestMetric && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 4 } }, "Hi\u1EC7n t\u1EA1i: ", /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, color: "#22C55E" } }, latestMetric.weight.toFixed(1), " kg"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", borderRadius: 10, padding: "8px 12px" } }, weightSaved ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#22C55E", fontWeight: 600 } }, "\u0110\xE3 l\u01B0u c\xE2n n\u1EB7ng!") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280", whiteSpace: "nowrap" } }, "Nh\u1EADp c\xE2n n\u1EB7ng:"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: "20",
      max: "300",
      step: "0.1",
      value: weightInput,
      onChange: (e) => setWeightInput(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && handleQuickWeightSave(),
      placeholder: latestMetric?.weight.toFixed(1) || "70.0",
      style: {
        width: 80,
        height: 36,
        padding: "0 8px",
        borderRadius: 8,
        border: "1px solid #E5E7EB",
        fontSize: 14,
        outline: "none",
        textAlign: "center"
      }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, "kg"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleQuickWeightSave,
      disabled: savingWeight || !weightInput,
      style: {
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        border: "none",
        background: weightInput ? "#22C55E" : "#E5E7EB",
        color: weightInput ? "#fff" : "#9CA3AF",
        fontSize: 13,
        fontWeight: 600,
        cursor: weightInput ? "pointer" : "default",
        transition: "all 0.2s"
      }
    },
    savingWeight ? "\u0110ang l\u01B0u..." : "L\u01B0u"
  )))), weightData.length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(LineChart, { data: weightData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "ngay", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" }, domain: ["auto", "auto"] }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 },
      formatter: (v) => [`${v} kg`, "C\xE2n n\u1EB7ng"]
    }
  ), /* @__PURE__ */ React.createElement(
    Line,
    {
      key: "canNang",
      type: "monotone",
      dataKey: "canNang",
      stroke: "#22C55E",
      strokeWidth: 2.5,
      dot: { fill: "#22C55E", r: 4 },
      activeDot: { r: 6 }
    }
  ))) : /* @__PURE__ */ React.createElement("div", { style: { height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" } }, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "T\u1EF7 l\u1EC7 Macro h\xF4m nay"), dailyTotals.meals > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      key: "macroData",
      data: macroData,
      cx: "50%",
      cy: "50%",
      innerRadius: 55,
      outerRadius: 80,
      paddingAngle: 3,
      dataKey: "value"
    },
    macroData.map((entry, index) => /* @__PURE__ */ React.createElement(Cell, { key: index, fill: entry.color }))
  ), /* @__PURE__ */ React.createElement(
    Legend,
    {
      formatter: (value, entry) => /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#374151" } }, value, ": ", entry.payload.value, "%")
    }
  ), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [`${v}%`] }))) : /* @__PURE__ */ React.createElement("div", { style: { height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" } }, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u b\u1EEFa \u0103n"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Calo n\u1EA1p vs ti\xEAu hao \u2013 Tu\u1EA7n n\xE0y"), calorieWeekData.length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 220 }, /* @__PURE__ */ React.createElement(BarChart, { data: calorieWeekData, barGap: 4 }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6", vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 },
      formatter: (v, name) => [
        `${v} kcal`,
        name === "nap" ? "Calo n\u1EA1p" : "Calo ti\xEAu"
      ]
    }
  ), /* @__PURE__ */ React.createElement(
    Legend,
    {
      formatter: (value) => /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#374151" } }, value === "nap" ? "Calo n\u1EA1p" : "Calo ti\xEAu")
    }
  ), /* @__PURE__ */ React.createElement(Bar, { key: "nap", dataKey: "nap", fill: "#22C55E", radius: [4, 4, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { key: "tieu", dataKey: "tieu", fill: "#2563EB", radius: [4, 4, 0, 0] }))) : /* @__PURE__ */ React.createElement("div", { style: { height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" } }, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u tu\u1EA7n n\xE0y")));
}
export {
  Overview as default
};
