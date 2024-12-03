import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách chi tiết bài học
const getLessonDetails = async () => {
  try {
    const response = await axios.get("/api/LessonDetail");
    console.log("Lesson details data:", response);
    if (response.ec === 1) {
      console.log("Lesson details data:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching lesson details:", error);
    throw error;
  }
};

// Hàm thêm chi tiết bài học mới
const addLessonDetail = async (lessonDetailData) => {
  try {
    const response = await axios.post("api/LessonDetail", lessonDetailData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Lesson detail added:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding lesson detail:", error);
    throw error;
  }
};

// Hàm xóa chi tiết bài học theo ID
const deleteLessonDetail = async (lessonDetailID) => {
  try {
    const response = await axios.delete(`api/LessonDetail/${lessonDetailID}`);
    if (response.ec === 1) {
      console.log("Lesson detail deleted:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting lesson detail:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin chi tiết bài học theo ID
const updateLessonDetail = async (lessonDetailID, lessonDetailData) => {
  try {
    const response = await axios.put(
      `api/LessonDetail/${lessonDetailID}`,
      lessonDetailData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ec === 1) {
      console.log("Lesson detail updated:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating lesson detail:", error);
    throw error;
  }
};

// Export các hàm để sử dụng trong các thành phần khác
export {
  getLessonDetails,
  addLessonDetail,
  deleteLessonDetail,
  updateLessonDetail,
};
