import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Homepage.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getCourses } from "../../../services/courseService";

const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Thêm autoplay để slider tự động cuộn
        autoplaySpeed: 3000, // Thay đổi tốc độ tự động cuộn
        arrows: false, // Ẩn các nút điều hướng
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        //hàm lấy lesson của 1 course
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const data = await getCourses(); // Gọi API
                const first10Courses = data.slice(0, 10); // Lấy 10 khóa học đầu tiên
                setCourses(first10Courses);
                console.log("Course: ", first10Courses);
            } catch (err) {
                console.log("Lỗi khi lấy dữ liệu course: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); // Chỉ chạy 1 lần khi component mount

    const handleCourseClick = (course) => {
        navigate(`/onlinecourse/purchase/${course.courseId}`, {
            state: {
                title: course.title,
                price: course.price,
                name: course.name,
                description: course.description,
                courseId: course.courseId
            }, // Pass entire course info as state
        });
    };

    // Định dạng giá tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className='homepage-container'>
            <div className='slider-container'>
                <div className='ads-slider'>
                    <div className='ads-title'>Học 1 lần là 990 điểm liền</div>
                    <button className='btn btn-warning mt-3 text-white fw-bold'>Kiểm tra ngay</button>
                </div>
                <div className='slider'>
                    <Slider {...settings}>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg' alt='Slide 1' />
                        </div>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg' alt='Slide 2' />
                        </div>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg' alt='Slide 3' />
                        </div>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-chot.jpg' alt='Slide 4' />
                        </div>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg' alt='Slide 5' />
                        </div>
                        <div>
                            <img className='img-fluid' src='https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-luu-tai-ve-ket-qua-bai-thi-1178-x-615-px.jpg' alt='Slide 6' />
                        </div>
                    </Slider>
                </div>
            </div>

            <div className='new-test-container'>
                {courses.map((course, index) => (
                    <Card key={index} style={{ width: '20rem', marginBottom: '20px' }} >
                        <Card.Img variant="top" src={course.image || "default-image.jpg"} alt={course.title} />
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>{course.description}</Card.Text>
                            <div className='card-bottom'>
                                <Card.Text className="card-price">{formatPrice(course.price)}</Card.Text>
                                <Button
                                    onClick={() => handleCourseClick(course)}
                                    variant="primary"
                                >
                                    Mua
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
