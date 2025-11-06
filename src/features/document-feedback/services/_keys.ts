export const COMMENT_QUERY_KEYS = {
    ALL: () => ["comments"],
    COMMENTS_BY_DOCUMENT_ID: (documentId: number) => ["documents", documentId, "comments"],
} as const;
