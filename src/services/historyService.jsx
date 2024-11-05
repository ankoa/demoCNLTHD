import axios from "../util/axiosCustomize"

// lấy kết quả bài test từ ID
const getHistoryById = (historyId) => {
  return axios.get(`api/History/${historyId}`);
};

export {
  getHistoryById,
};
