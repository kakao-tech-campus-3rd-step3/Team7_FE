import { z } from "zod";

export const NewApplicationSchema = z.object({
    companyName: z.string().min(1, { message: "회사명을 입력해 주세요." }),

    applyPosition: z.string().min(1, { message: "지원 직무를 입력해 주세요." }),

    deadline: z
        .string()
        .min(1, { message: "마감일을 선택해 주세요." })
        .refine((value) => !Number.isNaN(Date.parse(value)), {
            message: "유효한 날짜가 아닙니다.",
        }),

    location: z.string().min(1, { message: "근무지를 입력해 주세요." }),

    employmentType: z.string().min(1, { message: "고용 형태를 입력해 주세요." }),

    careerRequirement: z
        .number()
        .min(0, { message: "0 이상의 경력이어야 합니다." })
        .refine((value) => value !== undefined && !Number.isNaN(value), {
            message: "경력 요구사항을 입력해 주세요.",
        }),

    url: z
        .string()
        .min(1, { message: "채용공고 URL을 입력해 주세요." })
        .refine((value) => /^https?:\/\/.+/i.test(value), { message: "URL 형식이 아닙니다." }),
});

export type NewApplicationFormInput = z.input<typeof NewApplicationSchema>;
export type NewApplicationFormOutput = z.output<typeof NewApplicationSchema>;

export const DEFAULT_APPLICATION: NewApplicationFormInput = {
    companyName: "",
    applyPosition: "",
    deadline: "",
    location: "",
    employmentType: "정규직",
    careerRequirement: 0,
    url: "",
};
