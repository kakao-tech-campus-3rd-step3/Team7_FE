import { CoverLetterNewForm } from "./CoverLetterNewForm";
import type { Meta, StoryObj } from "@storybook/react";

const STORAGE_KEY = "coverletter:draft";

const meta: Meta<typeof CoverLetterNewForm> = {
    title: "Entities/Document/CoverLetterNewForm",
    component: CoverLetterNewForm,
    args: {
        titleLabel: "버전 제목",
        submitText: "새 자기소개서 저장",
    },
};
export default meta;
type Story = StoryObj<typeof CoverLetterNewForm>;

export const Default: Story = {};

export const PrefilledQuestions: Story = {
    decorators: [
        (Story) => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    title: "v1.2 최종본 기반",
                    baseVersionId: "v12",
                    questions: [
                        {
                            id: "q1",
                            label: "성장 과정",
                            maxLength: 500,
                            value: "책임감과 꾸준함을 중심으로 성장했습니다...",
                            isOpen: true,
                        },
                        {
                            id: "q2",
                            label: "지원 동기",
                            maxLength: 700,
                            value: "해당 직무에 대한 관심과 경험을 바탕으로...",
                            isOpen: false,
                        },
                    ],
                }),
            );
            const res = Story();
            setTimeout(() => localStorage.removeItem(STORAGE_KEY), 0);
            return res;
        },
    ],
};

export const ManyQuestions: Story = {
    decorators: [
        (Story) => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    title: "다문항 테스트",
                    baseVersionId: undefined,
                    questions: Array.from({ length: 5 }).map((_, i) => ({
                        id: `q${i + 1}`,
                        label: `문항 ${i + 1}`,
                        maxLength: 400 + i * 50,
                        value: i % 2 === 0 ? `문항 ${i + 1}의 예시 답변 ...` : "",
                        isOpen: i === 0,
                    })),
                }),
            );
            const res = Story();
            setTimeout(() => localStorage.removeItem(STORAGE_KEY), 0);
            return res;
        },
    ],
};
