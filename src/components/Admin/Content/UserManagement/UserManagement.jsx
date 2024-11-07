import './UserManagement.scss'
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
import { deleteTestById, getTests, postNewTest, putUpdateTest } from '../../../../services/testService';
import { toast } from 'react-toastify';
import { getUsers } from '../../../../services/authService';
import { MdModeEditOutline, MdOutlineLockReset } from "react-icons/md";
import { getUserWithRoleById } from '../../../../services/userService';

const UserManagement = () => {
    //--------------Khai báo ref
    const refModalUser = useRef()

    //----------------Khai báo state
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([

    ]);
    const columns = [
        {
            name: "UserID",
            selector: (row) => row.UserID,
            sortable: true,
            fixed: true,
            width: "10%"  // Chỉnh kích thước cột theo %
        },
        {
            name: "Username",
            selector: (row) => row.Username,
            sortable: true,
            width: "15%"  // Ví dụ: 15% cho cột Username
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: true,
            width: "20%"  // Ví dụ: 20% cho cột Email
        },
        {
            name: "FirstName",
            selector: (row) => row.FirstName,
            sortable: true,
            width: "15%"  // Ví dụ: 15% cho cột FirstName
        },
        {
            name: "LastName",
            selector: (row) => row.LastName,
            sortable: true,
            width: "15%"  // Ví dụ: 15% cho cột LastName
        },
        {
            name: "Created",
            selector: (row) => new Date(row.CreatedAt).toLocaleString("vi-VN"),
            sortable: true,
            width: "15%"  // Ví dụ: 15% cho cột Created
        },
        {
            name: "Actions",
            cell: (row) => <ActionButtons id={row.UserID} />,
            ignoreRowClick: true,
            width: "15%"  // Ví dụ: 10% cho cột Actions
        },
    ];

    const [dataToShow, setDataToShow] = useState(data);
    const fullData = data;
    // const [lastid, setLastid] = useState(data[data.length - 1].id);


    useEffect(() => {
        fetchListUsers();
    }, [])

    useEffect(() => {
        setDataToShow([...data]);  // Cập nhật lại dataToShow khi data thay đổi
    }, [data]);  // Chỉ gọi khi data thay đổi

    const fetchListUsers = async () => {
        try {
            let response = await getUsers();
            if (response && response.EC === 0) {
                setData(response.DT);
                console.log(data);
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

    const delUserById = async (id) => {
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

    const findTestById = async (id) => {
        return await getUserWithRoleById(id);
    };

    const ActionButtons = ({ id }) => {
        const handleDelete = async () => {
            if (window.confirm("Bạn có thực sự muốn xóa Test có id=" + id)) {
                await delUserById(id);
                await fetchListUsers();
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
                    // gap: '5px',
                    width: "100%",
                }}
            >
                <button className='btn-action' onClick={handleEdit}>
                    <MdModeEditOutline
                        style={{ color: "#A5A6B1", cursor: "pointer" }}

                    />
                </button>

                <button className='btn-action' onClick={handleDelete}>
                    <MdOutlineLockReset size={'18px'}
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
    const handleShowModalUpdate = async (id) => {
        // console.log(await findTestById(id));
        refModalUser.current.open(await findTestById(id), "Update");
    }

    //Hàm thêm user
    const handleAdd = async (newUser) => {
        newUser.UpdatedAt = new Date().toISOString();
        newUser.CreatedAt = new Date().toISOString();
        let response = await postNewTest(newUser);
        if (response.EC === 0 && response) {
            toast.success(response.EM)
            fetchListUsers();
        } else {
            toast.error(response.EM)
        }
    }

    //Hàm update user
    const handleUpdate = async (updatedUser) => {
        updatedUser.UpdatedAt = new Date().toISOString();
        console.log(updatedUser);
        let response = await putUpdateTest(updatedUser);
        if (response.EC === 0 && response) {
            toast.success(response.EM)
            fetchListUsers();
        } else {
            toast.error(response.EM)
        }
    };

    useDebounce(() => {
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
        setData([...filteredData])
    }, [searchTerm], 500
    );




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
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
            />
        </>
    );
}
export default UserManagement;