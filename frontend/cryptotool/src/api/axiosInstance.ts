import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://crypto-trends-visualization-tool-micd2z92m-conrad-p-bs-projects.vercel.app', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
