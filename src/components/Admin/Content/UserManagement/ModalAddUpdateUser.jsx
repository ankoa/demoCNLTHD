import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdateUser = forwardRef(
    ({ handleAdd, handleUpdate }, ref) => {
        const [sh, setSh] = useState(false);
        const [actionType, setActionType] = useState('');
        const [selectedRole, setSelectedRole] = useState(''); // Lưu giá trị role đã chọn
        const [formData, setFormData] = useState({
            UserID: 0,
            Username: "",
            Email: "",
            FirstName: "",
            LastName: "",
            CreatedAt: "",
            NewPass: ""
        });

        // Danh sách roles cố định
        const roles = [
            { RoleID: 2, RoleName: 'User' },
            { RoleID: 3, RoleName: 'Staff' },
            { RoleID: 1, RoleName: 'Admin' }
        ];

        // Hàm cập nhật selectedRole khi load form
        useEffect(() => {
            if (actionType === 'Update') {
                // Gán selectedRole dựa trên dữ liệu user đã có
                setSelectedRole(formData.RoleID);
            }
        }, [formData, actionType]);

        // Hàm thay đổi selectedRole
        const handleRoleChange = (event) => {
            setSelectedRole(event.target.value);
        };

        // Mở modal với dữ liệu
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
                    NewPass: "",
                    RoleID: data.roles[0].RoleID // Gán RoleID từ dữ liệu
                });
            } else {
                setFormData({
                    UserID: 0,
                    Username: "",
                    Email: "",
                    FirstName: "",
                    LastName: "",
                    CreatedAt: new Date().toISOString(),
                    NewPass: "",
                    RoleID: 2 // Không có role khi thêm mới
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
                CreatedAt: "",
                NewPass: ""
            });
            setSelectedRole('');
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (actionType === 'Add') {
                if (window.confirm('Are you sure you want to add this user?')) {
                    handleAdd({ ...formData, RoleID: selectedRole });
                }
            } else if (actionType === 'Update') {
                if (window.confirm('Are you sure you want to update this user?')) {
                    handleUpdate({ ...formData, RoleID: selectedRole });
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
                                disabled={actionType === 'Update'}
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

                        <Form.Group className="mb-3" controlId="Role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={selectedRole} // Gán selectedRole khi load form
                                onChange={handleRoleChange} // Hàm xử lý thay đổi role
                            >
                                {roles.map((role, index) => (
                                    <option key={index} value={role.RoleID}>
                                        {role.RoleName}
                                    </option>
                                ))}
                            </Form.Select>
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
