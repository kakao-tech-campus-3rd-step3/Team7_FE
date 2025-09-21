import { CommentToolbarButtonItem } from "@/core/document-commenter/components/CommentToolbar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CommentToolbarButtonItem> = {
    component: CommentToolbarButtonItem,
};

export default meta;
type Story = StoryObj<typeof CommentToolbarButtonItem>;

export const Default: Story = {
    args: {},
};
