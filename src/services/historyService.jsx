import createAxiosInstance from "../util/axiosCustomize";
const axios = createAxiosInstance(5001);

// lấy kết quả bài test từ ID
const getHistoryById = (historyId) => {
  return axios.get(`/api/History/${historyId}`);

};

//lấy ds part từ hisID và userID
const getPartOfHis = (userID, historyID) => {
  return axios.get(`/api/History/PartOfHistory/1/1`);
};

export {
  getHistoryById,
  getPartOfHis
};
