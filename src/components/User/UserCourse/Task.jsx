import React from 'react';
import './Task.scss';

const Task = ({ title, items }) => {
    return (
        <div className="task">
            <h3>{title}</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <input type="checkbox" /> {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Task;
