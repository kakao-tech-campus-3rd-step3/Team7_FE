import axios from "axios";

import { api } from "@/app/lib/api";

import { toast } from "@/shared/lib/toast";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateReviewRequestBody {
    rating: number;
    content: string;
}

export interface CreateReviewResponseBody {
    reviewId: number;
}

export async function createReview(
    mentorId: number,
    body: CreateReviewRequestBody,
): Promise<CreateReviewResponseBody> {
    try {
        const { data: response } = await api.post<BaseResponse<CreateReviewResponseBody>>(
            `/reviews/mentor/${mentorId}`,
            body,
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "리뷰 작성에 실패했습니다. 다시 시도해주세요.";

            throw new Error(errorMessage);
        }
        throw error;
    }
}

export const useCreateReview = (mentorId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateReviewRequestBody) => createReview(mentorId, body),
        onSuccess: () => {
            toast.success("리뷰가 성공적으로 작성되었습니다.");
            queryClient.invalidateQueries({
                queryKey: MENTOR_QUERY_KEYS.REVIEWS_BY_ID(mentorId),
            });
            queryClient.invalidateQueries({
                queryKey: MENTOR_QUERY_KEYS.HEADER_BY_ID(mentorId),
            });
        },
        onError: (error: Error) => {
            const errorMessage = error.message || "리뷰 작성에 실패했습니다. 다시 시도해주세요.";
            toast.error(errorMessage);
        },
    });
};
