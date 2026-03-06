import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";
const users = [
  { id: 1, name: "Nguy\u1EC5n V\u0103n An", age: 27, bmi: 23.4, calo: 1450, caloBudget: 2e3, goal: "Gi\u1EA3m c\xE2n", riskLevel: "safe", lastActivity: "2 gi\u1EDD tr\u01B0\u1EDBc", weight: 73.1, targetWeight: 68 },
  { id: 2, name: "L\xEA Th\u1ECB Mai", age: 32, bmi: 28.2, calo: 2480, caloBudget: 1800, goal: "Gi\u1EA3m c\xE2n", riskLevel: "danger", lastActivity: "1 gi\u1EDD tr\u01B0\u1EDBc", weight: 82, targetWeight: 70 },
  { id: 3, name: "Ph\u1EA1m Minh Tu\u1EA5n", age: 24, bmi: 19.1, calo: 2200, caloBudget: 2800, goal: "T\u0103ng c\xE2n", riskLevel: "safe", lastActivity: "5 ph\xFAt tr\u01B0\u1EDBc", weight: 58, targetWeight: 65 },
  { id: 4, name: "Tr\u1EA7n Th\u1ECB H\u01B0\u01A1ng", age: 45, bmi: 31.5, calo: 2100, caloBudget: 1600, goal: "Gi\u1EA3m c\xE2n", riskLevel: "warning", lastActivity: "3 gi\u1EDD tr\u01B0\u1EDBc", weight: 90, targetWeight: 75 },
  { id: 5, name: "Ho\xE0ng Minh \u0110\u1EE9c", age: 35, bmi: 22.8, calo: 1920, caloBudget: 2200, goal: "Duy tr\xEC", riskLevel: "safe", lastActivity: "30 ph\xFAt tr\u01B0\u1EDBc", weight: 72, targetWeight: 72 }
];
const weightChartData = [
  { week: "T1", an: 75.5, mai: 83, tuan: 58.5, huong: 91 },
  { week: "T2", an: 75.1, mai: 82.8, tuan: 59, huong: 90.5 },
  { week: "T3", an: 74.3, mai: 82.3, tuan: 59.2, huong: 90.2 },
  { week: "T4", an: 73.9, mai: 82, tuan: 59.5, huong: 90 }
];
const riskConfig = {
  safe: { label: "An to\xE0n", bg: "#D1FAE5", color: "#065F46" },
  warning: { label: "C\u1EA3nh b\xE1o", bg: "#FEF3C7", color: "#B45309" },
  danger: { label: "Nguy hi\u1EC3m", bg: "#FEE2E2", color: "#991B1B" }
};
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function ExpertDashboard() {
  const navigate = useNavigate();
  const dangerCount = users.filter((u) => u.riskLevel === "danger").length;
  const warningCount = users.filter((u) => u.riskLevel === "warning").length;
  const safeCount = users.filter((u) => u.riskLevel === "safe").length;
  const recentAlerts = users.filter((u) => u.riskLevel !== "safe").slice(0, 3);
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Dashboard Chuy\xEAn gia"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Xin ch\xE0o! D\u01B0\u1EDBi \u0111\xE2y l\xE0 t\u1ED5ng quan ho\u1EA1t \u0111\u1ED9ng h\xF4m nay.")), (dangerCount > 0 || warningCount > 0) && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 } }, dangerCount > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#991B1B", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "C\u1EA3nh b\xE1o kh\u1EA9n:"), " ", dangerCount, " ng\u01B0\u1EDDi d\xF9ng v\u01B0\u1EE3t ng\u01B0\u1EE1ng an to\xE0n \u2013 c\u1EA7n can thi\u1EC7p ngay."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/expert/alerts"),
      style: { padding: "6px 14px", borderRadius: 6, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }
    },
    "Xem c\u1EA3nh b\xE1o"
  )), warningCount > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#92400E", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "L\u01B0u \xFD:"), " ", warningCount, " ng\u01B0\u1EDDi d\xF9ng \u0111ang \u1EDF m\u1EE9c c\u1EA3nh b\xE1o. H\xE3y ki\u1EC3m tra th\u1EF1c \u0111\u01A1n."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/expert/alerts"),
      style: { padding: "6px 14px", borderRadius: 6, border: "1.5px solid #F59E0B", background: "transparent", color: "#B45309", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }
    },
    "Xem chi ti\u1EBFt"
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 24 } }, [
    { label: "T\u1ED5ng ng\u01B0\u1EDDi d\xF9ng", value: users.length, color: "#2563EB", path: "/expert/users" },
    { label: "An to\xE0n", value: safeCount, color: "#22C55E", path: "/expert/users" },
    { label: "C\u1EA3nh b\xE1o", value: warningCount, color: "#F59E0B", path: "/expert/alerts" },
    { label: "Nguy hi\u1EC3m", value: dangerCount, color: "#EF4444", path: "/expert/alerts" }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label, style: { cursor: "pointer" }, onClick: () => navigate(s.path) }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 4 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, fontWeight: 700, color: s.color } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 4 } }, "Nh\u1EA5n \u0111\u1EC3 xem \u2192")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/expert/users"),
      style: { height: 44, padding: "0 20px", borderRadius: 10, border: "1.5px solid #2563EB", background: "#DBEAFE", color: "#1D4ED8", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/expert/create-menu"),
      style: { height: 44, padding: "0 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "+ T\u1EA1o th\u1EF1c \u0111\u01A1n m\u1EDBi"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/expert/alerts"),
      style: { height: 44, padding: "0 20px", borderRadius: 10, border: "1.5px solid #EF4444", background: dangerCount > 0 ? "#FEE2E2" : "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "C\u1EA3nh b\xE1o r\u1EE7i ro ",
    dangerCount > 0 && `(${dangerCount})`
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, { style: { gridColumn: "span 2" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937" } }, "Xu h\u01B0\u1EDBng c\xE2n n\u1EB7ng ng\u01B0\u1EDDi d\xF9ng (4 tu\u1EA7n)"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("/expert/users"), style: { fontSize: 13, color: "#2563EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 } }, "Xem t\u1EA5t c\u1EA3 \u2192")), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 260 }, /* @__PURE__ */ React.createElement(LineChart, { data: weightChartData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }, formatter: (v) => [`${v} kg`] }), /* @__PURE__ */ React.createElement(Line, { key: "an", type: "monotone", dataKey: "an", stroke: "#22C55E", strokeWidth: 2, name: "Nguy\u1EC5n V.An", dot: { r: 4 } }), /* @__PURE__ */ React.createElement(Line, { key: "mai", type: "monotone", dataKey: "mai", stroke: "#EF4444", strokeWidth: 2, name: "L\xEA T.Mai", dot: { r: 4 } }), /* @__PURE__ */ React.createElement(Line, { key: "tuan", type: "monotone", dataKey: "tuan", stroke: "#2563EB", strokeWidth: 2, name: "P.M.Tu\u1EA5n", dot: { r: 4 } }), /* @__PURE__ */ React.createElement(Line, { key: "huong", type: "monotone", dataKey: "huong", stroke: "#F59E0B", strokeWidth: 2, name: "T.T.H\u01B0\u01A1ng", dot: { r: 4 } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" } }, [{ name: "Nguy\u1EC5n V.An", color: "#22C55E" }, { name: "L\xEA T.Mai", color: "#EF4444" }, { name: "P.M.Tu\u1EA5n", color: "#2563EB" }, { name: "T.T.H\u01B0\u01A1ng", color: "#F59E0B" }].map((l) => /* @__PURE__ */ React.createElement("div", { key: l.name, style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 12, height: 3, borderRadius: 2, background: l.color } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#6B7280" } }, l.name))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937" } }, "Ng\u01B0\u1EDDi d\xF9ng c\u1EA7n theo d\xF5i"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("/expert/alerts"), style: { fontSize: 13, color: "#2563EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 } }, "Xem t\u1EA5t c\u1EA3 \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, recentAlerts.length > 0 ? recentAlerts.map((u) => {
    const rc = riskConfig[u.riskLevel];
    const caloPct = Math.round(u.calo / u.caloBudget * 100);
    return /* @__PURE__ */ React.createElement("div", { key: u.id, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#F9FAFB", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 } }, u.name.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#1F2937" } }, u.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, caloPct, "% ng\xE2n s\xE1ch calo \xB7 ", u.lastActivity))), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: rc.bg, color: rc.color } }, rc.label));
  }) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "20px 0", color: "#9CA3AF", fontSize: 14 } }, "T\u1EA5t c\u1EA3 ng\u01B0\u1EDDi d\xF9ng \u0111ang an to\xE0n")))));
}
export {
  ExpertDashboard as default
};
