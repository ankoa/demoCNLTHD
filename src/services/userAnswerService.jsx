// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";
const API_BASE_URL = "http://examservice.somee.com/";
const axios = createAxiosInstance(API_BASE_URL); // Specify your base URL
const getUserAnswerByHisID = (historyId) => {
  return axios.get(`/api/UserAnswer/${historyId}`);
};

export { getUserAnswerByHisID };
