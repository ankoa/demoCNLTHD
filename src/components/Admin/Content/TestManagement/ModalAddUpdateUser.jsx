import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdateUser = forwardRef(
    ({ handleAdd, handleUpdate }, ref) => {
        const [sh, setSh] = useState(false);
        const [actionType, setActionType] = useState('');

        const [formData, setFormData] = useState({
            "Id": 0,
            "Name": "",
            "Description": "",
            "Difficulty": "",
            "Duration": 0,
            "CreatedAt": "",
            "UpdatedAt": ""
        });

        // Truyền hàm open() qua ref để có thể gọi từ component cha
        useImperativeHandle(ref, () => ({ open }), []);

        const open = (data, action) => {
            setActionType(action);
            if (action === 'Update') {
                setFormData(data); // Điền dữ liệu vào form nếu là cập nhật
            } else {
                setFormData({
                    "Id": 0,
                    "Name": "",
                    "Description": "",
                    "Difficulty": "",
                    "Duration": 0,
                    "CreatedAt": "",
                    "UpdatedAt": ""
                });
            }
            setSh(true);
        };

        const handleCloseModal = () => {
            setSh(false);
            setActionType('');
            setFormData({
                "Id": 0,
                "Name": "",
                "Description": "",
                "Difficulty": "",
                "Duration": 0,
                "CreatedAt": "",
                "UpdatedAt": ""
            });
        };

        useEffect(() => {
            if (actionType === 'Add') {
                setFormData((prev) => ({ ...prev, id: 0 }));
            }
        }, [actionType]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            const updatedValue = name === 'Startdate' ? value.split('-').join('/') : value;
            setFormData({ ...formData, [name]: updatedValue });
        };

        const convertTypeOfDate = (str) => {
            if (!str) return '';
            const [year, month, day] = str.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (formData.Age <= 0) {
                alert('Invalid Age');
                return;
            }

            if (actionType === 'Add') {
                if (window.confirm('Are you sure you want to save this thing into the database?')) {
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
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Position">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="Position"
                                value={formData.Position}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Office">
                            <Form.Label>Office</Form.Label>
                            <Form.Control
                                type="text"
                                name="Office"
                                value={formData.Office}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="Age"
                                value={formData.Age}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Startdate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="Startdate"
                                value={formData.Startdate ? convertTypeOfDate(formData.Startdate) : ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="Salary"
                                value={formData.Salary}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="Status"
                                value={formData.Status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Pending">Pending</option>
                                <option value="Contract">Contract</option>
                            </Form.Select>
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
