import React from "react";
import "./OnlineCourse.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CourseItem from "./CourseItem";

const OnlineCourse = () => {
  const courseType = [
    { id: 1, name: "Danh sách chương trình học" },
    { id: 2, name: "Combo đặc biệt" },
    { id: 3, name: "Ưu đãi hấp dẫn" },
  ];

  const courseData = [
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 1
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 1
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 2
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 2
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 2
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 2
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 2
    },
    {
      image: "./src/assets/online_course/online_course.png",
      title: "Combo 4 kỹ năng IELTS Intensive",
      numberOfReview: "1,681",
      numberOfStudent: "100,000",
      price: "1.500.000đ",
      listingPrice: "3.596.000đ",
      reduce: "57",
      courseTypeID: 3
    },
  ];

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
      <CourseList courseData={courseData} courseType={courseType} />
    </div>
  )
}


const CourseList = ({ courseData, courseType }) => {
  return (
    <div className="content-wrapper">
      <div className="container">
        {courseType.map((type) => (
          <div key={type.id} className="course-type">
            <h3>{type.name}</h3>
            <div className="courses-grid-wrapper">
              {courseData
                .filter((course) => course.courseTypeID === type.id)
                .map((course, index) => (
                  <CourseItem
                    key={index}
                    image={course.image}
                    title={course.title}
                    numberOfReview={course.numberOfReview}
                    numberOfStudent={course.numberOfStudent}
                    price={course.price}
                    listingPrice={course.listingPrice}
                    reduce={course.reduce}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineCourse;