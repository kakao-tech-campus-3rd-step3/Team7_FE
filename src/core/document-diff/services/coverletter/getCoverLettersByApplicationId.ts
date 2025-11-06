import { api } from "@/app/lib/api";

import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetCoverLettersByApplicationIdResponseBody {
    code: string;
    message: string;
    data: {
        content: Array<{
            versionId: number;
            title: string;
            createdDate: string;
        }>;
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        last: boolean;
    };
}

export async function getCoverLettersByApplicationId(applicationId: number, page = 0, size = 10) {
    const url = `/api/applications/${applicationId}/cover-letters?page=${page}&size=${size}`;
    return api.get<GetCoverLettersByApplicationIdResponseBody>(url);
}

export const useCoverLettersByApplicationId = (
    applicationId: number,
    page = 0,
    size = 10,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.COVERLETTER_LIST_BY_APPLICATION(applicationId, page, size),
        queryFn: () => getCoverLettersByApplicationId(applicationId, page, size),
        enabled: enabled && Number.isFinite(applicationId),
    });
