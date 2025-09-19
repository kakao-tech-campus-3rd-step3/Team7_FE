import { CommentAreaPlaceholder } from "@/core/document-commenter/components/Comment/CommentAreaPlaceholder";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CommentAreaPlaceholder> = {
    component: CommentAreaPlaceholder,
};

export default meta;
type Story = StoryObj<typeof CommentAreaPlaceholder>;

export const Default: Story = {
    args: {
        borderColor: "#F6B13B",
        backgroundColor: "#F6B13B33",
        style: {
            top: 50,
            left: 50,
            width: 200,
            height: 100,
        },
    },
};
