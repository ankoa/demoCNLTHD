import axios from "axios";
import { store } from "../redux/store";
import { setLoading } from "../redux/action/loadingAction"; // Import action để set loading

const instance = axios.create({
  baseURL: "http://localhost:5001/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Dispatch action để bật loading trước khi request
    store.dispatch(setLoading(true));

    // Thêm access_token vào headers nếu có
    const access_token = store.getState()?.userReducer?.account?.access_token;
    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }

    return config;
  },
  function (error) {
    // Nếu có lỗi, tắt loading
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Tắt loading sau khi nhận được response
    store.dispatch(setLoading(false));
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Tắt loading nếu có lỗi xảy ra
    store.dispatch(setLoading(false));
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
