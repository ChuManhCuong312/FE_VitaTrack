import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
const weightHistory = [
  { date: "01/10", weight: 76 },
  { date: "01/11", weight: 75.2 },
  { date: "01/12", weight: 74.8 },
  { date: "01/01", weight: 74.1 },
  { date: "01/02", weight: 73.5 },
  { date: "01/03", weight: 73.1 }
];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function Label({ children }) {
  return /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, children);
}
function Input({ value, onChange, type = "text", placeholder }) {
  const [focused, setFocused] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      type,
      value,
      onChange,
      placeholder,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      style: {
        width: "100%",
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: `1px solid ${focused ? "#22C55E" : "#E5E7EB"}`,
        fontSize: 14,
        color: "#1F2937",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s"
      }
    }
  );
}
function Select({ value, onChange, options }) {
  return /* @__PURE__ */ React.createElement(
    "select",
    {
      value,
      onChange: (e) => onChange(e.target.value),
      style: {
        width: "100%",
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: "1px solid #E5E7EB",
        fontSize: 14,
        color: "#1F2937",
        background: "#fff",
        outline: "none",
        boxSizing: "border-box",
        cursor: "pointer"
      }
    },
    options.map((o) => /* @__PURE__ */ React.createElement("option", { key: o.value, value: o.value }, o.label))
  );
}
function StatCard({ label, value, unit, color = "#22C55E" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: color + "10", borderRadius: 16, padding: "16px 20px", flex: 1, minWidth: 120 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 4 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 700, color } }, value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, unit));
}
function HealthProfile() {
  const [profile, setProfile] = useState({
    age: "27",
    gender: "male",
    height: "170",
    weight: "73.1",
    activity: "moderate",
    goal: "lose",
    targetWeight: "68"
  });
  const [saved, setSaved] = useState(false);
  const upd = (field, val) => setProfile((p) => ({ ...p, [field]: val }));
  const h = parseFloat(profile.height) / 100;
  const w = parseFloat(profile.weight);
  const bmi = h && w ? (w / (h * h)).toFixed(1) : "--";
  const activityFactor = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  const age = parseInt(profile.age);
  const isMale = profile.gender === "male";
  const bmr = isMale ? Math.round(88.362 + 13.397 * w + 4.799 * parseFloat(profile.height) - 5.677 * age) : Math.round(447.593 + 9.247 * w + 3.098 * parseFloat(profile.height) - 4.33 * age);
  const tdee = Math.round(bmr * (activityFactor[profile.activity] ?? 1.55));
  const bmiNum = parseFloat(bmi);
  const bmiStatus = isNaN(bmiNum) ? "--" : bmiNum < 18.5 ? "Thi\u1EBFu c\xE2n" : bmiNum < 25 ? "B\xECnh th\u01B0\u1EDDng" : bmiNum < 30 ? "Th\u1EEBa c\xE2n" : "B\xE9o ph\xEC";
  const bmiColor = isNaN(bmiNum) ? "#6B7280" : bmiNum < 18.5 ? "#F59E0B" : bmiNum < 25 ? "#22C55E" : bmiNum < 30 ? "#F59E0B" : "#EF4444";
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "H\u1ED3 s\u01A1 s\u1EE9c kh\u1ECFe"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "C\u1EADp nh\u1EADt th\xF4ng tin \u0111\u1EC3 nh\u1EADn g\u1EE3i \xFD dinh d\u01B0\u1EE1ng ch\xEDnh x\xE1c h\u01A1n.")), saved && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#065F46" } }, "H\u1ED3 s\u01A1 \u0111\xE3 \u0111\u01B0\u1EE3c l\u01B0u th\xE0nh c\xF4ng!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 24 }, className: "lg:grid-cols-2" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 20 } }, "Th\xF4ng tin c\u01A1 b\u1EA3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, null, "Tu\u1ED5i"), /* @__PURE__ */ React.createElement(Input, { value: profile.age, onChange: (e) => upd("age", e.target.value), type: "number", placeholder: "Tu\u1ED5i" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, null, "Gi\u1EDBi t\xEDnh"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: profile.gender,
      onChange: (v) => upd("gender", v),
      options: [{ label: "Nam", value: "male" }, { label: "N\u1EEF", value: "female" }]
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, null, "Chi\u1EC1u cao (cm)"), /* @__PURE__ */ React.createElement(Input, { value: profile.height, onChange: (e) => upd("height", e.target.value), type: "number", placeholder: "cm" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, null, "C\xE2n n\u1EB7ng hi\u1EC7n t\u1EA1i (kg)"), /* @__PURE__ */ React.createElement(Input, { value: profile.weight, onChange: (e) => upd("weight", e.target.value), type: "number", placeholder: "kg" }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement(Label, null, "M\u1EE9c \u0111\u1ED9 v\u1EADn \u0111\u1ED9ng"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: profile.activity,
      onChange: (v) => upd("activity", v),
      options: [
        { label: "\xCDt v\u1EADn \u0111\u1ED9ng (ng\u1ED3i nhi\u1EC1u)", value: "sedentary" },
        { label: "Nh\u1EB9 (1\u20133 ng\xE0y/tu\u1EA7n)", value: "light" },
        { label: "V\u1EEBa ph\u1EA3i (3\u20135 ng\xE0y/tu\u1EA7n)", value: "moderate" },
        { label: "T\xEDch c\u1EF1c (6\u20137 ng\xE0y/tu\u1EA7n)", value: "active" },
        { label: "R\u1EA5t t\xEDch c\u1EF1c (2 l\u1EA7n/ng\xE0y)", value: "veryActive" }
      ]
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement(Label, null, "M\u1EE5c ti\xEAu"), /* @__PURE__ */ React.createElement(
    Select,
    {
      value: profile.goal,
      onChange: (v) => upd("goal", v),
      options: [
        { label: "Gi\u1EA3m c\xE2n", value: "lose" },
        { label: "Duy tr\xEC c\xE2n n\u1EB7ng", value: "maintain" },
        { label: "T\u0103ng c\xE2n / t\u0103ng c\u01A1", value: "gain" }
      ]
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement(Label, null, "C\xE2n n\u1EB7ng m\u1EE5c ti\xEAu (kg)"), /* @__PURE__ */ React.createElement(Input, { value: profile.targetWeight, onChange: (e) => upd("targetWeight", e.target.value), type: "number", placeholder: "kg" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSave,
      style: {
        marginTop: 24,
        width: "100%",
        height: 44,
        borderRadius: 8,
        border: "none",
        background: "#22C55E",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer"
      }
    },
    "L\u01B0u h\u1ED3 s\u01A1"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Ch\u1EC9 s\u1ED1 t\u1EF1 \u0111\u1ED9ng t\xEDnh"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement(StatCard, { label: "BMI", value: bmi, unit: bmiStatus, color: bmiColor }), /* @__PURE__ */ React.createElement(StatCard, { label: "BMR", value: isNaN(bmr) ? "--" : bmr, unit: "kcal/ng\xE0y", color: "#2563EB" }), /* @__PURE__ */ React.createElement(StatCard, { label: "TDEE", value: isNaN(tdee) ? "--" : tdee, unit: "kcal/ng\xE0y", color: "#F59E0B" })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, fontSize: 13, color: "#6B7280", background: "#F9FAFB", borderRadius: 8, padding: 12 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "#374151" } }, "TDEE"), " l\xE0 l\u01B0\u1EE3ng calo b\u1EA1n c\u1EA7n m\u1ED7i ng\xE0y \u0111\u1EC3 duy tr\xEC c\xE2n n\u1EB7ng hi\u1EC7n t\u1EA1i. ", /* @__PURE__ */ React.createElement("br", null), "\u0110\u1EC3 ", /* @__PURE__ */ React.createElement("strong", null, "gi\u1EA3m c\xE2n"), " kh\u1ECFe m\u1EA1nh: \u0103n \xEDt h\u01A1n TDEE kho\u1EA3ng 300\u2013500 kcal.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "L\u1ECBch s\u1EED c\xE2n n\u1EB7ng"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 180 }, /* @__PURE__ */ React.createElement(LineChart, { data: weightHistory }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", tick: { fontSize: 11, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { domain: [71, 77], tick: { fontSize: 11, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 },
      formatter: (v) => [`${v} kg`, "C\xE2n n\u1EB7ng"]
    }
  ), /* @__PURE__ */ React.createElement(Line, { key: "weight", type: "monotone", dataKey: "weight", stroke: "#22C55E", strokeWidth: 2.5, dot: { fill: "#22C55E", r: 3 } })))))));
}
export {
  HealthProfile as default
};
