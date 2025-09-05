import { ApplicationsSummaryCard } from "./ApplicationsSummaryCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ApplicationsSummaryCard> = {
    title: "entities/application/ApplicationsSummaryCard",
    component: ApplicationsSummaryCard,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "지원 기업 상단 요약 카드. 회사명 24/Bold, 포지션 18/Regular, 메타 라벨 14/Regular, 메타 값 14/Medium, 진행률 텍스트 14, 우측 버튼(리뷰룸/채용공고 보기) 16/Medium 스펙을 반영합니다.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="p-6 max-w-5xl">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        companyLogo: { control: "text" },
        companyName: { control: "text" },
        applyPosition: { control: "text" },
        appliedDate: { control: "text" },
        location: { control: "text" },
        jobType: { control: "text" },
        field: { control: "text" },
        progress: { control: { type: "range", min: 0, max: 100, step: 5 } },
    },
};
export default meta;

type Story = StoryObj<typeof ApplicationsSummaryCard>;

const baseArgs = {
    companyLogo: "https://placehold.co/80x80?text=Logo",
    companyName: "삼성전자",
    applyPosition: "DX 부문 소프트웨어 개발",
    appliedDate: "2024-01-15",
    location: "서울",
    jobType: "정규직",
    field: "신입",
};

export const Default: Story = {
    args: {
        ...baseArgs,
        progress: 0,
    },
    parameters: {
        docs: {
            description: {
                story: "일반적인 진행률 0% 케이스. 상단 타이포/버튼 크기/메타 그리드 간격이 의도대로 보이는지 확인하세요.",
            },
        },
    },
};

export const Progress20: Story = {
    args: {
        ...baseArgs,
        progress: 20,
    },
    name: "진행률 20%",
};

export const Progress50: Story = {
    args: {
        ...baseArgs,
        progress: 50,
    },
    name: "진행률 50%",
};

export const Progress100: Story = {
    args: {
        ...baseArgs,
        progress: 100,
    },
    name: "진행률 100%",
    parameters: {
        docs: {
            description: {
                story: "완료 상태(100%). 진행률 바/텍스트 색이 과도하게 튀지 않는지 체크합니다.",
            },
        },
    },
};
