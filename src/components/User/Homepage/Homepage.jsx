import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Homepage.scss";
import "../TestLibrary/TextBox/TestBox.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getCourses } from "../../../services/courseService";
import { getAllTests } from "../../../services/testsService";
const Homepage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Thêm autoplay để slider tự động cuộn
    autoplaySpeed: 3000, // Thay đổi tốc độ tự động cuộn
    arrows: false, // Ẩn các nút điều hướng
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  useEffect(() => {
    //hàm lấy lesson của 1 course
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses(); // Gọi API
        setCourses(data.filter(course => course.active === 1).slice(0, 10)); // Lọc và lấy 10 khóa học đầu tiên

        console.log("Course: ", first10Courses);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu course: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    const fetchTest = async () => {
      setLoading(true);
      try {
        const dataTest = await getAllTests(); // Gọi API
        console.log("Data from API:", dataTest);
        // Sắp xếp bài test theo CreatedAt (mới nhất đến cũ nhất)
        const sortedData = dataTest.DT.sort(
          (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
        );

        // Lấy 10 bài test đầu tiên
        const tenRecentTests = sortedData.slice(0, 8);

        setTests(tenRecentTests); // Cập nhật state
        console.log("Course: ", tenRecentTests);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu course: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, []); // Chỉ chạy 1 lần khi component mount

  const handleCourseClick = (course) => {
    navigate(`/onlinecourse/purchase/${course.courseId}`, {
      state: {
        title: course.title,
        price: course.price,
        name: course.name,
        description: course.description,
        courseId: course.courseId,
      }, // Pass entire course info as state
    });
  };
  const handleDetailClick = (testId) => {
    navigate(`/test/${testId}`);
  };
  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="homepage-container">
      <div className="slider-container">
        <div className="ads-slider">
          <div className="ads-title">Học 1 lần là 990 điểm liền</div>
          <button
            className="btn btn-warning mt-3 text-white fw-bold"
            onClick={() => navigate("/library-test")}
          >
            Kiểm tra ngay
          </button>
        </div>
        <div className="slider">
          <Slider {...settings}>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg"
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg"
                alt="Slide 3"
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-chot.jpg"
                alt="Slide 4"
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg"
                alt="Slide 5"
              />
            </div>
            <div>
              <img
                className="img-fluid"
                src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg"
                alt="Slide 6"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="mt-5">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Khoá học online nổi bật
        </h2>
        <div className="new-test-container pt-2">
          {courses.map((course, index) => (
            <Card key={index} style={{ width: "20rem", marginBottom: "20px" }}>
              <Card.Img
                variant="top"
                src={course.image || "default-image.jpg"}
                alt={course.title}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="card-bottom">
                  <Card.Text className="card-price">
                    {formatPrice(course.price)}
                  </Card.Text>
                  <Button
                    onClick={() => handleCourseClick(course)}
                    variant="primary"
                    style={{ fontWeight: "bold" }}
                  >
                    Đăng ký ngay
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-5 px-5">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Đề thi mới nhất
        </h2>
        <div className="pt-2">
          <div className="col-12 col-md-12">
            {!tests || tests.length === 0 ? (
              <p>Không có bài kiểm tra nào để hiển thị.</p>
            ) : (
              <>
                <div className="testitem-grid row align-items-center">
                  {tests.map((test) => (
                    <div className="col-6 col-md-3 my-2" key={test.Id}>
                      <div
                        className="testitem-wrapper border rounded shadow-sm p-3"
                        style={{ backgroundColor: "#f4f4f4" }}
                      >
                        <h2 className="testitem-title">{test.Name}</h2>
                        <p className="testitem-description">
                          {test.Description}
                        </p>
                        <div className="testitem-info-wrapper">
                          <div>
                            <span className="testitem-info">
                              <span className="far fa-clock mr-1"></span>
                              {test.Duration} phút |{" "}
                              <span className="fa-regular fa-star mr-1"></span>
                              {test.Difficulty}
                            </span>
                          </div>
                          <div>
                            <span className="testitem-info">
                              Cập nhật lần cuối:{" "}
                              {new Date(test.UpdatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="testitem-info">
                              <span className="far fa-calendar-alt mr-1"></span>
                              Ngày tạo:{" "}
                              {new Date(test.CreatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="testitem-start-test mt-2 d-flex justify-content-center">
                          <button
                            className="btn btn-block btn-outline-primary"
                            onClick={() => handleDetailClick(test.Id)}
                          >
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
