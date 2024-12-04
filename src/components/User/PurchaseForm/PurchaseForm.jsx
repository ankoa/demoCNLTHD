import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import ModalConfirmRedirect from './LoginBack';
import './PurchaseForm.css'; // Import file CSS

const PurchaseForm = () => {
  const userID = useSelector((state) => state.userReducer.account.userid);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, price, name, description, courseId } = location.state || {};

  // Hàm mở modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // Hàm đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if(!userID){
      setOpenModal(true);
    }
  }, [userID]);

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  //xử lý mua khóa học
  const handleBuy = () => {
    alert(`Bạn có muốn mua khóa học ${formData.name} với giá $${formData.price}!`);
  };

  const handleBack = () => {
    navigate("/onlinecourse");
  };

  return (
    <>
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

          <div className="purchase-form-buttons">
            <button type="button" onClick={handleBack} className="back-button">
              Quay lại
            </button>
            <button type="button" onClick={handleBuy}>
              Mua ngay
            </button>
          </div>
        </form>
      </div>

      <ModalConfirmRedirect
        open={openModal}
        onClose={handleCloseModal} // Hàm đóng modal
        />
    </>
  );
};

export default PurchaseForm;
