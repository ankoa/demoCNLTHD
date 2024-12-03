import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addLesson } from "../../../../services/lessonService";

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

const AddLessonModal = (props) => {
  const [lesson, setLesson] = useState({
    lessonId: null, // Null because it's auto-generated
    courseId: 1, // Assuming courseId is fixed or passed as a prop
    lessonName: "",
    titleLessonId: 0, // Default value, can be adjusted based on requirements
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await addLesson(lesson);
      if (response && response.EC === 0) {
        toast.success("Lesson added successfully!");
        props.onClose();
      } else {
        toast.error(response?.EM || "Error occurred!");
      }
    } catch (error) {
      toast.error("Error adding lesson.");
    }
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLessonName">
            <Form.Label>Lesson Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lesson name"
              name="lessonName"
              value={lesson.lessonName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitleLessonId">
            <Form.Label>Title Lesson ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter title lesson ID"
              name="titleLessonId"
              value={lesson.titleLessonId}
              onChange={handleChange}
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

export default AddLessonModal;
