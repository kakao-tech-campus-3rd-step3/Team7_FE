import axios from "axios";

import { useAuthStore } from "@/features/authentication/store/authStore";

import { getCurrentMemberId } from "@/shared/lib/auth";

const getBaseURL = () => {
    if (import.meta.env.DEV) {
        return "/api";
    }
    return import.meta.env.VITE_API_BASE_URL || "/api";
};

export const api = axios.create({
    baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,

        memberId: getCurrentMemberId(),
    };

    const authStore = useAuthStore.getState();
    if (authStore.id !== null) {
        config.headers["X-User-Id"] = String(authStore.id);
    }

    const accessToken = authStore.getAccessToken();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use((response) => {
    return response;
});
