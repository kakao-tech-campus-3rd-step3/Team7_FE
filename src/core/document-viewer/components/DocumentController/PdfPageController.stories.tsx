import { PdfPageController } from "@/core/document-viewer/components/DocumentController/PdfPageController";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PdfPageController> = {
    component: PdfPageController,
};

export default meta;
type Story = StoryObj<typeof PdfPageController>;

export const Default: Story = {
    args: {},
};
