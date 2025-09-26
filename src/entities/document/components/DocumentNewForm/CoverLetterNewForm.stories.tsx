import { CoverLetterNewForm } from "./CoverLetterNewForm";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, waitFor, expect } from "@storybook/test";

const meta: Meta<typeof CoverLetterNewForm> = {
    title: "Entities/Document/CoverLetterNewForm",
    component: CoverLetterNewForm,
    args: {
        applicationId: "demo-app",
        titleLabel: "버전 제목",
        submitText: "새 자기소개서 저장",
        versionItems: [
            {
                id: undefined,
                title: "빈 문서에서 시작",
                description: "처음부터 새로운 자기소개서를 작성합니다",
            },
            { id: "v12", title: "v1.2 - 최종본", date: "2024.01.20" },
            { id: "v11", title: "v1.1 - 1차 피드백 반영", date: "2024.01.18" },
            { id: "v10", title: "v1.0 - 초안", date: "2024.01.15" },
        ],
    },
};
export default meta;

type Story = StoryObj<typeof CoverLetterNewForm>;

export const Default: Story = {};

export const PrefilledFromAPI: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByText("v1.2 - 최종본"));

        await waitFor(() => {
            expect(canvas.getByDisplayValue("지원 동기에 대해 서술하시오.")).toBeInTheDocument();
            expect(canvas.getByDisplayValue("협업 경험에 대해 서술하시오.")).toBeInTheDocument();
            expect(canvas.getByDisplayValue("라인의 기술력에 매료되어...")).toBeInTheDocument();
            expect(
                canvas.getByDisplayValue("팀 프로젝트에서 Git을 활용하여..."),
            ).toBeInTheDocument();
        });
    },
};

export const ManyQuestions: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const addBtn = await canvas.findByRole("button", { name: /문항 추가하기/i });
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);
        await userEvent.click(addBtn);

        const titleInputs = canvas.getAllByLabelText("문항 제목");
        const textareas = canvas.getAllByRole("textbox", { name: /번 문항 내용/ });
        expect(titleInputs.length).toBe(5);
        expect(textareas.length).toBe(5);

        for (let i = 0; i < 5; i++) {
            await userEvent.clear(titleInputs[i]);
            await userEvent.type(titleInputs[i], `문항 ${i + 1} 제목`);
            if (i % 2 === 0) await userEvent.type(textareas[i], `문항 ${i + 1}의 예시 답변 ...`);
        }

        await expect(canvas.getByDisplayValue("문항 1 제목")).toBeInTheDocument();
        await expect(canvas.getByDisplayValue("문항 3 제목")).toBeInTheDocument();
        await expect(canvas.getByDisplayValue("문항 5 제목")).toBeInTheDocument();
        await expect(canvas.getByDisplayValue("문항 1의 예시 답변 ...")).toBeInTheDocument();
    },
};
