import React from "react";

import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer/PdfViewer";
import {
    PdfPageContextProvider,
    usePdfPageContext,
} from "@/core/document-viewer/contexts/PdfPageContext";
import type { Meta, StoryObj } from "@storybook/react-vite";

type PdfViewerStoryArgs = React.ComponentProps<typeof PdfViewer> & {
    page: number;
    total: number;
};

function PdfPageInitializer({ page, total }: { page: number; total: number }) {
    const { initializePages, jumpToPage } = usePdfPageContext();
    React.useEffect(() => {
        initializePages(total);
        jumpToPage(page);
    }, [page, total, initializePages, jumpToPage]);
    return null;
}

const meta = {
    title: "Core/DocumentViewer/PdfViewer",
    component: PdfViewer,
    args: {
        result: {
            before: "/mocks/v1-sample.pdf",
            after: "/mocks/v2-sample.pdf",
        },
        pageWidth: 520,
        initialPage: 1,
        renderTextLayer: false,
        leftLabel: "원본",
        rightLabel: "수정본",
        page: 1,
        total: 12,
    },
    argTypes: {
        result: { control: "object" },
        pageWidth: { control: "number" },
        initialPage: { control: "number" },
        renderTextLayer: { control: "boolean" },
        leftLabel: { control: "text" },
        rightLabel: { control: "text" },
        page: { control: "number", min: 1 },
        total: { control: "number", min: 1 },
    },
    render: (args) => (
        <div className="p-6 bg-neutral-50 min-h-[240px]">
            <PdfPageContextProvider>
                <PdfPageInitializer page={args.page} total={args.total} />
                <PdfViewer
                    result={args.result}
                    pageWidth={args.pageWidth}
                    initialPage={args.initialPage}
                    renderTextLayer={args.renderTextLayer}
                    leftLabel={args.leftLabel}
                    rightLabel={args.rightLabel}
                />
            </PdfPageContextProvider>
        </div>
    ),
} satisfies Meta<PdfViewerStoryArgs>;

export default meta;
type Story = StoryObj<PdfViewerStoryArgs>;

export const Default: Story = {};
