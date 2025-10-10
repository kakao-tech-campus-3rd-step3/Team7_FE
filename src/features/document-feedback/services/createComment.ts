import { api } from "@/app/lib/api";

import { COMMENT_QUERY_KEYS } from "@/features/document-feedback/services/_keys";
import type { GetCommentsResponse } from "@/features/document-feedback/services/getComments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateCommentRequest {
    content: string;
    coordinate: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
}

export interface CreateCommentResponse {}

export async function createComment(
    documentId: number,
    body: CreateCommentRequest,
): Promise<CreateCommentResponse> {
    const { data: response } = await api.post<BaseResponse<CreateCommentResponse>>(
        `/documents/${documentId}/comments`,
        body,
    );
    return response.data;
}

export const useCreateComment = (documentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newComment: CreateCommentRequest) => {
            return createComment(documentId, newComment);
        },

        onMutate: async (newCommentData) => {
            await queryClient.cancelQueries({
                queryKey: COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
            });

            const previousComments = queryClient.getQueryData(
                COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
            );

            const optimisticComment: GetCommentsResponse = {
                id: -1,
                content: newCommentData.content,
                coordinate: newCommentData.coordinate,
                // TODO: 실제 사용자 정보로 수정
                writerInfo: {
                    id: -1,
                    name: "임시 사용자",
                    memberRole: "MENTEE",
                },
                documentInfo: {
                    id: documentId,
                    title: "임시 문서",
                },
            };

            queryClient.setQueryData(
                COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
                (previousData: BasePaginatedResponse<GetCommentsResponse[]>["data"]) => {
                    if (!previousData) {
                        return {
                            totalElements: 1,
                            totalPages: 1,
                            pageable: {
                                paged: true,
                                pageNumber: 0,
                                pageSize: 20,
                                offset: 0,
                                sort: { sorted: false, empty: true, unsorted: true },
                                unpaged: false,
                            },
                            size: 20,
                            content: [optimisticComment],
                            number: 0,
                            sort: { sorted: false, empty: true, unsorted: true },
                            numberOfElements: 1,
                            first: true,
                            last: true,
                            empty: false,
                        };
                    }

                    return {
                        ...previousData,
                        content: [...(previousData.content || []), optimisticComment],
                        totalElements: (previousData.totalElements || 0) + 1,
                        numberOfElements: (previousData.numberOfElements || 0) + 1,
                        empty: false,
                    };
                },
            );

            return { previousComments, optimisticComment };
        },

        onError: (err, _newComment, context) => {
            if (context?.previousComments) {
                queryClient.setQueryData(
                    COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
                    context.previousComments,
                );
            }
            // TODO: 에러 UI 처리 로직 추가
            console.error("댓글 생성 실패 :", err);
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
            });
        },
    });
};
