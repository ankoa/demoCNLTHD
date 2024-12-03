import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaMinusCircle } from 'react-icons/fa';
import './Modal.scss';
import { getAnswerOfQuestion } from '../../../../services/partService';
import { updateAnswersForQuestion } from '../../../../services/questionService';

const ModalAddUpdatePart = forwardRef(({ handleAddPart, handleUpdatePart, parts }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        Id: 0,
        Text: '',
        AudioFile: null,
        ImageFile: null,
        AudioPath: '',
        ImagePath: '',
        AnswerCounts: 0,
        CreatedAt: '',
        UpdatedAt: ''
    });
    const [temp, setTemp] = useState({});
    const [listAnswer, setListAnswer] = useState([]);
    const [listAnswerTemp, setListAnswerTemp] = useState([]);

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
                setListAnswer(response.DT.answers || []);
                setListAnswerTemp(response.DT.answers || []);
            } else if (response) {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error(error.response?.data.EM || 'An error occurred');
        }
    };

    const hasChanges = () => {
        return JSON.stringify(formData) !== JSON.stringify(temp);
    };

    const hasChangesAnswer = () => {
        return JSON.stringify(listAnswer) !== JSON.stringify(listAnswerTemp);
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
            setTemp({
                ...data,
                AudioFile: null,
                ImageFile: null,
                AudioPath: data.AudioPath || '',
                ImagePath: data.ImagePath || ''
            });
        } else {
            setFormData({
                Id: 0,
                Text: '',
                AudioFile: null,
                ImageFile: null,
                AudioPath: '',
                ImagePath: '',
                AnswerCounts: 0,
                CreatedAt: '',
                UpdatedAt: ''
            });
            setListAnswer([]);
            setPreviewImage(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActionType('');
        setFormData({
            Id: 0,
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
                "Id": 0,  // Tạo Id mới
                "QuestionID": formData.Id,
                "Text": "",
                "IsCorrect": false
            }
        ]);
    };


    const handleAnswerTextChange = (index, value) => {
        const updatedAnswers = listAnswer.map((answer, idx) =>
            idx === index ? { ...answer, Text: value } : answer
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
        if (listAnswer.length <= 3) {
            toast.error("You must have at least 3 answers.");
            return;
        }
        const updatedAnswers = listAnswer.filter((_, idx) => idx !== index);
        setListAnswer(updatedAnswers); // Remove the answer at the specified index
    };

    const handleUpdateAnswers = async (questionId, newAnswers) => {
        try {
            let response = await updateAnswersForQuestion(questionId, newAnswers);
            if (response && response.EC === 0) {
                toast.success(response.EM);
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
        // console.log(newAnswers);
        // console.log(questionId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hasChanges() && !hasChangesAnswer()) {
            toast.success("Nothing need to be updated.");
            return;
        }
        const partData = {
            ...formData,
            AudioPath: formData.AudioFile ? URL.createObjectURL(formData.AudioFile) : formData.AudioPath,
            ImagePath: formData.ImageFile ? URL.createObjectURL(formData.ImageFile) : formData.ImagePath
        };
        console.log(partData);

        if (actionType === 'Add') {
            if (window.confirm('Are you sure you want to save this part into the database?')) {
                partData.AnswerCounts = listAnswer.length;
                handleAddPart(partData, listAnswer);
            }
        } else if (actionType === 'Update') {
            if (window.confirm('Are you sure you want to update this part?')) {
                if (hasChanges()) {
                    handleUpdatePart(partData);
                }
                if (hasChangesAnswer()) {
                    handleUpdateAnswers(formData.Id, listAnswer);
                }
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
                    {actionType === 'Add' ? '' : (<Form.Group className="mb-3" controlId="Number">
                        <Form.Label>Question Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="Number"
                            value={formData.Order}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>)}
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
                            <audio style={{ width: '100%' }} controls src={URL.createObjectURL(formData.AudioFile)} className="mt-2" />
                        ) : (
                            formData.AudioPath && <audio style={{ width: '100%' }} controls src={formData.AudioPath} className="mt-2" />
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
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))}
                    <Button className="mx-auto mt-4" variant="primary" type="submit">
                        {actionType === 'Add' ? 'Add Question' : 'Update Question'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default ModalAddUpdatePart;
