import { Fragment, useCallback, useState } from "react";
import { Document, Page } from "react-pdf";

import { DisableSelection } from "@/shared/components/Helper/DisableSelection";
import { useToggle } from "@/shared/hooks/useToggle";

import { PortfolioFeedbackCommentToolbarWidget } from "@/widgets/document-feedback/PortfolioFeedbackCommentToolbar";

import { CommentAreaPlaceholder } from "@/core/document-commenter/components/Comment/CommentAreaPlaceholder";
import { useEventBus } from "@/core/document-commenter/contexts/EventBusContext";
import { useLocalCoordinates } from "@/core/document-commenter/hooks/useLocalCoordinates";
import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer";

const PDF_MIN_SCALE = 0.4;
const PDF_MAX_SCALE = 3.0;
const PDF_SCALE_STEP = 0.2;

export const PortfolioFeedbackWidget = () => {
    const [scale, setScale] = useState<number>(1);
    const [, toggleCommentMode] = useToggle(false);
    // TODO: commentMode 활용하여 주석 기능 활성화/비활성화 구현

    const eventBus = useEventBus();
    const { ref: pageRef, getCoords } = useLocalCoordinates<HTMLCanvasElement>();

    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            eventBus.dispatch({ type: "document:mousedown", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseMove = useCallback(
        (event: React.MouseEvent) => {
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            eventBus.dispatch({ type: "document:mousemove", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseUp = useCallback(
        (event: React.MouseEvent) => {
            eventBus.dispatch({
                type: "document:mouseup",
                payload: { x: event.clientX, y: event.clientY },
            });
        },
        [eventBus],
    );

    return (
        <Fragment>
            <PortfolioFeedbackCommentToolbarWidget
                onCommentModeToggle={() => toggleCommentMode()}
                onZoomIn={() => setScale((prev) => Math.min(prev + PDF_SCALE_STEP, PDF_MAX_SCALE))}
                onZoomOut={() => setScale((prev) => Math.max(prev - PDF_SCALE_STEP, PDF_MIN_SCALE))}
            />
            <PdfViewer
                className="p-4"
                viewerWidth="100%"
                render={({ width, currentPage, initializePages }) => (
                    <Document
                        scale={scale}
                        file="/mocks/v1-sample.pdf"
                        onLoadSuccess={({ numPages }) => initializePages?.(numPages)}
                    >
                        <DisableSelection className="relative">
                            <Page
                                width={width}
                                canvasRef={pageRef}
                                pageNumber={currentPage}
                                onMouseDown={onMouseDown}
                                onMouseMove={onMouseMove}
                                onMouseUp={onMouseUp}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                            />

                            <CommentAreaPlaceholder
                                borderColor="#F6B13B"
                                backgroundColor="#F6B13B33"
                            />
                        </DisableSelection>
                    </Document>
                )}
            />
        </Fragment>
    );
};
