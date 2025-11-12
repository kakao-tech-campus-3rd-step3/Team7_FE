import { api } from "@/app/lib/api";

import { useMutation } from "@tanstack/react-query";

export interface SignInMenteeResponse {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpireTimeMillis: number;
    refreshTokenExpireTimeMillis: number;
}

export async function signInMentee() {
    const { data: response } = await api.post<BaseResponse<SignInMenteeResponse>>(
        "/auth/login/mentee-dummy",
    );
    return response.data;
}

export const useSignInMentee = () => {
    return useMutation({
        mutationFn: signInMentee,
    });
};
