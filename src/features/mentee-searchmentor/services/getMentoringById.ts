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

export async function getMentoringById(mentoringId: number): Promise<MentoringDetailResponse> {
    const { data: response } = await api.get<BaseResponse<MentoringDetailResponse>>(
        `/mentoring/${mentoringId}`,
    );
    return response.data;
}

export const useGetMentoringById = (mentoringId: number | null, enabled = true) => {
    return useQuery({
        queryKey: [...MENTOR_QUERY_KEYS.ALL(), "mentoring", mentoringId],
        queryFn: () => {
            if (mentoringId === null) {
                throw new Error("mentoringId가 필요합니다.");
            }
            return getMentoringById(mentoringId);
        },
        enabled: enabled && mentoringId !== null,
    });
};
