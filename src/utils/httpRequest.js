import axios from 'axios';

const TiktokRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
});

export const get = async (url, params = {}) => {
    try {
        const response = await TiktokRequest.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default TiktokRequest;
