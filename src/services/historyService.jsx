import createAxiosInstance from "../util/axiosCustomize";

const axios = createAxiosInstance(5001);
// Get all questions
const getAllHistories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error("Error fetching histories:", error);
    throw error;
  }
};

const getHistoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching history with id=${id}:`, error);
    throw error;
  }
};

const createHistory = async (data) => {
  try {
    const response = await axios.post(`api/History`, data);
    return response;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};

const updateHistory = async (id, history) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, history);
    return response.data;
  } catch (error) {
    console.error(`Error updating history with id=${id}:`, error);
    throw error;
  }
};

const deleteHistory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting history with id=${id}:`, error);
    throw error;
  }
};

// Function to get all parts of a history by History ID
const getAllPartsByHistoryId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/part/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching parts of history with id=${id}:`, error);
    throw error;
  }
};
const getCombinedHistories = async (userId, hisId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/PartOfHistory/${userId}/${hisId}`
    );
    return response;
  } catch (error) {
    console.error(
      `Error fetching combined histories with userId=${userId} and hisId=${hisId}:`,
      error
    );
    throw error;
  }
};

// Export functions including the new function
export {
  getAllHistories,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
  getAllPartsByHistoryId,
  getCombinedHistories,
};
