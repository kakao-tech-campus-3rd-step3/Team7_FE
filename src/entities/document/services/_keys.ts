export const DocumentQueryKeys = {
    FILES_BY_APP: (applicationId: number, type: "RESUME" | "PORTFOLIO", page = 0, size = 30) =>
        ["DOCUMENT", "FILES_BY_APP", applicationId, type, page, size] as const,
} as const;

export const CoverLetterQueryKeys = {
    LIST: (applicationId: number, page = 0, size = 30) =>
        ["COVERLETTER", "LIST", applicationId, page, size] as const,
    DETAIL: (applicationId: number, documentId: number) =>
        ["COVERLETTER", "DETAIL", applicationId, documentId] as const,
} as const;
