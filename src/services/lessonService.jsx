import createAxiosInstance from "../util/axiosCustomize";

// Khởi tạo axios với giao thức HTTP thay vì HTTPS
const axios = createAxiosInstance("http://courseservice.somee.com");

// Hàm lấy danh sách bài học
const getLessons = async () => {
  try {
    const response = await axios.get("/api/Lesson");
    console.log("Lessons data:", response);
    if (response.ec === 1) {
      console.log("Lessons data:", response);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

// Hàm thêm bài học mới
const addLesson = async (lessonData) => {
  try {
    const response = await axios.post("api/Lesson", lessonData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Lesson added:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding lesson:", error);
    throw error;
  }
};

// Hàm xóa bài học theo ID
const deleteLesson = async (lessonID) => {
  try {
    const response = await axios.delete(`api/Lesson/${lessonID}`);
    if (response.ec === 1) {
      console.log("Lesson deleted:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin bài học theo ID
const updateLesson = async (lessonID, lessonData) => {
  try {
    const response = await axios.put(`api/Lesson/${lessonID}`, lessonData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Lesson updated:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

// Export các hàm để sử dụng trong các thành phần khác
export { getLessons, addLesson, deleteLesson, updateLesson };
