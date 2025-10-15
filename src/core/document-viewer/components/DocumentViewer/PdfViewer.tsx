import { useCallback, useMemo, useState } from "react";
import { Document, Page } from "react-pdf";

import type { DiffResult } from "@/core/document-diff/base/DiffResult";
import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";

export interface PdfViewerProps {
    result?: DiffResult<string>;
    isLoading?: boolean;
    error?: unknown;

    leftLabel?: string;
    rightLabel?: string;

    pageWidth?: number;
    initialPage?: number;
    renderTextLayer?: boolean;
}

export const PdfViewer = ({
    result,
    isLoading,
    error,
    leftLabel = "원본",
    rightLabel = "수정본",
    pageWidth = 520,
    initialPage = 1,
    renderTextLayer = false,
}: PdfViewerProps) => {
    const [leftPages, setLeftPages] = useState<number>(0);
    const [rightPages, setRightPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const maxPages = useMemo(() => Math.max(leftPages, rightPages), [leftPages, rightPages]);

    const clampToRange = useCallback(
        (page: number) => (maxPages ? Math.min(Math.max(1, page), maxPages) : page),
        [maxPages],
    );

    const onLeftLoadSuccess = useCallback(
        (info: { numPages: number }) => {
            setLeftPages(info.numPages);
            setCurrentPage((p) => Math.min(Math.max(1, p), Math.max(info.numPages, rightPages)));
        },
        [rightPages],
    );

    const onRightLoadSuccess = useCallback(
        (info: { numPages: number }) => {
            setRightPages(info.numPages);
            setCurrentPage((p) => Math.min(Math.max(1, p), Math.max(info.numPages, leftPages)));
        },
        [leftPages],
    );

    const goPrev = useCallback(() => setCurrentPage((p) => clampToRange(p - 1)), [clampToRange]);
    const goNext = useCallback(() => setCurrentPage((p) => clampToRange(p + 1)), [clampToRange]);

    if (isLoading) {
        return (
            <div className="p-4 text-sm text-neutral-600" role="status" aria-live="polite">
                PDF를 불러오는 중입니다…
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-4 text-sm text-red-600" role="alert">
                문서를 불러오는 중 오류가 발생했어요.{" "}
                {error instanceof Error ? error.message : String(error)}
            </div>
        );
    }
    if (!result) return null;

    const leftSrc = result.before;
    const rightSrc = result.after;

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                    {maxPages > 0 ? `Page ${currentPage} / ${maxPages}` : "Loading PDF…"}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={currentPage <= 1 || maxPages === 0}
                        className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
                        aria-label="이전 페이지"
                    >
                        ← Prev
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={maxPages === 0 || currentPage >= maxPages}
                        className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
                        aria-label="다음 페이지"
                    >
                        Next →
                    </button>
                </div>
            </div>

            <DiffLayout
                className="w-full h-full"
                gapXClass="gap-x-6"
                showDivider
                center
                leftAccentClass="border-l-4 border-indigo-500"
                rightAccentClass="border-l-4 border-emerald-500"
            >
                <article aria-label="원본 문서" className="w-full">
                    <header className="flex items-center gap-2 px-4 py-2 border-b bg-indigo-50">
                        <span
                            className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                            aria-hidden
                        />
                        <h3 className="text-sm font-medium">{leftLabel}</h3>
                    </header>
                    <div className="p-4 grid place-items-center">
                        <Document file={leftSrc} onLoadSuccess={onLeftLoadSuccess}>
                            {leftPages > 0 ? (
                                <Page
                                    pageNumber={Math.min(currentPage, leftPages)}
                                    width={pageWidth}
                                    renderTextLayer={renderTextLayer}
                                />
                            ) : (
                                <p className="text-xs text-neutral-500">문서를 불러오는 중…</p>
                            )}
                        </Document>
                    </div>
                </article>

                <article aria-label="수정본 문서" className="w-full">
                    <header className="flex items-center gap-2 px-4 py-2 border-b bg-emerald-50">
                        <span
                            className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                            aria-hidden
                        />
                        <h3 className="text-sm font-medium">{rightLabel}</h3>
                    </header>
                    <div className="p-4 grid place-items-center">
                        <Document file={rightSrc} onLoadSuccess={onRightLoadSuccess}>
                            {rightPages > 0 ? (
                                <Page
                                    pageNumber={Math.min(currentPage, rightPages)}
                                    width={pageWidth}
                                    renderTextLayer={renderTextLayer}
                                />
                            ) : (
                                <p className="text-xs text-neutral-500">문서를 불러오는 중…</p>
                            )}
                        </Document>
                    </div>
                </article>
            </DiffLayout>
        </div>
    );
};

export default PdfViewer;
