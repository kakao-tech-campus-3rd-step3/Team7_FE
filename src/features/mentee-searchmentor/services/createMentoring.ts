import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateMentoringRequestBody {
    mentorId: number;
    documentId: number;
    title: string;
    dueDate: string;
    description: string;
}

export interface CreateMentoringResponseBody {
    mentoringId: number;
}

export async function createMentoring(
    body: CreateMentoringRequestBody,
): Promise<CreateMentoringResponseBody> {
    const { data: response } = await api.post<BaseResponse<number>>(`/mentoring`, body);

    return {
        mentoringId: response.data,
    };
}

export const useCreateMentoring = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateMentoringRequestBody) => createMentoring(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: MENTOR_QUERY_KEYS.ALL(),
            });
        },
    });
};
