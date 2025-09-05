export const FileType = {
    PDF: "pdf",
    TEXT: "text",
    MARKDOWN: "markdown",
} as const;

export type FileTypes = (typeof FileType)[keyof typeof FileType];
