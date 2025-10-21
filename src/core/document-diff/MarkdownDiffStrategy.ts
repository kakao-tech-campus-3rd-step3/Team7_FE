import type { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface MarkdownDiffResult {
    before: string;
    after: string;
}

export function createMarkdownDiffStrategy(): DiffStrategy<MarkdownDiffResult> {
    return {
        async process(before: string, after: string) {
            // TODO: 라인 기반 diff 적용
            return { before, after };
        },
    };
}
