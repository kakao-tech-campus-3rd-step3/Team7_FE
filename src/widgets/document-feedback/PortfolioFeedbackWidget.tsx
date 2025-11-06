import { Fragment } from "react";
import { Document, Page } from "react-pdf";

import { FeedbackCommentAreas } from "@/features/document-feedback/containers/FeedbackComment/FeedbackCommentAreas";
import { NewFeedbackComment } from "@/features/document-feedback/containers/FeedbackComment/NewFeedbackComment";
import { FeedbackLayout } from "@/features/document-feedback/containers/FeedbackSidebar/FeedbackLayout";

import { BaseCoordinateLayer } from "@/shared/components/Helper";
import { HTTPExceptionBoundary } from "@/shared/errors/HTTPExceptionBoundary";
import { useToggle } from "@/shared/hooks/useToggle";

import { FeedbackSidebar } from "@/widgets/document-feedback/FeedbackSidebar";
import { PortfolioFeedbackCommentToolbarWidget } from "@/widgets/document-feedback/PortfolioFeedbackCommentToolbar";

import { CommentAreaPlaceholder } from "@/core/document-commenter/components/Comment/CommentAreaPlaceholder";
import { useRegisterEvents } from "@/core/document-commenter/hooks/useRegisterEvents";
import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer";

export const PortfolioFeedbackWidget = () => {
    const [, toggleCommentMode] = useToggle(false);
    // TODO: commentMode 활용하여 주석 기능 활성화/비활성화 구현

    const { ref, register } = useRegisterEvents();

    return (
        <FeedbackLayout
            main={
                <Fragment>
                    <PortfolioFeedbackCommentToolbarWidget
                        onCommentModeToggle={() => toggleCommentMode()}
                    />

                    <PdfViewer
                        className="p-4"
                        render={({ width, currentPage, initializePages }) => (
                            <Document
                                scale={1.5}
                                file="/mocks/v1-sample.pdf"
                                onLoadSuccess={({ numPages }) => initializePages?.(numPages)}
                            >
                                <BaseCoordinateLayer className="relative" ref={ref}>
                                    <Page
                                        className="w-fit h-fit"
                                        width={width}
                                        pageNumber={currentPage}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        {...register}
                                    />

                                    <CommentAreaPlaceholder
                                        borderColor="#F6B13B"
                                        backgroundColor="#F6B13B33"
                                    />

                                    <HTTPExceptionBoundary
                                        onError={(code) => {
                                            switch (code) {
                                                default:
                                                    return <p>Unknown Error</p>;
                                            }
                                        }}
                                    >
                                        <FeedbackCommentAreas page={currentPage} />
                                        <NewFeedbackComment page={currentPage} />
                                    </HTTPExceptionBoundary>
                                </BaseCoordinateLayer>
                            </Document>
                        )}
                    />
                </Fragment>
            }
            sidebar={<FeedbackSidebar />}
        />
    );
};
