import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form, Stack, Badge } from 'react-bootstrap';
import './ModalAddUpdateUser.scss'

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
            CreatedAt: "",
            NewPass: ""
        });

        const [role, setRole] = useState([]);

        // Truyền hàm open() qua ref để có thể gọi từ component cha
        useImperativeHandle(ref, () => ({ open }), []);

        const open = (data, action) => {
            setActionType(action);
            if (action === 'Update') {
                setFormData({
                    UserID: data.user.UserID,
                    Username: data.user.Username,
                    Email: data.user.Email,
                    FirstName: data.user.FirstName,
                    LastName: data.user.LastName,
                    CreatedAt: data.user.CreatedAt,
                    NewPass: ""
                });
                setRole(data.roles);
                console.log(data);
            } else {
                setFormData({
                    UserID: 0,
                    Username: "",
                    Email: "",
                    FirstName: "",
                    LastName: "",
                    CreatedAt: new Date().toISOString(),
                    NewPass: ""
                });
                setRole([]);
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
                CreatedAt: "",
                NewPass: ""
            });
            setRole([]);
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
                        {actionType === 'Update' && (
                            <Form.Group className="mb-3" controlId="UserID">
                                <Form.Label>UserID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="UserID"
                                    value={formData.UserID}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="Username"
                                value={formData.Username}
                                onChange={handleChange}
                                disabled={actionType === 'Update'}
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

                        {actionType === 'Add' && (
                            <Form.Group className="mb-3" controlId="NewPass">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="NewPass"
                                    value={formData.NewPass}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        {/* <Form.Group className="mb-3" controlId="CreatedAt">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control
                                type="text"
                                name="CreatedAt"
                                value={new Date(formData.CreatedAt).toLocaleString("vi-VN")}
                                disabled
                            />
                        </Form.Group> */}


                        <Form.Group className="mb-3" controlId="Role">
                            <Form.Label>Role</Form.Label>
                            <div className='d-flex flex-wrap'>
                                {role.map((role, index) => (
                                    <Badge
                                        key={index}
                                        bg="primary"
                                        className="role-badge"
                                    >
                                        {role.RoleName}
                                        <span
                                            onClick={() => handleDeleteRole(index)} // Hàm xóa role
                                            className="badge-delete-icon"
                                        >
                                            × {/* Hoặc dùng icon X */}
                                        </span>
                                    </Badge>
                                ))}
                            </div>
                        </Form.Group>


                        <Button variant="primary" type="submit" style={{ margin: 'auto' }}>
                            {actionType === 'Add' ? 'Add User' : 'Update User'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
);

export default ModalAddUpdateUser;
