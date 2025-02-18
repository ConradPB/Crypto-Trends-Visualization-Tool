import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'crypto-trends-visualization-tool-9af51bhkc-conrad-p-bs-projects.vercel.app', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
