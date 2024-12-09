import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách các khóa học hiện có
const getCourseExistings = async () => {
  try {
    return await axios.get("/api/CourseExisting");
  } catch (error) {
    console.error("Error fetching course existings:", error);
    throw error;
  }
};

const getCourseExistingsNam = async (nam) => {
  try {
    const response = await axios.get("/api/CourseExisting/Nam?Nam=" + nam);
    if (response.ec === 1) {
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

// Hàm tìm khóa học hiện có theo ID
const findByID = async (id) => {
  console.log("Finding course existing by ID:", id);
  try {
    const response = await axios.get(`/api/CourseExisting/ID?ID=${id}`);
    console.log("Course existing by ID:", response);
    if (response.ec === 1) {
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching course existing by ID:", error);
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
      `api/CourseExisting/courseExistingID?courseExistingID=${courseExistingID}`
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
  console.log("Course existing data:", courseExistingData);
  try {
    const response = await axios.put(
      `api/CourseExisting/courseExistingID?courseExistingID=${courseExistingID}`,
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
  findByID,
  addCourseExisting,
  deleteCourseExisting,
  updateCourseExisting,
  getCourseExistingsNam,
};
