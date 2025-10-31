// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/auth",
  withCredentials: true,
});

// Signup
export const signupUser = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data; // { success, message, user }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data; // { success, message, user }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
