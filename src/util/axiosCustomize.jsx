import axios from "axios";
import { store } from "../redux/store";
import { setLoading } from "../redux/action/loadingAction"; // Import action để set loading
import { postRenewToken } from "../services/authService"; // Giả định bạn có hàm này
import { doRenewToken } from "../redux/action/userAction";

// Hàm tạo instance Axios với cổng
const createAxiosInstance = (port) => {
    const instance = axios.create({
        baseURL: `https://localhost:${port}`, // Sử dụng cổng truyền vào
    });

    // Kiểm tra xem token đã hết hạn hay chưa
    const isTokenExpired = (token) => {
        if (!token) return true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // Chuyển đổi sang milliseconds
        return Date.now() >= exp; // So sánh thời gian hiện tại với thời gian hết hạn
    };

    // Add a request interceptor
    instance.interceptors.request.use(async function (config) {
        store.dispatch(setLoading(true));

        const access_token = store.getState()?.userReducer?.account?.access_token;
        // const refresh_token = store.getState()?.userReducer?.account?.refresh_token;

        // if (access_token) {
        //     if (isTokenExpired(access_token)) {
        //         console.log("Access token expired, refreshing...");
        //         try {
        //             let response = await postRenewToken(access_token, refresh_token);
        //             console.log("Token refresh response:", response);

        //             if (response && response.EC === 0) {
        //                 const newAccessToken = response.DT.AccessToken;
        //                 const newRefreshToken = response.DT.RefreshToken;

        //                 store.dispatch(doRenewToken({
        //                     DT: {
        //                         token: {
        //                             AccessToken: newAccessToken,
        //                             RefreshToken: newRefreshToken
        //                         }
        //                     }
        //                 }));

        //                 config.headers["Authorization"] = "Bearer " + newAccessToken;
        //             } else {
        //                 console.error("Failed to refresh token:", response);
        //             }
        //         } catch (error) {
        //             console.error("Error refreshing token:", error);
        //             return Promise.reject(error); // Ngừng xử lý nếu có lỗi
        //         }
        //     } else {
        //         config.headers["Authorization"] = "Bearer " + access_token;
        //     }
        // }
        config.headers["Authorization"] = "Bearer " + access_token;

        return config;
    }, function (error) {
        store.dispatch(setLoading(false));
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Tắt loading sau khi nhận được response
        store.dispatch(setLoading(false));
        return response && response.data ? response.data : response;
    }, function (error) {
        // Tắt loading nếu có lỗi xảy ra
        store.dispatch(setLoading(false));
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    });

    return instance; // Trả về instance Axios
};

// Xuất hàm tạo instance
export default createAxiosInstance;
