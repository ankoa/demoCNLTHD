import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Toast, ToastContainer, Modal, Button } from "react-bootstrap";

import ModalConfirmRedirect from './LoginBack';
import './PurchaseForm.css'; // Import file CSS
import vnpayImage from '../../../assets/images/vnpay.jpg';
import momoImage from '../../../assets/images/momo.png';
import QR from '../../../assets/images/qrThanhToan.png';

const PurchaseForm = () => {
  const userID = useSelector((state) => state.userReducer.account.userid);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, price, name, description, courseId } = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Hàm mở modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // Hàm đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!userID) {
      handleOpenModal();
    }
  }, [userID]);

   // Thông tin thanh toán chuyển khoản
   const bankInfo = {
    qrImage: QR, 
    bankAccount: '0378587427',
    accountHolder: 'PHAN THI ANH THU',
    amount: price,
  };

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  //xử lý mua khóa học
  const handleBuy = () => {
    if (!selectedPayment) {
      setSnackBarMessage("Vui lòng chọn phương thức thanh toán");
      setSnackBarOpen(true);
      return;
    }
    if (selectedPayment === 'transfer') {
      setShowModal(true); // Mở modal khi chọn thanh toán chuyển khoản
    }
    alert(`Bạn có muốn mua khóa học ${name} với giá $${price}!`);
  };

  const handleBack = () => {
    navigate("/onlinecourse");
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={snackBarOpen} onClose={handleCloseSnackBar} delay={6000} autohide>
          <Toast.Body className="bg-danger text-white">
            {snackBarMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

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
            <span className="course-price">{formatPrice(price)}</span>
          </div>

          <div className="purchase-form-container-info">
            <label>Thanh toán:</label>
            <div className="payment-buttons">
              <button
                type="button"
                className={`btn-vnpay ${selectedPayment === 'transfer' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('transfer')}
              >
                <img src={vnpayImage} alt="transfer" /> Chuyển khoản
              </button>
              <button
                type="button"
                className={`btn-momo ${selectedPayment === 'momo' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('momo')}
              >
                <img src={momoImage} alt="MoMo" /> MoMo
              </button>
            </div>
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

       {/* Modal hiển thị thông tin chuyển khoản */}
       <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{
          padding: '15px', // Thêm khoảng cách bên ngoài modal
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chuyển khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: '15px' }}
        >
          <div style={{ marginBottom: '10px' }}>
            <h5>Chuyển khoản đến tài khoản:</h5>
            <div style={{ marginBottom: '5px' }}>
              <strong style={{ width: '200px', display: 'inline-block' }}>Người nhận: </strong>
              {bankInfo.accountHolder}
            </div>
            <div style={{ marginBottom: '5px' }}>
              <strong style={{ width: '200px', display: 'inline-block' }}>Số tài khoản: </strong>
              {bankInfo.bankAccount}
            </div>
            <div style={{ marginBottom: '5px' }}>
              <strong style={{ width: '200px', display: 'inline-block' }}>Số tiền cần chuyển: </strong>
              {formatPrice(bankInfo.amount)}
            </div>
            <div>
              <strong style={{ width: '200px', display: 'inline-block' }}>QR Code: </strong>
              <img
                src={bankInfo.qrImage}
                alt="QR Code"
                style={{ width: '150px', height: '150px', marginTop: '10px' }}
              />
            </div>

            <div  style={{ marginTop: '20px', color: 'red', fontWeight: 'bold' }}>
              Lưu ý: Khóa học sẽ được cấp sau khi xét duyệt.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'flex-end' }} >
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalConfirmRedirect
        open={openModal}
        onClose={handleCloseModal} // Hàm đóng modal
      />
    </>
  );
};

export default PurchaseForm;
