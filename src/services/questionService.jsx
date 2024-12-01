import createAxiosInstance from "../util/axiosCustomize";
const axios = createAxiosInstance(5001);
// Get all questions
const getAllQuestions = async () => {
  try {
    const response = await axios.get("api/Question");
    /*     console.log("Data from API:", response.data.DT);
     */ return response.data.DT;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Get a single question by ID
const getQuestionById = async (id) => {
  try {
    const response = await axios.get(`api/Question/${id}`);
    /*     console.log("Question data by ID:", response.data.DT);
     */ return response.data.DT;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

// Get answers of a question by ID
const getAnswersOfQuestion = async (id) => {
  try {
    const response = await axios.get(`api/Question/answer/${id}`);
    /*     console.log("Answers of question:", response);
     */ return response;
  } catch (error) {
    console.error("Error fetching answers of question:", error);
    throw error;
  }
};

// Add a new question
const addQuestion = async (questionData) => {
  try {
    const formData = new FormData();

    // Thêm các trường dữ liệu vào formData
    formData.append("PartID", questionData.PartID);
    formData.append("Text", questionData.Text);
    formData.append("AnswerCounts", questionData.AnswerCounts);
    formData.append("UpdatedAt", questionData.UpdatedAt);
    formData.append("CreatedAt", questionData.CreatedAt);
    formData.append("audio", questionData.AudioFile);
    formData.append("image", questionData.ImageFile);


    // Gửi yêu cầu PUT với formData
    const response = await axios.post(`/api/Question`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response; // Trả về response để kiểm tra EC và EM
  } catch (error) {
    throw error;
  }
};

// Update an existing question
const updateQuestion = async (id, questionData) => {
  try {
    const formData = new FormData();

    // Thêm các trường dữ liệu vào formData
    formData.append("PartID", questionData.PartID);
    formData.append("Text", questionData.Text);
    formData.append("AnswerCounts", questionData.AnswerCounts);
    formData.append("UpdatedAt", questionData.UpdatedAt);
    formData.append("CreatedAt", questionData.CreatedAt);
    formData.append("audio", questionData.AudioFile);
    formData.append("image", questionData.ImageFile);


    // Gửi yêu cầu PUT với formData
    const response = await axios.put(`/api/Question/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Question updated:", response.DT);
    return response; // Trả về response để kiểm tra EC và EM
  } catch (error) {
    console.error("Error updating question:", error);
    console.log("Response data:", error.response.EM); // In chi tiết lỗi từ server
    throw error;
  }
};



// Delete a question
const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`api/Question/${id}`);
    console.log("Question deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};


const updateAnswersForQuestion = async (questionId, newAnswers) => {
  try {
    const response = await axios.put(`/api/Question/UpdateQuestionWithAnswer/${questionId}`, newAnswers, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (error) {
    return response;
  }
};


// Export all functions
export {
  getAllQuestions,
  getQuestionById,
  getAnswersOfQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateAnswersForQuestion
};
