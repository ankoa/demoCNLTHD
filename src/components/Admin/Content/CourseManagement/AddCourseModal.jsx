import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCourse } from "../../../../services/courseService";

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

const AddCourseModal = (props) => {
  const [course, setCourse] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    active: true,
    image: null, // To hold the image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({ ...course, image: file });
    }
  };

  const handleSubmit = async () => {
    try {
      // Gọi hàm kiểm tra dữ liệu
      const validationError = validateInput(course);
      if (validationError) {
        toast.error(validationError); // Hiển thị lỗi
        return; // Dừng hàm nếu có lỗi
      }

      // Xử lý dữ liệu nếu hợp lệ
      const payload = {
        courseId: 0,
        name: course.name,
        description: course.description,
        title: course.title,
        price: parseFloat(course.price) || 0,
        image: course.image ? await convertImageToBase64(course.image) : "",
        active: course.active ? 1 : 0,
        created: new Date().toISOString(),
      };

      console.log("Payload:", payload); // Debug dữ liệu gửi đi

      const response = await addCourse(payload); // Gọi API
      if (response && response.ec === 1) {
        toast.success("Course added successfully!");
        props.onClose();
      } else {
        toast.error(response?.em || "Error occurred!");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Error adding course.");
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const validateInput = (course) => {
    if (!course.name || course.name.trim() === "") {
      return "Course name is required.";
    }
    if (!course.title || course.title.trim() === "") {
      return "Course title is required.";
    }
    if (!course.description || course.description.trim() === "") {
      return "Course description is required.";
    }
    if (
      !course.price ||
      isNaN(parseFloat(course.price)) ||
      parseFloat(course.price) <= 0
    ) {
      return "Course price must be a positive number.";
    }
    if (!course.image) {
      return "Course image is required.";
    }
    return null; // Không có lỗi
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Course</Modal.Title>
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
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            {course.image && (
              <div className="mt-3">
                <p>Selected file: {course.image.name}</p>
                <img
                  src={URL.createObjectURL(course.image)}
                  alt="Selected preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
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

export default AddCourseModal;
