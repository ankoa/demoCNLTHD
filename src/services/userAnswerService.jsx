// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";
const axios = createAxiosInstance("https://localhost:5001/"); // Specify your base URL
const getUserAnswerByHisID = (historyId) => {
  return axios.get(`/api/UserAnswer/${historyId}`);
};

export { getUserAnswerByHisID };
