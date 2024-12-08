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
import DeleteCourseModal from "./DeleteCourseModal";
import "./CourseManagement.scss";

const CourseManagement = () => {
  const refModalCourse = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [editModalData, setEditModalData] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const columns = [
    {
      name: "Course ID",
      selector: (row) => row.courseId,
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Active",
      selector: (row) => (row.active ? "Yes" : "No"),
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Created",
      selector: (row) => new Date(row.created).toLocaleString("en-US"),
      sortable: true,
      style: {
        width: "150px",
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionButtons id={row.courseId} active={row.active ? "Yes" : "No"} />
      ),
      style: {
        width: "150px",
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

  const handleDelete = (id) => {
    setDeleteCourseId(id);
    setShowDeleteModal(true);
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
        setEditModalData(course.dt);
        setShowEditModal(true);
      } else {
        toast.error("Error fetching course.");
      }
    } catch (error) {
      toast.error("Error fetching course.");
    }
  };
  const resetTable = () => {
    fetchCourses(); // Re-fetch data to refresh the table
  };

  const ActionButtons = ({ id, active }) => {
    // Log để kiểm tra giá trị của props
    /*     console.log("active->>>>>", active);
    console.log("id->>>>>", id); */

    // Kiểm tra nếu có phần tử nào trong data có courseId và active = 0

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
                onClick={() => setShowModal(true)}
              >
                <IoIosAddCircleOutline /> Add Course
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
        <AddCourseModal
          show={showModal}
          onClose={() => setShowModal(false)}
          resetTable={resetTable}
        />
      </div>
      <div>
        {showEditModal && (
          <EditCourseModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            data={editModalData}
            resetTable={resetTable}
          />
        )}
      </div>
      <div>
        {showDeleteModal && (
          <DeleteCourseModal
            show={showDeleteModal}
            courseId={deleteCourseId}
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
    </div>
  );
};

export default CourseManagement;
