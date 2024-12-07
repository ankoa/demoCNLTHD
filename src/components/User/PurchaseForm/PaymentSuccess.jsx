import React from "react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const oderId = "638206149219469347";
  const amount = "10,000";
  const oderInfo = "Khách hàng: ProG Coder. Nội dung: Thanh toán tại ProG Coder";
  return (
    <div className="payment-container">
      <h1 className="success-message">Thanh Toán Thành Công</h1>
      <div className="payment-details">
        <p><strong>Order ID:</strong>{oderId}</p>
        <p><strong>Amount:</strong>{amount}</p>
        <p>
          <strong>Order Info:</strong> {oderInfo}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
