import React from "react";
import { Document, Page } from "react-pdf";

import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import { PdfPageController } from "@/core/document-viewer/components/DocumentController/PdfPageController";
import {
    PdfPageContextProvider,
    usePdfPageContext,
} from "@/core/document-viewer/contexts/PdfPageContext";

function useWindowMeasuredWidth<T extends HTMLElement>(fallback = 600) {
    const ref = React.useRef<T | null>(null);
    const [width, setWidth] = React.useState(fallback);

    const measure = React.useCallback(() => {
        if (!ref.current) return;
        const next = Math.max(1, Math.round(ref.current.clientWidth));
        setWidth((prev) => (Math.abs(prev - next) < 2 ? prev : next));
    }, []);

    React.useEffect(() => {
        requestAnimationFrame(measure);
        const onResize = () => requestAnimationFrame(measure);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [measure]);

    return { ref, width, remeasure: measure };
}

export interface PdfDiffViewerProps {
    before: unknown;
    after: unknown;
}

function normalizePdfFile(input: unknown) {
    if (!input) return input as any;
    if (typeof input === "string") return input;
    if (input instanceof Uint8Array) return { data: input };
    if (input instanceof ArrayBuffer) return { data: new Uint8Array(input) };
    if ((input as any)?.data instanceof Uint8Array) return input as any;
    return input as any;
}

const InnerPdfDiffViewer = ({ before, after }: { before: unknown; after: unknown }) => {
    const { currentPage, initializePages } = usePdfPageContext();

    const [beforeNumPages, setBeforeNumPages] = React.useState(0);
    const [afterNumPages, setAfterNumPages] = React.useState(0);
    const totalPages = Math.max(beforeNumPages, afterNumPages) || 1;

    React.useEffect(() => {
        if (beforeNumPages > 0 || afterNumPages > 0) {
            initializePages(Math.max(beforeNumPages, afterNumPages) || 1);
        }
    }, [beforeNumPages, afterNumPages, initializePages]);

    const beforeFile = React.useMemo(() => normalizePdfFile(before), [before]);
    const afterFile = React.useMemo(() => normalizePdfFile(after), [after]);

    const leftBox = useWindowMeasuredWidth<HTMLDivElement>(600);
    const rightBox = useWindowMeasuredWidth<HTMLDivElement>(600);

    const handleBeforeLoadSuccess = React.useCallback(
        (info: { numPages: number }) => {
            setBeforeNumPages(info.numPages);
            requestAnimationFrame(() => {
                leftBox.remeasure();
                rightBox.remeasure();
            });
        },
        [leftBox, rightBox],
    );
    const handleAfterLoadSuccess = React.useCallback(
        (info: { numPages: number }) => {
            setAfterNumPages(info.numPages);
            requestAnimationFrame(() => {
                leftBox.remeasure();
                rightBox.remeasure();
            });
        },
        [leftBox, rightBox],
    );

    const SAFETY = 8;
    const pageWidth = Math.max(1, Math.min(leftBox.width, rightBox.width) - SAFETY);

    return (
        <div className="flex flex-col gap-3 w-full h-full min-h-0 overflow-x-hidden">
            <div className="relative">
                <PdfPageController />
            </div>

            <DiffLayout
                className="w-full h-full min-h-0"
                gapXClass="gap-x-6"
                showDivider
                center
                leftAccentClass="border-l-4 border-blue-500"
                rightAccentClass="border-l-4 border-emerald-500"
            >
                <div className="flex-1 min-w-0 min-h-0 w-full border rounded-lg p-3">
                    <div
                        ref={leftBox.ref}
                        className="w-full box-border overflow-y-auto overflow-x-hidden max-h-[80vh] flex justify-center"
                        style={{ scrollbarGutter: "stable both-edges" as any }}
                    >
                        <Document
                            file={beforeFile}
                            onLoadSuccess={handleBeforeLoadSuccess}
                            loading={
                                <div className="rounded-md border bg-white p-3 text-sm">
                                    Loading PDF…
                                </div>
                            }
                            error={
                                <div className="rounded-md border bg-rose-50 p-3 text-sm text-rose-700">
                                    Failed to load PDF.
                                </div>
                            }
                        >
                            {beforeNumPages > 0 && (
                                <Page
                                    pageNumber={Math.min(currentPage, beforeNumPages)}
                                    width={pageWidth}
                                    renderTextLayer={false}
                                />
                            )}
                        </Document>
                    </div>
                </div>

                <div className="flex-1 min-w-0 min-h-0 w-full border rounded-lg p-3">
                    <div
                        ref={rightBox.ref}
                        className="w-full box-border overflow-y-auto overflow-x-hidden max-h-[80vh] flex justify-center"
                        style={{ scrollbarGutter: "stable both-edges" as any }}
                    >
                        <Document
                            file={afterFile}
                            onLoadSuccess={handleAfterLoadSuccess}
                            loading={
                                <div className="rounded-md border bg-white p-3 text-sm">
                                    Loading PDF…
                                </div>
                            }
                            error={
                                <div className="rounded-md border bg-rose-50 p-3 text-sm text-rose-700">
                                    Failed to load PDF.
                                </div>
                            }
                        >
                            {afterNumPages > 0 && (
                                <Page
                                    pageNumber={Math.min(currentPage, afterNumPages)}
                                    width={pageWidth}
                                    renderTextLayer={false}
                                />
                            )}
                        </Document>
                    </div>
                </div>
            </DiffLayout>

            <div className="mt-1 flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                    Page <strong>{Math.min(currentPage, totalPages)}</strong> / {totalPages}
                </div>
            </div>
        </div>
    );
};

export const PdfDiffViewer = ({ before, after }: PdfDiffViewerProps) => (
    <PdfPageContextProvider>
        <InnerPdfDiffViewer before={before} after={after} />
    </PdfPageContextProvider>
);
