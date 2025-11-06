import { post } from "@/app/lib/api";

import { useMutation } from "@tanstack/react-query";

export interface GeneratePutPresignedUrlRequestBody {
    documentTitle: string;
    fileName: string;
    fileType: string;
}

export interface GeneratePutPresignedUrlResponseBody {
    code: string;
    message: string;
    data: {
        presignedUrl: string;
        uniqueFileName: string;
        expiredAt: string;
    };
}

export async function generatePutPresignedUrl(
    applicationId: number,
    attachmentFileType: "RESUME" | "PORTFOLIO",
    body: GeneratePutPresignedUrlRequestBody,
) {
    const url = `/api/applications/${applicationId}/attachment-files/file-upload?attachment-file-type=${attachmentFileType}`;
    return post<GeneratePutPresignedUrlResponseBody, GeneratePutPresignedUrlRequestBody>(url, body);
}

export const useGeneratePutPresignedUrl = () =>
    useMutation({
        mutationFn: ({
            applicationId,
            attachmentFileType,
            body,
        }: {
            applicationId: number;
            attachmentFileType: "RESUME" | "PORTFOLIO";
            body: GeneratePutPresignedUrlRequestBody;
        }) => generatePutPresignedUrl(applicationId, attachmentFileType, body),
    });
