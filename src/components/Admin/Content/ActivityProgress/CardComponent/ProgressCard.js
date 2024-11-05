import { Button, ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";


const ProgressCard = () => {
    return (
        <Card className='h-100'>
            <Card.Header>Progress Tracker
                <button className='btn btn-transparent-dark btn-icon'><BsThreeDotsVertical></BsThreeDotsVertical></button>
            </Card.Header>
            <Card.Body>
                <h4 class="small">Server Migration
                    <span class="float-end fw-bold">20%</span>
                </h4>
                <ProgressBar className='mb-4' variant="danger" now={20} />
                <h4 class="small">Server Tracking
                    <span class="float-end fw-bold">40%</span>
                </h4>
                <ProgressBar className='mb-4' variant="warning" now={40} />
                <h4 class="small">Customer Database
                    <span class="float-end fw-bold">60%</span>
                </h4>
                <ProgressBar className='mb-4' variant="info" now={60} />
                <h4 class="small">Payout Details
                    <span class="float-end fw-bold">80%</span>
                </h4>
                <ProgressBar className='mb-4' variant="danger" now={80} />
                <h4 class="small">Account Setup
                    <span class="float-end fw-bold">Complete!</span>
                </h4>
                <ProgressBar className='mb-4' variant="success" now={100} />
            </Card.Body>
            <Card.Footer className="d-flex align-items-center small" style={{ cursor: 'pointer', justifyContent: 'space-between', height: '3rem' }}>
                <a>View Tasks Center</a>
                <IoIosArrowForward />
            </Card.Footer>
        </Card>
    );
}

export default ProgressCard;