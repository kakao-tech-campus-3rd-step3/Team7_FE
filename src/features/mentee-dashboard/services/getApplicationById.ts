import { api } from "@/app/lib/api";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetApplicationByIdResponse {
    applicationId: number;
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
    applicationStatus: "PREPARING" | "WRITING" | "APPLIED" | "INTERVIEWING" | "HIRED";
}

export async function getApplicationById(applicationId: number) {
    const { data: response } = await api.get<BaseResponse<GetApplicationByIdResponse>>(
        `/api/applications/${applicationId}`,
    );

    return response.data;
}

export const useGetApplicationById = (applicationId: number) => {
    return useSuspenseQuery({
        queryKey: APPLICATION_QUERY_KEYS.BY_ID(applicationId),
        queryFn: () => getApplicationById(applicationId),
    });
};
