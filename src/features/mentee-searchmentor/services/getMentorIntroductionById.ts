import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetMentorIntroductionByIdResponseBody {
    introduction: string;
    educations: Array<{
        schoolName: string;
        major: string;
        startYear: number;
        endYear: number;
    }>;
    expertises: Array<{ expertiseName: string }>;
    certifications: Array<{ certificateName: string }>;
    careers: Array<{
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
    }>;
}

export async function getMentorIntroductionById(
    mentorId: number,
): Promise<GetMentorIntroductionByIdResponseBody> {
    const { data: response } = await api.get<BaseResponse<GetMentorIntroductionByIdResponseBody>>(
        `/mentors/${mentorId}/introduction`,
    );

    return response.data;
}

export const useGetMentorIntroductionById = (mentorId: number) => {
    return useSuspenseQuery({
        queryKey: MENTOR_QUERY_KEYS.INTRODUCTION_BY_ID(mentorId),
        queryFn: () => getMentorIntroductionById(mentorId),
    });
};
