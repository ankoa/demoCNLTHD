import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteCourseExisting,
  getCourseExistings,
  findByID, // Import the new API function
} from "../../../../services/courseExistingService";
import AddCourseExistingModal from "./AddCourseExistingModal"; // Import the AddCourseExistingModal
import EditCourseExistingModal from "./EditCourseExistingModal "; // Import the EditCourseExistingModal
import "./CourseExistingManagement.scss";
import DeleteCourseExistingModal from "./DeleteCourseExistingModal"; // Import the EditCourseExistingModal

const CourseExistingManagement = () => {
  const refModalCourse = useRef();
  const [showModal, setShowModal] = useState(false); // State for adding modal
  const [showEditModal, setShowEditModal] = useState(false); // State for editing modal
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCourseExistingId, setdeleteCourseExistingId] = useState(null);

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
      cell: (row) => (
        <ActionButtons
          id={row.courseExistingId}
          active={row.active ? "Yes" : "No"}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchCourseExistings();
  }, []);

  const fetchCourseExistings = async () => {
    try {
      const response = await getCourseExistings();
      setData(response.dt || []);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching course existings.");
    }
  };

  /*   const handleDelete = async (id) => {
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
  }; */
  const handleDelete = (id) => {
    setdeleteCourseExistingId(id);
    setShowDeleteModal(true);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (course) =>
      course.courseExistingId.toString().includes(searchTerm) ||
      course.userID.toString().includes(searchTerm)
  );

  const ActionButtons = ({ id, active }) => {
    return (
      <div className="action-buttons">
        <button className="btn-icon" onClick={() => handleEdit(id)}>
          <FaEllipsisV />
        </button>
        {/* Hiển thị nút xóa chỉ khi không có khóa học nào thỏa mãn điều kiện */}
        <button
          className="btn-icon"
          onClick={() => handleDelete(id)}
          disabled={active === "No"} // Vô hiệu hóa nếu active là "No" hoặc courseExists là true
        >
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  // New function to fetch data by ID
  const fetchCourseByID = async (id) => {
    try {
      const response = await findByID(id);
      if (response) {
        return response;
      } else {
        toast.error("Error occurred while fetching course details.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      toast.error("Error fetching course by ID.");
      return null;
    }
  };

  const handleEdit = async (id) => {
    const course = await fetchCourseByID(id);
    if (course) {
      setSelectedCourse(course);
      setShowEditModal(true); // Open the edit modal
    }
  };
  const resetTable = () => {
    fetchCourseExistings(); // Re-fetch data to refresh the table
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
              onClick={() => setShowModal(true)} // Open the add modal
            >
              <IoIosAddCircleOutline /> Add Course Existing
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
      <AddCourseExistingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        resetTable={resetTable}
      />
      <EditCourseExistingModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        course={selectedCourse}
        resetTable={resetTable}
      />

      {showDeleteModal && (
        <DeleteCourseExistingModal
          show={showDeleteModal}
          courseExistingId={deleteCourseExistingId}
          onClose={() => setShowDeleteModal(false)}
          resetTable={resetTable}
          /* onDelete={async (id) => {
              try {
                await deleteCourse(id);
                toast.success("Course deleted successfully.");
                fetchCourses();
                setShowDeleteModal(false);
                fetchCourses();
              } catch (error) {
                console.error("Error deleting course:", error);
                toast.error("Error deleting course.");
              }
            } }*/
        />
      )}
    </div>
  );
};

export default CourseExistingManagement;
