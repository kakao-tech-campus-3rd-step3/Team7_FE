import { api } from "@/app/lib/api";

import { MENTOR_QUERY_KEYS } from "./_keys";
import { useQuery } from "@tanstack/react-query";

export interface MentoringDetailResponse {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    mentorName: string;
    menteeName: string;
    status: string;
}

export async function getMyMentorings(): Promise<MentoringDetailResponse[]> {
    const { data: response } =
        await api.get<BaseResponse<MentoringDetailResponse[]>>(`/mentoring/me`);
    return response.data;
}

export const useGetMyMentorings = (enabled = true) => {
    return useQuery({
        queryKey: [...MENTOR_QUERY_KEYS.ALL(), "mentoring", "me"],
        queryFn: getMyMentorings,
        enabled,
    });
};
