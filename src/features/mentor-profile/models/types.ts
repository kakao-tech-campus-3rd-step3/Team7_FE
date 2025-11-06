export interface MentorEducation {
    schoolName: string;
    major: string;
    startYear: number;
    endYear?: number;
}

export interface MentorCertification {
    certificateName: string;
}

export interface MentorExpertise {
    expertiseName: string;
}

export interface MentorProfile {
    name: string;
    email: string;
    phoneNumber?: string;
    profileImageUrl?: string;
    careerYears?: number;
    company?: string;
    jobPosition?: string;
    employmentCertificate?: string;
    educations: MentorEducation[];
    certifications: MentorCertification[];
    expertises: MentorExpertise[];
    introduction?: string;
}
