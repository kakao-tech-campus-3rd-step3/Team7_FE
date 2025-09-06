import { FileType } from "@/core/@types/FileType";
import type { DiffResult } from "@/core/document-diff/base/DiffResult";
import { DiffStrategy } from "@/core/document-diff/base/DiffStrategy";

export interface PdfDiffResult extends DiffResult<string> {
    renderer: typeof FileType.PDF;
}

export class PdfDiffStrategy extends DiffStrategy<PdfDiffResult> {
    /**
     * PDF 파일에 대한 비교 처리를 수행합니다.
     * 단순 before, after 파일에 대한 경로만 받아 반환합니다
     * @param before {string} before PDF 파일 경로
     * @param after {string} after PDF 파일 경로
     * @returns PDF 비교 결과
     */
    public override async process(before: string, after: string): Promise<PdfDiffResult> {
        return {
            renderer: FileType.PDF,
            before,
            after,
        };
    }
}
