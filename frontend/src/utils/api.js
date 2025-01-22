import axios from "axios";

// Base URL for the backend API
const API = axios.create({
    baseURL: "http://localhost:5001/api",
});

// Interceptors (Optional for token handling)
// Example: Add Authorization header if token exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Export API
export default API;
