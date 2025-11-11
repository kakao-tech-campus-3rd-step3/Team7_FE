import z from "zod";

import { REGEX_EMAIL } from "@/shared/constants/regex";

export const MentorProfileSchema = z.object({
    name: z.string(),
    email: z.string().regex(REGEX_EMAIL),
    phoneNumber: z.string(),
    profileImageUrl: z.string(),
    careerYears: z.number(),
    company: z.string(),
    jobPosition: z.string(),
    employmentCertificate: z.string(),
    educations: z.array(
        z.object({
            schoolName: z.string(),
            major: z.string(),
            startYear: z.number(),
            endYear: z.number(),
        }),
    ),
    certifications: z.array(
        z.object({
            certificateName: z.string(),
        }),
    ),
    expertises: z.array(
        z.object({
            expertiseName: z.string(),
        }),
    ),
    introduction: z.string(),
});

export type MentorProfileSchemaType = z.infer<typeof MentorProfileSchema>;
