import { api } from "@/app/lib/api";

import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { useQuery } from "@tanstack/react-query";

export type AttachmentFileType = "RESUME" | "PORTFOLIO";

export interface FileInfoItem {
    attachmentFileType: AttachmentFileType;
    id: number;
    originalFileName: string;
    storedFilePath: string;
    documentTitle: string;
    applicationId: number;
    presignedUrl?: string | null;
}

export interface GetAttachmentFileMetaListResponseBody {
    code: string;
    message: string;
    data: {
        totalElements: number;
        totalPages: number;
        size: number;
        content: FileInfoItem[];
        number: number;
        first: boolean;
        last: boolean;
        empty: boolean;
    };
}

export async function getAttachmentFileMetaList(
    applicationId: number,
    type: AttachmentFileType,
    page = 0,
    size = 10,
) {
    const url = `/api/applications/${applicationId}/attachment-files/metadata/list?attachment-file-type=${type}&page=${page}&size=${size}`;
    return api.get<GetAttachmentFileMetaListResponseBody>(url);
}

export const useAttachmentFileMetaList = (
    applicationId: number,
    type: AttachmentFileType,
    page = 0,
    size = 10,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.ATTACHMENT_META_LIST(applicationId, type, page, size),
        queryFn: () => getAttachmentFileMetaList(applicationId, type, page, size),
        enabled: enabled && Number.isFinite(applicationId),
    });
