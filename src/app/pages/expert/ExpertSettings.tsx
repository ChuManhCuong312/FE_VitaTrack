import React, { useState } from "react";
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
    <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? "#2563EB" : "#D1D5DB", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

export default function ExpertSettings() {
  const { currentUser } = useApp();
  const [saved, setSaved] = useState("");

  const [profile, setProfile] = useState({
    name: currentUser?.name || "ThS. Trần Thị Bích",
    email: currentUser?.email || "bich.tran@expert.com",
    phone: "0901234567",
    title: "Thạc sĩ Dinh dưỡng học",
    specialization: "Dinh dưỡng lâm sàng & Thể thao",
    experience: "8",
    university: "Đại học Y Hà Nội",
    license: "DV-2018-0421",
  });

  const [bio, setBio] = useState(
    "Chuyên gia dinh dưỡng với hơn 8 năm kinh nghiệm trong lĩnh vực dinh dưỡng lâm sàng và tư vấn sức khỏe. Tốt nghiệp Thạc sĩ Dinh dưỡng học tại Đại học Y Hà Nội."
  );

  const [workingHours, setWorkingHours] = useState({
    startTime: "08:00",
    endTime: "17:00",
    workDays: ["T2", "T3", "T4", "T5", "T6"],
    maxUsersPerDay: "10",
  });

  const [notifications, setNotifications] = useState({
    newUserAssigned: true,
    userAlert: true,
    weeklyReport: true,
    userMessage: true,
    systemUpdate: false,
  });

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  };

  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const toggleWorkDay = (day: string) => {
    setWorkingHours((p) => ({
      ...p,
      workDays: p.workDays.includes(day)
        ? p.workDays.filter((d) => d !== day)
        : [...p.workDays, day],
    }));
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Cài đặt chuyên gia</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Quản lý hồ sơ chuyên môn và cấu hình hoạt động tư vấn.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
        {/* Profile */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông tin tài khoản</h2>
          {saved === "profile" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Thông tin tài khoản đã được cập nhật!
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            {[
              { key: "name", label: "Họ và tên", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Số điện thoại", type: "tel" },
              { key: "license", label: "Số chứng chỉ hành nghề", type: "text" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  value={(profile as any)[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("profile")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu thông tin
          </button>
        </Card>

        {/* Professional info */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông tin chuyên môn</h2>
          {saved === "professional" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Thông tin chuyên môn đã được cập nhật!
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {[
              { key: "title", label: "Học vị / Danh hiệu", type: "text" },
              { key: "specialization", label: "Chuyên ngành", type: "text" },
              { key: "university", label: "Cơ sở đào tạo", type: "text" },
              { key: "experience", label: "Số năm kinh nghiệm", type: "number" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  value={(profile as any)[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Giới thiệu bản thân</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" as const }}
            />
          </div>
          <button onClick={() => handleSave("professional")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu thông tin chuyên môn
          </button>
        </Card>

        {/* Working hours */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Lịch làm việc & Tư vấn</h2>
          {saved === "schedule" && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Lịch làm việc đã được cập nhật!
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 8 }}>Ngày làm việc</label>
            <div style={{ display: "flex", gap: 8 }}>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleWorkDay(day)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${workingHours.workDays.includes(day) ? "#2563EB" : "#E5E7EB"}`,
                    background: workingHours.workDays.includes(day) ? "#DBEAFE" : "#fff",
                    color: workingHours.workDays.includes(day) ? "#1D4ED8" : "#6B7280",
                    fontSize: 13,
                    fontWeight: workingHours.workDays.includes(day) ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Giờ bắt đầu</label>
              <input type="time" value={workingHours.startTime} onChange={(e) => setWorkingHours((p) => ({ ...p, startTime: e.target.value }))}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Giờ kết thúc</label>
              <input type="time" value={workingHours.endTime} onChange={(e) => setWorkingHours((p) => ({ ...p, endTime: e.target.value }))}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Số người dùng tối đa/ngày</label>
              <input type="number" value={workingHours.maxUsersPerDay} onChange={(e) => setWorkingHours((p) => ({ ...p, maxUsersPerDay: e.target.value }))}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
            </div>
          </div>
          <button onClick={() => handleSave("schedule")}
            style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Lưu lịch làm việc
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
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
            {["Mật khẩu hiện tại", "Mật khẩu mới", "Xác nhận mật khẩu mới"].map((label) => (
              <div key={label}>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                <input type="password" placeholder="••••••••"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("password")} style={{ marginTop: 16, height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Đổi mật khẩu
          </button>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Thông báo</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "newUserAssigned", label: "Người dùng mới được gán", desc: "Thông báo khi có người dùng mới được phân công" },
              { key: "userAlert", label: "Cảnh báo rủi ro người dùng", desc: "Thông báo ngay khi người dùng vượt ngưỡng an toàn" },
              { key: "weeklyReport", label: "Báo cáo tổng kết tuần", desc: "Tổng kết hoạt động tư vấn mỗi Chủ nhật" },
              { key: "userMessage", label: "Tin nhắn từ người dùng", desc: "Thông báo ngay khi nhận được tin nhắn" },
              { key: "systemUpdate", label: "Cập nhật hệ thống", desc: "Thông báo về tính năng và cập nhật mới" },
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
      </div>
    </div>
  );
}
