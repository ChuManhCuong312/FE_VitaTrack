import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useApp, UserRole } from "../../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email không hợp lệ";
    if (!password) errs.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 6) errs.password = "Mật khẩu tối thiểu 6 ký tự";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
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
        {/* Logo */}
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
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 8 }}>Đăng nhập</h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
            Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>

          {/* Demo role select */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
              Đăng nhập với vai trò (Demo)
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {([
                { value: "user", label: "Người dùng" },
                { value: "expert", label: "Chuyên gia" },
                { value: "admin", label: "Admin" },
              ] as const).map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSelectedRole(r.value)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    borderRadius: 8,
                    border: `1.5px solid ${selectedRole === r.value ? "#22C55E" : "#E5E7EB"}`,
                    background: selectedRole === r.value ? "#DCFCE7" : "#fff",
                    color: selectedRole === r.value ? "#16A34A" : "#374151",
                    fontSize: 13,
                    fontWeight: selectedRole === r.value ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="email@example.com"
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: `1px solid ${errors.email ? "#EF4444" : "#E5E7EB"}`,
                  fontSize: 14,
                  color: "#1F2937",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: `1px solid ${errors.password ? "#EF4444" : "#E5E7EB"}`,
                  fontSize: 14,
                  color: "#1F2937",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.password && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.password}</p>}
            </div>

            <div style={{ textAlign: "right", marginBottom: 20 }}>
              <a href="#" style={{ fontSize: 13, color: "#2563EB", textDecoration: "none" }}>
                Quên mật khẩu?
              </a>
            </div>

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
                transition: "background 0.2s",
                marginBottom: 12,
              }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
              <span style={{ fontSize: 16 }}>G</span>
              Đăng nhập bằng Google
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280", marginTop: 20 }}>
            Chưa có tài khoản?{" "}
            <Link to="/register" style={{ color: "#22C55E", fontWeight: 600, textDecoration: "none" }}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
