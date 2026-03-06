import React, { useState } from "react";
import { DataExport } from "../../components/DataExport";
import { useApp } from "../../context/AppContext";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#22C55E" : "#D1D5DB",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

export default function Settings() {
  const { currentUser } = useApp();
  const userId = currentUser?.email || "demo-user";
  const [showExport, setShowExport] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    language: "vi",
  });
  const [allergies, setAllergies] = useState(["Gluten", "Đậu phộng"]);
  const [newAllergy, setNewAllergy] = useState("");
  const [notifications, setNotifications] = useState({
    mealReminder: true,
    exerciseReminder: true,
    weeklyReport: true,
    expertMessage: true,
    calorieAlert: true,
  });
  const [privacy, setPrivacy] = useState({
    shareDataWithExpert: true,
    anonymousAnalytics: false,
  });
  const [saved, setSaved] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies((p) => [...p, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const removeAllergy = (a: string) => setAllergies((p) => p.filter((x) => x !== a));

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Cài đặt</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Quản lý thông tin tài khoản và tùy chỉnh ứng dụng.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
        {/* Profile */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông tin tài khoản</h2>
          {saved === "profile" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Thông tin đã được cập nhật!
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { key: "name", label: "Họ và tên", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Số điện thoại", type: "tel" },
            ].map(({ key, label, type }) => (
              <div key={key} style={{ gridColumn: key === "phone" ? "span 2" : "span 1" }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  value={(profile as any)[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, color: "#1F2937", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSave("profile")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Lưu thay đổi
          </button>
        </Card>

        {/* Password */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Đổi mật khẩu</h2>
          {saved === "password" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Mật khẩu đã được cập nhật!
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
            {[
              { label: "Mật khẩu hiện tại" },
              { label: "Mật khẩu mới" },
              { label: "Xác nhận mật khẩu mới" },
            ].map(({ label }) => (
              <div key={label}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSave("password")}
            style={{ marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Đổi mật khẩu
          </button>
        </Card>

        {/* Allergies */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 8 }}>Dị ứng thực phẩm</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Hệ thống sẽ cảnh báo khi bạn ghi nhận thực phẩm chứa chất dị ứng.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {allergies.map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 16, background: "#FEE2E2", border: "1px solid #FCA5A5" }}>
                <span style={{ fontSize: 13, color: "#EF4444", fontWeight: 500 }}>{a}</span>
                <button onClick={() => removeAllergy(a)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 14, padding: 0, lineHeight: 1 }}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAllergy()}
              placeholder="Thêm chất dị ứng mới..."
              style={{ flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
            />
            <button onClick={addAllergy} style={{ height: 40, padding: "0 16px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Thêm
            </button>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông báo</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "mealReminder", label: "Nhắc nhở ghi nhận bữa ăn", desc: "Nhắc 3 lần/ngày vào giờ ăn" },
              { key: "exerciseReminder", label: "Nhắc nhở vận động", desc: "Nhắc khi chưa đạt mục tiêu bước chân" },
              { key: "weeklyReport", label: "Báo cáo tuần", desc: "Tổng kết sức khỏe mỗi Chủ nhật" },
              { key: "expertMessage", label: "Tin nhắn từ chuyên gia", desc: "Thông báo ngay khi có phản hồi" },
              { key: "calorieAlert", label: "Cảnh báo vượt calo", desc: "Cảnh báo khi nạp >120% ngân sách" },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{desc}</div>
                </div>
                <Toggle checked={(notifications as any)[key]} onChange={() => setNotifications((p) => ({ ...p, [key]: !(p as any)[key] }))} />
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Quyền riêng tư</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "shareDataWithExpert", label: "Chia sẻ dữ liệu với chuyên gia", desc: "Cho phép chuyên gia xem lịch sử dinh dưỡng" },
              { key: "anonymousAnalytics", label: "Phân tích ẩn danh", desc: "Giúp cải thiện hệ thống (không lưu thông tin cá nhân)" },
            ].map(({ key, label, desc }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{desc}</div>
                </div>
                <Toggle checked={(privacy as any)[key]} onChange={() => setPrivacy((p) => ({ ...p, [key]: !(p as any)[key] }))} />
              </div>
            ))}
          </div>
        </Card>

        {/* Danger zone */}
        <Card style={{ borderLeft: "4px solid #EF4444" }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#EF4444", marginBottom: 8 }}>Vùng nguy hiểm</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Các hành động này không thể hoàn tác. Hãy cân nhắc kỹ trước khi thực hiện.</p>
          
          {/* Export Data Button */}
          <button
            onClick={() => setShowExport(true)}
            style={{
              height: 44,
              padding: "0 20px",
              borderRadius: 8,
              border: "1.5px solid #2563EB",
              background: "transparent",
              color: "#2563EB",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 12,
            }}
          >
            📊 Xuất dữ liệu
          </button>

          {showDeleteConfirm ? (
            <div style={{ background: "#FEE2E2", borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 14, color: "#991B1B", marginBottom: 12 }}>Bạn có chắc chắn muốn xóa tài khoản? Tất cả dữ liệu sẽ bị mất vĩnh viễn.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, height: 40, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                  Hủy bỏ
                </button>
                <button style={{ flex: 1, height: 40, borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Xác nhận xóa
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Xóa tài khoản
            </button>
          )}
        </Card>
      </div>

      {/* Export Modal */}
      {showExport && <DataExport userId={userId} onClose={() => setShowExport(false)} />}
    </div>
  );
}