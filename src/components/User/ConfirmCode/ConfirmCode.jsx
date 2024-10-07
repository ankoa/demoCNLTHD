import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import VerificationInput from "react-verification-input";
import "./ConfirmCode.scss";
import { postCheckConfirmEmailCode, postRegister } from "../../../services/authService";
import { toast } from "react-toastify";

const ConfirmCode = () => {

  const location = useLocation();
  const dataFromRegister = location.state;

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

  const handleVerify = async () => {
    // Xử lý xác minh OTP
    if (otp.length !== 6) {
      toast.error("Mã OTP không hợp lệ. Vui lòng thử lại.");
      return;
    }

    try {
      // Xác minh mã OTP
      const response = await postCheckConfirmEmailCode(dataFromRegister.Email, otp);
      if (response && response.EC === 0) {
        // Đăng ký tài khoản
        const responseSignup = await postRegister(
          dataFromRegister.Email,
          dataFromRegister.Username,
          dataFromRegister.PasswordHash,
          dataFromRegister.FirstName,
          dataFromRegister.LastName
        );

        if (responseSignup && responseSignup.EC === 0) {
          // Điều hướng đến trang xác nhận mã
          navigate('/login', { state: { newEmail: dataFromRegister.Email, newPassword: dataFromRegister.PasswordHash } });
        } else {
          // Hiển thị thông báo lỗi từ server khi đăng ký thất bại
          toast.error(responseSignup.EM);
        }
      } else {
        // Hiển thị thông báo lỗi từ server khi xác minh OTP thất bại
        toast.error(response.EM);
      }
    } catch (error) {
      // Xử lý lỗi từ server
      handleError(error, "Đã xảy ra lỗi trong quá trình xác minh hoặc đăng ký.");
    }
  };

  // Hàm xử lý lỗi để tránh lặp mã
  const handleError = (error, defaultMessage) => {
    if (error.response) {
      console.error(error.response.data);
      toast.error(error.response.data.EM || defaultMessage);
    } else {
      console.error("Lỗi không xác định:", error);
      toast.error(defaultMessage);
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
                  We've sent a code to {dataFromRegister.Email}
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
