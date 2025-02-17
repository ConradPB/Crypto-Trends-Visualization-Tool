import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://crypto-trends-visualization-tool-kf349u8s9-conrad-p-bs-projects.vercel.app/api', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
