import React from "react";
function DataExport({ userId, onClose }) {
  const [exportFormat, setExportFormat] = React.useState("csv");
  const [dateRange, setDateRange] = React.useState("30days");
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
    const allData = {};
    if (includeMetrics) {
      const metrics = localStorage.getItem("vitatrack_health_metrics");
      if (metrics) {
        allData.healthMetrics = JSON.parse(metrics).filter((m) => m.userId === userId);
      }
    }
    if (includeFoods) {
      const foods = localStorage.getItem("vitatrack_food_entries");
      if (foods) {
        allData.foodEntries = JSON.parse(foods).filter((f) => f.userId === userId);
      }
    }
    if (includeExercises) {
      const exercises = localStorage.getItem("vitatrack_exercise_entries");
      if (exercises) {
        allData.exerciseEntries = JSON.parse(exercises).filter((e) => e.userId === userId);
      }
    }
    if (dateRange !== "all") {
      const days = dateRange === "7days" ? 7 : 30;
      const cutoffDate = /* @__PURE__ */ new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      const cutoffStr = cutoffDate.toISOString().split("T")[0];
      Object.keys(allData).forEach((key) => {
        allData[key] = allData[key].filter((item) => item.date >= cutoffStr);
      });
    }
    return allData;
  };
  const downloadCSV = (data) => {
    let csv = "";
    if (data.healthMetrics?.length > 0) {
      csv += "=== CH\u1EC8 S\u1ED0 S\u1EE8C KH\u1ECEE ===\n";
      csv += "Ng\xE0y,C\xE2n n\u1EB7ng (kg),Chi\u1EC1u cao (cm),BMI,Calories,B\u01B0\u1EDBc ch\xE2n,N\u01B0\u1EDBc (L),Gi\u1EA5c ng\u1EE7 (h)\n";
      data.healthMetrics.forEach((m) => {
        csv += `${m.date},${m.weight},${m.height},${m.bmi},${m.calories},${m.steps},${m.water},${m.sleep}
`;
      });
      csv += "\n";
    }
    if (data.foodEntries?.length > 0) {
      csv += "=== NH\u1EACT K\xDD \u0102N U\u1ED0NG ===\n";
      csv += "Ng\xE0y,Gi\u1EDD,B\u1EEFa,M\xF3n \u0103n,Calories,Protein (g),Carbs (g),Fat (g)\n";
      data.foodEntries.forEach((f) => {
        csv += `${f.date},${f.time},${f.mealType},${f.foodName},${f.calories},${f.protein},${f.carbs},${f.fat}
`;
      });
      csv += "\n";
    }
    if (data.exerciseEntries?.length > 0) {
      csv += "=== L\u1ECACH T\u1EACP LUY\u1EC6N ===\n";
      csv += "Ng\xE0y,Gi\u1EDD,Lo\u1EA1i,Th\u1EDDi l\u01B0\u1EE3ng (ph\xFAt),Calories \u0111\u1ED1t,C\u01B0\u1EDDng \u0111\u1ED9\n";
      data.exerciseEntries.forEach((e) => {
        csv += `${e.date},${e.time},${e.type},${e.duration},${e.caloriesBurned},${e.intensity}
`;
      });
    }
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `VitaTrack_Export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    link.click();
  };
  const downloadJSON = (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `VitaTrack_Export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    link.click();
  };
  const printData = (data) => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>VitaTrack - B\xE1o c\xE1o s\u1EE9c kh\u1ECFe</title>
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
        <h1>VitaTrack - B\xE1o c\xE1o s\u1EE9c kh\u1ECFe</h1>
        <div class="meta">
          <div>Ng\xE0y xu\u1EA5t: ${(/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN")}</div>
          <div>Kho\u1EA3ng th\u1EDDi gian: ${dateRange === "7days" ? "7 ng\xE0y qua" : dateRange === "30days" ? "30 ng\xE0y qua" : "T\u1EA5t c\u1EA3"}</div>
        </div>
    `;
    if (data.healthMetrics?.length > 0) {
      html += `
        <h2>Ch\u1EC9 s\u1ED1 s\u1EE9c kh\u1ECFe</h2>
        <table>
          <thead>
            <tr>
              <th>Ng\xE0y</th>
              <th>C\xE2n n\u1EB7ng (kg)</th>
              <th>BMI</th>
              <th>Calories</th>
              <th>B\u01B0\u1EDBc ch\xE2n</th>
              <th>N\u01B0\u1EDBc (L)</th>
              <th>Gi\u1EA5c ng\u1EE7 (h)</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.healthMetrics.forEach((m) => {
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
    if (data.foodEntries?.length > 0) {
      html += `
        <h2>Nh\u1EADt k\xFD \u0103n u\u1ED1ng</h2>
        <table>
          <thead>
            <tr>
              <th>Ng\xE0y</th>
              <th>B\u1EEFa</th>
              <th>M\xF3n \u0103n</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fat (g)</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.foodEntries.forEach((f) => {
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
          <p>VitaTrack - Qu\u1EA3n l\xFD s\u1EE9c kh\u1ECFe v\xE0 dinh d\u01B0\u1EE1ng</p>
          <p>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} - vitatrack.vn</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3,
        padding: 20
      },
      onClick: onClose
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: "#fff",
          borderRadius: 16,
          maxWidth: 500,
          width: "100%",
          padding: 24
        },
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 20, fontWeight: 600, marginBottom: 20 } }, "Xu\u1EA5t d\u1EEF li\u1EC7u"),
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 } }, "\u0110\u1ECBnh d\u1EA1ng"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [
        { value: "csv", label: "CSV (Excel)" },
        { value: "json", label: "JSON" },
        { value: "print", label: "In PDF" }
      ].map((format) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: format.value,
          onClick: () => setExportFormat(format.value),
          style: {
            flex: 1,
            padding: "10px",
            border: exportFormat === format.value ? "2px solid #22C55E" : "1px solid #E5E7EB",
            borderRadius: 8,
            background: exportFormat === format.value ? "#F0FDF4" : "#fff",
            color: exportFormat === format.value ? "#22C55E" : "#6B7280",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        format.label
      )))),
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 } }, "Kho\u1EA3ng th\u1EDDi gian"), /* @__PURE__ */ React.createElement(
        "select",
        {
          value: dateRange,
          onChange: (e) => setDateRange(e.target.value),
          style: {
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            fontSize: 14
          }
        },
        /* @__PURE__ */ React.createElement("option", { value: "7days" }, "7 ng\xE0y qua"),
        /* @__PURE__ */ React.createElement("option", { value: "30days" }, "30 ng\xE0y qua"),
        /* @__PURE__ */ React.createElement("option", { value: "all" }, "T\u1EA5t c\u1EA3 d\u1EEF li\u1EC7u")
      )),
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8 } }, "Lo\u1EA1i d\u1EEF li\u1EC7u"), [
        { key: includeMetrics, setter: setIncludeMetrics, label: "Ch\u1EC9 s\u1ED1 s\u1EE9c kh\u1ECFe" },
        { key: includeFoods, setter: setIncludeFoods, label: "Nh\u1EADt k\xFD \u0103n u\u1ED1ng" },
        { key: includeExercises, setter: setIncludeExercises, label: "L\u1ECBch t\u1EADp luy\u1EC7n" }
      ].map((item, idx) => /* @__PURE__ */ React.createElement(
        "label",
        {
          key: idx,
          style: {
            display: "flex",
            alignItems: "center",
            padding: "10px 0",
            cursor: "pointer"
          }
        },
        /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "checkbox",
            checked: item.key,
            onChange: (e) => item.setter(e.target.checked),
            style: { marginRight: 10, width: 18, height: 18 }
          }
        ),
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, item.label)
      ))),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: onClose,
          style: {
            flex: 1,
            padding: "12px",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            background: "#fff",
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        "H\u1EE7y"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleExport,
          disabled: !includeMetrics && !includeFoods && !includeExercises,
          style: {
            flex: 1,
            padding: "12px",
            border: "none",
            borderRadius: 12,
            background: includeMetrics || includeFoods || includeExercises ? "#22C55E" : "#E5E7EB",
            color: includeMetrics || includeFoods || includeExercises ? "#fff" : "#9CA3AF",
            fontSize: 14,
            fontWeight: 600,
            cursor: includeMetrics || includeFoods || includeExercises ? "pointer" : "not-allowed"
          }
        },
        "Xu\u1EA5t d\u1EEF li\u1EC7u"
      ))
    )
  );
}
export {
  DataExport
};
