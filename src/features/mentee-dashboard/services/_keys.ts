export const APPLICATION_QUERY_KEYS = {
    ALL: () => ["applications"],
    LIST: (memberId: number) => ["applications", "list", memberId],
    BY_ID: (applicationId: number) => ["applications", applicationId],
} as const;
