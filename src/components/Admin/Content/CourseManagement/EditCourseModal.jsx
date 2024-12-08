import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCourse } from "../../../../services/courseService";
import axios from "axios";

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

const EditCourseModal = (props) => {
  const [course, setCourse] = useState({
    courseId: "",
    name: "",
    title: "",
    description: "",
    price: "",
    active: true,
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    if (props.data) {
      setCourse({
        courseId: props.data.courseId,
        name: props.data.name,
        title: props.data.title,
        description: props.data.description,
        price: props.data.price,
        active: props.data.active === 1,
        image: props.data.image,
      });
    }
  }, [props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCourse({ ...course, image: file });
    } else {
      toast.error("Invalid file type. Please upload an image.");
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

      let imageUrl = props.data.image;
      if (course.image && typeof course.image !== "string") {
        setIsUploading(true);
        imageUrl = await uploadImageToCloudinary(course.image);
        setIsUploading(false);
      }

      const payload = {
        ...course,
        price: parseFloat(course.price),
        image: imageUrl,
        active: course.active ? 1 : 0,
        updated: new Date().toISOString(),
      };
      console.log("Payload:", payload);
      const response = await updateCourse(payload);
      if (response && response.ec === 1) {
        toast.success("Course updated successfully!");
        props.resetTable();
        props.onClose();
      } else {
        toast.error(response?.em || "Error updating the course.");
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const validateInput = (course) => {
    if (!course.name.trim()) return "Course name is required.";
    if (!course.title.trim()) return "Course title is required.";
    if (!course.description.trim()) return "Course description is required.";
    if (!course.price || isNaN(course.price) || course.price <= 0)
      return "Price must be a positive number.";
    return null;
  };

  return (
    <StyledModal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
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
            {!isEditingImage && (
              <div>
                <img
                  src={
                    typeof course.image === "string"
                      ? course.image
                      : URL.createObjectURL(course.image)
                  }
                  alt="Course"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  variant="outline-primary"
                  onClick={() => setIsEditingImage(true)}
                >
                  Change Image
                </Button>
              </div>
            )}
            {isEditingImage && (
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
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

// Add PropTypes for validation
EditCourseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default EditCourseModal;
