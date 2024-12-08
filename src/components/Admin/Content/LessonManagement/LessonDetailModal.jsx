import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getLessonDetails,
  getLessonDetailByID,
  deleteLessonDetail,
} from "../../../../services/lessonDetailService.jsx"; // Ensure import
import { FaEllipsisV, FaTrashAlt, FaEdit } from "react-icons/fa"; // Added edit icon
import { IoIosAddCircleOutline } from "react-icons/io";
import AddLessonDetailModal from "./AddLessonDetailModal.jsx"; // Import the AddLessonDetailModal
import EditLessonDetailModal from "./EditLessonDetailModal.jsx"; // Import the AddLessonDetailModal

import "./LessonDetailModal.scss";

// ActionButtons component for better modularity
const ActionButtons = ({ id, onEdit, onDelete }) => (
  <div className="action-buttons">
    <button className="btn-icon" onClick={() => onEdit(id)}>
      <FaEdit /> {/* Edit icon */}
    </button>
    <button className="btn-icon" onClick={() => onDelete(id)}>
      <FaTrashAlt />
    </button>
  </div>
);

ActionButtons.propTypes = {
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const LessonDetailModal = ({ show, lessonId, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLessonDetails();
  }, [lessonId]);

  const fetchLessonDetails = async () => {
    try {
      const response = await getLessonDetails();
      if (response && Array.isArray(response)) {
        const filteredData = response.filter(
          (item) => item.lessonId === lessonId
        );
        setData(filteredData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching lesson details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson detail?")) {
      try {
        const response = await deleteLessonDetail(id);
        if (response && response.EC === 0) {
          toast.success("Deleted successfully!");
          fetchLessonDetails();
        } else {
          toast.error(response?.EM || "Error occurred!");
        }
      } catch (error) {
        toast.error("Error deleting lesson detail.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleEdit = (id) => {
    const lesson = data.find((item) => item.lessonId === id);
    if (lesson) refModalLesson.current.open(lesson, "Update");
  };

  const filteredData = data.filter(
    (lessonDetail) =>
      lessonDetail.lessonName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lessonDetail.lessonId.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Lesson Detail ID",
      selector: (row) => row.lessonDetailId,
      sortable: true,
    },
    {
      name: "Lesson ID",
      selector: (row) => row.lessonId,
      sortable: true,
    },
    {
      name: "Lesson Name",
      selector: (row) => row.lessonName,
      sortable: true,
    },
    {
      name: "Lesson Description",
      selector: (row) => row.lessonDescription,
      sortable: true,
    },
    {
      name: "Learning Progress",
      selector: (row) => row.learningProgress,
      sortable: true,
    },
    {
      name: "Lesson Video",
      selector: (row) => row.lessonVideo,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionButtons
          id={row.lessonDetailId}
          onEdit={(id) => console.log("Edit", id)} // Placeholder for editing logic
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <Modal show={show} onHide={onClose} size="lg" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Lesson Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by lesson name or ID"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>
        <div className="table-container tablelessondetail">
          <Table striped bordered hover>
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                {columns.map((col) => (
                  <th key={col.name}>{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredData.map((item) => (
                <tr key={item.lessonDetailId}>
                  {columns.map((col) => (
                    <td key={col.name}>
                      {col.cell
                        ? col.cell(item)
                        : typeof col.selector === "function"
                        ? col.selector(item)
                        : "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => setShowModal(true)}
        >
          <IoIosAddCircleOutline /> Add Lesson Detail
        </Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
      <AddLessonDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        fetchLessonDetails={fetchLessonDetails}
      />
    </Modal>
  );
};

LessonDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  lessonId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LessonDetailModal;
