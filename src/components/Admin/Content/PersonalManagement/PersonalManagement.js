import { Button, Pagination, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsThreeDotsVertical } from "react-icons/bs";

const PersonalManagement = () => {
    return (
        <Card className='mb-4'>
            <Card.Header>Personnel Management
                <button className='btn btn-transparent-dark btn-icon'><BsThreeDotsVertical></BsThreeDotsVertical></button>
            </Card.Header>
            <Card.Body>
                <div className='data-table-container'>
                    <div className='data-table-top mb-3 d-flex justify-content-between'>
                        <div class="data-table-dropdown">
                            <label className='me-2'>
                                <select class="data-table-selector form-select">
                                    <option value="5">5</option>
                                    <option value="10" selected="">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                </select>
                            </label>
                            entries per page
                        </div>
                        <input style={{ width: '10rem' }} type="text" class="form-control" placeholder="Search"></input>
                    </div>
                    <div className='data-table-main'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan={2}>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='data-table-bottom d-flex justify-content-between '>
                        <div className='data-table-infor'>
                            Showing 1 to 5 of 57 entries
                        </div>
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PersonalManagement;