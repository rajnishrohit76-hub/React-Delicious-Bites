import axios from "axios";

const api = axios.create({
  baseURL: "https://expressjs-backend-theta.vercel.app",
});

// 🌟 Attach Token Automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
