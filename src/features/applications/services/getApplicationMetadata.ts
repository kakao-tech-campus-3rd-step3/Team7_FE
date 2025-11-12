import { api } from "@/app/lib/api";

import { APPLICATION_QUERY_KEYS } from "@/features/applications/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface GetApplicationMetadata {
    applicationId: number;
    companyName: string;
    applyPosition: string;
    deadline: string;
    location: string;
    employmentType: string;
    careerRequirement: number;
    applicationStatus: string;
    url: string;
}

export async function getApplicationMetadata(applicationId: number) {
    const { data: response } = await api.get<BaseResponse<GetApplicationMetadata>>(
        `/applications/${applicationId}`,
    );
    return response.data;
}

export const useGetApplicationMetadata = (applicationId: number) => {
    return useSuspenseQuery({
        queryKey: APPLICATION_QUERY_KEYS.METADATA_BY_ID(applicationId),
        queryFn: () => getApplicationMetadata(applicationId),
    });
};
