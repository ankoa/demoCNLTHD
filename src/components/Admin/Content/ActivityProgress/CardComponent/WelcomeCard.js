import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const WelcomeCard = () => {
    return (
        <Card className='h-100'>
            <Card.Body className='h-100 p-5'>
                <div className='row align-items-center'>
                    <div className='col-xl-8 col-xxl-12 mb-4 text-center text-xl-start text-xxl-center mb-xl-0 mb-xxl-4'>
                        <Card.Title className='h5 text-primary fs-3'>Welcome to SB Admin Pro!</Card.Title>
                        <Card.Text className='mt-3 text-gray-700 mb-0'>
                            Browse our fully designed UI toolkit!
                            Browse our prebuilt app pages, components, and utilites, and be sure to look at our full documentation!
                        </Card.Text>
                    </div>
                    <div className='col-xl-4 col-xxl-12 text-center'>
                        <img class="img-fluid" src="https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/at-work.svg" style={{ maxWidth: '26rem' }} />
                    </div>

                </div>

            </Card.Body>
        </Card>
    );
}

export default WelcomeCard;