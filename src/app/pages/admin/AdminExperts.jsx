import React, { useState } from "react";
const initialRequests = [
  {
    id: 1,
    name: "TS. Nguy\u1EC5n Th\xE0nh C\xF4ng",
    email: "cong@email.com",
    phone: "0901234567",
    degree: "Ti\u1EBFn s\u0129 Dinh d\u01B0\u1EE1ng h\u1ECDc",
    specialization: "Dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng",
    university: "\u0110\u1EA1i h\u1ECDc Y H\xE0 N\u1ED9i",
    experience: 12,
    requestDate: "01/03/2026",
    status: "pending",
    license: "DV-2012-0156",
    bio: "Ti\u1EBFn s\u0129 Dinh d\u01B0\u1EE1ng h\u1ECDc v\u1EDBi 12 n\u0103m kinh nghi\u1EC7m trong l\u0129nh v\u1EF1c dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng v\xE0 nghi\xEAn c\u1EE9u khoa h\u1ECDc."
  },
  {
    id: 2,
    name: "ThS. Tr\u1EA7n Minh Khoa",
    email: "khoa@email.com",
    phone: "0912345678",
    degree: "Th\u1EA1c s\u0129 Dinh d\u01B0\u1EE1ng l\xE2m s\xE0ng",
    specialization: "Dinh d\u01B0\u1EE1ng th\u1EC3 thao & Gi\u1EA3m c\xE2n",
    university: "\u0110\u1EA1i h\u1ECDc Y D\u01B0\u1EE3c TP.HCM",
    experience: 6,
    requestDate: "02/03/2026",
    status: "pending",
    license: "DV-2018-0892",
    bio: "Chuy\xEAn gia dinh d\u01B0\u1EE1ng t\u1EADp trung v\xE0o l\u0129nh v\u1EF1c th\u1EC3 thao v\xE0 qu\u1EA3n l\xFD c\xE2n n\u1EB7ng, \u0111\xE3 h\u1ED7 tr\u1EE3 h\u01A1n 500 kh\xE1ch h\xE0ng."
  },
  {
    id: 3,
    name: "BS. L\xEA Th\u1ECB Tuy\u1EBFt",
    email: "tuyet@email.com",
    phone: "0923456789",
    degree: "B\xE1c s\u0129 chuy\xEAn khoa I",
    specialization: "Dinh d\u01B0\u1EE1ng tr\u1EBB em",
    university: "\u0110\u1EA1i h\u1ECDc Y Hu\u1EBF",
    experience: 9,
    requestDate: "28/02/2026",
    status: "approved",
    license: "DV-2015-0423",
    bio: "B\xE1c s\u0129 chuy\xEAn khoa dinh d\u01B0\u1EE1ng tr\u1EBB em v\u1EDBi nhi\u1EC1u n\u0103m kinh nghi\u1EC7m t\u01B0 v\u1EA5n cho c\xE1c gia \u0111\xECnh."
  },
  {
    id: 4,
    name: "PGS.TS. Ho\xE0ng V\u0103n Minh",
    email: "minh@email.com",
    phone: "0934567890",
    degree: "Ph\xF3 gi\xE1o s\u01B0, Ti\u1EBFn s\u0129",
    specialization: "Dinh d\u01B0\u1EE1ng c\u1ED9ng \u0111\u1ED3ng",
    university: "Vi\u1EC7n Dinh d\u01B0\u1EE1ng Qu\u1ED1c gia",
    experience: 20,
    requestDate: "27/02/2026",
    status: "rejected",
    license: "DV-2005-0012",
    bio: "Ph\xF3 gi\xE1o s\u01B0 t\u1EA1i Vi\u1EC7n Dinh d\u01B0\u1EE1ng Qu\u1ED1c gia v\u1EDBi 20 n\u0103m nghi\xEAn c\u1EE9u v\u1EC1 dinh d\u01B0\u1EE1ng c\u1ED9ng \u0111\u1ED3ng."
  }
];
function Card({ children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style } }, children);
}
function AdminExperts() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("all");
  const [selectedReq, setSelectedReq] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(null);
  const [actionDone, setActionDone] = useState(null);
  const filtered = requests.filter((r) => filter === "all" || r.status === filter);
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;
  const updateStatus = (id, status) => {
    setRequests((p) => p.map((r) => r.id === id ? { ...r, status } : r));
    setActionDone({ id, type: status });
    setShowRejectForm(null);
    setRejectReason("");
    setSelectedReq(null);
    setTimeout(() => setActionDone(null), 3e3);
  };
  const statusConfig = {
    pending: { label: "Ch\u1EDD duy\u1EC7t", bg: "#FEF3C7", color: "#B45309" },
    approved: { label: "\u0110\xE3 ph\xEA duy\u1EC7t", bg: "#D1FAE5", color: "#065F46" },
    rejected: { label: "\u0110\xE3 t\u1EEB ch\u1ED1i", bg: "#FEE2E2", color: "#991B1B" }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Inter, sans-serif", color: "#1F2937" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 } }, "C\u1EA5p quy\u1EC1n chuy\xEAn gia"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280" } }, "Xem x\xE9t h\u1ED3 s\u01A1 v\xE0 ph\xEA duy\u1EC7t y\xEAu c\u1EA7u n\xE2ng c\u1EA5p t\xE0i kho\u1EA3n chuy\xEAn gia.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 } }, [
    { label: "Ch\u1EDD xem x\xE9t", value: pendingCount, color: "#F59E0B", bg: "#FEF3C7" },
    { label: "\u0110\xE3 ph\xEA duy\u1EC7t", value: approvedCount, color: "#22C55E", bg: "#D1FAE5" },
    { label: "\u0110\xE3 t\u1EEB ch\u1ED1i", value: rejectedCount, color: "#EF4444", bg: "#FEE2E2" },
    { label: "T\u1ED5ng y\xEAu c\u1EA7u", value: requests.length, color: "#2563EB", bg: "#DBEAFE" }
  ].map((s) => /* @__PURE__ */ React.createElement(Card, { key: s.label, style: { background: s.bg } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: s.color, fontWeight: 600 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, fontWeight: 700, color: s.color, marginTop: 4 } }, s.value)))), pendingCount > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#92400E" } }, /* @__PURE__ */ React.createElement("strong", null, "C\u1EA7n x\u1EED l\xFD:"), " C\xF3 ", pendingCount, " y\xEAu c\u1EA7u \u0111ang ch\u1EDD ph\xEA duy\u1EC7t. H\xE3y xem x\xE9t s\u1EDBm \u0111\u1EC3 kh\xF4ng \u1EA3nh h\u01B0\u1EDFng tr\u1EA3i nghi\u1EC7m c\u1EE7a chuy\xEAn gia."), actionDone && /* @__PURE__ */ React.createElement("div", { style: { background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#065F46" } }, actionDone.type === "approved" ? "\u0110\xE3 ph\xEA duy\u1EC7t th\xE0nh c\xF4ng! Chuy\xEAn gia s\u1EBD nh\u1EADn th\xF4ng b\xE1o qua email." : "\u0110\xE3 t\u1EEB ch\u1ED1i y\xEAu c\u1EA7u."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 20 } }, ["all", "pending", "approved", "rejected"].map((f) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: f,
      onClick: () => setFilter(f),
      style: {
        height: 40,
        padding: "0 16px",
        borderRadius: 8,
        border: `1.5px solid ${filter === f ? "#2563EB" : "#E5E7EB"}`,
        background: filter === f ? "#DBEAFE" : "#fff",
        color: filter === f ? "#1D4ED8" : "#6B7280",
        fontSize: 13,
        fontWeight: filter === f ? 600 : 400,
        cursor: "pointer"
      }
    },
    f === "all" ? "T\u1EA5t c\u1EA3" : statusConfig[f].label,
    f === "pending" && pendingCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 6, background: "#EF4444", color: "#fff", borderRadius: 10, padding: "0 6px", fontSize: 11, fontWeight: 700 } }, pendingCount)
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, filtered.map((req) => {
    const sc = statusConfig[req.status];
    return /* @__PURE__ */ React.createElement(Card, { key: req.id }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 } }, req.name.split(" ").pop()?.charAt(0)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937" } }, req.name), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.color } }, sc.label)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#2563EB", marginTop: 3, fontWeight: 500 } }, req.degree, " \u2013 ", req.specialization), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 1 } }, req.university, " \xB7 ", req.experience, " n\u0103m kinh nghi\u1EC7m"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 4 } }, req.email, " \xB7 ", req.phone, " \xB7 M\xE3 ch\u1EE9ng ch\u1EC9: ", req.license), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9CA3AF", marginTop: 2 } }, "Ng\xE0y \u0111\u0103ng k\xFD: ", req.requestDate))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSelectedReq(req),
        style: { height: 38, padding: "0 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }
      },
      "Xem h\u1ED3 s\u01A1"
    ), req.status === "pending" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => updateStatus(req.id, "approved"),
        style: { height: 38, padding: "0 14px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }
      },
      "Ph\xEA duy\u1EC7t"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowRejectForm(showRejectForm === req.id ? null : req.id),
        style: { height: 38, padding: "0 14px", borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 13, fontWeight: 500, cursor: "pointer" }
      },
      "T\u1EEB ch\u1ED1i"
    )))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, fontSize: 13, color: "#6B7280", background: "#F9FAFB", borderRadius: 8, padding: "10px 14px" } }, req.bio), showRejectForm === req.id && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: 14, background: "#FEE2E2", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#991B1B", display: "block", marginBottom: 8 } }, "L\xFD do t\u1EEB ch\u1ED1i (t\xF9y ch\u1ECDn)"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: rejectReason,
        onChange: (e) => setRejectReason(e.target.value),
        placeholder: "Ghi l\xFD do t\u1EEB ch\u1ED1i \u0111\u1EC3 th\xF4ng b\xE1o cho \u1EE9ng vi\xEAn...",
        rows: 3,
        style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #FCA5A5", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", background: "#fff" }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => updateStatus(req.id, "rejected"),
        style: { height: 40, padding: "0 16px", borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }
      },
      "X\xE1c nh\u1EADn t\u1EEB ch\u1ED1i"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowRejectForm(null),
        style: { height: 40, padding: "0 16px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 13, cursor: "pointer" }
      },
      "H\u1EE7y"
    ))));
  }), filtered.length === 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "32px 0", color: "#9CA3AF", fontSize: 14 } }, "Kh\xF4ng c\xF3 y\xEAu c\u1EA7u n\xE0o trong danh s\xE1ch n\xE0y."))), selectedReq && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, "H\u1ED3 s\u01A1 chuy\xEAn gia"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedReq(null), style: { background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 } }, selectedReq.name.split(" ").pop()?.charAt(0)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, selectedReq.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#2563EB", fontWeight: 500 } }, selectedReq.degree), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: statusConfig[selectedReq.status].bg, color: statusConfig[selectedReq.status].color } }, statusConfig[selectedReq.status].label))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, [
    { label: "Chuy\xEAn ng\xE0nh", value: selectedReq.specialization },
    { label: "C\u01A1 s\u1EDF \u0111\xE0o t\u1EA1o", value: selectedReq.university },
    { label: "Kinh nghi\u1EC7m", value: `${selectedReq.experience} n\u0103m` },
    { label: "M\xE3 ch\u1EE9ng ch\u1EC9", value: selectedReq.license },
    { label: "Email", value: selectedReq.email },
    { label: "\u0110i\u1EC7n tho\u1EA1i", value: selectedReq.phone }
  ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label, style: { background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280" } }, r.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 } }, r.value)))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 8 } }, "Gi\u1EDBi thi\u1EC7u"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#6B7280", lineHeight: 1.6, background: "#F9FAFB", borderRadius: 8, padding: 12 } }, selectedReq.bio)), selectedReq.status === "pending" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateStatus(selectedReq.id, "approved"),
      style: { flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "Ph\xEA duy\u1EC7t"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSelectedReq(null);
        setShowRejectForm(selectedReq.id);
      },
      style: { flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }
    },
    "T\u1EEB ch\u1ED1i"
  )), selectedReq.status !== "pending" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedReq(null),
      style: { width: "100%", height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }
    },
    "\u0110\xF3ng"
  ))));
}
export {
  AdminExperts as default
};
