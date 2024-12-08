import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  updateCourseExisting,
  getCourseExistings,
} from "../../../../services/courseExistingService";
import { getCoursesByID } from "../../../../services/courseService";
import { getUserById } from "../../../../services/userService";

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

const EditCourseExistingModal = (props) => {
  console.log(props);
  const [courseExisting, setCourseExisting] = useState({
    userID: "",
    courseName: "",
    idCourse: "",
    dateTimeStart: "",
    dateTimeEnd: "",
    active: 1,
    username: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (props.course) {
        setCourseExisting(props.course);

        // Fetch user data if userID is available
        if (props.course.userID) {
          try {
            const response = await getUserById(props.course.userID);
            if (response) {
              setCourseExisting((prev) => ({
                ...prev,
                username: response.Username,
              }));
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data.");
          }
        }

        // Fetch course data if idCourse is available
        if (props.course.idCourse) {
          try {
            const response = await getCoursesByID(props.course.idCourse);
            if (response && response.dt) {
              setCourseExisting((prev) => ({
                ...prev,
                courseName: response.dt.name,
              }));
            }
          } catch (error) {
            console.error("Error fetching course data:", error);
            toast.error("Error fetching course data.");
          }
        }
      }
    };

    fetchInitialData();
  }, [props.course]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCourseExisting((prev) => ({ ...prev, [name]: value }));

    if (name === "userID") {
      if (value) {
        try {
          const response = await getUserById(value);
          if (response && response.Username) {
            setCourseExisting((prev) => ({
              ...prev,
              username: response.Username,
            }));
          } else {
            setCourseExisting((prev) => ({
              ...prev,
              username: "",
            }));
            toast.warning("User not found. Please check the User ID.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data.");
          setCourseExisting((prev) => ({
            ...prev,
            username: "",
          }));
        }
      } else {
        setCourseExisting((prev) => ({
          ...prev,
          username: "",
        }));
      }
    }

    if (name === "idCourse") {
      if (value) {
        try {
          const response = await getCoursesByID(value);
          if (response && response.dt && response.dt.name) {
            setCourseExisting((prev) => ({
              ...prev,
              courseName: response.dt.name,
            }));
          } else {
            setCourseExisting((prev) => ({
              ...prev,
              courseName: "",
            }));
            toast.warning("Course not found. Please check the Course ID.");
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
          toast.error("Error fetching course data.");
          setCourseExisting((prev) => ({
            ...prev,
            courseName: "",
          }));
        }
      } else {
        setCourseExisting((prev) => ({
          ...prev,
          courseName: "",
        }));
      }
    }
  };

  const handleSave = async () => {
    if (!courseExisting.userID) {
      toast.error("Please enter the User ID!");
      return;
    }
    if (!courseExisting.idCourse) {
      toast.error("Please enter the Course ID!");
      return;
    }
    if (!courseExisting.dateTimeStart) {
      toast.error("Please select the Start Date and Time!");
      return;
    }
    if (!courseExisting.dateTimeEnd) {
      toast.error("Please select the End Date and Time!");
      return;
    }

    if (courseExisting.userID && !courseExisting.username) {
      toast.error("The User ID is not valid. Please check the User ID!");
      return;
    }

    if (courseExisting.idCourse && !courseExisting.courseName) {
      toast.error("The Course ID is not valid. Please check the Course ID!");
      return;
    }

    try {
      const responseExistingCourse = await getCourseExistings();
      const existingCourse = responseExistingCourse.find(
        (item) =>
          item.userID == courseExisting.userID &&
          item.idCourse == courseExisting.idCourse &&
          item.courseExistingId !== courseExisting.courseExistingId // Ensure it is not the current one being updated
      );

      if (existingCourse && existingCourse.courseExistingId) {
        toast.error("This course already exists.");
        return;
      }
    } catch (error) {
      console.error("Error checking existing course:", error);
      toast.error("Error checking existing course.");
      return;
    }

    try {
      const response = await updateCourseExisting(
        courseExisting.courseExistingId,
        courseExisting
      );
      if (response && response.EC === 1) {
        toast.success("Updated successfully!");
        props.onClose(); // Close modal after success
      } else {
        toast.error(response?.EM || "Error occurred!");
      }
    } catch (error) {
      console.error("Error updating course existing:", error);
      toast.error("Error updating course existing.");
    }
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Course Existing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          {courseExisting.username && (
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={courseExisting.username}
                readOnly
              />
            </Form.Group>
          )}

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
          {courseExisting.courseName && (
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={courseExisting.courseName}
                readOnly
              />
            </Form.Group>
          )}
          <Form.Group controlId="dateTimeStart">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateTimeStart"
              value={courseExisting.dateTimeStart}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dateTimeEnd">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateTimeEnd"
              value={courseExisting.dateTimeEnd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="active">
            <Form.Label>Active</Form.Label>
            <Form.Check
              type="checkbox"
              name="active"
              checked={courseExisting.active === 1}
              onChange={(e) =>
                setCourseExisting((prev) => ({
                  ...prev,
                  active: e.target.checked ? 1 : 0,
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default EditCourseExistingModal;
