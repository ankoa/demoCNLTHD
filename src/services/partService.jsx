// Hàm postLogin để gọi API đăng nhập
import createAxiosInstance from "../util/axiosCustomize";

const axios = createAxiosInstance(5001);
const getParts = () => {
    return axios.get("api/Test");
};

const deletePartById = async (id) => {
    return axios.delete(`api/Test/${id}`);
};

const postNewPart = (newTest) => {
    return axios.post("api/Test", newTest);
};

const putUpdatePart = (updateTest) => {
    return axios.put(`api/Test/${updateTest.Id}`, updateTest);
};




// Export các hàm để sử dụng trong các thành phần khác
export {
    getParts,
    deletePartById,
    postNewPart,
    putUpdatePart
};
