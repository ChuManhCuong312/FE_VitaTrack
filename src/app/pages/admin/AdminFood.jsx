import React, { useState } from "react";
const initialFoods = [
  { id: 1, name: "C\u01A1m tr\u1EAFng (1 ch\xE9n)", calo: 200, protein: 4, carb: 44, fat: 0, category: "Tinh b\u1ED9t", fiber: 0.4, unit: "ch\xE9n (180g)" },
  { id: 2, name: "Th\u1ECBt g\xE0 \u1EE9c lu\u1ED9c (100g)", calo: 165, protein: 31, carb: 0, fat: 4, category: "\u0110\u1EA1m", fiber: 0, unit: "100g" },
  { id: 3, name: "Tr\u1EE9ng g\xE0 lu\u1ED9c", calo: 78, protein: 6, carb: 1, fat: 5, category: "\u0110\u1EA1m", fiber: 0, unit: "qu\u1EA3 (50g)" },
  { id: 4, name: "C\xE0 r\u1ED1t (100g)", calo: 41, protein: 1, carb: 10, fat: 0, category: "Rau c\u1EE7", fiber: 2.8, unit: "100g" },
  { id: 5, name: "C\xE1 h\u1ED3i t\u01B0\u01A1i (100g)", calo: 208, protein: 20, carb: 0, fat: 13, category: "\u0110\u1EA1m", fiber: 0, unit: "100g" },
  { id: 6, name: "Chu\u1ED1i (1 qu\u1EA3)", calo: 89, protein: 1, carb: 23, fat: 0, category: "Tr\xE1i c\xE2y", fiber: 2.6, unit: "qu\u1EA3 (120g)" },
  { id: 7, name: "S\u1EEFa chua kh\xF4ng \u0111\u01B0\u1EDDng (100g)", calo: 59, protein: 3.5, carb: 4.7, fat: 3.3, category: "S\u1EEFa & Tr\u1EE9ng", fiber: 0, unit: "100g" },
  { id: 8, name: "Y\u1EBFn m\u1EA1ch (50g kh\xF4)", calo: 190, protein: 6.5, carb: 33, fat: 3.5, category: "Tinh b\u1ED9t", fiber: 4, unit: "50g" },
  { id: 9, name: "Rau c\u1EA3i xanh lu\u1ED9c (100g)", calo: 23, protein: 2, carb: 3.6, fat: 0.3, category: "Rau c\u1EE7", fiber: 1.8, unit: "100g" },
  { id: 10, name: "\u0110\u1EADu ph\u1EE5 (100g)", calo: 76, protein: 8, carb: 1.9, fat: 4.2, category: "\u0110\u1EA1m", fiber: 0.3, unit: "100g" }
];
const categories = ["Tinh b\u1ED9t", "\u0110\u1EA1m", "Rau c\u1EE7", "Tr\xE1i c\xE2y", "S\u1EEFa & Tr\u1EE9ng", "\u0110\u1ED3 u\u1ED1ng", "\u0102n v\u1EB7t", "Kh\xE1c"];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function AdminFood() {
  const [foods, setFoods] = useState(initialFoods);
  const [showForm, setShowForm] = useState(false);
  const [editFood, setEditFood] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", calo: "", protein: "", carb: "", fat: "", category: "", fiber: "", unit: "" });
  const filtered = foods.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || f.category === filterCategory;
    return matchSearch && matchCat;
  });
  const openAdd = () => {
    setEditFood(null);
    setForm({ name: "", calo: "", protein: "", carb: "", fat: "", category: "", fiber: "", unit: "" });
    setShowForm(true);
  };
  const openEdit = (food) => {
    setEditFood(food);
    setForm({ name: food.name, calo: String(food.calo), protein: String(food.protein), carb: String(food.carb), fat: String(food.fat), category: food.category, fiber: String(food.fiber || 0), unit: food.unit });
    setShowForm(true);
  };
  const saveFood = () => {
    if (!form.name || !form.calo) return;
    const foodData = {
      name: form.name,
      calo: parseFloat(form.calo),
      protein: parseFloat(form.protein) || 0,
      carb: parseFloat(form.carb) || 0,
      fat: parseFloat(form.fat) || 0,
      category: form.category || "Kh\xE1c",
      fiber: parseFloat(form.fiber) || 0,
      unit: form.unit || "100g"
    };
    if (editFood) {
      setFoods((p) => p.map((f) => f.id === editFood.id ? { ...f, ...foodData } : f));
    } else {
      setFoods((p) => [...p, { id: Date.now(), ...foodData }]);
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowForm(false);
      setEditFood(null);
    }, 1800);
  };
  const deleteFood = (id) => {
    setFoods((p) => p.filter((f) => f.id !== id));
    setConfirmDelete(null);
  };
  const catCounts = {};
  foods.forEach((f) => {
    catCounts[f.category] = (catCounts[f.category] || 0) + 1;
  });
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Qu\u1EA3n l\xFD th\u1EF1c ph\u1EA9m"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Qu\u1EA3n l\xFD c\u01A1 s\u1EDF d\u1EEF li\u1EC7u th\u1EF1c ph\u1EA9m v\xE0 th\xF4ng tin dinh d\u01B0\u1EE1ng.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, "T\u1ED5ng th\u1EF1c ph\u1EA9m"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 700, color: "#22C55E", marginTop: 4 } }, foods.length)), Object.entries(catCounts).slice(0, 3).map(([cat, count]) => /* @__PURE__ */ React.createElement(Card, { key: cat }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, cat), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 700, color: "#2563EB", marginTop: 4 } }, count)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "T\xECm ki\u1EBFm th\u1EF1c ph\u1EA9m...",
      style: { flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterCategory,
      onChange: (e) => setFilterCategory(e.target.value),
      style: { height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "T\u1EA5t c\u1EA3 danh m\u1EE5c"),
    categories.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      style: { height: 44, padding: "0 14px", borderRadius: 10, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 13, fontWeight: 500, cursor: "pointer" }
    },
    "Import CSV"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: openAdd,
      style: { height: 44, padding: "0 16px", borderRadius: 10, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "+ Th\xEAm th\u1EF1c ph\u1EA9m"
  )), /* @__PURE__ */ React.createElement(Card, { style: { padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px", borderBottom: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, filtered.length, " th\u1EF1c ph\u1EA9m")), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 600 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#F9FAFB" } }, ["T\xEAn th\u1EF1c ph\u1EA9m", "\u0110\u01A1n v\u1ECB", "Danh m\u1EE5c", "Calo", "Protein", "Carb", "Fat", "Ch\u1EA5t x\u01A1", "Thao t\xE1c"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, filtered.map((food) => /* @__PURE__ */ React.createElement(
    "tr",
    {
      key: food.id,
      style: { borderBottom: "1px solid #F3F4F6" },
      onMouseEnter: (e) => e.currentTarget.style.background = "#F9FAFB",
      onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
    },
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 14, fontWeight: 500, color: "#1F2937" } }, food.name),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 12, color: "#9CA3AF" } }, food.unit),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, padding: "3px 8px", borderRadius: 4, background: "#F3F4F6", color: "#374151" } }, food.category)),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 14, fontWeight: 700, color: "#22C55E" } }, food.calo),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: "#374151" } }, food.protein, "g"),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: "#374151" } }, food.carb, "g"),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: "#374151" } }, food.fat, "g"),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: "#374151" } }, food.fiber || 0, "g"),
    /* @__PURE__ */ React.createElement("td", { style: { padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => openEdit(food),
        style: { padding: "5px 10px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 11, cursor: "pointer" }
      },
      "S\u1EEDa"
    ), confirmDelete === food.id ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => deleteFood(food.id), style: { padding: "5px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" } }, "X\xF3a"), /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmDelete(null), style: { padding: "5px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", fontSize: 11, cursor: "pointer" } }, "H\u1EE7y")) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setConfirmDelete(food.id),
        style: { padding: "5px 10px", borderRadius: 6, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 11, cursor: "pointer" }
      },
      "X\xF3a"
    )))
  )))))), showForm && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, editFood ? "Ch\u1EC9nh s\u1EEDa th\u1EF1c ph\u1EA9m" : "Th\xEAm th\u1EF1c ph\u1EA9m m\u1EDBi"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowForm(false), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), saved && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" } }, "\u0110\xE3 l\u01B0u th\xE0nh c\xF4ng!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "T\xEAn th\u1EF1c ph\u1EA9m *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.name,
      onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
      placeholder: "VD: C\u01A1m tr\u1EAFng (1 ch\xE9n)",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Danh m\u1EE5c"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.category,
      onChange: (e) => setForm((p) => ({ ...p, category: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Ch\u1ECDn danh m\u1EE5c --"),
    categories.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "\u0110\u01A1n v\u1ECB"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.unit,
      onChange: (e) => setForm((p) => ({ ...p, unit: e.target.value })),
      placeholder: "VD: 100g, 1 ch\xE9n, 1 qu\u1EA3",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, [
    { key: "calo", label: "Calo (kcal) *" },
    { key: "protein", label: "Protein (g)" },
    { key: "carb", label: "Carb (g)" },
    { key: "fat", label: "Fat (g)" },
    { key: "fiber", label: "Ch\u1EA5t x\u01A1 (g)" }
  ].map(({ key, label }) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      step: "0.1",
      min: "0",
      value: form[key],
      onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
      placeholder: "0",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 20 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: saveFood,
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    editFood ? "L\u01B0u thay \u0111\u1ED5i" : "Th\xEAm th\u1EF1c ph\u1EA9m"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowForm(false),
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "H\u1EE7y"
  )))));
}
export {
  AdminFood as default
};
