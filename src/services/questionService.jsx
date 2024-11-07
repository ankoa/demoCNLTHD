import axios from "../util/axiosCustomize";

// Get all questions
const getAllQuestions = async () => {
  try {
    const response = await axios.get("https://localhost:5001/api/Question");
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
    const response = await axios.get(
      `https://localhost:5001/api/Question/${id}`
    );
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
    const response = await axios.get(
      `https://localhost:5001/api/Question/answer/${id}`
    );
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
    const response = await axios.post(
      "https://localhost:5001/api/Question",
      questionData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Question added:", response.data.DT);
    return response.data.DT;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

// Update an existing question
const updateQuestion = async (id, questionData) => {
  try {
    const response = await axios.put(
      `https://localhost:5001/api/Question/${id}`,
      questionData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Question updated:", response.data.DT);
    return response.data.DT;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Delete a question
const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:5001/api/Question/${id}`
    );
    console.log("Question deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
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
};
