import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import './PurchaseForm.css'; // Import file CSS

const PurchaseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, price, name, description, courseId } = location.state || {};

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  //xử lý mua khóa học
  const handleBuy = () => {
    alert(`Bạn có muốn mua khóa học ${formData.name} với giá $${formData.price}!`);
  };

  const handleHomeBack = () => {
    navigate("/");
  };

  const handleCourseBack = () => {
    navigate("/onlinecourse");
  };
useEffect(()=>{
  console.log(title)
})

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
        <span className="breadcrumb-current">{courseId}</span>
      </div>

      <div className="purchase-form-container">
        <h2>Thông tin khóa học</h2>
        <form>
          <div>
            <label>Tên khóa học: {name}</label>
          </div>

          <div className="purchase-form-container-info">
            <label>Tiêu đề: </label>
            <span>{title}</span>
          </div>

          <div className="purchase-form-container-info">
            <label>Mô tả: </label>
            <span>{description}</span>
          </div>

          <div className="purchase-form-container-info">
            <label>Giá: </label>
            <span>{formatPrice(price)}</span>
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
