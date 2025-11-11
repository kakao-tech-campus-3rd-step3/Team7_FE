export const MENTOR_DASHBOARD_QUERY_KEYS = {
    BY_ID: (mentorId: number) => ["MENTOR_DASHBOARD", mentorId] as const,
};
