import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import "./ConfirmCode.scss";
import { postCheckConfirmEmailCode, postCheckResetPasswordCode, postRegister, postSendConfirmEmailCode } from "../../../services/authService";
import { toast } from "react-toastify";

const ConfirmCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataFromRegister = location.state; // Nhận dữ liệu từ navigate và xác định mục đích

  const [otp, setOtp] = useState(""); // State cho mã OTP
  const [resendEnabled, setResendEnabled] = useState(false); // Trạng thái nút resend
  const [timer, setTimer] = useState(60); // State cho bộ đếm thời gian


  // Bắt đầu đếm ngược khi component render
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setResendEnabled(true); // Kích hoạt lại nút resend sau 60 giây
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown); // Dọn dẹp bộ đếm khi component bị huỷ
  }, []);

  useEffect(() => {
    if (!dataFromRegister) {
      // Nếu không có dữ liệu từ đăng ký, điều hướng về trang đăng ký hoặc trang chủ
      navigate('/', { replace: true });
    }
  }, [dataFromRegister, navigate]);

  const handleOtpChange = (value) => {
    setOtp(value); // Cập nhật mã OTP khi người dùng nhập
  };

  const handleResendCode = async () => {
    if (resendEnabled) {
      try {
        let response = await postSendConfirmEmailCode(dataFromRegister.Email, dataFromRegister.Username);
        if (response && response.EC === 0) {
          toast.success("Đã gửi lại mã xác nhận.");
          setResendEnabled(false); // Vô hiệu hóa nút resend
          setTimer(60); // Đặt lại bộ đếm thời gian
        } else if (response && response.EC !== 0) {
          toast.error(response.EM);
        }
      } catch (error) {
        // Ghi lại lỗi từ server
        if (error.response) {
          console.error(response);
          toast.error(error.response.data.EM || "Đã xảy ra lỗi trong quá trình đăng ký.");
        } else {
          console.error("Lỗi không xác định:", error);
        }
      }
    }
  };

  const handleCancel = () => {
    alert("Đã hủy xác nhận.");
  };

  const handleVerify = async () => {
    // Xử lý xác minh OTP
    if (otp.length !== 6) {
      toast.error("Mã OTP không hợp lệ. Vui lòng thử lại.");
      return;
    }

    try {
      if (dataFromRegister.purpose === 'register') {
        // Xác minh mã OTP cho đăng ký tài khoản
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
            navigate('/login',
              {
                state: { newEmail: dataFromRegister.Email, newPassword: dataFromRegister.PasswordHash },
                replace: true
              },

            );
          } else {
            toast.error(responseSignup.EM);
          }
        } else {
          toast.error(response.EM);
        }
      } else if (purpose === 'reset-password') {
        // Xác minh mã OTP cho reset mật khẩu
        const response = await postCheckResetPasswordCode(dataFromRegister.Email, otp);
        if (response && response.EC === 0) {
          // Chuyển hướng sang trang đặt lại mật khẩu
          // navigate('/reset-password', {
          //   state: { email: dataFromRegister.Email },
          //   replace: true
          // });
          toast.success(response.EM);
        } else {
          toast.error(response.EM);
        }
      }
    } catch (error) {
      handleError(error, "Đã xảy ra lỗi trong quá trình xác minh hoặc đăng ký.");
    }
  };

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
      <div className="container px-2 pb-5 pt-5">
        <div className="row">
          <div className="col-md-2 col-lg-3"></div>
          <div className="col-md-8 col-lg-6">
            <div className="bg-white p-5 rounded-3 shadow-sm border">
              <div>
                <p
                  className="text-center text-success"
                  style={{ fontSize: "5.5rem" }}
                >
                  <i className="fa-solid fa-envelope-circle-check" style={{ color: '#0d6efd' }}></i>
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

                <p className="text-muted text-center mt-3">
                  Didn't get the code?{" "}
                  <a
                    style={{ cursor: 'pointer' }}
                    className={`text-primary ${!resendEnabled ? "disabled-link" : ""}`}
                    onClick={handleResendCode}
                  >
                    {resendEnabled ? "Click to resend." : `Resend in ${timer}s`}
                  </a>
                </p>

                <div className="row pt-3">
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
                      className="btn btn-primary w-100"
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
