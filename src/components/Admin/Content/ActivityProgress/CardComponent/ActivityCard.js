import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsThreeDotsVertical } from "react-icons/bs";

const ActivityCard = () => {
    return (
        <Card className='h-100'>
            <Card.Header>Recent Activity
                <button className='btn btn-transparent-dark btn-icon'><BsThreeDotsVertical></BsThreeDotsVertical></button>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default ActivityCard;