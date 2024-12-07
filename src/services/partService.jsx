import createAxiosInstance from "../util/axiosCustomize";

const API_BASE_URL = "http://examservice.somee.com/";
const axios = createAxiosInstance(API_BASE_URL);
// Fetch all parts
const getParts = async () => {
  try {
    const response = await axios.get("/api/Test");
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

// Delete a part by ID
const deletePartById = async (id) => {
  try {
    await axios.delete(`/api/Test/${id}`);
  } catch (error) {
    console.error(`Error deleting part with id=${id}:`, error);
    throw error;
  }
};

// Create a new part
const postNewPart = async (newPart) => {
  try {
    const response = await axios.post("/api/Part", newPart);
    return response.data;
  } catch (error) {
    console.error("Error creating new part:", error);
    throw error;
  }
};

// Update a part by ID
const putUpdatePart = async (id, description) => {
  try {
    const response = await axios.put(`/api/Part/${id}`, description, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating part with id=${id}:`, error);
    throw error;
  }
};

// Get all questions for a specific part
const getQuestionOfPart = async (id) => {
  try {
    const response = await axios.get(`/api/Part/question2/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching questions for part with id=${id}:`, error);
    throw error;
  }
};

// Get all questions by part ID
const getQuestionByPartID = async (partId) => {
  try {
    const response = await axios.get(`/api/Part/question/${partId}`);
    return response;
  } catch (error) {
    console.error(
      `Error fetching questions from part with id=${partId}:`,
      error
    );
    throw error;
  }
};

// Get answers for a specific question by ID
const getAnswerOfQuestion = async (id) => {
  try {
    const response = await axios.get(`/api/Question/answer/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching answers for question with id=${id}:`, error);
    throw error;
  }
};

// Submit a part
const SubmitPart = async (data) => {
  try {
    const response = await axios.post("/api/Part/submit", data);
    return response;
  } catch (error) {
    console.error(
      "Error submitting part:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get part details by ID
const getPartById = async (id) => {
  try {
    const response = await axios.get(`/api/Part/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching part with id=${id}:`, error);
    throw error;
  }
};

// Export functions for use in other components
export {
  getParts,
  deletePartById,
  postNewPart,
  putUpdatePart,
  getQuestionOfPart,
  getAnswerOfQuestion,
  SubmitPart,
  getQuestionByPartID,
  getPartById,
};
/* // Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";

const axios = createAxiosInstance(5001);
const getParts = () => {
  return axios.get("api/Test");
};

const deletePartById = async (id) => {
  return axios.delete(`api/Test/${id}`);
};

const postNewPart = (newPart) => {
  return axios.post("api/Part", newPart); // Đảm bảo URL này khớp với route API C# (api/Part)
};

const putUpdatePart = (id, description) => {
  return axios.put(`api/Part/${id}`, description, {
    headers: { "Content-Type": "application/json" },
  });
};

const getQuestionOfPart = (id) => {
  return axios.get(`api/Part/question2/${id}`);
};

//đường dẫn ở trên là "/question2/${id}
const getQuestionByPartID = (partId) => {
  return axios.get(`/api/Part/question/${partId}`);
};

const getAnswerOfQuestion = (id) => {
  return axios.get(`api/Question/answer/${id}`);
};

const SubmitPart = async (data) => {
  try {
    const response = await axios.post(`api/Part/submit`, data);
    return response;
  } catch (error) {
    // Xử lý lỗi và log ra chi tiết
    console.error(
      "Error submitting part:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi ra để xử lý tiếp ở hàm gọi
  }
};
const getPartById = async (id) => {
  try {
    const response = await axios.get(`api/Part/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching part by ID:", error);
    throw error;
  }
};
// Export các hàm để sử dụng trong các thành phần khác
export {
  getParts,
  deletePartById,
  postNewPart,
  putUpdatePart,
  getQuestionOfPart,
  getAnswerOfQuestion,
  SubmitPart,
  getQuestionByPartID,
  getPartById,
};
 */
