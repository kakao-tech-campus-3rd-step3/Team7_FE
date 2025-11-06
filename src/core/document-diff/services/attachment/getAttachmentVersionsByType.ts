import { api } from "@/app/lib/api";

import type { PdfVersionItem } from "@/widgets/document-diff/VersionedPdfDiffWidget";

import { AttachmentQueryKeys } from "../_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetFileMetaListResponseBody {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    content: Array<{
        id: number;
        originalFileName: string;
        storedFilePath: string;
        documentTitle: string;
        applicationId: number;
        attachmentFileType: "RESUME" | "PORTFOLIO";
    }>;
}

export interface GetPresignedGetUrlResponseBody {
    presignedUrl: string;
    expiredAt: string;
}

export async function getAttachmentFileMetaListByType(
    applicationId: number,
    type: "RESUME" | "PORTFOLIO",
    page = 0,
    size = 50,
) {
    const { data: response } = await api.get<{
        code: string;
        message: string;
        data: GetFileMetaListResponseBody;
    }>(`/api/applications/${applicationId}/attachment-files/metadata/list`, {
        params: {
            "attachment-file-type": type,
            page,
            size,
        },
    });
    return response.data;
}

export async function getPresignedGetUrl(applicationId: number, attachmentFileId: number) {
    const { data: response } = await api.get<{
        code: string;
        message: string;
        data: GetPresignedGetUrlResponseBody;
    }>(`/api/applications/${applicationId}/attachment-files/${attachmentFileId}`);
    return response.data;
}

export async function getAttachmentVersionsByType(
    applicationId: number,
    type: "RESUME" | "PORTFOLIO",
): Promise<PdfVersionItem[]> {
    const meta = await getAttachmentFileMetaListByType(applicationId, type);
    const rows = meta.content ?? [];
    if (rows.length === 0) return [];

    const urls = await Promise.all(rows.map((r) => getPresignedGetUrl(applicationId, r.id)));

    return rows.map((r, i) => ({
        id: String(r.id),
        label: r.documentTitle || r.originalFileName || `파일 ${i + 1}`,
        src: urls[i].presignedUrl,
        createdAt: undefined,
    }));
}

export interface UseAttachmentVersionsParams {
    applicationId: number;
    type: "RESUME" | "PORTFOLIO";
}

export const useAttachmentVersions = ({ applicationId, type }: UseAttachmentVersionsParams) => {
    return useQuery({
        queryKey: AttachmentQueryKeys.VERSION_LIST(applicationId, type),
        queryFn: () => getAttachmentVersionsByType(applicationId, type),
        enabled: Number.isFinite(applicationId),
    });
};
