import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Modal.scss"
import { getAnswerOfQuestion } from '../../../../services/partService';

const ModalAddUpdatePart = forwardRef(({ handleAddPart, handleUpdatePart, parts }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [previewImage, setPreviewImage] = useState(null); // Track preview image
    const [formData, setFormData] = useState({
        Id: 0,
        Number: "",
        Description: "",
        Text: "",
        AudioFile: null,
        ImageFile: null,
        AudioPath: "",
        ImagePath: "",
        AnswerCounts: 0,
        CreatedAt: "",
        UpdatedAt: ""
    });
    const [listAnswer, setListAnswer] = useState([]);

    useImperativeHandle(ref, () => ({
        open
    }), []);

    useEffect(() => {

    }, []);

    const fetchAnswerOfQuestion = async (questionId) => {
        try {
            let response = await getAnswerOfQuestion(id);
            if (response && response.EC === 0) {
                console.log(response.DT.questions);
                setData(response.DT.questions);
            } else if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.EM || "Đã xảy ra lỗi");
            } else {
                console.error("L strugglNotFound xác định:", error);
            }
        }
    }

    const open = (data, action) => {
        setActionType(action);
        if (action === 'Update') {
            setFormData({
                ...data,
                AudioFile: null,
                ImageFile: null,
                AudioPath: data.AudioPath || "",
                ImagePath: data.ImagePath || ""
            });
            setPreviewImage(data.ImagePath || null); // Set preview from existing data if available
        } else {
            setFormData({
                Id: 0,
                Number: "",
                Description: "",
                Text: "",
                AudioFile: null,
                ImageFile: null,
                AudioPath: "",
                ImagePath: "",
                AnswerCounts: 0,
                CreatedAt: "",
                UpdatedAt: ""
            });
            setPreviewImage(null); // Reset preview image on new entry
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActionType('');
        setFormData({
            Id: 0,
            Number: "",
            Description: "",
            Text: "",
            AudioFile: null,
            ImageFile: null,
            AudioPath: "",
            ImagePath: "",
            AnswerCounts: 0,
            CreatedAt: "",
            UpdatedAt: ""
        });
        setPreviewImage(null);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [name]: file }));
            setPreviewImage(URL.createObjectURL(file)); // Set preview image to selected file
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const partData = {
            ...formData,
            AudioPath: formData.AudioFile ? URL.createObjectURL(formData.AudioFile) : formData.AudioPath,
            ImagePath: formData.ImageFile ? URL.createObjectURL(formData.ImageFile) : formData.ImagePath,
        };

        if (actionType === 'Add') {
            if (window.confirm('Are you sure you want to save this part into the database?')) {
                handleAddPart(partData);
            }
        } else if (actionType === 'Update') {
            if (window.confirm('Are you sure you want to update this part?')) {
                handleUpdatePart(partData);
            }
        }
        handleCloseModal();
    };

    return (
        <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'Add' ? 'Add New Question' : 'Update Question'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 pt-2" style={{ height: '500px', overflowY: 'scroll' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Number">
                        <Form.Label>Question Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="Text"
                            value={formData.Order}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Text">
                        <Form.Label>Question Text</Form.Label>
                        <Form.Control
                            type="text"
                            name="Text"
                            value={formData.Text}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="AudioPath">
                        <Form.Label>Audio File</Form.Label>
                        <Form.Control
                            type="file"
                            name="AudioFile"
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                        {formData.AudioFile ? (
                            <div className="mt-2">
                                <audio controls>
                                    <source src={URL.createObjectURL(formData.AudioFile)} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : formData.AudioPath && (
                            <div className="mt-2 mt-3">
                                <audio controls style={{ width: '100%' }}>
                                    <source src={formData.AudioPath} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="ImagePath">
                        <Form.Label>Image File</Form.Label>
                        <Form.Control
                            type="file"
                            name="ImageFile"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <div className='col-md-12 card img-preview mt-3'>
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                        ) : (
                            <span>Preview image</span>
                        )}
                    </div>

                    <Form.Group className="mb-3 mt-3" controlId="AnswerCounts">
                        <Form.Label>Answers</Form.Label>
                        <Form.Control
                            type="number"
                            max={4}
                            min={3}
                            name="AnswerCounts"
                            value={formData.AnswerCounts}
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
