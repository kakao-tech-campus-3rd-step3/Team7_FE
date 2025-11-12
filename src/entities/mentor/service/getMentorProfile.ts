import { api } from "@/app/lib/api";

import { MENTOR_PROFILE_QUERY_KEYS } from "@/entities/mentor/service/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetMentorProfileResponse {
    name: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
    careerYears: number;
    company: string;
    jobPosition: string;
    employmentCertificate: string;
    educations: {
        schoolName: string;
        major: string;
        startYear: number;
        endYear: number;
    }[];
    certifications: {
        certificateName: string;
    }[];
    expertises: {
        expertiseName: string;
    }[];
    introduction: string;
}

export async function getMentorProfile(mentorId: number) {
    const { data: response } = await api.get<BaseResponse<GetMentorProfileResponse>>(
        `/mentors/${mentorId}/profile`,
    );
    return response.data;
}

export const useGetMentorProfile = (mentorId: number) => {
    return useSuspenseQuery({
        queryKey: MENTOR_PROFILE_QUERY_KEYS.BY_ID(mentorId),
        queryFn: () => getMentorProfile(mentorId),
    });
};
