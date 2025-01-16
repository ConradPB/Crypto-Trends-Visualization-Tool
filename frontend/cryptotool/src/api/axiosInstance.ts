import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7000', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});è

export default axiosInstance;
