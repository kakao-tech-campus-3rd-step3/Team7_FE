export const MENTOR_PROFILE_QUERY_KEYS = {
    ALL: () => ["mentor-profile"] as const,
    detail: (mentorId: number) => [...MENTOR_PROFILE_QUERY_KEYS.ALL(), "detail", mentorId] as const,
} as const;
