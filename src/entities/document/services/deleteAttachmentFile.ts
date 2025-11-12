import { api } from "@/app/lib/api";

import { DocumentQueryKeys } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteAttachmentFile(applicationId: number, attachmentFileId: number) {
    await api.delete<BaseResponse<void>>(
        `/applications/${applicationId}/attachment-files/${attachmentFileId}`,
    );
}

export const useDeleteAttachmentFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            applicationId,
            attachmentFileId,
        }: {
            applicationId: number;
            attachmentFileId: number;
        }) => deleteAttachmentFile(applicationId, attachmentFileId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: DocumentQueryKeys.FILES_BY_APP(variables.applicationId, "RESUME"),
            });
            queryClient.invalidateQueries({
                queryKey: DocumentQueryKeys.FILES_BY_APP(variables.applicationId, "PORTFOLIO"),
            });
        },
    });
};
