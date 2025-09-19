import { MessageSquarePlus } from "lucide-react";

import { CommentToolbarToggleItem } from "@/core/document-commenter/components/CommentToolbar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof CommentToolbarToggleItem> = {
    component: CommentToolbarToggleItem,
};

export default meta;
type Story = StoryObj<typeof CommentToolbarToggleItem>;

export const Default: Story = {
    args: {
        icon: <MessageSquarePlus />,
        tooltip: "댓글 추가",
        onToggle: fn(),
    },
};
