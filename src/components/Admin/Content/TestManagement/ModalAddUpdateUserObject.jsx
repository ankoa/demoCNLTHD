import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddUpdateUserObject = forwardRef(({
    handleAddObject,
    handleEditObject,
}, ref) => {
    const [oldName, setOldName] = useState("");
    const [name, setName] = useState("");
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        occupation: '',
        nationality: ''
    });
    const [show, setShow] = useState(false);
    const [actionType, setActionType] = useState("");

    // Truyền hàm open() qua ref để có thể gọi từ component cha
    useImperativeHandle(ref, () => ({ handleOpenModal }), []);

    const [nations, setNations] = useState([]); // State lưu danh sách quốc gia
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nationality") {
            setFormData({
                ...formData,
                [name]: { [`${name}1`]: value },  // Sử dụng template string cho tên thuộc tính động
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleOpenModal = (data, action) => {
        setActionType(action);
        if (action === 'Update') {
            const key = data.key; // Giả sử dataUpdateObject có key
            setOldName(key);
            setName(key);
            setFormData(data[key]);
        } else {
            setOldName('');
            setName('');
            setFormData({
                age: '',
                height: '',
                weight: '',
                gender: '',
                occupation: '',
                nationality: ''
            });
        }
        setShow(true);
    }

    const handleCloseModal = () => {
        setShow(false);
        // setDataUpdate(null);
        setActionType('');
        // setFormData({
        //     id: lastid + 1,
        //     Name: '',
        //     Position: '',
        //     Office: '',
        //     Age: '',
        //     Startdate: '',
        //     Salary: '',
        //     Status: 'Full-Time',
        // });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.age <= 0) {
            alert("Invalid Age");
            return;
        }

        if (actionType === "Add") {
            if (window.confirm('Are you sure you want to save this user into the database?')) {
                handleAddObject(name, formData);
            }
        } else if (actionType === "Update") {
            if (window.confirm('Are you sure you want to update this user?')) {
                handleEditObject(name, oldName, formData);
            }
        }

        handleCloseModal();
    };

    return (
        <Modal className='mt-5' show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === "Add" ? "Add New User" : "Update User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-5 pt-2' style={{ height: '500px', overflowY: 'scroll' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="height">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="weight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="occupation">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {
                        actionType === "Add" ? (<Form.Group className="mb-3" controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control
                                as="select"
                                className="selectpicker"
                                name="nationality"
                                value={formData.nationality.nationality1}
                                onChange={handleChange}
                                required
                                data-live-search="true"
                            >
                                <option value="">-- Select Nation --</option>
                                {nations.map((nation, index) => (
                                    <option key={index} value={nation}>
                                        {nation}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>)
                            : ""

                    }

                    <Button variant="primary" type="submit">
                        {actionType === "Add" ? "Add User" : "Update User"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default ModalAddUpdateUserObject;
