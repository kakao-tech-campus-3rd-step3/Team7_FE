import { api } from "@/app/lib/api";

import { COMMENT_QUERY_KEYS } from "@/features/document-feedback/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetCommentsResponse {
    id: number;
    content: string;
    coordinate: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    writerInfo: {
        id: number;
        name: string;
        memberRole: "MENTEE" | "MENTOR";
    };
    documentInfo: {
        id: number;
        title: string;
    };
}

export async function getComments(documentId: number) {
    const { data: response } = await api.get<BasePaginatedResponse<Array<GetCommentsResponse>>>(
        `/documents/${documentId}/comments/list`,
    );

    return response.data;
}

export const useGetComments = (documentId: number) => {
    return useSuspenseQuery({
        queryKey: COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
        queryFn: () => getComments(documentId),
    });
};
