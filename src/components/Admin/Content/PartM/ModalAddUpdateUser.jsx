import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdateUser = forwardRef(
    ({ handleAdd, handleUpdate }, ref) => {
        const [sh, setSh] = useState(false);
        const [actionType, setActionType] = useState('');

        const [formData, setFormData] = useState({
            Id: 0,
            Name: "",
            Description: "",
            Difficulty: "",
            Duration: 0,
            CreatedAt: "",
            UpdatedAt: ""
        });

        // Truyền hàm open() qua ref để có thể gọi từ component cha
        useImperativeHandle(ref, () => ({ open }), []);

        const open = (data, action) => {
            setActionType(action);
            if (action === 'Update') {
                setFormData(data); // Điền dữ liệu vào form nếu là cập nhật
            } else {
                setFormData({
                    Id: 0,
                    Name: "",
                    Description: "",
                    Difficulty: "",
                    Duration: 0,
                    CreatedAt: "",
                    UpdatedAt: ""
                });
            }
            setSh(true);
        };

        const handleCloseModal = () => {
            setSh(false);
            setActionType('');
            setFormData({
                Id: 0,
                Name: "",
                Description: "",
                Difficulty: "",
                Duration: 0,
                CreatedAt: "",
                UpdatedAt: ""
            });
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (actionType === 'Add') {
                if (window.confirm('Are you sure you want to save this test into the database?')) {
                    handleAdd(formData);
                }
            } else if (actionType === 'Update') {
                if (window.confirm('Are you sure you want to update this test?')) {
                    handleUpdate(formData);
                }
            }
            handleCloseModal();
        };

        return (
            <Modal className="mt-5" show={sh} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === 'Add' ? 'Add New Test' : 'Update Test'}</Modal.Title>
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

                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Difficulty">
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Select
                                name="Difficulty"
                                value={formData.Difficulty}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Duration">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                name="Duration"
                                value={formData.Duration}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {actionType === 'Add' ? 'Add Record' : 'Update Record'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
);

export default ModalAddUpdateUser;
