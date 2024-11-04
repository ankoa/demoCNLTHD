import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../../service/userService';

const UpdateUserModal = ({ showModalUpdate, setShowModalUpdate, fetchUsersPaginate, dataUpdate, resetDataUpdate, view, setView, currentPage }) => {
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
        setShowModalUpdate(false);
        setView(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        resetDataUpdate();
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
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

    const handleSubmitUpdateUser = async () => {

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        let response = await putUpdateUser(dataUpdate.id, username, role, image);
        if (response && response.EC === 0) {
            toast.success("Updated user successfully");
            handleClose();
            await fetchUsersPaginate(currentPage)
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <Modal show={showModalUpdate} onHide={handleClose} size='xl' className='modal-add-user'>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4" placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={view}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            disabled={view}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Role</label>
                        <select
                            disabled={view}
                            id="inputState" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                            <option defaultValue value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputImage" className="form-label">Image</label>
                        <input
                            disabled={view}
                            type="file"
                            className="form-control"
                            id="inputImage"
                            onChange={handleUploadImage} />
                    </div>
                    <div className='col-md-12 card img-preview'>
                        {previewImage ?
                            <img src={previewImage} alt="Preview" />
                            : <span>Preview image</span>
                        }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    style={{ display: view ? 'none' : 'block' }}
                    variant="primary"
                    onClick={handleSubmitUpdateUser}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateUserModal;
