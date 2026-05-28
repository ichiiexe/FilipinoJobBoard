import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach auth token from localStorage to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  skills?: string;
  phoneNumber?: string;
  address?: string;
  experience?: string;
  resumeLink?: string;
}) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Get me error:", error);
    throw error;
  }
};
