// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";
const axios = createAxiosInstance(5001);

const getUserAnswerByHisID = (historyId) => {
  return axios.get(`/api/UserAnswer/${historyId}`);
};

export {
  getUserAnswerByHisID,
};
