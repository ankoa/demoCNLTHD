import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import VerificationInput from "react-verification-input";
import "./ConfirmCode.scss";

const ConfirmCode = () => {
  const [otp, setOtp] = useState(""); // State cho mã OTP

  const handleOtpChange = (value) => {
    setOtp(value); // Cập nhật mã OTP khi người dùng nhập
  };

  const handleResendCode = () => {
    alert("Đã gửi lại mã xác nhận.");
  };

  const handleCancel = () => {
    // Xử lý hủy
    alert("Đã hủy xác nhận.");
  };

  const handleVerify = () => {
    // Xử lý xác minh OTP
    if (otp.length === 4) {
      alert("Mã OTP hợp lệ. Xác minh thành công.");
    } else {
      alert("Mã OTP không hợp lệ. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-2 col-lg-3"></div>
          <div className="col-md-8 col-lg-6 mt-5">
            <div className="bg-white p-5 rounded-3 shadow-sm border">
              <div>
                <p
                  className="text-center text-success"
                  style={{ fontSize: "5.5rem" }}
                >
                  <i className="fa-solid fa-envelope-circle-check"></i>
                </p>
                <p className="text-center h5">Please check your email</p>
                <p className="text-muted text-center">
                  We've sent a code to contact@curfcode.com
                </p>

                {/* Sử dụng VerificationInput cho trường nhập OTP */}
                <div className="pt-4 pb-2 d-flex px-5">
                  <VerificationInput
                    length={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder=""
                    classNames={{
                      character: "otp-letter-input",
                    }}
                  />
                </div>

                <p className="text-muted text-center">
                  Didn't get the code?{" "}
                  <a
                    href="#"
                    className="text-success"
                    onClick={handleResendCode}
                  >
                    Click to resend.
                  </a>
                </p>

                <div className="row pt-5">
                  <div className="col-6">
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-success w-100"
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmCode;
