import { CommentArea } from "@/core/document-commenter/components/Comment/CommentArea";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CommentArea> = {
    component: CommentArea,
};

export default meta;
type Story = StoryObj<typeof CommentArea>;

export const Default: Story = {
    args: {
        id: 1,
        startX: 50,
        startY: 50,
        endX: 200,
        endY: 100,
        content: "This is a comment",
        borderColor: "#F6B13B",
        backgroundColor: "#F6B13B33",
    },
};
