import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function Toggle({ checked, onChange, color = "#22C55E" }) {
  return /* @__PURE__ */ React.createElement("button", { onClick: onChange, style: { width: 44, height: 24, borderRadius: 12, background: checked ? color : "#D1D5DB", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" } }));
}
function AdminSettings() {
  const { currentUser } = useApp();
  const [saved, setSaved] = useState("");
  const [profile, setProfile] = useState({
    name: currentUser?.name || "Admin H\u1EC7 Th\u1ED1ng",
    email: currentUser?.email || "admin@healthapp.vn",
    phone: "0800123456"
  });
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxUsersPerExpert: "15",
    sessionTimeout: "60",
    defaultCalorieBudget: "2000",
    autoApproveExperts: false,
    enableAIFeatures: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    forcePasswordReset: false,
    ipWhitelist: "",
    minPasswordLength: "8",
    maxLoginAttempts: "5",
    accountLockDuration: "30"
  });
  const [notificationSettings, setNotificationSettings] = useState({
    newUserRegistration: true,
    expertRequest: true,
    systemAlert: true,
    weeklyReport: true,
    userReport: false
  });
  const [auditLog] = useState([
    { id: 1, action: "Ph\xEA duy\u1EC7t chuy\xEAn gia BS. L\xEA Th\u1ECB Tuy\u1EBFt", admin: "Admin H\u1EC7 Th\u1ED1ng", time: "3 gi\u1EDD tr\u01B0\u1EDBc", type: "approve" },
    { id: 2, action: "Kh\xF3a t\xE0i kho\u1EA3n Ph\u1EA1m V\u0103n T\xF9ng", admin: "Admin H\u1EC7 Th\u1ED1ng", time: "1 ng\xE0y tr\u01B0\u1EDBc", type: "lock" },
    { id: 3, action: "Import 12 th\u1EF1c ph\u1EA9m m\u1EDBi v\xE0o database", admin: "Admin H\u1EC7 Th\u1ED1ng", time: "2 ng\xE0y tr\u01B0\u1EDBc", type: "food" },
    { id: 4, action: "C\u1EADp nh\u1EADt c\xE0i \u0111\u1EB7t h\u1EC7 th\u1ED1ng", admin: "Admin H\u1EC7 Th\u1ED1ng", time: "3 ng\xE0y tr\u01B0\u1EDBc", type: "settings" },
    { id: 5, action: "T\u1EA1o t\xE0i kho\u1EA3n admin m\u1EDBi", admin: "Super Admin", time: "1 tu\u1EA7n tr\u01B0\u1EDBc", type: "admin" }
  ]);
  const handleSave = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "C\xE0i \u0111\u1EB7t h\u1EC7 th\u1ED1ng"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Qu\u1EA3n l\xFD c\u1EA5u h\xECnh to\xE0n h\u1EC7 th\u1ED1ng VitaTrack.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng tin qu\u1EA3n tr\u1ECB vi\xEAn"), saved === "profile" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\xF4ng tin \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 } }, [
    { key: "name", label: "H\u1ECD v\xE0 t\xEAn", type: "text" },
    { key: "email", label: "Email qu\u1EA3n tr\u1ECB", type: "email" },
    { key: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", type: "tel" }
  ].map(({ key, label, type }) => /* @__PURE__ */ React.createElement("div", { key, style: { gridColumn: key === "phone" ? "span 2" : "span 1" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type,
      value: profile[key],
      onChange: (e) => setProfile((p) => ({ ...p, [key]: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("profile"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u th\xF4ng tin"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "C\u1EA5u h\xECnh n\u1EC1n t\u1EA3ng"), saved === "system" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "C\u1EA5u h\xECnh h\u1EC7 th\u1ED1ng \u0111\xE3 \u0111\u01B0\u1EE3c l\u01B0u!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 } }, [
    { key: "maintenanceMode", label: "Ch\u1EBF \u0111\u1ED9 b\u1EA3o tr\xEC", desc: "T\u1EAFt quy\u1EC1n truy c\u1EADp ng\u01B0\u1EDDi d\xF9ng trong khi n\xE2ng c\u1EA5p h\u1EC7 th\u1ED1ng", danger: true },
    { key: "allowRegistration", label: "Cho ph\xE9p \u0111\u0103ng k\xFD m\u1EDBi", desc: "Cho ph\xE9p ng\u01B0\u1EDDi d\xF9ng m\u1EDBi t\u1EA1o t\xE0i kho\u1EA3n" },
    { key: "requireEmailVerification", label: "X\xE1c minh email b\u1EAFt bu\u1ED9c", desc: "Y\xEAu c\u1EA7u x\xE1c minh email tr\u01B0\u1EDBc khi s\u1EED d\u1EE5ng" },
    { key: "autoApproveExperts", label: "T\u1EF1 \u0111\u1ED9ng ph\xEA duy\u1EC7t chuy\xEAn gia", desc: "Kh\xF4ng khuy\u1EBFn kh\xEDch \u2013 b\u1ECF qua ki\u1EC3m duy\u1EC7t th\u1EE7 c\xF4ng", danger: true },
    { key: "enableAIFeatures", label: "K\xEDch ho\u1EA1t t\xEDnh n\u0103ng AI", desc: "Tr\u1EE3 l\xFD \u1EA3o v\xE0 ph\xE2n t\xEDch s\u1EE9c kh\u1ECFe t\u1EF1 \u0111\u1ED9ng" }
  ].map(({ key, label, desc, danger }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: danger ? "#EF4444" : "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(
    Toggle,
    {
      checked: systemSettings[key],
      onChange: () => setSystemSettings((p) => ({ ...p, [key]: !p[key] })),
      color: danger ? "#EF4444" : "#22C55E"
    }
  )))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 } }, [
    { key: "maxUsersPerExpert", label: "Ng\u01B0\u1EDDi d\xF9ng t\u1ED1i \u0111a/chuy\xEAn gia", unit: "ng\u01B0\u1EDDi" },
    { key: "sessionTimeout", label: "Th\u1EDDi gian h\u1EBFt phi\xEAn", unit: "ph\xFAt" },
    { key: "defaultCalorieBudget", label: "Ng\xE2n s\xE1ch calo m\u1EB7c \u0111\u1ECBnh", unit: "kcal" }
  ].map(({ key, label, unit }) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: systemSettings[key],
      onChange: (e) => setSystemSettings((p) => ({ ...p, [key]: e.target.value })),
      style: { flex: 1, height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#9CA3AF", whiteSpace: "nowrap" } }, unit))))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("system"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u c\u1EA5u h\xECnh"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "B\u1EA3o m\u1EADt h\u1EC7 th\u1ED1ng"), saved === "security" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "C\xE0i \u0111\u1EB7t b\u1EA3o m\u1EADt \u0111\xE3 \u0111\u01B0\u1EE3c l\u01B0u!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 } }, [
    { key: "twoFactorAuth", label: "X\xE1c th\u1EF1c hai y\u1EBFu t\u1ED1 (2FA)", desc: "Y\xEAu c\u1EA7u 2FA cho t\xE0i kho\u1EA3n admin" },
    { key: "forcePasswordReset", label: "Bu\u1ED9c \u0111\u1ED5i m\u1EADt kh\u1EA9u \u0111\u1ECBnh k\u1EF3", desc: "Y\xEAu c\u1EA7u \u0111\u1ED5i m\u1EADt kh\u1EA9u m\u1ED7i 90 ng\xE0y" }
  ].map(({ key, label, desc }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(Toggle, { checked: securitySettings[key], onChange: () => setSecuritySettings((p) => ({ ...p, [key]: !p[key] })), color: "#2563EB" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 } }, [
    { key: "minPasswordLength", label: "\u0110\u1ED9 d\xE0i m\u1EADt kh\u1EA9u t\u1ED1i thi\u1EC3u", unit: "k\xFD t\u1EF1" },
    { key: "maxLoginAttempts", label: "S\u1ED1 l\u1EA7n \u0111\u0103ng nh\u1EADp sai t\u1ED1i \u0111a", unit: "l\u1EA7n" },
    { key: "accountLockDuration", label: "Th\u1EDDi gian kh\xF3a t\xE0i kho\u1EA3n", unit: "ph\xFAt" }
  ].map(({ key, label, unit }) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: securitySettings[key],
      onChange: (e) => setSecuritySettings((p) => ({ ...p, [key]: e.target.value })),
      style: { flex: 1, height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" } }, unit))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Danh s\xE1ch IP \u0111\u01B0\u1EE3c ph\xE9p (m\u1ED7i IP m\u1ED9t d\xF2ng)"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: securitySettings.ipWhitelist,
      onChange: (e) => setSecuritySettings((p) => ({ ...p, ipWhitelist: e.target.value })),
      placeholder: "\u0110\u1EC3 tr\u1ED1ng \u0111\u1EC3 cho ph\xE9p t\u1EA5t c\u1EA3 IP\nVD: 192.168.1.1\n10.0.0.0/24",
      rows: 3,
      style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "monospace" }
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("security"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u c\xE0i \u0111\u1EB7t b\u1EA3o m\u1EADt"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng b\xE1o qu\u1EA3n tr\u1ECB"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
    { key: "newUserRegistration", label: "Ng\u01B0\u1EDDi d\xF9ng m\u1EDBi \u0111\u0103ng k\xFD", desc: "Th\xF4ng b\xE1o khi c\xF3 ng\u01B0\u1EDDi d\xF9ng m\u1EDBi t\u1EA1o t\xE0i kho\u1EA3n" },
    { key: "expertRequest", label: "Y\xEAu c\u1EA7u ph\xEA duy\u1EC7t chuy\xEAn gia", desc: "Th\xF4ng b\xE1o ngay khi c\xF3 h\u1ED3 s\u01A1 chuy\xEAn gia m\u1EDBi" },
    { key: "systemAlert", label: "C\u1EA3nh b\xE1o h\u1EC7 th\u1ED1ng", desc: "Th\xF4ng b\xE1o khi c\xF3 s\u1EF1 c\u1ED1 ho\u1EB7c l\u1ED7i h\u1EC7 th\u1ED1ng" },
    { key: "weeklyReport", label: "B\xE1o c\xE1o tu\u1EA7n", desc: "T\u1ED5ng k\u1EBFt ho\u1EA1t \u0111\u1ED9ng h\u1EC7 th\u1ED1ng m\u1ED7i tu\u1EA7n" },
    { key: "userReport", label: "B\xE1o c\xE1o vi ph\u1EA1m t\u1EEB ng\u01B0\u1EDDi d\xF9ng", desc: "Th\xF4ng b\xE1o khi nh\u1EADn \u0111\u01B0\u1EE3c ph\u1EA3n \xE1nh vi ph\u1EA1m" }
  ].map(({ key, label, desc }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(Toggle, { checked: notificationSettings[key], onChange: () => setNotificationSettings((p) => ({ ...p, [key]: !p[key] })), color: "#F59E0B" }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "\u0110\u1ED5i m\u1EADt kh\u1EA9u qu\u1EA3n tr\u1ECB"), saved === "password" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "M\u1EADt kh\u1EA9u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 } }, ["M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i", "M\u1EADt kh\u1EA9u m\u1EDBi", "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi"].map((label) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
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
      style: { marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "\u0110\u1ED5i m\u1EADt kh\u1EA9u"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Nh\u1EADt k\xFD ho\u1EA1t \u0111\u1ED9ng qu\u1EA3n tr\u1ECB"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0 } }, auditLog.map((log, i) => /* @__PURE__ */ React.createElement("div", { key: log.id, style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < auditLog.length - 1 ? "1px solid #F3F4F6" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: log.type === "approve" ? "#22C55E" : log.type === "lock" ? "#EF4444" : log.type === "food" ? "#F59E0B" : "#2563EB" } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#1F2937" } }, log.action), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF" } }, "B\u1EDFi: ", log.admin)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" } }, log.time)))))));
}
export {
  AdminSettings as default
};
