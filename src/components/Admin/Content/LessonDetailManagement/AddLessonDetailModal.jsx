import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import { addLesson } from "../../../../services/lessonService"; // Adjust the path as needed

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
    lessonId: null, // Auto-generated
    lessonName: "",
    lessonDescription: "", // Added description
    learningProgress: 0, // Default value
    lessonVideo: "", // URL or path
    courseId: 1, // Assuming a fixed or passed value
    titleLessonId: 0, // Default value
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
          <Form.Group controlId="formLessonDescription">
            <Form.Label>Lesson Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lesson description"
              name="lessonDescription"
              value={lesson.lessonDescription}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLearningProgress">
            <Form.Label>Learning Progress</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter learning progress"
              name="learningProgress"
              value={lesson.learningProgress}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLessonVideo">
            <Form.Label>Lesson Video URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter video URL"
              name="lessonVideo"
              value={lesson.lessonVideo}
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
