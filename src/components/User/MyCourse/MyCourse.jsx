import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./MyCourse.scss";
import { getCourseExistings } from '../../../services/courseExistingService';
import { getCourses } from '../../../services/courseService';

const MyCourses = () => {
  const userID = useSelector((state) => state.userReducer.account.userid);
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    // API call lấy danh sách khóa học người dùng đã đăng ký
    const fetchUserCourses = async () => {
      const response = await getCourseExistings();
      const filteredCourses = response.filter(course => course.userID === userID);  // Lọc các khóa học theo userID
      setUserCourses(filteredCourses);  // Cập nhật state với danh sách khóa học đã lọc
    };

    // API call lấy thông tin chi tiết về các khóa học
    const fetchCourseDetails = async () => {
      const data = await getCourses();
      setCourseDetails(data);
    };

    fetchUserCourses();
    fetchCourseDetails();
  }, [userID]);

  // Hàm tìm thông tin khóa học theo id
  const getCourseDetails = (courseId) => {
    return courseDetails.find(course => course.courseId === courseId);
  };

  const handleOnclickCourse = (courseId) => {
    navigate(`/lesson/${courseId}`);
  }

  return (
    <div className="user-courses">
      <h2>Khóa học của tôi</h2>
      {userCourses.length === 0 ? (
        <p>Không tìm thấy khóa học.</p>
      ) : (
        <div className="course-list">
          {userCourses.map((userCourse) => {
            const courseInfo = getCourseDetails(userCourse.idCourse);
            console.log(courseInfo, userCourse)
            return (
              <div
                key={userCourse.courseExistingId}
                className="course-item"
                onClick={() => handleOnclickCourse(userCourse.idCourse)}
              >
                {courseInfo ? (
                  <>
                    <img src={courseInfo.image || ""} alt={courseInfo.name || "Course"} className="course-image" />
                    <div className='course-info'>
                      <h3>[{courseInfo.name}] {courseInfo.title}</h3>
                      <p><strong>Ngày bắt đầu:</strong> {new Date(userCourse.dateTimeStart).toLocaleString()}</p>
                      <p><strong>Ngày kết thúc:</strong> {new Date(userCourse.dateTimeEnd).toLocaleString()}</p>
                    </div>
                  </>
                ) : (
                  <p>Đang tải thông tin của khóa học...</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
