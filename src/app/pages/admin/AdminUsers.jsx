import React, { useState } from "react";
const initialUsers = [
  { id: 1, name: "Nguy\u1EC5n V\u0103n An", email: "an@email.com", role: "user", status: "active", joinDate: "01/01/2026", lastLogin: "2 gi\u1EDD tr\u01B0\u1EDBc", bmi: 23.4, goal: "Gi\u1EA3m c\xE2n" },
  { id: 2, name: "L\xEA Th\u1ECB Mai", email: "mai@email.com", role: "user", status: "active", joinDate: "15/01/2026", lastLogin: "1 gi\u1EDD tr\u01B0\u1EDBc", bmi: 28.2, goal: "Gi\u1EA3m c\xE2n" },
  { id: 3, name: "ThS. Tr\u1EA7n Th\u1ECB B\xEDch", email: "bich@expert.com", role: "expert", status: "active", joinDate: "01/12/2025", lastLogin: "30 ph\xFAt tr\u01B0\u1EDBc" },
  { id: 4, name: "Ph\u1EA1m V\u0103n T\xF9ng", email: "tung@email.com", role: "user", status: "locked", joinDate: "20/01/2026", lastLogin: "5 ng\xE0y tr\u01B0\u1EDBc", bmi: 22.1, goal: "Duy tr\xEC" },
  { id: 5, name: "Ho\xE0ng Minh \u0110\u1EE9c", email: "duc@email.com", role: "user", status: "active", joinDate: "10/02/2026", lastLogin: "1 ng\xE0y tr\u01B0\u1EDBc", bmi: 22.8, goal: "Duy tr\xEC" },
  { id: 6, name: "Tr\u1EA7n Th\u1ECB H\u01B0\u01A1ng", email: "huong@email.com", role: "user", status: "active", joinDate: "05/02/2026", lastLogin: "3 gi\u1EDD tr\u01B0\u1EDBc", bmi: 31.5, goal: "Gi\u1EA3m c\xE2n" },
  { id: 7, name: "Nguy\u1EC5n Th\u1ECB Lan", email: "lan@email.com", role: "user", status: "active", joinDate: "01/03/2026", lastLogin: "5 ph\xFAt tr\u01B0\u1EDBc", bmi: 21.3, goal: "T\u0103ng c\xE2n" },
  { id: 8, name: "TS. Nguy\u1EC5n Th\xE0nh C\xF4ng", email: "cong@email.com", role: "expert", status: "active", joinDate: "15/02/2026", lastLogin: "2 gi\u1EDD tr\u01B0\u1EDBc" },
  { id: 9, name: "Admin H\u1EC7 Th\u1ED1ng", email: "admin@healthapp.vn", role: "admin", status: "active", joinDate: "01/01/2025", lastLogin: "1 ph\xFAt tr\u01B0\u1EDBc" }
];
const roleConfig = {
  user: { label: "Ng\u01B0\u1EDDi d\xF9ng", bg: "#DCFCE7", color: "#16A34A" },
  expert: { label: "Chuy\xEAn gia", bg: "#DBEAFE", color: "#1D4ED8" },
  admin: { label: "Admin", bg: "#FEF3C7", color: "#B45309" }
};
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });
  const toggleStatus = (id) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "locked" : "active" } : u));
    setConfirmAction(null);
  };
  const changeRole = (id, role) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, role } : u));
    setSelectedUser(null);
  };
  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalExperts = users.filter((u) => u.role === "expert").length;
  const totalActive = users.filter((u) => u.status === "active").length;
  const totalLocked = users.filter((u) => u.status === "locked").length;
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Qu\u1EA3n l\xFD t\xE0i kho\u1EA3n, ph\xE2n quy\u1EC1n v\xE0 tr\u1EA1ng th\xE1i ng\u01B0\u1EDDi d\xF9ng trong h\u1EC7 th\u1ED1ng.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 } }, [
    { label: "Ng\u01B0\u1EDDi d\xF9ng", value: totalUsers, color: "#22C55E" },
    { label: "Chuy\xEAn gia", value: totalExperts, color: "#2563EB" },
    { label: "\u0110ang ho\u1EA1t \u0111\u1ED9ng", value: totalActive, color: "#10B981" },
    { label: "\u0110\xE3 kh\xF3a", value: totalLocked, color: "#EF4444" }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 700, color: s.color, marginTop: 4 } }, s.value)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "T\xECm ki\u1EBFm theo t\xEAn, email...",
      style: { flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterRole,
      onChange: (e) => setFilterRole(e.target.value),
      style: { height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "T\u1EA5t c\u1EA3 vai tr\xF2"),
    /* @__PURE__ */ React.createElement("option", { value: "user" }, "Ng\u01B0\u1EDDi d\xF9ng"),
    /* @__PURE__ */ React.createElement("option", { value: "expert" }, "Chuy\xEAn gia"),
    /* @__PURE__ */ React.createElement("option", { value: "admin" }, "Admin")
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterStatus,
      onChange: (e) => setFilterStatus(e.target.value),
      style: { height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "T\u1EA5t c\u1EA3 tr\u1EA1ng th\xE1i"),
    /* @__PURE__ */ React.createElement("option", { value: "active" }, "Ho\u1EA1t \u0111\u1ED9ng"),
    /* @__PURE__ */ React.createElement("option", { value: "locked" }, "\u0110\xE3 kh\xF3a")
  )), /* @__PURE__ */ React.createElement(Card, { style: { padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px", borderBottom: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#6B7280" } }, filtered.length, " / ", users.length, " ng\u01B0\u1EDDi d\xF9ng")), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 700 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#F9FAFB" } }, ["Ng\u01B0\u1EDDi d\xF9ng", "Email", "Vai tr\xF2", "Tr\u1EA1ng th\xE1i", "Ng\xE0y tham gia", "\u0110\u0103ng nh\u1EADp g\u1EA7n nh\u1EA5t", "Thao t\xE1c"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, filtered.map((u) => {
    const rc = roleConfig[u.role];
    return /* @__PURE__ */ React.createElement(
      "tr",
      {
        key: u.id,
        style: { borderBottom: "1px solid #F3F4F6" },
        onMouseEnter: (e) => e.currentTarget.style.background = "#F9FAFB",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 } }, u.name.split(" ").pop()?.charAt(0)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 500 } }, u.name))),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 13, color: "#6B7280" } }, u.email),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, padding: "3px 8px", borderRadius: 6, fontWeight: 600, background: rc.bg, color: rc.color } }, rc.label)),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, padding: "3px 8px", borderRadius: 6, fontWeight: 600, background: u.status === "active" ? "#DCFCE7" : "#FEE2E2", color: u.status === "active" ? "#16A34A" : "#DC2626" } }, u.status === "active" ? "Ho\u1EA1t \u0111\u1ED9ng" : "\u0110\xE3 kh\xF3a")),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 13, color: "#6B7280" } }, u.joinDate),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px", fontSize: 13, color: "#6B7280" } }, u.lastLogin),
      /* @__PURE__ */ React.createElement("td", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setSelectedUser(u),
          style: { padding: "6px 10px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 11, fontWeight: 500, cursor: "pointer" }
        },
        "Chi ti\u1EBFt"
      ), u.role !== "admin" && (confirmAction?.type === "toggle" && confirmAction.id === u.id ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleStatus(u.id), style: { padding: "6px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" } }, "X\xE1c nh\u1EADn"), /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmAction(null), style: { padding: "6px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 11, cursor: "pointer" } }, "H\u1EE7y")) : /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setConfirmAction({ type: "toggle", id: u.id }),
          style: { padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${u.status === "active" ? "#EF4444" : "#22C55E"}`, background: "transparent", color: u.status === "active" ? "#EF4444" : "#22C55E", fontSize: 11, fontWeight: 500, cursor: "pointer" }
        },
        u.status === "active" ? "Kh\xF3a" : "M\u1EDF kh\xF3a"
      ))))
    );
  }))))), selectedUser && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 480 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, "Chi ti\u1EBFt ng\u01B0\u1EDDi d\xF9ng"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedUser(null), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: roleConfig[selectedUser.role].bg, color: roleConfig[selectedUser.role].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 } }, selectedUser.name.split(" ").pop()?.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 600, color: "#1F2937" } }, selectedUser.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280" } }, selectedUser.email))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 } }, [
    { label: "Vai tr\xF2", value: roleConfig[selectedUser.role].label },
    { label: "Tr\u1EA1ng th\xE1i", value: selectedUser.status === "active" ? "Ho\u1EA1t \u0111\u1ED9ng" : "\u0110\xE3 kh\xF3a" },
    { label: "Ng\xE0y tham gia", value: selectedUser.joinDate },
    { label: "\u0110\u0103ng nh\u1EADp g\u1EA7n nh\u1EA5t", value: selectedUser.lastLogin },
    ...selectedUser.bmi ? [{ label: "BMI", value: selectedUser.bmi.toString() }] : [],
    ...selectedUser.goal ? [{ label: "M\u1EE5c ti\xEAu", value: selectedUser.goal }] : []
  ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label, style: { background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, r.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 } }, r.value)))), selectedUser.role !== "admin" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 8 } }, "Thay \u0111\u1ED5i vai tr\xF2"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, ["user", "expert"].filter((r) => r !== selectedUser.role).map((r) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: r,
      onClick: () => changeRole(selectedUser.id, r),
      style: { height: 40, padding: "0 16px", borderRadius: 8, border: `1.5px solid ${roleConfig[r].color}`, background: roleConfig[r].bg, color: roleConfig[r].color, fontSize: 13, fontWeight: 600, cursor: "pointer" }
    },
    "\u0110\u1EB7t l\xE0m ",
    roleConfig[r].label
  )))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, selectedUser.role !== "admin" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        toggleStatus(selectedUser.id);
        setSelectedUser(null);
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: `1.5px solid ${selectedUser.status === "active" ? "#EF4444" : "#22C55E"}`, background: "transparent", color: selectedUser.status === "active" ? "#EF4444" : "#22C55E", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    selectedUser.status === "active" ? "Kh\xF3a t\xE0i kho\u1EA3n" : "M\u1EDF kh\xF3a t\xE0i kho\u1EA3n"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedUser(null),
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "\u0110\xF3ng"
  )))));
}
export {
  AdminUsers as default
};
