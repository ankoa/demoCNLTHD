import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteLesson,
  getLessons,
  addLesson,
  updateLesson,
} from "../../../../services/lessonService"; // Assuming lessonService exists
import AddLessonModal from "./AddLessonModal.jsx"; // Import the AddLessonModal
import "./LessonManagement.scss"; // Adjust CSS file as needed

const LessonManagement = () => {
  const refModalLesson = useRef();
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Lesson ID",
      selector: (row) => row.lessonId,
      sortable: true,
    },
    {
      name: "Course ID",
      selector: (row) => row.courseId,
      sortable: true,
    },
    {
      name: "Lesson Name",
      selector: (row) => row.lessonName,
      sortable: true,
    },
    {
      name: "Title Lesson ID",
      selector: (row) => row.titleLessonId,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.lessonId} />,
    },
  ];

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await getLessons();
      setData(response || []);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching lessons.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        const response = await deleteLesson(id);
        if (response && response.EC === 0) {
          toast.success("Deleted successfully!");
          fetchLessons();
        } else {
          toast.error(response?.EM || "Error occurred!");
        }
      } catch (error) {
        toast.error("Error deleting lesson.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (lesson) =>
      lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.courseId.toString().includes(searchTerm.toLowerCase())
  );

  const ActionButtons = ({ id }) => (
    <div className="action-buttons">
      <button className="btn-icon" onClick={() => handleEdit(id)}>
        <FaEllipsisV />
      </button>
      <button className="btn-icon" onClick={() => handleDelete(id)}>
        <FaTrashAlt />
      </button>
    </div>
  );

  const handleEdit = (id) => {
    const lesson = data.find((item) => item.lessonId === id);
    if (lesson) refModalLesson.current.open(lesson, "Update");
  };

  return (
    <div className="AdminLessons">
      <Card>
        <Card.Header className="text-white" style={{ color: "#ffffff" }}>
          Lesson Management
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-success ms-2"
              onClick={() => setShowModal(true)} // Open the modal
            >
              <IoIosAddCircleOutline /> Add Lesson
            </button>
          </div>
          <DataTable columns={columns} data={filteredData} pagination />
        </Card.Body>
      </Card>
      <AddLessonModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default LessonManagement;
