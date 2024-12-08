import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import { addLessonDetail } from "../../../../services/lessonDetailService"; // Adjust the path as needed

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
  console.log(props);
  const [lesson, setLesson] = useState({
    lessonDetailId: 0, // Auto-generated or handled by backend
    lessonId: props.lessonId, // Auto-generated or passed in
    lessonName: "", // Can be null
    lessonDescription: "", // Can be null
    learningpProgress: 0, // Default value
    lessonVideo: "", // Can be null
    titleLessonId: 0, // Default value or passed in
  });

  // Clear form when the modal is opened
  useEffect(() => {
    if (props.show) {
      setLesson({
        lessonDetailId: 0,
        lessonId: props.lessonId,
        lessonName: "",
        lessonDescription: "",
        learningpProgress: 0,
        lessonVideo: "",
        titleLessonId: 0,
      });
    }
  }, [props.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await addLessonDetail(lesson);
      if (response) {
        toast.success("Lesson Detail added successfully!");
        props.resettable();
        props.onClose();
      } else {
        toast.error("Error occurred!");
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
              name="learningpProgress"
              value={lesson.learningpProgress}
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
