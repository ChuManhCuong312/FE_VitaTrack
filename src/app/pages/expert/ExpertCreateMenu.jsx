import React, { useState } from "react";
const sampleMenus = [
  {
    id: 1,
    title: "Th\u1EF1c \u0111\u01A1n gi\u1EA3m c\xE2n tu\u1EA7n 1",
    targetUser: "L\xEA Th\u1ECB Mai",
    calories: 1600,
    duration: "7 ng\xE0y",
    createdAt: "01/03/2026",
    status: "active",
    items: [
      { meal: "B\u1EEFa s\xE1ng", foods: "Y\u1EBFn m\u1EA1ch + s\u1EEFa h\u1EA1nh nh\xE2n + chu\u1ED1i", calories: 320, time: "07:00" },
      { meal: "B\u1EEFa tr\u01B0a", foods: "C\u01A1m g\u1EA1o l\u1EE9t + \u1EE9c g\xE0 lu\u1ED9c + rau lu\u1ED9c", calories: 480, time: "12:00" },
      { meal: "B\u1EEFa ph\u1EE5", foods: "T\xE1o + h\u1EA1t h\u1EA1nh nh\xE2n (10g)", calories: 150, time: "15:30" },
      { meal: "B\u1EEFa t\u1ED1i", foods: "Salad c\xE1 h\u1ED3i + d\u01B0a leo + d\u1EA7u olive", calories: 420, time: "18:30" }
    ]
  },
  {
    id: 2,
    title: "Th\u1EF1c \u0111\u01A1n t\u0103ng c\u01A1 \u2013 Ph\u1EA1m Minh Tu\u1EA5n",
    targetUser: "Ph\u1EA1m Minh Tu\u1EA5n",
    calories: 2800,
    duration: "14 ng\xE0y",
    createdAt: "28/02/2026",
    status: "active",
    items: [
      { meal: "B\u1EEFa s\xE1ng", foods: "Tr\u1EE9ng \u1ED1p la (3 qu\u1EA3) + b\xE1nh m\xEC nguy\xEAn c\xE1m + s\u1EEFa t\u01B0\u01A1i", calories: 520, time: "07:00" },
      { meal: "B\u1EEFa tr\u01B0a", foods: "C\u01A1m + th\u1ECBt b\xF2 x\xE0o + rau c\u1EA3i xanh", calories: 680, time: "12:00" },
      { meal: "B\u1EEFa ph\u1EE5", foods: "Protein shake + chu\u1ED1i", calories: 380, time: "15:00" },
      { meal: "B\u1EEFa t\u1ED1i", foods: "C\u01A1m g\u1EA1o l\u1EE9t + c\xE1 thu + \u0111\u1EADu h\u0169", calories: 620, time: "18:30" }
    ]
  },
  {
    id: 3,
    title: "Th\u1EF1c \u0111\u01A1n duy tr\xEC s\u1EE9c kh\u1ECFe",
    targetUser: "Nguy\u1EC5n V\u0103n An",
    calories: 2e3,
    duration: "30 ng\xE0y",
    createdAt: "25/02/2026",
    status: "completed",
    items: []
  }
];
const users = ["Nguy\u1EC5n V\u0103n An", "L\xEA Th\u1ECB Mai", "Ph\u1EA1m Minh Tu\u1EA5n", "Tr\u1EA7n Th\u1ECB H\u01B0\u01A1ng", "Ho\xE0ng Minh \u0110\u1EE9c"];
const statusConfig = {
  active: { label: "\u0110ang \xE1p d\u1EE5ng", bg: "#D1FAE5", color: "#065F46" },
  draft: { label: "Nh\xE1p", bg: "#F3F4F6", color: "#6B7280" },
  completed: { label: "Ho\xE0n th\xE0nh", bg: "#DBEAFE", color: "#1D4ED8" }
};
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function ExpertCreateMenu() {
  const [menus, setMenus] = useState(sampleMenus);
  const [showForm, setShowForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: "",
    targetUser: "",
    calories: "",
    duration: "",
    notes: ""
  });
  const [menuItems, setMenuItems] = useState([
    { meal: "B\u1EEFa s\xE1ng", foods: "", calories: 0, time: "07:00" },
    { meal: "B\u1EEFa tr\u01B0a", foods: "", calories: 0, time: "12:00" },
    { meal: "B\u1EEFa ph\u1EE5", foods: "", calories: 0, time: "15:30" },
    { meal: "B\u1EEFa t\u1ED1i", foods: "", calories: 0, time: "18:30" }
  ]);
  const handleSave = (asDraft = false) => {
    const newMenu = {
      id: Date.now(),
      title: form.title || "Th\u1EF1c \u0111\u01A1n m\u1EDBi",
      targetUser: form.targetUser,
      calories: parseInt(form.calories) || 0,
      duration: form.duration ? `${form.duration} ng\xE0y` : "7 ng\xE0y",
      createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
      status: asDraft ? "draft" : "active",
      items: menuItems.filter((i) => i.foods.trim())
    };
    setMenus((p) => [newMenu, ...p]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowForm(false);
      setForm({ title: "", targetUser: "", calories: "", duration: "", notes: "" });
      setMenuItems([
        { meal: "B\u1EEFa s\xE1ng", foods: "", calories: 0, time: "07:00" },
        { meal: "B\u1EEFa tr\u01B0a", foods: "", calories: 0, time: "12:00" },
        { meal: "B\u1EEFa ph\u1EE5", foods: "", calories: 0, time: "15:30" },
        { meal: "B\u1EEFa t\u1ED1i", foods: "", calories: 0, time: "18:30" }
      ]);
    }, 2e3);
  };
  const totalCalories = menuItems.reduce((s, i) => s + (i.calories || 0), 0);
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "T\u1EA1o th\u1EF1c \u0111\u01A1n"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "X\xE2y d\u1EF1ng v\xE0 qu\u1EA3n l\xFD k\u1EBF ho\u1EA1ch dinh d\u01B0\u1EE1ng cho ng\u01B0\u1EDDi d\xF9ng.")), !showForm && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowForm(true),
      style: { height: 44, padding: "0 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "+ T\u1EA1o th\u1EF1c \u0111\u01A1n m\u1EDBi"
  )), showForm && /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 20 } }, "Th\u1EF1c \u0111\u01A1n m\u1EDBi"), saved && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\u1EF1c \u0111\u01A1n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o v\xE0 g\u1EEDi \u0111\u1EBFn ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "T\xEAn th\u1EF1c \u0111\u01A1n"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.title,
      onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
      placeholder: "VD: Th\u1EF1c \u0111\u01A1n gi\u1EA3m c\xE2n tu\u1EA7n 1",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Ng\u01B0\u1EDDi d\xF9ng"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.targetUser,
      onChange: (e) => setForm((p) => ({ ...p, targetUser: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Ch\u1ECDn ng\u01B0\u1EDDi d\xF9ng --"),
    users.map((u) => /* @__PURE__ */ React.createElement("option", { key: u, value: u }, u))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "M\u1EE5c ti\xEAu calo/ng\xE0y"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: form.calories,
      onChange: (e) => setForm((p) => ({ ...p, calories: e.target.value })),
      placeholder: "1600",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Th\u1EDDi gian (ng\xE0y)"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.duration,
      onChange: (e) => setForm((p) => ({ ...p, duration: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "Ch\u1ECDn th\u1EDDi gian"),
    /* @__PURE__ */ React.createElement("option", { value: "7" }, "7 ng\xE0y"),
    /* @__PURE__ */ React.createElement("option", { value: "14" }, "14 ng\xE0y"),
    /* @__PURE__ */ React.createElement("option", { value: "30" }, "30 ng\xE0y")
  ))), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 } }, "Chi ti\u1EBFt b\u1EEFa \u0103n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 } }, menuItems.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "100px 1fr 100px 80px", gap: 10, alignItems: "center", padding: "12px 14px", background: "#F9FAFB", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#374151" } }, item.meal), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: item.foods,
      onChange: (e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, foods: e.target.value } : mi)),
      placeholder: "M\xF3n \u0103n, nguy\xEAn li\u1EC7u...",
      style: { height: 40, padding: "0 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: item.calories || "",
      onChange: (e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, calories: parseInt(e.target.value) || 0 } : mi)),
      placeholder: "kcal",
      style: { width: "100%", height: 40, padding: "0 8px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }
    }
  )), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "time",
      value: item.time,
      onChange: (e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, time: e.target.value } : mi)),
      style: { height: 40, padding: "0 8px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }
    }
  )))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: totalCalories > (parseInt(form.calories) || 99999) ? "#FEE2E2" : "#D1FAE5", borderRadius: 10, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 600, color: "#374151" } }, "T\u1ED5ng calo theo k\u1EBF ho\u1EA1ch:"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, fontWeight: 700, color: totalCalories > (parseInt(form.calories) || 99999) ? "#EF4444" : "#22C55E" } }, totalCalories, " kcal", form.calories && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 400, color: "#6B7280" } }, " / ", form.calories, " kcal m\u1EE5c ti\xEAu"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Ghi ch\xFA / H\u01B0\u1EDBng d\u1EABn th\xEAm"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: form.notes,
      onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
      placeholder: "L\u01B0u \xFD \u0111\u1EB7c bi\u1EC7t, h\u01B0\u1EDBng d\u1EABn th\u1EF1c hi\u1EC7n...",
      rows: 3,
      style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave(false),
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "T\u1EA1o & G\u1EEDi th\u1EF1c \u0111\u01A1n"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave(true),
      style: { height: 44, padding: "0 18px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "L\u01B0u nh\xE1p"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowForm(false),
      style: { height: 44, padding: "0 18px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: 14, cursor: "pointer" }
    },
    "H\u1EE7y"
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937" } }, "Th\u1EF1c \u0111\u01A1n \u0111\xE3 t\u1EA1o (", menus.length, ")"), menus.map((menu) => {
    const sc = statusConfig[menu.status];
    return /* @__PURE__ */ React.createElement(Card, { key: menu.id, style: { cursor: "pointer" }, onClick: () => setSelectedMenu(selectedMenu?.id === menu.id ? null : menu) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937" } }, menu.title), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: sc.bg, color: sc.color } }, sc.label)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, "Ng\u01B0\u1EDDi d\xF9ng: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#1F2937" } }, menu.targetUser || "\u2014")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, "M\u1EE5c ti\xEAu: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "#22C55E" } }, menu.calories, " kcal/ng\xE0y")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, "Th\u1EDDi gian: ", menu.duration), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, "T\u1EA1o: ", menu.createdAt))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#9CA3AF" } }, selectedMenu?.id === menu.id ? "Thu g\u1ECDn \u25B2" : "Xem chi ti\u1EBFt \u25BC")), selectedMenu?.id === menu.id && menu.items.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, borderTop: "1px solid #F3F4F6", paddingTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, menu.items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#F9FAFB", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "#2563EB", minWidth: 60 } }, item.time), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 80 } }, item.meal), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280", flex: 1 } }, item.foods), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#22C55E" } }, item.calories, " kcal"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", background: "#DCFCE7", borderRadius: 8, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#374151" } }, "T\u1ED5ng c\u1ED9ng"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "#22C55E" } }, menu.items.reduce((s, i) => s + i.calories, 0), " kcal")))));
  })));
}
export {
  ExpertCreateMenu as default
};
