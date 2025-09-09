import { MessageSquarePlus, ZoomIn, ZoomOut } from "lucide-react";

import { CommentToolbar } from "@/core/document-commenter/components/CommentToolbar/CommentToolbar";
import { CommentToolbarButtonItem } from "@/core/document-commenter/components/CommentToolbar/CommentToolbarButtonItem";
import { CommentToolbarToggleItem } from "@/core/document-commenter/components/CommentToolbar/CommentToolbarToggleItem";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof CommentToolbar> = {
    component: CommentToolbar,
};

export default meta;
type Story = StoryObj<typeof CommentToolbar>;

export const Default: Story = {
    args: {
        leftItems: [
            <CommentToolbarToggleItem
                icon={<MessageSquarePlus />}
                tooltip="댓글 추가"
                onToggle={fn()}
            />,
            <CommentToolbarToggleItem
                icon={<MessageSquarePlus />}
                tooltip="댓글 추가"
                onToggle={fn()}
            />,
        ],
        rightItems: [
            <div className="flex gap-1 h-full">
                <CommentToolbarButtonItem
                    className="h-full w-5"
                    icon={<ZoomIn size={16} />}
                    tooltip="확대"
                    onClick={fn()}
                />
                <CommentToolbarButtonItem
                    className="h-full w-5"
                    icon={<ZoomOut size={16} />}
                    tooltip="축소"
                    onClick={fn()}
                />
            </div>,
        ],
    },
};
