import { Button, Card } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { LuDollarSign, LuMessageCircle } from "react-icons/lu";
import './Memo.scss'

const Memo = () => {
    return (
        <div className="row">
            <div className="col-lg-6 col-xl-3 mb-4 memo-card">
                <Card className="bg-primary text-white h-100">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                            <div className="text-white-75 small">Earnings (Monthly)</div>
                            <div className="text-lg fw-bold">$40,000</div>
                        </div>
                        <CiCalendar style={{ fontSize: '40px' }}></CiCalendar>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center small" style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                        <a>View Report</a>
                        <IoIosArrowForward />
                    </Card.Footer>
                </Card>
            </div>
            <div className="col-lg-6 col-xl-3 mb-4">
                <Card className="bg-warning text-white h-100">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                            <div className="text-white-75 small">Earnings (Anually)</div>
                            <div className="text-lg fw-bold">$40,000</div>
                        </div>
                        <LuDollarSign style={{ fontSize: '40px' }}></LuDollarSign>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center small" style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                        <a>View Report</a>
                        <IoIosArrowForward />
                    </Card.Footer>
                </Card>
            </div>
            <div className="col-lg-6 col-xl-3 mb-4 memo-card">
                <Card className="bg-success text-white h-100">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                            <div className="text-white-75 small">Task Completion</div>
                            <div className="text-lg fw-bold">24</div>
                        </div>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center small" style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                        <a>View Tasks</a>
                        <IoIosArrowForward />
                    </Card.Footer>
                </Card>
            </div>
            <div className="col-lg-6 col-xl-3 mb-4">
                <Card className="bg-danger text-white h-100">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                            <div className="text-white-75 small">Pending Requests</div>
                            <div className="text-lg fw-bold">17</div>
                        </div>
                        <LuMessageCircle style={{ fontSize: '40px' }}></LuMessageCircle>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center small" style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                        <a>View Requests</a>
                        <IoIosArrowForward />
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}

export default Memo;