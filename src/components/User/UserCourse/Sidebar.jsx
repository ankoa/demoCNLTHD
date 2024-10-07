import React, { useState } from 'react';
import './Sidebar.scss';
import { IoMdMenu } from "react-icons/io";
const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('completeToeic'); // Trạng thái mục được chọn
    const [showSideBar, setShowSideBar] = useState(false);

    const handleShowSidebar = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <>
            <div className={`toggle justify-content-between`}>
                <div className='toggle-title'>Trang chủ</div>
                <IoMdMenu onClick={() => handleShowSidebar()} className='sidebar-toogle-btn' size={'30px'} color='#fff' />
            </div>
            <div className={`sidebar ${showSideBar ? "show" : "collapsed"}`}>

                <ul className="list-group">
                    <li
                        className="list-group-item bg-primary text-white"
                        onClick={() => setActiveItem('completeToeic')}
                    >
                        Complete TOEIC
                    </li>

                    <li
                        className={`list-group-item ${activeItem === 'vocabulary' ? 'active' : ''}`}
                        onClick={() => setActiveItem('vocabulary')}
                    >
                        Từ vựng TOEIC
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'grammar' ? 'active' : ''}`}
                        onClick={() => setActiveItem('grammar')}
                    >
                        Ngữ pháp TOEIC
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part1' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part1')}
                    >
                        Part 1: Photographs - Nghe tranh
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part2' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part2')}
                    >
                        Part 2: Question - Response - Hỏi - đáp
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part3' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part3')}
                    >
                        Part 3: Conversations - Nghe hiểu đối thoại
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part4' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part4')}
                    >
                        Part 4: Talks - Nghe hiểu bài nói
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part5' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part5')}
                    >
                        Part 5: Incomplete Sentences - Điền từ vào câu
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part6' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part6')}
                    >
                        Part 6: Text Completion - Điền từ vào đoạn văn
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'part7' ? 'active' : ''}`}
                        onClick={() => setActiveItem('part7')}
                    >
                        Part 7: Reading Comprehension - Đọc hiểu văn bản
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'dictation' ? 'active' : ''}`}
                        onClick={() => setActiveItem('dictation')}
                    >
                        Luyện nghe chép chính tả TOEIC
                    </li>
                    <li
                        className={`list-group-item ${activeItem === 'renewal' ? 'active' : ''}`}
                        onClick={() => setActiveItem('renewal')}
                    >
                        Gia hạn khóa học
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
