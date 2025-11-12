import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteMentoring(mentoringId: number): Promise<void> {
    await api.delete<BaseResponse<void>>(`/mentoring/${mentoringId}`);
}

export const useDeleteMentoring = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mentoringId: number) => deleteMentoring(mentoringId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: MENTOR_QUERY_KEYS.ALL(),
            });
        },
    });
};
