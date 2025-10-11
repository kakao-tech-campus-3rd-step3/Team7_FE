import type { DiffResult } from "@/core/document-diff/domain";

export interface PdfDiffViewerProps {
    result?: DiffResult;
    isLoading?: boolean;
    error?: unknown;
    leftLabel?: string; // 기본: "원본"
    rightLabel?: string; // 기본: "수정본"
}

/** PDF 전용 Diff 뷰어 (좌/우 2-pane 레이아웃) */
export const PdfDiffViewer = ({
    result,
    isLoading,
    error,
    leftLabel = "원본",
    rightLabel = "수정본",
}: PdfDiffViewerProps) => {
    if (isLoading)
        return (
            <p role="status" className="p-3 text-sm">
                Loading PDF diff…
            </p>
        );
    if (error)
        return (
            <p role="alert" className="p-3 text-sm">
                PDF diff error
            </p>
        );
    if (!result) return <p className="p-3 text-sm">No PDF diff</p>;

    return (
        <section className="grid grid-cols-2 gap-6">
            {/* LEFT */}
            <article aria-label="원본 문서" className="rounded-lg border bg-white">
                <header className="flex items-center gap-2 px-4 py-2 border-b bg-indigo-50">
                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <h3 className="text-sm font-medium">{leftLabel}</h3>
                </header>
                <div className="p-4">
                    {/* TODO: 원본 PDF 페이지 렌더링 */}
                    <p className="text-xs text-muted-foreground">원본 문서 미리보기</p>
                </div>
            </article>

            {/* RIGHT */}
            <article aria-label="수정본 문서" className="rounded-lg border bg-white">
                <header className="flex items-center gap-2 px-4 py-2 border-b bg-emerald-50">
                    <span
                        className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                        aria-hidden
                    />
                    <h3 className="text-sm font-medium">{rightLabel}</h3>
                </header>
                <div className="p-4">
                    {/* TODO: 수정본 PDF 페이지 렌더링 */}
                    <p className="text-xs text-muted-foreground">수정본 문서 미리보기</p>
                </div>
            </article>
        </section>
    );
};
