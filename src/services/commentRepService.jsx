import createAxiosInstance from "../util/axiosCustomize";
// Đường dẫn đầy đủ của API
const API_BASE_URL = "http://feedback.somee.com";

const axios = createAxiosInstance(API_BASE_URL);

// Hàm hiển thị comment theo testID
const loadCommentRep = async (commentID) => {
  try {
    const response = await axios.get(`api/CommentRep/${commentID}`);
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
const createCommentRep = async (commentData) => {
  try {
    const response = await axios.post("api/CommentRep", commentData, {
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
const updateCommentRep = async (commentID, commentData) => {
  try {
    const response = await axios.put(`api/CommentRep/${commentID}`, commentData, {
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
const deleteCommentRep = async (commentID) => {
  try {
    const response = await axios.delete(`api/CommentRep/${commentID}`);
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
    loadCommentRep,
    createCommentRep,
    updateCommentRep,
    deleteCommentRep
};