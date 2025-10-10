import { useCallback, useState } from "react";
import { Document, Page } from "react-pdf";

import type { PdfDiffResult } from "@/core/document-diff/PdfDiffStrategy";
import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";

export interface PdfDiffViewerProps extends Omit<PdfDiffResult, "renderer"> {}

export const PdfDiffViewer = ({ before, after }: PdfDiffViewerProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleLoadSuccess = useCallback((info: { numPages: number }) => {
        setNumPages(info.numPages);
        setCurrentPage((prev) => (prev > info.numPages ? info.numPages : prev));
    }, []);

    const goPrev = useCallback(() => {
        setCurrentPage((p) => Math.max(1, p - 1));
    }, []);

    const goNext = useCallback(() => {
        setCurrentPage((p) => (numPages > 0 ? Math.min(numPages, p + 1) : p + 1));
    }, [numPages]);

    const goTo = useCallback(
        (page: number) => {
            if (numPages === 0) return;
            const next = Math.min(Math.max(1, page), numPages);
            setCurrentPage(next);
        },
        [numPages],
    );

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                    {numPages > 0 ? (
                        <span>
                            Page <strong>{currentPage}</strong> / {numPages}
                        </span>
                    ) : (
                        <span>Loading PDF…</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
                        aria-label="이전 페이지"
                    >
                        ← Prev
                    </button>
                    <input
                        type="number"
                        min={1}
                        max={numPages || undefined}
                        value={currentPage}
                        onChange={(e) => goTo(Number(e.target.value))}
                        className="w-16 px-2 py-1 rounded-md border text-sm text-center"
                        aria-label="페이지 입력"
                    />
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={numPages > 0 ? currentPage >= numPages : true}
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
                leftAccentClass="border-l-4 border-blue-500"
                rightAccentClass="border-l-4 border-emerald-500"
            >
                <div className="w-full max-w-[820px]">
                    <Document file={before} onLoadSuccess={handleLoadSuccess}>
                        {numPages > 0 && (
                            <Page pageNumber={currentPage} width={520} renderTextLayer={false} />
                        )}
                    </Document>
                </div>

                <div className="w-full max-w-[820px]">
                    <Document file={after} onLoadSuccess={handleLoadSuccess}>
                        {numPages > 0 && (
                            <Page pageNumber={currentPage} width={520} renderTextLayer={false} />
                        )}
                    </Document>
                </div>
            </DiffLayout>
        </div>
    );
};
