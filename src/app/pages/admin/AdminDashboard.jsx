import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router";
const userStats = [
  { month: "T10", users: 142 },
  { month: "T11", users: 198 },
  { month: "T12", users: 264 },
  { month: "T1", users: 312 },
  { month: "T2", users: 389 },
  { month: "T3", users: 451 }
];
const roleData = [
  { name: "Ng\u01B0\u1EDDi d\xF9ng", value: 420, color: "#22C55E" },
  { name: "Chuy\xEAn gia", value: 28, color: "#2563EB" },
  { name: "Admin", value: 3, color: "#F59E0B" }
];
const recentActivities = [
  { id: 1, action: "Ng\u01B0\u1EDDi d\xF9ng m\u1EDBi \u0111\u0103ng k\xFD", user: "Nguy\u1EC5n Th\u1ECB Lan", time: "5 ph\xFAt tr\u01B0\u1EDBc", type: "user" },
  { id: 2, action: "Y\xEAu c\u1EA7u ph\xEA duy\u1EC7t chuy\xEAn gia", user: "TS. Nguy\u1EC5n Th\xE0nh C\xF4ng", time: "15 ph\xFAt tr\u01B0\u1EDBc", type: "expert" },
  { id: 3, action: "Ng\u01B0\u1EDDi d\xF9ng vi ph\u1EA1m b\u1ECB kh\xF3a", user: "Ph\u1EA1m V\u0103n T\xF9ng", time: "1 gi\u1EDD tr\u01B0\u1EDBc", type: "lock" },
  { id: 4, action: "Th\xEAm 12 th\u1EF1c ph\u1EA9m m\u1EDBi v\xE0o DB", user: "Admin H\u1EC7 Th\u1ED1ng", time: "2 gi\u1EDD tr\u01B0\u1EDBc", type: "food" },
  { id: 5, action: "Chuy\xEAn gia m\u1EDBi \u0111\u01B0\u1EE3c ph\xEA duy\u1EC7t", user: "BS. L\xEA Th\u1ECB Tuy\u1EBFt", time: "3 gi\u1EDD tr\u01B0\u1EDBc", type: "approve" }
];
function Card({ children, style, onClick }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", cursor: onClick ? "pointer" : "default", ...style }
    },
    children
  );
}
function AdminDashboard() {
  const navigate = useNavigate();
  const pendingExpertCount = 2;
  const lockedUserCount = 1;
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Dashboard Qu\u1EA3n tr\u1ECB vi\xEAn"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "T\u1ED5ng quan h\u1EC7 th\u1ED1ng VitaTrack \u2013 ", (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))), pendingExpertCount > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 14, color: "#92400E", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Ch\u1EDD x\u1EED l\xFD:"), " ", pendingExpertCount, " y\xEAu c\u1EA7u ph\xEA duy\u1EC7t chuy\xEAn gia \u0111ang ch\u1EDD."), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("/admin/experts"), style: { padding: "6px 14px", borderRadius: 6, border: "1.5px solid #F59E0B", background: "transparent", color: "#B45309", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Xem ngay")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 } }, [
    { label: "T\u1ED5ng ng\u01B0\u1EDDi d\xF9ng", value: "451", color: "#22C55E", path: "/admin/users" },
    { label: "Chuy\xEAn gia x\xE1c minh", value: "28", color: "#2563EB", path: "/admin/experts" },
    { label: "Th\u1EF1c ph\u1EA9m trong DB", value: "1,284", color: "#F59E0B", path: "/admin/food" },
    { label: "Ng\u01B0\u1EDDi d\xF9ng ho\u1EA1t \u0111\u1ED9ng", value: "387", color: "#10B981", path: "/admin/users" }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label, onClick: () => navigate(s.path) }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 4 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 30, fontWeight: 700, color: s.color } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 4 } }, "Nh\u1EA5n \u0111\u1EC3 qu\u1EA3n l\xFD \u2192")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/admin/users"),
      style: { height: 44, padding: "0 18px", borderRadius: 10, border: "1.5px solid #22C55E", background: "#DCFCE7", color: "#16A34A", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/admin/food"),
      style: { height: 44, padding: "0 18px", borderRadius: 10, border: "1.5px solid #F59E0B", background: "#FEF3C7", color: "#B45309", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "Qu\u1EA3n l\xFD th\u1EF1c ph\u1EA9m"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/admin/experts"),
      style: { height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "C\u1EA5p quy\u1EC1n chuy\xEAn gia ",
    pendingExpertCount > 0 && `(${pendingExpertCount} ch\u1EDD)`
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 } }, /* @__PURE__ */ React.createElement(Card, { style: { gridColumn: "span 2" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "T\u0103ng tr\u01B0\u1EDFng ng\u01B0\u1EDDi d\xF9ng (6 th\xE1ng)"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 240 }, /* @__PURE__ */ React.createElement(BarChart, { data: userStats }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6", vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }, formatter: (v) => [`${v} ng\u01B0\u1EDDi`] }), /* @__PURE__ */ React.createElement(Bar, { key: "users", dataKey: "users", fill: "#22C55E", radius: [4, 4, 0, 0] })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Ph\xE2n b\u1ED5 vai tr\xF2"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(Pie, { key: "roleData", data: roleData, cx: "50%", cy: "50%", outerRadius: 80, dataKey: "value", label: ({ name, percent }) => `${(percent * 100).toFixed(0)}%` }, roleData.map((entry, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: entry.color }))), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [`${v} ng\u01B0\u1EDDi`] }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginTop: 8 } }, roleData.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: 2, background: r.color } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#374151" } }, r.name)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#1F2937" } }, r.value)))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Ho\u1EA1t \u0111\u1ED9ng g\u1EA7n \u0111\xE2y"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0 } }, recentActivities.map((activity, i) => /* @__PURE__ */ React.createElement("div", { key: activity.id, style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < recentActivities.length - 1 ? "1px solid #F3F4F6" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    background: activity.type === "user" ? "#DCFCE7" : activity.type === "expert" ? "#DBEAFE" : activity.type === "lock" ? "#FEE2E2" : activity.type === "food" ? "#FEF3C7" : "#D1FAE5",
    color: activity.type === "user" ? "#16A34A" : activity.type === "expert" ? "#1D4ED8" : activity.type === "lock" ? "#DC2626" : activity.type === "food" ? "#B45309" : "#065F46"
  } }, activity.type === "user" ? "U" : activity.type === "expert" ? "E" : activity.type === "lock" ? "X" : activity.type === "food" ? "F" : "\u2713"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#1F2937" } }, activity.action), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF" } }, activity.user)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" } }, activity.time))))));
}
export {
  AdminDashboard as default
};
