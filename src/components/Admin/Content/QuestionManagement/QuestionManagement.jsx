import './QuestionManagement.scss'
import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEllipsisV } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ModalAddUpdateUser from './ModalAddUpdateUser';
import useDebounce from '../../../../util/useDeboune';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card, Dropdown, Form } from 'react-bootstrap';
import { deleteTestById, getParfOfTestById, getTests, postNewTest, putUpdateTest } from '../../../../services/testService';
import { toast } from 'react-toastify';
import { getQuestionOfPart, postNewPart, putUpdatePart } from '../../../../services/partService';
import { addQuestion, updateQuestion } from '../../../../services/questionService';

const QuestionManagement = () => {
    //--------------Khai báo ref
    const refModalUser = useRef()

    //----------------Khai báo state
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([
    ]);
    const [tests, setTests] = useState([]);
    const [parts, setParts] = useState([]);
    const [selectedTestID, setSelectedTestID] = useState(null);
    const [selectedPartID, setSelectedPartID] = useState(null);
    const requiredParts = [1, 2, 3, 4, 5, 6, 7];
    const [missingParts, setMissingParts] = useState([]);
    const columns = [
        {
            name: "ID",
            selector: (row) => row.Order,
            sortable: true,
            fixed: true
        },
        {
            name: "Text",
            selector: (row) => row.Text,
            sortable: true,
        },
        {
            name: "Audio",
            selector: (row) => row.AudioName ? row.AudioName : "Null",
            sortable: true,
        },
        {
            name: "Image ",
            selector: (row) => row.ImageName ? row.ImageName : "Null",
            sortable: true,
        },
        {
            name: "Answer Count",
            selector: (row) => row.AnswerCounts,
            sortable: true,
        },
        // {
        //     name: "Description",
        //     cell: (row) => (
        //         <EditableDescription
        //             row={row}
        //             onUpdate={async (id, newDescription) => {
        //                 // Cập nhật dữ liệu của bảng với giá trị mới
        //                 console.log(`Updating description of row with ID ${id} to "${newDescription}"`);
        //                 let response = await putUpdatePart(id, newDescription);
        //                 if (response.EC === 0 && response) {
        //                     toast.success(response.EM);
        //                 } else {
        //                     toast.error(response.EM);
        //                 }
        //             }
        //             }
        //         />
        //     ),
        //     sortable: true
        // },
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
    }, [])

    // useEffect(() => {
    //     if (selectedTestID === '-1' || selectedTestID === null) {
    //         setParts([])
    //         return;
    //     }
    //     fetchListPartOfTest(selectedTestID);
    //     if (selectedPartID === '-1' || selectedPartID === null) {
    //         setData([])
    //         return;
    //     }
    //     fetchQuestionOfPart(selectedPartID);
    // }, [selectedTestID, selectedPartID])

    useEffect(() => {
        if (selectedPartID === '-1' || selectedPartID === null) {
            setData([])
            return;
        }
        fetchQuestionOfPart(selectedPartID);
    }, [, selectedPartID])

    useEffect(() => {
        if (selectedTestID === '-1' || selectedTestID === null) {
            setData([])
            setSelectedPartID('-1')
            return;
        }
        fetchListPartOfTest(selectedTestID);
        setSelectedPartID('-1')
    }, [selectedTestID])

    useEffect(() => {
        setDataToShow([...data]);  // Cập nhật lại dataToShow khi data thay đổi
    }, [data]);  // Chỉ gọi khi data thay đổi

    const handleSelectTest = (testID) => {
        setSelectedTestID(testID); // Cập nhật testID đã chọn
    };

    const handleSelectPart = (partID) => {
        setSelectedPartID(partID); // Cập nhật testID đã chọn
    };

    const fetchQuestionOfPart = async (id) => {
        try {
            let response = await getQuestionOfPart(id);
            if (response && response.EC === 0) {
                setData(response.DT.questions);
            } else if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.EM || "Đã xảy ra lỗi");
            } else {
                console.error("L strugglNotFound xác định:", error);
            }
        }
    }

    const fetchListPartOfTest = async (id) => {
        try {
            let response = await getParfOfTestById(id);
            if (response && response.EC === 0) {
                setParts(response.DT.parts);
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
    }

    const fetchListTests = async () => {
        try {
            let response = await getTests();
            if (response && response.EC === 0) {
                const filteredData = response.DT.filter(test => test.Id !== -1);
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
    }

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
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var temp = false;

    const findTestById = (id) => {
        return data.find(item => item.Id === id);
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
                    gap: '20px',
                    width: "100%",
                }}
            >
                <button className='btn-action' onClick={handleEdit}>
                    <FaEllipsisV
                        style={{ color: "#A5A6B1", cursor: "pointer" }}

                    />
                </button>

                <button className='btn-action' onClick={handleDelete}>
                    <FaTrashAlt
                        style={{ color: "#A5A6B1", cursor: "pointer" }}

                    />
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
            if (e.key === 'Enter') {
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
                    fontSize: '10px',
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
        if (selectedTestID === '-1' || selectedTestID === null) {
            toast.warning("Choose a test before adding questions");
            return;
        }
        if (selectedPartID === '-1' || selectedPartID === null) {
            toast.warning("Choose a part before adding questions");
            return;
        }
        // Lấy các `Number` của các part đã có từ dữ liệu
        const existingParts = data.map(part => part.Number);

        // Lọc ra các part còn thiếu
        setMissingParts(requiredParts.filter(partNumber => !existingParts.includes(partNumber)));

        refModalUser.current.open("", "Add");
    }

    //Hiện modal update user
    const handleShowModalUpdate = (id) => {
        refModalUser.current.open(findTestById(id), "Update");
    }

    //Hàm thêm question
    const handleAdd = async (newTest) => {
        newTest.PartID = +selectedPartID;
        newTest.CreatedAt = new Date().toISOString();  // Đảm bảo thời gian theo định dạng chuẩn ISO
        newTest.UpdatedAt = new Date().toISOString();
        let response = await addQuestion(newTest);
        if (response.EC === 0 && response) {
            toast.success(response.EM)
            fetchQuestionOfPart(selectedPartID);
            console.log(response)
        } else {
            toast.error(response.EM)
        }
        console.log(newTest);
    }

    const handleUpdate = async (updatedUser) => {
        updatedUser.UpdatedAt = new Date().toISOString();
        updatedUser.PartID = +selectedPartID;

        try {
            let response = await updateQuestion(updatedUser.Id, updatedUser);
            console.log(response); // Xem chi tiết phản hồi từ API

            if (response && response.EC === 0) {
                toast.success(response.EM);
                fetchQuestionOfPart(selectedPartID); // Làm mới danh sách bài kiểm tra sau khi cập nhật
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Error updating question");
        }

    };



    // useDebounce(() => {
    //     const filteredData = data.filter((item) => {
    //         return (
    //             item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             item.Difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //     });
    //     console.log(filteredData);
    //     if (filteredData.length === 0) {
    //         return;
    //     }
    //     setData([...filteredData])
    // }, [searchTerm], 500
    // );




    return (
        <>
            <div className='AdminPersonnel'>
                <div className='AdminPersonnel-item'>
                    <Card>
                        <Card.Header>
                            Questions And Answers Management
                        </Card.Header>
                        <Card.Body>
                            <div className='AdminPersonnel-item-wrapper'>
                                <div className='AdminPersonnel-item-wrapper-top'>
                                    <div className='AdminPersonnel-item-wrapper-top-searchbar'>
                                        <input
                                            placeholder="Search..."
                                            type="search"
                                            title="Search within table"
                                            aria-controls="datatablesSimple"
                                            value={searchTerm}
                                            onChange={handleSearch}>
                                        </input>
                                    </div>
                                    <div>
                                        <Form.Group controlId="testSelect">
                                            <Form.Select onChange={(e) => handleSelectTest(e.target.value)}>
                                                <option value="-1">Select a test</option>
                                                {tests.map(test => (
                                                    <option key={test.Id} value={test.Id}>
                                                        {test.Id} - {test.Name} - {test.Description} - {test.Difficulty}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group controlId="partSelect">
                                            <Form.Select onChange={(e) => handleSelectPart(e.target.value)}>
                                                <option value="-1">Select a part</option>
                                                {parts.map(test => (
                                                    <option key={test.Id} value={test.Id}>
                                                        {test.Name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='AdminPersonnel-item-wrapper-top-dropdown'>
                                        <button className='btn btn-primary ms-4' onClick={() => handleShowModalAdd()}>Add</button>
                                    </div>
                                </div>
                                <div className='AdminPersonnel-item-wrapper-data'>
                                    <DataTable
                                        className='rdt_Table_Home'
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
                handleUpdatePart={handleUpdate}
                parts={missingParts}

            />
        </>
    );
}
export default QuestionManagement;