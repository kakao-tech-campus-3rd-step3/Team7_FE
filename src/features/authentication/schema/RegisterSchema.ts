import z from "zod";

import { REGEX_EMAIL } from "@/shared/constants/regex";

export const RegisterCommonSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().regex(REGEX_EMAIL, "유효한 이메일 주소를 입력해주세요"),
    phoneNumber: z.string().min(1, "전화번호를 입력해주세요"),
    profileImage: z.string().optional(),
    registrationId: z.string(),
    oauthId: z.string(),
});

export const RegisterMentorSchema = z.object({
    commonInfo: RegisterCommonSchema,
    careerYears: z.number().min(1, "경력 년수를 입력해주세요"),
    currentCompany: z.string().min(1, "현재 회사를 입력해주세요"),
    currentPosition: z.string().min(1, "현재 직책을 입력해주세요"),
    employmentCertificate: z.string().min(1, "재직증명서를 업로드해주세요"),
    certifications: z.array(
        z.object({
            certificateName: z.string().min(1, "자격증 이름을 입력해주세요"),
        }),
    ),
    educations: z.array(
        z.object({
            schoolName: z.string().min(1, "학교 이름을 입력해주세요"),
            major: z.string().min(1, "전공을 입력해주세요"),
            startYear: z.number().min(1900, "입학년도를 확인해주세요"),
            endYear: z.number().min(1900, "졸업년도를 확인해주세요"),
        }),
    ),
    expertises: z.array(
        z.object({
            expertiseName: z.string().min(1, "전문 분야를 입력해주세요"),
        }),
    ),
    description: z.string().min(1, "자기소개를 입력해주세요"),
    careers: z.array(
        z.object({
            companyName: z.string().min(1, "회사 이름을 입력해주세요"),
            position: z.string().min(1, "직책을 입력해주세요"),
            startDate: z.number().min(1900, "입사년도를 확인해주세요"),
            endDate: z.number().min(1900, "퇴사년도를 확인해주세요"),
        }),
    ),
});

export const RegisterMenteeSchema = z.object({
    commonInfo: RegisterCommonSchema,
    university: z.string().min(1, "대학교를 입력해주세요"),
    major: z.string().min(1, "전공을 입력해주세요"),
    graduationYear: z.number().min(1900, "졸업년도를 확인해주세요"),
    wishCompanies: z.array(
        z.object({
            companyName: z.string().min(1, "희망 회사를 입력해주세요"),
        }),
    ),
    wishPositions: z.array(
        z.object({
            positionName: z.string().min(1, "희망 직무를 입력해주세요"),
        }),
    ),
});

export type RegisterMentorSchemaType = z.infer<typeof RegisterMentorSchema>;
export type RegisterMenteeSchemaType = z.infer<typeof RegisterMenteeSchema>;
