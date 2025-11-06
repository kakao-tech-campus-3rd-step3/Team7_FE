export const MENTOR_PROFILE_QUERY_KEYS = {
    all: ["mentor-profile"] as const,
    detail: (mentorId: number) => [...MENTOR_PROFILE_QUERY_KEYS.all, "detail", mentorId] as const,
};
