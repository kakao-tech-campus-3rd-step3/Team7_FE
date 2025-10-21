import type { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface PlainTextDiffResult {
    before: string;
    after: string;
}

export function createPlainTextDiffStrategy(): DiffStrategy<PlainTextDiffResult> {
    return {
        async process(before: string, after: string) {
            // TODO: 라인/문자 단위 diff 계산 결과를 함께 반환하도록 확장
            return { before, after };
        },
    };
}
