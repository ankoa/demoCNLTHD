import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModalConfirmRedirect = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  const handleClose = () => {
    // Đóng modal khi người dùng chọn "Không"
    
    navigate('/onlinecourse');
  };

  if (!open) return null; // Nếu modal không mở, không render gì cả.

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Chuyển đến trang đăng nhập để mua khóa học?</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleConfirm}>Có</button>
          <button style={{ ...styles.button, ...styles.cancelButton }} onClick={handleClose}>Quay lại</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối mờ
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '300px',
    textAlign: 'center',
    padding: '70px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    width: "45%",
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  }
};

export default ModalConfirmRedirect;
