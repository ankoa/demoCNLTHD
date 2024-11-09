// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";

const axios = createAxiosInstance(5001);
const getParts = () => {
    return axios.get("api/Test");
};

const deletePartById = async (id) => {
    return axios.delete(`api/Test/${id}`);
};

const postNewPart = (newPart) => {
    return axios.post("api/Part", newPart); // Đảm bảo URL này khớp với route API C# (api/Part)
};

const putUpdatePart = (id, description) => {
    return axios.put(`api/Part/${id}`, description, {
        headers: { 'Content-Type': 'application/json' }
    });
};

const getQuestionOfPart = (id) => {
    return axios.get(`api/Part/question2/${id}`);
};

const getAnswerOfQuestion = (id) => {
    return axios.get(`api/Question/answer/${id}`);
};





// Export các hàm để sử dụng trong các thành phần khác
export {
    getParts,
    deletePartById,
    postNewPart,
    putUpdatePart,
    getQuestionOfPart,
    getAnswerOfQuestion
};
