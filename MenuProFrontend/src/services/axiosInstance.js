import axios from "axios";

const API_ORIGIN = import.meta.env.VITE_API_URL || "https://localhost:44315";

const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (import.meta.env.DEV) {
    console.log("➡️ API Request:", config.method?.toUpperCase(), config.url);
  }

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
}, (error) => Promise.reject(error));

// Global API Response Error Handling Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (import.meta.env.DEV) {
      console.warn(`❌ API Error [Status ${status}] from URL: ${url}`, error.response?.data);
    }

    if (status === 401) {
      // Clear invalid/expired token
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.clear();
        // Safe redirect to landing
        window.location.href = "/";
      }
    } else if (status === 403) {
      if (import.meta.env.DEV) {
        console.error("🔒 Access Forbidden: Insufficient permissions.");
      }
    } else if (status >= 500) {
      if (import.meta.env.DEV) {
        console.error("🔥 Internal Server Error occurred on the backend API.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_ORIGIN };