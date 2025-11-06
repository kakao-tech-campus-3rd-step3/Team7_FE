import { api } from "@/app/lib/api";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetApplicationsQueryParams {
    memberId: number;
    lastUpdatedAt?: string;
    size?: number;
}

export interface ApplicationItem {
    applicationId: number;
    companyName: string;
    applyPosition: string;
    deadline: string;
    applicationStatus: "PREPARING" | "WRITING" | "APPLIED" | "INTERVIEWING" | "HIRED";
}

export interface GetApplicationsResponse {
    applications: ApplicationItem[];
    nextCursor: string;
    hasNext: boolean;
}

export async function getApplications(params: GetApplicationsQueryParams) {
    const { data: response } = await api.get<BaseResponse<GetApplicationsResponse>>(
        `/applications`,
        {
            params: {
                memberId: params.memberId,
                ...(params.lastUpdatedAt && { lastUpdatedAt: params.lastUpdatedAt }),
                ...(params.size && { size: params.size }),
            },
        },
    );

    return response.data;
}

export const useGetApplications = (params: GetApplicationsQueryParams) => {
    return useSuspenseQuery({
        queryKey: APPLICATION_QUERY_KEYS.LIST(params.memberId),
        queryFn: () => getApplications(params),
    });
};
