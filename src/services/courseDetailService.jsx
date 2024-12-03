import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách chi tiết khóa học
const getCourseDetails = async () => {
  try {
    const response = await axios.get("/api/CourseDetail");
    console.log("Course details data:", response);
    if (response.ec === 1) {
      console.log("Course details data:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

// Hàm thêm chi tiết khóa học mới
const addCourseDetail = async (courseDetailData) => {
  try {
    const response = await axios.post("api/CourseDetail", courseDetailData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Course detail added:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding course detail:", error);
    throw error;
  }
};

// Hàm xóa chi tiết khóa học theo ID
const deleteCourseDetail = async (courseDetailID) => {
  try {
    const response = await axios.delete(`api/CourseDetail/${courseDetailID}`);
    if (response.ec === 1) {
      console.log("Course detail deleted:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting course detail:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin chi tiết khóa học theo ID
const updateCourseDetail = async (courseDetailID, courseDetailData) => {
  try {
    const response = await axios.put(
      `api/CourseDetail/${courseDetailID}`,
      courseDetailData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ec === 1) {
      console.log("Course detail updated:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating course detail:", error);
    throw error;
  }
};

// Export các hàm để sử dụng trong các thành phần khác
export {
  getCourseDetails,
  addCourseDetail,
  deleteCourseDetail,
  updateCourseDetail,
};
