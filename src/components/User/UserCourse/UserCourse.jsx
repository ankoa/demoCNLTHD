import React from 'react';
import Sidebar from './Sidebar';
import Content from './content';
import Task from './Task';
import './UserCourse.scss';

const UserCourse = () => {
    return (
        <div className="UserCourse">
            <Sidebar />
            <div className="content flex-grow-1 p-4">
                <Content />
            </div>
        </div>
    );
}

export default UserCourse;
