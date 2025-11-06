import axios from "axios";

import { getCurrentMemberId } from "@/shared/lib/auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,

        // TODO: 추후 memberId 대신 JWT 토큰 사용
        memberId: getCurrentMemberId(),
    };
    return config;
});

api.interceptors.response.use((response) => {
    return response;
});
