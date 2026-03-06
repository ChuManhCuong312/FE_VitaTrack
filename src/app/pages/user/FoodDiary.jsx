import React, { useState } from "react";
const sampleFoods = {
  morning: [
    { id: 1, name: "B\xE1nh m\xEC tr\u1EE9ng \u1ED1p la", calo: 320, protein: 14, carb: 38, fat: 12 },
    { id: 2, name: "C\xE0 ph\xEA s\u1EEFa", calo: 80, protein: 2, carb: 12, fat: 3 }
  ],
  noon: [
    { id: 3, name: "C\u01A1m g\xE0 n\u01B0\u1EDBng", calo: 580, protein: 38, carb: 65, fat: 16 },
    { id: 4, name: "Canh rau xanh", calo: 45, protein: 3, carb: 6, fat: 1 }
  ],
  evening: [
    { id: 5, name: "Ph\u1EDF b\xF2", calo: 450, protein: 28, carb: 58, fat: 9, hasAllergen: true, allergen: "gluten" }
  ],
  other: []
};
const TABS = [
  { key: "morning", label: "S\xE1ng" },
  { key: "noon", label: "Tr\u01B0a" },
  { key: "evening", label: "T\u1ED1i" },
  { key: "other", label: "Kh\xE1c" }
];
const FOOD_DB = [
  { id: 100, name: "C\u01A1m tr\u1EAFng (1 ch\xE9n)", calo: 200, protein: 4, carb: 44, fat: 0 },
  { id: 101, name: "Th\u1ECBt g\xE0 lu\u1ED9c (100g)", calo: 165, protein: 31, carb: 0, fat: 4 },
  { id: 102, name: "Tr\u1EE9ng lu\u1ED9c", calo: 78, protein: 6, carb: 1, fat: 5 },
  { id: 103, name: "Rau c\u1EA3i x\xE0o", calo: 60, protein: 2, carb: 8, fat: 2 },
  { id: 104, name: "S\u1EEFa chua", calo: 100, protein: 5, carb: 14, fat: 3 },
  { id: 105, name: "Chu\u1ED1i", calo: 89, protein: 1, carb: 23, fat: 0 },
  { id: 106, name: "B\xE1nh m\xEC sandwich", calo: 265, protein: 9, carb: 49, fat: 4, hasAllergen: true, allergen: "gluten" },
  { id: 107, name: "C\xE1 h\u1ED3i n\u01B0\u1EDBng (100g)", calo: 208, protein: 20, carb: 0, fat: 13 }
];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function FoodDiary() {
  const [activeTab, setActiveTab] = useState("morning");
  const [diary, setDiary] = useState(sampleFoods);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showAIResult, setShowAIResult] = useState(false);
  const currentMeal = diary[activeTab] ?? [];
  const allFoods = Object.values(diary).flat();
  const totalCalo = allFoods.reduce((s, f) => s + f.calo, 0);
  const totalProtein = allFoods.reduce((s, f) => s + f.protein, 0);
  const totalCarb = allFoods.reduce((s, f) => s + f.carb, 0);
  const totalFat = allFoods.reduce((s, f) => s + f.fat, 0);
  const hasAllergen = allFoods.some((f) => f.hasAllergen);
  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim().length > 0) {
      setSearchResults(FOOD_DB.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  };
  const addFood = (food) => {
    const newItem = { ...food, id: Date.now() };
    setDiary((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab] ?? [], newItem]
    }));
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
  };
  const removeFood = (id) => {
    setDiary((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).filter((f) => f.id !== id)
    }));
    setConfirmDelete(null);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result);
        setTimeout(() => setShowAIResult(true), 1200);
      };
      reader.readAsDataURL(file);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Nh\u1EADt k\xFD \u0103n u\u1ED1ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Ghi l\u1EA1i b\u1EEFa \u0103n c\u1EE7a b\u1EA1n \u0111\u1EC3 theo d\xF5i dinh d\u01B0\u1EE1ng.")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: selectedDate,
      onChange: (e) => setSelectedDate(e.target.value),
      style: {
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: "1px solid #E5E7EB",
        fontSize: 14,
        color: "#1F2937",
        outline: "none",
        background: "#fff"
      }
    }
  )), hasAllergen && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#991B1B" } }, /* @__PURE__ */ React.createElement("strong", null, "C\u1EA3nh b\xE1o d\u1ECB \u1EE9ng:"), " C\xF3 th\u1EF1c ph\u1EA9m ch\u1EE9a ", /* @__PURE__ */ React.createElement("strong", null, "gluten"), " trong nh\u1EADt k\xFD h\xF4m nay. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 } }, [
    { label: "T\u1ED5ng Calo", value: totalCalo, unit: "kcal", color: "#22C55E" },
    { label: "Protein", value: totalProtein, unit: "g", color: "#2563EB" },
    { label: "Carb", value: totalCarb, unit: "g", color: "#F59E0B" },
    { label: "Fat", value: totalFat, unit: "g", color: "#EF4444" }
  ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, style: { background: s.color + "10", borderRadius: 16, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: s.color } }, s.value, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 400, color: "#6B7280", marginLeft: 4 } }, s.unit))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }, className: "lg:grid-cols-[1fr_320px]" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 20, background: "#F9FAFB", borderRadius: 10, padding: 4 } }, TABS.map((tab) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tab.key,
      onClick: () => setActiveTab(tab.key),
      style: {
        flex: 1,
        height: 36,
        borderRadius: 8,
        border: "none",
        background: activeTab === tab.key ? "#FFFFFF" : "transparent",
        color: activeTab === tab.key ? "#22C55E" : "#6B7280",
        fontSize: 13,
        fontWeight: activeTab === tab.key ? 600 : 400,
        cursor: "pointer",
        boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.15s"
      }
    },
    tab.label
  ))), currentMeal.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "32px 0", color: "#6B7280", fontSize: 14 } }, "Ch\u01B0a c\xF3 th\u1EF1c ph\u1EA9m n\xE0o. Th\xEAm b\u1EEFa \u0103n c\u1EE7a b\u1EA1n.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 } }, currentMeal.map((food) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: food.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: 12,
        border: food.hasAllergen ? "1.5px solid #FCA5A5" : "1px solid #F3F4F6",
        background: food.hasAllergen ? "#FFF5F5" : "#F9FAFB"
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, food.name), food.hasAllergen && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "#FEE2E2", color: "#EF4444", fontWeight: 500 } }, food.allergen)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 2 } }, "P: ", food.protein, "g \xB7 C: ", food.carb, "g \xB7 F: ", food.fat, "g")),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 600, color: "#22C55E" } }, food.calo, " kcal"), confirmDelete === food.id ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => removeFood(food.id),
        style: { padding: "4px 10px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 12, cursor: "pointer" }
      },
      "X\xF3a"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setConfirmDelete(null),
        style: { padding: "4px 10px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer" }
      },
      "H\u1EE7y"
    )) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setConfirmDelete(food.id),
        style: { padding: "4px 10px", borderRadius: 6, border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280", fontSize: 12, cursor: "pointer" }
      },
      "X\xF3a"
    ))
  ))), !showSearch ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowSearch(true),
      style: {
        width: "100%",
        height: 40,
        borderRadius: 8,
        border: "1.5px dashed #D1D5DB",
        background: "transparent",
        color: "#22C55E",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer"
      }
    },
    "+ Th\xEAm th\u1EF1c ph\u1EA9m"
  ) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: searchQuery,
      onChange: (e) => handleSearch(e.target.value),
      placeholder: "T\xECm ki\u1EBFm th\u1EF1c ph\u1EA9m...",
      style: {
        width: "100%",
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: "1.5px solid #22C55E",
        fontSize: 14,
        color: "#1F2937",
        outline: "none",
        boxSizing: "border-box"
      }
    }
  ), searchResults.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid #E5E7EB", borderRadius: 8, marginTop: 4, background: "#fff", overflow: "hidden" } }, searchResults.map((f) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: f.id,
      onClick: () => addFood(f),
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 14px",
        border: "none",
        background: "transparent",
        borderBottom: "1px solid #F3F4F6",
        cursor: "pointer",
        textAlign: "left"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "#F9FAFB",
      onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "#1F2937", fontWeight: 500 } }, f.name), f.hasAllergen && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, fontSize: 11, color: "#EF4444" } }, "\u26A0 ", f.allergen)),
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#22C55E", fontWeight: 600 } }, f.calo, " kcal")
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
      },
      style: { marginTop: 8, fontSize: 13, color: "#6B7280", background: "none", border: "none", cursor: "pointer" }
    },
    "H\u1EE7y t\xECm ki\u1EBFm"
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 } }, "Upload \u1EA3nh m\xF3n \u0103n"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#6B7280", marginBottom: 12 } }, "AI s\u1EBD nh\u1EADn di\u1EC7n v\xE0 g\u1EE3i \xFD th\xF4ng tin dinh d\u01B0\u1EE1ng."), !uploadedImage ? /* @__PURE__ */ React.createElement(
    "div",
    {
      onDragOver: (e) => {
        e.preventDefault();
        setDragOver(true);
      },
      onDragLeave: () => setDragOver(false),
      onDrop: handleDrop,
      style: {
        border: `2px dashed ${dragOver ? "#22C55E" : "#D1D5DB"}`,
        borderRadius: 16,
        padding: "32px 16px",
        textAlign: "center",
        background: dragOver ? "#DCFCE7" : "#F9FAFB",
        transition: "all 0.2s",
        cursor: "pointer"
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "\u{1F4F7}"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#374151", fontWeight: 500 } }, "K\xE9o th\u1EA3 \u1EA3nh v\xE0o \u0111\xE2y"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginTop: 4 } }, "ho\u1EB7c nh\u1EA5p \u0111\u1EC3 ch\u1ECDn \u1EA3nh")
  ) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", { src: uploadedImage, alt: "M\xF3n \u0103n", style: { width: "100%", borderRadius: 12, maxHeight: 160, objectFit: "cover" } }), showAIResult ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, background: "#DCFCE7", borderRadius: 8, padding: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 8 } }, "K\u1EBFt qu\u1EA3 AI ph\xE2n t\xEDch:"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#1F2937", marginBottom: 4 } }, "C\u01A1m g\xE0 chi\xEAn n\u01B0\u1EDBc m\u1EAFm (~520 kcal)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, "P: 32g \xB7 C: 58g \xB7 F: 18g"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addFood({ id: Date.now(), name: "C\u01A1m g\xE0 chi\xEAn n\u01B0\u1EDBc m\u1EAFm", calo: 520, protein: 32, carb: 58, fat: 18 }),
      style: { flex: 1, height: 36, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }
    },
    "X\xE1c nh\u1EADn"
  ), /* @__PURE__ */ React.createElement("button", { style: { flex: 1, height: 36, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" } }, "Ch\u1EC9nh s\u1EEDa"))) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: "#6B7280", textAlign: "center" } }, "\u0110ang ph\xE2n t\xEDch \u1EA3nh..."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setUploadedImage(null);
        setShowAIResult(false);
      },
      style: { marginTop: 8, width: "100%", height: 34, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: 13, cursor: "pointer" }
    },
    "Ch\u1ECDn \u1EA3nh kh\xE1c"
  ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 } }, "Ti\u1EBFn tr\xECnh ng\xE2n s\xE1ch calo"), [
    { label: "Calo", current: totalCalo, max: 2e3, color: "#22C55E" },
    { label: "Protein", current: totalProtein, max: 120, color: "#2563EB" },
    { label: "Carb", current: totalCarb, max: 250, color: "#F59E0B" },
    { label: "Fat", current: totalFat, max: 65, color: "#EF4444" }
  ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#374151" } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#6B7280" } }, item.current, "/", item.max)), /* @__PURE__ */ React.createElement("div", { style: { background: "#E5E7EB", borderRadius: 99, height: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${Math.min(item.current / item.max * 100, 100)}%`, height: "100%", background: item.color, borderRadius: 99 } }))))))));
}
export {
  FoodDiary as default
};
