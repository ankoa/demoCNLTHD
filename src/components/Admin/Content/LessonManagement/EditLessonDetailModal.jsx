import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  getLessonDetailByID,
  updateLessonDetail,
} from "../../../../services/lessonDetailService"; // Điều chỉnh đường dẫn nếu cần

// Styled-components
const StyledModal = styled(Modal)`
  .modal-content {
    height: 600px;
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

const EditLessonDetailModal = (props) => {
  console.log("props", props);
  const [lesson, setLesson] = useState({
    lessonDetailId: props.editlessondetailID,
    lessonId: null,
    lessonName: "",
    lessonDescription: "",
    learningpProgress: 0,
    lessonVideo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.editlessondetailID) {
      fetchLessonDetails(props.editlessondetailID);
    }
  }, [props]);

  const fetchLessonDetails = async (lessonId) => {
    setLoading(true);
    try {
      const response = await getLessonDetailByID(lessonId);
      if (response) {
        setLesson(response);
      } else {
        toast.error("Failed to fetch lesson details!");
      }
    } catch (error) {
      toast.error("Error fetching lesson details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("lessonDetailEdit", lesson);
    if (
      !lesson.lessonName ||
      !lesson.lessonDescription ||
      lesson.learningpProgress < 0 ||
      lesson.learningpProgress > 100
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const response = await updateLessonDetail(lesson.lessonDetailId, lesson);
      if (response) {
        toast.success("Lesson updated successfully!");
        props.resetTable();
        props.onClose();
      } else {
        toast.error("Error occurred!");
      }
    } catch (error) {
      toast.error("Error updating lesson.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <h5>Loading...</h5>
          </div>
        ) : (
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
            <Form.Group controlId="formlearningpProgress">
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
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default EditLessonDetailModal;
