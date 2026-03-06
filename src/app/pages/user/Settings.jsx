import React, { useState } from "react";
import { DataExport } from "../../components/DataExport";
import { useApp } from "../../context/AppContext";
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function Toggle({ checked, onChange }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onChange,
      style: {
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#22C55E" : "#D1D5DB",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
        }
      }
    )
  );
}
function Settings() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const [showExport, setShowExport] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nguy\u1EC5n V\u0103n An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    language: "vi"
  });
  const [allergies, setAllergies] = useState(["Gluten", "\u0110\u1EADu ph\u1ED9ng"]);
  const [newAllergy, setNewAllergy] = useState("");
  const [notifications, setNotifications] = useState({
    mealReminder: true,
    exerciseReminder: true,
    weeklyReport: true,
    expertMessage: true,
    calorieAlert: true
  });
  const [privacy, setPrivacy] = useState({
    shareDataWithExpert: true,
    anonymousAnalytics: false
  });
  const [saved, setSaved] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleSave = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };
  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies((p) => [...p, newAllergy.trim()]);
      setNewAllergy("");
    }
  };
  const removeAllergy = (a) => setAllergies((p) => p.filter((x) => x !== a));
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "C\xE0i \u0111\u1EB7t"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Qu\u1EA3n l\xFD th\xF4ng tin t\xE0i kho\u1EA3n v\xE0 t\xF9y ch\u1EC9nh \u1EE9ng d\u1EE5ng.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng tin t\xE0i kho\u1EA3n"), saved === "profile" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\xF4ng tin \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 } }, [
    { key: "name", label: "H\u1ECD v\xE0 t\xEAn", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", type: "tel" }
  ].map(({ key, label, type }) => /* @__PURE__ */ React.createElement("div", { key, style: { gridColumn: key === "phone" ? "span 2" : "span 1" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type,
      value: profile[key],
      onChange: (e) => setProfile((p) => ({ ...p, [key]: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, color: "#1F2937", outline: "none", boxSizing: "border-box" }
    }
  )))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("profile"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u thay \u0111\u1ED5i"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "\u0110\u1ED5i m\u1EADt kh\u1EA9u"), saved === "password" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "M\u1EADt kh\u1EA9u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 } }, [
    { label: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i" },
    { label: "M\u1EADt kh\u1EA9u m\u1EDBi" },
    { label: "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi" }
  ].map(({ label }) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "password",
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("password"),
      style: { marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "\u0110\u1ED5i m\u1EADt kh\u1EA9u"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 8 } }, "D\u1ECB \u1EE9ng th\u1EF1c ph\u1EA9m"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#6B7280", marginBottom: 16 } }, "H\u1EC7 th\u1ED1ng s\u1EBD c\u1EA3nh b\xE1o khi b\u1EA1n ghi nh\u1EADn th\u1EF1c ph\u1EA9m ch\u1EE9a ch\u1EA5t d\u1ECB \u1EE9ng."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 } }, allergies.map((a) => /* @__PURE__ */ React.createElement("div", { key: a, style: { display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 16, background: "#FEE2E2", border: "1px solid #FCA5A5" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#EF4444", fontWeight: 500 } }, a), /* @__PURE__ */ React.createElement("button", { onClick: () => removeAllergy(a), style: { background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 14, padding: 0, lineHeight: 1 } }, "\u2715")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: newAllergy,
      onChange: (e) => setNewAllergy(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && addAllergy(),
      placeholder: "Th\xEAm ch\u1EA5t d\u1ECB \u1EE9ng m\u1EDBi...",
      style: { flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: addAllergy, style: { height: 40, padding: "0 16px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" } }, "Th\xEAm"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng b\xE1o"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
    { key: "mealReminder", label: "Nh\u1EAFc nh\u1EDF ghi nh\u1EADn b\u1EEFa \u0103n", desc: "Nh\u1EAFc 3 l\u1EA7n/ng\xE0y v\xE0o gi\u1EDD \u0103n" },
    { key: "exerciseReminder", label: "Nh\u1EAFc nh\u1EDF v\u1EADn \u0111\u1ED9ng", desc: "Nh\u1EAFc khi ch\u01B0a \u0111\u1EA1t m\u1EE5c ti\xEAu b\u01B0\u1EDBc ch\xE2n" },
    { key: "weeklyReport", label: "B\xE1o c\xE1o tu\u1EA7n", desc: "T\u1ED5ng k\u1EBFt s\u1EE9c kh\u1ECFe m\u1ED7i Ch\u1EE7 nh\u1EADt" },
    { key: "expertMessage", label: "Tin nh\u1EAFn t\u1EEB chuy\xEAn gia", desc: "Th\xF4ng b\xE1o ngay khi c\xF3 ph\u1EA3n h\u1ED3i" },
    { key: "calorieAlert", label: "C\u1EA3nh b\xE1o v\u01B0\u1EE3t calo", desc: "C\u1EA3nh b\xE1o khi n\u1EA1p >120% ng\xE2n s\xE1ch" }
  ].map(({ key, label, desc }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(Toggle, { checked: notifications[key], onChange: () => setNotifications((p) => ({ ...p, [key]: !p[key] })) }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Quy\u1EC1n ri\xEAng t\u01B0"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
    { key: "shareDataWithExpert", label: "Chia s\u1EBB d\u1EEF li\u1EC7u v\u1EDBi chuy\xEAn gia", desc: "Cho ph\xE9p chuy\xEAn gia xem l\u1ECBch s\u1EED dinh d\u01B0\u1EE1ng" },
    { key: "anonymousAnalytics", label: "Ph\xE2n t\xEDch \u1EA9n danh", desc: "Gi\xFAp c\u1EA3i thi\u1EC7n h\u1EC7 th\u1ED1ng (kh\xF4ng l\u01B0u th\xF4ng tin c\xE1 nh\xE2n)" }
  ].map(({ key, label, desc }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(Toggle, { checked: privacy[key], onChange: () => setPrivacy((p) => ({ ...p, [key]: !p[key] })) }))))), /* @__PURE__ */ React.createElement(Card, { style: { borderLeft: "4px solid #EF4444" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#EF4444", marginBottom: 8 } }, "V\xF9ng nguy hi\u1EC3m"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#6B7280", marginBottom: 16 } }, "C\xE1c h\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c. H\xE3y c\xE2n nh\u1EAFc k\u1EF9 tr\u01B0\u1EDBc khi th\u1EF1c hi\u1EC7n."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowExport(true),
      style: {
        height: 44,
        padding: "0 20px",
        borderRadius: 8,
        border: "1.5px solid #2563EB",
        background: "transparent",
        color: "#2563EB",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 12
      }
    },
    "\u{1F4CA} Xu\u1EA5t d\u1EEF li\u1EC7u"
  ), showDeleteConfirm ? /* @__PURE__ */ React.createElement("div", { style: { background: "#FEE2E2", borderRadius: 12, padding: 16 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#991B1B", marginBottom: 12 } }, "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a t\xE0i kho\u1EA3n? T\u1EA5t c\u1EA3 d\u1EEF li\u1EC7u s\u1EBD b\u1ECB m\u1EA5t v\u0129nh vi\u1EC5n."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowDeleteConfirm(false), style: { flex: 1, height: 40, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" } }, "H\u1EE7y b\u1ECF"), /* @__PURE__ */ React.createElement("button", { style: { flex: 1, height: 40, borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" } }, "X\xE1c nh\u1EADn x\xF3a"))) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowDeleteConfirm(true),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "X\xF3a t\xE0i kho\u1EA3n"
  ))), showExport && /* @__PURE__ */ React.createElement(DataExport, { userId, onClose: () => setShowExport(false) }));
}
export {
  Settings as default
};
