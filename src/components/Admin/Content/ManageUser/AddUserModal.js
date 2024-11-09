import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { postCreateNewUser } from '../../../../service/userService';

const AddUserModal = ({ show, setShow, fetchUsersPaginate, setCurrentPage, currentPage }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("null");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        if (!password) {
            toast.error("Invalid password");
            return;
        }

        let response = await postCreateNewUser(email, username, password, role, image);
        if (response && response.EC === 0) {
            toast.success("Added new user successfully");
            handleClose();

            setCurrentPage(1);
            await fetchUsersPaginate(1)
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(URL.createObjectURL(file));
                    setImage(file);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null); // Clear previous preview
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size='xl' className='modal-add-user'>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
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
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputUsername"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            placeholder="1-20 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Role</label>
                        <select id="inputState" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                            <option defaultValue value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputImage" className="form-label">Image</label>
                        <input type="file" className="form-control" id="inputImage" onChange={handleUploadImage} />
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
                <Button variant="primary" onClick={handleSubmitCreateUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;
