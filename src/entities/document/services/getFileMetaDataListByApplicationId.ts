import { api } from "@/app/lib/api";

import { useQuery } from "@tanstack/react-query";

export interface FileInfo {
    id: number;
    documentTitle: string;
    originalFileName: string;
    storedFilePath: string;
    presignedUrl?: string;
    attachmentFileType: "RESUME" | "PORTFOLIO";
    applicationId: number;
}

export interface PageFileInfoResponseBody {
    content: FileInfo[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export async function getFileMetaDataListByApplicationId(
    applicationId: number,
    attachmentFileType: "RESUME" | "PORTFOLIO",
    page = 0,
    size = 30,
) {
    const { data: res } = await api.get<{ data: PageFileInfoResponseBody }>(
        `/applications/${applicationId}/attachment-files/metadata/list`,
        {
            params: {
                "attachment-file-type": attachmentFileType,
                page,
                size,
            },
        },
    );
    return res.data;
}

export const DocumentQueryKeys = {
    FILES_BY_APP: (applicationId: number, type: "RESUME" | "PORTFOLIO", page = 0, size = 30) =>
        ["DOCUMENT", "FILES_BY_APP", applicationId, type, page, size] as const,
} as const;

export const useFileMetaDataListByApplicationId = (
    applicationId: number,
    attachmentFileType: "RESUME" | "PORTFOLIO",
    page = 0,
    size = 30,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.FILES_BY_APP(applicationId, attachmentFileType, page, size),
        queryFn: () =>
            getFileMetaDataListByApplicationId(applicationId, attachmentFileType, page, size),
        enabled: enabled && applicationId > 0,
    });
