import axios from "axios";

// Configure API client base URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

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

// Controller function handling a request.
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

// Controller function handling a request.
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Controller function handling a request.
export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Get me error:", error);
    throw error;
  }
};

// Controller function handling a request.
export const postJob = async (data: {
  title: string;
  description: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
  skills?: string[];
  applyURL?: string;
}) => {
  try {
    const response = await api.post("/jobs", data);
    return response.data;
  } catch (error) {
    console.error("Post job error:", error);
    throw error;
  }
};

// Controller function handling a request.
export const getJobs = async () => {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error) {
    console.error("Get jobs error:", error);
    throw error;
  }
};
