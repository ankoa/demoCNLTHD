import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import _ from "lodash";
import { postLogOut } from "../../../services/authService"; // Adjust path as necessary
import { Dropdown } from "react-bootstrap"; // Import Dropdown from Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa"; // Import cả FaUser và FaPhoneAlt

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showUpperHeader, setShowUpperHeader] = useState(true);
  const [addDropShadow, setAddDropShadow] = useState(false);
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const accountFromState = useSelector((state) => state.userReducer.account);

  useEffect(() => {
    if (isAuthenticated) {
      setAccount(accountFromState);
      setIsLogin(true);
    } else {
      setIsLogin(false);
      setAccount(null);
    }
  }, [isAuthenticated, accountFromState]);

  const handleLogout = () => {
    if (account) {
      dispatch(postLogOut("accounemail@gmail.com", account.refresh_token));
      console.log("User logged out.");
      navigate("/login");
    }
  };

  return (
    <div className="header-container">
      {showUpperHeader && (
        <div className={`upper-header ${addDropShadow ? "with-shadow" : ""}`}>
          {/* Logo */}
          <div className="logo" onClick={() => navigate("/")}>
            <img
              src="src/assets/images/logo-TOEIC.webp"
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

          <div className="login-option">
            {isLogin ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="light" 
                  className="btn-user-icon"
                  id="dropdown-basic"
                >
                  <FaUser style={{ color: "black" }} /> 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>
                    Thông tin tài khoản
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
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
