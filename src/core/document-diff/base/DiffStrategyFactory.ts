import { FileType, type FileTypes } from "@/core/@types/FileType";
import { MarkdownDiffStrategy } from "@/core/document-diff/MarkdownDiffStrategy";
import { PdfDiffStrategy } from "@/core/document-diff/PdfDiffStrategy";
import { PlainTextDiffStrategy } from "@/core/document-diff/PlainTextDiffStrategy";

export class DiffStrategyFactory {
    public static create(fileType: FileTypes) {
        switch (fileType) {
            case FileType.PDF:
                return new PdfDiffStrategy();
            case FileType.TEXT:
                return new PlainTextDiffStrategy();
            case FileType.MARKDOWN:
                return new MarkdownDiffStrategy();
            default:
                throw new Error(`Unsupported file type: ${fileType}`);
        }
    }
}
