import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetMentorHeaderByIdResponseBody {
    id: number;
    name: string;
    profileImageUrl: string | null;
    company: string;
    jobPosition: string;
    averageRating: number;
    reviewsCount: number;
    experience: number;
    menteesCount: number;
    pricePerSession: number;
}

export async function getMentorHeaderById(
    mentorId: number,
): Promise<GetMentorHeaderByIdResponseBody> {
    const { data: response } = await api.get<BaseResponse<GetMentorHeaderByIdResponseBody>>(
        `/api/mentors/${mentorId}/header`,
    );

    return response.data;
}

export const useGetMentorHeaderById = (mentorId: number) => {
    return useSuspenseQuery({
        queryKey: MENTOR_QUERY_KEYS.HEADER_BY_ID(mentorId),
        queryFn: () => getMentorHeaderById(mentorId),
    });
};
