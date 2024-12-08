import React from "react";
import { Bar } from "react-chartjs-2";
import chartData from "./ChartData.json"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreChart = () => {
  const { ranges, maxScore, minScore, avgScore } = chartData;

  // Dữ liệu cho biểu đồ
  const barData = {
    labels: ranges.map((range) => range.Range),
    datasets: [
      {
        label: "Số lượng học viên",
        data: ranges.map((range) => range.Count), // Dữ liệu số lượng
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu cột
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn biểu đồ
  const barOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Phân bổ điểm số TOEIC",
      },
    },
    scales: {
      x: { // Trục X là số lượng (số người)
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
      y: { // Trục Y là các mức điểm
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      

      <Bar data={barData} options={barOptions} />
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <p>
          <strong>Điểm cao nhất:</strong> {maxScore}
        </p>
        <p>
          <strong>Điểm thấp nhất:</strong> {minScore}
        </p>
        <p>
          <strong>Điểm trung bình:</strong> {avgScore.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ScoreChart;
