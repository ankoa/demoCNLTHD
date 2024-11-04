import React from "react";
import "./OnlineCourse.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CourseItem from "./CourseItem";

const OnlineCourse = () => {
  return (
    <div className='online-course-container'>
      <div className="site-content-wrapper">
        <div className="content-header">
          <div className="image-wrapper">
            <a href="#">
              <img src='./src/assets/online_course/online_course_banner.png' alt='banner'></img>
            </a>
          </div>
          <br />
          <h1>Chương trình học online</h1>
          <p>Với sự đa dạng các khóa học offline & online, mỗi học viên sẽ có cơ hội trải nghiệm phương pháp và lộ trình học tiếng Anh độc đáo, chỉ duy nhất tại Zenlish. Học viên sẽ dễ dàng tiếp nhận kiến thức, đạt mục tiêu TOEIC chỉ sau 1 lần học
          </p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container">
          {/* các loại course khác nhau */}
          <div className="course-type">
            <h3>Combo đặc biệt</h3>
            <div className="courses-grid-wrapper">
              {/* map dữ liệu từ db lên */}
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
            </div>
          </div>
          
          <div className="course-type">
            <h3>Danh sách chương trình học</h3>
            <div className="courses-grid-wrapper">
              {/* map dữ liệu từ db lên */}
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
              <CourseItem
                image="./src/assets/online_course/online_course.png"
                title="Combo 4 kỹ năng IELTS Intensive"
                numberOfReview="1,681"
                numberOfStudent="100,000"
                price="1.500.000đ"
                listingPrice="3.596.000đ"
                reduce="57"
              ></CourseItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineCourse;