import createAxiosInstance from "../util/axiosCustomize";
// Đường dẫn đầy đủ của API
const API_BASE_URL = "http://feedback.somee.com";

const axios = createAxiosInstance(API_BASE_URL);
const userId = useSelector((state) => state.userReducer.account.userid);

// Hàm hiển thị comment theo testID
const loadComment = async (testID) => {
  try {
    const response = await axios.get(`api/Comment/LoadComment/${testID}`);
    if (response.ec === 1) {
      console.log("Comment data:", response.data);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};

// Hàm tạo comment
// const createComment = async (commentData) => {
//   try {
//     const response = await axios.post("api/Comment", commentData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.ec === 1) {
//       console.log("Comment added:", response.data.dt);
//       return response.dt; // Trả về dữ liệu trong phần 'dt'
//     } else {
//       console.error("Error:", response.data.em);
//       throw new Error(response.em);
//     }
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     throw error;
//   }
// };

const createComment = async (commentText) => {
  // Chuẩn bị dữ liệu
  const data = {
    UserID: userId,
    // TestID: ,
    CommentText: commentText, // Thêm trường comment
  };

  try {
    // Gửi yêu cầu POST
    const response = await axios.post("api/Comment", data, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Comment added:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

//Cập nhật comment
const updateComment = async (commentID, commentData) => {
  try {
    const response = await axios.put(`api/Comment/${commentID}`, commentData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ec === 1) {
      console.log("Comment updated:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Xoá comment
const deleteComment = async (commentID) => {
  try {
    const response = await axios.delete(`api/Comment/${commentID}`);
    if (response.ec === 1) {
      console.log("Comment deleted:", response.data.dt);
      return response.dt; // Trả về dữ liệu trong phần 'dt'
    } else {
      console.error("Error:", response.data.em);
      throw new Error(response.em);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export{
    loadComment,
    createComment,
    updateComment,
    deleteComment
};