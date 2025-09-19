import { forwardRef, type CSSProperties } from "react";

import { useDebouncedResizeObserver } from "@/shared/hooks/useDebouncedResizeObserver";
import { cn } from "@/shared/lib/utils";

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

export interface DocumentViewerProps extends React.ComponentPropsWithoutRef<"article"> {
    viewerWidth: CSSProperties["width"];
    debouncedTimeout?: number;
    render: (props: PdfViewerRenderProps) => React.ReactNode;
}

export const PdfViewer = forwardRef<HTMLDivElement, DocumentViewerProps>(
    ({ viewerWidth, debouncedTimeout = 400, render, ...props }: DocumentViewerProps) => {
        const { ref, width, height } = useDebouncedResizeObserver(debouncedTimeout);

        return (
            <PdfPageContextProvider>
                <article
                    ref={ref}
                    style={{ width: viewerWidth }}
                    className={cn("relative", props.className)}
                    {...props}
                >
                    <PdfPageController />
                    <PdfRenderer render={render} width={width} height={height} />
                </article>
            </PdfPageContextProvider>
        );
    },
);

PdfViewer.displayName = "PdfViewer";
