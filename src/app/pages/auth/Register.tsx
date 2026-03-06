import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useApp } from "../../context/AppContext";

export default function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: string, val: string) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập họ tên";
    if (!form.email) errs.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ";
    if (!form.password) errs.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 6) errs.password = "Mật khẩu tối thiểu 6 ký tự";
    if (!form.confirm) errs.confirm = "Vui lòng xác nhận mật khẩu";
    else if (form.confirm !== form.password) errs.confirm = "Mật khẩu xác nhận không khớp";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.password, "user");
      navigate("/dashboard");
    }, 800);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    height: 44,
    padding: "0 12px",
    borderRadius: 8,
    border: `1px solid ${errors[field] ? "#EF4444" : "#E5E7EB"}`,
    fontSize: 14,
    color: "#1F2937",
    outline: "none",
    boxSizing: "border-box" as const,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E", letterSpacing: "-1px" }}>VitaTrack</div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>Quản lý sức khỏe & dinh dưỡng</div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: 32,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 8 }}>Tạo tài khoản</h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
            Bắt đầu hành trình sức khỏe của bạn ngay hôm nay.
          </p>

          <form onSubmit={handleSubmit}>
            {[
              { field: "name", label: "Họ và tên", type: "text", placeholder: "Nguyễn Văn An" },
              { field: "email", label: "Email", type: "email", placeholder: "email@example.com" },
              { field: "password", label: "Mật khẩu", type: "password", placeholder: "Tối thiểu 6 ký tự" },
              { field: "confirm", label: "Xác nhận mật khẩu", type: "password", placeholder: "Nhập lại mật khẩu" },
            ].map(({ field, label, type, placeholder }) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={(form as any)[field]}
                  onChange={(e) => update(field, e.target.value)}
                  placeholder={placeholder}
                  style={inputStyle(field)}
                />
                {errors[field] && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors[field]}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
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
                marginTop: 4,
              }}
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>

            <button
              type="button"
              style={{
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
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700 }}>G</span>
              Đăng ký bằng Google
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 20 }}>
            Đã có tài khoản?{" "}
            <Link to="/login" style={{ color: "#22C55E", fontWeight: 600, textDecoration: "none" }}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
