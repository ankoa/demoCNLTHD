// Hàm postLogin để gọi API đăng nhập

import createAxiosInstance from "../util/axiosCustomize";
const API_BASE_URL = "http://authservice.somee.com";

const axios = createAxiosInstance(API_BASE_URL);
const getUsers = async () => {
  try {
    return await axios.get("api/User");
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return null; // Hoặc giá trị xử lý khác nếu cần
  }
};

const getUserWithRoleById = async (id) => {
  try {
    return await axios.get(`api/User/usernrole/${id}`);
  } catch (error) {
    console.error(`Error fetching user with role for ID ${id}:`, error.message);
    return null;
  }
};

const postNewUser = async (newUser) => {
  try {
    return await axios.post("api/User", newUser);
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return null;
  }
};

const putUpdateUser = async (updateUser) => {
  try {
    return await axios.put("api/User", updateUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    return null;
  }
};

const putUpdateUserRoles = async (userId, roleIds) => {
  try {
    return await axios.put(`api/UserRole/UpdateRoles?userId=${userId}&roleId=${roleIds}`);
  } catch (error) {
    console.error("Error updating user roles:", error.message);
    return null;
  }
};

const postAddUserRoles = async (userId, roleIds) => {
  try {
    return await axios.post(`api/UserRole/UserRole?userId=${userId}&roleId=${roleIds}`);
  } catch (error) {
    console.error("Error adding user roles:", error.message);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    return axios.get(`api/User/${id}`);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);
    return null;
  }
};

const deleteUserById = async (id) => {
  try {
    return axios.delete(`api/User/${id}`);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);
    return null;
  }
};


// Export các hàm để sử dụng trong các thành phần khác
export {
  getUsers,
  postNewUser,
  putUpdateUser,
  getUserWithRoleById,
  getUserById,
  putUpdateUserRoles,
  postAddUserRoles,
  deleteUserById,
};
