import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import {
  IoIosAddCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteLesson, getLessons } from "../../../../services/lessonService";
import AddLessonModal from "./AddLessonModal.jsx";
import EditLessonModal from "./EditLessonModal.jsx";
import LessonDetailModal from "./LessonDetailModal.jsx";
import "./LessonManagement.scss";

const LessonManagement = () => {
  const refModalLesson = useRef();
  const refModalLessonDetail = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
      cell: (row) => <ActionButtons lesson={row} />,
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
  const handleEdit = (id) => {
    setSelectedLesson(id);
    setShowEditModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLessonDetail = (lessonID) => {
    setSelectedLesson(lessonID);
    setShowDetailModal(true);
  };
  const resetTable = () => {
    fetchLessons(); // Re-fetch data to refresh the table
  };

  const filteredData = data.filter(
    (lesson) =>
      lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.courseId.toString().includes(searchTerm.toLowerCase())
  );

  const ActionButtons = ({ lesson }) => (
    <div className="action-buttons">
      <button className="btn-icon" onClick={() => handleEdit(lesson.lessonId)}>
        <FaEllipsisV />
      </button>
      <button
        className="btn-icon"
        onClick={() => handleDelete(lesson.lessonId)}
      >
        <FaTrashAlt />
      </button>
      <button
        className="btn-icon"
        onClick={() => handleLessonDetail(lesson.lessonId)}
      >
        <IoIosInformationCircleOutline />
      </button>
    </div>
  );

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
              onClick={() => setShowModal(true)}
            >
              <IoIosAddCircleOutline /> Add Lesson
            </button>
          </div>
          <div className="table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              className="data-table"
            />
          </div>
        </Card.Body>
      </Card>
      <AddLessonModal
        show={showModal}
        onClose={() => setShowModal(false)}
        resetTable={resetTable}
      />
      <EditLessonModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        resetTable={resetTable}
        lessonID={selectedLesson}
      />

      <LessonDetailModal
        show={showDetailModal}
        lessonId={selectedLesson}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default LessonManagement;
