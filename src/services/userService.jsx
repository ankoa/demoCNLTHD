// Hàm postLogin để gọi API đăng nhập

import createAxiosInstance from "../util/axiosCustomize";
const API_BASE_URL = "http://authservice.somee.com/";
/*  const API_BASE_URL = "http://userservice.somee.com";
 */
const axios = createAxiosInstance(API_BASE_URL);
const getUsers = async () => {
  try {
    const response = await axios.get("api/User");
    if (response && response.EC === 0) {
      return response.DT; // Trả về dữ liệu nếu EC === 0
    }
    throw new Error(response.EM || "Unknown error occurred");
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return null; // Hoặc giá trị xử lý khác nếu cần
  }
};

const getUserWithRoleById = async (id) => {
  try {
    const response = await axios.get(`api/User/usernrole/${id}`);
    if (response && response.EC === 0) {
      return response.DT;
    }
    throw new Error(response.EM || "Unknown error occurred");
  } catch (error) {
    console.error(`Error fetching user with role for ID ${id}:`, error.message);
    return null;
  }
};

const postNewUser = async (newUser) => {
  try {
    const response = await axios.post("api/User", newUser);
    if (response && response.EC === 0) {
      return response.DT;
    }
    throw new Error(response.EM || "Unknown error occurred");
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return null;
  }
};

const putUpdateUser = async (updateUser) => {
  try {
    const response = await axios.put("api/User", updateUser);
    if (response && response.EC === 0) {
      return response.DT;
    }
    throw new Error(response.EM || "Unknown error occurred");
  } catch (error) {
    console.error("Error updating user:", error.message);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`api/User/${id}`);
    if (response && response.EC === 0) {
      return response.DT;
    }
    throw new Error(response.EM || "Unknown error occurred");
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);
    return null;
  }
};
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
  getUsers,
  postNewUser,
  putUpdateUser,
  getUserWithRoleById,
  getUserById,
};
