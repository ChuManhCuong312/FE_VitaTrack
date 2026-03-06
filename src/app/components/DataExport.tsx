// Data Export Component - Version 2
// Export health data to CSV, JSON, or print-friendly format
import React from "react";

interface Props {
  userId: string;
  onClose: () => void;
}

export function DataExport({ userId, onClose }: Props) {
  const [exportFormat, setExportFormat] = React.useState<"csv" | "json" | "print">("csv");
  const [dateRange, setDateRange] = React.useState<"7days" | "30days" | "all">("30days");
  const [includeMetrics, setIncludeMetrics] = React.useState(true);
  const [includeFoods, setIncludeFoods] = React.useState(true);
  const [includeExercises, setIncludeExercises] = React.useState(true);

  const handleExport = () => {
    const data = collectData();
    
    if (exportFormat === "csv") {
      downloadCSV(data);
    } else if (exportFormat === "json") {
      downloadJSON(data);
    } else {
      printData(data);
    }
  };

  const collectData = () => {
    // Collect data from localStorage based on selections
    const allData: any = {};

    if (includeMetrics) {
      const metrics = localStorage.getItem("vitatrack_health_metrics");
      if (metrics) {
        allData.healthMetrics = JSON.parse(metrics).filter((m: any) => m.userId === userId);
      }
    }

    if (includeFoods) {
      const foods = localStorage.getItem("vitatrack_food_entries");
      if (foods) {
        allData.foodEntries = JSON.parse(foods).filter((f: any) => f.userId === userId);
      }
    }

    if (includeExercises) {
      const exercises = localStorage.getItem("vitatrack_exercise_entries");
      if (exercises) {
        allData.exerciseEntries = JSON.parse(exercises).filter((e: any) => e.userId === userId);
      }
    }

    // Filter by date range
    if (dateRange !== "all") {
      const days = dateRange === "7days" ? 7 : 30;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      const cutoffStr = cutoffDate.toISOString().split("T")[0];

      Object.keys(allData).forEach(key => {
        allData[key] = allData[key].filter((item: any) => item.date >= cutoffStr);
      });
    }

    return allData;
  };

  const downloadCSV = (data: any) => {
    let csv = "";

    // Health Metrics CSV
    if (data.healthMetrics?.length > 0) {
      csv += "=== CHỈ SỐ SỨC KHỎE ===\n";
      csv += "Ngày,Cân nặng (kg),Chiều cao (cm),BMI,Calories,Bước chân,Nước (L),Giấc ngủ (h)\n";
      data.healthMetrics.forEach((m: any) => {
        csv += `${m.date},${m.weight},${m.height},${m.bmi},${m.calories},${m.steps},${m.water},${m.sleep}\n`;
      });
      csv += "\n";
    }

    // Food Entries CSV
    if (data.foodEntries?.length > 0) {
      csv += "=== NHẬT KÝ ĂN UỐNG ===\n";
      csv += "Ngày,Giờ,Bữa,Món ăn,Calories,Protein (g),Carbs (g),Fat (g)\n";
      data.foodEntries.forEach((f: any) => {
        csv += `${f.date},${f.time},${f.mealType},${f.foodName},${f.calories},${f.protein},${f.carbs},${f.fat}\n`;
      });
      csv += "\n";
    }

    // Exercise Entries CSV
    if (data.exerciseEntries?.length > 0) {
      csv += "=== LỊCH TẬP LUYỆN ===\n";
      csv += "Ngày,Giờ,Loại,Thời lượng (phút),Calories đốt,Cường độ\n";
      data.exerciseEntries.forEach((e: any) => {
        csv += `${e.date},${e.time},${e.type},${e.duration},${e.caloriesBurned},${e.intensity}\n`;
      });
    }

    // Download
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `VitaTrack_Export_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const downloadJSON = (data: any) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `VitaTrack_Export_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const printData = (data: any) => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>VitaTrack - Báo cáo sức khỏe</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #22C55E; border-bottom: 3px solid #22C55E; padding-bottom: 10px; }
          h2 { color: #2563EB; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #E5E7EB; padding: 8px; text-align: left; font-size: 12px; }
          th { background: #F3F4F6; font-weight: 600; }
          .meta { color: #6B7280; font-size: 14px; margin: 20px 0; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>VitaTrack - Báo cáo sức khỏe</h1>
        <div class="meta">
          <div>Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}</div>
          <div>Khoảng thời gian: ${dateRange === "7days" ? "7 ngày qua" : dateRange === "30days" ? "30 ngày qua" : "Tất cả"}</div>
        </div>
    `;

    // Health Metrics Table
    if (data.healthMetrics?.length > 0) {
      html += `
        <h2>Chỉ số sức khỏe</h2>
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Cân nặng (kg)</th>
              <th>BMI</th>
              <th>Calories</th>
              <th>Bước chân</th>
              <th>Nước (L)</th>
              <th>Giấc ngủ (h)</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.healthMetrics.forEach((m: any) => {
        html += `
          <tr>
            <td>${new Date(m.date).toLocaleDateString("vi-VN")}</td>
            <td>${m.weight.toFixed(1)}</td>
            <td>${m.bmi.toFixed(1)}</td>
            <td>${Math.round(m.calories)}</td>
            <td>${m.steps.toLocaleString("vi-VN")}</td>
            <td>${m.water.toFixed(1)}</td>
            <td>${m.sleep.toFixed(1)}</td>
          </tr>
        `;
      });
      html += "</tbody></table>";
    }

    // Food Entries Table
    if (data.foodEntries?.length > 0) {
      html += `
        <h2>Nhật ký ăn uống</h2>
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Bữa</th>
              <th>Món ăn</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fat (g)</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.foodEntries.forEach((f: any) => {
        html += `
          <tr>
            <td>${new Date(f.date).toLocaleDateString("vi-VN")}</td>
            <td>${f.mealType}</td>
            <td>${f.foodName}</td>
            <td>${Math.round(f.calories)}</td>
            <td>${f.protein.toFixed(1)}</td>
            <td>${f.carbs.toFixed(1)}</td>
            <td>${f.fat.toFixed(1)}</td>
          </tr>
        `;
      });
      html += "</tbody></table>";
    }

    html += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 12px;">
          <p>VitaTrack - Quản lý sức khỏe và dinh dưỡng</p>
          <p>© ${new Date().getFullYear()} - vitatrack.vn</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 500,
          width: "100%",
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
          Xuất dữ liệu
        </h2>

        {/* Export Format */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Định dạng
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { value: "csv", label: "CSV (Excel)" },
              { value: "json", label: "JSON" },
              { value: "print", label: "In PDF" },
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value as any)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: exportFormat === format.value ? "2px solid #22C55E" : "1px solid #E5E7EB",
                  borderRadius: 8,
                  background: exportFormat === format.value ? "#F0FDF4" : "#fff",
                  color: exportFormat === format.value ? "#22C55E" : "#6B7280",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Khoảng thời gian
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="all">Tất cả dữ liệu</option>
          </select>
        </div>

        {/* Data Types */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Loại dữ liệu
          </label>
          {[
            { key: includeMetrics, setter: setIncludeMetrics, label: "Chỉ số sức khỏe" },
            { key: includeFoods, setter: setIncludeFoods, label: "Nhật ký ăn uống" },
            { key: includeExercises, setter: setIncludeExercises, label: "Lịch tập luyện" },
          ].map((item, idx) => (
            <label
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={item.key}
                onChange={(e) => item.setter(e.target.checked)}
                style={{ marginRight: 10, width: 18, height: 18 }}
              />
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #E5E7EB",
              borderRadius: 12,
              background: "#fff",
              color: "#6B7280",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleExport}
            disabled={!includeMetrics && !includeFoods && !includeExercises}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: 12,
              background: includeMetrics || includeFoods || includeExercises ? "#22C55E" : "#E5E7EB",
              color: includeMetrics || includeFoods || includeExercises ? "#fff" : "#9CA3AF",
              fontSize: 14,
              fontWeight: 600,
              cursor: includeMetrics || includeFoods || includeExercises ? "pointer" : "not-allowed",
            }}
          >
            Xuất dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
}
