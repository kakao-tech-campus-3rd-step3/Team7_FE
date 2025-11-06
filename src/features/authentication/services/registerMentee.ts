import { api } from "@/app/lib/api";

import type { RegisterMenteeSchemaType } from "@/features/authentication/schema/RegisterSchema";

import { useMutation } from "@tanstack/react-query";

export type RegisterMenteeRequest = RegisterMenteeSchemaType;

export type RegisterMenteeResponse = {};

export async function registerMentee(body: RegisterMenteeRequest) {
    const { data: response } = await api.post<BaseResponse<RegisterMenteeResponse>>(
        "/sign-up/mentee",
        body,
    );
    return response.data;
}

export const useRegisterMentee = () => {
    return useMutation({
        mutationFn: registerMentee,
    });
};
