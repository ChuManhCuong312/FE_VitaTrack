import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, color = "#22C55E" }: { checked: boolean; onChange: () => void; color?: string }) {
  return (
    <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? color : "#D1D5DB", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

export default function AdminSettings() {
  const { currentUser } = useApp();
  const [saved, setSaved] = useState("");

  const [profile, setProfile] = useState({
    name: currentUser?.name || "Admin Hệ Thống",
    email: currentUser?.email || "admin@healthapp.vn",
    phone: "0800123456",
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxUsersPerExpert: "15",
    sessionTimeout: "60",
    defaultCalorieBudget: "2000",
    autoApproveExperts: false,
    enableAIFeatures: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    forcePasswordReset: false,
    ipWhitelist: "",
    minPasswordLength: "8",
    maxLoginAttempts: "5",
    accountLockDuration: "30",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newUserRegistration: true,
    expertRequest: true,
    systemAlert: true,
    weeklyReport: true,
    userReport: false,
  });

  const [auditLog] = useState([
    { id: 1, action: "Phê duyệt chuyên gia BS. Lê Thị Tuyết", admin: "Admin Hệ Thống", time: "3 giờ trước", type: "approve" },
    { id: 2, action: "Khóa tài khoản Phạm Văn Tùng", admin: "Admin Hệ Thống", time: "1 ngày trước", type: "lock" },
    { id: 3, action: "Import 12 thực phẩm mới vào database", admin: "Admin Hệ Thống", time: "2 ngày trước", type: "food" },
    { id: 4, action: "Cập nhật cài đặt hệ thống", admin: "Admin Hệ Thống", time: "3 ngày trước", type: "settings" },
    { id: 5, action: "Tạo tài khoản admin mới", admin: "Super Admin", time: "1 tuần trước", type: "admin" },
  ]);

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Cài đặt hệ thống</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Quản lý cấu hình toàn hệ thống VitaTrack.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        {/* Admin profile */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông tin quản trị viên</h2>
          {saved === "profile" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Thông tin đã được cập nhật!
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            {[
              { key: "name", label: "Họ và tên", type: "text" },
              { key: "email", label: "Email quản trị", type: "email" },
              { key: "phone", label: "Số điện thoại", type: "tel" },
            ].map(({ key, label, type }) => (
              <div key={key} style={{ gridColumn: key === "phone" ? "span 2" : "span 1" }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input type={type} value={(profile as any)[key]} onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("profile")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu thông tin
          </button>
        </Card>

        {/* System settings */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Cấu hình nền tảng</h2>
          {saved === "system" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Cấu hình hệ thống đã được lưu!
            </div>
          )}

          {/* Toggle settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[
              { key: "maintenanceMode", label: "Chế độ bảo trì", desc: "Tắt quyền truy cập người dùng trong khi nâng cấp hệ thống", danger: true },
              { key: "allowRegistration", label: "Cho phép đăng ký mới", desc: "Cho phép người dùng mới tạo tài khoản" },
              { key: "requireEmailVerification", label: "Xác minh email bắt buộc", desc: "Yêu cầu xác minh email trước khi sử dụng" },
              { key: "autoApproveExperts", label: "Tự động phê duyệt chuyên gia", desc: "Không khuyến khích – bỏ qua kiểm duyệt thủ công", danger: true },
              { key: "enableAIFeatures", label: "Kích hoạt tính năng AI", desc: "Trợ lý ảo và phân tích sức khỏe tự động" },
            ].map(({ key, label, desc, danger }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: danger ? "#EF4444" : "#1F2937" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{desc}</div>
                </div>
                <Toggle
                  checked={(systemSettings as any)[key]}
                  onChange={() => setSystemSettings((p) => ({ ...p, [key]: !(p as any)[key] }))}
                  color={danger ? "#EF4444" : "#22C55E"}
                />
              </div>
            ))}
          </div>

          {/* Numeric settings */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
            {[
              { key: "maxUsersPerExpert", label: "Người dùng tối đa/chuyên gia", unit: "người" },
              { key: "sessionTimeout", label: "Thời gian hết phiên", unit: "phút" },
              { key: "defaultCalorieBudget", label: "Ngân sách calo mặc định", unit: "kcal" },
            ].map(({ key, label, unit }) => (
              <div key={key}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="number" value={(systemSettings as any)[key]} onChange={(e) => setSystemSettings((p) => ({ ...p, [key]: e.target.value }))}
                    style={{ flex: 1, height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }} />
                  <span style={{ fontSize: 13, color: "#9CA3AF", whiteSpace: "nowrap" }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => handleSave("system")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu cấu hình
          </button>
        </Card>

        {/* Security settings */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Bảo mật hệ thống</h2>
          {saved === "security" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Cài đặt bảo mật đã được lưu!
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[
              { key: "twoFactorAuth", label: "Xác thực hai yếu tố (2FA)", desc: "Yêu cầu 2FA cho tài khoản admin" },
              { key: "forcePasswordReset", label: "Buộc đổi mật khẩu định kỳ", desc: "Yêu cầu đổi mật khẩu mỗi 90 ngày" },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{desc}</div>
                </div>
                <Toggle checked={(securitySettings as any)[key]} onChange={() => setSecuritySettings((p) => ({ ...p, [key]: !(p as any)[key] }))} color="#2563EB" />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
            {[
              { key: "minPasswordLength", label: "Độ dài mật khẩu tối thiểu", unit: "ký tự" },
              { key: "maxLoginAttempts", label: "Số lần đăng nhập sai tối đa", unit: "lần" },
              { key: "accountLockDuration", label: "Thời gian khóa tài khoản", unit: "phút" },
            ].map(({ key, label, unit }) => (
              <div key={key}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="number" value={(securitySettings as any)[key]} onChange={(e) => setSecuritySettings((p) => ({ ...p, [key]: e.target.value }))}
                    style={{ flex: 1, height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }} />
                  <span style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Danh sách IP được phép (mỗi IP một dòng)</label>
            <textarea
              value={securitySettings.ipWhitelist}
              onChange={(e) => setSecuritySettings((p) => ({ ...p, ipWhitelist: e.target.value }))}
              placeholder="Để trống để cho phép tất cả IP&#10;VD: 192.168.1.1&#10;10.0.0.0/24"
              rows={3}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" as const, fontFamily: "monospace" }}
            />
          </div>

          <button onClick={() => handleSave("security")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu cài đặt bảo mật
          </button>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông báo quản trị</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "newUserRegistration", label: "Người dùng mới đăng ký", desc: "Thông báo khi có người dùng mới tạo tài khoản" },
              { key: "expertRequest", label: "Yêu cầu phê duyệt chuyên gia", desc: "Thông báo ngay khi có hồ sơ chuyên gia mới" },
              { key: "systemAlert", label: "Cảnh báo hệ thống", desc: "Thông báo khi có sự cố hoặc lỗi hệ thống" },
              { key: "weeklyReport", label: "Báo cáo tuần", desc: "Tổng kết hoạt động hệ thống mỗi tuần" },
              { key: "userReport", label: "Báo cáo vi phạm từ người dùng", desc: "Thông báo khi nhận được phản ánh vi phạm" },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{desc}</div>
                </div>
                <Toggle checked={(notificationSettings as any)[key]} onChange={() => setNotificationSettings((p) => ({ ...p, [key]: !(p as any)[key] }))} color="#F59E0B" />
              </div>
            ))}
          </div>
        </Card>

        {/* Password */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Đổi mật khẩu quản trị</h2>
          {saved === "password" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Mật khẩu đã được cập nhật!
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
            {["Mật khẩu hiện tại", "Mật khẩu mới", "Xác nhận mật khẩu mới"].map((label) => (
              <div key={label}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input type="password" placeholder="••••••••"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("password")}
            style={{ marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Đổi mật khẩu
          </button>
        </Card>

        {/* Audit log */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Nhật ký hoạt động quản trị</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {auditLog.map((log, i) => (
              <div key={log.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < auditLog.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: log.type === "approve" ? "#22C55E" : log.type === "lock" ? "#EF4444" : log.type === "food" ? "#F59E0B" : "#2563EB" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: "#1F2937" }}>{log.action}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Bởi: {log.admin}</div>
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>{log.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
