import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdateUser = forwardRef(
    ({ handleAdd, handleUpdate }, ref) => {
        const [sh, setSh] = useState(false);
        const [actionType, setActionType] = useState('');

        const [formData, setFormData] = useState({
            UserID: 0,
            Username: "",
            Email: "",
            FirstName: "",
            LastName: "",
            CreatedAt: ""
        });

        const [role, setRole] = useState();

        // Truyền hàm open() qua ref để có thể gọi từ component cha
        useImperativeHandle(ref, () => ({ open }), []);

        const open = (data, action) => {
            setActionType(action);
            if (action === 'Update') {
                setFormData(data.user); // Điền dữ liệu vào form nếu là cập nhật
                setRole(data.roles);
            } else {
                setFormData({
                    UserID: 0,
                    Username: "",
                    Email: "",
                    FirstName: "",
                    LastName: "",
                    CreatedAt: new Date().toISOString()
                });
            }
            setSh(true);
        };

        const handleCloseModal = () => {
            setSh(false);
            setActionType('');
            setFormData({
                UserID: 0,
                Username: "",
                Email: "",
                FirstName: "",
                LastName: "",
                CreatedAt: ""
            });
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (actionType === 'Add') {
                if (window.confirm('Are you sure you want to add this user?')) {
                    handleAdd(formData);
                }
            } else if (actionType === 'Update') {
                if (window.confirm('Are you sure you want to update this user?')) {
                    handleUpdate(formData);
                }
            }
            handleCloseModal();
        };

        return (
            <Modal className="mt-5" show={sh} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === 'Add' ? 'Add New User' : 'Update User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-5 pt-2" style={{ height: '500px', overflowY: 'scroll' }}>
                    <Form onSubmit={handleSubmit}>
                        {actionType === 'Add' ? '' : (<Form.Group className="mb-3" controlId="UserID">
                            <Form.Label>UserID</Form.Label>
                            <Form.Control
                                type="number"
                                name="UserID"
                                value={formData.UserID}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Group>)}


                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="Username"
                                value={formData.Username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="CreatedAt">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control
                                type="text"
                                name="CreatedAt"
                                value={new Date(formData.CreatedAt).toLocaleString("vi-VN")}
                                disabled
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {actionType === 'Add' ? 'Add User' : 'Update User'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
);

export default ModalAddUpdateUser;
