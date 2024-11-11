import createAxiosInstance from "../util/axiosCustomize";
const axios = createAxiosInstance(5001);

// lấy kết quả bài test từ ID
const getQuestionByPartID = (partId) => {
  return axios.get(`/api/Part/question/${partId}`);
};

export {
  getQuestionByPartID,
};
