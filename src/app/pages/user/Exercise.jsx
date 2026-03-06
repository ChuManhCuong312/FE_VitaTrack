import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
const weekData = [
  { day: "T2", buoc: 8500, calo: 290 },
  { day: "T3", buoc: 6200, calo: 210 },
  { day: "T4", buoc: 11200, calo: 380 },
  { day: "T5", buoc: 9800, calo: 335 },
  { day: "T6", buoc: 7400, calo: 252 },
  { day: "T7", buoc: 12500, calo: 425 },
  { day: "CN", buoc: 7542, calo: 258 }
];
const ACTIVITIES = [
  { id: 1, name: "Ch\u1EA1y b\u1ED9", met: 8, unit: "ph\xFAt" },
  { id: 2, name: "\u0110\u1EA1p xe", met: 6, unit: "ph\xFAt" },
  { id: 3, name: "B\u01A1i l\u1ED9i", met: 7, unit: "ph\xFAt" },
  { id: 4, name: "T\u1EADp gym", met: 5, unit: "ph\xFAt" },
  { id: 5, name: "Yoga", met: 3, unit: "ph\xFAt" },
  { id: 6, name: "\u0110i b\u1ED9", met: 3.5, unit: "ph\xFAt" },
  { id: 7, name: "B\xF3ng \u0111\xE1", met: 7, unit: "ph\xFAt" },
  { id: 8, name: "C\u1EA7u l\xF4ng", met: 5.5, unit: "ph\xFAt" }
];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function Exercise() {
  const [logs, setLogs] = useState([
    { id: 1, name: "Ch\u1EA1y b\u1ED9", duration: 30, calo: 300, time: "07:00" },
    { id: 2, name: "\u0110i b\u1ED9", duration: 15, calo: 60, time: "12:30" }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ activity: "0", duration: "", time: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const totalCalo = logs.reduce((s, l) => s + l.calo, 0);
  const totalMin = logs.reduce((s, l) => s + l.duration, 0);
  const weight = 73.1;
  const addActivity = () => {
    const errs = {};
    if (form.activity === "0") errs.activity = "Vui l\xF2ng ch\u1ECDn ho\u1EA1t \u0111\u1ED9ng";
    if (!form.duration || parseInt(form.duration) <= 0) errs.duration = "Vui l\xF2ng nh\u1EADp th\u1EDDi gian h\u1EE3p l\u1EC7";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const actIdx = parseInt(form.activity) - 1;
    const act = ACTIVITIES[actIdx];
    const calo = Math.round(act.met * weight * parseInt(form.duration) / 60);
    setLogs((p) => [
      ...p,
      { id: Date.now(), name: act.name, duration: parseInt(form.duration), calo, time: form.time || "08:00" }
    ]);
    setForm({ activity: "0", duration: "", time: "" });
    setErrors({});
    setShowModal(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Theo d\xF5i v\u1EADn \u0111\u1ED9ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Ghi l\u1EA1i ho\u1EA1t \u0111\u1ED9ng th\u1EC3 ch\u1EA5t v\xE0 theo d\xF5i ti\u1EBFn tr\xECnh c\u1EE7a b\u1EA1n.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 } }, [
    { label: "S\u1ED1 b\u01B0\u1EDBc h\xF4m nay", value: "7,542", unit: "/ 10,000 b\u01B0\u1EDBc", color: "#2563EB", pct: 75 },
    { label: "Calo ti\xEAu hao", value: totalCalo, unit: "kcal", color: "#22C55E", pct: Math.min(totalCalo / 500 * 100, 100) },
    { label: "Th\u1EDDi gian t\u1EADp", value: totalMin, unit: "ph\xFAt", color: "#F59E0B", pct: Math.min(totalMin / 60 * 100, 100) },
    { label: "Qu\xE3ng \u0111\u01B0\u1EDDng", value: "5.2", unit: "km", color: "#10B981", pct: 52 }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 6 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 10, marginTop: 2 } }, s.unit), /* @__PURE__ */ React.createElement("div", { style: { background: "#E5E7EB", borderRadius: 99, height: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 99 } }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }, className: "lg:grid-cols-[1fr_340px]" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "S\u1ED1 b\u01B0\u1EDBc \u2013 Tu\u1EA7n n\xE0y"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(BarChart, { data: weekData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6", vertical: false }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 },
      formatter: (v) => [`${v.toLocaleString()} b\u01B0\u1EDBc`]
    }
  ), /* @__PURE__ */ React.createElement(Bar, { key: "buoc", dataKey: "buoc", fill: "#2563EB", radius: [4, 4, 0, 0] })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Calo ti\xEAu hao \u2013 Tu\u1EA7n n\xE0y"), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 180 }, /* @__PURE__ */ React.createElement(LineChart, { data: weekData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fontSize: 12, fill: "#6B7280" } }), /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      contentStyle: { borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 },
      formatter: (v) => [`${v} kcal`]
    }
  ), /* @__PURE__ */ React.createElement(Line, { key: "calo", type: "monotone", dataKey: "calo", stroke: "#22C55E", strokeWidth: 2.5, dot: { fill: "#22C55E", r: 4 } }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937" } }, "Ho\u1EA1t \u0111\u1ED9ng h\xF4m nay"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowModal(true),
      style: { height: 36, padding: "0 14px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }
    },
    "+ Th\xEAm"
  )), logs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "24px 0", color: "#6B7280", fontSize: 14 } }, "Ch\u01B0a ghi nh\u1EADn ho\u1EA1t \u0111\u1ED9ng n\xE0o.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, logs.map((log) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: log.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: 12,
        background: "#F9FAFB",
        border: "1px solid #F3F4F6"
      }
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, log.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, log.time, " \xB7 ", log.duration, " ph\xFAt")),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 600, color: "#22C55E" } }, "-", log.calo, " kcal"), confirmDelete === log.id ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setLogs((p) => p.filter((l) => l.id !== log.id));
          setConfirmDelete(null);
        },
        style: { padding: "4px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" }
      },
      "X\xF3a"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setConfirmDelete(null),
        style: { padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 11, cursor: "pointer" }
      },
      "H\u1EE7y"
    )) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setConfirmDelete(log.id),
        style: { padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280", fontSize: 11, cursor: "pointer" }
      },
      "X\xF3a"
    ))
  )))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 } }, "Li\xEAn k\u1EBFt thi\u1EBFt b\u1ECB"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, [
    { name: "Google Fit", status: "Ch\u01B0a k\u1EBFt n\u1ED1i" },
    { name: "Apple Health", status: "Ch\u01B0a k\u1EBFt n\u1ED1i" },
    { name: "Garmin Connect", status: "Ch\u01B0a k\u1EBFt n\u1ED1i" }
  ].map((d) => /* @__PURE__ */ React.createElement("div", { key: d.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 12, border: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, d.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, d.status)), /* @__PURE__ */ React.createElement("button", { style: { height: 32, padding: "0 12px", borderRadius: 8, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 12, fontWeight: 500, cursor: "pointer" } }, "K\u1EBFt n\u1ED1i"))))))), showModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937", marginBottom: 20 } }, "Th\xEAm ho\u1EA1t \u0111\u1ED9ng"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Lo\u1EA1i ho\u1EA1t \u0111\u1ED9ng"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.activity,
      onChange: (e) => {
        setForm((p) => ({ ...p, activity: e.target.value }));
        setErrors((p) => ({ ...p, activity: "" }));
      },
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: `1px solid ${errors.activity ? "#EF4444" : "#E5E7EB"}`, fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "0" }, "-- Ch\u1ECDn ho\u1EA1t \u0111\u1ED9ng --"),
    ACTIVITIES.map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id }, a.name))
  ), errors.activity && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 } }, errors.activity)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Th\u1EDDi gian (ph\xFAt)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: form.duration,
      onChange: (e) => {
        setForm((p) => ({ ...p, duration: e.target.value }));
        setErrors((p) => ({ ...p, duration: "" }));
      },
      placeholder: "30",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: `1px solid ${errors.duration ? "#EF4444" : "#E5E7EB"}`, fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ), errors.duration && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 } }, errors.duration)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Th\u1EDDi \u0111i\u1EC3m"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "time",
      value: form.time,
      onChange: (e) => setForm((p) => ({ ...p, time: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addActivity,
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u ho\u1EA1t \u0111\u1ED9ng"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setShowModal(false);
        setErrors({});
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "H\u1EE7y"
  )))));
}
export {
  Exercise as default
};
