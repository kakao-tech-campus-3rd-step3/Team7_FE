export const MENTOR_PROFILE_QUERY_KEYS = {
    BY_ID: (mentorId: number) => ["mentor-profile", mentorId] as const,
};
