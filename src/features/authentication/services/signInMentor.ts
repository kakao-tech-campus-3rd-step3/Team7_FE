import { api } from "@/app/lib/api";

import { useMutation } from "@tanstack/react-query";

export interface SignInMentorResponse {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpireTimeMillis: number;
    refreshTokenExpireTimeMillis: number;
}

export async function signInMentor() {
    const { data: response } = await api.post<BaseResponse<SignInMentorResponse>>(
        "/auth/login/mentor-dummy",
    );
    return response.data;
}

export const useSignInMentor = () => {
    return useMutation({
        mutationFn: signInMentor,
    });
};
