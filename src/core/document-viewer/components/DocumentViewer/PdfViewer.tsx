import type { CSSProperties } from "react";

import { useDebouncedResizeObserver } from "@/shared/hooks/useDebouncedResizeObserver";

import { PdfPageController } from "@/core/document-viewer/components/DocumentController";
import {
    PdfPageContextProvider,
    usePdfPageContext,
} from "@/core/document-viewer/contexts/PdfPageContext";

export type PdfViewerRenderProps = Omit<ReturnType<typeof useDebouncedResizeObserver>, "ref"> &
    ReturnType<typeof usePdfPageContext>;

export interface PdfRendererProps {
    width: number;
    height: number;
    render: (props: PdfViewerRenderProps) => React.ReactNode;
}

export const PdfRenderer = ({ width, height, render }: PdfRendererProps) => {
    const {
        currentPage,
        totalPages,
        toNextPage,
        toPrevPage,
        jumpToPage,
        initializePages,
        isInPageRange,
    } = usePdfPageContext();

    return render({
        width,
        height,

        currentPage,
        totalPages,

        toNextPage,
        toPrevPage,
        jumpToPage,
        initializePages,
        isInPageRange,
    });
};

export interface DocumentViewerProps {
    viewerWidth: CSSProperties["width"];
    debouncedTimeout?: number;
    render: (props: PdfViewerRenderProps) => React.ReactNode;
}

export const PdfViewer = ({ viewerWidth, debouncedTimeout = 400, render }: DocumentViewerProps) => {
    const { ref, width, height } = useDebouncedResizeObserver(debouncedTimeout);

    return (
        <PdfPageContextProvider>
            <article className="relative" ref={ref} style={{ width: viewerWidth }}>
                <PdfPageController />
                <PdfRenderer render={render} width={width} height={height} />
            </article>
        </PdfPageContextProvider>
    );
};
