import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crypto-tool-aaszkvsck-conrad-p-bs-projects.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
