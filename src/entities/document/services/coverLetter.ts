import { api } from "@/app/lib/api";

import { useMutation, useQuery } from "@tanstack/react-query";

export interface CoverLetterItem {
    question: string;
    answer: string;
    answerLimit: number;
}
export interface CoverLetterListItem {
    versionId: number;
    title: string;
    createdDate: string;
}
export interface CoverLetterDetailResponseBody {
    title: string;
    coverLetterItems: CoverLetterItem[];
}
export interface CoverLetterRegisterRequestBody {
    title: string;
    coverLetterItems: { question: string; answer: string; answerLimit?: number }[];
}

export const CoverLetterQueryKeys = {
    LIST: (applicationId: number, page = 0, size = 30) =>
        ["COVERLETTER", "LIST", applicationId, page, size] as const,
    DETAIL: (applicationId: number, documentId: number) =>
        ["COVERLETTER", "DETAIL", applicationId, documentId] as const,
} as const;

// 목록
export async function getCoverLetterList(applicationId: number, page = 0, size = 30) {
    const { data: res } = await api.get<{
        data: {
            content: CoverLetterListItem[];
            page: number;
            size: number;
            totalElements: number;
            totalPages: number;
            last: boolean;
        };
    }>(`/api/applications/${applicationId}/cover-letters`, {
        params: { pageable: { page, size } },
    });
    return res.data;
}
export const useCoverLetterList = (applicationId: number, page = 0, size = 30) =>
    useQuery({
        queryKey: CoverLetterQueryKeys.LIST(applicationId, page, size),
        queryFn: () => getCoverLetterList(applicationId, page, size),
    });

// 상세
export async function getCoverLetterDetail(applicationId: number, documentId: number) {
    const { data: res } = await api.get<{ data: CoverLetterDetailResponseBody }>(
        `/api/applications/${applicationId}/cover-letters/${documentId}`,
    );
    return res.data;
}

// 등록
export async function registerCoverLetterByApplicationId(
    applicationId: number,
    body: CoverLetterRegisterRequestBody,
) {
    const { data: res } = await api.post<{ data: unknown }>(
        `/api/applications/${applicationId}/cover-letters`,
        body,
    );
    return res.data;
}
export const useRegisterCoverLetterByApplicationId = () =>
    useMutation({
        mutationFn: ({
            applicationId,
            body,
        }: {
            applicationId: number;
            body: CoverLetterRegisterRequestBody;
        }) => registerCoverLetterByApplicationId(applicationId, body),
    });
