import { api } from "@/app/lib/api";

import { toast } from "@/shared/lib/toast";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateApplicationRequestBody {
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
    url: string;
}

export interface CreateApplicationResponse {}

export async function createApplication(
    body: CreateApplicationRequestBody,
): Promise<CreateApplicationResponse> {
    const formattedDeadline = body.deadline.includes("T")
        ? body.deadline
        : `${body.deadline}T00:00:00`;

    const formattedBody = {
        ...body,
        deadline: formattedDeadline,
    };

    const { data: response } = await api.post<BaseResponse<CreateApplicationResponse>>(
        `/api/applications/register`,
        formattedBody,
    );

    return response.data;
}

export const useCreateApplication = (memberId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateApplicationRequestBody) => {
            return createApplication(body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: APPLICATION_QUERY_KEYS.LIST(memberId),
            });
        },
        onError: () => {
            toast.error("지원서 생성에 실패했습니다.");
        },
    });
};
