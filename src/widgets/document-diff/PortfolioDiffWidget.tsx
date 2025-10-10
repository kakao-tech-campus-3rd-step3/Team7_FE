import { useState, Fragment } from "react";
import { Document, Page } from "react-pdf";

import { VersionNav, VersionNavItem } from "@/features/document-diff/components/VersionNav";

import { FileType } from "@/core/@types/FileType";
import { useDocumentDiff } from "@/core/document-diff/hooks/useDocumentDiff";

export const PortfolioDiffWidget = () => {
    const { diffResult, isProcessing, isError, error } = useDocumentDiff({
        fileType: FileType.PDF,
        before: "/mocks/v1-sample.pdf",
        after: "/mocks/v2-sample.pdf",
    });

    const [numPages, setNumPages] = useState<number>(0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <Fragment>
            <VersionNav>
                <VersionNavItem variant="original" label="원본" />
                <VersionNavItem variant="modified" label="수정본" />
            </VersionNav>

            {isProcessing && (
                <p role="status" aria-live="polite" className="py-6 text-sm text-neutral-600">
                    PDF를 불러오는 중입니다...
                </p>
            )}

            {isError && (
                <p role="alert" className="py-6 text-sm text-red-600">
                    불러오는 중 오류가 발생했어요.{" "}
                    {error instanceof Error ? error.message : String(error)}
                </p>
            )}

            {diffResult && (
                <section className="relative grid grid-cols-2 gap-6">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-neutral-200"
                    />

                    <article
                        aria-label="원본 문서"
                        className="rounded-lg border bg-white grid place-items-center p-3"
                    >
                        <div className="w-full max-w-[850px]">
                            <Document
                                file={diffResult.before}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                {numPages > 0 &&
                                    Array.from({ length: numPages }, (_, i) => (
                                        <Page
                                            key={`before_page_${i + 1}`}
                                            pageNumber={i + 1}
                                            width={400}
                                        />
                                    ))}
                            </Document>
                        </div>
                    </article>

                    <article
                        aria-label="수정본 문서"
                        className="rounded-lg border bg-white grid place-items-center p-3"
                    >
                        <div className="w-full max-w-[850px]">
                            <Document file={diffResult.after} onLoadSuccess={onDocumentLoadSuccess}>
                                {numPages > 0 &&
                                    Array.from({ length: numPages }, (_, i) => (
                                        <Page
                                            key={`after_page_${i + 1}`}
                                            pageNumber={i + 1}
                                            width={400}
                                        />
                                    ))}
                            </Document>
                        </div>
                    </article>
                </section>
            )}
        </Fragment>
    );
};
