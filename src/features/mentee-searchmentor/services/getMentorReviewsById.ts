import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetMentorReviewsByIdResponseBody {
    reviewCount: number;
    averageRating: number;
    reviews: Array<{
        reviewId: number;
        reviewerId: number;
        reviewerName: string;
        rating: number;
        content: string;
        createdAt: string;
    }>;
}

export async function getMentorReviewsById(
    mentorId: number,
): Promise<GetMentorReviewsByIdResponseBody> {
    const { data: response } = await api.get<BaseResponse<GetMentorReviewsByIdResponseBody>>(
        `/api/mentors/${mentorId}/reviews`,
    );

    return response.data;
}

export const useGetMentorReviewsById = (mentorId: number) => {
    return useSuspenseQuery({
        queryKey: MENTOR_QUERY_KEYS.REVIEWS_BY_ID(mentorId),
        queryFn: () => getMentorReviewsById(mentorId),
    });
};
