import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function Toggle({ checked, onChange }) {
  return /* @__PURE__ */ React.createElement("button", { onClick: onChange, style: { width: 44, height: 24, borderRadius: 12, background: checked ? "#2563EB" : "#D1D5DB", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" } }));
}
function ExpertSettings() {
  const { currentUser } = useApp();
  const [saved, setSaved] = useState("");
  const [profile, setProfile] = useState({
    name: currentUser?.name || "ThS. Tr\u1EA7n Th\u1ECB B\xEDch",
    email: currentUser?.email || "bich.tran@expert.com",
    phone: "0901234567",
    title: "Th\u1EA1c s\u0129 Dinh d\u01B0\u1EE1ng h\u1ECDc",
    specialization: "Dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng & Th\u1EC3 thao",
    experience: "8",
    university: "\u0110\u1EA1i h\u1ECDc Y H\xE0 N\u1ED9i",
    license: "DV-2018-0421"
  });
  const [bio, setBio] = useState(
    "Chuy\xEAn gia dinh d\u01B0\u1EE1ng v\u1EDBi h\u01A1n 8 n\u0103m kinh nghi\u1EC7m trong l\u0129nh v\u1EF1c dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng v\xE0 t\u01B0 v\u1EA5n s\u1EE9c kh\u1ECFe. T\u1ED1t nghi\u1EC7p Th\u1EA1c s\u0129 Dinh d\u01B0\u1EE1ng h\u1ECDc t\u1EA1i \u0110\u1EA1i h\u1ECDc Y H\xE0 N\u1ED9i."
  );
  const [workingHours, setWorkingHours] = useState({
    startTime: "08:00",
    endTime: "17:00",
    workDays: ["T2", "T3", "T4", "T5", "T6"],
    maxUsersPerDay: "10"
  });
  const [notifications, setNotifications] = useState({
    newUserAssigned: true,
    userAlert: true,
    weeklyReport: true,
    userMessage: true,
    systemUpdate: false
  });
  const handleSave = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const toggleWorkDay = (day) => {
    setWorkingHours((p) => ({
      ...p,
      workDays: p.workDays.includes(day) ? p.workDays.filter((d) => d !== day) : [...p.workDays, day]
    }));
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "C\xE0i \u0111\u1EB7t chuy\xEAn gia"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Qu\u1EA3n l\xFD h\u1ED3 s\u01A1 chuy\xEAn m\xF4n v\xE0 c\u1EA5u h\xECnh ho\u1EA1t \u0111\u1ED9ng t\u01B0 v\u1EA5n.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng tin t\xE0i kho\u1EA3n"), saved === "profile" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\xF4ng tin t\xE0i kho\u1EA3n \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 } }, [
    { key: "name", label: "H\u1ECD v\xE0 t\xEAn", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", type: "tel" },
    { key: "license", label: "S\u1ED1 ch\u1EE9ng ch\u1EC9 h\xE0nh ngh\u1EC1", type: "text" }
  ].map(({ key, label, type }) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
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
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u th\xF4ng tin"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng tin chuy\xEAn m\xF4n"), saved === "professional" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "Th\xF4ng tin chuy\xEAn m\xF4n \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 } }, [
    { key: "title", label: "H\u1ECDc v\u1ECB / Danh hi\u1EC7u", type: "text" },
    { key: "specialization", label: "Chuy\xEAn ng\xE0nh", type: "text" },
    { key: "university", label: "C\u01A1 s\u1EDF \u0111\xE0o t\u1EA1o", type: "text" },
    { key: "experience", label: "S\u1ED1 n\u0103m kinh nghi\u1EC7m", type: "number" }
  ].map(({ key, label, type }) => /* @__PURE__ */ React.createElement("div", { key }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type,
      value: profile[key],
      onChange: (e) => setProfile((p) => ({ ...p, [key]: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Gi\u1EDBi thi\u1EC7u b\u1EA3n th\xE2n"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: bio,
      onChange: (e) => setBio(e.target.value),
      rows: 4,
      style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("professional"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u th\xF4ng tin chuy\xEAn m\xF4n"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "L\u1ECBch l\xE0m vi\u1EC7c & T\u01B0 v\u1EA5n"), saved === "schedule" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "L\u1ECBch l\xE0m vi\u1EC7c \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 8 } }, "Ng\xE0y l\xE0m vi\u1EC7c"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, days.map((day) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: day,
      onClick: () => toggleWorkDay(day),
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        border: `1.5px solid ${workingHours.workDays.includes(day) ? "#2563EB" : "#E5E7EB"}`,
        background: workingHours.workDays.includes(day) ? "#DBEAFE" : "#fff",
        color: workingHours.workDays.includes(day) ? "#1D4ED8" : "#6B7280",
        fontSize: 13,
        fontWeight: workingHours.workDays.includes(day) ? 700 : 400,
        cursor: "pointer"
      }
    },
    day
  )))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Gi\u1EDD b\u1EAFt \u0111\u1EA7u"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "time",
      value: workingHours.startTime,
      onChange: (e) => setWorkingHours((p) => ({ ...p, startTime: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Gi\u1EDD k\u1EBFt th\xFAc"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "time",
      value: workingHours.endTime,
      onChange: (e) => setWorkingHours((p) => ({ ...p, endTime: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "S\u1ED1 ng\u01B0\u1EDDi d\xF9ng t\u1ED1i \u0111a/ng\xE0y"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: workingHours.maxUsersPerDay,
      onChange: (e) => setWorkingHours((p) => ({ ...p, maxUsersPerDay: e.target.value })),
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleSave("schedule"),
      style: { height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "L\u01B0u l\u1ECBch l\xE0m vi\u1EC7c"
  )), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "\u0110\u1ED5i m\u1EADt kh\u1EA9u"), saved === "password" && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" } }, "M\u1EADt kh\u1EA9u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 } }, ["M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i", "M\u1EADt kh\u1EA9u m\u1EDBi", "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi"].map((label) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "password",
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      style: { width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }
    }
  )))), /* @__PURE__ */ React.createElement("button", { onClick: () => handleSave("password"), style: { marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" } }, "\u0110\u1ED5i m\u1EADt kh\u1EA9u")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 } }, "Th\xF4ng b\xE1o"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
    { key: "newUserAssigned", label: "Ng\u01B0\u1EDDi d\xF9ng m\u1EDBi \u0111\u01B0\u1EE3c g\xE1n", desc: "Th\xF4ng b\xE1o khi c\xF3 ng\u01B0\u1EDDi d\xF9ng m\u1EDBi \u0111\u01B0\u1EE3c ph\xE2n c\xF4ng" },
    { key: "userAlert", label: "C\u1EA3nh b\xE1o r\u1EE7i ro ng\u01B0\u1EDDi d\xF9ng", desc: "Th\xF4ng b\xE1o ngay khi ng\u01B0\u1EDDi d\xF9ng v\u01B0\u1EE3t ng\u01B0\u1EE1ng an to\xE0n" },
    { key: "weeklyReport", label: "B\xE1o c\xE1o t\u1ED5ng k\u1EBFt tu\u1EA7n", desc: "T\u1ED5ng k\u1EBFt ho\u1EA1t \u0111\u1ED9ng t\u01B0 v\u1EA5n m\u1ED7i Ch\u1EE7 nh\u1EADt" },
    { key: "userMessage", label: "Tin nh\u1EAFn t\u1EEB ng\u01B0\u1EDDi d\xF9ng", desc: "Th\xF4ng b\xE1o ngay khi nh\u1EADn \u0111\u01B0\u1EE3c tin nh\u1EAFn" },
    { key: "systemUpdate", label: "C\u1EADp nh\u1EADt h\u1EC7 th\u1ED1ng", desc: "Th\xF4ng b\xE1o v\u1EC1 t\xEDnh n\u0103ng v\xE0 c\u1EADp nh\u1EADt m\u1EDBi" }
  ].map(({ key, label, desc }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#1F2937" } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, desc)), /* @__PURE__ */ React.createElement(Toggle, { checked: notifications[key], onChange: () => setNotifications((p) => ({ ...p, [key]: !p[key] })) })))))));
}
export {
  ExpertSettings as default
};
