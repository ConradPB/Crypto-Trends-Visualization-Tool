import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crypto-trends-visualization-tool.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
