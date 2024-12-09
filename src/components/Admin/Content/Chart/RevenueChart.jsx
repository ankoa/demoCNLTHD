import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ tròn
ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueChart = () => {
  // Dữ liệu doanh thu theo năm
  const revenueData = {
    2020: {
      quy1: 10000000,
      quy2: 10000000,
      quy3: 10000000,
      quy4: 15000000,
      nam: 45000000,
    },
    2021: {
      quy1: 12000000,
      quy2: 12000000,
      quy3: 13000000,
      quy4: 16000000,
      nam: 53000000,
    },
    2022: {
      quy1: 14000000,
      quy2: 14000000,
      quy3: 15000000,
      quy4: 18000000,
      nam: 61000000,
    },
  };

  // State để lưu năm đang chọn
  const [selectedYear, setSelectedYear] = useState(2020);
  const [dataForYear, setDataForYear] = useState(revenueData[2020]);

  // Hàm thay đổi năm
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setDataForYear(revenueData[year]);
  };

  // Dữ liệu cho biểu đồ tròn
  const pieData = {
    labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
    datasets: [
      {
        data: [
          dataForYear.quy1,
          dataForYear.quy2,
          dataForYear.quy3,
          dataForYear.quy4,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", 
          "rgba(153, 102, 255, 0.5)", 
          "rgba(255, 159, 64, 0.5)", 
          "rgba(255, 99, 132, 0.5)", 
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn biểu đồ tròn
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Hiển thị doanh thu cho từng phần
            return `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false, // Giữ tỉ lệ không bị thay đổi
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>Biểu đồ doanh thu</h3>

      <div>
        <label>Chọn năm: </label>
        <select value={selectedYear} onChange={handleYearChange}>
          {Object.keys(revenueData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div style={{ position: "relative", height: "500px", width: "500px", marginTop: "20px" }}>
        <Pie data={pieData} options={pieOptions} />
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <p>
          <strong>Tổng doanh thu năm {selectedYear}:</strong>{" "}
          {dataForYear.nam.toLocaleString()} VND
        </p>
      </div>
    </div>
  );
};

export default RevenueChart;
