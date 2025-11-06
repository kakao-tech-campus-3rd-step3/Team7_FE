import { api } from "@/app/lib/api";

import { useMutation } from "@tanstack/react-query";

export interface PutPresignedUrlRequestBody {
    documentTitle: string;
    fileName: string;
    fileType: string;
}

export interface PutPresignedUrlResponseBody {
    presignedUrl: string;
    uniqueFileName: string;
    expiredAt: string;
}

export interface GeneratePostPresignedUrlResponseBody {
    code: string;
    message: string;
    data: PutPresignedUrlResponseBody;
}

export async function generatePostPresignedUrl(
    applicationId: number,
    attachmentFileType: "RESUME" | "PORTFOLIO",
    body: PutPresignedUrlRequestBody,
) {
    console.log("[presigned:request]", { applicationId, attachmentFileType, body });

    const { data } = await api.post<GeneratePostPresignedUrlResponseBody>(
        `/applications/${applicationId}/attachment-files/file-upload`,
        body,
        { params: { "attachment-file-type": attachmentFileType } },
    );

    console.log("[presigned:response]", data);

    return data.data;
}

export const useGeneratePostPresignedUrl = () =>
    useMutation({
        mutationFn: ({
            applicationId,
            attachmentFileType,
            body,
        }: {
            applicationId: number;
            attachmentFileType: "RESUME" | "PORTFOLIO";
            body: PutPresignedUrlRequestBody;
        }) => generatePostPresignedUrl(applicationId, attachmentFileType, body),
    });
