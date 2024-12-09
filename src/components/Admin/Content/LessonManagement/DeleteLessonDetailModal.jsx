import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteLessonDetail } from "../../../../services/lessonDetailService";
import { toast } from "react-toastify";
const DeleteLessonDetailModal = (props) => {
  console.log("props", props);

  const handleDelete = async () => {
    try {
      // Fetch the course by ID to update its 'active' status to 0
      const response = await deleteLessonDetail(props.lessonDetailID);
      if (response) {
        props.resettable();
        toast.success("Lesson Detail has been deactivated successfully.");
        props.onClose();
      } else {
        console.error("Error deactivating Lesson Detail.");
      }
    } catch (error) {
      console.error("Error deactivating Lesson Detail:", error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to deactivate this lesson? Lesson ID:{" "}
          {props.lessonDetailID}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Deactivate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteLessonDetailModal;
