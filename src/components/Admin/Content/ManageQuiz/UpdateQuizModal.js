import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import "./UpdateQuizModal.scss";
import { putUpdateQuiz } from '../../../../service/quizService';

const UpdateQuizModal = ({ dataUpdate, showModalUpdate, setShowModalUpdate, fetchQuizzes, resetDataUpdate }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name || "");
            setDescription(dataUpdate.description || "");
            setDifficulty(dataUpdate.difficulty || "EASY");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            } else {
                setPreviewImage(null);
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShowModalUpdate(false);
        resetForm();
        resetDataUpdate();
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setDifficulty("EASY");
        setImage(null);
        setPreviewImage(null);
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                    setImage(file);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null); // Clear previous preview
            }
        }
    };

    const handleSubmitUpdateQuiz = async () => {
        if (!name) {
            toast.error("Invalid name");
            return;
        }

        if (!description) {
            toast.error("Invalid description");
            return;
        }

        const response = await putUpdateQuiz(dataUpdate.id, name, description, difficulty, image);
        if (response && response.EC === 0) {
            toast.success("Updated quiz successfully");
            handleClose();
            await fetchQuizzes();
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <Modal show={showModalUpdate} onHide={handleClose} size='xl' className='modal-update-quiz'>
            <Modal.Header closeButton>
                <Modal.Title>Update Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Quiz Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputDescription"
                            placeholder="Quiz Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputDifficulty" className="form-label">Difficulty</label>
                        <select
                            id="inputDifficulty"
                            className="form-select"
                            value={difficulty}
                            onChange={(event) => setDifficulty(event.target.value)}
                        >
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputImage" className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="inputImage"
                            onChange={handleUploadImage}
                        />
                    </div>
                    <div className='col-md-12 card img-preview'>
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="img-fluid" />
                        ) : (
                            <span>Preview image</span>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmitUpdateQuiz}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateQuizModal;
