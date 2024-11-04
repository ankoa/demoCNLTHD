import React, { useState, useEffect } from 'react';
import AddUserModal from "./AddUserModal";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUsers from "./TableUsers";
import { getListUser, getListUserPaginate } from "../../../../service/userService";
import UpdateUserModal from './UpdateUserModal';
import DeleteUserModal from './DeleteUserModal';
import TableUserPaginate from './TableUserPaginate';

const ManageUser = () => {
    const LIMIT_USER = 3;
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [view, setView] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchUsersPaginate(1, LIMIT_USER);
    }, []);

    const fetchUsers = async () => {
        let response = await getListUser();
        if (response.EC === 0) {
            setListUsers(response.DT);
        }
    };

    const fetchUsersPaginate = async (page) => {
        let response = await getListUserPaginate(page, LIMIT_USER);
        if (response.EC === 0) {
            setListUsers(response.DT.users);
            setPageCount(response.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user);
    };

    const handleClickBtnView = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user);
        setView(true);
    };

    const handleClickBtnDelete = (user) => {
        setShowDelete(true);
        setDataUpdate(user);
    };

    const resetDataUpdate = () => {
        setDataUpdate([]);
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btnAddUser">
                    <button className="btn btn-primary" onClick={() => setShow(true)}>
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div className="table-users">
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchUsersPaginate={fetchUsersPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <AddUserModal
                        fetchUsers={fetchUsers}
                        fetchUsersPaginate={fetchUsersPaginate}
                        show={show}
                        setShow={setShow}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <UpdateUserModal
                        dataUpdate={dataUpdate}
                        fetchUsers={fetchUsers}
                        fetchUsersPaginate={fetchUsersPaginate}
                        showModalUpdate={showModalUpdate}
                        setShowModalUpdate={setShowModalUpdate}
                        view={view}
                        setView={setView}
                        resetDataUpdate={resetDataUpdate}
                        currentPage={currentPage}
                    />
                    <DeleteUserModal
                        dataUpdate={dataUpdate}
                        fetchUsersPaginate={fetchUsersPaginate}
                        fetchUsers={fetchUsers}
                        showDelete={showDelete}
                        setShowDelete={setShowDelete}
                        resetDataUpdate={resetDataUpdate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        LIMIT_USER={LIMIT_USER}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
