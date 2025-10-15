import React from "react";

import { PdfPageController } from "@/core/document-viewer/components/DocumentController/PdfPageController";
import {
    PdfPageContextProvider,
    usePdfPageContext,
} from "@/core/document-viewer/contexts/PdfPageContext";
import type { Meta, StoryObj } from "@storybook/react-vite";

function PdfPageInitializer({ page, total }: { page: number; total: number }) {
    const { initializePages, jumpToPage } = usePdfPageContext();
    React.useEffect(() => {
        initializePages(total);
        jumpToPage(page);
    }, [page, total, initializePages, jumpToPage]);
    return null;
}

const meta = {
    title: "Core/DocumentViewer/PdfPageController",
    component: PdfPageController,
} satisfies Meta<typeof PdfPageController>;
export default meta;

type StoryArgs = React.ComponentProps<typeof PdfPageController> & {
    page: number;
    total: number;
};
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    args: { page: 1, total: 12, className: undefined },
    argTypes: {
        page: { control: "number", min: 1 },
        total: { control: "number", min: 1 },
        className: { control: "text" },
    },
    render: (args: StoryArgs) => (
        <div className="relative p-6 bg-neutral-50 min-h-[240px]">
            <PdfPageContextProvider>
                <PdfPageInitializer page={args.page} total={args.total} />
                <PdfPageController className={args.className} />
            </PdfPageContextProvider>
        </div>
    ),
};
