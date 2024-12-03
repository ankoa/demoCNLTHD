import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCourseExisting } from "../../../../services/courseExistingService"; // Updated import

// Styled-components
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .modal-header {
    background-color: #f8f9fa;
  }
  .modal-footer {
    display: flex;
    justify-content: space-between;
  }
  .form-group label {
    font-weight: bold;
  }
  .form-control {
    border-radius: 5px;
    padding: 10px;
  }
  .btn {
    border-radius: 5px;
  }
`;

const AddCourseExistingModal = (props) => {
  const [courseExisting, setCourseExisting] = useState({
    courseExistingId: "",
    userID: "",
    idCourse: "",
    dateTimeStart: "",
    dateTimeEnd: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseExisting({ ...courseExisting, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await addCourseExisting(courseExisting);
      if (response && response.EC === 0) {
        toast.success("Course existing added successfully!");
        props.onClose();
      } else {
        toast.error(response?.EM || "Error occurred!");
      }
    } catch (error) {
      toast.error("Error adding course existing.");
    }
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Course Existing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCourseExistingId">
            <Form.Label>Course Existing ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course existing ID"
              name="courseExistingId"
              value={courseExisting.courseExistingId}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter user ID"
              name="userID"
              value={courseExisting.userID}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formIdCourse">
            <Form.Label>Course ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course ID"
              name="idCourse"
              value={courseExisting.idCourse}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDateTimeStart">
            <Form.Label>Date Time Start</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateTimeStart"
              value={courseExisting.dateTimeStart}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDateTimeEnd">
            <Form.Label>Date Time End</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateTimeEnd"
              value={courseExisting.dateTimeEnd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formActive">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={courseExisting.active}
              onChange={() =>
                setCourseExisting({
                  ...courseExisting,
                  active: !courseExisting.active,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default AddCourseExistingModal;
