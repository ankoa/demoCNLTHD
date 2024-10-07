import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importing icons from react-icons
import { postRegister, postSendConfirmEmailCode } from "../../../services/authService";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const validateConfirmPassword = () => {
        if (password === confirmPassword)
            return true;
        else return false;
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            toast.error("Email không hợp lệ");
            return;
        }
        if (!validateConfirmPassword()) {
            toast.error("Xác nhận mật khẩu không chính xác");
            return;
        }


        try {
            let response = await postSendConfirmEmailCode(email, username);
            if (response && response.EC === 0) {
                navigate('/confirmCode', {
                    state: {
                        Email: email,
                        Username: username,
                        PasswordHash: password,
                        FirstName: firstname,
                        LastName: lastname,
                        purpose: 'register'
                    }
                })
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
    };


    return (
        <>
            <div className="login-container mt-2 mb-2 d-grid gap-2">
                <div className="login-container-content px-4 pb-4 pt-4">
                    <div className="title fs-2 fw-bold col-4 mx-auto text-center">
                        Đăng Ký
                    </div>
                    <div className="content-form col-3 mx-auto d-grid gap-3">
                        {/* Email input with form-floating */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingEmail"
                                placeholder="name@example.com"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                            <label htmlFor="floatingEmail">Email</label>
                        </div>

                        {/* Username input with form-floating */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingUsername"
                                placeholder="Tên người dùng"
                                onChange={(event) => setUsername(event.target.value)}
                                value={username}
                            />
                            <label htmlFor="floatingUsername">Username</label>
                        </div>

                        {/* Firstname input with form-floating */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingFirstname"
                                placeholder="First name"
                                onChange={(event) => setFirstname(event.target.value)}
                                value={firstname}
                            />
                            <label htmlFor="floatingFirstname">Tên</label>
                        </div>

                        {/* Lastname input with form-floating */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingLastname"
                                placeholder="Last name"
                                onChange={(event) => setLastname(event.target.value)}
                                value={lastname}
                            />
                            <label htmlFor="floatingLastname">Họ và tên đệm</label>
                        </div>

                        {/* Mật khẩu và xác nhận mật khẩu không thay đổi */}
                        <div className="form-group d-grid gap-2 mb-3">
                            <div className="d-flex align-items-center pass-container">
                                <div className="form-floating d-flex" style={{ flex: '9' }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Mật khẩu"
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                    />
                                    <label htmlFor="floatingPassword">Mật khẩu</label>
                                </div>
                                <button
                                    type="button"
                                    className="btn-toggle-pass"
                                    onClick={togglePasswordVisibility}
                                    style={{ borderLeft: "none" }}
                                >
                                    {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group d-grid gap-2 mb-3">
                            <div className="d-flex align-items-center pass-container">
                                <div className="form-floating d-flex" style={{ flex: '9' }}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        id="floatingConfirmPassword"
                                        placeholder="Xác nhận mật khẩu"
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        value={confirmPassword}
                                    />
                                    <label htmlFor="floatingConfirmPassword">Xác nhận mật khẩu</label>
                                </div>
                                <button
                                    type="button"
                                    className="btn-toggle-pass"
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ borderLeft: "none" }}
                                >
                                    {showConfirmPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                                </button>
                            </div>
                        </div>

                        <button className="btn btn-dark w-100 mt-2" onClick={() => handleRegister()}>Đăng ký</button>
                        <div className="text-center mt-3">
                            <Link to="/FindAccount">Quên mật khẩu</Link>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Register;
