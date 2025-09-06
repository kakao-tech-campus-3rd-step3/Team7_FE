import { Document, Page } from "react-pdf";

import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer/PdfViewer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PdfViewer> = {
    component: PdfViewer,
};

export default meta;
type Story = StoryObj<typeof PdfViewer>;

export const Default: Story = {
    args: {},
    render: () => {
        return (
            <PdfViewer
                render={({ width, currentPage, initializePages }) => (
                    <Document
                        scale={1}
                        file="/mocks/v1-sample.pdf"
                        onLoadSuccess={({ numPages }) => initializePages?.(numPages)}
                    >
                        <Page pageNumber={currentPage} width={width} />
                    </Document>
                )}
            />
        );
    },
};
