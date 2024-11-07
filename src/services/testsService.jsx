import axios from "../util/axiosCustomize";

const getAllTests = async () => {
  try {
    const response = await axios.get("https://localhost:5001/api/Test");
    /*     console.log("Data from API:", response); // Kiểm tra dữ liệu
     */ return response;
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi khác
  }
};

const getTestById = async (id) => {
  try {
    const response = await axios.get(`https://localhost:5001/api/Test/${id}`);
    /*     console.log("Data from API:", response); // Kiểm tra dữ liệu
     */
    return response;
  } catch (error) {
    console.error(`Error fetching test with id=${id}:`, error);
    throw error;
  }
};

const createTest = async (test) => {
  try {
    const response = await axios.post("/api/test", test);
    return response.data;
  } catch (error) {
    console.error("Error creating test:", error);
    throw error;
  }
};

const updateTest = async (id, test) => {
  try {
    const response = await axios.put(`/api/test/${id}`, test);
    return response.data;
  } catch (error) {
    console.error(`Error updating test with id=${id}:`, error);
    throw error;
  }
};

const deleteTest = async (id) => {
  try {
    await axios.delete(`/api/test/${id}`);
  } catch (error) {
    console.error(`Error deleting test with id=${id}:`, error);
    throw error;
  }
};
// Function to get all parts of a test by test ID
const getAllPartByTestID = async (id) => {
  try {
    const response = await axios.get(
      `https://localhost:5001/api/Test/part/${id}`
    );
    /*     console.log("Data from API:", response); // Check data
     */ return response;
  } catch (error) {
    console.error(`Error fetching parts of test with id=${id}:`, error);
    throw error;
  }
};
// Function to get all questions from a specific part by part ID
const getAllQuestionsByPartID = async (partId) => {
  try {
    const response = await axios.get(
      `https://localhost:5001/api/Part/question/${partId}`
    );
    /*     console.log("Data question from API:", response.DT); // Kiểm tra dữ liệu
     */ return response; // Giả sử dữ liệu bạn cần nằm trong trường DT
  } catch (error) {
    console.error(
      `Error fetching questions from part with id=${partId}:`,
      error
    );
    throw error;
  }
};

// Xuất các hàm bao gồm hàm mới vừa tạo
export {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  getAllPartByTestID,
  getAllQuestionsByPartID,
};
