import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalAddUpdateNation = forwardRef(({ handleAddNation, handleEditNation }, ref) => {
    const [formData, setFormData] = useState({ Name: "" });
    const [nations, setNations] = useState([]); // State lưu danh sách quốc gia
    const [show, setShow] = useState(false);
    const [actionType, setActionType] = useState("");
    const [dataNation, setDataNation] = useState("");
    const [keyData, setKeyData] = useState("");

    useImperativeHandle(ref, () => ({ handleOpen }), []);

    // Gọi API lấy danh sách quốc gia
    useEffect(() => {
        const fetchNations = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryNames = response.data.map((country) => country.name.common);
                setNations(countryNames); // Lưu danh sách quốc gia vào state
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchNations();
    }, []);

    // Cập nhật form khi actionType thay đổi
    useEffect(() => {
        if (actionType === "Update" && dataNation && show) {
            setFormData({ Name: dataNation[dataNation.key1] });
        } else {
            setFormData({ Name: "" });
        }
    }, [actionType, dataNation, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpen = (keydata, dataNation, action) => {
        if (action === "Add") {
            setFormData({ Name: "" });
            setActionType("Add")
            setKeyData(keydata);
        }
        else {
            setDataNation(dataNation);
            setKeyData(keydata);
            setActionType("Update")
            setFormData({ Name: dataNation[dataNation.key1] });
        }
        setShow(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (actionType === "Add") {
            handleAddNation(keyData, formData.Name);
        } else if (actionType === "Update") {
            handleEditNation(keyData, dataNation, formData.Name);
        }
        handleClose(); // Đóng modal
    };

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal className="mt-5" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === "Add" ? "Add New Nation" : "Update Nation"} For {keyData}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 pt-2">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Nation</Form.Label>
                        <Form.Control
                            as="select"
                            className="selectpicker"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            data-live-search="true"
                        >
                            <option value="">Select Nation</option>
                            {nations.map((nation, index) => (
                                <option key={index} value={nation}>
                                    {nation}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default ModalAddUpdateNation;
