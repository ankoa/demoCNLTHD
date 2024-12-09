import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getCourseExistingsNam } from "../../../../services/courseExistingService";

// Đăng ký các thành phần cần thiết cho biểu đồ tròn
ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueChart = () => {
  // Dữ liệu doanh thu theo năm
  const [selectedYear, setSelectedYear] = useState(2024);
  const [dataForYear, setDataForYear] = useState({
    quy1: 0,
    quy2: 0,
    quy3: 0,
    quy4: 0,
    nam: 0,
  });

  // Hàm fetch dữ liệu từ API
  const fetchData = async (year) => {
    try {
      const response = await getCourseExistingsNam(year);
      if (response) {
        setDataForYear(response); // Gán dữ liệu hiện tại để hiển thị
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  // Hàm thay đổi năm
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
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
            return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} VND`;
          },
        },
      },
    },
    maintainAspectRatio: false, // Giữ tỉ lệ không bị thay đổi
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>Biểu đồ doanh thu</h3>

      <div>
        <label>Chọn năm: </label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div
        style={{
          position: "relative",
          height: "500px",
          width: "500px",
          marginTop: "20px",
        }}
      >
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
