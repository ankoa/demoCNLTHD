import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdatePart = forwardRef(({ handleAddPart, handleUpdatePart, parts }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    console.log(parts)
    const [formData, setFormData] = useState({
        Id: 0,
        PartId: "", // Thay thế Name bằng PartId để lưu giá trị đã chọn từ Select
        Description: "",
        CreatedAt: "",
        UpdatedAt: ""
    });

    // Truyền hàm open() qua ref để có thể gọi từ component cha
    useImperativeHandle(ref, () => ({
        open
    }), []);

    const open = (data, action) => {
        setActionType(action);
        if (action === 'Update') {
            setFormData(data); // Điền dữ liệu vào form nếu là cập nhật
        } else {
            // Thiết lập dữ liệu trống cho form nếu là thêm mới
            setFormData({
                Id: 0,
                PartId: "",
                Description: "",
                CreatedAt: "",
                UpdatedAt: ""
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActionType('');
        setFormData({
            Id: 0,
            PartId: "",
            Description: "",
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
            if (window.confirm('Are you sure you want to save this part into the database?')) {
                handleAddPart(formData);
            }
        } else if (actionType === 'Update') {
            if (window.confirm('Are you sure you want to update this part?')) {
                handleUpdatePart(formData);
            }
        }
        handleCloseModal();
    };

    return (
        <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'Add' ? 'Add New Part' : 'Update Part'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 pt-2" style={{ height: '500px', overflowY: 'scroll' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Part">
                        <Form.Label>Part</Form.Label>
                        <Form.Select
                            name="PartId"
                            value={formData.PartId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Part</option>
                            {parts.map(part => (
                                <option key={part} value={part}>
                                    Part {part}
                                </option>
                            ))}
                        </Form.Select>
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

                    <Button className='mx-auto' variant="primary" type="submit">
                        {actionType === 'Add' ? 'Add Part' : 'Update Part'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default ModalAddUpdatePart;
