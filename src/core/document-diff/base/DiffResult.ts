import type { FileType, FileTypes } from "@/core/@types/FileType";
import type { MarkdownDiffResult } from "@/core/document-diff/MarkdownDiffStrategy";
import type { PdfDiffResult } from "@/core/document-diff/PdfDiffStrategy";
import type { PlainTextDiffResult } from "@/core/document-diff/PlainTextDiffStrategy";

export interface DiffResult<T> {
    renderer: FileTypes;
    before: T;
    after: T;
}

export type DiffResultTypeMap = {
    [FileType.PDF]: PdfDiffResult;
    [FileType.TEXT]: PlainTextDiffResult;
    [FileType.MARKDOWN]: MarkdownDiffResult;
};

export type InferDiffResultType<T extends FileTypes> = T extends keyof DiffResultTypeMap
    ? DiffResultTypeMap[T]
    : never;
