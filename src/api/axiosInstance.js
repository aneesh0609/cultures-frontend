import axios from "axios";
import {store} from "../store/store.js"; // import your Redux store

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, 
})

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState(); // get current state
    const token = state.auth.user?.token; // access JWT from auth slice
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
