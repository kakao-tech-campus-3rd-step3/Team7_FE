import { FileType } from "@/core/@types/FileType";
import { createMarkdownDiffStrategy } from "@/core/document-diff/MarkdownDiffStrategy";
import { createPdfDiffStrategy } from "@/core/document-diff/PdfDiffStrategy";
import { createPlainTextDiffStrategy } from "@/core/document-diff/PlainTextDiffStrategy";
import { registerBuiltinDiffStrategies } from "@/core/document-diff/base/DiffStrategyFactory";

let installed = false;

export function installDocumentDiffStrategies() {
    if (installed) return;

    registerBuiltinDiffStrategies({
        [FileType.PDF]: createPdfDiffStrategy,
        [FileType.MARKDOWN]: createMarkdownDiffStrategy,
        [FileType.TEXT]: createPlainTextDiffStrategy,
    });

    installed = true;
}
