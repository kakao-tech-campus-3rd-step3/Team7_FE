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
    debouncedTimeout?: number;
    render: (props: PdfViewerRenderProps) => React.ReactNode;
}

export const PdfViewer = ({ debouncedTimeout = 400, render }: DocumentViewerProps) => {
    const { ref, width, height } = useDebouncedResizeObserver(debouncedTimeout);

    return (
        <PdfPageContextProvider>
            <article className="w-[50%] relative" ref={ref}>
                <PdfPageController />
                <PdfRenderer render={render} width={width} height={height} />
            </article>
        </PdfPageContextProvider>
    );
};
