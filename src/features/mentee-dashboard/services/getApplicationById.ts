import { api } from "@/app/lib/api";

import { APPLICATION_QUERY_KEYS } from "./_keys";
import { useQuery } from "@tanstack/react-query";

export interface GetApplicationByIdResponse {
    applicationId: number;
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
    url: string;
    applicationStatus: "PREPARING" | "WRITING" | "APPLIED" | "INTERVIEWING" | "HIRED";
}

export async function getApplicationById(applicationId: number) {
    const { data: response } = await api.get<BaseResponse<GetApplicationByIdResponse>>(
        `/applications/${applicationId}`,
    );

    return response.data;
}

export const useGetApplicationById = (applicationId: number | null, enabled = true) => {
    const isEnabled = enabled && applicationId !== null;

    return useQuery({
        queryKey: APPLICATION_QUERY_KEYS.BY_ID(applicationId ?? 0),
        queryFn: () => {
            if (applicationId === null) {
                throw new Error("applicationId가 필요합니다.");
            }
            return getApplicationById(applicationId);
        },
        enabled: isEnabled,
    });
};
