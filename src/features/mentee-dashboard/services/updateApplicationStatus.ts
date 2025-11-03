import { api } from "@/app/lib/api";

import { toast } from "@/shared/lib/toast";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import type { GetApplicationsResponse } from "./getApplications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateApplicationStatusRequestBody {
    newStatus: "PREPARING" | "WRITING" | "APPLIED" | "INTERVIEWING" | "HIRED";
}

export type UpdateApplicationStatusResponse = string;

export async function updateApplicationStatus(
    applicationId: number,
    body: UpdateApplicationStatusRequestBody,
): Promise<UpdateApplicationStatusResponse> {
    const { data: response } = await api.patch<BaseResponse<UpdateApplicationStatusResponse>>(
        `/api/applications/${applicationId}/status`,
        body,
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    return response.data;
}

export const useUpdateApplicationStatus = (memberId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            applicationId,
            body,
        }: {
            applicationId: number;
            body: UpdateApplicationStatusRequestBody;
        }) => {
            return updateApplicationStatus(applicationId, body);
        },
        onMutate: async ({ applicationId, body }) => {
            await queryClient.cancelQueries({
                queryKey: APPLICATION_QUERY_KEYS.LIST(memberId),
            });

            const previousData = queryClient.getQueryData<GetApplicationsResponse>(
                APPLICATION_QUERY_KEYS.LIST(memberId),
            );

            if (previousData) {
                queryClient.setQueryData<GetApplicationsResponse>(
                    APPLICATION_QUERY_KEYS.LIST(memberId),
                    {
                        ...previousData,
                        applications: previousData.applications.map((app) =>
                            app.applicationId === applicationId
                                ? { ...app, applicationStatus: body.newStatus }
                                : app,
                        ),
                    },
                );
            }

            return { previousData };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    APPLICATION_QUERY_KEYS.LIST(memberId),
                    context.previousData,
                );
            }

            toast.error("상태 변경에 실패했습니다");
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.BY_ID(variables.applicationId),
            });
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.LIST(memberId),
            });
        },
    });
};
