import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    return config;
});

api.interceptors.response.use((response) => {
    return response;
});
