import { api } from "@/app/lib/api";

import type { MentorProfile } from "../models/types";

export interface GetMentorProfileResponseBody {
    name: string;
    email: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    careerYears?: number;
    company?: string;
    jobPosition?: string;
    employmentCertificate?: string;
    educations: Array<{
        schoolName: string;
        major: string;
        startYear: number;
        endYear?: number;
    }>;
    certifications: Array<{
        certificateName: string;
    }>;
    expertises: Array<{
        expertiseName: string;
    }>;
    introduction?: string;
}

export async function getMentorProfile(mentorId: number): Promise<MentorProfile> {
    const { data: apiResponse } = await api.get<BaseResponse<GetMentorProfileResponseBody>>(
        `/api/mentors/${mentorId}/profile`,
    );

    const mentorProfile: MentorProfile = {
        ...apiResponse.data,
    };

    return mentorProfile;
}
