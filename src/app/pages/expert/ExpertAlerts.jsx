import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const alertUsers = [
  {
    id: 2,
    name: "L\xEA Th\u1ECB Mai",
    age: 32,
    bmi: 28.2,
    calo: 2480,
    caloBudget: 1800,
    weight: 82,
    targetWeight: 70,
    riskLevel: "danger",
    riskReason: "V\u01B0\u1EE3t 137% ng\xE2n s\xE1ch calo li\xEAn t\u1EE5c 3 ng\xE0y, BMI \u1EDF m\u1EE9c th\u1EEBa c\xE2n",
    lastActivity: "1 gi\u1EDD tr\u01B0\u1EDBc",
    trend: "up",
    history: [
      { day: "T2", calo: 2100, budget: 1800 },
      { day: "T3", calo: 2250, budget: 1800 },
      { day: "T4", calo: 2320, budget: 1800 },
      { day: "T5", calo: 2480, budget: 1800 },
      { day: "T6", calo: 2480, budget: 1800 },
      { day: "T7", calo: 2300, budget: 1800 },
      { day: "CN", calo: 2480, budget: 1800 }
    ]
  },
  {
    id: 4,
    name: "Tr\u1EA7n Th\u1ECB H\u01B0\u01A1ng",
    age: 45,
    bmi: 31.5,
    calo: 2100,
    caloBudget: 1600,
    weight: 90,
    targetWeight: 75,
    riskLevel: "warning",
    riskReason: "BMI 31.5 \u1EDF m\u1EE9c b\xE9o ph\xEC \u0111\u1ED9 I, ti\xEAu th\u1EE5 131% ng\xE2n s\xE1ch calo",
    lastActivity: "3 gi\u1EDD tr\u01B0\u1EDBc",
    trend: "stable",
    history: [
      { day: "T2", calo: 1950, budget: 1600 },
      { day: "T3", calo: 2e3, budget: 1600 },
      { day: "T4", calo: 1900, budget: 1600 },
      { day: "T5", calo: 2100, budget: 1600 },
      { day: "T6", calo: 2050, budget: 1600 },
      { day: "T7", calo: 1980, budget: 1600 },
      { day: "CN", calo: 2100, budget: 1600 }
    ]
  }
];
const riskConfig = {
  warning: { label: "C\u1EA3nh b\xE1o", bg: "#FEF3C7", color: "#B45309", border: "#F59E0B" },
  danger: { label: "Nguy hi\u1EC3m", bg: "#FEE2E2", color: "#991B1B", border: "#EF4444" }
};
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function ExpertAlerts() {
  const [expandedId, setExpandedId] = useState(alertUsers[0]?.id || null);
  const [interventions, setInterventions] = useState({});
  const [sentInterventions, setSentInterventions] = useState(/* @__PURE__ */ new Set());
  const handleSendIntervention = (userId) => {
    if (!interventions[userId]?.trim()) return;
    setSentInterventions((p) => /* @__PURE__ */ new Set([...p, userId]));
    setTimeout(() => {
      setSentInterventions((p) => {
        const next = new Set(p);
        next.delete(userId);
        return next;
      });
      setInterventions((p) => ({ ...p, [userId]: "" }));
    }, 3e3);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "C\u1EA3nh b\xE1o r\u1EE7i ro"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Theo d\xF5i v\xE0 can thi\u1EC7p k\u1ECBp th\u1EDDi cho ng\u01B0\u1EDDi d\xF9ng c\xF3 r\u1EE7i ro s\u1EE9c kh\u1ECFe.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 } }, [
    { label: "T\u1ED5ng c\u1EA3nh b\xE1o", value: alertUsers.length, color: "#F59E0B", bg: "#FEF3C7" },
    { label: "M\u1EE9c nguy hi\u1EC3m", value: alertUsers.filter((u) => u.riskLevel === "danger").length, color: "#EF4444", bg: "#FEE2E2" },
    { label: "M\u1EE9c c\u1EA3nh b\xE1o", value: alertUsers.filter((u) => u.riskLevel === "warning").length, color: "#F59E0B", bg: "#FEF3C7" },
    { label: "C\u1EA7n can thi\u1EC7p ngay", value: alertUsers.filter((u) => u.riskLevel === "danger").length, color: "#DC2626", bg: "#FEE2E2" }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label, style: { background: s.bg } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: s.color, fontWeight: 600 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1.2, marginTop: 4 } }, s.value)))), /* @__PURE__ */ React.createElement("div", { style: { background: "#EFF6FF", borderLeft: "4px solid #2563EB", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 14, color: "#1E3A8A" } }, /* @__PURE__ */ React.createElement("strong", null, "H\u01B0\u1EDBng d\u1EABn x\u1EED l\xFD:"), " V\u1EDBi ng\u01B0\u1EDDi d\xF9ng \u1EDF m\u1EE9c nguy hi\u1EC3m, h\xE3y li\xEAn h\u1EC7 trong v\xF2ng 24 gi\u1EDD v\xE0 \u0111i\u1EC1u ch\u1EC9nh th\u1EF1c \u0111\u01A1n ngay. V\u1EDBi m\u1EE9c c\u1EA3nh b\xE1o, theo d\xF5i th\xEAm 48 gi\u1EDD v\xE0 g\u1EEDi l\u1EDDi khuy\xEAn dinh d\u01B0\u1EE1ng ph\xF9 h\u1EE3p."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, alertUsers.map((user) => {
    const rc = riskConfig[user.riskLevel];
    const caloPct = Math.round(user.calo / user.caloBudget * 100);
    const isExpanded = expandedId === user.id;
    const isSent = sentInterventions.has(user.id);
    return /* @__PURE__ */ React.createElement(Card, { key: user.id, style: { borderLeft: `4px solid ${rc.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 } }, user.name.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937" } }, user.name), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: rc.bg, color: rc.color } }, rc.label)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 3 } }, user.age, " tu\u1ED5i \xB7 Ho\u1EA1t \u0111\u1ED9ng: ", user.lastActivity))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setExpandedId(isExpanded ? null : user.id),
        style: { height: 38, padding: "0 16px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }
      },
      isExpanded ? "Thu g\u1ECDn \u25B2" : "Xem chi ti\u1EBFt \u25BC"
    )), /* @__PURE__ */ React.createElement("div", { style: { background: rc.bg, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: rc.color } }, /* @__PURE__ */ React.createElement("strong", null, "L\xFD do c\u1EA3nh b\xE1o:"), " ", user.riskReason), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: isExpanded ? 20 : 0 } }, [
      { label: "BMI", value: user.bmi, unit: "", color: user.bmi >= 30 ? "#EF4444" : "#F59E0B" },
      { label: "C\xE2n n\u1EB7ng", value: user.weight, unit: " kg", color: "#1F2937" },
      { label: "M\u1EE5c ti\xEAu", value: user.targetWeight, unit: " kg", color: "#22C55E" },
      { label: "Calo h\xF4m nay", value: `${caloPct}%`, unit: " ng\xE2n s\xE1ch", color: caloPct > 130 ? "#EF4444" : "#F59E0B" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, style: { background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: s.color, marginTop: 2 } }, s.value, s.unit)))), isExpanded && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 } }, "Calo 7 ng\xE0y qua"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(BarChart, { data: user.history, barGap: 2 }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6", vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 },
        formatter: (v, name) => [`${v} kcal`, name === "calo" ? "Calo n\u1EA1p" : "Ng\xE2n s\xE1ch"]
      }
    ), /* @__PURE__ */ React.createElement(Bar, { key: `calo-${user.id}`, dataKey: "calo", fill: user.riskLevel === "danger" ? "#EF4444" : "#F59E0B", radius: [4, 4, 0, 0], name: "calo" }), /* @__PURE__ */ React.createElement(Bar, { key: `budget-${user.id}`, dataKey: "budget", fill: "#D1FAE5", radius: [4, 4, 0, 0], name: "budget" }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 20, padding: 16, background: "#F9FAFB", borderRadius: 12 } }, /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginBottom: 12 } }, "G\u1EEDi t\u01B0 v\u1EA5n / can thi\u1EC7p"), isSent ? /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#065F46" } }, "\u0110\xE3 g\u1EEDi t\u01B0 v\u1EA5n \u0111\u1EBFn ", user.name, " th\xE0nh c\xF4ng!") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } }, [
      "H\xE3y gi\u1EA3m kh\u1EA9u ph\u1EA7n c\u01A1m v\xE0 t\u0103ng rau xanh trong b\u1EEFa \u0103n",
      "T\u1EADp th\u1EC3 d\u1EE5c \xEDt nh\u1EA5t 30 ph\xFAt m\u1ED7i ng\xE0y \u0111\u1EC3 c\u1EA3i thi\u1EC7n s\u1EE9c kh\u1ECFe",
      "U\u1ED1ng \u0111\u1EE7 2-2.5L n\u01B0\u1EDBc m\u1ED7i ng\xE0y v\xE0 h\u1EA1n ch\u1EBF \u0111\u1ED3 u\u1ED1ng c\xF3 \u0111\u01B0\u1EDDng"
    ].map((suggestion) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: suggestion,
        onClick: () => setInterventions((p) => ({ ...p, [user.id]: suggestion })),
        style: { padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer", textAlign: "left" }
      },
      suggestion
    ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: interventions[user.id] || "",
        onChange: (e) => setInterventions((p) => ({ ...p, [user.id]: e.target.value })),
        placeholder: "Nh\u1EADp l\u1EDDi khuy\xEAn dinh d\u01B0\u1EE1ng cho ng\u01B0\u1EDDi d\xF9ng...",
        rows: 3,
        style: { flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none" }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleSendIntervention(user.id),
        style: { padding: "0 20px", borderRadius: 8, border: "none", background: user.riskLevel === "danger" ? "#EF4444" : "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
      },
      "G\u1EEDi ngay"
    ))))));
  }), alertUsers.length === 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#22C55E", marginBottom: 8 } }, "T\u1EA5t c\u1EA3 \u0111ang an to\xE0n!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Kh\xF4ng c\xF3 ng\u01B0\u1EDDi d\xF9ng n\xE0o c\u1EA7n c\u1EA3nh b\xE1o hi\u1EC7n t\u1EA1i.")))));
}
export {
  ExpertAlerts as default
};
