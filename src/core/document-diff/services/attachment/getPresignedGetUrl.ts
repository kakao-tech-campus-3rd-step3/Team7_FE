import { api } from "@/app/lib/api";

import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetPresignedGetUrlResponseBody {
    code: string;
    message: string;
    data: {
        presignedUrl: string;
        expiredAt: string;
    };
}

export async function getPresignedGetUrl(applicationId: number, attachmentFileId: number) {
    const url = `/api/applications/${applicationId}/attachment-files/${attachmentFileId}`;
    return api.get<GetPresignedGetUrlResponseBody>(url);
}

export const usePresignedGetUrl = (
    applicationId: number,
    attachmentFileId: number,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.PRESIGNED_GET_URL(applicationId, attachmentFileId),
        queryFn: () => getPresignedGetUrl(applicationId, attachmentFileId),
        enabled: enabled && Number.isFinite(applicationId) && Number.isFinite(attachmentFileId),
    });
