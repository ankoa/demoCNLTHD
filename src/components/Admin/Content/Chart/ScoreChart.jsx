import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getStatAverage, getStatOverview } from "../../../../services/testService";
import { toast } from "react-toastify";

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreChart = () => {
  const [chartData, setChartData] = useState([]);
  const [textData, setTextData] = useState({});

  // Fetch dữ liệu biểu đồ
  const fetchDataChart = async () => {
    try {
      const response = await getStatOverview();
      if (response) {
        setChartData(response);
      } else {
        toast.error("Lỗi không xác định khi tải dữ liệu biểu đồ");
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Fetch dữ liệu text (điểm max, min, avg)
  const fetchDataText = async () => {
    try {
      const response = await getStatAverage();
      if (response) {
        setTextData(response);
      } else {
        toast.error("Lỗi không xác định khi tải dữ liệu thống kê");
      }
    } catch (error) {
      console.error("Error fetching text data:", error);
    }
  };

  // Gọi fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchDataChart();
    fetchDataText();
  }, []);

  // Dữ liệu cho biểu đồ
  const barData = {
    labels: chartData.map((range) => range.Range),
    datasets: [
      {
        label: "Số lượng học viên",
        data: chartData.map((range) => range.Count), // Dữ liệu số lượng
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu cột
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn biểu đồ
  const barOptions = {
    responsive: true,
    indexAxis: "y", // Biểu đồ ngang
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
      x: {
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Phân bổ điểm số TOEIC</h3>
      <Bar data={barData} options={barOptions} />
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <p>
          <strong>Điểm cao nhất:</strong> {textData.MaxScore || 0}
        </p>
        <p>
          <strong>Điểm thấp nhất:</strong> {textData.MinScore || 0}
        </p>
        <p>
          <strong>Điểm trung bình:</strong>{" "}
          {textData.AvgScore ? textData.AvgScore.toFixed(2) : 0}
        </p>
      </div>
    </div>
  );
};

export default ScoreChart;
