import { forwardRef } from "react";

import { cn } from "@/shared/lib/utils";

import { PdfPageController } from "@/core/document-viewer/components/DocumentController";
import {
    PdfPageContextProvider,
    usePdfPageContext,
} from "@/core/document-viewer/contexts/PdfPageContext";

export type PdfViewerRenderProps = ReturnType<typeof usePdfPageContext> & {
    width?: number;
    height?: number;
};

export interface PdfRendererProps {
    width?: number;
    height?: number;
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
    width?: number;
    height?: number;
    render: (props: PdfViewerRenderProps) => React.ReactNode;
}

export const PdfViewer = forwardRef<HTMLDivElement, DocumentViewerProps>(
    ({ render, width, height, className, ...props }: DocumentViewerProps, ref) => {
        return (
            <PdfPageContextProvider>
                <article ref={ref} className={cn("relative", className)} {...props}>
                    <PdfPageController />
                    <PdfRenderer render={render} width={width} height={height} />
                </article>
            </PdfPageContextProvider>
        );
    },
);

PdfViewer.displayName = "PdfViewer";
