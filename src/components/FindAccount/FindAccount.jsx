import { Card } from 'react-bootstrap';
import './FindAccount.scss'

const FindAccount = () => {
    return (
        <div className="container px-5 d-flex justify-content-center">
            <Card>
                <Card.Header className='fs-3'>Tìm tài khoản của bạn</Card.Header>
                <Card.Body >
                    <div className='px-3'>
                        <div className='mb-3'>Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.</div>
                        <input type="text" className="form-control mb-3" placeholder='Email của bạn...' />
                    </div>

                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-3">Hủy</button>
                        <button className="btn btn-primary">Tìm kiếm</button>
                    </div>
                </Card.Footer>
            </Card>

        </div>
    );
}

export default FindAccount;