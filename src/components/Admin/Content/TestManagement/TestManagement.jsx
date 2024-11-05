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
        {
            id: 1,
            Name: "Tiger Nixon",
            Position: "System Architect",
            Office: "Edinburgh",
            Age: "61",
            Startdate: "2011/04/25",
            Salary: "320800",
            Status: "Full-Time",
        },
        {
            id: 2,
            Name: "Garrett Winters",
            Position: "Accountant",
            Office: "Tokyo",
            Age: "63",
            Startdate: "2011/07/25",
            Salary: "170750",
            Status: "Pending",
        },
        {
            id: 3,
            Name: "Ashton Cox",
            Position: "Junior Technical Author",
            Office: "San Francisco",
            Age: "66",
            Startdate: "2009/01/12",
            Salary: "86000",
            Status: "Part-Time",
        },
        {
            id: 4,
            Name: "Cedric Kelly",
            Position: "Senior Javascript Developer",
            Office: "Edinburgh",
            Age: "22",
            Startdate: "2012/03/29",
            Salary: "433060",
            Status: "Contract",
        },
        {
            id: 5,
            Name: "Airi Satou",
            Position: "Accountant",
            Office: "Tokyo",
            Age: "33",
            Startdate: "2008/11/28",
            Salary: "162700",
            Status: "Full-Time",
        },
        {
            id: 6,
            Name: "Brielle Williamson",
            Position: "Integration Specialist",
            Office: "New York",
            Age: "61",
            Startdate: "2012/12/02",
            Salary: "372000",
            Status: "Full-Time",
        },
        {
            id: 7,
            Name: "Herrod Chandler",
            Position: "Sales Assistant",
            Office: "San Francisco",
            Age: "59",
            Startdate: "2012/08/06",
            Salary: "137500",
            Status: "Contract",
        },
        {
            id: 8,
            Name: "Rhona Davidson",
            Position: "Integration Specialist",
            Office: "Tokyo",
            Age: "55",
            Startdate: "2010/10/14",
            Salary: "327900",
            Status: "Pending",
        },
        {
            id: 9,
            Name: "Colleen Hurst",
            Position: "Javascript Developer",
            Office: "San Francisco",
            Age: "39",
            Startdate: "2009/09/15",
            Salary: "205500",
            Status: "Part-Time",
        },
        {
            id: 10,
            Name: "Sonya Frost",
            Position: "Software Engineer",
            Office: "Edinburgh",
            Age: "23",
            Startdate: "2008/12/13",
            Salary: "103600",
            Status: "Full-Time",
        },
        {
            id: 11,
            Name: "Jena Gaines",
            Position: "Office Manager",
            Office: "London",
            Age: "30",
            Startdate: "2008/12/19",
            Salary: "90560",
            Status: "Part-Time",
        },
        {
            id: 12,
            Name: "Quinn Flynn",
            Position: "Support Lead",
            Office: "Edinburgh",
            Age: "22",
            Startdate: "2013/03/03",
            Salary: "342000",
            Status: "Full-Time",
        },
        {
            id: 13,
            Name: "Charde Marshall",
            Position: "Regional Director",
            Office: "San Francisco",
            Age: "36",
            Startdate: "2008/10/16",
            Salary: "470600",
            Status: "Pending",
        },
        {
            id: 14,
            Name: "Haley Kennedy",
            Position: "Senior Marketing Designer",
            Office: "London",
            Age: "43",
            Startdate: "2012/12/18",
            Salary: "313500",
            Status: "Contract",
        },
        {
            id: 15,
            Name: "Tatyana Fitzpatrick",
            Position: "Regional Director",
            Office: "London",
            Age: "19",
            Startdate: "2010/03/17",
            Salary: "385750",
            Status: "Full-Time",
        },
        {
            id: 16,
            Name: "Michael Silva",
            Position: "Marketing Designer",
            Office: "London",
            Age: "66",
            Startdate: "2012/11/27",
            Salary: "198500",
            Status: "Part-Time",
        },
        {
            id: 17,
            Name: "Paul Byrd",
            Position: "Chief Financial Officer (CFO)",
            Office: "New York",
            Age: "64",
            Startdate: "2010/06/09",
            Salary: "725000",
            Status: "Full-Time",
        },
        {
            id: 18,
            Name: "Gloria Little",
            Position: "Systems Administrator",
            Office: "New York",
            Age: "59",
            Startdate: "2009/04/10",
            Salary: "237500",
            Status: "Contract",
        },
        {
            id: 19,
            Name: "Bradley Greer",
            Position: "Software Engineer",
            Office: "London",
            Age: "41",
            Startdate: "2012/10/13",
            Salary: "132000",
            Status: "Pending",
        },
        {
            id: 20,
            Name: "Dai Rios",
            Position: "Personnel Lead",
            Office: "Edinburgh",
            Age: "35",
            Startdate: "2012/09/26",
            Salary: "217500",
            Status: "Part-Time",
        },
        {
            id: 21,
            Name: "Jenette Caldwell",
            Position: "Development Lead",
            Office: "New York",
            Age: "30",
            Startdate: "2011/09/03",
            Salary: "345000",
            Status: "Full-Time",
        },
        {
            id: 22,
            Name: "Yuri Berry",
            Position: "Chief Marketing Officer (CMO)",
            Office: "New York",
            Age: "40",
            Startdate: "2009/06/25",
            Salary: "675000",
            Status: "Pending",
        },
        {
            id: 23,
            Name: "Caesar Vance",
            Position: "Pre-Sales Support",
            Office: "New York",
            Age: "21",
            Startdate: "2011/12/12",
            Salary: "106450",
            Status: "Contract",
        },
        {
            id: 24,
            Name: "Doris Wilder",
            Position: "Sales Assistant",
            Office: "Sydney",
            Age: "23",
            Startdate: "2010/09/20",
            Salary: "85600",
            Status: "Full-Time",
        },
        {
            id: 25,
            Name: "Angelica Ramos",
            Position: "Chief Executive Officer (CEO)",
            Office: "London",
            Age: "47",
            Startdate: "2009/10/09",
            Salary: "1200000",
            Status: "Full-Time",
        },
        {
            id: 26,
            Name: "Gavin Joyce",
            Position: "Developer",
            Office: "Edinburgh",
            Age: "42",
            Startdate: "2010/12/22",
            Salary: "92575",
            Status: "Full-Time",
        },
        {
            id: 27,
            Name: "Jennifer Chang",
            Position: "Regional Director",
            Office: "Singapore",
            Age: "28",
            Startdate: "2010/11/14",
            Salary: "357650",
            Status: "Pending",
        },
        {
            id: 28,
            Name: "Brenden Wagner",
            Position: "Software Engineer",
            Office: "San Francisco",
            Age: "35",
            Startdate: "2011/06/07",
            Salary: "206850",
            Status: "Part-Time",
        },
        {
            id: 29,
            Name: "Fiona Green",
            Position: "Chief Operating Officer (COO)",
            Office: "San Francisco",
            Age: "48",
            Startdate: "2010/03/11",
            Salary: "850000",
            Status: "Full-Time",
        },
        {
            id: 30,
            Name: "Shou Itou",
            Position: "Regional Marketing",
            Office: "Tokyo",
            Age: "20",
            Startdate: "2011/08/14",
            Salary: "163000",
            Status: "Pending",
        },
        {
            id: 31,
            Name: "Michelle House",
            Position: "Integration Specialist",
            Office: "Sydney",
            Age: "37",
            Startdate: "2011/06/02",
            Salary: "95400",
            Status: "Contract",
        },
        {
            id: 32,
            Name: "Suki Burks",
            Position: "Developer",
            Office: "London",
            Age: "53",
            Startdate: "2009/10/22",
            Salary: "114500",
            Status: "Pending",
        },
    ]);
    const columns = [
        {
            name: "ID",
            selector: (row) => row.Name,
            sortable: true,
            fixed: true
        },
        {
            name: "Name",
            selector: (row) => row.Position,
            sortable: true,
        },
        {
            name: "Desciption",
            selector: (row) => row.Office,
            sortable: true
        },
        {
            name: "Difficulty",
            selector: (row) => row.Age,
            sortable: true
        },
        {
            name: "Duaration",
            selector: (row) => row.Startdate,
            sortable: true
        },
        {
            name: "Created",
            selector: (row) => USDollar.format(+(row.Salary)),
            sortable: true
        },
        {
            name: "Updated",
            selector: (row) => row.Status,
            cell: (row) => <StatusLabel status={row.Status} />,
        },
        {
            name: "Actions",
            cell: (row) => <ActionButtons id={row.id} />,
            ignoreRowClick: true,
        },
    ];
    const [dataToShow, setDataToShow] = useState(data);
    const fullData = data;
    const [lastid, setLastid] = useState(data[data.length - 1].id);

    const fetchListTests = async () => {
        try {
            let response = await getTests();
            if (response && response.EC === 0) {
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
        setDataToShow([...data])
    }, [data])

    useEffect(() => {
        fetchListTests();
    }, [])

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