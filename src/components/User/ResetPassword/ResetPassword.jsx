import { Card } from 'react-bootstrap';
import './ResetPassword.scss'
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postSendResetCode } from '../../../services/authService';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const dataFromFindAccount = location.state;

    const handleSendResetCode = async () => {
        try {
            let response = await postSendResetCode(dataFromFindAccount.Email);
            if (response && response.EC === 0) {
                navigate('/confirmCode', {
                    state: {
                        Email: dataFromFindAccount.Email,
                        purpose: 'reset-password'
                    }
                })
                toast.warning("Mã code sẽ hết hạn trong 2 phút");
            } else if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
        }
    }

    return (
        <div className="ResetPassword pb-5 pt-5 container px-5 d-flex justify-content-center">
            <Card style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, .1), 0 2px 4px rgba(0, 0, 0, .1)' }}>
                <Card.Header className='ResetPassword-header fs-5 text-start'>Chúng tôi sẽ gửi mã đến email của bạn</Card.Header>
                <Card.Body className='ResetPassword-body' >
                    <div className='ResetPassword-body-content d-flex justify-content-between'>
                        <div className='ResetPassword-body-content-left text-start' style={{ paddingRight: '80px', paddingLeft: '20px' }}>
                            <div className='ResetPassword-body-content-left-text'>Chúng tôi có thể gửi mã đăng nhập đến: </div>
                            <div className='ResetPassword-body-content-left-email'>{dataFromFindAccount.Email} </div>
                        </div>
                        <div className="ResetPassword-body-content-right d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
                            <FaUserCircle size={50} />
                            <div className="ResetPassword-body-content-right-text">
                                <div className="ResetPassword-body-content-right-text-username">{dataFromFindAccount.User.Username}</div>
                                <div className="ResetPassword-body-content-right-text-subtext text-muted">Người dùng facebook</div>
                                <a href="#" className="ResetPassword-body-content-right-text-notyou text-primary">Không phải bạn?</a>
                            </div>
                        </div>
                    </div>


                </Card.Body>
                <Card.Footer className="ResetPassword-footer text-muted">
                    <div className="ResetPassword-footer-content d-flex justify-content-between align-items-center">
                        <a className='ResetPassword-footer-content-link text-primary'
                            onClick={() => navigate("/login", {
                                state: { newEmail: dataFromFindAccount.email },
                            })}
                        >Đăng nhập bằng mật khẩu</a>
                        <div className='ResetPassword-footer-content-btn'>
                            <button className="btn btn-secondary fw-bold">Thử cách khác</button>
                            <button className="btn btn-primary ms-3 fw-bold" onClick={() => handleSendResetCode()}>Tiếp tục</button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

        </div>
    );
}

export default ResetPassword;