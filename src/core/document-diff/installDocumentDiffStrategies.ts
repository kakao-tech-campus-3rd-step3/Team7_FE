import { FileType, type FileTypes } from "@/core/@types/FileType";
import { createMarkdownDiffStrategy } from "@/core/document-diff/MarkdownDiffStrategy";
import { createPdfDiffStrategy } from "@/core/document-diff/PdfDiffStrategy";
import { createPlainTextDiffStrategy } from "@/core/document-diff/PlainTextDiffStrategy";
import {
    has,
    registerBuiltinDiffStrategies,
    type FactoryFn,
} from "@/core/document-diff/base/DiffStrategyFactory";

export function installDocumentDiffStrategies(): void {
    const targets: Array<[FileTypes, FactoryFn<any>]> = [
        [FileType.PDF, createPdfDiffStrategy],
        [FileType.MARKDOWN, createMarkdownDiffStrategy],
        [FileType.TEXT, createPlainTextDiffStrategy],
    ];

    const missing = targets.filter(([type]) => !has(type));
    if (missing.length === 0) return;

    registerBuiltinDiffStrategies(
        Object.fromEntries(missing) as Partial<Record<FileTypes, FactoryFn<any>>>,
    );
}
