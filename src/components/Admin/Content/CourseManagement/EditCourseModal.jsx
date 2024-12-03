// EditCourseModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCourse } from "../../../../services/courseService";

const EditCourseModal = (props) => {
  const [course, setCourse] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    active: true,
  });

  useEffect(() => {
    if (props.course) {
      setCourse(props.course);
    }
  }, [props.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await updateCourse(course);
      if (response && response.EC === 0) {
        toast.success("Course updated successfully!");
        props.onClose();
      } else {
        toast.error(response?.EM || "Error occurred!");
      }
    } catch (error) {
      toast.error("Error updating course.");
    }
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              name="name"
              value={course.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter course description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course price"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formActive">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={course.active}
              onChange={() => setCourse({ ...course, active: !course.active })}
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
    </Modal>
  );
};

export default EditCourseModal;
