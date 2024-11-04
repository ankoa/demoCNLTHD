import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { postResetPassword } from "../../services/authService";

const ChangePassword = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dataResetPassword = location.state;
    const purpose = dataResetPassword.purpose;

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    const validateNewPassword = () => {
        if (newPassword === confirmNewPassword)
            return true;
        else return false;
    };

    const handlePasswordChange = async () => {
        if (!validateNewPassword()) {
            toast.error("Xác nhận mật khẩu không chính xác");
            return;
        }

        if (purpose === "reset-password") {
            try {
                let response = await postResetPassword(dataResetPassword.Email, dataResetPassword.Token, newPassword);
                if (response && response.EC === 0) {
                    toast.success(response.EM);
                } else if (response && response.EC !== 0) {
                    toast.error(response.EM);
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.EM || "Đã xảy ra lỗi trong quá trình đổi mật khẩu.");
                } else {
                    console.error("Lỗi không xác định:", error);
                }
            }
        }
    };

    return (
        <div className="login-container mt-2 mb-2 d-grid gap-2">
            <div className="login-container-content px-4 pb-4 pt-4">
                <div className="title fs-2 fw-bold col-4 mx-auto text-center">
                    Đổi mật khẩu
                </div>
                <div className="content-form col-3 mx-auto d-grid gap-3">
                    {/* Email hoặc Username */}
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingEmailOrUsername"
                            placeholder="Email hoặc Username"
                            onChange={(event) => setEmailOrUsername(event.target.value)}
                            value={purpose === 'reset-password' ? dataResetPassword.Email : emailOrUsername}
                            disabled={purpose === 'reset-password'}
                        />

                        <label htmlFor="floatingEmailOrUsername">Email hoặc Username</label>
                    </div>

                    {/* Mật khẩu cũ */}
                    <div className={`form-group d-grid gap-2 mb-3 ${purpose === 'reset-password' ? 'd-none' : ''}`}>
                        <div className="d-flex align-items-center pass-container">
                            <div className="form-floating d-flex" style={{ flex: '9' }}>
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    className="form-control"
                                    id="floatingOldPassword"
                                    placeholder="Mật khẩu cũ"
                                    onChange={(event) => setOldPassword(event.target.value)}
                                    value={oldPassword}
                                />
                                <label htmlFor="floatingOldPassword">Mật khẩu cũ</label>
                            </div>
                            <button
                                type="button"
                                className="btn-toggle-pass"
                                onClick={toggleOldPasswordVisibility}
                                style={{ borderLeft: "none" }}
                            >
                                {showOldPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                            </button>
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div className="form-group d-grid gap-2 mb-3">
                        <div className="d-flex align-items-center pass-container">
                            <div className="form-floating d-flex" style={{ flex: '9' }}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    id="floatingNewPassword"
                                    placeholder="Mật khẩu mới"
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    value={newPassword}
                                />
                                <label htmlFor="floatingNewPassword">Mật khẩu mới</label>
                            </div>
                            <button
                                type="button"
                                className="btn-toggle-pass"
                                onClick={toggleNewPasswordVisibility}
                                style={{ borderLeft: "none" }}
                            >
                                {showNewPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                            </button>
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div className="form-group d-grid gap-2 mb-3">
                        <div className="d-flex align-items-center pass-container">
                            <div className="form-floating d-flex" style={{ flex: '9' }}>
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    className="form-control"
                                    id="floatingConfirmNewPassword"
                                    placeholder="Xác nhận mật khẩu mới"
                                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                                    value={confirmNewPassword}
                                />
                                <label htmlFor="floatingConfirmNewPassword">Xác nhận mật khẩu mới</label>
                            </div>
                            <button
                                type="button"
                                className="btn-toggle-pass"
                                onClick={toggleConfirmNewPasswordVisibility}
                                style={{ borderLeft: "none" }}
                            >
                                {showConfirmNewPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-dark w-100 mt-2" onClick={() => handlePasswordChange()} >Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
