import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import _ from "lodash";
import { postLogOut } from "../../../services/authService"; // Adjust path as necessary
import { Dropdown } from "react-bootstrap"; // Import Dropdown from Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa"; // Import cả FaUser và FaPhoneAlt
import { toast } from "react-toastify";
import { doLogOut } from "../../../redux/action/userAction";

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
  const handleLogout = async () => {
    if (account) {
      try {
        let response = await postLogOut(accountFromState.refresh_token);
        if (response && response.EC === 0) {
          dispatch(doLogOut());
          toast.success(response.EM);
          navigate("/");
        } else if (response && response.EC !== 0) {
          toast.error(response.EM);
          console.log(response);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error(
          "Có lỗi xảy ra trong quá trình đăng xuất. Vui lòng thử lại sau."
        );
      }
    }
  };
  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleUserinformation = () => {
    navigate("/userprofile");
  };
  return (
    <div className="header-container">
      {showUpperHeader && (
        <div className={`upper-header ${addDropShadow ? "with-shadow" : ""}`}>
          {/* Logo */}
          <div
            className="d-flex align-items-center logo-slogan"
            onClick={() => navigate("/")}
          >
            <img
              src="src/assets/images/logo-toeic-transparent1.png"
              alt="Logo"
              className="logo-image"
            />
            <div className="phone-number">
              <FaPhoneAlt /> 0123456789
            </div>
          </div>
          {/* Phone Number */}

          <span className="slogan-text mx-5">
            Luyện đề TOEIC hiệu quả, tăng điểm thần tốc!
          </span>
          {/* Navigation */}
          {/* <nav className="navigation">
            <button className="nav-item" onClick={() => navigate("/my-course")}>
              Khóa học của tôi
            </button>
            <button
              className="nav-item"
              onClick={() => navigate("/onlinecourse")}
            >
              Khóa học
            </button>
            <button
              className="nav-item"
              onClick={() => navigate("/library-test")}
            >
              Đề thi online
            </button>
          </nav> */}
          <nav className="navigation">
            <button
              className="btn btn-round btn-block btn-primary "
              onClick={() => navigate("/library-test")}
            >
              Tham gia thư viện đề thi online ngay
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
                  <FaUser style={{ color: "white" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {account.role == "Admin" && (
                    <Dropdown.Item onClick={handleAdmin}>
                      Trang Admin
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleUserinformation}>
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
