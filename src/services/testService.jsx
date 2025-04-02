// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";

// Đường dẫn đầy đủ của API
const API_BASE_URL = "http://examservicetoeic.somee.com/";
const axios = createAxiosInstance(API_BASE_URL);
const BASE_URL = "/api/Test";

const getTests = async () => {
  return await axios.get("api/Test");
};

const getStatOverview = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/History/score-statistics`
    );
    return response;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

const getStatAverage = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}api/History/score-statistics-average`
    );
    return response;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

const getTestByID = async (testID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${testID}`);
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

const deleteTestById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

const postNewTest = async (newTest) => {
  try {
    const response = await axios.post(`${BASE_URL}`, newTest);
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

const putUpdateTest = async (updateTest) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${updateTest.Id}`,
      updateTest
    );
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

const getParfOfTestById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/part/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};

// const getUsers = () => {
//     return axios.get("api/User");
// };

// // Hàm postLogOut để gọi API đăng xuất
// const postLogOut = (email, refresh_token) => {
//     return axios.post("api/v1/logout", {
//         email,
//         refresh_token,
//         delay: 1000,
//     });
// };

// // Hàm postSendCode để gọi API gửi mail tạo tk
// const postSendConfirmEmailCode = (Email, Username) => {
//     return axios.post("api/Account/SendConfirmEmailCode", { Email, Username });
// };

// // Hàm postCheckConfirmEmailCode để gọi API gửi kiểm tra code tạo tk
// const postCheckConfirmEmailCode = (Email, ConfirmationCode) => {
//     return axios.post("api/Account/CheckConfirmEmailCode", { Email, ConfirmationCode });
// };

// // Hàm postSendCode để gọi API gửi mail reset password
// const postSendResetCode = (Email) => {
//     return axios.post("api/Account/SendResetCode",
//         { Email: Email }, // Truyền đối tượng chứa email
//         {
//             headers: { 'Content-Type': 'application/json' } // Đúng cú pháp headers
//         });
// };

// // Hàm postCheckResetPasswordCode để gọi API gửi kiểm tra code reset password
// const postCheckResetPasswordCode = (Email, Token) => {
//     return axios.post("api/Account/VerifyResetCode", { Email, Token });
// };

// // Hàm để gọi api check account có tồn tại hay không
// const postCheckAccountExist = (Email) => {
//     return axios.post("api/Account/CheckAccountExist",
//         { email: Email }, // Truyền đối tượng chứa email
//         {
//             headers: { 'Content-Type': 'application/json' } // Đúng cú pháp headers
//         });
// };

// // Hàm postResetPassword để gọi API reset password
// const postResetPassword = (Email, Token, NewPassword) => {
//     return axios.post("api/Account/ResetPassword", { Email, Token, NewPassword });
// };

// // Hàm postRegister để gọi API đăng ký
// const postRegister = (email, username, password, firstname, lastname) => {
//     const data = {
//         Username: username,
//         Email: email,
//         PasswordHash: password,
//         FirstName: firstname,
//         LastName: lastname
//     };

//     return axios.post("api/Account/SignUp", data, {
//         header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json' }

//     });
// };

// // Hàm postRegister để gọi API đăng ký
// const postRenewToken = (AccessToken, RefreshToken) => {
//     const data = {
//         AccessToken,
//         RefreshToken
//     };

//     return axios.post("api/Account/RenewToken", data, {
//         header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json' }

//     });
// };

// Export các hàm để sử dụng trong các thành phần khác
export {
  getTests,
  getTestByID,
  deleteTestById,
  postNewTest,
  putUpdateTest,
  getParfOfTestById,
  getStatAverage,
  getStatOverview,
};
