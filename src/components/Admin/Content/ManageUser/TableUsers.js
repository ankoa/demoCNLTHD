import React from 'react';

const TableUsers = ({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((item, index) => (
                        <tr key={`table-user-${index}`}>
                            <td scope="row">{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleClickBtnView(item)}>View</button>
                                <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleClickBtnDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>No data</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableUsers;
