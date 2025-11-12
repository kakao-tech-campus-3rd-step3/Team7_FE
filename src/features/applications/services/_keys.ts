export const APPLICATION_QUERY_KEYS = {
    METADATA_BY_ID: (applicationId: number) => ["application", "metadata", applicationId] as const,
};
