import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  deleteLesson,
  updateLesson, // Ensure this function updates a course's active status
  getLessonByID, // Optionally, use this if you need to fetch course details
} from "../../../../services/lessonService";
import { toast } from "react-toastify";
const DeletelessonModal = (props) => {
  console.log("props", props);

  const handleDelete = async () => {
    try {
      // Fetch the course by ID to update its 'active' status to 0
      const response = await deleteLesson(props.lessonID);
      if (response) {
        props.resetTable();

        toast.success("Lesson has been deactivated successfully.");
        props.onClose();
      } else {
        console.error("Error deactivating course.");
      }
    } catch (error) {
      console.error("Error deactivating course:", error);
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
          {props.lessonID}
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

export default DeletelessonModal;
