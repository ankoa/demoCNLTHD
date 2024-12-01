import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import _ from "lodash";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showUpperHeader, setShowUpperHeader] = useState(true);
  const [addDropShadow, setAddDropShadow] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  const handleScroll = _.throttle(() => {
    const currentScrollPos = window.pageYOffset;

    /* if (currentScrollPos > 450) {
      setShowUpperHeader(false);
      setAddDropShadow(true);
    } else { */
    setShowUpperHeader(true);
    setAddDropShadow(false);
    /* } */
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header-container">
      {showUpperHeader && (
        <div className={`upper-header ${addDropShadow ? "with-shadow" : ""}`}>
          {/* Logo */}
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src="src\assets\images\logo-TOEIC.webp" // Thay thế đường dẫn này bằng đường dẫn thực tế của logo
              alt="Logo"
              className="logo-image"
            />
          </div>

          {/* Phone Number */}
          <div className="phone-number">
            <FaPhoneAlt /> 0123456789
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <button className="nav-item" onClick={() => navigate("/test")}>
              Khóa học của tôi
            </button>
            <button
              className="nav-item"
              onClick={() => navigate("/onlinecouse")}
            >
              Khóa học
            </button>
            <button
              className="nav-item"
              onClick={() => navigate("/library-test")}
            >
              Đề thi online
            </button>
          </nav>

          {/* Login Button */}
          <div className="login-option">
            {!isLogin && (
              <button
                className="btn btn-round btn-block btn-primary"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
