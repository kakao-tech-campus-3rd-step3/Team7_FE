import { api } from "@/app/lib/api";

import type { RegisterMentorSchemaType } from "@/features/authentication/schema/RegisterSchema";

import { useMutation } from "@tanstack/react-query";

export type RegisterMentorRequest = RegisterMentorSchemaType;

export type RegisterMentorResponse = {
    memberId: number;
    tokenInfo: {
        tokenType: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpireTimeMillis: number;
        refreshTokenExpireTimeMillis: number;
    };
};

export async function registerMentor(body: RegisterMentorRequest) {
    const { data: response } = await api.post<BaseResponse<RegisterMentorResponse>>(
        "/sign-up/mentor",
        body,
    );
    return response.data;
}

export const useRegisterMentor = () => {
    return useMutation({
        mutationFn: registerMentor,
    });
};
