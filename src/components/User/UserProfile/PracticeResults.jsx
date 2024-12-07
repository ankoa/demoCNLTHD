import React, { useState } from "react";
import "./PracticeResults.scss";

const PracticeResults = () => {
  // Dữ liệu mẫu
  //const navigate = useNavigate();
  const [results] = useState([
    {
      date: "08/10/2024",
      badges: ["Luyện tập", "Part 1"],
      score: "6/6",
      detailsLink: "#",
    },
    {
      date: "05/09/2024",
      badges: ["Luyện tập", "Part 1"],
      score: "4/6",
      detailsLink: "#",
    },

  ]);

  return (
    <div className="container">
      <div className="header">
        <a href="#">
          <i className="fas fa-chart-bar"></i> Tới trang thống kê kết quả luyện thi
        </a>
      </div>
      <div className="title">2024 Practice Set TOEIC Test 1</div>
      <table>
        <thead>
          <tr>
            <th>Ngày làm</th>
            <th>Kết quả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>
                {result.date}{" "}
                {result.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`badge ${badge.toLowerCase().replace(" ", "-")}`}
                  >
                    {badge}
                  </span>
                ))}
              </td>
              <td>{result.score}</td>
              <td>
                <a href={result.detailsLink} className="details-link">
                  Xem chi tiết
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PracticeResults;
