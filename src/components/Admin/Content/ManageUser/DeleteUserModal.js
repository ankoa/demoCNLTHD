import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { delUser } from '../../../../service/userService';

const DeleteUserModal = ({ showDelete, setShowDelete, fetchUsers, fetchUsersPaginate, resetDataUpdate, dataUpdate, setCurrentPage, currentPage }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("null");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setEmail(dataUpdate.email || "");
            setUsername(dataUpdate.username || "");
            setRole(dataUpdate.role || "null");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}` || "");
            } else {
                setPreviewImage(``);
            }
            setPassword(dataUpdate.password || "");
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShowDelete(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        resetDataUpdate();
    };

    const handleDeleteUser = async () => {
        let response = await delUser(dataUpdate.id);
        if (response && response.EC === 0) {
            toast.success("Deleted user successfully");
            handleClose();
            setCurrentPage(1);
            await fetchUsersPaginate(1)
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <Modal show={showDelete} onHide={handleClose} size="xl" className="modal-add-user">
            <Modal.Header closeButton style={{ borderBottom: '2px solid #dee2e6' }}>
                <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Are you sure you want to delete this user?</p>

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
                    <p>Email: <span style={{ fontWeight: 'bold' }}>{email}</span></p>
                    <p>Username: <span style={{ fontWeight: 'bold' }}>{username}</span></p>
                    <p>Role: <span style={{ fontWeight: 'bold' }}>{role}</span></p>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '2px solid #dee2e6', justifyContent: 'center', padding: '1.5rem' }}>
                <Button variant="secondary" onClick={handleClose} style={{ marginRight: '1rem', padding: '0.5rem 1.5rem' }}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteUser} style={{ padding: '0.5rem 1.5rem' }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>


    );
}
export default DeleteUserModal;
