import './TestManagement.scss'
import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEllipsisV } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ModalAddUpdateUser from './ModalAddUpdateUser';
import useDebounce from '../../../../util/useDeboune';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card } from 'react-bootstrap';
import { getTests } from '../../../../services/testService';

const TestManagement = () => {
    //--------------Khai báo ref
    const refModalUser = useRef()

    //----------------Khai báo state
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([

    ]);
    const columns = [
        {
            name: "ID",
            selector: (row) => row.Id,
            sortable: true,
            fixed: true
        },
        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.Description,
            sortable: true
        },
        {
            name: "Difficulty",
            selector: (row) => row.Difficulty,
            sortable: true
        },
        {
            name: "Duration",
            selector: (row) => row.Duration,
            sortable: true
        },
        {
            name: "Created",
            selector: (row) => row.CreatedAt,
            sortable: true
        },
        {
            name: "Updated",
            selector: (row) => row.UpdatedAt,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => <ActionButtons id={row.id} />,
            ignoreRowClick: true,
        },
    ];
    const [dataToShow, setDataToShow] = useState(data);
    const fullData = data;
    // const [lastid, setLastid] = useState(data[data.length - 1].id);

    const fetchListTests = async () => {
        try {
            let response = await getTests();
            if (response && response.EC === 0) {
                console.log(response)
                setData(response.DT);
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

    const findUserById = (id) => {
        return data.find(item => item.id === id);
    };

    const ActionButtons = ({ id }) => {
        const handleDelete = () => {
            if (window.confirm("Bạn có thực sự muốn xóa user có id=" + id)) {
                setData(data.filter(item => item.id !== id));
            }
        };

        const handleEdit = () => {
            if (findUserById(id)) {
                handleShowModalUpdate(id);
            }
        };

        return (
            <div
                style={{
                    display: "flex",
                    // gap: '5px',
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
        refModalUser.current.open("", "Add");
    }

    //Hiện modal update user
    const handleShowModalUpdate = (id) => {
        refModalUser.current.open(findUserById(id), "Update");
    }

    //Hàm thêm user
    const handleAdd = (newUser) => {
        newUser.id = lastid + 1;
        setData([newUser, ...data]);
        setLastid(lastid + 1)
    }

    //Hàm update user
    const handleUpdate = (updatedUser) => {
        const index = data.findIndex(item => item.id === updatedUser.id);
        if (index !== -1) {
            setData(prevData => {
                const newData = [...prevData];
                newData[index] = updatedUser;
                return newData;
            });
        }
    };

    useDebounce(() => {
        const filteredData = fullData.filter((item) => {
            return (
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Office.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Status.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setDataToShow([...filteredData])
    }, [searchTerm], 500
    );

    useEffect(() => {
        fetchListTests();
    }, [])

    useEffect(() => {
        setDataToShow([...data])
    }, [data])



    return (
        <>
            <div className='AdminPersonnel'>
                <div className='AdminPersonnel-item'>
                    <Card>
                        <Card.Header>
                            Test Management
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
                                    <div className='AdminPersonnel-item-wrapper-top-dropdown'>
                                        <button className='btn btn-primary ms-4' onClick={() => handleShowModalAdd()}>Add</button>
                                    </div>
                                </div>
                                <div className='AdminPersonnel-item-wrapper-data'>
                                    <DataTable
                                        className='rdt_Table_Home'
                                        columns={columns}
                                        data={dataToShow}
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
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
            />
        </>
    );
}
export default TestManagement;