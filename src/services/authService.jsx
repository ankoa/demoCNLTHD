import createAxiosInstance from "../util/axiosCustomize";

// Đường dẫn đầy đủ của API
const API_BASE_URL = "http://authservice.somee.com";
/*  const API_BASE_URL = "http://userservice.somee.com";
 */
const axios = createAxiosInstance(API_BASE_URL);
const BASE_URL = "/api/Account";

// Hàm postLogin để gọi API đăng nhập
const postLogin = (Username, Password) => {
  return axios.post(`${BASE_URL}/Login`, {
    Username,
    Password,
    delay: 5000,
  });
};

// Lấy danh sách người dùng
const getUsers = () => {
  return axios.get("/api/User");
};

// Hàm postLogOut để gọi API đăng xuất
const postLogOut = (RefreshToken) => {
  return axios.post("/api/Account/Logout", {
    RefreshToken
  });
};

// Hàm postSendCode để gửi mail tạo tài khoản
const postSendConfirmEmailCode = (Email, Username) => {
  return axios.post(`${BASE_URL}/SendConfirmEmailCode`, {
    Email,
    Username,
  });
};

// Hàm postCheckConfirmEmailCode để kiểm tra mã xác nhận email
const postCheckConfirmEmailCode = (Email, ConfirmationCode) => {
  return axios.post(`${BASE_URL}/CheckConfirmEmailCode`, {
    Email,
    ConfirmationCode,
  });
};

// Hàm postSendResetCode để gửi mail reset mật khẩu
const postSendResetCode = (Email) => {
  return axios.post(
    `${BASE_URL}/SendResetCode`,
    { Email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

// Hàm postCheckResetPasswordCode để kiểm tra mã reset mật khẩu
const postCheckResetPasswordCode = (Email, Token) => {
  return axios.post(`${BASE_URL}/VerifyResetCode`, {
    Email,
    Token,
  });
};

// Hàm postCheckAccountExist để kiểm tra tài khoản có tồn tại không
const postCheckAccountExist = (Email) => {
  return axios.post(
    `${BASE_URL}/CheckAccountExist`,
    { email: Email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

// Hàm postResetPassword để reset mật khẩu
const postResetPassword = (Email, Token, NewPassword) => {
  return axios.post(`${BASE_URL}/ResetPassword`, {
    Email,
    Token,
    NewPassword,
  });
};

// Hàm postRegister để đăng ký tài khoản
const postRegister = (email, username, password, firstname, lastname) => {
  const data = {
    Username: username,
    Email: email,
    PasswordHash: password,
    FirstName: firstname,
    LastName: lastname,
  };

  return axios.post(`${BASE_URL}/SignUp`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Hàm postRegister để đăng ký tài khoản
const postRegisterWithRole = (email, username, password, firstname, lastname, roleId) => {
  const data = {
    Username: username,
    Email: email,
    PasswordHash: password,
    FirstName: firstname,
    LastName: lastname,
    RoleID: roleId
  };

  return axios.post(`${BASE_URL}/SignUpWithRole`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Hàm postRenewToken để làm mới token
const postRenewToken = (AccessToken, RefreshToken) => {
  const data = {
    AccessToken,
    RefreshToken,
  };

  return axios.post(`${BASE_URL}/RenewToken`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Export các hàm để sử dụng trong các thành phần khác
export {
  postLogin,
  postRegister,
  postLogOut,
  postSendConfirmEmailCode,
  postCheckConfirmEmailCode,
  postCheckAccountExist,
  postSendResetCode,
  postCheckResetPasswordCode,
  postResetPassword,
  getUsers,
  postRenewToken,
  postRegisterWithRole
};
