// Hàm postLogin để gọi API đăng nhập
import axios from "../util/axiosCustomize";

const postLogin = (Username, Password) => {
  return axios.post("api/Account/Login", {
    Username,
    Password,
  });
};

// Hàm postLogOut để gọi API đăng xuất
const postLogOut = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
    delay: 1000,
  });
};

// Hàm postSendCode để gọi API gửi mail tạo tk
const postSendConfirmEmailCode = (Email, Username) => {
  return axios.post("api/Account/SendConfirmEmailCode", { Email, Username });
};

// Hàm postCheckAccount để gọi API gửi mail tạo tk
const postCheckAccountExist = (Email, Username) => {
  return axios.post("api/Account/CheckAccountExist", { Email, Username });
};

// Hàm postCheckAccount để gọi API gửi mail tạo tk
const postCheckConfirmEmailCode = (Email, ConfirmationCode) => {
  return axios.post("api/Account/CheckConfirmEmailCode", { Email, ConfirmationCode });
};

// Hàm postRegister để gọi API đăng ký

const postRegister = (email, username, password, firstname, lastname) => {
  const data = {
    Username: username,
    Email: email,
    PasswordHash: password,
    FirstName: firstname,
    LastName: lastname
  };

  return axios.post("api/Account/SignUp", data, {
    header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json' }

  });
};


// Export các hàm để sử dụng trong các thành phần khác
export {
  postLogin, postRegister, postLogOut, postSendConfirmEmailCode,
  postCheckConfirmEmailCode
};
