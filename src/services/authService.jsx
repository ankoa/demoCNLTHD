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

// Hàm postRegister để gọi API đăng ký
const postRegister = (email, username, password) => {
  const form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("password", password);

  return axios.post("api/v1/register", form);
};

// Export các hàm để sử dụng trong các thành phần khác
export { postLogin, postRegister, postLogOut };
