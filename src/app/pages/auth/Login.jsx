import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useApp } from "../../context/AppContext";
function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Vui l\xF2ng nh\u1EADp email";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email kh\xF4ng h\u1EE3p l\u1EC7";
    if (!password) errs.password = "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u";
    else if (password.length < 6) errs.password = "M\u1EADt kh\u1EA9u t\u1ED1i thi\u1EC3u 6 k\xFD t\u1EF1";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      login(email, password, selectedRole);
      navigate(
        selectedRole === "admin" ? "/admin" : selectedRole === "expert" ? "/expert" : "/dashboard"
      );
      setLoading(false);
    }, 800);
  };
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
      /* @__PURE__ */ React.createElement("h1", { style: { fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 8 } }, "\u0110\u0103ng nh\u1EADp"),
      /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "#6B7280", marginBottom: 24 } }, "Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i! Vui l\xF2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 ti\u1EBFp t\u1EE5c."),
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 } }, "\u0110\u0103ng nh\u1EADp v\u1EDBi vai tr\xF2 (Demo)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [
        { value: "user", label: "Ng\u01B0\u1EDDi d\xF9ng" },
        { value: "expert", label: "Chuy\xEAn gia" },
        { value: "admin", label: "Admin" }
      ].map((r) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: r.value,
          type: "button",
          onClick: () => setSelectedRole(r.value),
          style: {
            flex: 1,
            padding: "8px 4px",
            borderRadius: 8,
            border: `1.5px solid ${selectedRole === r.value ? "#22C55E" : "#E5E7EB"}`,
            background: selectedRole === r.value ? "#DCFCE7" : "#fff",
            color: selectedRole === r.value ? "#16A34A" : "#374151",
            fontSize: 13,
            fontWeight: selectedRole === r.value ? 600 : 400,
            cursor: "pointer"
          }
        },
        r.label
      )))),
      /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "Email"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "email",
          value: email,
          onChange: (e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: void 0 }));
          },
          placeholder: "email@example.com",
          style: {
            width: "100%",
            height: 44,
            padding: "0 12px",
            borderRadius: 8,
            border: `1px solid ${errors.email ? "#EF4444" : "#E5E7EB"}`,
            fontSize: 14,
            color: "#1F2937",
            outline: "none",
            boxSizing: "border-box"
          }
        }
      ), errors.email && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 } }, errors.email)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 } }, "M\u1EADt kh\u1EA9u"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "password",
          value: password,
          onChange: (e) => {
            setPassword(e.target.value);
            setErrors((p) => ({ ...p, password: void 0 }));
          },
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          style: {
            width: "100%",
            height: 44,
            padding: "0 12px",
            borderRadius: 8,
            border: `1px solid ${errors.password ? "#EF4444" : "#E5E7EB"}`,
            fontSize: 14,
            color: "#1F2937",
            outline: "none",
            boxSizing: "border-box"
          }
        }
      ), errors.password && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#EF4444", marginTop: 4 } }, errors.password)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("a", { href: "#", style: { fontSize: 13, color: "#2563EB", textDecoration: "none" } }, "Qu\xEAn m\u1EADt kh\u1EA9u?")), /* @__PURE__ */ React.createElement(
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
            transition: "background 0.2s",
            marginBottom: 12
          }
        },
        loading ? "\u0110ang \u0111\u0103ng nh\u1EADp..." : "\u0110\u0103ng nh\u1EADp"
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
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "G"),
        "\u0110\u0103ng nh\u1EADp b\u1EB1ng Google"
      )),
      /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 20 } }, "Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n?", " ", /* @__PURE__ */ React.createElement(Link, { to: "/register", style: { color: "#22C55E", fontWeight: 600, textDecoration: "none" } }, "\u0110\u0103ng k\xFD ngay"))
    ))
  );
}
export {
  Login as default
};
