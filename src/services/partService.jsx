import axios from 'axios';

const getPartsByTestId = async (testId) => {
    return await axios.get(`/api/Parts/${testId}`);
};


export {
  getPartsByTestId
}