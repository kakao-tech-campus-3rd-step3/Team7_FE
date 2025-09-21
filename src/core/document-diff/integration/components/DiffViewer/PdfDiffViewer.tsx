import { Document, Page } from "react-pdf";

import type { PdfDiffResult } from "@/core/document-diff/PdfDiffStrategy";
import { DiffLayout } from "@/core/document-diff/integration/components/DiffLayout";
import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer";

export interface PdfDiffViewerProps extends Omit<PdfDiffResult, "renderer"> {}

export const PdfDiffViewer = ({ before, after }: PdfDiffViewerProps) => {
    return (
        <DiffLayout>
            <PdfViewer
                viewerWidth="50%"
                render={({ width, currentPage, initializePages }) => (
                    <Document
                        scale={1}
                        file={before}
                        onLoadSuccess={({ numPages }) => initializePages?.(numPages)}
                        onLoadError={(error) =>
                            console.error("Failed to load PDF document:", error)
                        }
                    >
                        <Page pageNumber={currentPage} width={width} />
                    </Document>
                )}
            />
            <PdfViewer
                viewerWidth="50%"
                render={({ width, currentPage, initializePages }) => (
                    <Document
                        scale={1}
                        file={after}
                        onLoadSuccess={({ numPages }) => initializePages?.(numPages)}
                        onLoadError={(error) =>
                            console.error("Failed to load PDF document:", error)
                        }
                    >
                        <Page pageNumber={currentPage} width={width} />
                    </Document>
                )}
            />
        </DiffLayout>
    );
};
