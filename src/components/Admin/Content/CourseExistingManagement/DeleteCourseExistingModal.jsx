import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  updateCourseExisting,
  findByID,
} from "../../../../services/courseExistingService";
import { toast } from "react-toastify";

const DeleteCourseExistingModal = (props) => {
  console.log("props", props);

  const handleDelete = async () => {
    try {
      // Fetch the course by ID to update its 'active' status to 0
      const course = await findByID(props.courseExistingId);
      console.log("course", course);
      if (course) {
        course.active = 0; // Set active status to 0 (inactive)

        // Call the service to update the course in the database
        await updateCourseExisting(props.courseExistingId, course);
        props.resetTable();
        props.onClose();
        toast.success("Course has been deactivated successfully.");
      } else {
        console.error("Course not found.");
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
          Are you sure you want to deactivate this course? Course Existing ID:{" "}
          {props.courseExistingId}
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

export default DeleteCourseExistingModal;
