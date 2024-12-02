import "./CourseManagement.scss";
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

const CourseManagement = () => {
  const refModalCourse = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => (row.Active ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => new Date(row.Created).toLocaleString("en-US"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.Id} />,
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      let response = await getCourses();
      if (response && response.EC === 0) {
        setData(response.DT);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("An error occurred while fetching courses.");
    }
  };

  const delCourseById = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this course?")) {
        let response = await deleteCourse(id);
        if (response && response.EC === 0) {
          toast.success(response.EM);
          fetchCourses();
        } else {
          toast.error(response.EM);
        }
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("An error occurred while deleting the course.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActionButtons = ({ id }) => {
    return (
      <div style={{ display: "flex" }}>
        <button className="btn-action" onClick={() => handleEdit(id)}>
          <FaEllipsisV style={{ color: "#A5A6B1", cursor: "pointer" }} />
        </button>
        <button className="btn-action" onClick={() => delCourseById(id)}>
          <FaTrashAlt style={{ color: "#A5A6B1", cursor: "pointer" }} />
        </button>
      </div>
    );
  };

  const handleEdit = (id) => {
    const course = data.find((item) => item.Id === id);
    if (course) {
      refModalCourse.current.open(course, "Update");
    }
  };

  const handleAdd = async (newCourse) => {
    try {
      let response = await addCourse(newCourse);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        fetchCourses();
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("An error occurred while adding the course.");
    }
  };

  return (
    <div className="AdminCourses">
      <Card>
        <Card.Header>Course Management</Card.Header>
        <Card.Body>
          <div className="AdminCourses-header">
            <input
              type="text"
              placeholder="Search by name or title"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={() => refModalCourse.current.open(null, "Add")}>
              <IoIosAddCircleOutline size={20} /> Add Course
            </button>
          </div>
          <DataTable columns={columns} data={filteredData} pagination />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseManagement;
