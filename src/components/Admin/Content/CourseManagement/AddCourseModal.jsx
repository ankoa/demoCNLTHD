import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { addCourse } from "../../../../services/courseService";

// Styled-components for modal styling
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

  const [isUploading, setIsUploading] = useState(false);

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

  // Retrieve environment variables
  const cloudName = "drybe720w";
  const apiKey = "328935211357267";
  const apiSecret = "eaDdEvcb1IkctNIznI34poBW8_k";

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "n7pniczk");
    formData.append("cloud_name", cloudName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload response:", response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Failed to upload image. Please try again.");
      throw new Error("Image upload failed.");
    }
  };

  const handleSubmit = async () => {
    try {
      const validationError = validateInput(course);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      let imageUrl = "";
      if (course.image) {
        setIsUploading(true);
        imageUrl = await uploadImageToCloudinary(course.image);
        setIsUploading(false);
      }

      const payload = {
        courseId: 0,
        name: course.name,
        description: course.description,
        title: course.title,
        price: parseFloat(course.price) || 0,
        image: imageUrl,
        active: course.active ? 1 : 0,
        created: new Date().toISOString(),
      };

      console.log("Payload:", payload);

      const response = await addCourse(payload);
      if (response && response.ec === 1) {
        toast.success("Course added successfully!");
        props.onClose();
      } else {
        toast.error(response?.em || "Error occurred while adding the course.");
      }
    } catch (error) {
      setIsUploading(false);
      console.error("Error adding course:", error);
      toast.error(
        "An error occurred while adding the course. Please try again."
      );
    }
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
    return null; // No validation error
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
        <Button variant="primary" onClick={handleSubmit} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default AddCourseModal;
