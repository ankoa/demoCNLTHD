import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteLessonDetail,
  getLessonDetails,
  addLessonDetail,
  updateLessonDetail,
} from "../../../../services/lessonDetailService.jsx"; // Assuming lessonService exists for lesson details
import AddLessonDetailModal from "./AddLessonDetailModal.jsx"; // Import the AddLessonDetailModal
import "./LessonDetailManagement.scss"; // Adjust CSS file as needed

const LessonDetailManagement = () => {
  const refModalLessonDetail = useRef();
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

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
      cell: (row) => <ActionButtons id={row.lessonDetailId} />,
    },
  ];

  useEffect(() => {
    fetchLessonDetails();
  }, []);

  const fetchLessonDetails = async () => {
    try {
      const response = await getLessonDetails();
      setData(response || []);
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

  const filteredData = data.filter(
    (lessonDetail) =>
      lessonDetail.lessonName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lessonDetail.lessonId.toString().includes(searchTerm.toLowerCase())
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
    const lessonDetail = data.find((item) => item.lessonDetailId === id);
    if (lessonDetail) refModalLessonDetail.current.open(lessonDetail, "Update");
  };

  return (
    <div className="AdminLessonDetails">
      <Card>
        <Card.Header className="text-white" style={{ color: "#ffffff" }}>
          Lesson Detail Management
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search lesson details..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-success ms-2"
              onClick={() => setShowModal(true)} // Open the modal
            >
              <IoIosAddCircleOutline /> Add Lesson Detail
            </button>
          </div>
          <div className="table-container">
            {" "}
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              className="data-table"
            />
          </div>
        </Card.Body>
      </Card>
      <AddLessonDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default LessonDetailManagement;
