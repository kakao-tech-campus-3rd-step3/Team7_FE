import type { MentorProfile } from "../models/types";
import { MENTOR_PROFILE_QUERY_KEYS } from "../services/_keys";
import { getMentorProfile } from "../services/getMentorProfile";
import {
    updateMentorProfile,
    type UpdateMentorProfileRequest,
} from "../services/updateMentorProfile";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMentorProfile(mentorId: number) {
    const queryClient = useQueryClient();

    const { data: profile } = useSuspenseQuery({
        queryKey: MENTOR_PROFILE_QUERY_KEYS.detail(mentorId),
        queryFn: () => getMentorProfile(mentorId),
        staleTime: 1000 * 30,
    });

    const mutation = useMutation({
        mutationFn: (updatePayload: UpdateMentorProfileRequest) => {
            const currentProfile = queryClient.getQueryData<MentorProfile>(
                MENTOR_PROFILE_QUERY_KEYS.detail(mentorId),
            );
            if (!currentProfile) {
                throw new Error("Profile data not found");
            }
            const mergedPayload: UpdateMentorProfileRequest = {
                ...currentProfile,
                ...updatePayload,
            };
            return updateMentorProfile(mentorId, mergedPayload);
        },
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData<MentorProfile>(
                MENTOR_PROFILE_QUERY_KEYS.detail(mentorId),
                updatedProfile,
            );
        },
    });

    return {
        profile,
        save: mutation.mutateAsync,
        isSaving: mutation.isPending,
    };
}
