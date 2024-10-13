import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:5555/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Dispatch action để bật loading trước khi request

    // Thêm access_token vào headers nếu có
    // const access_token = store.getState()?.userReducer?.account?.access_token;
    // if (access_token) {
    //     config.headers["Authorization"] = "Bearer " + access_token;
    // }

    return config;
}, function (error) {
    // Nếu có lỗi, tắt loading
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Tắt loading sau khi nhận được response
    return response && response.data ? response.data : response;
}, function (error) {
    // Tắt loading nếu có lỗi xảy ra
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;