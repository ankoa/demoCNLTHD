import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Lesson.scss";
import { getLessons } from "../../../services/lessonService";
import { getLessonDetails } from "../../../services/lessonDetailService";

const Lesson = () => {
  const navigate = useNavigate();

  const [selectedContent, setSelectedContent] = useState(null); // Mặc định là null
  const [selectedIndex, setSelectedIndex] = useState(null); // Chỉ mục của item đang được chọn
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lessonDetail, setLessonDetail] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    //hàm lấy lesson của 1 course
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const data = await getLessons(); // Gọi API
        const filteredLessons = data.filter((item) => item.courseId == courseId); // Lọc theo điều kiện
        console.log("Lesson of courseID ", courseId, " is: ", filteredLessons);
        setLessons(filteredLessons);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu lesson: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]); // Chỉ chạy 1 lần khi component mount

  useEffect(() => {
    // Hàm lấy chi tiết bài học
    const fetchLessonDetail = async () => {
      setLoading(true);
      try {
        const data = await getLessonDetails(); // Gọi API lấy dữ liệu chi tiết
        const filteredLessonDetails = lessons.map((lesson) => {
          // Lọc dữ liệu theo từng lessonId
          return data.filter((item) => item.lessonId === lesson.lessonId);
        });

        // Gộp tất cả kết quả thành một mảng duy nhất
        const combinedLessonDetails = filteredLessonDetails.flat();

        console.log("LessonDetail for all lessons:", combinedLessonDetails);
        setLessonDetail(combinedLessonDetails); // Cập nhật toàn bộ dữ liệu
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    if (lessons.length > 0) {
      fetchLessonDetail(); // Chỉ gọi hàm nếu có lessons
    }
  }, [lessons]); // Chạy lại khi lessons thay đổi


  const handleMenuClick = (lessonId) => {
    // Lọc các lessonDetail dựa trên lessonId đã chọn
    const selectedLessonDetails = lessonDetail.filter(
      (detail) => detail.lessonId === lessonId
    );

    console.log(lessonId, selectedLessonDetails);
    setSelectedContent(selectedLessonDetails);
    setSelectedIndex(lessonId); // Cập nhật chỉ mục của mục menu được chọn
  };

  const goToHomePage = () => {
    navigate("/");
  };
  const goToMyCourse = () => {
    navigate("/my-course");
  };

  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\?v=|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // Trả về ID video hoặc null nếu không tìm thấy
  };




  return (
    <div className="lesson-container">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={goToHomePage}>
          Trang chủ
        </span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-link" onClick={goToMyCourse}>
          Khóa học của tôi
        </span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">Lesson</span>
      </div>
      <div className="lesson-layout">
        <div className="menu">
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
        <div className="content">
          {selectedContent ? (
            selectedContent.length > 0 ? ( // Kiểm tra nếu mảng không rỗng
              <div>
                {selectedContent.map((detail, index) => (
                  <div key={index} className="lesson-detail">
                    <h3>{detail.lessonName}</h3>
                    <p>{detail.lessonDescription}</p>
                    <p>Tiến độ học: {detail.learningpProgress}%</p>

                    {/* Nhúng video YouTube vào trang */}
                    <div className="video-container">
                      {detail.lessonVideo ? (
                        getYouTubeVideoId(detail.lessonVideo) ? (
                          <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(detail.lessonVideo)}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <p>Video ID không hợp lệ</p> // Thông báo khi không có ID video hợp lệ
                        )
                      ) : (
                        <p>Video not available</p> // Thông báo khi không có video
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Sẽ được cập nhật sớm hơn</p> // Nếu mảng rỗng
            )
          ) : (
            <p>Chọn bài học để xem chi tiết</p> // Nếu selectedContent là null hoặc undefined
          )}

        </div>
      </div>
    </div>
  );
};

export default Lesson;
