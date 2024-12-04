import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteCourse,
  getCourses,
  addCourse,
  updateCourse,
} from "../../../../services/courseService";
import AddCourseModal from "./AddCourseModal"; // Import the AddCourseModal
import "./CourseManagement.scss";

const CourseManagement = () => {
  const refModalCourse = useRef();
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Course ID",
      selector: (row) => row.courseId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => (row.active ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => new Date(row.created).toLocaleString("en-US"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.courseId} />,
    },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setData(response || []);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching courses.");
    }
  };

  const handleDelete = async (id) => {
    <deleteCourse id={id} />;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    const course = data.find((item) => item.courseId === id);
    if (course) refModalCourse.current.open(course, "Update");
  };

  return (
    <div className="AdminCourses">
      <Card>
        <Card.Header className="text-white" style={{ color: "#ffffff" }}>
          Course Management
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-success ms-2"
              onClick={() => setShowModal(true)} // Open the modal
            >
              <IoIosAddCircleOutline /> Add Course
            </button>
          </div>
          <DataTable columns={columns} data={filteredData} pagination />
        </Card.Body>
      </Card>
      <AddCourseModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default CourseManagement;
