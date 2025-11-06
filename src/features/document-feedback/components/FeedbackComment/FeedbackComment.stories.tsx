import { FeedbackComment } from "@/features/document-feedback/components/FeedbackComment/FeedbackComment";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FeedbackComment> = {
    component: FeedbackComment,
};

export default meta;
type Story = StoryObj<typeof FeedbackComment>;

export const Default: Story = {
    args: {
        author: "홍길동",

        content: "자기소개서의 첫 번째 문단에서 지원동기가 좀 더 구체적으로 표현되면 좋겠습니다.",
        createdAt: "2024-06-21",
    },
};
