import { useState } from "react";
import { postLogin } from "../../../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username) {
      alert("Email không được để trống!");
      return;
    }
    if (!password) {
      alert("Password không được để trống!");
      return;
    }
    try {
      let response = await postLogin(username, password);
      console.log(response);
      if (response && response.EC === 0) {
        alert("Login success");
      } else if (response && response.EC !== 0) {
        alert(response.EM);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
    }
  };

  // Handle keydown event for Enter key to submit form
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container mt-3 mb-5 d-grid gap-2">
        <div className="title fs-1 fw-bold col-4 mx-auto text-center">
          Đăng Nhập
        </div>
        <div className="content-form col-3 mx-auto d-grid gap-3">
          {/* Email Input with form-floating */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
              value={username}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          {/* Password Input with form-floating */}
          <div className="d-flex">
            <div className="form-floating mb-3 d-flex" style={{ flex: '9' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Mật khẩu"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
                value={password}
              />
              <label htmlFor="floatingPassword">Mật khẩu</label>
            </div>
            <div className="input-group" style={{ flex: '1', height: '58px' }}>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
                style={{ borderLeft: "none" }}
              >
                {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </button>
            </div>
          </div>

          <button className="btn btn-dark w-100" onClick={handleLogin}>
            Đăng nhập
          </button>
          <div className="text-center mt-3">
            Bạn không có tài khoản? <Link to="/Register">Đăng kí</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
