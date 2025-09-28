import { z } from "zod";

const FileSchema = z.custom<File>((value) => typeof File !== "undefined" && value instanceof File, {
    message: "유효한 파일만 첨부할 수 있습니다.",
});
export const NewDocumentSchema = z
    .object({
        title: z.string().trim().default(""),
        files: z.array(FileSchema).default([]),
    })
    .refine((data) => data.title.length > 0 || data.files.length > 0, {
        message: "제목 또는 파일 중 하나는 반드시 입력/첨부되어야 합니다.",
        path: ["title"],
    });

export type NewDocumentSchemaType = z.infer<typeof NewDocumentSchema>; // ✅ { title: string; files: File[] }
