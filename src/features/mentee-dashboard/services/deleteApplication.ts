import { api } from "@/app/lib/api";

import { toast } from "@/shared/lib/toast";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeleteApplicationResponse = string;

export async function deleteApplication(applicationId: number): Promise<DeleteApplicationResponse> {
    const { data: response } = await api.delete<BaseResponse<DeleteApplicationResponse>>(
        `/api/applications/${applicationId}`,
    );

    return response.data;
}

export const useDeleteApplication = (memberId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (applicationId: number) => {
            return deleteApplication(applicationId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.LIST(memberId),
            });
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.ALL(),
            });
        },
        onError: () => {
            toast.error("지원서 삭제에 실패했습니다.");
        },
    });
};
