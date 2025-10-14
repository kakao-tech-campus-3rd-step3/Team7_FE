import { useCallback, useMemo, useState } from "react";
import { Document, Page } from "react-pdf";

import { VersionNav, VersionNavItem } from "@/features/document-diff/components/VersionNav";

import { FileType } from "@/core/@types/FileType";
import { useDocumentDiff } from "@/core/document-diff/hooks/useDocumentDiff";
import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";

export interface PortfolioDiffWidgetProps {
    beforeSrc?: string;
    afterSrc?: string;
    pageWidth?: number;
    renderTextLayer?: boolean;
}

export const PortfolioDiffWidget = ({
    beforeSrc = "/mocks/v1-sample.pdf",
    afterSrc = "/mocks/v2-sample.pdf",
    pageWidth = 520,
    renderTextLayer = false,
}: PortfolioDiffWidgetProps) => {
    const { diffResult, isProcessing, isError, error } = useDocumentDiff({
        fileType: FileType.PDF,
        before: beforeSrc,
        after: afterSrc,
        suspense: false,
    });

    //before/after 페이지 수를 한 state로 통합
    const [numPages, setNumPages] = useState<{ before: number; after: number }>({
        before: 0,
        after: 0,
    });

    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = useMemo(() => Math.max(numPages.before, numPages.after), [numPages]);

    const clamp = useCallback(
        (p: number) => (totalPages ? Math.min(Math.max(1, p), totalPages) : p),
        [totalPages],
    );

    const goPrev = useCallback(() => setCurrentPage((p) => clamp(p - 1)), [clamp]);
    const goNext = useCallback(() => setCurrentPage((p) => clamp(p + 1)), [clamp]);

    const onBeforeLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
        setNumPages((prev) => {
            const next = { ...prev, before: n };
            setCurrentPage((p) => Math.min(Math.max(1, p), Math.max(next.before, next.after)));
            return next;
        });
    }, []);

    const onAfterLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
        setNumPages((prev) => {
            const next = { ...prev, after: n };
            setCurrentPage((p) => Math.min(Math.max(1, p), Math.max(next.before, next.after)));
            return next;
        });
    }, []);

    if (isProcessing) {
        return (
            <div className="p-6 text-sm text-neutral-600" role="status" aria-live="polite">
                PDF를 불러오는 중입니다…
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-sm text-red-600" role="alert">
                문서를 불러오는 중 오류가 발생했어요.{" "}
                {error instanceof Error ? error.message : String(error)}
            </div>
        );
    }

    if (!diffResult) return null;

    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <VersionNav>
                    <VersionNavItem variant="original" label="원본" />
                    <VersionNavItem variant="modified" label="수정본" />
                </VersionNav>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">
                        {totalPages > 0 ? `Page ${currentPage} / ${totalPages}` : "Loading…"}
                    </span>
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={currentPage <= 1 || totalPages === 0}
                        className="px-3 py-1 rounded-md border text-sm disabled:opacity-50"
                        aria-label="이전 페이지"
                    >
                        ← Prev
                    </button>
                    <input
                        type="number"
                        min={1}
                        max={totalPages || undefined}
                        value={currentPage}
                        onChange={(e) => setCurrentPage(clamp(Number(e.target.value)))}
                        className="w-16 px-2 py-1 rounded-md border text-sm text-center"
                        aria-label="페이지 입력"
                    />
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={totalPages === 0 || currentPage >= totalPages}
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
                    <Document file={diffResult.before} onLoadSuccess={onBeforeLoadSuccess}>
                        {numPages.before > 0 ? (
                            <Page
                                pageNumber={Math.min(currentPage, numPages.before)}
                                width={pageWidth}
                                renderTextLayer={renderTextLayer}
                            />
                        ) : (
                            <p className="text-xs text-neutral-500">문서를 불러오는 중…</p>
                        )}
                    </Document>
                </div>

                <div className="w-full max-w-[820px]">
                    <Document file={diffResult.after} onLoadSuccess={onAfterLoadSuccess}>
                        {numPages.after > 0 ? (
                            <Page
                                pageNumber={Math.min(currentPage, numPages.after)}
                                width={pageWidth}
                                renderTextLayer={renderTextLayer}
                            />
                        ) : (
                            <p className="text-xs text-neutral-500">문서를 불러오는 중…</p>
                        )}
                    </Document>
                </div>
            </DiffLayout>
        </div>
    );
};
