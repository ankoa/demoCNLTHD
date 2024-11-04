import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { delQuiz } from '../../../../service/quizService';

const DeleteUserModal = ({ dataUpdate,
    fetchQuizzes,
    showDelete,
    setShowDelete,
    resetDataUpdate }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setDescription(dataUpdate.description || "");
            setName(dataUpdate.name || "");
            setDifficulty(dataUpdate.difficulty || "null");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}` || "");
            } else {
                setPreviewImage(``);
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShowDelete(false);
        setName("");
        setDescription("");
        setDifficulty("");
        setImage("");
        setPreviewImage("");
        resetDataUpdate();
    };

    const handleDeleteQuiz = async () => {
        let response = await delQuiz(dataUpdate.id);
        if (response && response.EC === 0) {
            toast.success("Deleted user successfully");
            handleClose();
            await fetchQuizzes()
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <Modal show={showDelete} onHide={handleClose} size="xl" className="modal-add-user">
            <Modal.Header closeButton style={{ borderBottom: '2px solid #dee2e6' }}>
                <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Delete Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Are you sure you want to delete this quiz?</p>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}
                >
                    <div
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid #dee2e6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: '1rem', color: '#6c757d' }}>Preview image</span>
                        )}
                    </div>
                </div>

                <div style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>
                    <p>Name: <span style={{ fontWeight: 'bold' }}>{name}</span></p>
                    <p>Description: <span style={{ fontWeight: 'bold' }}>{description}</span></p>
                    <p>Difficulty: <span style={{ fontWeight: 'bold' }}>{difficulty}</span></p>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '2px solid #dee2e6', justifyContent: 'center', padding: '1.5rem' }}>
                <Button variant="secondary" onClick={handleClose} style={{ marginRight: '1rem', padding: '0.5rem 1.5rem' }}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteQuiz} style={{ padding: '0.5rem 1.5rem' }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>


    );
}
export default DeleteUserModal;
