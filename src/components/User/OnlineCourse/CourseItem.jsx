import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseItem.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function (props) {
  let { image, title, price, name, description, courseId } = props
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleCourseClick = () => {
    navigate(`/onlinecourse/purchase/${courseId}`, {
      state: { 
        title: title, 
        price: price, 
        name: name, 
        description: description, 
        courseId: courseId 
      }, // Pass entire course info as state
    });
  };


  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="courses-grid-item" onClick={handleCourseClick}>
        <div className="courses-grid-item-image">
          <img src={image || ""} alt={name || "Course Image"} />
        </div>
        <div className="courses-grid-item-title">
          <span>[{name}]</span> {title}
        </div>
        <div className="courses-grid-item-description">{description}</div>
        <div className="courses-grid-item-content">
          <div className="course-tags">
            <span className="tag">#Khóa học online</span>
          </div>
        </div>
        <div className="courses-grid-item-pricing">
          <div className="course-prices">{formatPrice(price)}</div>
        </div>
      </div>
    </div>
  )
}
