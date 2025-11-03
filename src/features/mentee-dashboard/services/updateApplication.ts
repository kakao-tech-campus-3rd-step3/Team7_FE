import { api } from "@/app/lib/api";

import { toast } from "@/shared/lib/toast.tsx";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateApplicationRequestBody {
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
}

export type UpdateApplicationResponse = string;

export async function updateApplication(
    applicationId: number,
    body: UpdateApplicationRequestBody,
): Promise<UpdateApplicationResponse> {
    const formattedDeadline = body.deadline.includes("T")
        ? body.deadline
        : `${body.deadline}T00:00:00`;

    const formattedBody = {
        ...body,
        deadline: formattedDeadline,
    };

    const { data: response } = await api.patch<BaseResponse<UpdateApplicationResponse>>(
        `/api/applications/${applicationId}`,
        formattedBody,
    );

    return response.data;
}

export const useUpdateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            applicationId,
            body,
        }: {
            applicationId: number;
            body: UpdateApplicationRequestBody;
        }) => {
            return updateApplication(applicationId, body);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.BY_ID(variables.applicationId),
            });
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.ALL(),
            });
        },
        onError: () => {
            toast.error("지원서 수정에 실패했습니다.");
        },
    });
};
