import { api } from "@/app/lib/api";

import { MENTOR_DASHBOARD_QUERY_KEYS } from "@/features/mentor-dashboard/services/_keys";

import { useSuspenseQuery } from "@tanstack/react-query";

export interface MentorDashboardResponse {
    documentId: number;
    documentTitle: string;
    documentType: string;
    menteeId: number;
    menteeName: string;
    applicationId: number;
    companyName: string;
    mentoringDueDate: string;
}

export async function getMentorDashboard() {
    // TODO: 추후 memberId 동적 처리 (인증 인가 이후)
    const { data: response } =
        await api.get<BaseResponse<MentorDashboardResponse[]>>(`/mentors/1/dashboard`);
    return response.data;
}

export const useGetMentorDashboard = () => {
    return useSuspenseQuery({
        queryKey: MENTOR_DASHBOARD_QUERY_KEYS.ALL(),
        queryFn: () => getMentorDashboard(),
    });
};
