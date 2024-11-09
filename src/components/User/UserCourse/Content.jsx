import React, { useState } from 'react';
import Task from './Task';
import './Content.scss';

const Content = () => {
    const [selectedTab, setSelectedTab] = useState('today');
    const [activeTab, setActiveTab] = useState('learning');
    // Các task của hôm nay
    const todayTasks = [
        {
            title: "Reading: Hàng ngày",
            items: [
                "Làm riêng từng part bạn muốn luyện tập (bấm thời gian 1 phút/câu)",
                "Làm lại các câu làm sai 1 lần",
                "Làm lại các bài vừa học, thích nhất là 1.25x tốc độ",
                "Làm các chủ đề chưa làm, học các chủ đề chưa học"
            ]
        },
        {
            title: "Listening: Hàng ngày",
            items: [
                "Làm riêng từng part bạn muốn luyện tập (bấm thời gian 1 phút/câu)",
                "Làm lại các câu làm sai 1 lần",
                "Làm lại các bài vừa học, thích nhất là 1.25x tốc độ",
                "Làm các chủ đề chưa làm, học các chủ đề chưa học"
            ]
        },
        {
            title: "Từ vựng/ngữ pháp: Hàng ngày",
            items: [
                "Học từ vựng (flashcards mỗi ngày 20-30 từ)",
                "Học và làm bài tập ngữ pháp (1-2 ngày học 1 chủ đề ngữ pháp)"
            ]
        }
    ];


    // Các task của tuần
    const weekTasks = [
        {
            title: "Reading: Theo tuần",
            items: [
                "Làm bài tập Reading tổng hợp theo tuần",
                "Ôn lại các bài trước"
            ]
        },
        {
            title: "Listening: Theo tuần",
            items: [
                "Luyện nghe part 1-3 trong tuần",
                "Ôn lại các câu hỏi sai"
            ]
        },
        {
            title: "Từ vựng/ngữ pháp: Theo tuần",
            items: [
                "Ôn lại từ vựng học trong tuần",
                "Làm bài tập ngữ pháp tổng hợp"
            ]
        }
    ];

    const renderTasks = () => {
        const tasks = selectedTab === 'today' ? todayTasks : weekTasks;
        return tasks.map((task, index) => (
            <Task key={index} title={task.title} items={task.items} />
        ));
    };
    const renderVideo = () => {
        if (activeTab === 'learning') {
            return (
                <div className="video-container">
                    <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/example_video_1"
                        title="Hướng dẫn cách học"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        } else {
            return (
                <div className="video-container">
                    <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/example_video_2"
                        title="Hướng dẫn luyện đề"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        }
    };
    return (
        <div className="content">
            <h1>Complete TOEIC</h1>
            <div className="schedule">
                <h2><i className="far fa-calendar-alt"></i> Lịch học của bạn</h2>
                <p>Tham khảo tất cả lịch học gợi ý, phù hợp target của bạn từ STUDY4</p>

                <div>
                    <h2>
                        Complete TOEIC 650+ <i className="fas fa-edit"></i>
                        <span className="status">Active</span>
                    </h2>
                    <p>- Dành cho các bạn học viên target 650+ đã đăng ký khóa Complete TOEIC của STUDY4</p>
                    <p>- Thứ tự học từng kỹ năng: chú ý CHỈ LUYỆN một part cho đến khi đạt tỉ lệ đúng 70-80% rồi mới chuyển sang part khác.</p>
                    <p>--- Listening: part 1 &gt; part 2 &gt; part 4 &gt; part 3</p>
                    <p>--- Reading: part 5 &gt; part 6 &gt; part 7</p>
                    <p>- Chú ý không luyện nhiều part khác quá 1 kỳ nâng cấp mục tiêu</p>
                </div>

                <div className="tabs">
                    <button
                        className={selectedTab === 'today' ? 'active' : ''}
                        onClick={() => setSelectedTab('today')}
                    >
                        Hôm nay cần làm
                    </button>
                    <button
                        className={selectedTab === 'week' ? 'active' : ''}
                        onClick={() => setSelectedTab('week')}
                    >
                        Theo tuần
                    </button>
                    <button>Chỉnh sửa/Thêm mới</button>
                </div>

                <div className="tasks">
                    {renderTasks()}
                </div>
            </div>
            <div className="video-container mt-5">
                <div className="tabs">
                    <button
                        className={`btn btn-primary ${activeTab === 'learning' ? 'active' : ''}`}
                        onClick={() => setActiveTab('learning')}
                    >
                        Hướng dẫn cách học
                    </button>
                    <button
                        className={`btn btn-secondary ${activeTab === 'practice' ? 'active' : ''}`}
                        onClick={() => setActiveTab('practice')}
                    >
                        Hướng dẫn luyện đề
                    </button>
                </div>

                <div className="video-tab-content mt-4">
                    {renderVideo()}
                </div>
            </div>
        </div>
    );
}

export default Content;
