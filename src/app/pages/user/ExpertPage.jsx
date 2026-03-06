import React, { useState } from "react";
const assignedExpert = {
  name: "ThS. Tr\u1EA7n Th\u1ECB B\xEDch",
  specialty: "Dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng",
  experience: "8 n\u0103m kinh nghi\u1EC7m",
  university: "\u0110\u1EA1i h\u1ECDc Y H\xE0 N\u1ED9i",
  patients: 142,
  rating: 4.9
};
const menuPlans = [
  {
    id: 1,
    title: "Th\u1EF1c \u0111\u01A1n gi\u1EA3m c\xE2n tu\u1EA7n 1",
    createdBy: "ThS. Tr\u1EA7n Th\u1ECB B\xEDch",
    date: "01/03/2026",
    calories: 1600,
    duration: "7 ng\xE0y",
    status: "active"
  },
  {
    id: 2,
    title: "Th\u1EF1c \u0111\u01A1n t\u0103ng c\u01B0\u1EDDng protein",
    createdBy: "ThS. Tr\u1EA7n Th\u1ECB B\xEDch",
    date: "15/02/2026",
    calories: 1800,
    duration: "14 ng\xE0y",
    status: "completed"
  }
];
const chatMessages = [
  { id: 1, role: "expert", content: "Xin ch\xE0o An! H\xF4m nay b\u1EA1n c\u1EA3m th\u1EA5y th\u1EBF n\xE0o sau tu\u1EA7n \u0103n ki\xEAng \u0111\u1EA7u ti\xEAn?", time: "09:00" },
  { id: 2, role: "user", content: "D\u1EA1 em c\u1EA3m th\u1EA5y \u1ED5n, \u0111\xE3 gi\u1EA3m \u0111\u01B0\u1EE3c 0.5kg nh\u01B0ng hay \u0111\xF3i bu\u1ED5i t\u1ED1i \u1EA1", time: "09:15" },
  { id: 3, role: "expert", content: "T\u1ED1t l\u1EAFm! C\u1EA3m gi\xE1c \u0111\xF3i bu\u1ED5i t\u1ED1i l\xE0 b\xECnh th\u01B0\u1EDDng. T\xF4i s\u1EBD \u0111i\u1EC1u ch\u1EC9nh th\xEAm m\u1ED9t b\u1EEFa ph\u1EE5 nh\u1EB9 150 kcal v\xE0o 20:00, nh\u01B0 s\u1EEFa chua kh\xF4ng \u0111\u01B0\u1EDDng ho\u1EB7c t\xE1o nh\u1ECF.", time: "09:20" },
  { id: 4, role: "user", content: "C\u1EA3m \u01A1n chuy\xEAn gia \u1EA1! Em s\u1EBD th\u1EED theo c\xE1ch \u0111\xF3", time: "09:22" }
];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
const statusConfig = {
  active: { label: "\u0110ang th\u1EF1c hi\u1EC7n", bg: "#DCFCE7", color: "#16A34A" },
  completed: { label: "\u0110\xE3 ho\xE0n th\xE0nh", bg: "#DBEAFE", color: "#1D4ED8" },
  pending: { label: "Ch\u1EDD duy\u1EC7t", bg: "#FEF3C7", color: "#B45309" }
};
function ExpertPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), role: "user", content: input.trim(), time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((p) => [...p, msg]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, {
        id: Date.now() + 1,
        role: "expert",
        content: "T\xF4i \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n. T\xF4i s\u1EBD ph\u1EA3n h\u1ED3i s\u1EDBm nh\u1EA5t c\xF3 th\u1EC3!",
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      }]);
    }, 1500);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Chuy\xEAn gia dinh d\u01B0\u1EE1ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "K\u1EBFt n\u1ED1i v\xE0 nh\u1EADn t\u01B0 v\u1EA5n t\u1EEB chuy\xEAn gia \u0111\u01B0\u1EE3c g\xE1n cho b\u1EA1n.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }, className: "lg:grid-cols-[280px_1fr]" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 22,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px"
  } }, assignedExpert.name.charAt(4)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937" } }, assignedExpert.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#2563EB", fontWeight: 500, marginTop: 2 } }, assignedExpert.specialty)), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #E5E7EB", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 } }, [
    { label: "Kinh nghi\u1EC7m", value: assignedExpert.experience },
    { label: "Tr\u01B0\u1EDDng \u0111\xE0o t\u1EA1o", value: assignedExpert.university },
    { label: "B\u1EC7nh nh\xE2n", value: `${assignedExpert.patients} ng\u01B0\u1EDDi` },
    { label: "\u0110\xE1nh gi\xE1", value: `\u2605 ${assignedExpert.rating}/5.0` }
  ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label, style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, r.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "#1F2937" } }, r.value))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginBottom: 12 } }, "Th\u1EF1c \u0111\u01A1n c\u1EE7a t\xF4i"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, menuPlans.map((plan) => {
    const sc = statusConfig[plan.status];
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: plan.id,
        onClick: () => setActiveMenu(plan),
        style: {
          width: "100%",
          textAlign: "left",
          padding: "12px",
          borderRadius: 12,
          border: `1.5px solid ${activeMenu?.id === plan.id ? "#2563EB" : "#E5E7EB"}`,
          background: activeMenu?.id === plan.id ? "#DBEAFE" : "#F9FAFB",
          cursor: "pointer"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, plan.title),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", marginBottom: 6 } }, plan.date, " \xB7 ", plan.duration),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#374151" } }, plan.calories, " kcal/ng\xE0y"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "2px 8px", borderRadius: 4, background: sc.bg, color: sc.color, fontWeight: 500 } }, sc.label))
    );
  })))), /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 500, padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 } }, "T"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937" } }, assignedExpert.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#22C55E" } }, "Tr\u1EF1c tuy\u1EBFn"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 } }, messages.map((msg) => {
    const isUser = msg.role === "user";
    return /* @__PURE__ */ React.createElement("div", { key: msg.id, style: { display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "70%" } }, /* @__PURE__ */ React.createElement("div", { style: {
      background: isUser ? "#22C55E" : "#F9FAFB",
      color: isUser ? "#fff" : "#1F2937",
      borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
      padding: "10px 14px",
      fontSize: 14,
      border: isUser ? "none" : "1px solid #E5E7EB"
    } }, msg.content), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#9CA3AF", marginTop: 3, textAlign: isUser ? "right" : "left" } }, msg.time)));
  })), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px", borderTop: "1px solid #E5E7EB", display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: input,
      onChange: (e) => setInput(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && sendMessage(),
      placeholder: "Nh\u1EAFn tin v\u1EDBi chuy\xEAn gia...",
      style: {
        flex: 1,
        height: 44,
        padding: "0 14px",
        borderRadius: 8,
        border: "1.5px solid #E5E7EB",
        fontSize: 14,
        color: "#1F2937",
        outline: "none"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: sendMessage,
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "G\u1EEDi"
  )))), activeMenu && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, activeMenu.title), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, padding: "3px 10px", borderRadius: 4, background: statusConfig[activeMenu.status].bg, color: statusConfig[activeMenu.status].color } }, statusConfig[activeMenu.status].label)), /* @__PURE__ */ React.createElement("button", { onClick: () => setActiveMenu(null), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 } }, [
    { label: "Calo/ng\xE0y", value: `${activeMenu.calories} kcal` },
    { label: "Th\u1EDDi gian", value: activeMenu.duration },
    { label: "Ng\xE0y t\u1EA1o", value: activeMenu.date },
    { label: "Chuy\xEAn gia", value: activeMenu.createdBy }
  ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label, style: { background: "#F9FAFB", borderRadius: 12, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, r.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 } }, r.value)))), /* @__PURE__ */ React.createElement("h4", { style: { fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 } }, "Chi ti\u1EBFt b\uFFFD\uFFFD\uFFFDa \u0103n m\u1EABu"), [
    { meal: "S\xE1ng (7:00)", items: "B\xE1nh m\xEC nguy\xEAn c\xE1m + 2 tr\u1EE9ng lu\u1ED9c + c\xE0 ph\xEA \u0111en", kcal: 380 },
    { meal: "Tr\u01B0a (12:00)", items: "C\u01A1m g\u1EA1o l\u1EE9t + \u1EE9c g\xE0 + rau xanh", kcal: 520 },
    { meal: "Ph\u1EE5 (15:00)", items: "1 qu\u1EA3 t\xE1o + 1 n\u1EAFm h\u1EA1nh nh\xE2n", kcal: 180 },
    { meal: "T\u1ED1i (18:30)", items: "C\xE1 h\u1ED3i h\u1EA5p + salad + khoai lang", kcal: 520 }
  ].map((m) => /* @__PURE__ */ React.createElement("div", { key: m.meal, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#374151" } }, m.meal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, m.items)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#22C55E" } }, m.kcal, " kcal"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveMenu(null),
      style: { marginTop: 20, width: "100%", height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "\xC1p d\u1EE5ng th\u1EF1c \u0111\u01A1n n\xE0y"
  ))));
}
export {
  ExpertPage as default
};
