import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Use JWT Token in request by axios
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
