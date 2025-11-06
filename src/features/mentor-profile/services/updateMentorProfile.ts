import { api } from "@/app/lib/api";

import type { MentorProfile } from "../models/types";

export interface UpdateMentorProfileRequestBody {
    name?: string;
    email?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    careerYears?: number;
    company?: string;
    jobPosition?: string;
    employmentCertificate?: string;
    educations?: Array<{
        schoolName: string;
        major: string;
        startYear: number;
        endYear?: number;
    }>;
    certifications?: Array<{
        certificateName: string;
    }>;
    expertises?: Array<{
        expertiseName: string;
    }>;
    introduction?: string;
}

export interface UpdateMentorProfileResponseBody {
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

export interface UpdateMentorProfileRequest extends Partial<UpdateMentorProfileRequestBody> {}

export async function updateMentorProfile(
    mentorId: number,
    updatePayload: UpdateMentorProfileRequest,
): Promise<MentorProfile> {
    const normalizedPayload: UpdateMentorProfileRequest = {
        ...updatePayload,
        profileImageUrl: updatePayload.profileImageUrl?.trim(),
    };

    const { data: apiResponse } = await api.patch<BaseResponse<UpdateMentorProfileResponseBody>>(
        `/mentors/${mentorId}/profile`,
        normalizedPayload,
    );

    const updatedProfile: MentorProfile = {
        ...apiResponse.data,
    };

    return updatedProfile;
}
