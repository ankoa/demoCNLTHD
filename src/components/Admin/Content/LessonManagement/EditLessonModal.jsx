import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getLessonByID,
  updateLesson,
} from "../../../../services/lessonService";
import { getCoursesByID } from "../../../../services/courseService";

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

const EditLessonModal = (props) => {
  console.log("propsedit", props);
  const [lesson, setLesson] = useState({
    lessonId: props.lessonID,
    courseId: "",
    courseName: "",
    lessonName: "",
    titleLessonId: "",
  });

  useEffect(() => {
    if (props.lessonID) {
      console.log("Fetching lesson details for ID:", props.lessonID);
      fetchLessonDetails(props.lessonID);
    }
  }, [props]);

  const fetchLessonDetails = async (lessonId) => {
    try {
      const response = await getLessonByID(lessonId);
      console.log("Lesson:", response);
      if (response) {
        setLesson({
          lessonId: response.lessonId,
          courseId: response.courseId,
          courseName: "", // Temporarily set to empty
          lessonName: response.lessonName,
          titleLessonId: response.titleLessonId,
        });

        if (response.courseId) {
          // Fetch course name based on courseId
          try {
            const courseResponse = await getCoursesByID(response.courseId);
            if (courseResponse && courseResponse.dt) {
              setLesson((prev) => ({
                ...prev,
                courseName: courseResponse.dt.name,
              }));
            } else {
              toast.warning("Course not found. Please check the Course ID.");
            }
          } catch (error) {
            console.error("Error fetching course data:", error);
            toast.error("Failed to fetch course data.");
          }
        }
      } else {
        toast.error("Lesson details not found.");
      }
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      toast.error("Failed to fetch lesson details.");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });

    if (name === "courseId" && value) {
      try {
        const response = await getCoursesByID(value);
        if (response && response.dt) {
          setLesson((prev) => ({ ...prev, courseName: response.dt.name }));
        } else {
          setLesson((prev) => ({ ...prev, courseName: "" }));
          toast.warning("Course not found. Please check the Course ID.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Failed to fetch course data.");
        setLesson((prev) => ({ ...prev, courseName: "" }));
      }
    } else if (name === "courseId" && !value) {
      setLesson((prev) => ({ ...prev, courseName: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!lesson.lessonName.trim()) {
      toast.error("Lesson Name is required!");
      return;
    }
    if (!lesson.courseId) {
      toast.error("Course ID is required!");
      return;
    }
    if (!lesson.titleLessonId) {
      toast.error("Title Lesson ID is required!");
      return;
    }

    if (isNaN(lesson.courseId)) {
      toast.error("Course ID must be a valid number!");
      return;
    }
    if (isNaN(lesson.titleLessonId)) {
      toast.error("Title Lesson ID must be a valid number!");
      return;
    }

    if (!lesson.courseName) {
      toast.error("Invalid Course ID. Please enter a valid Course ID.");
      return;
    }

    const lessonData = {
      ...lesson,
      courseId: parseInt(lesson.courseId, 10),
      titleLessonId: parseInt(lesson.titleLessonId, 10),
    };

    try {
      console.log("Lesson data:", lessonData);
      const response = await updateLesson(lessonData.lessonId, lessonData);
      if (response) {
        toast.success("Lesson updated successfully!");
        if (props.resetTable) props.resetTable();
        handleModalClose();
        handleModalClose();
      } else {
        toast.error("An error occurred.");
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast.error("Error updating lesson.");
    }
  };

  const handleModalClose = () => {
    setLesson({
      lessonId: 0,
      courseId: "",
      courseName: "",
      lessonName: "",
      titleLessonId: "",
    });
    props.onClose();
  };

  return (
    <StyledModal show={props.show} onHide={handleModalClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCourseId">
            <Form.Label>Course ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course ID"
              name="courseId"
              value={lesson.courseId}
              onChange={handleChange}
            />
          </Form.Group>
          {lesson.courseName && (
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" value={lesson.courseName} readOnly />
            </Form.Group>
          )}
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
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default EditLessonModal;
