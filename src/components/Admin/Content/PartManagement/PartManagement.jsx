import "./PartManagement.scss";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEllipsisV } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ModalAddUpdateUser from "./ModalAddUpdateUser";
import useDebounce from "../../../../util/useDeboune";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card, Dropdown, Form } from "react-bootstrap";
import {
  deleteTestById,
  getParfOfTestById,
  getTests,
  postNewTest,
  putUpdateTest,
} from "../../../../services/testService";
import { toast } from "react-toastify";
import { postNewPart, putUpdatePart } from "../../../../services/partService";

const PartManagement = () => {
  //--------------Khai báo ref
  const refModalUser = useRef();

  //----------------Khai báo state
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedTestID, setSelectedTestID] = useState(null);
  const requiredParts = [1, 2, 3, 4, 5, 6, 7];
  const [missingParts, setMissingParts] = useState([]);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.Id,
      sortable: true,
      fixed: true,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <EditableDescription
          row={row}
          onUpdate={async (id, newDescription) => {
            // Cập nhật dữ liệu của bảng với giá trị mới
            console.log(
              `Updating description of row with ID ${id} to "${newDescription}"`
            );
            let response = await putUpdatePart(id, newDescription);
            if (response.EC === 0 && response) {
              toast.success(response.EM);
            } else {
              toast.error(response.EM);
            }
          }}
        />
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <ActionButtons id={row.Id} />,
      ignoreRowClick: true,
    },
  ];
  const [dataToShow, setDataToShow] = useState(data);
  const fullData = data;
  // const [lastid, setLastid] = useState(data[data.length - 1].id);

  useEffect(() => {
    fetchListTests();
  }, []);

  useEffect(() => {
    if (selectedTestID === "-1" || selectedTestID === null) {
      setData([]);
      return;
    }
    fetchListPartOfTest(selectedTestID);
  }, [selectedTestID]);

  useEffect(() => {
    setDataToShow([...data]); // Cập nhật lại dataToShow khi data thay đổi
  }, [data]); // Chỉ gọi khi data thay đổi

  const handleSelectTest = (testID) => {
    setSelectedTestID(testID); // Cập nhật testID đã chọn
    console.log(`Đã chọn Test ID: ${testID}`); // Có thể in ra để kiểm tra
  };

  const fetchListPartOfTest = async (id) => {
    try {
      let response = await getParfOfTestById(id);
      if (response && response.EC === 0) {
        setData(response.DT.parts);
        // console.log(response.DT);
      } else if (response && response.EC !== 0) {
        toast.error(response.EM);
        setData([]);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.EM || "Đã xảy ra lỗi");
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  const fetchListTests = async () => {
    try {
      let response = await getTests();
      if (response && response.EC === 0) {
        const filteredData = response.DT.filter((test) => test.Id !== -1);
        setTests(filteredData);
      } else if (response && response.EC !== 0) {
        toast.error(response.EM);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.EM || "Đã xảy ra lỗi");
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  const delTestById = async (id) => {
    try {
      let response = await deleteTestById(id);
      if (response && response.EC === 0) {
        toast.success(response.EM);
      } else if (response && response.EC !== 0) {
        toast.error(response.EM);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.EM || "Đã xảy ra lỗi");
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  var temp = false;

  const findTestById = (id) => {
    return data.find((item) => item.Id === id);
  };

  const ActionButtons = ({ id }) => {
    const handleDelete = async () => {
      if (window.confirm("Bạn có thực sự muốn xóa Test có id=" + id)) {
        await delTestById(id);
        await fetchListTests();
      }
    };

    const handleEdit = () => {
      if (findTestById(id)) {
        handleShowModalUpdate(id);
      }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <button className="btn-action" onClick={handleEdit}>
          <FaEllipsisV style={{ color: "#A5A6B1", cursor: "pointer" }} />
        </button>

        <button className="btn-action" onClick={handleDelete}>
          <FaTrashAlt style={{ color: "#A5A6B1", cursor: "pointer" }} />
        </button>
      </div>
    );
  };

  const EditableDescription = ({ row, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(row.Description);

    const handleDoubleClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e) => {
      setDescription(e.target.value);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setIsEditing(false);
        // Gọi hàm onUpdate để cập nhật giá trị mới của Description
        onUpdate(row.Id, description);
      }
    };

    return (
      <>
        {isEditing ? (
          <input
            type="text"
            value={description}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)} // Thoát khỏi chế độ chỉnh sửa khi mất focus
            autoFocus
            class="form-control"
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>{description}</span>
        )}
      </>
    );
  };

  const StatusLabel = ({ status }) => {
    const statusStyles = {
      FullTime: { backgroundColor: "#1E90FF", color: "white" },
      Pending: { backgroundColor: "#FFA500", color: "white" },
      PartTime: { backgroundColor: "#800080", color: "white" },
      Contract: { backgroundColor: "#00CED1", color: "white" },
    };

    return (
      <span
        style={{
          fontSize: "10px",
          padding: "5px 5px",
          borderRadius: "10px",
          ...statusStyles[status.replace(/-/g, "")], // Loại bỏ dấu cách
        }}
      >
        {status}
      </span>
    );
  };

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  //Hiện modal add user
  const handleShowModalAdd = () => {
    if (selectedTestID === "-1" || selectedTestID === null) {
      toast.warning("Choose a test before adding parts");
      return;
    }
    if (data.length >= 7) {
      console.log(data.length);
      toast.warning("Cannot add more than 7 parts");
      return;
    }
    // Lấy các `Number` của các part đã có từ dữ liệu
    const existingParts = data.map((part) => part.Number);

    // Lọc ra các part còn thiếu
    setMissingParts(
      requiredParts.filter((partNumber) => !existingParts.includes(partNumber))
    );

    refModalUser.current.open("", "Add");
  };

  //Hiện modal update user
  const handleShowModalUpdate = (id) => {
    refModalUser.current.open(findTestById(id), "Update");
  };

  //Hàm thêm user
  const handleAdd = async (newPart) => {
    newPart.TestID = +selectedTestID;
    newPart.Name = "Part " + newPart.Number;
    newPart.Number = +newPart.Number;
    newPart.CreatedAt = new Date().toISOString(); // Đảm bảo thời gian theo định dạng chuẩn ISO
    newPart.UpdatedAt = new Date().toISOString();
    console.log(newPart);
    let response = await postNewPart(newPart);
    console.log(response);
    if (response.EC === 0 && response) {
      toast.success(response.EM);
      console.log(response.DT);
      fetchListPartOfTest(selectedTestID);
    } else {
      toast.error(response.EM);
    }
  };

  //Hàm update user
  const handleUpdate = async (updatedUser) => {
    updatedUser.UpdatedAt = new Date().toISOString();
    console.log(updatedUser);
    let response = await putUpdateTest(updatedUser);
    if (response.EC === 0 && response) {
      toast.success(response.EM);
      fetchListTests();
    } else {
      toast.error(response.EM);
    }
  };

  useDebounce(
    () => {
      const filteredData = data.filter((item) => {
        return (
          item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Difficulty.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      console.log(filteredData);
      if (filteredData.length === 0) {
        return;
      }
      setData([...filteredData]);
    },
    [searchTerm],
    500
  );

  return (
    <>
      <div className="AdminPersonnel">
        <div className="AdminPersonnel-item">
          <Card>
            <Card.Header>Part Management</Card.Header>
            <Card.Body>
              <div className="AdminPersonnel-item-wrapper">
                <div className="AdminPersonnel-item-wrapper-top">
                  <div className="AdminPersonnel-item-wrapper-top-searchbar">
                    <input
                      placeholder="Search..."
                      type="search"
                      title="Search within table"
                      aria-controls="datatablesSimple"
                      value={searchTerm}
                      onChange={handleSearch}
                    ></input>
                  </div>
                  <div>
                    <Form.Group controlId="testSelect">
                      <Form.Select
                        onChange={(e) => handleSelectTest(e.target.value)}
                      >
                        <option value="-1">Select a test</option>
                        {tests.map((test) => (
                          <option key={test.Id} value={test.Id}>
                            {test.Id} - {test.Name} - {test.Description} -{" "}
                            {test.Difficulty}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="AdminPersonnel-item-wrapper-top-dropdown">
                    <button
                      className="btn btn-primary ms-4"
                      onClick={() => handleShowModalAdd()}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="AdminPersonnel-item-wrapper-data">
                  <DataTable
                    className="rdt_Table_Home"
                    columns={columns}
                    data={data}
                    pagination
                    paginationComponentOptions={paginationOptions}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <ModalAddUpdateUser
        ref={refModalUser}
        handleAddPart={handleAdd}
        handleUpdate={handleUpdate}
        parts={missingParts}
      />
    </>
  );
};
export default PartManagement;
