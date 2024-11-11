import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaMinusCircle } from 'react-icons/fa';
import './Modal.scss';
import { getAnswerOfQuestion } from '../../../../services/partService';

const ModalAddUpdatePart = forwardRef(({ handleAddPart, handleUpdatePart, parts }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        Id: 0,
        Number: '',
        Description: '',
        Text: '',
        AudioFile: null,
        ImageFile: null,
        AudioPath: '',
        ImagePath: '',
        AnswerCounts: 0,
        CreatedAt: '',
        UpdatedAt: ''
    });
    const [listAnswer, setListAnswer] = useState([]); // Make sure it's an array of answers

    useImperativeHandle(ref, () => ({
        open
    }));

    useEffect(() => {
        if (showModal) {
            fetchAnswerOfQuestion(formData.Id);
        }
    }, [formData.Id]);

    const fetchAnswerOfQuestion = async (questionId) => {
        try {
            const response = await getAnswerOfQuestion(questionId);
            if (response && response.EC === 0) {
                console.log(response.DT.answers);
                setListAnswer(response.DT.answers || []);
            } else if (response) {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error(error.response?.data.EM || 'An error occurred');
        }
    };

    const open = (data, action) => {
        setActionType(action);
        if (action === 'Update') {
            setFormData({
                ...data,
                AudioFile: null,
                ImageFile: null,
                AudioPath: data.AudioPath || '',
                ImagePath: data.ImagePath || ''
            });
            setPreviewImage(data.ImagePath || null);
        } else {
            setFormData({
                Id: 0,
                Number: '',
                Description: '',
                Text: '',
                AudioFile: null,
                ImageFile: null,
                AudioPath: '',
                ImagePath: '',
                AnswerCounts: 0,
                CreatedAt: '',
                UpdatedAt: ''
            });
            setPreviewImage(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActionType('');
        setFormData({
            Id: 0,
            Number: '',
            Description: '',
            Text: '',
            AudioFile: null,
            ImageFile: null,
            AudioPath: '',
            ImagePath: '',
            AnswerCounts: 0,
            CreatedAt: '',
            UpdatedAt: ''
        });
        setPreviewImage(null);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [name]: file }));
            setPreviewImage(name === 'ImageFile' ? URL.createObjectURL(file) : previewImage);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAnswer = () => {
        if (listAnswer.length >= 4) {
            toast.error("You can only add up to 4 answers.");
            return;
        }
        setListAnswer([
            ...listAnswer,  // Giữ lại các câu trả lời cũ
            {
                "Id": -1,  // Tạo Id mới
                "QuestionID": formData.Id,
                "Text": "",
                "IsCorrect": false
            }
        ]);
    };


    const handleAnswerTextChange = (index, value) => {
        const updatedAnswers = listAnswer.map((answer, idx) =>
            idx === index ? { ...answer, description: value } : answer
        );
        setListAnswer(updatedAnswers); // Update state with the modified answers
    };

    const handleCorrectAnswerChange = (index) => {
        const updatedAnswers = listAnswer.map((answer, idx) => ({
            ...answer,
            IsCorrect: idx === index
        }));
        setListAnswer(updatedAnswers); // Update state with the new correct answer
    };

    const handleRemoveAnswer = (index) => {
        const updatedAnswers = listAnswer.filter((_, idx) => idx !== index);
        setListAnswer(updatedAnswers); // Remove the answer at the specified index
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const partData = {
            ...formData,
            AudioPath: formData.AudioFile ? URL.createObjectURL(formData.AudioFile) : formData.AudioPath,
            ImagePath: formData.ImageFile ? URL.createObjectURL(formData.ImageFile) : formData.ImagePath
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
                            name="Number"
                            value={formData.Order}
                            onChange={handleChange}
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
                            <audio controls src={URL.createObjectURL(formData.AudioFile)} className="mt-2" />
                        ) : (
                            formData.AudioPath && <audio controls src={formData.AudioPath} className="mt-2" />
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
                    <div className="col-md-12 card img-preview mt-3">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                        ) : (
                            <span>Preview image</span>
                        )}
                    </div>
                    <Form.Group className="mb-3 mt-3" controlId="AnswerCounts">
                        <Form.Label>Answers <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            onClick={() => handleAddAnswer()}
                        >
                            Add Answer
                        </button></Form.Label>
                    </Form.Group>
                    {listAnswer.map((answer, index) => (
                        <div key={index} className="row align-items-center mb-3">
                            <div className="col-auto">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={answer.IsCorrect}
                                    onChange={() => handleCorrectAnswerChange(index)}
                                />
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Answer ${index + 1}`}
                                    value={answer.Text}
                                    onChange={(e) => handleAnswerTextChange(index, e.target.value)}
                                />
                            </div>
                            <div className="col-md-1">
                                <FaMinusCircle
                                    color='red'
                                    className="remove-icon"
                                    onClick={() => handleRemoveAnswer(index)}
                                />
                            </div>
                        </div>
                    ))}
                    <Button className="mx-auto" variant="primary" type="submit">
                        {actionType === 'Add' ? 'Add Part' : 'Update Part'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default ModalAddUpdatePart;
