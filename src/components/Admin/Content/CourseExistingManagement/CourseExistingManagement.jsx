import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteCourseExisting,
  getCourseExistings,
  addCourseExisting,
  updateCourseExisting,
} from "../../../../services/courseExistingService";
import AddCourseExistingModal from "./AddCourseExistingModal"; // Import the AddCourseExistingModal
import "./CourseExistingManagement.scss";

const CourseExistingManagement = () => {
  const refModalCourse = useRef();
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Course Existing ID",
      selector: (row) => row.courseExistingId,
      sortable: true,
    },
    {
      name: "User ID",
      selector: (row) => row.userID,
      sortable: true,
    },
    {
      name: "Course ID",
      selector: (row) => row.idCourse,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.dateTimeStart).toLocaleString("en-US"),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => new Date(row.dateTimeEnd).toLocaleString("en-US"),
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => (row.active ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.courseExistingId} />,
    },
  ];

  useEffect(() => {
    fetchCourseExistings();
  }, []);

  const fetchCourseExistings = async () => {
    try {
      const response = await getCourseExistings();
      setData(response || []);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching course existings.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this course existing?")
    ) {
      try {
        const response = await deleteCourseExisting(id);
        if (response && response.EC === 0) {
          toast.success("Deleted successfully!");
          fetchCourseExistings();
        } else {
          toast.error(response?.EM || "Error occurred!");
        }
      } catch (error) {
        toast.error("Error deleting course existing.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (course) =>
      course.courseExistingId.toString().includes(searchTerm) ||
      course.userID.toString().includes(searchTerm)
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
    const course = data.find((item) => item.courseExistingId === id);
    if (course) refModalCourse.current.open(course, "Update");
  };

  return (
    <div className="AdminCourses">
      <Card>
        <Card.Header className="text-white" style={{ color: "#ffffff" }}>
          Course Existing Management
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search course existings..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-success ms-2"
              onClick={() => setShowModal(true)} // Open the modal
            >
              <IoIosAddCircleOutline /> Add Course Existing
            </button>
          </div>
          <DataTable columns={columns} data={filteredData} pagination />
        </Card.Body>
      </Card>
      <AddCourseExistingModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CourseExistingManagement;
