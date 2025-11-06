import { get } from "@/app/lib/api";

import { DocumentQueryKeys } from "@/core/document-diff/services/_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetCoverLetterDetailResponseBody {
    code: string;
    message: string;
    data: {
        title: string;
        coverLetterItems: Array<{
            question: string;
            answer: string;
            answerLimit?: number | null;
        }>;
    };
}

export async function getCoverLetterDetailById(applicationId: number, documentId: number) {
    const url = `/api/applications/${applicationId}/cover-letters/${documentId}`;
    return get<GetCoverLetterDetailResponseBody>(url);
}

export const useCoverLetterDetailById = (
    applicationId: number,
    documentId: number,
    enabled = true,
) =>
    useQuery({
        queryKey: DocumentQueryKeys.COVERLETTER_DETAIL(applicationId, documentId),
        queryFn: () => getCoverLetterDetailById(applicationId, documentId),
        enabled: enabled && Number.isFinite(applicationId) && Number.isFinite(documentId),
    });
