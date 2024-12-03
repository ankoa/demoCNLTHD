import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Lesson.scss";

const Lesson = () => {

  // Dữ liệu lesson và lessonDetail
  const lessons = [
    {
      lessonId: 1,
      courseId: 1,
      lessonName: "lesson 1",
      titleLessonId: 0
    },
    {
      lessonId: 2,
      courseId: 1,
      lessonName: "lesson 2",
      titleLessonId: 0
    }
  ];

  const lessonDetails = [
    {
      lessonDetailId: 2,
      lessonId: 1,
      lessonName: "Khóa học 2",
      lessonDescription: "Toeic",
      learningpProgress: 13,
      lessonVideo: "https://www.youtube.com/watch?v=1zO1SKwdnmA"
    },
    {
      lessonDetailId: 1002,
      lessonId: 1,
      lessonName: "Bài học 1",
      lessonDescription: "Toeic",
      learningpProgress: 12,
      lessonVideo: "https://www.youtube.com/watch?v=1zO1SKwdnmA"
    },
    {
      lessonDetailId: 1003,
      lessonId: 1,
      lessonName: "Bài học 1",
      lessonDescription: "Toeic",
      learningpProgress: 12,
      lessonVideo: "https://www.youtube.com/watch?v=1zO1SKwdnmA"
    },
    {
      lessonDetailId: 1003,
      lessonId: 2,
      lessonName: "Bài học 1",
      lessonDescription: "Toeic",
      learningpProgress: 12,
      lessonVideo: "https://www.youtube.com/watch?v=1zO1SKwdnmA"
    }
  ];

  const navigate = useNavigate();

  const [selectedContent, setSelectedContent] = useState(null); // Mặc định là null
  const [selectedIndex, setSelectedIndex] = useState(null); // Chỉ mục của item đang được chọn

  const handleMenuClick = (lessonId) => {
    // Lọc các lessonDetail dựa trên lessonId đã chọn
    const selectedLessonDetails = lessonDetails.filter(
      (detail) => detail.lessonId === lessonId
    );
    setSelectedContent(selectedLessonDetails);
    setSelectedIndex(lessonId); // Cập nhật chỉ mục của mục menu được chọn
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]{11})))|(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match && (match[1] || match[2]) ? (match[1] || match[2]) : null;
  };
  
  return (
    <div className="lesson-container">
      <div className="breadcrumb">
        <span className="home-link" onClick={goToHomePage}>
          Trang chủ
        </span>
        <span> / Lesson</span>
      </div>
      <div className="lesson-layout">
        <div className="menu">
          {/* {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${selectedIndex === index ? "active" : ""}`} // Thêm lớp 'active' nếu item được chọn
              onClick={() => handleMenuClick(item.content, index)}
            >
              {item.title}
            </div>
          ))} */}
          {lessons.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${selectedIndex === item.lessonId ? "active" : ""}`} // Thêm lớp 'active' nếu item được chọn
              onClick={() => handleMenuClick(item.lessonId)} // Khi click sẽ hiển thị thông tin bài học
            >
              {item.lessonName}
            </div>
          ))}
        </div>
        {/* <div className="content">{selectedContent}</div> */}
        <div className="content">
          {selectedContent ? (
            <div>
              {selectedContent.map((detail, index) => (
                <div key={index} className="lesson-detail">
                  <h3>{detail.lessonName}</h3>
                  <p>{detail.lessonDescription}</p>
                  <p>Tiến độ học: {detail.learningpProgress}%</p>
                  {/* <a href={detail.lessonVideo} target="_blank" rel="noopener noreferrer">
                    Xem video
                  </a> */}

                  {/* Nhúng video YouTube vào trang */}
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(detail.lessonVideo)}`}
                      title={detail.lessonName}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Chọn bài học để xem chi tiết</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
