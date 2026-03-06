import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useApp } from "../../context/AppContext";
function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const update = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn";
    if (!form.email) errs.email = "Vui l\xF2ng nh\u1EADp email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email kh\xF4ng h\u1EE3p l\u1EC7";
    if (!form.password) errs.password = "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u";
    else if (form.password.length < 6) errs.password = "M\u1EADt kh\u1EA9u t\u1ED1i thi\u1EC3u 6 k\xFD t\u1EF1";
    if (!form.confirm) errs.confirm = "Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u";
    else if (form.confirm !== form.password) errs.confirm = "M\u1EADt kh\u1EA9u x\xE1c nh\u1EADn kh\xF4ng kh\u1EDBp";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.password, "user");
      navigate("/dashboard");
    }, 800);
  };
  const inputStyle = (field) => ({
    width: "100%",
    height: 44,
    padding: "0 12px",
    borderRadius: 8,
    border: `1px solid ${errors[field] ? "#EF4444" : "#E5E7EB"}`,
    fontSize: 14,
    color: "#1F2937",
    outline: "none",
    boxSizing: "border-box"
  });
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "#F9FAFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        padding: 16
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 440 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 700, color: "#22C55E", letterSpacing: "-1px" } }, "VitaTrack"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280", marginTop: 4 } }, "Qu\u1EA3n l\xFD s\u1EE9c kh\u1ECFe & dinh d\u01B0\u1EE1ng")), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: "#FFFFFF",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)"
        }
      },
      /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 8 } }, "T\u1EA1o t\xE0i kho\u1EA3n"),
      /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280", marginBottom: 24 } }, "B\u1EAFt \u0111\u1EA7u h\xE0nh tr\xECnh s\u1EE9c kh\u1ECFe c\u1EE7a b\u1EA1n ngay h\xF4m nay."),
      /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, [
        { field: "name", label: "H\u1ECD v\xE0 t\xEAn", type: "text", placeholder: "Nguy\u1EC5n V\u0103n An" },
        { field: "email", label: "Email", type: "email", placeholder: "email@example.com" },
        { field: "password", label: "M\u1EADt kh\u1EA9u", type: "password", placeholder: "T\u1ED1i thi\u1EC3u 6 k\xFD t\u1EF1" },
        { field: "confirm", label: "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u", type: "password", placeholder: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u" }
      ].map(({ field, label, type, placeholder }) => /* @__PURE__ */ React.createElement("div", { key: field, style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
        "input",
        {
          type,
          value: form[field],
          onChange: (e) => update(field, e.target.value),
          placeholder,
          style: inputStyle(field)
        }
      ), errors[field] && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 } }, errors[field]))), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "submit",
          disabled: loading,
          style: {
            width: "100%",
            height: 44,
            borderRadius: 8,
            border: "none",
            background: loading ? "#86EFAC" : "#22C55E",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 12,
            marginTop: 4
          }
        },
        loading ? "\u0110ang t\u1EA1o t\xE0i kho\u1EA3n..." : "\u0110\u0103ng k\xFD"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          style: {
            width: "100%",
            height: 44,
            borderRadius: 8,
            border: "1.5px solid #E5E7EB",
            background: "#fff",
            color: "#374151",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, fontWeight: 700 } }, "G"),
        "\u0110\u0103ng k\xFD b\u1EB1ng Google"
      )),
      /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 20 } }, "\u0110\xE3 c\xF3 t\xE0i kho\u1EA3n?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/login", style: { color: "#22C55E", fontWeight: 600, textDecoration: "none" } }, "\u0110\u0103ng nh\u1EADp"))
    ))
  );
}
export {
  Register as default
};
