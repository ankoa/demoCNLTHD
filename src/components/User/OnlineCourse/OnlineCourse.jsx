import React, { useState, useEffect } from "react";
import "./OnlineCourse.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CourseItem from "./CourseItem";
import { getCourses } from "../../../services/courseService";

const OnlineCourse = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    //hàm lấy lesson của 1 course
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses(); // Gọi API
        setCourses(data);
        console.log("Course: ", data);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu course: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Chỉ chạy 1 lần khi component mount

  return (
    <div className='online-course-container'>
      <div className="site-content-wrapper">
        <div className="content-header">
          <div className="image-wrapper">
              <img src='./src/assets/online_course/online_course_banner.png' alt='banner'></img>
          </div>
          <br />
          <h1>Chương trình học online</h1>
          <p>Với sự đa dạng các khóa học offline & online, mỗi học viên sẽ có cơ hội trải nghiệm phương pháp và lộ trình học tiếng Anh độc đáo, chỉ duy nhất tại Zenlish. Học viên sẽ dễ dàng tiếp nhận kiến thức, đạt mục tiêu TOEIC chỉ sau 1 lần học
          </p>
        </div>
      </div>
      <CourseList courseData={courses}/>
    </div>
  )
}


const CourseList = ({ courseData }) => {
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="courses-grid-wrapper">
          {courseData
            .map((course) => (
              <CourseItem
                courseId={course.courseId}
                image={course.image}
                name={course.name}
                title={course.title}
                price={course.price}
                description={course.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineCourse;