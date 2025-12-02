import axios from "axios";
import { token } from "./Config";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Request interceptor to add Authorization header
instance.interceptors.request.use(
  (config) => {
    const tokenString = token();
    if (tokenString) {
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
instance.interceptors.response.use(
  (response) => {
    // Return the data directly
    return response.data;
  },
  (error) => {
    // Handle 401 globally
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    // Reject the error so frontend catch block works
    return Promise.reject(error);
  }
);

export default instance;
