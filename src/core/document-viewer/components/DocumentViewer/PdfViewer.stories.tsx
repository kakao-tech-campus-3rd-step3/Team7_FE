import { PdfViewer } from "@/core/document-viewer/components/DocumentViewer/PdfViewer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PdfViewer> = {
    component: PdfViewer,
    args: {
        src: "/mocks/v1-sample.pdf",
        width: 520,
        initialPage: 1,
        renderTextLayer: false,
    },
    argTypes: {
        src: { control: "text" },
        width: { control: "number" },
        initialPage: { control: "number" },
        renderTextLayer: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof PdfViewer>;

export const Default: Story = {
    args: {
        src: "/mocks/v1-sample.pdf",
        width: 520,
        initialPage: 1,
        renderTextLayer: false,
    },
};
