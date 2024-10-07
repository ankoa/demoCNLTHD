import { Card } from 'react-bootstrap';
import './FindAccount.scss'
import { postCheckAccountExist } from '../../../services/authService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FindAccount = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleFindAccount = async () => {
        if (!email) {
            toast.error("Pleasr fill out email");
            return;
        }

        try {
            let response = await postCheckAccountExist(email);
            if (response && response.EC === 0) {
                navigate("/resetPassword", {
                    state: { Email: email, User: response.DT },
                });
            } else if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
        }
    }

    return (
        <div className="container px-5 d-flex justify-content-center">
            <Card>
                <Card.Header className='fs-4 text-start' style={{ fontWeight: '600' }}>Tìm tài khoản của bạn</Card.Header>
                <Card.Body >
                    <div className='px-3'>
                        <div className='mb-3'>Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.</div>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder='Email của bạn...'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email} />
                    </div>

                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-3">Hủy</button>
                        <button className="btn btn-primary" onClick={() => { handleFindAccount() }}>Tìm kiếm</button>
                    </div>
                </Card.Footer>
            </Card>

        </div>
    );
}

export default FindAccount;