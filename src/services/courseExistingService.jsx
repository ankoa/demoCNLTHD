import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách các khóa học hiện có
const getCourseExistings = async () => {
  try {
    const response = await axios.get("/api/CourseExisting");
    console.log("Course existing data:", response);
    if (response.ec === 1) {
      console.log("Course existing data:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching course existings:", error);
    throw error;
  }
};

// Hàm thêm khóa học hiện có mới
const addCourseExisting = async (courseExistingData) => {
  try {
    const response = await axios.post(
      "api/CourseExisting",
      courseExistingData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ec === 1) {
      console.log("Course existing added:", response.dt);
      return response; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding course existing:", error);
    throw error;
  }
};

// Hàm xóa khóa học hiện có theo ID
const deleteCourseExisting = async (courseExistingID) => {
  try {
    const response = await axios.delete(
      `api/CourseExisting/${courseExistingID}`
    );
    if (response.ec === 1) {
      console.log("Course existing deleted:", response.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting course existing:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin khóa học hiện có theo ID
const updateCourseExisting = async (courseExistingID, courseExistingData) => {
  try {
    const response = await axios.put(
      `api/CourseExisting/${courseExistingID}`,
      courseExistingData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ec === 1) {
      console.log("Course existing updated:", response.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating course existing:", error);
    throw error;
  }
};

// Export các hàm để sử dụng trong các thành phần khác
export {
  getCourseExistings,
  addCourseExisting,
  deleteCourseExisting,
  updateCourseExisting,
};
