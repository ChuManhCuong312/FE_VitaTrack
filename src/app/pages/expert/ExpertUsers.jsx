import React, { useState } from "react";
const initialUsers = [
  { id: 1, name: "Nguy\u1EC5n V\u0103n An", age: 27, bmi: 23.4, calo: 1450, caloBudget: 2e3, goal: "Gi\u1EA3m c\xE2n", riskLevel: "safe", lastActivity: "2 gi\u1EDD tr\u01B0\u1EDBc", weight: 73.1, targetWeight: 68, phone: "0901234567", email: "an@email.com", joinDate: "01/01/2026" },
  { id: 2, name: "L\xEA Th\u1ECB Mai", age: 32, bmi: 28.2, calo: 2480, caloBudget: 1800, goal: "Gi\u1EA3m c\xE2n", riskLevel: "danger", lastActivity: "1 gi\u1EDD tr\u01B0\u1EDBc", weight: 82, targetWeight: 70, phone: "0912345678", email: "mai@email.com", joinDate: "15/01/2026" },
  { id: 3, name: "Ph\u1EA1m Minh Tu\u1EA5n", age: 24, bmi: 19.1, calo: 2200, caloBudget: 2800, goal: "T\u0103ng c\xE2n", riskLevel: "safe", lastActivity: "5 ph\xFAt tr\u01B0\u1EDBc", weight: 58, targetWeight: 65, phone: "0923456789", email: "tuan@email.com", joinDate: "10/12/2025" },
  { id: 4, name: "Tr\u1EA7n Th\u1ECB H\u01B0\u01A1ng", age: 45, bmi: 31.5, calo: 2100, caloBudget: 1600, goal: "Gi\u1EA3m c\xE2n", riskLevel: "warning", lastActivity: "3 gi\u1EDD tr\u01B0\u1EDBc", weight: 90, targetWeight: 75, phone: "0934567890", email: "huong@email.com", joinDate: "05/02/2026" },
  { id: 5, name: "Ho\xE0ng Minh \u0110\u1EE9c", age: 35, bmi: 22.8, calo: 1920, caloBudget: 2200, goal: "Duy tr\xEC", riskLevel: "safe", lastActivity: "30 ph\xFAt tr\u01B0\u1EDBc", weight: 72, targetWeight: 72, phone: "0945678901", email: "duc@email.com", joinDate: "20/01/2026" }
];
const riskConfig = {
  safe: { label: "An to\xE0n", bg: "#D1FAE5", color: "#065F46" },
  warning: { label: "C\u1EA3nh b\xE1o", bg: "#FEF3C7", color: "#B45309" },
  danger: { label: "Nguy hi\u1EC3m", bg: "#FEE2E2", color: "#991B1B" }
};
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function ExpertUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [menuTargetUser, setMenuTargetUser] = useState(null);
  const [menuForm, setMenuForm] = useState({ title: "", calories: "", duration: "", notes: "" });
  const [menuSaved, setMenuSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [chatUser, setChatUser] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "system", text: "B\u1EAFt \u0111\u1EA7u cu\u1ED9c tr\xF2 chuy\u1EC7n v\u1EDBi ng\u01B0\u1EDDi d\xF9ng", time: "09:00" }
  ]);
  const filtered = initialUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "all" || u.riskLevel === filterRisk;
    return matchSearch && matchRisk;
  });
  const handleSaveMenu = () => {
    setMenuSaved(true);
    setTimeout(() => {
      setMenuSaved(false);
      setShowCreateMenu(false);
      setMenuTargetUser(null);
      setMenuForm({ title: "", calories: "", duration: "", notes: "" });
    }, 2e3);
  };
  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const now = (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    setChatMessages((p) => [...p, { sender: "expert", text: chatMessage, time: now }]);
    setChatMessage("");
    setTimeout(() => {
      setChatMessages((p) => [...p, { sender: "user", text: "C\u1EA3m \u01A1n chuy\xEAn gia, t\xF4i s\u1EBD th\u1EF1c hi\u1EC7n theo h\u01B0\u1EDBng d\u1EABn.", time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1500);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Theo d\xF5i v\xE0 qu\u1EA3n l\xFD t\xECnh tr\u1EA1ng s\u1EE9c kh\u1ECFe c\u1EE7a t\u1EEBng ng\u01B0\u1EDDi d\xF9ng.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "T\xECm ki\u1EBFm theo t\xEAn, email...",
      style: { flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, ["all", "safe", "warning", "danger"].map((r) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: r,
      onClick: () => setFilterRisk(r),
      style: {
        height: 44,
        padding: "0 14px",
        borderRadius: 10,
        border: `1.5px solid ${filterRisk === r ? r === "safe" ? "#22C55E" : r === "warning" ? "#F59E0B" : r === "danger" ? "#EF4444" : "#2563EB" : "#E5E7EB"}`,
        background: filterRisk === r ? r === "all" ? "#DBEAFE" : r === "safe" ? "#D1FAE5" : r === "warning" ? "#FEF3C7" : "#FEE2E2" : "#fff",
        color: filterRisk === r ? r === "all" ? "#1D4ED8" : r === "safe" ? "#065F46" : r === "warning" ? "#B45309" : "#991B1B" : "#6B7280",
        fontSize: 13,
        fontWeight: filterRisk === r ? 600 : 400,
        cursor: "pointer"
      }
    },
    r === "all" ? "T\u1EA5t c\u1EA3" : riskConfig[r].label
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setShowCreateMenu(true);
        setMenuTargetUser(null);
      },
      style: { height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "+ T\u1EA1o th\u1EF1c \u0111\u01A1n"
  )), /* @__PURE__ */ React.createElement(Card, { style: { padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px", borderBottom: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, filtered.length, " ng\u01B0\u1EDDi d\xF9ng")), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 720 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#F9FAFB" } }, ["Ng\u01B0\u1EDDi d\xF9ng", "Tu\u1ED5i", "BMI", "Calo h\xF4m nay", "M\u1EE5c ti\xEAu", "M\u1EE9c \u0111\u1ED9 r\u1EE7i ro", "Ho\u1EA1t \u0111\u1ED9ng g\u1EA7n nh\u1EA5t", "Thao t\xE1c"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, filtered.map((user) => {
    const rc = riskConfig[user.riskLevel];
    const caloPct = Math.round(user.calo / user.caloBudget * 100);
    return /* @__PURE__ */ React.createElement(
      "tr",
      {
        key: user.id,
        style: { borderBottom: "1px solid #F3F4F6" },
        onMouseEnter: (e) => e.currentTarget.style.background = "#F9FAFB",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 } }, user.name.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, user.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF" } }, user.email)))),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 14, color: "#374151" } }, user.age),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 600, color: user.bmi >= 25 ? "#EF4444" : "#22C55E" } }, user.bmi)),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, color: caloPct > 120 ? "#EF4444" : "#1F2937" } }, user.calo), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B7280" } }, "/", user.caloBudget)), /* @__PURE__ */ React.createElement("div", { style: { background: "#E5E7EB", borderRadius: 99, height: 4, marginTop: 4, width: 80 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${Math.min(caloPct, 100)}%`, height: "100%", background: caloPct > 120 ? "#EF4444" : "#22C55E", borderRadius: 99 } }))),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 14, color: "#374151" } }, user.goal),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: rc.bg, color: rc.color } }, rc.label)),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 13, color: "#6B7280" } }, user.lastActivity),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setSelectedUser(user),
          style: { padding: "6px 12px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 12, fontWeight: 500, cursor: "pointer" }
        },
        "Xem"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setMenuTargetUser(user);
            setShowCreateMenu(true);
          },
          style: { padding: "6px 12px", borderRadius: 6, border: "none", background: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 500, cursor: "pointer" }
        },
        "Th\u1EF1c \u0111\u01A1n"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setChatUser(user);
            setChatMessages([{ sender: "system", text: `B\u1EAFt \u0111\u1EA7u tr\xF2 chuy\u1EC7n v\u1EDBi ${user.name}`, time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]);
          },
          style: { padding: "6px 12px", borderRadius: 6, border: "1.5px solid #8B5CF6", background: "transparent", color: "#8B5CF6", fontSize: 12, fontWeight: 500, cursor: "pointer" }
        },
        "Chat"
      )))
    );
  }))))), selectedUser && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: "50%", background: riskConfig[selectedUser.riskLevel].bg, color: riskConfig[selectedUser.riskLevel].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 } }, selectedUser.name.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, selectedUser.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, padding: "2px 8px", borderRadius: 4, background: riskConfig[selectedUser.riskLevel].bg, color: riskConfig[selectedUser.riskLevel].color, fontWeight: 500 } }, riskConfig[selectedUser.riskLevel].label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#6B7280" } }, "Tham gia: ", selectedUser.joinDate)))), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedUser(null), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 } }, [
    { label: "Tu\u1ED5i", value: `${selectedUser.age} tu\u1ED5i` },
    { label: "BMI", value: selectedUser.bmi },
    { label: "C\xE2n n\u1EB7ng hi\u1EC7n t\u1EA1i", value: `${selectedUser.weight} kg` },
    { label: "M\u1EE5c ti\xEAu c\xE2n n\u1EB7ng", value: `${selectedUser.targetWeight} kg` },
    { label: "Calo h\xF4m nay", value: `${selectedUser.calo} kcal` },
    { label: "Ng\xE2n s\xE1ch calo", value: `${selectedUser.caloBudget} kcal` },
    { label: "Email", value: selectedUser.email },
    { label: "\u0110i\u1EC7n tho\u1EA1i", value: selectedUser.phone }
  ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label, style: { background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, r.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 } }, r.value)))), selectedUser.riskLevel !== "safe" && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: "#991B1B" } }, /* @__PURE__ */ React.createElement("strong", null, "C\u1EA3nh b\xE1o r\u1EE7i ro:"), " ", selectedUser.name, " \u0111ang ti\xEAu th\u1EE5 ", Math.round(selectedUser.calo / selectedUser.caloBudget * 100), "% ng\xE2n s\xE1ch calo.", selectedUser.bmi >= 30 ? " BMI \u1EDF m\u1EE9c b\xE9o ph\xEC, c\u1EA7n \u0111i\u1EC1u ch\u1EC9nh th\u1EF1c \u0111\u01A1n g\u1EA5p." : " C\u1EA7n t\u01B0 v\u1EA5n v\xE0 \u0111i\u1EC1u ch\u1EC9nh th\u1EF1c \u0111\u01A1n."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSelectedUser(null);
        setMenuTargetUser(selectedUser);
        setShowCreateMenu(true);
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "T\u1EA1o th\u1EF1c \u0111\u01A1n m\u1EDBi"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setChatUser(selectedUser);
        setSelectedUser(null);
        setChatMessages([{ sender: "system", text: `B\u1EAFt \u0111\u1EA7u tr\xF2 chuy\u1EC7n v\u1EDBi ${selectedUser.name}`, time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]);
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #8B5CF6", background: "transparent", color: "#8B5CF6", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "Nh\u1EAFn tin"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedUser(null),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "\u0110\xF3ng"
  )))), showCreateMenu && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 540 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, "T\u1EA1o th\u1EF1c \u0111\u01A1n m\u1EDBi"), menuTargetUser && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#6B7280", marginTop: 2 } }, "Cho: ", menuTargetUser.name)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setShowCreateMenu(false);
    setMenuTargetUser(null);
  }, style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), menuSaved && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\u1EF1c \u0111\u01A1n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o v\xE0 g\u1EEDi \u0111\u1EBFn ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, !menuTargetUser && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Ng\u01B0\u1EDDi d\xF9ng"), /* @__PURE__ */ React.createElement("select", { style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "-- Ch\u1ECDn ng\u01B0\u1EDDi d\xF9ng --"), initialUsers.map((u) => /* @__PURE__ */ React.createElement("option", { key: u.id, value: u.id }, u.name)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "T\xEAn th\u1EF1c \u0111\u01A1n"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: menuForm.title,
      onChange: (e) => setMenuForm((p) => ({ ...p, title: e.target.value })),
      placeholder: "VD: Th\u1EF1c \u0111\u01A1n gi\u1EA3m c\xE2n tu\u1EA7n 1",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "M\u1EE5c ti\xEAu calo/ng\xE0y"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: menuForm.calories,
      onChange: (e) => setMenuForm((p) => ({ ...p, calories: e.target.value })),
      placeholder: "1600",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Th\u1EDDi gian"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: menuForm.duration,
      onChange: (e) => setMenuForm((p) => ({ ...p, duration: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "Ch\u1ECDn th\u1EDDi gian"),
    /* @__PURE__ */ React.createElement("option", { value: "7" }, "7 ng\xE0y"),
    /* @__PURE__ */ React.createElement("option", { value: "14" }, "14 ng\xE0y"),
    /* @__PURE__ */ React.createElement("option", { value: "30" }, "30 ng\xE0y")
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Ghi ch\xFA h\u01B0\u1EDBng d\u1EABn"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: menuForm.notes,
      onChange: (e) => setMenuForm((p) => ({ ...p, notes: e.target.value })),
      placeholder: "H\u01B0\u1EDBng d\u1EABn th\u1EF1c hi\u1EC7n, l\u01B0u \xFD \u0111\u1EB7c bi\u1EC7t...",
      rows: 4,
      style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 20 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSaveMenu,
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "T\u1EA1o & G\u1EEDi th\u1EF1c \u0111\u01A1n"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setShowCreateMenu(false);
        setMenuTargetUser(null);
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "H\u1EE7y"
  )))), chatUser && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 } }, chatUser.name.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, color: "#1F2937" } }, chatUser.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#22C55E" } }, "\u0110ang ho\u1EA1t \u0111\u1ED9ng"))), /* @__PURE__ */ React.createElement("button", { onClick: () => setChatUser(null), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, minHeight: 300, maxHeight: 400 } }, chatMessages.map((msg, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    justifyContent: msg.sender === "expert" ? "flex-end" : msg.sender === "system" ? "center" : "flex-start"
  } }, msg.sender === "system" ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#9CA3AF", background: "#F3F4F6", padding: "4px 12px", borderRadius: 12 } }, msg.text) : /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "75%" } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "10px 14px",
    borderRadius: msg.sender === "expert" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
    background: msg.sender === "expert" ? "#2563EB" : "#F3F4F6",
    color: msg.sender === "expert" ? "#fff" : "#1F2937",
    fontSize: 14
  } }, msg.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#9CA3AF", marginTop: 4, textAlign: msg.sender === "expert" ? "right" : "left" } }, msg.time))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", borderTop: "1px solid #E5E7EB", display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: chatMessage,
      onChange: (e) => setChatMessage(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && handleSendChat(),
      placeholder: "Nh\u1EADp tin nh\u1EAFn...",
      style: { flex: 1, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSendChat,
      style: { height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "G\u1EEDi"
  )))));
}
export {
  ExpertUsers as default
};
