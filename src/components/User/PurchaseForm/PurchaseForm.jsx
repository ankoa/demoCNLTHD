import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './PurchaseForm.css'; // Import file CSS

const PurchaseForm = () => {
  const navigate = useNavigate();

  const [formData] = useState({
    id: "1",
    name: "Toeic 4 kỹ năng",
    description: "Khóa học này giúp bạn cải thiện toàn diện 4 kỹ năng: nghe, nói, đọc, viết.",
    title: "Khóa học Toeic 4 kỹ năng nghe, nói, đọc, viết đảm bảo đầu ra trên 600",
    price: 3300000,
    image: "/img1.png",
    active: 1,
    created: "2024-11-12T20:36:51.2064743"
  });

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleBuy = () => {
    alert(`Bạn có muốn mua khóa học ${formData.name} với giá $${formData.price}!`);
  };

  const handleHomeBack = () => {
    navigate("/");
  };

  const handleCourseBack = () => {
    navigate("/onlinecouse");
  };

  return (
    <>
      <div className="breadcrumb">
        <button onClick={handleHomeBack}>
          <span>Trang chủ</span>
        </button>
        <span className="breadcrumb-divider">/</span>
        <button onClick={handleCourseBack}>
          <span>Khóa học</span>
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">{formData.id}</span>
      </div>

      <div className="purchase-form-container">
        <h2>Thông tin khóa học</h2>
        <form>
          <div>
            <label>Tên khóa học: {formData.name}</label>
          </div>

          {/* <div>
          <img src={formData.image} alt={formData.name || ""} />
        </div> */}

          <div className="purchase-form-container-info">
            <label>Tiêu đề: </label>
            <span>{formData.title}</span>
          </div>

          <div className="purchase-form-container-info">
            <label>Mô tả: </label>
            <span>{formData.description}</span>
          </div>

          <div className="purchase-form-container-info">
            <label>Giá: </label>
            <span>{formatPrice(formData.price)}</span>
          </div>

          <button type="button" onClick={handleBuy}>
            Mua ngay
          </button>
        </form>
      </div>
    </>
  );
};

export default PurchaseForm;
