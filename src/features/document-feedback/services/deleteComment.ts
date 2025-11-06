import { api } from "@/app/lib/api";
import { queryClient } from "@/app/lib/query";

import { COMMENT_QUERY_KEYS } from "@/features/document-feedback/services/_keys";

import { useMutation } from "@tanstack/react-query";

export interface DeleteCommentRequest {}

export interface DeleteCommentResponse {}

export async function deleteComment(documentId: number, commentId: number) {
    const { data: response } = await api.delete<BaseResponse<DeleteCommentResponse>>(
        `/documents/${documentId}/comments/${commentId}`,
    );
    return response.data;
}

export const useDeleteComment = (documentId: number, commentId: number) => {
    return useMutation({
        mutationFn: () => deleteComment(documentId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COMMENT_QUERY_KEYS.COMMENTS_BY_DOCUMENT_ID(documentId),
            });
        },
    });
};
