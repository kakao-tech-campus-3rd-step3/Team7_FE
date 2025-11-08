import { api } from "@/app/lib/api";

import { useAuthStore } from "@/features/authentication/store/authStore";
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

export async function getMentorDashboard(mentorId: number) {
    const { data: response } = await api.get<BaseResponse<MentorDashboardResponse[]>>(
        `/mentors/${mentorId}/dashboard`,
    );
    return response.data;
}

export const useGetMentorDashboard = () => {
    const mentorId = Number(useAuthStore((state) => state.id));

    return useSuspenseQuery({
        queryKey: MENTOR_DASHBOARD_QUERY_KEYS.BY_ID(mentorId),
        queryFn: () => getMentorDashboard(mentorId),
    });
};
