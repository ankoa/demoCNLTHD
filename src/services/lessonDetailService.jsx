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
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching lesson details:", error);
    throw error;
  }
};
const getLessonDetailByID = async (id) => {
  console.log("getLessonDetailByID: ", id);
  try {
    const response = await axios.get(`/api/LessonDetail/ID?ID=${id}`);
    console.log("Lesson detail by ID:", response);
    if (response.ec === 1) {
      console.log("Lesson detail by ID:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching lesson detail by ID:", error);
    throw error;
  }
};
// Hàm thêm chi tiết bài học mới
const addLessonDetail = async (lessonDetailData) => {
  console.log("lessondetail", lessonDetailData);
  try {
    const response = await axios.post("api/LessonDetail", lessonDetailData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Lesson detail added:", response.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding lesson detail:", error);
    throw error;
  }
};

// Hàm xóa chi tiết bài học theo ID
const deleteLessonDetail = async (lessonDetailID) => {
  console.log("Deleting lesson detail with ID:", lessonDetailID);
  try {
    const response = await axios.delete(
      `api/LessonDetail/LessonDetaiID?LessonDetaiID=${lessonDetailID}`
    );
    if (response.ec === 1) {
      console.log("Lesson detail deleted:", response.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
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
      `api/LessonDetail/LessonDetaiID?LessonDetaiID=${lessonDetailID}`,
      lessonDetailData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ec === 1) {
      console.log("Lesson detail updated:", response.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.em);
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
  getLessonDetailByID,
};
