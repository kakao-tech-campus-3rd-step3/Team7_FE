import type { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface PdfDiffResult {
    before: string;
    after: string;
}

export function createPdfDiffStrategy(): DiffStrategy<PdfDiffResult> {
    return {
        async process(before: string, after: string) {
            return { before, after };
        },
    };
}
