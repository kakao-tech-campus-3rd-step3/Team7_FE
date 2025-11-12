import { api } from "@/app/lib/api";

import { CoverLetterQueryKeys } from "./coverLetter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteCoverLetter(applicationId: number, documentId: number) {
    await api.delete<BaseResponse<void>>(
        `/applications/${applicationId}/cover-letters/${documentId}`,
    );
}

export const useDeleteCoverLetter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            applicationId,
            documentId,
        }: {
            applicationId: number;
            documentId: number;
        }) => deleteCoverLetter(applicationId, documentId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: CoverLetterQueryKeys.LIST(variables.applicationId),
            });
        },
    });
};
