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
  getCoursesByID,
} from "../../../../services/courseService";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";
import "./CourseManagement.scss";

const CourseManagement = () => {
  const refModalCourse = useRef();
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [editModalData, setEditModalData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const columns = [
    {
      name: "Course ID",
      selector: (row) => row.courseId,
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Active",
      selector: (row) => (row.active ? "Yes" : "No"),
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Created",
      selector: (row) => new Date(row.created).toLocaleString("en-US"),
      sortable: true,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.courseId} />,
      style: {
        width: "150px", // Chiều rộng cụ thể
      },
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

  const handleEdit = async (id) => {
    try {
      const course = await getCoursesByID(id);
      if (course) {
        console.log("Editing course:", course);
        setEditModalData(course.dt); // Pass course to modal
        setShowEditModal(true); // Open modal
      } else {
        toast.error("Error fetching course.");
      }
    } catch (error) {
      toast.error("Error fetching course.");
    }
  };

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

  return (
    <div>
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
        <AddCourseModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
      <div>
        {showEditModal && (
          <EditCourseModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            data={editModalData}
          />
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
