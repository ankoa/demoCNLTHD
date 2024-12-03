// DeleteCourseModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteCourseModal = (props) => {
  const handleDelete = async () => {
    try {
      await props.onDelete(props.courseId);
      props.onClose();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this course?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCourseModal;
