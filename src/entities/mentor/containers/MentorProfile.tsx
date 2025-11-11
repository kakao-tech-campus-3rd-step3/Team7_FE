import { Fragment } from "react/jsx-runtime";

import { MentorProfileCertification } from "@/entities/mentor/components/MentorProfileCertification";
import { MentorProfileEducation } from "@/entities/mentor/components/MentorProfileEducation";
import { MentorProfileExperts } from "@/entities/mentor/components/MentorProfileExperts";
import { MentorProfileHeader } from "@/entities/mentor/components/MentorProfileHeader";
import { MentorProfileIntroduction } from "@/entities/mentor/components/MentorProfileIntroduction";
import { useGetMentorProfile } from "@/entities/mentor/service/getMentorProfile";

import { useAuthStore } from "@/features/authentication/store/authStore";

import { Spacing } from "@/shared/components/Helper/Spacing";

export const MentorProfileContainer = () => {
    const { data } = useGetMentorProfile(Number(useAuthStore((state) => state.id)));

    return (
        <Fragment>
            <MentorProfileHeader
                name={data.name}
                email={data.email}
                profileImageUrl={data.profileImageUrl}
                careerYears={data.careerYears}
                company={data.company}
                phoneNumber={data.phoneNumber}
            />
            <Spacing height={24} />
            <MentorProfileIntroduction introduction={data.introduction} />
            <Spacing height={16} />
            <MentorProfileEducation educations={data.educations} />
            <Spacing height={16} />
            <MentorProfileCertification certifications={data.certifications} />
            <Spacing height={16} />
            <MentorProfileExperts expertises={data.expertises} />
        </Fragment>
    );
};
