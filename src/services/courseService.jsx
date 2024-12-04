import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách khóa học
const getCourses = async () => {
  try {
    const response = await axios.get("/api/Course");
    console.log("Courses data:", response);
    if (response.ec === 1) {
      console.log("Courses data:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Hàm thêm khóa học mới
const addCourse = async (courseData) => {
  try {
    const response = await axios.post("api/Course", courseData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Course added:", response.dt);
      return response; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// Hàm xóa khóa học theo ID
const deleteCourse = async (courseID) => {
  try {
    const response = await axios.delete(`api/Course/${courseID}`);
    if (response.ec === 1) {
      console.log("Course deleted:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin khóa học theo ID
const updateCourse = async (courseID, courseData) => {
  try {
    const response = await axios.put(`api/Course/${courseID}`, courseData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Course updated:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Export các hàm để sử dụng trong các thành phần khác
export { getCourses, addCourse, deleteCourse, updateCourse };
