export const DocumentQueryKeys = {
    COVERLETTER_LIST_BY_APPLICATION: (applicationId: number, page?: number, size?: number) =>
        [
            "DOCUMENT",
            "COVERLETTER",
            "LIST_BY_APPLICATION",
            applicationId,
            page ?? 0,
            size ?? 10,
        ] as const,
    COVERLETTER_DETAIL: (applicationId: number, documentId: number) =>
        ["DOCUMENT", "COVERLETTER", "DETAIL", applicationId, documentId] as const,
    COVERLETTER_DIFF_BY_IDS: (applicationId: number, leftId: number, rightId: number) =>
        ["DOCUMENT", "COVERLETTER", "DIFF_BY_IDS", applicationId, leftId, rightId] as const,

    ATTACHMENT_META_LIST: (
        applicationId: number,
        type: "RESUME" | "PORTFOLIO",
        page?: number,
        size?: number,
    ) =>
        [
            "DOCUMENT",
            "ATTACHMENT",
            "META_LIST",
            applicationId,
            type,
            page ?? 0,
            size ?? 10,
        ] as const,
    PRESIGNED_GET_URL: (applicationId: number, attachmentFileId: number) =>
        ["DOCUMENT", "ATTACHMENT", "PRESIGNED_GET", applicationId, attachmentFileId] as const,

    RESUME_PDF_DIFF_BY_IDS: (applicationId: number, leftId: number, rightId: number) =>
        ["DOCUMENT", "RESUME", "PDF_DIFF_BY_IDS", applicationId, leftId, rightId] as const,
    PORTFOLIO_PDF_DIFF_BY_IDS: (applicationId: number, leftId: number, rightId: number) =>
        ["DOCUMENT", "PORTFOLIO", "PDF_DIFF_BY_IDS", applicationId, leftId, rightId] as const,
} as const;

export const AttachmentQueryKeys = {
    FILE_META_LIST: (applicationId: number, type: "RESUME" | "PORTFOLIO") =>
        ["ATTACHMENT", "FILE_META_LIST", applicationId, type] as const,
    PRESIGNED_GET: (applicationId: number, fileId: number) =>
        ["ATTACHMENT", "PRESIGNED_GET", applicationId, fileId] as const,
    VERSION_LIST: (applicationId: number, type: "RESUME" | "PORTFOLIO") =>
        ["ATTACHMENT", "VERSION_LIST", applicationId, type] as const,
} as const;
